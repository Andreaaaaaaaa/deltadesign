<template>
  <div class="negative-list-select">
    <div class="negative-list-select-title">
      {{ locale.timeGranularity }}:
      <t-popup :content="popupContent" show-arrow :attach="getAttach" destroy-on-close>
        <IconFont name="help-circle" />
      </t-popup>
    </div>
    <TSelect
      v-model="currentValue.time"
      size="small"
      :options="TIME_MAPPING"
      :popup-props="{ attach: getAttach, destroyOnClose: true }"
    />
  </div>
</template>

<script lang="ts">
import { IconFont } from 'tdesign-icons-vue-next';
import { computed, defineComponent, PropType, Ref } from 'vue';

import { Popup as TPopup } from '../../../../popup';
import { Select as TSelect } from '../../../../select';

import { useLocale, useAttach } from '../../../hooks';
import { TIME_MAPPING } from '../../../constant';
import { IValueFormatterTime, IAgGridCommon, TEmitEditChange } from '../../../types';

export default defineComponent({
  components: { TSelect, IconFont, TPopup },
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
    const currentValue = computed({
      set: (newVal) => {
        emit('change', newVal);
        emit('update:modelValue', newVal);
      },
      get: () => props.modelValue,
    }) as Ref<IValueFormatterTime>;

    const { getAttach } = useAttach('#t-data-grid-format-time-select-attach', props.params.context.rootRef);
    const { locale } = useLocale();

    const popupContent = computed(() => `${locale.value.take} 2024-01-01 ${locale.value.asAnExample}`);

    return { locale, getAttach, TIME_MAPPING, popupContent, currentValue };
  },
});
</script>
