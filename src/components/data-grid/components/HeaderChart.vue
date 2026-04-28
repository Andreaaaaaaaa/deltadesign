<template>
  <ag-charts-vue v-if="isShowChart" :options="options"></ag-charts-vue>
  <div v-else></div>
</template>

<script lang="ts">
import { toRefs, defineComponent, ref, PropType, onMounted, nextTick, computed, watch, toRaw } from 'vue';
import { IHeaderParams } from 'ag-grid-community';
import { AgChartsVue } from 'ag-charts-vue3';
import { chartState } from '../store';
import { getColumData, renderNoData, getChartConfig, chartThemeOverrides } from '../plugin/mini-chart';
import { renderChartStack } from '../class';

export default defineComponent({
  name: 'HeaderChart',
  components: { AgChartsVue },
  props: {
    grid: {
      type: Object as PropType<IHeaderParams>,
      default: () => ({}),
    },
  },
  setup: (props) => {
    const { grid } = toRefs(props);
    const field = ref('');
    const options = ref({});
    const isShowChart = computed(
      () =>
        Boolean(field.value) &&
        (chartState.chartConfig?.columnDefs || []).map((item) => item.field).filter((key) => key === field.value)
          .length > 0,
    );

    const currentConfig = computed(() => getChartConfig(grid.value.column, chartState.chartConfig));

    watch(
      () => chartState.chart,
      (newVal) => {
        const { field: optionsField, ...chartOptios } = toRaw(newVal);
        if (field.value === optionsField) {
          const cache = {
            ...options.value,
            ...chartOptios,
            overlays: renderNoData(false),
          };
          options.value = cache;
        }
      },
    );

    onMounted(() => {
      const fieldKey = grid.value.column.getColDef().field || '';
      field.value = fieldKey;
      if (isShowChart.value) {
        options.value = {
          data: [],
          series: [],
          type: 'column',
          theme: {
            overrides: chartThemeOverrides({ suppressNavigate: true }),
          },
          overlays: renderNoData(true),
        };

        nextTick(() => {
          const columnValue = getColumData(grid.value.api, fieldKey);
          renderChartStack.pushStack(fieldKey, columnValue, currentConfig.value);
        });
      }
    });

    return { options, isShowChart };
  },
});
</script>
<style lang="scss">
.ag-header-cell-comp-wrapper {
  display: flex;
}
.t-data-grid {
  &-chart {
    &-no-data {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
