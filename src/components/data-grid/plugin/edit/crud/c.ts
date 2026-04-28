import { ColDef } from 'ag-grid-community';
import { E_DIRECTION } from '../../../enums';
import { gridState } from '../../../store/grid';
import { IAgGridCommon, IChangeProps } from '../../../types';
import {
  createData,
  decimalToBase26,
  getSpanningInfo,
  calcNewCellSign,
  insertRowSpanning,
  updateCellSignData,
  getRowDataCellSign,
  insertColumnSpanning,
  changeSpanningBySignCell,
} from '../../../utils';

/**
 * 插入行数据
 * 需要检测插入的时候是否有被合并单元格包裹
 */
export const insertRow = (params: IAgGridCommon, start: number, count: number) => {
  const { api, context } = params;
  const columnDefs = (api.getColumnDefs() as Array<ColDef>) || [];
  // 根据当前列定义生成数据
  const singleRowData = createData(columnDefs as Array<ColDef>);
  const currentInsertRowData = new Array(count || 1).fill(0).map(() => ({ ...singleRowData.rowData }));
  const currentInsertContent = new Array(count || 1).fill(0).map(() => ({ ...singleRowData.content }));

  // 检测spanning，主要是兼容插入点被合并单元格包裹情况
  const columnSpanning = getSpanningInfo(context?.content || [], E_DIRECTION.ROW);
  const needChangeCell = insertRowSpanning(columnSpanning, start);
  const content = changeSpanningBySignCell(context?.content || [], E_DIRECTION.ROW, needChangeCell, count);

  // 修改数据
  const columnIndexList = getRowDataCellSign(api);
  const needChangeCellSign = calcNewCellSign(columnIndexList, start, E_DIRECTION.ROW, count);
  const newRowDataByUpdataCellSign = updateCellSignData(api, needChangeCellSign);
  newRowDataByUpdataCellSign.splice(start, 0, ...currentInsertRowData);

  // 更新content
  content.splice(start, 0, ...currentInsertContent);

  return { rowData: newRowDataByUpdataCellSign, content };
};

// 插入列数据
export const insertColumn = (params: IAgGridCommon, columnKey: string, count: number, direction: 'left' | 'right') => {
  const { api, columnApi, context } = params;
  const allColumnsField = columnApi.getAllDisplayedColumns().map((item) => item.getColDef()?.field || '');
  const columnDefs = (api.getColumnDefs() as Array<ColDef>) || [];
  const insertIndex = columnDefs.findIndex((item) => item.field === columnKey);
  const insertSign = direction === 'left' ? insertIndex : insertIndex + 1;
  const columnsKeys = columnDefs
    .map((item) => item?.field?.match(/\d+/g))
    .filter((item) => Boolean(item)) as unknown as Array<number>;

  const currentCounter = Math.max(0, ...(columnsKeys || []).flat());

  // 生成插入数据
  const createNewHeader = new Array(count || 1).fill(0).map((_, index) => ({
    field: `insert${index + currentCounter + 1}`,
  }));
  const createNewRow = createData(createNewHeader);

  const newColDefs = [...columnDefs];
  newColDefs.splice(insertSign, 0, ...createNewHeader);

  // 重置 headerName
  const newColumnDefs = newColDefs.map((item, index) => ({
    ...item,
    headerName: decimalToBase26(index + 1),
  })) as Array<ColDef>;
  const columnIndexList = getRowDataCellSign(api);
  const needChangeCellSign = calcNewCellSign(columnIndexList, insertSign, E_DIRECTION.COLUMN, count);
  const newRowDataByUpdataCellSign = updateCellSignData(api, needChangeCellSign);
  const newRowData = newRowDataByUpdataCellSign.map((item) => ({ ...item, ...createNewRow.rowData }));

  const rowSpanning = getSpanningInfo(context?.content || [], E_DIRECTION.COLUMN);
  const sortColumn = rowSpanning.map((item) => allColumnsField.map((field) => [field, item[field]]));
  const needChangeCell = insertColumnSpanning(sortColumn, insertSign);
  const content = changeSpanningBySignCell(context?.content || [], E_DIRECTION.COLUMN, needChangeCell, count);
  const newContent = content.map((item) => ({ ...item, ...createNewRow.content }));

  return {
    rowData: newRowData,
    content: newContent,
    columnDefs: newColumnDefs,
  };
};

/**
 * 创建空表格
 */
export const createGrid = (row: number, column: number, header?: Array<ColDef>): IChangeProps => {
  let columnDefs = header || [];
  if (columnDefs.length === 0) {
    columnDefs = new Array(column).fill(0).map((_, index) => ({
      field: `field${index}`,
      headerName: decimalToBase26(index + 1),
    }));
  }

  const singleRowData = createData(columnDefs);

  const rowData = new Array(row).fill(0).map(() => ({ ...singleRowData.rowData }));

  const content = new Array(row).fill(0).map(() => ({ ...singleRowData.content }));

  return {
    rowData,
    content,
    columnDefs,
    grid: { ...gridState },
  };
};
