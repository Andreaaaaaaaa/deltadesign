<template>
  <div>
    {{ locale.decimalPlaces }}:
    <t-input-number v-model="currentValue.decimal" theme="column" :min="0" :max="10" style="width: 70px" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';
import { InputNumber as TInputNumber } from '../../../../input-number';
import { useLocale } from '../../../hooks';

import { IValueFormatterPercent } from '../../../types';

export default defineComponent({
  name: 'FormatPercent',
  components: { TInputNumber },
  props: {
    modelValue: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const currentValue = computed({
      set: (newVal) => {
        emit('change', newVal);
        emit('update:modelValue', newVal);
      },

      get: () => props.modelValue,
    }) as Ref<IValueFormatterPercent>;

    const { locale } = useLocale();

    return { locale, currentValue };
  },
});
</script>
