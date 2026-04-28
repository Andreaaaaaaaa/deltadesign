<template>
  <t-popup
    trigger="click"
    placement="bottom-left"
    :visible="visible"
    overlay-class-name="aw-range-picker-select-popover"
    @visible-change="handleVisibleChange"
  >
    <div class="aw-range-picker-select-item" :class="{ 'aw-range-picker-select-item-active': visible }">
      <slot v-if="$slots.label" name="label" />
      <span v-else>{{ showLabel }}</span>
      <span class="aw-range-picker-select-item-icon">
        <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.39877 0C5.82835 -3.74878e-08 6.05794 0.505961 5.77506 0.829252L3.37694 3.56996C3.17773 3.79762 2.82357 3.79762 2.62436 3.56996L0.226247 0.829252C-0.056633 0.505961 0.172956 4.56038e-07 0.602536 4.1855e-07L5.39877 0Z"
            fill="#202020"
            fill-opacity="0.6"
          />
        </svg>
      </span>
    </div>
    <template #content>
      <div
        ref="selectContainerRef"
        class="aw-range-picker-select"
        @scroll="handleSelectContainerScroll($event)"
      >
        <div
          v-for="optionItem in options"
          :key="optionItem.value"
          class="aw-range-picker-select-option"
          :class="{ 'aw-range-picker-select-option-active': optionItem.value === value }"
          @click="handleSelect(optionItem.value)"
        >
          <span>{{ optionItem.label }}</span>
          <svg
            v-if="optionItem.value === value"
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
        <div v-if="showMask" ref="selectMaskRef" class="aw-range-picker-select-mask"></div>
      </div>
    </template>
  </t-popup>
</template>

<script lang="ts" setup>
import { default as TPopup } from 'tdesign-vue-next/esm/popup';
import { computed, ref, nextTick, PropType } from 'vue';
import { getFixedNumber } from '../utils';

const props = defineProps({
  type: {
    type: String,
    default: 'year',
  },
  value: {
    type: [Number, String],
    default: undefined,
  },
  options: {
    type: Array as PropType<{ label: string; value: number | string }[]>,
    default: () => [],
  },
  showMask: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['visible-change', 'select']);

const visible = ref(false);

const showLabel = computed(() => {
  return props.options?.find((item) => item.value === props.value)?.label || ''
});

const selectContainerRef = ref<HTMLElement>();
const selectMaskRef = ref<HTMLElement>();

const handleVisibleChange = (value: boolean) => {
  visible.value = value;

  if (value) {
    nextTick(() => {
      const PADDING = 4;
      const ACTIVE_CLASS = '.aw-range-picker-select-option-active';
      const container = selectContainerRef.value;
      const activeItem = container?.querySelector(ACTIVE_CLASS);
      const offsetElementNum = Array.from(container?.childNodes || []).findIndex((ele) => ele === activeItem);
      const elementHeight = activeItem?.clientHeight || 0;
      const halfElementHeight = elementHeight / 2;

      if (container) {
        container.scrollTop =
          elementHeight * offsetElementNum - container.clientHeight / 2 + PADDING - halfElementHeight;
      }
    });
  }
};

const handleSelectContainerScroll = (e: Event) => {
  const { scrollTop, clientHeight, scrollHeight } = e.target as HTMLElement;
  const isBottom = getFixedNumber(scrollTop + clientHeight, 0) >= getFixedNumber(scrollHeight, 0);

  if (isBottom) {
    selectMaskRef.value?.classList.add('aw-range-picker-select-mask__hidden');
  } else {
    selectMaskRef.value?.classList.remove('aw-range-picker-select-mask__hidden');
  }
};

const handleSelect = (value: number | string) => {
  emit('select', value);

  visible.value = false;
};
</script>
