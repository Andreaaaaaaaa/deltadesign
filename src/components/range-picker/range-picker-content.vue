<template>
  <div
    :class="[
      sideTimeDynamicActive ? 'aw-range-picker-content-double' : 'aw-range-picker-content',
      `aw-range-picker-content-${mode}`,
    ]"
  >
    <div v-if="sideTimeDynamicActive" class="aw-range-picker-full-height">
      <div class="aw-range-picker-dynamic-container">
        <div class="aw-range-picker-dynamic-content">
          <div class="aw-range-picker-dynamic-header">
            <span>{{globalConfig.startMonthLabel }}</span>
            <range-picker-select
              :value="dynamicType"
              :options="dynamicTypeOptions"
              @select="handleSelect"
            />
          </div>
          <template v-if="dynamicType === NDAY">
            <div class="aw-range-picker-dynamic-input-wrapper">
              <div class="aw-range-picker-dynamic-input-container">
                <div class="aw-range-picker-dynamic-input-content">
                  <t-input
                    class="aw-range-picker-dynamic-input-el"
                    size="small"
                    :placeholder="globalConfig.placeholder.inputNumber"
                    :value="innerTimeInputText[0]"
                    @change="handleInputChange($event, 0)"
                    @focus="handleInputFocus(0)"
                    @blur="handleInputBlur(0)"
                  />
                  <range-picker-select
                    class="aw-range-picker-dynamic-input-select"
                    :value="dynamicMode"
                    :options="dynamicOptions"
                    @select="handleSelectDynamicMode"
                  >
                    <template #label>
                      <span>{{ CONST.MODE_LABEL[dynamicMode] }}</span>
                    </template>
                  </range-picker-select>
                  <span class="aw-range-picker-dynamic-input-text">{{ globalConfig.agoLabel }}</span>
                </div>
                <div class="aw-range-picker-dynamic-tip-slot">
                  <slot name="dynamicTip" :date="innerValue.time[0]" />
                </div>
              </div>
              <range-picker-time-select
                v-if="showDynamicTimePicker"
                ref="timePickerLeftRef"
                :type="(mode as PickerTypeString)"
                @change="handleSelectTime('left', $event)"
              ></range-picker-time-select>
            </div>
          </template>
          <div v-else class="aw-range-picker-single-panel-container">
            <div class="aw-range-picker-single-panel-content">
              <range-picker-panel
                ref="singlePanelRef"
                class="aw-range-picker-full-height"
                :is-single-date="true"
                :active-time-index="activeTimeIndex"
                :time="[innerValue.time[0], innerValue.time[0]]"
                :time-type="innerValue.type"
                :disable-date="disableDate"
                :side-time-btn-active="sideTimeBtnActive"
                :side-time-dynamic-active="sideTimeDynamicActive"
                :mode="mode"
                :time-offset="timeOffset"
                :is-private-compare="isPrivateCompare"
                :first-day-of-week="firstDayOfWeek"
                @change-index="changeIndex"
                @change-time="changeSingleTime"
                @change-mom-type="changeMomType"
                @mouse-enter-cell="handleMouseEnterCell"
              >
                <template #panelTip="{ date }">
                  <slot name="panelTip" :date="date" />
                </template>
              </range-picker-panel>
            </div>
          </div>
        </div>
      </div>
      <div class="aw-range-picker-right-conent">
        <div class="aw-range-picker-panel-container">
          <div class="aw-range-picker-dynamic-header">
            <span>{{ globalConfig.endDateLabel }}</span>
          </div>
          <div class="aw-range-picker-dynamic-input-wrapper">
            <div class="aw-range-picker-dynamic-input-container">
              <div class="aw-range-picker-dynamic-input-content">
                <t-input
                  class="aw-range-picker-dynamic-input-el"
                  size="small"
                  :placeholder="globalConfig.placeholder.inputNumber"
                  :value="innerTimeInputText[1]"
                  @change="handleInputChange($event, 1)"
                  @focus="handleInputFocus(1)"
                  @blur="handleInputBlur(1)"
                />
                <range-picker-select
                  class="aw-range-picker-dynamic-input-select"
                  :value="dynamicMode"
                  :options="dynamicOptions"
                  @select="handleSelectDynamicMode"
                >
                  <template #label>
                    <span>{{ CONST.MODE_LABEL[dynamicMode] }}</span>
                  </template>
                </range-picker-select>
                <span class="aw-range-picker-dynamic-input-text">{{ globalConfig.agoLabel }}</span>
              </div>
              <div class="aw-range-picker-dynamic-tip-slot">
                <slot name="dynamicTip" :date="innerValue.time[1]" />
              </div>
            </div>
            <range-picker-time-select
              v-if="showDynamicTimePicker"
              ref="timePickerRightRef"
              :type="(mode as PickerTypeString)"
              @change="handleSelectTime('right', $event)"
            ></range-picker-time-select>
          </div>
        </div>
      </div>
    </div>
    <range-picker-panel
      v-else
      ref="panelRef"
      :active-time-index="activeTimeIndex"
      :time="innerValue.time"
      :time-type="innerValue.type"
      :disable-date="disableDate"
      :side-time-btn-active="sideTimeBtnActive"
      :side-time-dynamic-active="sideTimeDynamicActive"
      :mode="mode"
      :time-offset="timeOffset"
      :is-private-compare="isPrivateCompare"
      :first-day-of-week="firstDayOfWeek"
      :show-mom-select="showMomSelect"
      @change-index="changeIndex"
      @change-time="changeTime"
      @change-mom-type="changeMomType"
      @mouse-enter-cell="handleMouseEnterCell"
    >
      <template #panelTip="{ date }">
        <slot name="panelTip" :date="date" />
      </template>
    </range-picker-panel>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, ref, watch } from 'vue';
import Input from 'tdesign-vue-next/esm/input';
import Popup from 'tdesign-vue-next/esm/popup';
import dayjs from 'dayjs';
import { useRangeGlobalConfig, MODE_MAP, CUSTOM_TYPE, TIME_DYNAMIC_FORMAT_MAP, NDAY, FIXEDDAY, DAYJS_UNIT_MAP } from './constants';
import { RangeValue, DisableDateType, PickerTypeString } from './type';
import {
  getDynamicRegex,
  getDynamicTimeType,
  mergeDateTime,
  parseTimeString,
  getDayjsType,
  getDayjsIosType,
  replaceDynamicTimeType,
  parseMatchItem
} from './utils';
import { getStartEndTime } from './week';
import RangePickerPanel from './range-picker-panel.vue';
import RangePickerTimeSelect from './range-picker-time-select.vue';
import RangePickerSelect from './base/number-select.vue'

export default defineComponent({
  name: 'RangePickerContent',

  components: {
    RangePickerPanel,
    RangePickerTimeSelect,
    TInput: Input,
    TPopup: Popup,
    RangePickerSelect,
  },

  props: {
    innerValue: {
      type: Object as PropType<RangeValue>,
      required: true,
    },
    activeTimeIndex: {
      type: Number,
      required: true,
    },
    // 禁用时间范围，参考tdesign
    disableDate: {
      type: [Function, Array, Object] as PropType<DisableDateType>,
      default: () => ({}),
    },
    sideTimeBtnActive: {
      type: Boolean,
      default: false,
    },
    sideTimeDynamicActive: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'date',
    },
    isPrivateCompare: {
      type: Boolean,
      default: false,
    },
    timeOffset: {
      type: Number,
      default: 0,
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

  emits: ['change-index', 'change-time', 'change-mom-type', 'mouse-enter-cell'],

  setup(props, { emit }) {
    // 国际化
    const CONST = useRangeGlobalConfig();
    const { globalConfig } = CONST;

    const showTimePicker = computed(() => {
      return [MODE_MAP.H, MODE_MAP.Hm, MODE_MAP.Hms].includes(props.mode);
    });

    const dayjsIosType = computed(() => getDayjsIosType(props.mode));

    const dynamicTypeOptions = computed(() => {
      return [
        {
          label: globalConfig.relativeTimeLabel,
          value: NDAY
        },
        {
          label: globalConfig.exactTimeLabel,
          value: FIXEDDAY
        }
      ]
    })

    const showDynamicTimePicker = computed(() => {
      return [MODE_MAP.H, MODE_MAP.Hm, MODE_MAP.Hms].includes(props.mode);
    });

    const dynamicMode = ref('d')

    const panelRef = ref<InstanceType<typeof RangePickerPanel>>();
    const singlePanelRef = ref<InstanceType<typeof RangePickerPanel>>();
    const timePickerLeftRef = ref<InstanceType<typeof RangePickerTimeSelect>>();
    const timePickerRightRef = ref<InstanceType<typeof RangePickerTimeSelect>>();

    const resetPickerClick = () => {
      panelRef.value?.resetClick();
      singlePanelRef.value?.resetClick();
    };

    const hackSafariScroll = () => {
      panelRef.value?.hackSafariScroll();
      singlePanelRef.value?.hackSafariScroll();
    };

    const changeIndex = (val: number) => {
      emit('change-index', val);
    };

    const changeTime = ({ type, time }: { type: string; time: (Date | undefined)[] }) => {
      emit('change-time', { value: { type, time } });
    };

    const changeMomType = (type: string) => {
      emit('change-mom-type', type);
    };

    const changeSingleTime = ({ time }: { time: Date[] }) => {
      const type = props.innerValue.type.split('~');

      type[0] = dayjs(time[0]).format(TIME_DYNAMIC_FORMAT_MAP[props.mode] || 'YYYYMM');

      let newTime;
      if (showTimePicker.value) {
        newTime = time[0];
      } else {
        newTime = getStartEndTime('start', time[0], dayjsIosType.value, props.firstDayOfWeek).toDate();
      }

      changeTime({
        type: type.join('~'),
        time: [newTime, props.innerValue.time[1]],
      });
      changeIndex(0);
    };

    const dynamicType = ref(NDAY);

    const dynamicOptions = computed(() => {
      return CONST.DYNAMIC_OPTIONS_MAP[props.mode as keyof typeof CONST.DYNAMIC_OPTIONS_MAP]
    })

    const handleMouseEnterCell = (value?: Date) => {
      emit('mouse-enter-cell', value);
    };

    const handleSelect = (selectType: string) => {
      dynamicType.value = selectType;
      let type = CUSTOM_TYPE;
      if (props.innerValue.time.length) {
        type = getDynamicTimeType(
          'left',
          selectType,
          props.innerValue.type,
          props.innerValue.time,
          props.mode,
          props.timeOffset,
          props.firstDayOfWeek,
        ).join('~');
      }

      dynamicMode.value = getDayjsType(props.mode)

      changeTime({
        type,
        time: props.innerValue.time,
      });
    };

    const handleSelectTime = (direction: 'left' | 'right', time: dayjs.Dayjs) => {
      const index = direction === 'left' ? 0 : 1;
      let type = CUSTOM_TYPE;

      const timeArr = props.innerValue.time.concat();
      timeArr[index] = mergeDateTime(timeArr[index] || new Date(), time);

      if (props.innerValue.time.length) {
        const timeType = replaceDynamicTimeType(direction, props.innerValue.type.split('~')[index], timeArr[index] as Date, props.mode)
        type = props.innerValue.type.split('~').map((typeItem, typeIndex) => {
          if (typeIndex === index) {
            return timeType
          }
          return typeItem
        }).join('~')
      }
      changeTime({
        type,
        time: timeArr,
      });
    };

    // input text
    const timeInputText = ref(['1', '1']);
    const innerTimeInputText = ref(['1', '1']);

    const handleInputChange = (value: string | number, index: number) => {
      const stringValue = value.toString();

      innerTimeInputText.value[index] = stringValue;

      const type = props.innerValue.type.split('~');
      const time = props.innerValue.time.concat();

      if (/^\d+$/.test(stringValue)) {
        type[index] = `${dynamicMode.value}-${stringValue}`

        let dayjsTime = dayjs()
          .add(-1 * Number(stringValue), dynamicMode.value)
          .add(props.timeOffset, 'h');
        if (showTimePicker.value) {
          type[index] = `${type[index]}:${dayjs(time[index]).format('HHmmss')}`;
          const timeValue = dayjs(props.innerValue.time[index] || dayjsTime);
          dayjsTime = dayjsTime
            .hour(timeValue.hour())
            .minute(timeValue.minute())
            .second(timeValue.second())
            .add(props.timeOffset, 'h');
        }

        if (showTimePicker.value) {
          time[index] = dayjsTime.toDate();
        } else {
          time[index] =
            index === 0
              ? getStartEndTime('start', dayjsTime, dayjsIosType.value, props.firstDayOfWeek).toDate()
              : getStartEndTime('end', dayjsTime, dayjsIosType.value, props.firstDayOfWeek).toDate();
        }

        changeTime({ type: type.join('~'), time });
      }
    };

    const handleInputFocus = (index: number) => {
      changeIndex(index);
    };

    const handleInputBlur = (index: number) => {
      const value: string[] = timeInputText.value;
      const innerValue: string[] = innerTimeInputText.value;

      const testValue = /^\d+$/.test(innerValue[index]);
      if (!testValue) {
        innerValue[index] = value[index];
      } else {
        value[index] = innerValue[index];
      }

      // 左右交换
      if (testValue && dynamicType.value === NDAY && Number(innerValue[0]) < Number(innerValue[1])) {
        const type = props.innerValue.type.split('~');

        const newTimeArr: Date[] = [
          getStartEndTime(
            'start',
            dayjs(props.innerValue.time[1]).add(props.timeOffset, 'h'),
            dayjsIosType.value,
            props.firstDayOfWeek
          ).toDate(),
          getStartEndTime(
            'end',
            dayjs(props.innerValue.time[0]).add(props.timeOffset, 'h'),
            dayjsIosType.value,
            props.firstDayOfWeek
          ).toDate()
        ]


        if (showTimePicker.value) {
          newTimeArr[0] = mergeDateTime(newTimeArr[0], dayjs(props.innerValue.time[1]).startOf(DAYJS_UNIT_MAP[props.mode]).toDate())
          newTimeArr[1] = mergeDateTime(newTimeArr[1], dayjs(props.innerValue.time[0]).endOf(DAYJS_UNIT_MAP[props.mode]).toDate())
          type[0] = replaceDynamicTimeType('left', type[0], newTimeArr[0], props.mode)
          type[1] = replaceDynamicTimeType('right', type[1], newTimeArr[1], props.mode)
        }


        changeTime({
          type: `${type[1]}~${type[0]}`,
          time: newTimeArr,
        });
      }
    };


    const handleSelectDynamicMode = (value: string) => {
      dynamicMode.value = value

      const type = props.innerValue.type.split('~')
      let time = props.innerValue.time.concat()

      const { regPattern, ndayRegPattern } = getDynamicRegex(props.mode, false)
      const matchItem = props.innerValue.type.match(regPattern)
      if (matchItem) {
        const left = matchItem[1]
        const right = matchItem[2]

        const leftNMatch = left.match(ndayRegPattern)
        if (leftNMatch) {
          type[0] = `${dynamicMode.value}-${innerTimeInputText.value[0]}`
          if (showTimePicker.value) {
            type[0] = `${type[0]}:${dayjs(time[0]).format('HHmmss')}`
          }
        }

        const rightNMatch = right.match(ndayRegPattern)
        if (rightNMatch) {
          type[1] = `${dynamicMode.value}-${innerTimeInputText.value[1]}`
          if (showTimePicker.value) {
            type[1] = `${type[1]}:${dayjs(time[1]).format('HHmmss')}`
          }
        }

        time = parseMatchItem(type.join('~'), props.mode, false, props.timeOffset, props.firstDayOfWeek) as Date[]


        changeTime({
          type: type.join('~'),
          time
        })
      }
    }

    const initValue = () => {
      // 不考虑不匹配
      const { regPattern, ndayRegPattern } = getDynamicRegex(props.mode, false);

      const matchItem = props.innerValue.type.match(regPattern);
      if (matchItem) {
        const left = matchItem[1];
        const right = matchItem[2];

        const leftNMatch = left.match(ndayRegPattern);
        if (leftNMatch) {
          const nValue = showTimePicker.value ? +leftNMatch[2].split(':')[0] : +leftNMatch[2];
          timeInputText.value[0] = (-1 * nValue).toString();
          innerTimeInputText.value[0] = (-1 * nValue).toString();
          if (props.innerValue.time[0] && showTimePicker.value) {
            const timeArr = parseTimeString(leftNMatch[2]);
            const timeValue = dayjs(props.innerValue.time[0]).hour(timeArr[0]).minute(timeArr[1]).second(timeArr[2]);
            nextTick(() => {
              timePickerLeftRef.value?.setValue(timeValue);
            });
          }

          dynamicType.value = NDAY;
        } else {
          dynamicType.value = FIXEDDAY;
        }

        const rightNMatch = right.match(ndayRegPattern);
        if (rightNMatch) {
          const nValue = showTimePicker.value ? +rightNMatch[2].split(':')[0] : +rightNMatch[2];
          timeInputText.value[1] = (-1 * nValue).toString();
          innerTimeInputText.value[1] = (-1 * nValue).toString();

          dynamicMode.value = rightNMatch[1]

          if (props.innerValue.time[1] && showTimePicker.value) {
            const timeArr = parseTimeString(rightNMatch[2]);
            const timeValue = dayjs(props.innerValue.time[1]).hour(timeArr[0]).minute(timeArr[1]).second(timeArr[2]);
            nextTick(() => {
              timePickerRightRef.value?.setValue(timeValue);
            });
          }
        }
      }
    };

    const scrollPicker = (index = 0) => {
      panelRef.value?.scrollPicker(index);
      singlePanelRef.value?.scrollPicker(index);
      initValue();
    };

    const initialPicker = (index = 0) => {
      panelRef.value?.initialPicker(index);
      singlePanelRef.value?.initialPicker(index);
      initValue();
    };

    watch(
      [() => props.innerValue.type, () => props.mode],
      () => {
        initValue();
      },
      {
        deep: true,
        immediate: true,
      },
    );

    return {
      globalConfig,
      CONST,
      NDAY,
      FIXEDDAY,
      panelRef,
      singlePanelRef,
      scrollPicker,
      initialPicker,
      resetPickerClick,
      changeIndex,
      changeTime,
      changeSingleTime,
      dynamicType,
      handleSelect,
      handleInputChange,
      handleInputFocus,
      handleInputBlur,
      innerTimeInputText,
      hackSafariScroll,
      showDynamicTimePicker,
      timePickerLeftRef,
      timePickerRightRef,
      handleSelectTime,
      changeMomType,
      handleMouseEnterCell,
      dynamicTypeOptions,
      dynamicMode,
      dynamicOptions,
      handleSelectDynamicMode,
    };
  },
});
</script>
