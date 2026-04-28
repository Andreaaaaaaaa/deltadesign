import lodash from 'lodash';
import { ColumnApi, GetContextMenuItemsParams } from 'ag-grid-community';
import { E_DIRECTION } from '../../../enums';
import { ISignCell, TContent, IDGContext } from '../../../types';
import {
  getAllRowData,
  decimalToBase26,
  calcNewCellSign,
  getSpanningInfo,
  getRowDataCellSign,
  updateCellSignData,
  getRangeInfoByCellSign,
  obtainColumnExcludeRowHeader,
} from '../../../utils';

interface ISpanningCellBase extends ISignCell {
  begin: number;
  spanning: number;
}
type TSpanningCell = Omit<ISpanningCellBase, 'begin'>;
const getChangeContent = (
  content: TContent,
  key: E_DIRECTION,
  deleteInfo: { start: number; count: number },
  columnApi?: ColumnApi,
) => {
  const { start, count } = deleteInfo;
  const allSpanning = getSpanningInfo(content, key);
  const spanningCell: Array<ISpanningCellBase> = [];
  allSpanning.forEach((rowItem, rowIndex) => {
    Object.entries(rowItem).forEach(([field, spanning]) => {
      if (spanning > 1) {
        let begin = rowIndex;
        if (key === E_DIRECTION.COLUMN) {
          const allColumns = columnApi?.getAllDisplayedColumns();
          begin = allColumns?.findIndex((item) => item.getColDef().field === field) || 0;
        }
        spanningCell.push({
          field,
          rowIndex,
          begin,
          spanning,
        });
      }
    });
  });
  // 计算出需要修改的单元格
  const needChange: Array<TSpanningCell> = [];
  spanningCell.forEach((item) => {
    const { field, rowIndex, begin, spanning } = item;
    const max = Math.max(start + count - 1, begin + spanning - 1);
    const min = Math.min(begin, start);
    const intersect = count + spanning - (max - min + 1);
    if (intersect > 0 && intersect < spanning) {
      // 存在交点
      needChange.push({
        field,
        rowIndex,
        spanning: spanning - intersect,
      });
    }
  });

  needChange.forEach((item) => {
    const { field, rowIndex, spanning: itemSpanning } = item;
    const spanning = {
      ...(content[rowIndex][field]?.spanning || {}),
      [key]: itemSpanning,
    };
    content[rowIndex][field] = {
      ...content[rowIndex][field],
      spanning,
    };
  });

  return content;
};

// 删除行
export const delectRows = (params: GetContextMenuItemsParams<any, IDGContext>, start: number, count: number) => {
  const { context, columnApi, api } = params;
  // 修改数据
  const columnIndexList = getRowDataCellSign(api);
  const needChangeCellSign = calcNewCellSign(columnIndexList, start, E_DIRECTION.ROW, count * -1);
  const newRowDataByUpdataCellSign = updateCellSignData(api, needChangeCellSign);
  newRowDataByUpdataCellSign.splice(start, count);

  // 更新content
  const content = getChangeContent([...(context?.content || [])], E_DIRECTION.ROW, { start, count });
  content.splice(start, count);

  /**
   * 更新grid
   * 1、pinning 需要剔除删除的列（暂时没用到可以先不用修正）
   * 2、conditionRules 需要修改列标识
   */
  const newGrid = { ...(context?.grid || {}) };
  newGrid.conditionRules = (newGrid?.conditionRules || [])
    .map((item) => {
      const { range } = item;
      const { startInfo, endInfo } = getRangeInfoByCellSign(columnApi, range);
      const startRowIndex = startInfo.rowIndex + 1;
      const endRowIndex = endInfo.rowIndex + 1;
      const currentRowIndexList = new Array(endRowIndex - startRowIndex + 1)
        .fill(0)
        .map((_, index) => startRowIndex + index);
      const deleteRow = new Array(count).fill(0).map((_, index) => start + index + 1);
      const diffRowIndex = currentRowIndexList.filter((rowI) => !deleteRow.includes(rowI));
      if (diffRowIndex.length === 0) {
        return {
          ...item,
          range: '',
        };
      }
      const newStartRowIndex = diffRowIndex[0];
      const newEndRowIndex = diffRowIndex[0] + diffRowIndex.length - 1;
      const offsetIndex = newStartRowIndex > start + 1 ? start + 1 : 0;
      const cacheRange = `${startInfo.headerName}${newStartRowIndex - offsetIndex}:${endInfo.headerName}${
        newEndRowIndex - offsetIndex
      }`;
      return {
        ...item,
        range: cacheRange,
      };
    })
    .filter((item) => Boolean(item.range));

  return { rowData: newRowDataByUpdataCellSign, content, grid: newGrid };
};

// 删除列
export const deleteColumn = (params: GetContextMenuItemsParams<any, IDGContext>, keys: Array<string> | string) => {
  const { api, columnApi, context } = params;
  const innerKeys = typeof keys === 'string' ? new Set([keys]) : new Set(keys);

  /**
   * handle Column
   */
  const allColumns = obtainColumnExcludeRowHeader(columnApi) || [];
  const newColumnDefs = allColumns
    .filter((item) => !innerKeys.has(item.getColDef().field || ''))
    .map((item, index) => {
      const colDef = item.getColDef();
      colDef.headerName = decimalToBase26(index + 1);
      return colDef;
    });

  let start = +Infinity;
  allColumns.forEach((item, colIndex) => {
    if (innerKeys.has(item.getColDef().field || '')) {
      start = Math.min(start, colIndex);
    }
  });

  /**
   * handle Content
   */
  const content = getChangeContent([...(context?.content || [])], E_DIRECTION.COLUMN, { start, count: innerKeys.size });
  const newContent = content.map((item) => lodash.omit(item, Array.from(innerKeys)));

  /**
   * handle RowData
   */
  const columnIndexList = getRowDataCellSign(api);
  const needChangeCellSign = calcNewCellSign(columnIndexList, start, E_DIRECTION.COLUMN, innerKeys.size * -1);
  const newRowDataByUpdataCellSign = updateCellSignData(api, needChangeCellSign);
  const newRowData = newRowDataByUpdataCellSign.map((item) => lodash.omit(item, Array.from(innerKeys)));

  /**
   * handle Grid
   * 1、pinning 需要剔除删除的列（暂时没用到可以先不用修正）
   * 2、conditionRules 需要修改列标识
   *  2.1、将range里面的列提取出来
   *  2.2、和删除列做剔除
   *  2.3、剩余列再去找到最小和最大列再整合
   */

  const newGrid = { ...(context?.grid || {}) };
  newGrid.conditionRules = (newGrid?.conditionRules || [])
    .map((item) => {
      const { range } = item;
      const { columnKeys: currentRangeColumnKeys, startInfo, endInfo } = getRangeInfoByCellSign(columnApi, range);
      const diffColumns = currentRangeColumnKeys.filter((columnKey) => !innerKeys.has(columnKey));
      if (diffColumns.length === 0) {
        return {
          ...item,
          range: '',
        };
      }
      // 从最新的列定义中找到列索引
      const newCols = diffColumns.map((colKey) => newColumnDefs.findIndex((newCol) => newCol.field === colKey));
      const minColumnIndex = lodash.min(newCols) as number;
      const maxColumnIndex = lodash.max(newCols) as number;
      const startHeaderName = decimalToBase26(minColumnIndex + 1);
      const endHeaderName = decimalToBase26(maxColumnIndex + 1);

      return {
        ...item,
        range: `${startHeaderName}${startInfo.rowIndex + 1}:${endHeaderName}${endInfo.rowIndex + 1}`,
      };
    })
    .filter((item) => Boolean(item.range));

  return {
    grid: newGrid,
    rowData: newRowData,
    content: newContent,
    columnDefs: newColumnDefs,
  };
};
