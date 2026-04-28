import lodash from 'lodash';
import { GridApi, AgChartThemeOverrides, Column } from 'ag-grid-community';
import { IDeltaConfig } from '../types';
import { DEFAULT_CHART_HEGIHT } from '../constant';

const handleConfig = {
  fill: 'black',
  stroke: 'black',
  strokeWidth: 1,
  width: 4,
  height: 8,
};

const navigator: (enabled: boolean, min?: number, max?: number) => AgChartThemeOverrides['cartesian'] = (
  enabled,
  min = 0,
  max = 1,
) => ({
  min,
  max,
  enabled,
  height: 3,
  mask: {
    fill: 'gary',
    fillOpacity: 0.15,
  },
  minHandle: handleConfig,
  maxHandle: handleConfig,
});

const axesConfig = {
  line: {
    width: 0,
    color: 'transparent',
  },
  label: {
    enabled: false,
  },
  tick: {
    enabled: false,
  },
  gridStyle: [
    {
      stroke: 'transparent',
    },
  ],
};

const cartesianStyle = {
  background: { fill: 'transparent' },
  padding: { top: 5, bottom: 5, left: 5, right: 5 },
};

export const chartThemeOverrides: (config: { suppressNavigate?: boolean }) => AgChartThemeOverrides = ({
  suppressNavigate,
} = {}) => ({
  cartesian: {
    ...cartesianStyle,
    axes: {
      number: axesConfig,
      category: axesConfig,
    },
    legend: {
      enabled: false,
    },
    navigator: navigator(!suppressNavigate),
    series: {
      column: {
        label: {
          enabled: false,
        },
      },
      bar: {
        label: {
          enabled: false,
        },
      },
    },
  },
});

export const renderNoData = (loading: boolean) => {
  const renderer = () => {
    return loading
      ? `<div class="t-data-grid-chart-no-data">loading...</div>`
      : `<div class="t-data-grid-chart-no-data">No Data</div>`;
  };

  return {
    noData: {
      renderer,
    },
  };
};

export const getColumData = (api: GridApi, fieldKey: string) => {
  const allRowsData = (api.getModel() as any).rowsToDisplay;
  const targetData = (allRowsData || []).map((item: any) => item.data[fieldKey]);
  return targetData;
};

const getFieldId = (column: Column) => column.getColDef().field || '';

export const getChartConfig = (column: Column, chartConfig: IDeltaConfig['chart']) => {
  const padding = 12;
  const baseConfig = {
    columnDefs: [],
    width: column.getActualWidth() - padding * 2,
    height: DEFAULT_CHART_HEGIHT,
    type: '',
    data: [],
    series: [],
    palette: {
      fills: ['#98CDEC', '#6FB4D8', '#8BD6BF', '#75B4A1', '#FD9993', '#F78F76', '#FCAD55', '#FDCD8A'],
      strokes: ['transparent'],
    },
    max: 1000,
    suppressNavigate: false,
  };
  const fieldId = getFieldId(column);
  const currentColumnConfig = chartConfig?.columnDefs.find((item) => item.field === fieldId) || {};
  const config = lodash.merge({}, baseConfig, chartConfig, currentColumnConfig);
  return config;
};
