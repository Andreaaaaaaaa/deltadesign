<template>
  <div :class="`${componentName}-header`">
    <div :class="`${componentName}-title`">
      <div :class="`${componentName}-title-left`" @click="handleTitleClick">
        <div :class="`${componentName}-title-text`">{{ params.displayName }}</div>
        <template v-if="params.enableSorting">
          <div
            v-show="noSort"
            :class="`${componentName}-title-sort`"
            @click.stop="($event) => handleSortRequested('', $event)"
          >
            <t-icon name="unfold-more" />
          </div>
          <div
            v-show="ascSort"
            :class="`${componentName}-title-sort`"
            @click.stop="($event) => handleSortRequested('asc', $event)"
          >
            <t-icon name="arrow-up" style="color: #2e8cfa" />
          </div>
          <div
            v-show="descSort"
            :class="`${componentName}-title-sort`"
            @click.stop="($event) => handleSortRequested('desc', $event)"
          >
            <t-icon name="arrow-down" style="color: #2e8cfa" />
          </div>
        </template>
      </div>
      <div v-if="params.enableMenu" ref="menuRef" :class="`${componentName}-title-right`" @click="handleMenuClicked">
        <t-icon name="view-list" />
      </div>
    </div>
    <header-chart
      v-if="!isEmpty"
      :style="`height: ${chartHeight}px`"
      :class="`${componentName}-chart`"
      :grid="params"
    />
    <header-statistics v-if="showStatistics" :grid="params" />
  </div>
</template>

<script lang="ts">
import { IHeaderParams, SortDirection } from 'ag-grid-community';
import { toRefs, defineComponent, ref, PropType, onMounted, computed, watchEffect } from 'vue';
import { chartState } from '../store';
import { Icon as TIcon } from '../../icon';
import HeaderChart from './HeaderChart.vue';
import { ROW_HEADER_FIELD_NAME, DEFAULT_CHART_HEGIHT } from '../constant';
import HeaderStatistics from './HeaderStatistics.vue';
import { IHeaderComponentAppendParams } from '../types';

const componentName = 't-data-grid';

export default defineComponent({
  name: 'ColmunHeader',
  components: { TIcon, HeaderChart, HeaderStatistics },
  props: {
    params: {
      type: Object as PropType<IHeaderParams & IHeaderComponentAppendParams>,
      default: () => ({}),
    },
  },
  setup: (props) => {
    const { params } = toRefs(props);
    const noSort = ref(false);
    const ascSort = ref(false);
    const descSort = ref(false);
    const menuRef = ref<HTMLElement | null>(null);
    const sortKey = ['', 'asc', 'desc'];
    watchEffect(() => {
      // console.log('params.value', params.value.test);
    });
    const isEmpty = computed(() => {
      // 调试信息
      // console.log('chartState', chartState.chartConfig);
      return (chartState.chartConfig?.columnDefs || [])?.length <= 0;
    });

    const showStatistics = computed(() => params.value.context?.grid?.column?.showStatisticsKey?.length > 0);

    const chartHeight = computed(() => {
      if (isEmpty.value) {
        return 0;
      }

      const allHeight = (chartState.chartConfig?.columnDefs || [])
        .filter((item) => Boolean(item.height))
        .map((item) => item.height) as Array<number>;
      if (allHeight.length > 0) {
        return Math.max(...allHeight);
      }
      return DEFAULT_CHART_HEGIHT;
    });

    const handleSortRequested = (order: SortDirection | '', event: MouseEvent) => {
      const orderIndex = sortKey.findIndex((item) => order === item);
      const innerOrderIndex = (orderIndex + 1) % sortKey.length;
      params.value.setSort(sortKey[innerOrderIndex] as SortDirection, event.shiftKey);
    };

    const handleMenuClicked = () => {
      if (menuRef.value) {
        params.value.showColumnMenu(menuRef.value);
      }
    };

    const handleSortChanged = () => {
      const { column } = params.value;

      ascSort.value = column.isSortAscending();
      descSort.value = column.isSortDescending();
      noSort.value = !(column.isSortAscending() || column.isSortDescending());
    };

    const handleTitleClick = () => {
      const { api, column, columnApi } = params.value;
      const field = column.getColDef().field || '';
      api.clearRangeSelection();
      if (field === ROW_HEADER_FIELD_NAME) {
        api.addCellRange({
          rowEndIndex: api.getModel().getRowCount() - 1,
          rowStartIndex: 0,
          columns: columnApi
            .getAllDisplayedColumns()
            .filter((item) => item.getColDef().field !== ROW_HEADER_FIELD_NAME),
        });
      } else {
        // 头部点击以后，选中当前列
        api.addCellRange({
          rowEndIndex: api.getModel().getRowCount() - 1,
          rowStartIndex: 0,
          columns: [column],
        });
      }
    };

    onMounted(() => {
      // 监听
      params.value.column.addEventListener('sortChanged', handleSortChanged);
      handleSortChanged();
    });

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      params,
      noSort,
      menuRef,
      isEmpty,
      ascSort,
      descSort,
      chartHeight,
      componentName,
      showStatistics,
      handleTitleClick,
      handleMenuClicked,
      handleSortRequested,
    };
  },
});
</script>

<style lang="scss">
.ag-header-row .ag-header-cell {
  padding: 0;
}
.t-data-grid {
  &-header {
    width: 100%;
    padding-left: var(--ag-cell-horizontal-padding);
    padding-right: var(--ag-cell-horizontal-padding);
  }
  &-title {
    width: 100%;
    padding: 4px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-left {
      display: flex;
      align-items: center;
      flex: 1;
      gap: 8px;
      max-width: calc(100% - 12px);
    }
    &-text {
      overflow: hidden;
      max-width: calc(100% - 20px);
      min-width: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-height: 14px;
    }
    &-right {
      width: 12px;
    }
    &-sort {
      display: inline-block;
    }
  }
  &-chart {
    width: 100%;
    border-top: 1px solid var(--ag-row-border-color);
  }
}
</style>
