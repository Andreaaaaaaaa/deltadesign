<template>
  <t-tooltip placement="top-left" :visible="tooltipVisible">
    <template #content>
      <div v-if="showCompareTooltip" class="aw-range-picker__input-tooltip">
        <span class="aw-range-picker-tooltip-text">{{ globalConfig.currentDateLabel }}</span>
        <span>
          <span v-if="showShortcut && formatTitle" class="aw-range-picker__input-tooltip-title">{{ formatTitle }}</span>
          <span>{{ formatValueText[0] }}</span>
          <span class="aw-range-picker-tooltip-middle-text">{{ globalConfig.rangePickerSeparator }}</span>
          <span>{{ formatValueText[1] }}</span>
        </span>
        <template v-for="(title, titleIndex) in formatCompareTitle">
          <span class="aw-range-picker-tooltip-text">{{ globalConfig.compareDateLabel }}{{ formatCompareTitle.length > 1 ? titleIndex + 1 : ''}}</span>
          <span>
            <span v-if="showShortcut && title" class="aw-range-picker__input-tooltip-title">{{ title }}</span>
            <span>{{ formatCompareValueText[titleIndex]?.[0] }}</span>
            <span v-if="formatCompareValueText[titleIndex]?.[0]" class="aw-range-picker-tooltip-middle-text">{{ globalConfig.rangePickerSeparator }}</span>
            <span>{{ formatCompareValueText[titleIndex]?.[1] }}</span>
          </span>
        </template>
      </div>
      <div v-else-if="showTitleTooltip">
        <span class="aw-range-picker__input-tooltip-title">{{ formatTitle }}</span>
        <span>{{ formatValueText[0] }}</span>
        <span class="aw-range-picker-tooltip-middle-text">{{ globalConfig.rangePickerSeparator }}</span>
        <span>{{ formatValueText[1] }}</span>
      </div>
    </template>

    <range-picker-input-container
      :size="size"
      :borderless="borderless"
      :disabled="disabled"
      :panel-visible="panelVisible"
      :inner-is-compare="innerIsCompare"
      :show-compare="showCompare"
      :format-title="formatInputTitle"
      :show-complete-input="showCompleteInput"
      :allow-clear="allowClear"
      :show-clear-icon="Boolean(innerValue.time.length || innerCompareValue.length)"
      @input-click="handleInputClick"
      @enter="handleEnter"
      @leave="handleLeave"
      @clear="handleClear"
    >
      <template v-if="$slots.title" #title>
        <slot name="title" />
      </template>
      <template #input>
        <input
          v-if="allowInput"
          ref="inputLeftRef"
          :value="showInnerTimeInputText[0]"
          class="aw-range-picker-input-el"
          :class="[
            activeTimeIndex === 0 && panelVisible
              ? 'aw-range-picker-input-el-focus'
              : 'aw-range-picker-input-el-blur',
            `aw-range-picker-input-el-${mode === 'week' ? 'date' : mode}-${size}`,
            { 'aw-range-picker-input-el-mouse-enter': mouseValue && !innerTimeInputText[0] },
          ]"
          :placeholder="placeholderLeft"
          @input="handleInput($event, 0)"
          @focus="handleInputFocus(0)"
          @blur="handleInputBlur()"
          @keyup.enter="handleInputEnter"
        />
        <span
          v-else
          class="aw-range-picker-input-el aw-range-picker-input-el-span"
          :class="[
            !innerTimeInputText[0] && 'aw-range-picker-span-placeholder',
            `aw-range-picker-input-el-${mode === 'week' ? 'date' : mode}-${size}`,
          ]"
        >
          {{ innerTimeInputText[0] || placeholderLeft }}
        </span>
        <span class="aw-range-picker-input-divider">{{ globalConfig.rangePickerSeparator }}</span>
        <input
          v-if="allowInput"
          ref="inputRightRef"
          :value="showInnerTimeInputText[1]"
          class="aw-range-picker-input-el"
          :class="[
            activeTimeIndex === 1 && panelVisible
              ? 'aw-range-picker-input-el-focus'
              : 'aw-range-picker-input-el-blur',
            `aw-range-picker-input-el-${mode === 'week' ? 'date' : mode}-${size}`,
            { 'aw-range-picker-input-el-mouse-enter': mouseValue && !innerTimeInputText[1] },
          ]"
          :placeholder="placeholderRight"
          @input="handleInput($event, 1)"
          @focus="handleInputFocus(1)"
          @blur="handleInputBlur()"
          @keyup.enter="handleInputEnter"
        />
        <span
          v-else
          class="aw-range-picker-input-el aw-range-picker-input-el-span"
          :class="[
            !innerTimeInputText[0] && 'aw-range-picker-span-placeholder',
            `aw-range-picker-input-el-${mode === 'week' ? 'date' : mode}-${size}`,
          ]"
        >
          {{ innerTimeInputText[1] || placeholderRight }}
        </span>
      </template>
    </range-picker-input-container>
  </t-tooltip>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch, nextTick } from 'vue';
import dayjs from 'dayjs';
import ToolTip from 'tdesign-vue-next/esm/tooltip';
import RangePickerInputContainer from './base/input-container.vue'
import { RangeValue, RangeTimeOption } from './type';
import { useRangeGlobalConfig, INPUT_FORMAT_MAP, CUSTOM_TYPE, CUSTOM_COMPARE_TYPE } from './constants';
import {
  isValidDate,
  clearDateSlant,
  getInputTextTime,
  isTimeType,
  formatWeekDate,
  getDynamicActive,
  mergeDateTime,
  getMomTitle
} from './utils';
import { useInjectTempTime } from './hooks/useTempTime';

export default defineComponent({
  name: 'RangePickerInput',

  components: {
    TTooltip: ToolTip,
    RangePickerInputContainer,
  },

  props: {
    innerValue: {
      type: Object as PropType<RangeValue>,
      required: true,
    },
    innerCompareValue: {
      type: Array as PropType<RangeValue[]>,
      required: true,
    },
    innerIsCompare: {
      type: Boolean,
      required: true,
    },
    showCompare: {
      type: Boolean,
      required: true,
    },
    // 侧边栏额外配置按钮
    rangeTimeOptions: {
      type: Array as PropType<RangeTimeOption[]>,
      required: true,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      required: true,
    },
    // 是否展示快捷按钮（侧边栏）
    showShortcut: {
      type: Boolean,
      required: true,
    },
    // 是否允许清空
    allowClear: {
      type: Boolean,
      required: true,
    },
    placeholder: {
      type: [String, Array] as PropType<string | string[]>,
      required: true,
    },
    // 弹出层是否可见
    panelVisible: {
      type: Boolean,
      required: true,
    },
    // 尺寸
    size: {
      type: String,
      required: true,
    },
    activeTimeIndex: {
      type: Number,
      required: true,
    },
    mode: {
      type: String as PropType<'month' | 'date' | 'week'>,
      required: true,
    },
    showCompleteInput: {
      type: Boolean,
      required: true,
    },
    borderless: {
      type: Boolean,
      required: true,
    },
    isPrivateCompare: {
      type: Boolean,
      required: true,
    },
    sideTimeDynamicActive: {
      type: Boolean,
      required: true,
    },
    firstDayOfWeek: {
      type: Number,
      default: 1,
    },
    mouseValue: {
      type: Date,
      default: undefined,
    },
    allRangeOptions: {
      type: Array as PropType<RangeTimeOption[]>,
      required: true
    }
  },

  emits: ['clear', 'click-input', 'change-index', 'change-time', 'save-time', 'reset-click'],

  setup(props, { emit }) {
    // 国际化
    const CONST = useRangeGlobalConfig();
    const { globalConfig } = CONST;

    const inputLeftRef = ref();
    const inputRightRef = ref();

    const { tempTime } = useInjectTempTime();

    const selectedOption = computed(() => {
      const findItem = props.allRangeOptions
        .filter((item) => !item.mode || item.mode === props.mode)
        .find((item) => item.type === props.innerValue.type || (item.regex && item.regex.test(props.innerValue.type)))
      return findItem
    })

    const showCompareTooltip = computed(() => {
      // 当存在对比时间，且弹窗不展开时，展示tooltip
      if (
        props.innerIsCompare &&
        props.innerCompareValue.length &&
        props.innerCompareValue.every((item) => item.time.length > 0) &&
        props.showCompare
      ) {
        return true
      }

      return false
    })

    const showTitleTooltip = computed(() => {
      return selectedOption.value?.isCustom
    })

    const showTimePicker = computed(() => isTimeType(props.mode));

    const tooltipVisible = ref(false);
    const handleEnter = () => {
      if (!props.panelVisible && (showCompareTooltip.value || showTitleTooltip.value)) {
        tooltipVisible.value = true;
      }
    };
    const handleLeave = () => {
      tooltipVisible.value = false;
    };

    const formatType = computed(() => {
      return INPUT_FORMAT_MAP[props.mode] || 'YYYY-MM';
    });

    const formatTitle = computed(() => {
      if (!props.innerValue.time.length) {
        return ''
      }

      if (props.sideTimeDynamicActive) {
        return globalConfig.dynamicTimeLabel;
      }

      if (selectedOption.value) {
        return getMomTitle(props.innerValue.type, selectedOption.value.title)
      }

      if (getDynamicActive(props.innerValue.type, props.mode, false)) {
        return globalConfig.dynamicTimeLabel;
      }

      if (props.innerValue.type) {
        return globalConfig.customTimeLabel;
      }

      return '';
    });

    const formatInputTitle = computed(() => {
      if (formatTitle.value !== globalConfig.customTimeLabel) {
        return formatTitle.value
      }

      return ''
    })

    const formatValueText = computed(() => {
      if (props.innerValue.time.length > 0) {
        const text = [
          props.innerValue.time[0] ? dayjs(props.innerValue.time[0]).format(formatType.value) : '',
          props.innerValue.time[1] ? dayjs(props.innerValue.time[1]).format(formatType.value) : '',
        ];
        if (props.mode === 'week') {
          text[0] = props.innerValue.time[0]
            ? formatWeekDate(props.innerValue.time[0], props.firstDayOfWeek, globalConfig.weekAbbreviation)
            : '';
          text[1] = props.innerValue.time[1]
            ? formatWeekDate(props.innerValue.time[1], props.firstDayOfWeek, globalConfig.weekAbbreviation)
            : '';
        }
        return text;
      }
      return [];
    });

    const formatCompareTitle = computed(() => {
      const titleArr: string[] = []
      props.innerCompareValue.forEach((valueItem) => {
        const findItem = props.allRangeOptions.concat(CONST.RANGE_COMPARE_TIME, CONST.CUSTOM_COMPARE_TIME).find(
          (item) =>
            item.type === valueItem.type || (item.regex && item.regex.test(valueItem.type))
        )
        if (findItem) {
          titleArr.push(getMomTitle(valueItem.type, findItem.title))
        } else if (getDynamicActive(valueItem.type, props.mode, false)) {
          titleArr.push(globalConfig.dynamicTimeLabel)
        } else if (valueItem.type) {
          titleArr.push(globalConfig.customTimeLabel)
        } else {
          titleArr.push('')
        }
      })

      return titleArr
    });

    const formatCompareValueText = computed(() => {
      const textArr: string[][] = []

      props.innerCompareValue.forEach((valueItem) => {
        if (valueItem.time.length > 0) {
          const text = [
            valueItem.time[0] ? dayjs(valueItem.time[0]).format(formatType.value) : '',
            valueItem.time[1] ? dayjs(valueItem.time[1]).format(formatType.value) : ''
          ]

          if (props.mode === 'week') {
            // dayjs('2022-01-01').format('YYYY-WW')  2022-52
            text[0] = valueItem.time[0]
              ? formatWeekDate(valueItem.time[0], props.firstDayOfWeek, globalConfig.weekAbbreviation)
              : ''
            text[1] = valueItem.time[1]
              ? formatWeekDate(valueItem.time[1], props.firstDayOfWeek, globalConfig.weekAbbreviation)
              : ''
          }
          textArr.push(text)
        } else {
          textArr.push([])
        }
      })

      return textArr
    });

    const allowInput = computed(() => {
      return (!props.innerIsCompare || !props.showCompare) && !props.disabled;
    });

    const placeholderLeft = computed(() => {
      if (Array.isArray(props.placeholder) && props.placeholder[0]) {
        return props.placeholder[0];
      }
      if (!Array.isArray(props.placeholder) && props.placeholder) {
        return props.placeholder;
      }
      if (props.mode === 'month') {
        return globalConfig.placeholder.select;
      }
      if (showTimePicker.value) {
        return globalConfig.placeholder.startTime;
      }

      return globalConfig.placeholder.startDate;
    });

    const placeholderRight = computed(() => {
      if (Array.isArray(props.placeholder) && props.placeholder[1]) {
        return props.placeholder[1];
      }
      if (!Array.isArray(props.placeholder) && props.placeholder) {
        return props.placeholder;
      }
      if (props.mode === 'month') {
        return globalConfig.placeholder.select;
      }
      if (showTimePicker.value) {
        return globalConfig.placeholder.endTime;
      }

      return globalConfig.placeholder.endDate;
    });

    const handleClear = (e: Event) => {
      tooltipVisible.value = false;
      emit('clear');
    };

    const handleInputClick = () => {
      tooltipVisible.value = false;

      emit('click-input');
    };

    const innerTimeInputText = ref(['', '']);
    const timeInputText = ref(['', '']);

    const showInnerTimeInputText = computed(() => {
      const inputText = innerTimeInputText.value.concat();

      if (props.mouseValue && props.panelVisible && !inputText[props.activeTimeIndex]) {
        let mouseValue = props.mouseValue;
        if (showTimePicker.value) {
          const pickerTime = tempTime?.value ? tempTime.value[props.activeTimeIndex] : dayjs().startOf('d').toDate();
          mouseValue = mergeDateTime(mouseValue, pickerTime);
        }

        inputText[props.activeTimeIndex] = dayjs(mouseValue).format(formatType.value);

        if (props.mode === 'week') {
          inputText[props.activeTimeIndex] = formatWeekDate(
            mouseValue,
            props.firstDayOfWeek,
            globalConfig.weekAbbreviation,
          );
        }
      }

      return inputText;
    });

    watch(
      [() => props.innerValue.time, () => props.mode, () => props.firstDayOfWeek],
      () => {
        let time = ['', ''];

        if (props.innerValue.time.length) {
          time = [
            props.innerValue.time[0] ? dayjs(props.innerValue.time[0]).format(formatType.value) : '',
            props.innerValue.time[1] ? dayjs(props.innerValue.time[1]).format(formatType.value) : '',
          ];

          if (props.mode === 'week') {
            // dayjs('2022-01-01').format('YYYY-WW')  2022-52
            time[0] = props.innerValue.time[0]
              ? formatWeekDate(props.innerValue.time[0], props.firstDayOfWeek, globalConfig.weekAbbreviation)
              : '';
            time[1] = props.innerValue.time[1]
              ? formatWeekDate(props.innerValue.time[1], props.firstDayOfWeek, globalConfig.weekAbbreviation)
              : '';
          }
        }

        innerTimeInputText.value = time.concat();
        timeInputText.value = time.concat();
      },
      {
        deep: true,
        immediate: true,
      },
    );

    let inputChange = false;

    const handleInput = (e: Event, index: number) => {
      inputChange = true;

      const target = e.target as HTMLInputElement;
      const targetValue = target.value;

      innerTimeInputText.value[index] = targetValue;

      if (isValidDate(targetValue, props.mode, props.firstDayOfWeek, globalConfig.weekAbbreviation)) {
        const value = timeInputText.value;

        value[index] = targetValue;

        const emitType = props.isPrivateCompare ? CUSTOM_COMPARE_TYPE : CUSTOM_TYPE;

        emit(
          'change-time',
          {
            value: {
              type: emitType,
              time: getInputTextTime(value, props.mode, props.firstDayOfWeek, globalConfig.weekAbbreviation),
            }
          },
          { resetClick: true },
        );
      }
    };

    const handleInputFocus = (index: number) => {
      if (index !== props.activeTimeIndex) {
        emit('change-index', index);
        emit('reset-click');
      }
    };

    const handleInputBlur = (isSave = false) => {
      // input 触发过才调用后续方法
      if (!inputChange && !isSave) {
        return;
      }
      inputChange = false;

      const value: string[] = timeInputText.value;
      const innerValue: string[] = innerTimeInputText.value;

      const left = value[0];
      const right = value[1];

      const innerLeft = innerValue[0];
      const innerRight = innerValue[1];

      const testLeft = isValidDate(innerLeft, props.mode, props.firstDayOfWeek, globalConfig.weekAbbreviation);
      const testRight = isValidDate(innerRight, props.mode, props.firstDayOfWeek, globalConfig.weekAbbreviation);

      // 大小调换
      if (testLeft && testRight && Number(clearDateSlant(innerLeft)) > Number(clearDateSlant(innerRight))) {
        const emitType = props.isPrivateCompare ? CUSTOM_COMPARE_TYPE : CUSTOM_TYPE;
        emit('change-time', {
          value: {
            type: emitType,
            time: getInputTextTime(
              [innerRight, innerLeft],
              props.mode,
              props.firstDayOfWeek,
              globalConfig.weekAbbreviation,
            ),
          }
        });
        return;
      }

      // 左侧数字错误
      if (!testLeft) {
        innerValue[0] = left;
      } else {
        value[0] = innerLeft;
      }

      // 右侧数字错误
      if (!testRight) {
        innerValue[1] = right;
      } else {
        value[1] = innerRight;
      }
    };

    const handleInputEnter = () => {
      handleInputBlur(true);
      emit('save-time');

      nextTick(() => {
        if (inputLeftRef.value === document.activeElement) {
          inputLeftRef.value?.blur();
        }
        if (inputRightRef.value === document.activeElement) {
          inputRightRef.value?.blur();
        }
      });
    };

    return {
      globalConfig,
      showCompareTooltip,
      showTitleTooltip,
      formatTitle,
      formatValueText,
      formatCompareTitle,
      formatCompareValueText,
      innerTimeInputText,
      allowInput,
      handleClear,
      handleInputClick,
      handleInput,
      handleInputFocus,
      handleInputBlur,
      handleInputEnter,
      tooltipVisible,
      handleEnter,
      handleLeave,
      inputLeftRef,
      inputRightRef,
      placeholderLeft,
      placeholderRight,
      showInnerTimeInputText,
      formatInputTitle,
    };
  },
});
</script>
