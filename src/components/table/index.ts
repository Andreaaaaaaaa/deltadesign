import { BaseTable, EnhancedTable, PrimaryTable } from 'tdesign-vue-next/esm/table';
import withInstall from 'tdesign-vue-next/esm/utils/withInstall.js';
import TTable from './t-table.vue';

export * from 'tdesign-vue-next/esm/table';
export const Table = withInstall(TTable);

export { BaseTable, EnhancedTable, PrimaryTable, Table as default };
