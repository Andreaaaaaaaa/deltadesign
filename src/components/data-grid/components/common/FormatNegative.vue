<template>
  <div class="negative-list-select">
    <div class="negative-list-select-title">
      {{ locale.negativeNumberDisplay }}
      <t-popup :content="popupContent" show-arrow attach="#negative-select-attach">
        <IconFont name="help-circle" />
      </t-popup>
    </div>
    <Select
      v-model="currentValue"
      size="small"
      :popup-props="{ attach: '#negative-select-attach' }"
      :options="NEGATIVE_MAPPING"
      @change="handleNegativeChange"
    />
    <div id="negative-select-attach" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { IconFont } from 'tdesign-icons-vue-next';

import { Select } from '../../../select';
import { Popup as TPopup } from '../../../popup';

import { E_FORMAT_NEGATIVE } from '../../enums';
import { NEGATIVE_MAPPING } from '../../constant';
import { useLocale } from '../../hooks';

export default defineComponent({
  name: 'FormatNegative',
  components: { Select, IconFont, TPopup },
  props: {
    modelValue: {
      type: String as PropType<E_FORMAT_NEGATIVE>,
      default: E_FORMAT_NEGATIVE.MINUS,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const currentValue = computed({
      get() {
        return props.modelValue;
      },
      set(newVal) {
        emit('update:modelValue', newVal);
      },
    });

    const { locale } = useLocale();

    const popupContent = computed(() => `${locale.value.take} -1234.10 ${locale.value.asAnExample}`);

    const handleNegativeChange = (value: E_FORMAT_NEGATIVE) => {
      emit('update:modelValue', value);
    };

    return { NEGATIVE_MAPPING, locale, popupContent, currentValue, handleNegativeChange };
  },
});
</script>
