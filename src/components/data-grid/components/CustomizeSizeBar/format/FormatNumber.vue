<template>
  <div class="format-number">
    <div class="format-content-item">
      {{ locale.decimalPlaces }}:
      <t-input-number v-model="innerValue.decimal" size="small" theme="column" :min="0" style="width: 70px" />
    </div>
    <div class="format-content-item">
      {{ locale.useThousandths }}(,):
      <Switch v-model="innerValue.thousandths" size="small" />
    </div>
    <FormatNegative v-model="innerValue.negative" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, Ref } from 'vue';

import FormatNegative from '../../common/FormatNegative.vue';
import { Switch } from '../../../../switch';

import { IValueFormatterNumber } from '../../../types';
import { InputNumber as TInputNumber } from '../../../../input-number';
import { useLocale } from '../../../hooks';

export default defineComponent({
  name: 'FormatNumber',
  components: { Switch, TInputNumber, FormatNegative },
  props: {
    modelValue: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const innerValue = computed({
      set(newVal) {
        emit('change', newVal);
        emit('update:modelValue', newVal);
      },
      get() {
        console.log('props.modelValue', props.modelValue);
        return props.modelValue;
      },
    }) as Ref<IValueFormatterNumber>;

    const { locale } = useLocale();

    return { locale, innerValue };
  },
});
</script>

<style lang="scss">
.format-number {
  display: flex;
  flex-direction: column;
}
</style>
