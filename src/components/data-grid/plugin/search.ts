import { GridReadyEvent } from 'ag-grid-community';
/**
 * 全局搜索
 */
export const tdgSearchData = (agGrid: GridReadyEvent, value: string) => agGrid?.api?.setQuickFilter(value);
