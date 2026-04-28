import { GridApi, CellRangeParams } from 'ag-grid-community';

/**
 * 重新选择框选区域
 */
export const rangeSelection = (api: GridApi, params: CellRangeParams) => {
  api.clearRangeSelection();
  api.addCellRange(params);
};
