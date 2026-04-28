<template>
  <div class="negative-list-select">
    <div class="format-content-item">
      <div class="negative-list-select-title">{{ locale.timeGranularity }}:</div>
      <TSelect
        :value="date"
        size="small"
        :options="DATE_MAPPING()"
        :popup-props="{ attach: getAttach, destroyOnClose: true }"
        @change="handleDateChange"
      />
    </div>
    <div class="format-content-item">
      <div class="negative-list-select-title">
        {{ locale.displayFormat }}:
        <t-popup :content="popupContent" show-arrow :attach="getAttach" destroy-on-close>
          <IconFont name="help-circle" />
        </t-popup>
      </div>
      <TSelect
        v-model="currentValue.date"
        size="small"
        :options="typeOptions"
        :popup-props="{ attach: getAttach, destroyOnClose: true }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, PropType, Ref } from 'vue';

import { IconFont } from 'tdesign-icons-vue-next';

import { Popup as TPopup } from '../../../../popup';
import { Select as TSelect } from '../../../../select';

import { DATE_MAPPING } from '../../../constant';
import { E_DATE_KEY, E_FORMAT_DATE } from '../../../enums';
import { useAttach, useLocale } from '../../../hooks';
import { TOptionsItem, IValueFormatterDate, IAgGridCommon, TEmitEditChange } from '../../../types';

export default defineComponent({
  components: { TSelect, TPopup, IconFont },
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
    const typeOptions = ref<TOptionsItem<E_FORMAT_DATE>[]>([]);

    const { locale } = useLocale();
    const { getAttach } = useAttach('#t-data-grid-format-date-select-attach', props.params.context.rootRef);

    const popupContent = computed(() => `${locale.value.take} 2024-01-01 ${locale.value.asAnExample}`);
    const findDate = (key: E_FORMAT_DATE) => {
      let cache = E_DATE_KEY.DD;
      DATE_MAPPING().forEach((item) => {
        const { children, value } = item;
        if (children.find((child) => child.value === key)) {
          cache = value;
          typeOptions.value = children;
        }
      });
      return cache;
    };
    const currentValue = computed({
      set: (newVal) => {
        emit('change', newVal);
        emit('update:modelValue', newVal);
      },
      get: () => props.modelValue,
    }) as Ref<IValueFormatterDate>;

    const date = computed<E_DATE_KEY>(() => findDate(currentValue.value.date));

    const handleDateChange = (value: E_DATE_KEY) => {
      const target = DATE_MAPPING().find((item) => item.value === value)?.children || [];
      typeOptions.value = target;
      if (currentValue.value) {
        currentValue.value.date = target?.[0]?.value || E_FORMAT_DATE.YYYY_MM_DD;
      }
    };

    return { date, locale, getAttach, typeOptions, popupContent, DATE_MAPPING, handleDateChange, currentValue };
  },
});
</script>
