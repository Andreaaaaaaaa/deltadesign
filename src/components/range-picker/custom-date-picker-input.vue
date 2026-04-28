<template>
  <t-tooltip placement="top-left" :visible="tooltipVisible">
    <template #content>
      <div v-if="showCompareTooltip" class="aw-range-picker__input-tooltip">
        <span class="aw-range-picker-tooltip-text">{{ globalConfig.currentDateLabel }}</span>
        <span>
          <span v-if="showShortcut && formatTitle" class="aw-range-picker__input-tooltip-title">{{ formatTitle }}</span>
          <span>{{ formatValueText }}</span>
        </span>
        <template v-for="(title, titleIndex) in formatCompareTitle">
          <span class="aw-range-picker-tooltip-text">{{ globalConfig.compareDateLabel }}{{ formatCompareTitle.length > 1 ? titleIndex + 1 : ''}}</span>
          <span>
            <span v-if="showShortcut && formatCompareTitle" class="aw-range-picker__input-tooltip-title">{{ title }}</span>
            <span>{{ formatCompareValueText[titleIndex] }}</span>
          </span>
        </template>
      </div>
      <div v-else-if="showTitleTooltip">
        <span class="aw-range-picker__input-tooltip-title">{{ formatTitle }}</span>
        <span>{{ formatValueText }}</span>
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
      :show-clear-icon="Boolean(innerValue.time || innerCompareValue.length)"
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
          :value="showInnerTimeInputText"
          class="aw-range-picker-input-el"
          :class="[
            panelVisible ? 'aw-range-picker-input-el-focus' : 'aw-range-picker-input-el-blur',
            `aw-range-picker-input-el-${mode === 'week' ? 'date' : mode}-${size}`,
            { 'aw-range-picker-input-el-mouse-enter': mouseValue && !innerTimeInputText },
          ]"
          :placeholder="computedPlaceholder"
          @input="handleInput($event)"
          @blur="handleInputBlur()"
          @keyup.enter="handleInputEnter"
        />
        <span
          v-else
          class="aw-range-picker-input-el aw-range-picker-input-el-span"
          :class="[
            !innerTimeInputText && 'aw-range-picker-span-placeholder',
            `aw-range-picker-input-el-${mode === 'week' ? 'date' : mode}-${size}`,
          ]"
        >
          {{ innerTimeInputText || computedPlaceholder }}
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
import { SingleRangeValue, SingleRangeTimeOption } from './type';
import { useRangeGlobalConfig, INPUT_FORMAT_MAP, CUSTOM_TYPE, CUSTOM_COMPARE_TYPE } from './constants';
import { isValidDate, getInputTextTime, formatWeekDate, getDynamicActive, mergeDateTime, isTimeType, getMomTitle } from './utils';
import { useInjectTempTime } from './hooks/useTempTime';

export default defineComponent({
  name: 'CustomDatePickerInput',

  components: {
    TTooltip: ToolTip,
    RangePickerInputContainer,
  },

  props: {
    innerValue: {
      type: Object as PropType<SingleRangeValue>,
      required: true,
    },
    innerCompareValue: {
      type: Array as PropType<SingleRangeValue[]>,
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
      type: Array as PropType<SingleRangeTimeOption[]>,
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
      type: String,
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
      type: Array as PropType<SingleRangeTimeOption[]>,
      required: true
    }
  },

  emits: ['clear', 'click-input', 'change-index', 'change-time', 'save-time'],

  setup(props, { emit }) {
    // 国际化
    const CONST = useRangeGlobalConfig();
    const { globalConfig } = CONST;

    const inputLeftRef = ref();

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
        props.innerCompareValue.every((item) => item.time) &&
        props.showCompare
      ) {
        return true;
      }

      return false;
    });

    const showTitleTooltip = computed(() => {
      return selectedOption.value?.isCustom
    });

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
      if (!props.innerValue.time) {
        return ''
      }

      if (props.sideTimeDynamicActive) {
        return globalConfig.dynamicTimeLabel;
      }

      if (selectedOption.value) {
        return getMomTitle(props.innerValue.type, selectedOption.value.title)
      }

      if (getDynamicActive(props.innerValue.type, props.mode, true)) {
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
      let text = props.innerValue.time ? dayjs(props.innerValue.time).format(formatType.value) : '';
      if (props.mode === 'week' && props.innerValue.time) {
        text = formatWeekDate(props.innerValue.time, props.firstDayOfWeek, globalConfig.weekAbbreviation);
      }
      return text;
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
        } else if (getDynamicActive(valueItem.type, props.mode, true)) {
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
      const textArr: string[] = []
      props.innerCompareValue.forEach((valueItem) => {
        let text = valueItem.time ? dayjs(valueItem.time).format(formatType.value) : ''
        if (props.mode === 'week' && valueItem.time) {
          text = formatWeekDate(valueItem.time, props.firstDayOfWeek, globalConfig.weekAbbreviation)
        }
        textArr.push(text)
      })

      return textArr
    });

    const allowInput = computed(() => {
      return (!props.innerIsCompare || !props.showCompare) && !props.disabled;
    });

    const computedPlaceholder = computed(() => {
      if (props.placeholder) {
        return props.placeholder;
      }
      if (props.mode === 'month') {
        // return '请选择';
        return globalConfig.placeholder.select;
      }
      // return '请选择日期';
      return globalConfig.placeholder.date;
    });

    const handleClear = () => {
      tooltipVisible.value = false;
      emit('clear');
    };

    const handleInputClick = () => {
      tooltipVisible.value = false;

      emit('click-input');
    };

    const innerTimeInputText = ref('');
    const timeInputText = ref('');

    const showInnerTimeInputText = computed(() => {
      let inputText = innerTimeInputText.value;

      if (props.mouseValue && props.panelVisible && !inputText) {
        let mouseValue = props.mouseValue;
        if (isTimeType(props.mode)) {
          const pickerTime = tempTime?.value ? tempTime.value[0] : dayjs().startOf('d').toDate();
          mouseValue = mergeDateTime(mouseValue, pickerTime);
        }

        inputText = dayjs(mouseValue).format(formatType.value);

        if (props.mode === 'week') {
          inputText = formatWeekDate(mouseValue, props.firstDayOfWeek, globalConfig.weekAbbreviation);
        }
      }

      return inputText;
    });

    watch(
      [() => props.innerValue.time, () => props.mode, () => props.firstDayOfWeek],
      () => {
        let text = props.innerValue.time ? dayjs(props.innerValue.time).format(formatType.value) : '';
        if (props.mode === 'week' && props.innerValue.time) {
          text = formatWeekDate(props.innerValue.time, props.firstDayOfWeek, globalConfig.weekAbbreviation);
        }

        innerTimeInputText.value = text;
        timeInputText.value = text;
      },
      {
        deep: true,
        immediate: true,
      },
    );

    let inputChange = false;

    const handleInput = (e: Event) => {
      inputChange = true;

      const target = e.target as HTMLInputElement;
      const targetValue = target.value;

      innerTimeInputText.value = targetValue;

      if (isValidDate(targetValue, props.mode, props.firstDayOfWeek, globalConfig.weekAbbreviation)) {
        timeInputText.value = targetValue;

        const emitType = props.isPrivateCompare ? CUSTOM_COMPARE_TYPE : CUSTOM_TYPE;

        emit(
          'change-time',
          {
            value: {
              type: emitType,
              time: getInputTextTime(
                [timeInputText.value, ''],
                props.mode,
                props.firstDayOfWeek,
                globalConfig.weekAbbreviation,
              )[0],
            }
          },
          { resetClick: true },
        );
      }
    };

    const handleInputBlur = (isSave = false) => {
      // input 触发过才调用后续方法
      if (!inputChange && !isSave) {
        return;
      }
      inputChange = false;

      const testText = isValidDate(
        innerTimeInputText.value,
        props.mode,
        props.firstDayOfWeek,
        globalConfig.weekAbbreviation,
      );

      if (!testText) {
        innerTimeInputText.value = timeInputText.value;
      } else {
        timeInputText.value = innerTimeInputText.value;
      }
    };

    const handleInputEnter = () => {
      handleInputBlur(true);
      emit('save-time');

      nextTick(() => {
        if (inputLeftRef.value === document.activeElement) {
          inputLeftRef.value?.blur();
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
      handleInputBlur,
      handleInputEnter,
      tooltipVisible,
      handleEnter,
      handleLeave,
      inputLeftRef,
      computedPlaceholder,
      showInnerTimeInputText,
      formatInputTitle
    };
  },
});
</script>
