<template>
  <t-table class="gradation-table" :data="data" :columns="tableColumns" row-key="property">
    <template v-for="(_, name) in slots" #[name]="slotData">
      <div
        v-if="name === 'gradation'"
        :key="name"
        class="aw-h-full aw-w-full aw-py-2 aw-px-5"
        :style="{
          background:
            slotData.col.colKey !== AMOUNT_KEY &&
            gradientColor(slotData.row[slotData.col.colKey], baseValue, leftColor, rightColor),
        }"
      >
        <slot :name="name" v-bind="slotData" />
      </div>
      <slot v-else :name="name" v-bind="slotData" />
    </template>
  </t-table>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { Table as TTable, TdBaseTableProps } from 'tdesign-vue-next/esm/table';

import { gradientColor } from './utils';

export default defineComponent({
  name: 'GradationTable',

  components: {
    TTable,
  },

  props: {
    baseValue: {
      type: Number,
      required: true,
      default: 0,
    },
    leftColor: {
      type: String,
      required: true,
      default: '#DC143C',
    },
    rightColor: {
      type: String,
      required: true,
      dfault: '#3CB371',
    },
    columns: {
      type: Array as PropType<TdBaseTableProps['columns']>,
      default: (): TdBaseTableProps['columns'] => [],
    },
    /** 数据源，泛型 T 指表格数据类型 */
    data: {
      type: Array as PropType<TdBaseTableProps['data']>,
      default: (): TdBaseTableProps['data'] => [],
    },
  },
  setup(props, { slots }) {
    const tableColumns = computed(() => {
      return props.columns?.map((item) => {
        if (item.cell === 'gradation') {
          item.className = 'td-gradation';
        }
        return item;
      });
    });

    return {
      gradientColor,
      tableColumns,
      slots,
    };
  },
});
</script>
<style lang="scss" scoped>
.gradation-table {
  :deep(tbody.t-table__body td.td-gradation) {
    @apply aw-p-0;
  }
}
</style>
