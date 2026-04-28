import { ColumnApi, ColumnState, GetContextMenuItemsParams, GridApi } from 'ag-grid-community';
import { IRange } from '../../../types';
import { getRangeInfo, decimalToBase26 } from '../../../utils';

export const setColumnPinning = (columnApi: ColumnApi, columnKeys: IRange['columnKeys'], pinningLeft: boolean) => {
  let state: Array<ColumnState> | undefined;
  if (pinningLeft) {
    state = columnKeys.map((columnKey) => ({
      colId: columnKey,
      pinned: 'left',
    }));
  }
  columnApi.applyColumnState({
    state,
    defaultState: { pinned: null },
  });
  return undefined;
};

export const setRowPinning = (
  api: GridApi,
  range: Pick<IRange, 'endRowIndex' | 'startRowIndex'>,
  pinningTop: boolean,
) => {
  const rangeRowData: Array<any> = [];
  if (pinningTop) {
    api.forEachNode((rowNode, rowIndex) => {
      const { startRowIndex, endRowIndex } = range;
      if (rowIndex >= startRowIndex && rowIndex <= endRowIndex) {
        rangeRowData.push(rowNode.data);
      }
    });
  }
  api.setPinnedTopRowData(rangeRowData);
};

export const setPinning = (params: GetContextMenuItemsParams, range: IRange, pinning: boolean) => {
  const { api, columnApi } = params;
  const { startRowIndex, endRowIndex, columnKeys } = range;
  setColumnPinning(columnApi, columnKeys, pinning);
  setRowPinning(api, { startRowIndex, endRowIndex }, pinning);
};

export const supportMenuPinning = (params: GetContextMenuItemsParams) => {
  const { api, columnApi } = params;
  const allColumns = columnApi.getAllDisplayedColumns();
  const [firstColumn] = allColumns;
  const range = getRangeInfo(api);
  let columnMaxIndex = -1;
  range.columnKeys.forEach((columnKey) => {
    const curIndex = allColumns.findIndex((col) => col.getColDef().field === columnKey);
    columnMaxIndex = Math.max(curIndex, columnMaxIndex);
  });

  if (columnMaxIndex <= 0) {
    columnMaxIndex = 1;
  }
  const pinningColumnKeys = allColumns.slice(0, columnMaxIndex).map((item) => item.getColDef()?.field || '');

  return {
    name: '冻结',
    subMenu: [
      {
        name: '冻结首行',
        action: () => {
          setPinning(params, { startRowIndex: 0, endRowIndex: 0, columnKeys: [] }, true);
        },
      },
      {
        name: '冻结首列',
        action: () => {
          setPinning(
            params,
            { startRowIndex: -1, endRowIndex: -1, columnKeys: [firstColumn.getColDef().field || ''] },
            true,
          );
        },
      },
      {
        name: `冻结至第${range.endRowIndex || 1}行${decimalToBase26(columnMaxIndex)}列`,
        action: () => {
          setPinning(
            params,
            {
              endRowIndex: range.endRowIndex - 1 <= 0 ? 0 : range.endRowIndex - 1,
              startRowIndex: 0,
              columnKeys: pinningColumnKeys,
            },
            true,
          );
        },
      },
      'separator',
      {
        name: '取消冻结',
        action: () => {
          setPinning(params, range, false);
        },
      },
    ],
  };
};
