<template>
  <Layout :title="locale.formatCells" :preview="previewData" @close="handleClose">
    <t-form id="cell-format-form" label-align="top" :data="formData" label-width="50px">
      <t-form-item :label="locale.dataFormat" name="type">
        <Select
          v-model="formData.key"
          size="small"
          style="width: 100%"
          :options="listArr"
          :popup-props="{ attach: getAttach, destroyOnClose: true }"
        />
      </t-form-item>
      <div v-if="formData.key === E_FORMAT_KEY.UNSET" style="margin-bottom: 16px">{{ locale.formatUnsetTip }}</div>
      <div v-if="formData.key !== E_FORMAT_KEY.UNSET" class="cell-format-sub-form">
        <template v-if="formData.key === E_FORMAT_KEY.NUMBER">
          <FormatNumber v-model="formData" :params="params" />
        </template>
        <template v-if="formData.key === E_FORMAT_KEY.PERCENT">
          <FormatPercent v-model="formData" :params="params" />
        </template>
        <template v-if="formData.key === E_FORMAT_KEY.CURRENCY">
          <FormatCurrency v-model="formData" :params="params" />
        </template>
        <template v-if="formData.key === E_FORMAT_KEY.DATE">
          <FormatDate v-model="formData" :params="params" />
        </template>
      </div>
    </t-form>
    <template #footer>
      <Button form="cell-format-form" type="submit" @click="handleSubmit">{{ locale.confirm }}</Button>
      <Button theme="default" variant="outline" @click="handleClose">{{ locale.cancel }}</Button>
    </template>
  </Layout>
</template>

<script lang="ts">
import lodash from 'lodash';
import {
  toRefs,
  ref,
  PropType,
  defineComponent,
  unref,
  onMounted,
  onUnmounted,
  watch,
  watchEffect,
  computed,
} from 'vue';

import { eventBus } from '../../class';
import { useAttach, useLocale } from '../../hooks';
import { Select } from '../../../select';
import { Button } from '../../../button';
import { Form as TForm, FormItem as TFormItem } from '../../../form';

import Layout from './Layout.vue';
import FormatDate from './format/FormatDate.vue';
import FormatNumber from './format/FormatNumber.vue';
import FormatPercent from './format/FormatPercent.vue';
import FormatCurrency from './format/FormatCurrency.vue';

import { formattedText, closeBarToolPanels } from '../../plugin';
import { IAgGridCommon, TValueFormat, TEmitEditChange, TValueFormatFormData } from '../../types';
import {
  E_FORMAT_KEY,
  E_FORMAT_TIME,
  E_FORMAT_DATE,
  E_CURRENCY_KEY,
  E_EVENT_BUS_KEY,
  E_FORMAT_NEGATIVE,
} from '../../enums';
import {
  getRangeInfo,
  getRangeContent,
  getRangeRowData,
  rangesUpdateContent,
  clearFormatAttachChildren,
} from '../../utils';

const pickAttr: Record<E_FORMAT_KEY, Array<string>> = {
  [E_FORMAT_KEY.UNSET]: ['key'],
  [E_FORMAT_KEY.NUMBER]: ['key', 'decimal', 'thousandths', 'negative'],
  [E_FORMAT_KEY.CURRENCY]: ['key', 'decimal', 'sign', 'negative'],
  [E_FORMAT_KEY.PERCENT]: ['key', 'decimal'],
  [E_FORMAT_KEY.DATE]: ['key', 'date'],
};

const baseFormData = {
  key: E_FORMAT_KEY.UNSET,
  decimal: 2,
  sign: E_CURRENCY_KEY.NULL,
  thousandths: false,
  date: E_FORMAT_DATE.YYYY_MM_DD,
  time: E_FORMAT_TIME.HH_MM,
  negative: E_FORMAT_NEGATIVE.MINUS,
};
export default defineComponent({
  name: 'CellFormat',
  components: {
    Layout,
    Select,
    TForm,
    Button,
    FormatDate,
    FormatNumber,
    FormatPercent,
    FormatCurrency,
    TFormItem,
  },
  props: {
    params: {
      required: true,
      type: Object as PropType<
        IAgGridCommon & {
          onChange: TEmitEditChange;
        }
      >,
    },
  },
  setup(props) {
    const { params } = toRefs(props);
    const sigleCell = ref(false);

    const formData = ref<TValueFormatFormData>({ ...baseFormData });

    const previewData = ref('');
    const { locale } = useLocale();
    const { getAttach } = useAttach('#t-data-grid-cell-format-select-attach', params.value.context.rootRef);

    const listArr = computed(() => [
      { value: E_FORMAT_KEY.UNSET, label: locale.value.common },
      { value: E_FORMAT_KEY.NUMBER, label: locale.value.number },
      { value: E_FORMAT_KEY.PERCENT, label: locale.value.percent },
      { value: E_FORMAT_KEY.DATE, label: locale.value.date },
      { value: E_FORMAT_KEY.CURRENCY, label: locale.value.currency },
    ]);

    const handleClose = () => {
      formData.value = {
        ...baseFormData,
      };
      closeBarToolPanels(params.value.api);
    };

    const handleSubmit = () => {
      const config = lodash.pick(unref(formData), pickAttr[unref(formData).key]) as TValueFormat;
      const { startRowIndex, endRowIndex, columnKeys } = getRangeInfo(params.value.api);
      const content = rangesUpdateContent(
        params.value.context.content,
        startRowIndex,
        endRowIndex,
        columnKeys,
        {
          valueFormatter: config,
        },
        true,
      );

      params.value.onChange?.({
        content,
      });
      handleClose();
    };

    const handleCalcPreview = (config: TValueFormatFormData) => {
      const rangeData = getRangeRowData(params.value.api);
      const flatData = rangeData.flat(2);
      const result = flatData.filter((item) => Boolean(item?.toString()));
      let returnData = result.length === 1 ? result[0] : '';
      if (returnData) {
        returnData = formattedText[config.key](returnData, config);
      }

      previewData.value = returnData;
    };

    watchEffect(() => {
      // 计算预览值
      handleCalcPreview(formData.value);
    });

    watch(
      () => formData.value.key,
      (newVal) => {
        clearFormatAttachChildren(newVal);
      },
    );

    const editFormat = () => {
      const { endRowIndex, startRowIndex, columnKeys } = getRangeInfo(params.value.api);

      sigleCell.value = endRowIndex === startRowIndex && columnKeys.length === 1;

      if (sigleCell.value) {
        // 选中单个单元格
        const currentField = columnKeys[0];
        const rangeContext = getRangeContent(params.value.api, params.value.context.content, {
          startRowIndex,
          endRowIndex,
          columnKeys,
        });
        const currentFormat = rangeContext[0]?.[currentField]?.valueFormatter || {};
        formData.value = {
          ...baseFormData,
          ...currentFormat,
        };
      }
    };

    onMounted(() => {
      eventBus.on(E_EVENT_BUS_KEY.FORMATTER, editFormat);
    });

    onUnmounted(() => {
      eventBus.off(E_EVENT_BUS_KEY.FORMATTER, editFormat);
    });

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      params,
      locale,
      listArr,
      formData,
      getAttach,
      previewData,
      E_FORMAT_KEY,
      handleClose,
      handleSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.cell-format-sub-form {
  padding: 8px 12px;
  background-color: #f6f8fa;
}
:deep(.format-content-item) {
  margin-bottom: 8px;
}

:deep(.negative-list-select-title) {
  margin-bottom: 4px;
}
</style>
