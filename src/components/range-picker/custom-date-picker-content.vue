<template>
  <div :class="['aw-range-picker-content', `aw-range-picker-content-${mode}`]">
    <div v-if="sideTimeDynamicActive" class="aw-range-picker-full-height">
      <div class="aw-range-picker-dynamic-container">
        <div class="aw-range-picker-dynamic-content">
          <div class="aw-range-picker-dynamic-input-wrapper aw-range-picker-single">
            <div class="aw-range-picker-dynamic-input-container">
              <div class="aw-range-picker-dynamic-input-content">
                <t-input
                  class="aw-range-picker-dynamic-input-el"
                  size="small"
                  :placeholder="globalConfig.placeholder.inputNumber"
                  :value="innerTimeInputText"
                  @change="handleInputChange($event)"
                  @blur="handleInputBlur()"
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
                <slot name="dynamicTip" :date="innerValue.time" />
              </div>
            </div>
            <range-picker-time-select
              v-if="showTimePicker"
              ref="timeSelectRef"
              :type="(mode as PickerTypeString)"
              @change="handleSelectTime"
            ></range-picker-time-select>
          </div>
        </div>
      </div>
    </div>
    <range-picker-panel
      v-else
      ref="singlePanelRef"
      :time="[innerValue.time, innerValue.time]"
      :time-type="innerValue.type"
      :disable-date="disableDate"
      :side-time-btn-active="sideTimeBtnActive"
      :side-time-dynamic-active="sideTimeDynamicActive"
      :mode="mode"
      :is-single-date="true"
      :time-offset="timeOffset"
      :is-private-compare="isPrivateCompare"
      :first-day-of-week="firstDayOfWeek"
      :show-mom-select="showMomSelect"
      @change-time="changeSingleTime"
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
import dayjs from 'dayjs';
import type { SingleRangeValue, DisableDateType, PickerTypeString } from './type';
import { getDynamicRegex, isTimeType, mergeDateTime, parseTimeString, getDayjsType, getDayjsIosType, replaceDynamicTimeType, parseMatchItem } from './utils';
import { getStartEndTime } from './week';
import { useRangeGlobalConfig } from './constants';
import RangePickerPanel from './range-picker-panel.vue';
import RangePickerTimeSelect from './range-picker-time-select.vue';
import RangePickerSelect from './base/number-select.vue'

export default defineComponent({
  name: 'CustomDatePickerContent',

  components: {
    RangePickerPanel,
    RangePickerTimeSelect,
    TInput: Input,
    RangePickerSelect,
  },

  props: {
    innerValue: {
      type: Object as PropType<SingleRangeValue>,
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

    const showTimePicker = computed(() => isTimeType(props.mode));

    const singlePanelRef = ref<InstanceType<typeof RangePickerPanel>>();
    const timeSelectRef = ref<InstanceType<typeof RangePickerTimeSelect>>();

    const dayjsIosType = computed(() => getDayjsIosType(props.mode));

    const dynamicMode = ref('d')

    const resetPickerClick = () => {
      singlePanelRef.value?.resetClick();
    };

    const hackSafariScroll = () => {
      singlePanelRef.value?.hackSafariScroll();
    };

    const changeSingleTime = ({ type, time }: { type: string; time: Date[] }) => {
      let newTime;
      if (showTimePicker.value) {
        newTime = time[0];
      } else {
        newTime = getStartEndTime('start', time[0], dayjsIosType.value, props.firstDayOfWeek).toDate();
      }

      emit('change-time', {
        value: {
          type,
          time: newTime,
        }
      });
    };

    // input text
    const timeInputText = ref('1');
    const innerTimeInputText = ref('1');

    const handleInputChange = (value: string | number) => {
      const stringValue = value.toString();

      innerTimeInputText.value = stringValue;

      if (/^\d+$/.test(stringValue)) {
        const type = showTimePicker.value
          ? `${dynamicMode.value}-${stringValue}:${dayjs(props.innerValue.time).format('HHmmss')}`
          : `${dynamicMode.value}-${stringValue}`;
        const dayjsTime = dayjs()
          .add(-1 * Number(stringValue), dynamicMode.value)
          .add(props.timeOffset, 'h');
        const time = showTimePicker.value
          ? mergeDateTime(dayjsTime, props.innerValue.time)
          : getStartEndTime('start', dayjsTime, dayjsIosType.value, props.firstDayOfWeek).toDate();
        emit('change-time', { value: { type, time } });
      }
    };

    const handleInputBlur = () => {
      const testValue = /^\d+$/.test(innerTimeInputText.value);
      if (!testValue) {
        innerTimeInputText.value = timeInputText.value;
      } else {
        timeInputText.value = innerTimeInputText.value;
      }
    };

    const dynamicOptions = computed(() => {
      return CONST.DYNAMIC_OPTIONS_MAP[props.mode as keyof typeof CONST.DYNAMIC_OPTIONS_MAP]
    })

    const handleMouseEnterCell = (value?: Date) => {
      emit('mouse-enter-cell', value);
    };

    const handleSelectTime = (date: dayjs.Dayjs) => {
      const time = mergeDateTime(props.innerValue.time, date)
      const timeType = replaceDynamicTimeType('left', props.innerValue.type, time, props.mode)

      emit('change-time', { value: { type: timeType, time }})
    };

    const changeMomType = (type: string) => {
      emit('change-mom-type', type);
    };


    const handleSelectDynamicMode = (value: string) => {
      dynamicMode.value = value

      let type = props.innerValue.type
      let time = props.innerValue.time

      const { regPattern, ndayRegPattern } = getDynamicRegex(props.mode, true)
      const matchItem = props.innerValue.type.match(regPattern)
      if (matchItem) {
        const left = matchItem[1]

        const leftNMatch = left.match(ndayRegPattern)
        if (leftNMatch) {
          type = `${dynamicMode.value}-${innerTimeInputText.value[0]}`
          if (showTimePicker.value) {
            type = `${type}:${dayjs(time).format('HHmmss')}`
          }
        }

        time = parseMatchItem(type, props.mode, true, props.timeOffset, props.firstDayOfWeek) as Date

        emit('change-time', {
          value: {
            type,
            time
          }
        })
      }
    }

    const initValue = () => {
      // 不考虑不匹配
      const { regPattern, ndayRegPattern } = getDynamicRegex(props.mode, true);

      const matchItem = props.innerValue.type.match(regPattern);
      if (matchItem) {
        const left = matchItem[1];

        const leftNMatch = left.match(ndayRegPattern);
        if (leftNMatch) {
          const nValue = showTimePicker.value ? +leftNMatch[2].split(':')[0] : +leftNMatch[2];

          timeInputText.value = (-1 * nValue).toString();
          innerTimeInputText.value = (-1 * nValue).toString();

          dynamicMode.value = leftNMatch[1];

          if (props.innerValue.time && showTimePicker.value) {
            const timeArr = parseTimeString(leftNMatch[2]);
            const timeValue = dayjs(props.innerValue.time).hour(timeArr[0]).minute(timeArr[1]).second(timeArr[2]);
            nextTick(() => {
              timeSelectRef.value?.setValue(timeValue);
            });
          }
        }
      }
    };

    const initialPicker = () => {
      singlePanelRef.value?.initialPicker();
      initValue();
    };

    watch(
      () => props.innerValue.type,
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
      singlePanelRef,
      initialPicker,
      hackSafariScroll,
      resetPickerClick,
      changeSingleTime,
      handleInputChange,
      handleInputBlur,
      innerTimeInputText,
      timeSelectRef,
      handleSelectTime,
      showTimePicker,
      dynamicMode,
      dynamicOptions,
      handleSelectDynamicMode,
      changeMomType,
      handleMouseEnterCell,
      CONST,
    };
  },
});
</script>
