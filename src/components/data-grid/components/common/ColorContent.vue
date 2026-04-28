<template>
  <TRadioGroup v-model="colorSourceType" size="small" style="margin-bottom: 12px">
    <t-radio-button value="systemColorPannel">{{ locale.systemDefault }}</t-radio-button>
    <t-radio-button value="customColorPannel">{{ locale.custom }}</t-radio-button>
  </TRadioGroup>
  <div v-if="colorSourceType === 'systemColorPannel'">
    <div v-for="(row, idx) in SYSTEM_COLORS" :key="idx" class="aw-color-wrap aw-mb-2 aw-flex aw-items-center">
      <template v-for="(color, i) in row" :key="i">
        <t-tooltip :content="color.name" :overlay-style="{ top: '2px' }">
          <span
            :style="{ backgroundColor: `${color.val}` }"
            :class="[
              'aw-inline-block aw-h-4 aw-w-4 hover:aw-outline hover:aw-outline-1 hover:aw-outline-offset-1 hover:aw-outline-gray-20',
              colorsEqual(color.val) ? 'aw-outline aw-outline-1 aw-outline-offset-1' : '',
              i !== 0 ? 'aw-ml-2' : '',
            ]"
            @click="() => handleChangeColor(color.val)"
          >
          </span>
        </t-tooltip>
      </template>
    </div>
  </div>
  <t-color-picker-panel
    v-else
    class="select-color-panel"
    style="width: 230px"
    format="HEX"
    :color-modes="['monochrome']"
    :popup-props="{ attach: '#select-color-attach' }"
    @change="handleChangeColor"
  />
  <div id="select-color-attach" />
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue';

import { ColorPickerPanel as TColorPickerPanel } from '../../../color-picker';
import { RadioButton as TRadioButton, RadioGroup as TRadioGroup } from '../../../radio';

import { useLocale } from '../../hooks';
import { SYSTEM_COLORS } from '../../constant';

const colorSourceType = ref('systemColorPannel');

const props = defineProps({
  modelValue: {
    type: String,
    reuqired: true,
    default: '',
  },
});

const { locale } = useLocale();

const emit = defineEmits(['change', 'update:modelValue']);

const emitEvent = (value: string) => {
  emit('change', value);
  emit('update:modelValue', value);
};

const currentValue = computed({
  get() {
    return props.modelValue || '';
  },
  set() {
    emitEvent(currentValue.value);
  },
});

/**
 * 不同格式颜色值对比
 */
const colorsEqual = (color1: string) => color1 === currentValue.value;

const handleChangeColor = (value: string) => {
  emitEvent(value);
};
</script>

<style lang="scss"></style>
