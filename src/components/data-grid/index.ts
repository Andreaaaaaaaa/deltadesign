import withInstall from 'tdesign-vue-next/esm/utils/withInstall.js';
import _DataGrid from './index.vue';

export * from 'ag-grid-vue3';
export * from 'ag-charts-vue3';
export * from 'ag-grid-community';
export * from 'ag-grid-enterprise';

export * from './types';
export * from './constant';
export * as DataGridUtils from './plugin';
export * as DataGridLocale from './locale';
export const DataGrid = withInstall(_DataGrid);

export default DataGrid;
