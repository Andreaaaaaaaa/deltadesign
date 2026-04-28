<template>
  <div class="aw-range-picker-panel" :class="[`aw-range-picker-panel-${mode}`]">
    <div class="aw-range-picker-panel-container">
      <div>
        <range-picker-mom-select
          v-if="showMomSelect"
          :mode="mode"
          :time-type="timeType"
          @change="changeMomType"
        />
      </div>
      <div class="aw-range-picker-panel-container-title">
        <div class="aw-range-picker-header-text">
          <number-select
            type="year"
            :value="selectYear"
            :options="yearOptions"
            show-mask
            @select="handleSelect($event, 'year')"
          >
            <template #label>
              {{ `${selectYear} ${globalConfig.dayjsLocale === 'zh-cn' ? globalConfig.yearAriaLabel : ''}` }}
            </template>
          </number-select>
          <number-select
            v-if="mode !== MODE_MAP.MONTH"
            type="month"
            :value="selectMonth"
            :options="monthOptions"
            show-mask
            @select="handleSelect($event, 'month')"
          />
        </div>

        <div v-if="mode !== MODE_MAP.MONTH">
          <table class="aw-range-picker-table">
            <thead>
              <tr>
                <th v-for="week in weekArr" :key="week" class="aw-range-picker-table-week-head">
                  {{ week }}
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div class="aw-range-picker-table-content-container">
        <div class="aw-range-picker-panelTip-slot">
          <slot name="panelTip" :date="scrollDate" />
        </div>
        <div class="aw-range-picker-recycle-container">
          <RecycleScroller
            ref="recycleScrollerRef"
            class="aw-range-picker-scroll aw-range-picker-date-panel"
            :items="scrollerItems"
            @visible="handleScrollerVisible"
          >
            <template #default="{ item }">
              <range-picker-table
                :type="item.type"
                :data="item.data"
                :year="item.year"
                :month="item.month"
                :start="time[0]"
                :end="time[1]"
                :is-single-date="isSingleDate"
                :click-start="clickStart"
                :click-end="clickEnd"
                :first-day-of-week="firstDayOfWeek"
                :mouse-value="mouseValue"
                :active-time-index="activeTimeIndex"
                @click-cell="clickDate"
                @mouse-enter-cell="enterDate"
              />
            </template>
          </RecycleScroller>
        </div>
      </div>
    </div>
  </div>
  <range-picker-time-select
    v-if="showTimePicker"
    ref="timeSelectRef"
    :type="(mode as PickerTypeString)"
    @change="selectTime"
  ></range-picker-time-select>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  onMounted,
  nextTick,
  PropType,
  onUnmounted,
} from 'vue';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { DisableDateType, RecycleScrollerItem, RangePickerSelectOption, PickerTypeString } from './type';
import { getWeeks, getYears, getMonths, mergeDateTime } from './utils';
import { getStartEndTime } from './week';
import RangePickerTable from './base/table.vue';
import RangePickerTimeSelect from './range-picker-time-select.vue';
import NumberSelect from './base/number-select.vue';
import RangePickerMomSelect from './range-picker-mom-select.vue';
import {
  useRangeGlobalConfig,
  MODE_MAP,
  DAYJS_UNIT_MAP,
  MOM_REGEX,
  CUSTOM_TYPE,
  CUSTOM_COMPARE_TYPE,
  TODAY_START,
  START_YEAR,
  END_YEAR,
  TITLE_HEIGHT,
  CELL_HEIGHT,
  PADDING_SCROLL,
} from './constants';
import { useInjectTempTime } from './hooks/useTempTime';

export default defineComponent({
  name: 'RangePickerPanel',

  components: {
    RecycleScroller,
    RangePickerTable,
    RangePickerTimeSelect,
    RangePickerMomSelect,
    NumberSelect,
  },

  props: {
    mode: {
      type: String,
      default: 'date',
    },
    activeTimeIndex: {
      type: Number,
      default: 0,
    },
    time: {
      type: Array as PropType<(Date | undefined)[]>,
      default: () => [],
    },
    disableDate: {
      type: [Function, Array, Object] as PropType<DisableDateType>,
      default: () => [],
    },
    timeType: {
      type: String,
      default: '',
    },
    sideTimeBtnActive: {
      type: Boolean,
      default: false,
    },
    sideTimeDynamicActive: {
      type: Boolean,
      default: false,
    },
    isSingleDate: {
      type: Boolean,
      default: false,
    },
    timeOffset: {
      type: Number,
      default: 0,
    },
    isPrivateCompare: {
      type: Boolean,
      default: false,
    },
    firstDayOfWeek: {
      type: Number,
      default: 1,
    },
    showMomSelect: {
      type: Boolean,
      default: false
    }
  },

  emits: ['change-index', 'change-time', 'change-table-data', 'change-mom-type', 'mouse-enter-cell'],

  setup(props, { emit }) {
    // 国际化
    const CONST = useRangeGlobalConfig();
    const { globalConfig } = CONST;

    const { tempTime, changeTempTime } = useInjectTempTime();

    const mouseValue = ref<Date | undefined>();

    const clickStart = ref<Date>();
    const clickEnd = ref<Date>();

    const showTimePicker = computed(() => {
      return [MODE_MAP.H, MODE_MAP.Hm, MODE_MAP.Hms].includes(props.mode);
    });

    const dayjsType = computed(() => {
      return DAYJS_UNIT_MAP[props.mode] || 'M';
    });

    const yearOptions: RangePickerSelectOption[] = [];
    for (let i = START_YEAR; i <= END_YEAR; i += 1) {
      yearOptions.push({
        label: `${i} ${globalConfig.dayjsLocale === 'zh-cn' ? globalConfig.yearAriaLabel : ''}`,
        value: i,
      });
    }

    const monthOptions: RangePickerSelectOption[] = globalConfig.months.map((monthName: string, i: number) => {
      return {
        label: monthName,
        value: i,
      };
    });

    const weekArr = computed(() => {
      const weekdays = [];
      let wi = props.firstDayOfWeek - 1;
      const len = globalConfig.weekdays.length;

      while (weekdays.length < len) {
        weekdays.push(globalConfig.weekdays[wi]);
        wi = (wi + len + 1) % len;
      }

      if (props.mode === MODE_MAP.WEEK) {
        weekdays.unshift(globalConfig.weekAbbreviation);
      }
      return weekdays;
    });

    const recycleScrollerRef = ref();
    const timeSelectRef = ref<InstanceType<typeof RangePickerTimeSelect>>();

    const selectYear = ref(new Date().getFullYear());
    const selectMonth = ref(new Date().getMonth());

    const disableDate = (dateValue: Date) => {
      const propsDisableDate = props.disableDate;
      if (typeof propsDisableDate === 'function') {
        return propsDisableDate(dateValue) as boolean;
      }

      const dateValueTime = dateValue.getTime();

      if (Array.isArray(propsDisableDate)) {
        return (propsDisableDate as Date[]).some((item) => {
          const itemTime = getStartEndTime('start', item, dayjsType.value, props.firstDayOfWeek).toDate().getTime();
          return itemTime === dateValueTime;
        });
      }

      const { from, to }: { from?: Date; to?: Date } = propsDisableDate;
      if (from && to) {
        const fromTime = getStartEndTime('start', from, dayjsType.value, props.firstDayOfWeek).toDate().getTime();
        const toTime = getStartEndTime('start', to, dayjsType.value, props.firstDayOfWeek).toDate().getTime();

        return dateValueTime >= fromTime && dateValueTime <= toTime;
      }

      const { before, after }: { before?: Date; after?: Date } = propsDisableDate;
      if (before || after) {
        const beforeTime =
          before && getStartEndTime('start', before, dayjsType.value, props.firstDayOfWeek).toDate().getTime();
        const afterTime =
          after && getStartEndTime('start', after, dayjsType.value, props.firstDayOfWeek).toDate().getTime();

        return !!(beforeTime && dateValueTime < beforeTime) || !!(afterTime && dateValueTime > afterTime);
      }

      return false;
    };

    const getData = ({ year, month, type }: { year: number; month: number; type: string }) => {
      let data;
      const options = {
        disableDate,
        timeOffset: props.timeOffset || 0,
        showWeekOfYear: type === MODE_MAP.WEEK,
        firstDayOfWeek: props.firstDayOfWeek,
        monthLocal: globalConfig.months,
      };

      switch (type) {
        case MODE_MAP.DATE:
        case MODE_MAP.H:
        case MODE_MAP.Hm:
        case MODE_MAP.Hms:
        case MODE_MAP.WEEK:
          data = getWeeks({ year, month }, options);
          break;
        case MODE_MAP.MONTH:
          data = getMonths(year, options);
          break;
        default:
          data = getYears(year, options);
          break;
      }

      return data;
    };

    const scrollerItems = ref<RecycleScrollerItem[]>([]);

    const setScrollerItems = () => {
      const items: RecycleScrollerItem[] = [];
      let sum = 0;
      if ([MODE_MAP.WEEK, MODE_MAP.DATE, MODE_MAP.H, MODE_MAP.Hm, MODE_MAP.Hms].includes(props.mode)) {
        for (let i = START_YEAR; i <= END_YEAR; i += 1) {
          for (let j = 0; j < 12; j += 1) {
            const data = getData({ year: i, month: j, type: props.mode });
            const size = TITLE_HEIGHT + CELL_HEIGHT * data.length;
            sum += size;
            items.push({
              id: `${i}${j}`,
              type: props.mode,
              data,
              year: i,
              month: j,
              size,
              sumSize: sum,
            });
          }
        }
      } else {
        for (let i = START_YEAR; i <= END_YEAR; i += 1) {
          const data = getData({ year: i, month: 0, type: props.mode });
          const size = TITLE_HEIGHT + CELL_HEIGHT * data.length;
          sum += size;
          items.push({
            id: `${i}`,
            type: props.mode,
            data,
            year: i,
            month: 0,
            size,
            sumSize: sum,
          });
        }
      }
      scrollerItems.value = items;
    };

    watch(
      [() => props.mode, () => props.timeOffset, () => props.disableDate, () => props.firstDayOfWeek],
      () => {
        setScrollerItems();
      },
      {
        immediate: true,
      },
    );

    const handleSelect = (val: number, type: 'year' | 'month') => {
      let year = selectYear.value;
      let month = selectMonth.value;

      if (type === 'year') {
        year = val;
        selectYear.value = val;
      } else if (type === 'month') {
        month = val;
        selectMonth.value = val;
      }

      const key = props.mode === MODE_MAP.MONTH ? `${year}` : `${year}${month}`;
      const findIndex = scrollerItems.value.findIndex((item) => item.id === key);
      recycleScrollerRef.value?.scrollToItem(findIndex);
    };

    const timePickerTypeClick = (date: Date) => {
      const time = props.time.concat();
      const activeIdx = props.activeTimeIndex;
      let savedTime = time[activeIdx];
      if (!time[activeIdx]) {
        savedTime = tempTime?.value?.[activeIdx] ? tempTime?.value?.[activeIdx] : dayjs().startOf('d').toDate();
      }
      const changeDate = mergeDateTime(date, savedTime as Date);
      time[activeIdx] = changeDate;

      if (props.sideTimeDynamicActive || props.isSingleDate) {
        clickStart.value = undefined;
        clickEnd.value = undefined;
      } else if (props.activeTimeIndex === 0) {
        if (time[1] && date.getTime() > time[1].getTime()) {
          time[1] = undefined;
          clickEnd.value = undefined;
        }
      } else {
        clickEnd.value = undefined;
      }

      emit('change-time', { type: props.isPrivateCompare ? CUSTOM_COMPARE_TYPE : CUSTOM_TYPE, time });
    };

    const enterDate = (value?: Date) => {
      mouseValue.value = value;
      emit('mouse-enter-cell', value);
    };

    const clickDate = (date: Date) => {
      mouseValue.value = undefined;

      if (showTimePicker.value) {
        timePickerTypeClick(date);
        return;
      }

      const time = props.time.concat();

      const changeDate =
        props.activeTimeIndex === 0
          ? getStartEndTime('start', date, dayjsType.value, props.firstDayOfWeek).toDate()
          : getStartEndTime('end', date, dayjsType.value, props.firstDayOfWeek).toDate();

      time[props.activeTimeIndex] = showTimePicker.value
        ? mergeDateTime(date, time[props.activeTimeIndex] ? dayjs(time[props.activeTimeIndex]) : dayjs().startOf('d'))
        : changeDate;

      if (props.sideTimeDynamicActive || props.isSingleDate) {
        clickStart.value = undefined;
        clickEnd.value = undefined;
      } else if (props.activeTimeIndex === 0) {
        if (clickEnd.value === undefined) {
          clickStart.value = date;
        } else {
          clickStart.value = undefined;
        }
        clickEnd.value = undefined;

        if (!showTimePicker.value) {
          emit('change-index', 1);
        }
      } else if (props.activeTimeIndex === 1) {
        clickStart.value = undefined;
        clickEnd.value = undefined;

        emit('change-index', 0);
      }

      emit('change-time', { type: props.isPrivateCompare ? CUSTOM_COMPARE_TYPE : CUSTOM_TYPE, time });
    };

    const selectTime = (time: dayjs.Dayjs) => {
      const timeArr = props.time.concat();
      const tmpDate = dayjs(timeArr[props.activeTimeIndex])
        .hour(time.hour())
        .minute(time.minute())
        .second(time.second());

      if (timeArr[props.activeTimeIndex]) {
        timeArr[props.activeTimeIndex] = tmpDate.toDate();
        emit('change-time', {
          type: props.isPrivateCompare ? CUSTOM_COMPARE_TYPE : CUSTOM_TYPE,
          time: timeArr,
        });
      } else {
        const tempTimeCopy = tempTime?.value ? tempTime.value.concat() : [];
        tempTimeCopy[props.activeTimeIndex] = tmpDate.toDate();
        changeTempTime(tempTimeCopy);
      }
    };

    const resetClick = () => {
      clickStart.value = undefined;
      clickEnd.value = undefined;

      if (props.time[0] && showTimePicker.value && props.activeTimeIndex === 1) {
        clickStart.value = dayjs(props.time[0]).startOf('d').toDate();
      }
    };

    const scrollPicker = (index = 0) => {
      let startValue = props.time[index];
      if (!startValue) {
        startValue = TODAY_START;
      }
      const startYear = startValue.getFullYear();
      const startMonth = startValue.getMonth();
      selectYear.value = startYear;
      selectMonth.value = startMonth;

      const key = props.mode === MODE_MAP.MONTH ? `${startYear}` : `${startYear}${startMonth}`;
      const findIndex = scrollerItems.value.findIndex((item) => item.id === key);

      nextTick(() => {
        if (findIndex !== -1) {
          recycleScrollerRef.value?.scrollToItem(findIndex);
        } else if (startYear < START_YEAR) {
          recycleScrollerRef.value?.scrollToItem(0);
        } else if (startYear > END_YEAR) {
          recycleScrollerRef.value?.scrollToItem(scrollerItems.value.length - 1);
        }
      });
    };

    const initialPicker = (index = 0) => {
      resetClick();

      scrollPicker(index);

      // 时间选择初始化
      if (showTimePicker.value) {
        const activeIdx = props.activeTimeIndex;

        if (props.time[activeIdx]) {
          timeSelectRef.value?.setValue(dayjs(props.time[activeIdx]));
        } else {
          timeSelectRef.value?.setValue(dayjs().startOf('d'));
        }

        changeTempTime([]);
      }
    };

    const scrollVisible = ref(false);
    const handleScrollerVisible = () => {
      if (!scrollVisible.value) {
        scrollVisible.value = true;
        initialPicker(props.activeTimeIndex);
      }
    };

    const hackSafariScroll = () => {
      recycleScrollerRef.value.$el.scrollTop = recycleScrollerRef.value.$el!.scrollTop - 1;
    };

    watch(
      () => props.activeTimeIndex,
      (value) => {
        if (props.time[value]) {
          timeSelectRef.value?.setValue(dayjs(props.time[value]));
        } else {
          timeSelectRef.value?.reset();
        }

        if (value === 1) {
          clickStart.value = dayjs(props.time[0]).startOf('d').toDate();
        } else {
          clickStart.value = undefined;
        }
      },
    );

    watch(
      () => props.time,
      (value) => {
        if (value[props.activeTimeIndex]) {
          timeSelectRef.value?.setValue(dayjs(value[props.activeTimeIndex]));
        }
      },
    );

    const scrollDate = ref();

    const handleScroll = debounce((e) => {
      const target = e.target;
      const scrollTop = target.scrollTop;
      const findScrollItem = scrollerItems.value.find((item) => {
        return item.sumSize - PADDING_SCROLL >= scrollTop;
      });

      selectYear.value = findScrollItem!.year;
      selectMonth.value = findScrollItem!.month;

      let itemScrollHeight = scrollTop - (findScrollItem!.sumSize - findScrollItem!.size) - TITLE_HEIGHT;

      let scrollIndex = 0;
      while (itemScrollHeight > 0) {
        scrollIndex += 1;
        itemScrollHeight -= CELL_HEIGHT;
      }
      if (scrollIndex > findScrollItem!.data.length - 1) {
        scrollIndex = findScrollItem!.data.length - 1;
      }
      scrollDate.value = findScrollItem!.data[scrollIndex].find((dataItem) => dataItem.text)!.value;
    }, 200);

    const changeMomType = (type: string) => {
      emit('change-mom-type', type);
    };

    onMounted(() => {
      initialPicker(props.activeTimeIndex);

      recycleScrollerRef.value?.$el.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      recycleScrollerRef.value?.$el.removeEventListener('scroll', handleScroll);
    });

    return {
      globalConfig,
      scrollerItems,
      CONST,
      MODE_MAP,
      clickStart,
      clickEnd,
      scrollPicker,
      initialPicker,
      selectYear,
      yearOptions,
      handleSelect,
      selectMonth,
      monthOptions,
      recycleScrollerRef,
      handleScrollerVisible,
      clickDate,
      enterDate,
      scrollVisible,
      scrollDate,
      resetClick,
      hackSafariScroll,
      showTimePicker,
      timeSelectRef,
      selectTime,
      weekArr,
      changeMomType,
      mouseValue,
    };
  },
});
</script>
