<template>
  <t-select
    v-model="selectVal"
    :placeholder="placeholder"
    :options="resOptions"
    :size="size"
    :multiple="multiple"
    :popup-props="{ ...popupProps, overlayClassName: multiple ? 'aw-multi-popup' : '' }"
    :min-collapsed-num="minCollapsedNum"
    :clearable="clearable"
    @visible-change="
      () => {
        resetSearch();
      }
    "
  >
    <template #panelTopContent>
      <div :class="`select-search-${size}`">
        <t-input v-model="searchText" :size="size" placeholder="搜索" class="aw-w-full aw-border-gray-40" clearable>
          <template #suffix-icon>
            <svg class="aw-h-4 aw-w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 1.5C3.96245 1.5 1.5 3.96245 1.5 7C1.5 10.0376 3.96245 12.5 7 12.5C8.38797 12.5 9.65586 11.9859 10.6236 11.1377L13.6914 14.1983C13.8868 14.3934 14.2034 14.393 14.3985 14.1975C14.5935 14.002 14.5931 13.6855 14.3976 13.4904L11.3132 10.413C12.0563 9.47524 12.5 8.28944 12.5 7C12.5 3.96245 10.0376 1.5 7 1.5ZM2.5 7C2.5 4.51473 4.51473 2.5 7 2.5C9.48527 2.5 11.5 4.51473 11.5 7C11.5 9.48527 9.48527 11.5 7 11.5C4.51473 11.5 2.5 9.48527 2.5 7Z"
                fill="rgba(32,32,32,0.3)"
              />
            </svg>
          </template>
        </t-input>
      </div>
      <div v-if="multiple" class="aw-flex aw-border-b aw-border-gray-30 aw-p-2">
        <div class="aw-flex-1">
          <t-checkbox
            v-model="checkedAll"
            :indeterminate="indeterminate"
            @change="
              (bool: boolean) => {
                handleSelectAll(bool);
              }
            "
            >全选</t-checkbox
          >
        </div>
        <div class="show-exist">
          <t-checkbox
            v-model="selectedOnly"
            @change="
            (bool: boolean) => {
              onlyChecked(bool);
            }
          "
            >只看已选</t-checkbox
          >
        </div>
      </div>
    </template>
    <template v-if="value" #valueDisplay="{ value }">
      <slot name="valueDisplay" :value="value"></slot>
    </template>
    <!-- <template #collapsedItems="{ collapsedSelectedItems, count }">
      <t-tooltip>
        <template #content>
          <p v-for="(ele, index) in collapsedSelectedItems" :key="index" style="padding: 10px">
            {{ ele.label }}
          </p>
        </template>
        <span v-show="count > 0" class="t-tag t-tag--default t-tag--dark t-size-s">+{{ count }}</span>
      </t-tooltip>
    </template> -->
  </t-select>
</template>
<script lang="ts">
import { PropType, computed, ref, watch, defineComponent, nextTick } from 'vue';
import { Select as TSelect } from 'tdesign-vue-next/esm/select';
import { Checkbox as TCheckbox } from 'tdesign-vue-next/esm/checkbox';
import { Input as TInput } from 'tdesign-vue-next/esm/input';
import { cloneDeep } from 'lodash';
import { Icon } from 'tdesign-icons-vue-next';

import { SelectOption } from './type';

export default defineComponent({
  name: 'SearchSelect',

  components: {
    TSelect,
    TCheckbox,
    TInput,
    Icon,
  },

  props: {
    modelValue: {
      type: Array as PropType<string[] | string>,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
    size: {
      type: String,
      default: 'medium',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    popupProps: {
      type: Object,
      default() {
        return {};
      },
    },
    minCollapsedNum: {
      type: Number,
      default: 0,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const searchText = ref<string>('');
    const oriOptions = ref(cloneDeep(props.options));
    const resOptions = ref(cloneDeep(props.options));
    const selectedOnly = ref<boolean>(false);

    const selectVal = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit('update:modelValue', val);
        return '';
      },
    });

    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        selectVal.value = (resOptions.value || [])
          .filter((item: SelectOption) => !item.disabled)
          .map((item: SelectOption) => item.value);
      } else {
        selectVal.value = [];
      }
    };

    const onlyChecked = (bool: boolean) => {
      if (bool) {
        resOptions.value = resOptions.value.filter((item) => {
          return (selectVal.value || []).includes(item.value);
        });
      } else {
        resOptions.value = cloneDeep(oriOptions.value);
      }
    };

    const resetSearch = () => {
      searchText.value = '';
      resOptions.value = cloneDeep(oriOptions.value);
    };

    const checkedAll = computed(() => {
      const len = resOptions.value.filter((item: SelectOption) => !item.disabled).length;
      if (!resOptions.value || !len) {
        return false;
      }
      return len === selectVal.value.length;
    });

    const indeterminate = computed(
      () => !!(resOptions.value.length > selectVal.value.length && selectVal.value.length), // 半选状态如何定义，是否考虑disabled选项
    );

    watch(
      () => searchText.value,
      () => {
        if (!searchText.value) {
          nextTick(() => {
            const li = document.querySelectorAll('ul.t-select__list:not(.t-select__create-option) li');
            const label = document.querySelectorAll(
              'ul.t-select__list:not(.t-select__create-option) li label .t-checkbox__label',
            );
            if (li) {
              li.forEach((item) => {
                const style = item.getAttribute('style');
                if (style) {
                  item.setAttribute('style', style.replace(/display: none;/g, ''));
                }
              });
            }
            if (label) {
              label.forEach((item, index) => {
                const title = li[index].getAttribute('title') || '';
                if (title) {
                  item.innerHTML = title;
                }
              });
            }
          });
          resetSearch();
          return;
        }

        resOptions.value = oriOptions.value.filter((item) => {
          if (props.multiple) {
            return (
              String(item.label).match(searchText.value) !== null ||
              (Array.isArray(selectVal.value) && selectVal.value.includes(item.value))
            );
          }
          return String(item.label).match(searchText.value) !== null || item.value === selectVal.value;
        });

        if (searchText.value) {
          nextTick(() => {
            const li = document.querySelectorAll('ul.t-select__list:not(.t-select__create-option) li');
            const label = document.querySelectorAll(
              'ul.t-select__list:not(.t-select__create-option) li label .t-checkbox__label',
            );
            const regExp = new RegExp(searchText.value, 'g');
            if (li) {
              li.forEach((item) => {
                const title = item.getAttribute('title') || '';
                if (!title.match(regExp)) {
                  const style = item.getAttribute('style');
                  if (!style || !style.includes('display: none;')) {
                    item.setAttribute('style', `display: none;${style}`);
                  }
                }
              });
            }
            if (label) {
              label.forEach((item, index) => {
                const title = li[index].getAttribute('title') || '';
                if (title) {
                  item.innerHTML = title.replace(regExp, `<span class='highlight'>${searchText.value}</span>`);
                }
              });
            }
          });
        }
      },
    );

    watch(
      () => props.options,
      () => {
        oriOptions.value = cloneDeep(props.options);
        resOptions.value = cloneDeep(props.options);
      },
    );

    return {
      handleSelectAll,
      onlyChecked,
      selectedOnly,
      checkedAll,
      indeterminate,
      resetSearch,
      resOptions,
      selectVal,
      searchText,
    };
  },
});
</script>
<style lang="scss" scoped>
.select-search-medium {
  margin: 8px 0;
  padding: 0 8px;
}

.select-search-small {
  margin: 6px 0;
  padding: 0 6px;
}
</style>
