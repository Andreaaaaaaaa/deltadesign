<template>
  <div
    :class="[
      'aw-range-picker-input',
      'aw-range-picker-input-' + size,
      'aw-range-picker-input__rounded',
      { 'aw-range-picker-input__borderless': borderless },
      { 'aw-range-picker-input-disabled': disabled },
      { 'aw-range-picker-input__panel-visible': panelVisible },
    ]"
    @click="handleInputClick"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
  >
    <span class="aw-range-picker-input-has-value">
      <div v-if="$slots.title" class="aw-range-picker-title-slot">
        <slot name="title" />
      </div>
      <span v-if="innerIsCompare && showCompare" class="aw-range-picker-input-title-icon">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.92495 0.165916H5.21711L3.18599 5.85338H2.01093L0 0.165916H1.32851L2.62067 4.4836L3.92495 0.165916Z"
            fill="#202020"
            fill-opacity="0.6"
          />
          <path
            d="M6.30522 4.09775C6.34291 4.35756 6.41694 4.55177 6.52731 4.68039C6.72921 4.91447 7.07513 5.03151 7.56508 5.03151C7.85851 5.03151 8.09675 5.00064 8.27981 4.93891C8.62708 4.82058 8.80071 4.60064 8.80071 4.2791C8.80071 4.09132 8.71457 3.94598 8.54228 3.84309C8.36999 3.74277 8.09944 3.65402 7.73064 3.57685L7.10071 3.4418C6.48155 3.30804 6.05352 3.1627 5.81662 3.00579C5.41551 2.74341 5.21496 2.33312 5.21496 1.77492C5.21496 1.26559 5.40878 0.842444 5.79643 0.505466C6.18408 0.168489 6.75344 0 7.50451 0C8.13175 0 8.66611 0.159486 9.1076 0.478457C9.55178 0.794855 9.78464 1.25531 9.80618 1.85981H8.61092C8.58939 1.51768 8.43325 1.2746 8.14251 1.13055C7.94869 1.03537 7.70776 0.987781 7.41971 0.987781C7.09936 0.987781 6.84362 1.04952 6.65249 1.17299C6.46136 1.29646 6.36579 1.46881 6.36579 1.69003C6.36579 1.89325 6.46001 2.04502 6.64845 2.14534C6.76959 2.21222 7.02802 2.29068 7.42375 2.38071L8.4494 2.61608C8.89897 2.71897 9.23816 2.85659 9.46698 3.02894C9.82233 3.29646 10 3.6836 10 4.19035C10 4.70997 9.79137 5.14212 9.37411 5.48682C8.95954 5.82894 8.37268 6 7.61353 6C6.83824 6 6.2285 5.83151 5.78432 5.49453C5.34014 5.15498 5.11804 4.68939 5.11804 4.09775H6.30522Z"
            fill="#202020"
            fill-opacity="0.6"
          />
        </svg>
      </span>
      <span v-if="formatTitle" class="aw-range-picker-input-title-type">{{ formatTitle }}</span>
      <template v-if="showCompleteInput || !formatTitle">
        <slot name="input"  />
      </template>
    </span>
    <span class="aw-range-picker-input-calendar-icon">
      <svg height="16" width="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.5 0C9.77614 0 10 0.223858 10 0.5V1H11C12.3807 1 13.5 2.11929 13.5 3.5V11C13.5 12.3807 12.3807 13.5 11 13.5H3C1.61929 13.5 0.5 12.3807 0.5 11V3.5C0.5 2.11929 1.61929 1 3 1H4V0.5C4 0.223858 4.22386 0 4.5 0C4.77614 0 5 0.223858 5 0.5V1H9V0.5C9 0.223858 9.22386 0 9.5 0ZM4 2V2.5C4 2.77614 4.22386 3 4.5 3C4.77614 3 5 2.77614 5 2.5V2H9V2.5C9 2.77614 9.22386 3 9.5 3C9.77614 3 10 2.77614 10 2.5V2H11C11.8284 2 12.5 2.67157 12.5 3.5V4.5H1.5V3.5C1.5 2.67157 2.17157 2 3 2H4ZM1.5 5.5V11C1.5 11.8284 2.17157 12.5 3 12.5H11C11.8284 12.5 12.5 11.8284 12.5 11V5.5H1.5Z"
          fill="currentColor"
        />
      </svg>
    </span>
    <span
      v-if="allowClear && showClearIcon"
      class="aw-range-picker-input-clear-icon"
      @click="handleClear"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8ZM10.4746 10.4746C10.2794 10.6699 9.96277 10.6699 9.76751 10.4746L8.00004 8.70715L6.2325 10.4747C6.03724 10.6699 5.72066 10.6699 5.52539 10.4747C5.33013 10.2794 5.33013 9.96284 5.52539 9.76758L7.29293 8.00004L5.52486 6.23197C5.3296 6.03671 5.3296 5.72013 5.52486 5.52486C5.72013 5.3296 6.03671 5.3296 6.23197 5.52486L8.00004 7.29293L9.76803 5.52494C9.9633 5.32968 10.2799 5.32968 10.4751 5.52494C10.6704 5.7202 10.6704 6.03678 10.4751 6.23205L8.70715 8.00004L10.4746 9.7675C10.6699 9.96277 10.6699 10.2793 10.4746 10.4746Z"
          fill="#202020"
          fill-opacity="0.6"
        />
      </svg>
    </span>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'RangePickerInputContainer'
})

defineProps({
  // 尺寸
  size: {
    type: String,
    required: true
  },
  borderless: {
    type: Boolean,
    required: true
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    required: true
  },
  // 弹出层是否可见
  panelVisible: {
    type: Boolean,
    required: true
  },
  innerIsCompare: {
    type: Boolean,
    required: true
  },
  showCompare: {
    type: Boolean,
    required: true
  },
  formatTitle: {
    type: String,
    default: ''
  },
  showCompleteInput: {
    type: Boolean,
    required: true
  },
  // 是否允许清空
  allowClear: {
    type: Boolean,
    required: true
  },
  showClearIcon: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['inputClick', 'enter', 'leave', 'clear'])

const handleInputClick = () => {
  emit('inputClick')
}

const handleEnter = () => {
  emit('enter')
}

const handleLeave = () => {
  emit('leave')
}

const handleClear = (e: Event) => {
  emit('clear')
  e.stopPropagation()
}
</script>