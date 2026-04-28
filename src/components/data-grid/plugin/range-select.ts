import { isEqual } from 'lodash';
import { RangeSelectionChangedEvent } from 'ag-grid-community';
import { E_DIRECTION } from '../enums';
import { IBaseActiveCell } from '../types';
import { ROW_HEADER_FIELD_NAME } from '../constant';
import { transpose, getSpanningInfo, getRangeInfo, calculateRangeSpanning } from '../utils';

/**
 * 选中区域监听
 * @param event RangeSelectionChangedEvent
 *
 * 1、寻找每一个range里面是否存在row header
 *  1.1、如果不存在，则不进行任何处理
 * 2、如果存在，则
 *  2.1、清空选中区域
 *  2.2、将去除row header的新区域重新选中
 *  2.3、合并单元格需要重新计算(指需要考虑往后推)
 */
export const rangeSelectionChanged: (event: RangeSelectionChangedEvent) => IBaseActiveCell | null = (event) => {
  if (!event.finished || event.started) {
    return null;
  }
  const { api, columnApi, context } = event;
  const { startRowIndex, endRowIndex, columnKeys } = getRangeInfo(api);
  // console.log('start >>>>>>>>>>>>>>>>>>', startRowIndex, endRowIndex);
  const allColumns = columnApi.getAllDisplayedColumns();
  // 计算开始和结束列
  const rowSpanning = getSpanningInfo(context.content, E_DIRECTION.COLUMN);
  const rowSpanningList = rowSpanning.map((item) => Object.entries(item).map(([, value]) => value));
  const columnTranspose = transpose(rowSpanningList);
  const [firstColumnField] = columnKeys;
  const [lastColumnField] = [...columnKeys].reverse();
  const startColumnIndex = allColumns.findIndex((item) => item.getColDef().field === firstColumnField);
  const lastColumnIndex = allColumns.findIndex((item) => item.getColDef().field === lastColumnField);
  const { start: startColumn, end: endColumn } = calculateRangeSpanning(columnTranspose, {
    mainEnd: lastColumnIndex,
    mainStart: startColumnIndex,
    crossStart: startRowIndex,
    crossEnd: endRowIndex,
  });

  const selectRangeColumns = allColumns.slice(startColumn, endColumn + 1);
  const selectRangeColumnsKey = selectRangeColumns
    .map((item) => item.getColDef().field || '')
    .filter((key) => key !== ROW_HEADER_FIELD_NAME);

  // 计算开始和结束行
  const columnSpanning = getSpanningInfo(context.content, E_DIRECTION.ROW);
  const { start: startRow, end: endRow } = calculateRangeSpanning(
    columnSpanning.map((item) => Object.entries(item).map(([, value]) => value)),
    { mainStart: startRowIndex, mainEnd: endRowIndex, crossStart: startColumn, crossEnd: endColumn },
  );

  const res = {
    rowEndIndex: endRow,
    rowStartIndex: startRow,
    columns: selectRangeColumnsKey,
  };
  if (
    !isEqual(
      { startIndex: startRowIndex, endIndex: endRowIndex, columnKeys },
      { startIndex: startRow, endIndex: endRow, columnKeys: selectRangeColumnsKey },
    )
  ) {
    api.clearRangeSelection();
    api.addCellRange(res);
  }

  return {
    startRowIndex: startRow,
    endRowIndex: endRow,
    columns: selectRangeColumns,
    columnKeys: selectRangeColumnsKey,
  };
};
