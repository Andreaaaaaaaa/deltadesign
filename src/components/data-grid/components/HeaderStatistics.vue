<template>
  <div :class="componentName">
    <div :class="`${componentName}-calculate`">
      <div v-for="([key, value], index) in statistics" :key="index" :class="`${componentName}-calculate-list`">
        <span v-if="isFirstColumn" :class="`${componentName}-calculate-label`">{{ locale[key] }}:</span>
        <span v-if="!isRowHeaderIndex">
          {{ value ?? 'NaN' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import lodash from 'lodash';
import { IHeaderParams } from 'ag-grid-community';
import { ref, toRefs, watch, PropType, defineComponent, computed, onMounted, nextTick } from 'vue';
import { IDGContext } from '../types';
import { localeStore } from '../locale';
import { E_STATISTICS } from '../enums';
import { getAllRowData } from '../utils';
import { COMPONENT_PREFIX, STATISTICS_KEY, ROW_HEADER_FIELD_NAME } from '../constant';

const componentName = `${COMPONENT_PREFIX}-header-statistics`;
export default defineComponent({
  name: 'HeaderStatistics',
  props: {
    grid: {
      type: Object as PropType<IHeaderParams<any, IDGContext>>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { grid } = toRefs(props);
    const field = computed(() => grid.value.column.getColDef().field || '');
    const statistics = ref<Array<[E_STATISTICS, number]>>([]);
    const locale = ref<Record<string, string>>({});

    const isFirstColumn = computed(() => {
      const { column, columnApi } = grid.value;
      const columnState = columnApi.getColumnState();
      const currentColumnIndex = columnState.findIndex((col) => col.colId === column.getColId());
      return currentColumnIndex === 0;
    });

    const isRowHeaderIndex = computed(() => field.value === ROW_HEADER_FIELD_NAME);
    const showField = computed(() => grid.value.context.grid.column.showStatisticsKey);

    const updateDate = () => {
      const cache = getAllRowData(grid.value.api)
        .map((item) => item[field.value])
        .filter((item) => item !== '' && !isNaN(item))
        .map((item) => Number(item)) as Array<number>;
      const max = lodash.max(cache);
      const min = lodash.min(cache);
      const avg = lodash.mean(cache);
      const sum = lodash.sum(cache);
      const result = {
        max,
        min,
        sum,
        avg,
      };
      statistics.value = STATISTICS_KEY.filter((key) => showField.value.includes(key)).map((key) => [
        key,
        result?.[key],
      ]) as Array<[E_STATISTICS, number]>;
    };

    watch(
      () => showField.value,
      () => {
        updateDate();
      },
    );

    onMounted(() => {
      locale.value = localeStore.getLocals();

      nextTick(() => {
        updateDate();
      });
    });

    return { isRowHeaderIndex, statistics, isFirstColumn, componentName, locale };
  },
});
</script>

<style lang="scss">
.t-data-grid-header-statistics {
  margin-left: calc(var(--ag-cell-horizontal-padding) * -1);
  margin-right: calc(var(--ag-cell-horizontal-padding) * -1);
  &-calculate {
    margin-top: 8px;
    &-list {
      line-height: 24px;
      min-height: 24px;
      padding-left: var(--ag-cell-horizontal-padding);
      padding-right: var(--ag-cell-horizontal-padding);
      border-top: 1px solid var(--ag-header-column-separator-color);
    }

    &-label {
      display: inline-block;
      min-width: 40px;
    }
  }
}
</style>
