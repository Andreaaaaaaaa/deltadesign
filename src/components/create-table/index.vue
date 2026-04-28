<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="t-create-table">
    <div>{{ selectDisplay }}</div>
    <div v-for="r in baseRow" :key="r" class="t-create-table-row">
      <div v-for="col in baseColumn" :key="col" class="t-create-table-column">
        <div
          :class="[{ active: r <= select.row && col <= select.column }, 't-create-table-content']"
          @mouseover="() => handleOver(r, col)"
          @click="handleClick"
        />
      </div>
    </div>
    <div class="t-create-table-dividing" />
    <div class="t-create-table-input">
      <TPopup placement="right-top" triggle="click" :visible="inputPopupVisible" @visible-change="handlePopupVisibel">
        <div>{{ createTableGlobalConfig.label }}</div>
        <template #content>
          <div class="t-create-table-input-content">
            <div class="t-create-table-input-content-title">{{ createTableGlobalConfig.title }}</div>
            <TForm :label-width="50 * coefficient">
              <TFormItem :label="createTableGlobalConfig.row">
                <TInputNumber v-model="select.row" auto-width theme="column" :min="1" />
              </TFormItem>
              <TFormItem :label="createTableGlobalConfig.column">
                <TInputNumber v-model="select.column" auto-width theme="column" :min="1" />
              </TFormItem>
            </TForm>
            <div class="t-create-table-input-content-control">
              <TButton size="small" @click="handleClick">{{ createTableGlobalConfig.confirm }}</TButton>
              <TButton variant="outline" size="small" @click="handleCancel">{{
                createTableGlobalConfig.cancel
              }}</TButton>
            </div>
          </div>
        </template>
      </TPopup>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useConfig } from 'tdesign-vue-next/esm/hooks';
import { mergeObject } from '@tencent/awcharts-shared-utils';

import { Popup as TPopup } from '../popup';
import { Button as TButton } from '../button';
import { InputNumber as TInputNumber } from '../input-number';
import { Form as TForm, FormItem as TFormItem } from '../form';

import localeCn from './locale-cn';
import localeEn from './locale-en';
import localeKo from './locale-ko';

type LocaleJSON = typeof localeCn;

interface LocaleConfig {
  'zh-cn': LocaleJSON;
  en: LocaleJSON;
  ko: LocaleJSON;
}

const emit = defineEmits(['confirm', 'cancel']);
const props = defineProps({
  column: {
    type: Number,
    default: 10,
  },
  row: {
    type: Number,
    default: 5,
  },
});
const localeConfig: LocaleConfig = {
  'zh-cn': localeCn,
  en: localeEn,
  ko: localeKo,
};
const BASE_LOCALE = 'zh-cn';
const { global: globalConfig } = useConfig('createTable');
const baseColumn = ref(props.column);
const baseRow = ref(props.row);
const inputPopupVisible = ref(false);
const select = reactive({
  column: 1,
  row: 1,
});
const locale: keyof LocaleConfig = globalConfig.value?.locale || BASE_LOCALE;

const coefficient = computed(() => (locale === 'en' ? 1.25 : 1));
const createTableGlobalConfig = computed(() => {
  return mergeObject(localeConfig[locale], {
    ...globalConfig.value,
  });
});

const handlePopupVisibel = (value: boolean) => {
  inputPopupVisible.value = value;
};

const selectDisplay = computed(() => `${select.row} * ${select.column}`);

const handleOver = (row: number, column: number) => {
  select.row = row;
  select.column = column;
};

const handleClick = () => {
  emit('confirm', select);
  handlePopupVisibel(false);
};

const handleCancel = () => {
  emit('cancel');
  handlePopupVisibel(false);
};
</script>
<style scoped lang="scss">
.t-create-table {
  display: flex;
  gap: 4px;
  flex-direction: column;
  width: 180px;
  padding: 8px;

  &-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  &-column {
    flex: 1;
  }
  &-content {
    cursor: pointer;
    background-color: #e8eaf1;
    padding-bottom: 100%;
    &.active {
      background-color: #cddcff;
    }
  }

  &-dividing {
    position: relative;
    height: 1px;
    width: 100%;
    box-sizing: border-box;
    background-color: rgba(219, 222, 235, 1);
    margin-top: 4px;
    margin-bottom: 4px;
  }

  &-input {
    padding: 4px 8px;
    margin: 0 -8px;
    &:hover {
      cursor: pointer;
      background-color: rgba(246, 248, 250, 1);
    }

    &-content {
      padding: 12px 8px;

      &-title {
        font-size: 12px;
        line-height: 18px;
        color: rgba(32, 32, 32, 1);
        font-weight: 500;
        margin-bottom: 16px;
      }

      &-control {
        margin-top: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }
}
</style>
