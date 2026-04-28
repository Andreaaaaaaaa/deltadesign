<template>
  <div v-if="(option as GroupOption).children">
    <div class="aw-range-picker-side-btn" :class="{ 'aw-range-picker-side-btn-active': optionActive }" @click="handleExpandGroup">
      <div class="aw-range-picker-side-btn-wrap">
        <svg
          class="aw-range-picker-side-btn-tree-icon"
          :class="{ 'aw-range-picker-side-btn-icon-rotate': expandGroupIds.includes((option as GroupOption).id) }"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 10.9594V5.04C5.5 4.62075 5.98497 4.38766 6.31235 4.64957L10.012 7.60925C10.2622 7.80942 10.2622 8.18996 10.012 8.39012L6.31235 11.3498C5.98497 11.6117 5.5 11.3786 5.5 10.9594Z"
            fill="#202020"
            fill-opacity="0.6"
          />
        </svg>
        <t-tooltip
          placement="top-left"
          :content="option.title"
          :visible="tooltipVisible"
        >
          <span :class="HIGHLIGHT_CLASS" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">{{ (option as GroupOption).title }}</span>
        </t-tooltip>
      </div>
    </div>
    <template v-if="expandGroupIds.includes((option as GroupOption).id)">
      <range-picker-button
        v-for="(child, index) in (option as GroupOption).children"
        :key="index"
        :inner-type="innerType"
        :option="child"
        :get-option-value-text="getOptionValueText"
        :active="active"
        :enable-tooltip="enableTooltip"
        :level="level + 1"
        @click-side-btn="handleClick"
      />
    </template>
  </div>
  <t-tooltip
    v-else
    placement="right-top"
    :show-arrow="false"
    destroy-on-close
    :overlay-class-name="`aw-range-picker-side-btn-popover ${sideMouse ? 'aw-range-picker-side-btn-popover-offset' : ''}`"
    :disabled="!enableTooltip"
  >
    <template #content>
      <div>
        <div class="aw-range-picker-btn-tooltip-title">{{ option.title }}</div>
        <div>
          <span class="aw-range-picker-btn-tooltip-label">{{ globalConfig.nodeTimeLabel }}</span>
          <template v-if="(valueText?.length ?? 0) > 1">
            <span>{{ valueText?.[0] }}</span>
            <span class="aw-range-picker-tooltip-middle-text">{{ globalConfig.rangePickerSeparator }}</span>
            <span>{{ valueText?.[1] }}</span>
          </template>
          <template v-else>
            <span>{{ valueText?.[0] }}</span>
          </template>
        </div>
      </div>
    </template>
    <div
      class="aw-range-picker-side-btn"
      :class="{ 'aw-range-picker-side-btn-active': optionActive }"
      @click="handleClick(option)"
    >
      <span
        :style="{ textIndent: `${level * INDENT_WIDTH}px` }"
        :class="[
          HIGHLIGHT_CLASS,
          {
            'aw-range-picker-side-icon-exist': existTree && level === 0
          }
        ]"
      >{{ option.title }}</span>
      <svg
        v-if="optionActive"
        class="aw-range-picker-side-svg-active"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.5483 4.03837C13.7435 4.23363 13.7435 4.55021 13.5483 4.74547L6.92683 11.3669C6.53631 11.7574 5.90314 11.7574 5.51262 11.3669L2.48592 8.3402C2.29066 8.14494 2.29066 7.82836 2.48592 7.63309C2.68119 7.43783 2.99777 7.43783 3.19303 7.63309L6.21973 10.6598L12.8411 4.03837C13.0364 3.84311 13.353 3.84311 13.5483 4.03837Z"
          fill="#202020"
        />
      </svg>
    </div>
  </t-tooltip>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import { default as TTooltip } from 'tdesign-vue-next/esm/tooltip';
import { useRangeGlobalConfig, HIGHLIGHT_CLASS } from '../constants';
import type { RangeTimeOption, SingleRangeTimeOption, GroupOption } from '../type'
import { injectSideMouse } from '../hooks/useSideMouse'

defineOptions({
  name: 'RangePickerButton',
})

const props = defineProps({
  innerType: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true
  },
  enableTooltip: {
    type: Boolean,
    default: false,
  },
  option: {
    type: Object as PropType<RangeTimeOption | SingleRangeTimeOption | GroupOption>,
    required: true
  },
  getOptionValueText: {
    type: Function as PropType<(option: RangeTimeOption | SingleRangeTimeOption) => string[]>,
    default: undefined
  },
  level: {
    type: Number,
    default: 0
  },
  expandGroupIds: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  existTree: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click-side-btn', 'expand-group'])

const CONST = useRangeGlobalConfig();
const { globalConfig } = CONST;

const INDENT_WIDTH = 30

const sideMouse = injectSideMouse()

const showPopup = ref(false)

const tooltipVisible = ref(false)

const optionActive = computed(() => {
  let innerActive = false
  if ((props.option as GroupOption).children) {
    innerActive = (props.option as GroupOption).children.some((child) => {
      return props.innerType === (child as RangeTimeOption | SingleRangeTimeOption).type ||
        (child as RangeTimeOption | SingleRangeTimeOption).regex?.test(props.innerType)
    }) && !props.expandGroupIds.includes((props.option as GroupOption).id)
  } else {
    innerActive = Boolean(props.innerType === (props.option as RangeTimeOption | SingleRangeTimeOption).type ||
      (props.option as RangeTimeOption | SingleRangeTimeOption).regex?.test(props.innerType))
  }

  return props.active && innerActive
})

const valueText = computed(() => {
  if ((props.option as GroupOption).children) {
    return []
  }
  return props.getOptionValueText?.(props.option as RangeTimeOption | SingleRangeTimeOption) || []
})

// 处理tooltip移上去后不隐藏问题
let enterTimer: NodeJS.Timeout

const handleMouseEnter = (e: MouseEvent) => {
  if (props.enableTooltip) {
    enterTimer = setTimeout(() => {
      const titleSpan = e.target as HTMLElement;
      if (titleSpan) {
        const scrollW = titleSpan.scrollWidth;
        const clientW = titleSpan.clientWidth;

        if (scrollW > clientW) {
          tooltipVisible.value = true;
        } else {
          tooltipVisible.value = false;
        }
      }
    }, 50)
  }
}

const handleMouseLeave = () => {
  clearTimeout(enterTimer)
  setTimeout(() => {
    tooltipVisible.value = false
  }, 100)
}

const handleClick = (option: RangeTimeOption | SingleRangeTimeOption | GroupOption) => {
  if ((option as GroupOption).children) {
    return
  }

  showPopup.value = false
  tooltipVisible.value = false
  emit('click-side-btn', option)
}

const handleExpandGroup = () => {
  emit('expand-group', (props.option as GroupOption).id)
}
</script>
