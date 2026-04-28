<template>
  <Layout :title="title" show-back @back="handleBack" @close="handleClose">
    <t-form
      id="create-rules-form"
      ref="createRulesFormRef"
      class="t-data-grid-create-rules"
      :data="formData"
      :rules="rules"
      label-width="50px"
    >
      <t-form-item :label="locale.range" name="range">
        <t-input v-model="formData.range" size="small" :placeholder="rangePlaceholder" />
      </t-form-item>
      <t-form-item :label="locale.type" name="type">
        <t-select
          v-model="formData.type"
          :popup-props="{ attach: getAttach, destroyOnClose: true }"
          class="demo-select-base"
          size="small"
          clearable
        >
          <t-option v-for="(item, index) in typeOptions" :key="index" :value="item.value" :label="item.label">
            {{ item.label }}
          </t-option>
        </t-select>
      </t-form-item>
      <t-form-item :label="locale.filling" name="filling">
        <t-radio-group v-model="formData.filling" :options="fillOptions" />
      </t-form-item>
      <t-form-item :label="locale.display">
        <t-select
          v-model="colorIndex"
          class="demo-select-base"
          size="small"
          :popup-props="{ attach: getAttach, destroyOnClose: true }"
          clearable
        >
          <template #valueDisplay="{ value }">
            <ColorRender style="height: 26px" :color="transformIndexToColor(value)?.label" :filling="formData.filling">
              <template #before>
                <span
                  v-if="[E_CONDITION_RULES_KEY.DATABAR, E_CONDITION_RULES_KEY.COLORSCALE].includes(formData.type)"
                  style="margin-right: 4px"
                >
                  {{ formData.type === E_CONDITION_RULES_KEY.COLORSCALE ? locale.min : locale.negative }}
                </span>
              </template>
              <template #after>
                <span
                  v-if="[E_CONDITION_RULES_KEY.DATABAR, E_CONDITION_RULES_KEY.COLORSCALE].includes(formData.type)"
                  style="margin-left: 4px"
                >
                  {{ formData.type === E_CONDITION_RULES_KEY.COLORSCALE ? locale.max : locale.forward }}
                </span>
              </template>
            </ColorRender>
          </template>
          <t-option v-for="(item, index) in colorOptions" :key="index" :value="item.value">
            <ColorRender :color="item.label" :filling="formData.filling" />
          </t-option>
          <t-option class="customize-select-item" value="0" @click="showAdvanced = true">{{ locale.custom }}</t-option>
        </t-select>
      </t-form-item>
      <template v-if="showAdvanced">
        <t-form-item :label="locale.min" name="startValue">
          <div class="number-input">
            <t-select
              v-model="formData.startMode"
              :options="numberSelectOptions"
              :popup-props="{ attach: getAttach, destroyOnClose: true }"
              size="small"
              auto-width
            />
            <t-input
              v-if="formData.startMode === 'auto'"
              :default-value="locale.automatic"
              :disabled="true"
              size="small"
              auto-width
            />
            <t-input v-else v-model="formData.startValue" theme="column" size="small" auto-width />
            <ColorSelect
              v-if="formData.type === E_CONDITION_RULES_KEY.COLORSCALE"
              v-model="formData.startColor"
              :params="params"
            />
          </div>
        </t-form-item>
        <t-form-item :label="locale.max" name="endValue">
          <div class="number-input">
            <t-select
              v-model="formData.endMode"
              :options="numberSelectOptions"
              :popup-props="{ attach: getAttach, destroyOnClose: true }"
              size="small"
              auto-width
            />
            <t-input
              v-if="formData.endMode === 'auto'"
              :default-value="locale.automatic"
              :disabled="true"
              size="small"
              auto-width
            />
            <t-input v-else v-model="formData.endValue" theme="column" size="small" auto-width placeholder="输入数值" />
            <ColorSelect
              v-if="formData.type === E_CONDITION_RULES_KEY.COLORSCALE"
              v-model="formData.endColor"
              :params="params"
            />
          </div>
        </t-form-item>
        <template v-if="formData.type === E_CONDITION_RULES_KEY.DATABAR">
          <t-form-item :label="locale.negative" name="startColor">
            <ColorSelect v-model="formData.startColor" :params="params" />
          </t-form-item>
          <t-form-item :label="locale.forward" name="endColor">
            <ColorSelect v-model="formData.endColor" :params="params" />
          </t-form-item>
        </template>
        <template v-if="formData.type === E_CONDITION_RULES_KEY.SINGLEDATABAR">
          <t-form-item :label="locale.color" name="startColor">
            <ColorSelect v-model="formData.startColor" :params="params" />
          </t-form-item>
        </template>
      </template>
    </t-form>
    <template #footer>
      <t-button size="small" form="create-rules-form" @click="handleSubmit">{{ locale.confirm }}</t-button>
      <t-button size="small" theme="default" variant="outline" @click="handleBack">{{ locale.cancel }}</t-button>
    </template>
  </Layout>
</template>

<script lang="ts">
import {
  ref,
  Ref,
  watch,
  toRefs,
  reactive,
  PropType,
  onMounted,
  onUnmounted,
  watchEffect,
  defineComponent,
  nextTick,
  computed,
} from 'vue';
import { MessagePlugin } from '../../../message';
import { Input as TInput } from '../../../input';
import { Button as TButton } from '../../../button';
import { RadioGroup as TRadioGroup } from '../../../radio';
import { Form as TForm, FormItem as TFormItem } from '../../../form';
import { Select as TSelect, Option as TOption } from '../../../select';

import Layout from './Layout.vue';
import ColorRender from '../common/ColorRender.vue';
import ColorSelect from '../common/ColorSelect.vue';

import { eventBus } from '../../class';
import { regexExcelRange } from '../../regex';
import { useLocale, useAttach } from '../../hooks';
import { RULES_TYPE_MAPPING } from '../../constant';
import { closeBarToolPanels, openBarToolPanelsByKey } from '../../plugin';
import { E_FILLING, E_EVENT_BUS_KEY, E_SIDE_BAR_PANEL_KEY, E_CONDITION_RULES_KEY } from '../../enums';
import { IRange, IAgGridCommon, TEmitEditChange, TDeltaConfigContentConditionRules } from '../../types';
import {
  isNumeric,
  randomString,
  isValidRange,
  getRangeInfo,
  getNumbicData,
  rangeSelection,
  getRangeRowData,
  decimalToBase26,
  transformColorByFilling,
  obtainColumnIndexByField,
  generateOptionByRulesType,
  rangeExpressionTransformRange,
} from '../../utils';

type TOptions = Array<{ label: Array<string>; value: string }>;
type TSelectOptions = Array<{ label: string; value: string; disabled?: boolean }>;

const baseFormData: TDeltaConfigContentConditionRules = {
  key: '',
  range: '',
  type: E_CONDITION_RULES_KEY.COLORSCALE,
  filling: E_FILLING.SOLID,
  startColor: '',
  endColor: '',
  startMode: 'auto',
  startValue: '',
  endValue: '',
  endMode: 'auto',
};

export default defineComponent({
  name: 'CreateSideBarRules',
  components: {
    TForm,
    Layout,
    TInput,
    TButton,
    TOption,
    TSelect,
    TFormItem,
    ColorRender,
    ColorSelect,
    TRadioGroup,
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
    const colorOptions = ref<TOptions>([]);
    const fillOptions = ref<any>([]);
    const showAdvanced = ref(false);
    const colorIndex = ref('0');
    const createRulesFormRef = ref(null);
    const mode = ref('创建');
    const currentUuid = ref('');
    const formData = reactive<TDeltaConfigContentConditionRules>({ ...baseFormData });
    const { locale } = useLocale();
    const rangePlaceholder = computed(() => `${locale.value.format}：A1:C3,${locale.value.lettersCapitalized}`);

    const typeOptions = Object.entries(RULES_TYPE_MAPPING()).map(([value, label]) => ({ label, value }));

    const { getAttach } = useAttach('#t-data-grid-create-rules-select-attach', params.value.context.rootRef);
    const title = computed(() => `${mode.value}${locale.value.managementConditional}`);

    const transformIndexToColor = (index: number | string, options?: TOptions) =>
      (options || colorOptions.value).find((item) => item.value === String(index));

    const numberSelectOptions = computed(() => [
      { label: locale.value.automatic, value: 'auto' },
      { label: locale.value.number, value: 'number' },
    ]);

    const fillingOptions = computed(
      () =>
        [
          {
            label: locale.value.solid,
            disabled: false,
            value: E_FILLING.SOLID,
          },
          {
            label: locale.value.gradual,
            disabled: true,
            value: E_FILLING.GRADIEND,
          },
        ] as TSelectOptions,
    );

    watchEffect(() => {
      fillOptions.value = fillingOptions.value;
    });

    watch(
      () => formData.type,
      (newVal) => {
        showAdvanced.value = false;
        if (newVal === E_CONDITION_RULES_KEY.COLORSCALE) {
          formData.filling = E_FILLING.SOLID;
          fillOptions.value = [...fillingOptions.value];
        } else {
          fillOptions.value = fillOptions.value.map((item: any) => ({
            ...item,
            disabled: false,
          }));
        }
      },
    );

    const getValidData = (range: IRange) => {
      const getRangeData = getRangeRowData(params.value.api, range).flat(2);
      const numberData = getNumbicData(getRangeData);
      if (numberData.length === 0) {
        formData.startValue = '';
        formData.endValue = '';
        return;
      }

      if (formData.endMode === 'auto') {
        formData.endValue = Math.max(...numberData);
      }

      if (formData.startMode === 'auto') {
        formData.startValue = Math.min(...numberData);
      }
    };

    watch(
      () => formData.range,
      (newVal) => {
        if (isValidRange(newVal)) {
          const cellRange = rangeExpressionTransformRange(params.value.columnApi, newVal);
          if (cellRange) {
            const { endRowIndex, startRowIndex, columnKeys, columns } = cellRange;
            rangeSelection(params.value.api, {
              rowEndIndex: endRowIndex,
              rowStartIndex: startRowIndex,
              columns,
            });

            getValidData({
              startRowIndex,
              endRowIndex,
              columnKeys,
            });
          }
        }
      },
    );

    const calcColor = (index: number | string) => {
      const target = transformIndexToColor(index);
      if (target) {
        const [start] = target.label;
        const [end] = [...target.label].reverse();
        return {
          start,
          end,
        };
      }
      return null;
    };

    watchEffect(() => {
      if (colorIndex.value !== undefined) {
        const target = calcColor(colorIndex.value);
        if (target) {
          const { start, end } = target;
          formData.startColor = start;
          formData.endColor = end;
        }
      }
    });

    watchEffect(() => {
      const options = generateOptionByRulesType(formData.type);
      // state.colors = options[0].label;
      colorOptions.value = options;
    });

    const handleClose = () => {
      closeBarToolPanels(params.value.api);
    };

    const handleBack = () => {
      openBarToolPanelsByKey(params.value.api, E_SIDE_BAR_PANEL_KEY.SIDE_BAR_RULES, params.value.context.uuid);
    };

    const barStyle = (colors: string, direction: 'right' | 'left' = 'right') => `
      background: ${transformColorByFilling(colors, formData.filling, direction)};
    `;

    const batchResetFormData = (data: TDeltaConfigContentConditionRules) => {
      const { startMode, endMode, startColor, endColor, type, key, startValue, endValue, range, filling } = data;
      formData.key = key;
      formData.endColor = endColor;
      formData.range = range;
      formData.startMode = startMode;
      formData.endMode = endMode;
      formData.startColor = startColor;
      formData.type = type;
      formData.startValue = startValue;
      formData.endValue = endValue;
      formData.filling = filling;
    };

    const getCurrentRange = () => {
      const { endRowIndex, startRowIndex, columnKeys } = getRangeInfo(params.value.api);
      if (columnKeys.length === 0) {
        return;
      }

      // range
      const columnStartIndex = obtainColumnIndexByField(params.value.columnApi, columnKeys[0]);
      const startColumn = decimalToBase26(columnStartIndex + 1);
      const endColumn = decimalToBase26(columnStartIndex + columnKeys.length);
      const startRow = startRowIndex + 1;
      const endRow = endRowIndex + 1;

      // data
      getValidData({
        columnKeys,
        endRowIndex,
        startRowIndex,
      });
      formData.range = `${startColumn}${startRow}:${endColumn}${endRow}`;
    };

    const assembleSubmitParams = () => {
      const { key } = formData;
      const { context } = params.value;
      if (!context.grid.conditionRules) {
        context.grid.conditionRules = [];
      }
      if (key === '') {
        // 新增
        (context.grid.conditionRules ?? []).unshift({
          ...formData,
          key: randomString(10),
        });
      }
      // 修改
      const { conditionRules } = context.grid;
      const targetIndex = conditionRules.findIndex((item) => item.key === key);
      if (targetIndex > -1) {
        conditionRules[targetIndex] = formData;
      }
    };

    const handleSubmit = async () => {
      const validateResult = await (createRulesFormRef.value as any)?.validate();
      if (validateResult === true) {
        // 修改数据
        assembleSubmitParams();
        // 回调
        params.value.onChange({ grid: params.value.context.grid });
        // 返回列表
        handleBack();
      } else {
        // const firstError = '';
        // Object.entries(validateResult).forEach(([key, value]) => {
        //   const err = value.find(item => item.result === false);
        //   firstError = err.message
        // })
        // MessagePlugin.warning(firstError);
      }
    };

    const componentShow = ({ uuid }: { uuid: string }) => {
      if (uuid !== params.value.context.uuid) {
        return;
      }
      currentUuid.value = uuid;
      // 重置状态
      const baseState = { ...baseFormData };
      colorIndex.value = '0';
      const target = calcColor(0);
      if (target) {
        const { start, end } = target;
        baseState.startColor = start;
        baseState.endColor = end;
      }
      batchResetFormData(baseState);
      showAdvanced.value = false;
      mode.value = locale.value.create;
      // 组件显示
      getCurrentRange();
    };

    const editRules = ({ id, uuid }: { id: string; uuid: string }) => {
      if (uuid !== params.value.context.uuid) {
        return;
      }
      const target = (params.value.context.grid.conditionRules || []).find((item) => item.key === id);
      if (target) {
        mode.value = locale.value.edit;
        const { startMode, endMode, startColor, endColor, type } = target;
        const cacheColorOption = generateOptionByRulesType(type);
        colorOptions.value = cacheColorOption;
        const currentStartColorIndex = cacheColorOption.findIndex((item) => item.label.includes(startColor));
        const currentEndColorIndex = cacheColorOption.findIndex((item) => item.label.includes(endColor));
        colorIndex.value = `${Math.max(0, currentStartColorIndex, currentEndColorIndex)}`;
        // 改过数值或者改过颜色
        if (startMode !== 'auto' || endMode !== 'auto' || currentStartColorIndex > -1 || currentEndColorIndex > -1) {
          showAdvanced.value = true;
        }

        // 因为修改了colorIndex以后具有副作用
        nextTick(() => {
          batchResetFormData(target);
        });
      }
    };

    onMounted(() => {
      eventBus.on(E_EVENT_BUS_KEY.CREATE_RULES, componentShow);
      eventBus.on(E_EVENT_BUS_KEY.EDIT_RULES, editRules);
    });

    onUnmounted(() => {
      eventBus.off(E_EVENT_BUS_KEY.CREATE_RULES, componentShow);
      eventBus.off(E_EVENT_BUS_KEY.EDIT_RULES, editRules);
    });

    const validateValue = (val: string, valMode: string) => {
      if (valMode !== 'auto') {
        if (val === '') {
          return { result: false, message: '必须指定最小/负向数值', type: 'error' };
        }
        if (!isNumeric(val)) {
          return { result: false, message: '请输入正确数值', type: 'error' };
        }
      }
      return { result: true, type: 'success' };
    };

    const rules: Record<string, any> = {
      range: [
        { required: true, message: '必须指定范围' },
        { pattern: regexExcelRange, message: '必须符合范围格式：A1:C3' },
      ],
      type: [{ required: true, message: '必须选择样式' }],
      filling: [{ required: true, message: '必须选择填充方式' }],
      startColor: [{ required: true, message: '必须指定最小/负向颜色' }],
      endColor: [{ required: true, message: '必须指定最大/正向颜色' }],
      startValue: [{ validator: (val: string) => validateValue(val, formData.startMode) }],
      endValue: [{ validator: (val: string) => validateValue(val, formData.endMode) }],
    };

    return {
      rules,
      title,
      // eslint-disable-next-line vue/no-dupe-keys
      params,
      locale,
      formData,
      getAttach,
      colorIndex,
      typeOptions,
      fillOptions,
      colorOptions,
      showAdvanced,
      rangePlaceholder,
      createRulesFormRef,
      numberSelectOptions,
      E_CONDITION_RULES_KEY,
      barStyle,
      handleBack,
      handleClose,
      handleSubmit,
      transformIndexToColor,
    };
  },
});
</script>

<style lang="scss" scoped>
.t-select__wrap {
  width: 100%;
}

.number-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
}
</style>
<style lang="scss">
.t-data-grid-create-rules {
  .number-input .t-input-number {
    .t-input {
      height: 28px;
      line-height: 28px;
    }
    .t-input-number__decrease {
      top: 14px;
    }
  }
}

.customize-select {
  width: 100%;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.color-select-item {
  position: relative;
  height: 20px;
  width: 100%;
  display: flex;
  align-items: center;

  &-before,
  &-after {
    flex: 1;
    height: 100%;
  }
}
.customize-select-item.t-is-selected {
  background-color: transparent;
}
</style>
