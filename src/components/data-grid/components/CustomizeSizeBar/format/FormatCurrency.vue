<template>
  <div class="format-content-item">
    {{ locale.decimalPlaces }}
    <t-input-number v-model="state.decimal" theme="column" :min="0" :max="10" style="width: 70px" />
  </div>
  <div class="format-content-item">
    {{ locale.currencySymbol }}
    <t-select
      v-model="state.sign"
      :popup-props="{ attach: getAttach, destroyOnClose: true }"
      size="small"
      :options="CURRENCY_MAPPING"
    />
  </div>
  <FormatNegative v-model="state.negative" />
</template>

<script lang="ts">
import { Ref, PropType, computed, defineComponent } from 'vue';

import { Select as TSelect } from '../../../../select';
import FormatNegative from '../../common/FormatNegative.vue';
import { InputNumber as TInputNumber } from '../../../../input-number';

import { CURRENCY_MAPPING } from '../../../constant';
import { useLocale, useAttach } from '../../../hooks';
import { IAgGridCommon, TEmitEditChange, IValueFormatterCurrency } from '../../../types';

export default defineComponent({
  name: 'FormatCurrency',
  components: { TSelect, TInputNumber, FormatNegative },
  props: {
    modelValue: {
      type: Object as PropType<any>,
      required: true,
    },
    params: {
      required: true,
      type: Object as PropType<
        IAgGridCommon & {
          onChange: TEmitEditChange;
        }
      >,
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const state = computed({
      set(newVal) {
        emit('change', newVal);
        emit('update:modelValue', newVal);
      },
      get() {
        return props.modelValue;
      },
    }) as Ref<IValueFormatterCurrency>;

    const { locale } = useLocale();
    const { getAttach } = useAttach('#t-data-grid-format-currency-select-attach', props.params.context.rootRef);

    return { state, locale, getAttach, CURRENCY_MAPPING };
  },
});
</script>
