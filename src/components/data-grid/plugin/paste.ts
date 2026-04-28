import lodash from 'lodash';
import { parseTable } from 'html-table-parser';
import { CellPosition, ColumnApi, GridApi } from 'ag-grid-community';
import { insertColumn } from '../plugin';
import { regexExecTableInnerHTML } from '../regex';
import {
  createData,
  getAllRowData,
  parsePasteText,
  parseStyleText,
  getColumnInfoByField,
  getColumnInfoByFieldByColsDef,
} from '../utils';
import {
  IDGContext,
  TChangeProps,
  TDeepRequired,
  TTableParserCellInfo,
  IDeltaConfigContentSpanning,
  IDeltaConfigContentCellStyle,
} from '../types';

export const processDataFromClipboard = (params: {
  api: GridApi;
  columnApi: ColumnApi;
  context: IDGContext;
  data: Array<Array<string>>;
}) => {
  const { api, columnApi, context } = params;
  let rowData = getAllRowData(api);
  let content = [...context.content];
  let columnDefs = columnApi.getAllDisplayedColumns().map((item) => item.getColDef());
  const data = [...params.data];
  const dataColumnMax = lodash.max(data.map((item) => item.length)) || 1;
  const emptyLastRow = data[data.length - 1][0] === '' && data[data.length - 1].length === 1;
  if (emptyLastRow) {
    data.splice(data.length - 1, 1);
  }
  const focusedCell = api.getFocusedCell() as CellPosition;
  const focusedColumn = focusedCell.column;
  const focusedField = focusedColumn.getColDef().field || '';
  const columnInfo = getColumnInfoByField(columnApi, focusedField, true);
  const lastColumnIndex = columnInfo.columnKeys.length - 1;
  const appendColumn = columnInfo.columnIndex + dataColumnMax - 1 - lastColumnIndex;
  if (appendColumn > 0) {
    const insertColumnInfo = insertColumn(
      {
        api,
        columnApi,
        context,
      },
      columnInfo.columnKeys[lastColumnIndex],
      appendColumn,
      'right',
    );
    rowData = insertColumnInfo.rowData;
    content = insertColumnInfo.content;
    columnDefs = insertColumnInfo.columnDefs;
  }

  const lastIndex = api.getModel().getRowCount() - 1;
  const focusedIndex = focusedCell.rowIndex;
  const appendRow = focusedIndex + data.length - 1 - lastIndex;

  if (appendRow > 0) {
    const createNewSingleRow = createData(columnDefs);
    const createNewData = new Array(appendRow).fill(0).map(() => ({ ...createNewSingleRow.rowData }));
    const createNewContent = new Array(appendRow).fill(0).map(() => ({ ...createNewSingleRow.content }));
    rowData = [...rowData, ...createNewData];
    content = [...content, ...createNewContent];
  }

  /**
   * 将粘贴的数据填充到最新的数据里面
   * 先组装列数据
   */
  const targetColumn = columnDefs
    .map((item) => item.field || '')
    .slice(columnInfo.columnIndex, columnInfo.columnIndex + dataColumnMax);
  params.data.forEach((item, index) => {
    const newColumnValue = targetColumn.reduce((acc, curVal, curIndex) => {
      acc[curVal] = item[curIndex] ?? '';
      return acc;
    }, {} as Record<string, string>);
    rowData[focusedIndex + index] = { ...rowData[focusedIndex + index], ...newColumnValue };
  });

  return {
    content,
    rowData,
    columnDefs,
  };
};

/**
 * 转换结构
 */
export const extractTable = (htmlString: string) => {
  const tableContent = regexExecTableInnerHTML.exec(htmlString)?.[1] || '';
  if (!tableContent) {
    return [];
  }

  const format = document.createElement('table');
  format.innerHTML = tableContent;
  const formatData: Array<Array<TTableParserCellInfo>> = parseTable(format);
  const cacheMark = new Set();
  const removeDuplicates = formatData.map((row) =>
    row.map((cell) => {
      if (cacheMark.has(cell.elementId)) {
        return {} as TTableParserCellInfo;
      }
      cacheMark.add(cell.elementId);
      return cell;
    }),
  );

  return removeDuplicates;
};

/**
 * handle paste event
 * 1、解析粘贴的表格数据
 * 2、将数据进行格式化
 * 3、找到粘贴起点，然后再找到选中区域
 * 4、扩展行列（如果超出内容）
 * 4、检测选中区域内的是否包含有合并单元格的内容
 * 5、如果包含了合并单元格，重置原来的内容格（减去选中区域的内容格）
 * 6、将粘贴的格式写入content
 */
export const handlePasteParse = (
  event: Event,
  api: GridApi,
  columnApi: ColumnApi,
  context: IDGContext,
  callback: (params: TChangeProps) => void,
  // eslint-disable-next-line consistent-return
) => {
  const clipboardData = (event as any).clipboardData || (window as any).clipboardData;
  const pasteText = clipboardData.getData('text');
  let pasteData = parsePasteText(pasteText);

  const focusedCell = api.getFocusedCell() as CellPosition;
  const rowStartIndex = focusedCell.rowIndex;
  const focusedColumn = focusedCell.column;
  const focusedField = focusedColumn.getColDef().field || '';

  const pasteHTML = clipboardData.getData('text/html');
  if (pasteHTML) {
    const formatData = extractTable(pasteHTML);
    pasteData = formatData.map((rows) => rows.map((row) => row?.textContent || ''));
  }

  const columnMax = lodash.max(pasteData.map((e) => e.length)) || 1;

  /**
   * 如果不够的情况下，自动扩展行列
   * 此处之后，就不能完全信任grid api的数据了，只能信任这里产出的数据
   */
  const { content, columnDefs, rowData } = processDataFromClipboard({
    api,
    context,
    columnApi,
    data: pasteData,
  });

  /**
   * updateRowData
   * 转换成Array<Record<field, string>>
   */
  const { columnIndex, columnKeys } = getColumnInfoByFieldByColsDef(columnDefs, focusedField);
  const pasteRowData: Array<Record<string, string>> = pasteData.map((rows) => {
    return rows.reduce((acc, curVal, colIndex) => {
      const currentField = columnKeys[columnIndex + colIndex] || '';
      acc[currentField] = curVal || '';
      return acc;
    }, {} as Record<string, string>);
  });
  pasteRowData.forEach((row, index) => {
    rowData[index + rowStartIndex] = { ...rowData[index + rowStartIndex], ...row };
  });

  /**
   * 重置原本的单元格
   * 1、找到所有的合并单元格
   * 2、计算出受影响的单元格
   *  2.1、开始的行/列不属于此次修改区域 & 经过或者跨越了修改区域
   * 3、合并单元格进行处理，剩余未触及选中区域的内容（这样跨越选中区域的单元格也能一并兼容）
   */
  const allSpanningCell: Array<{
    rowIndex: number;
    field: string;
    rowSpanning: number;
    columnSpanning: number;
  }> = [];
  content.forEach((item, rowIndex) => {
    Object.entries(item).forEach(([field, cell]) => {
      if ((cell?.spanning?.column && cell?.spanning?.column > 1) || (cell?.spanning?.row && cell?.spanning?.row > 1)) {
        allSpanningCell.push({
          rowIndex,
          field,
          rowSpanning: cell.spanning.row || 1,
          columnSpanning: cell.spanning.column || 1,
        });
      }
    });
  });

  // 找到受影响的单元格
  allSpanningCell.forEach((item) => {
    const { rowIndex, field, rowSpanning, columnSpanning } = item;
    const colIndex = columnDefs.findIndex((colDef) => colDef.field === field);
    if (
      rowStartIndex + pasteData.length > rowIndex &&
      rowIndex + rowSpanning - 1 >= rowStartIndex &&
      colIndex + columnSpanning - 1 >= columnIndex &&
      columnIndex + columnMax > colIndex
    ) {
      content[rowIndex][field] = lodash.merge({}, content[rowIndex][field], {
        spanning: {
          row: Math.max(rowStartIndex - rowIndex, 1),
          column: Math.max(columnIndex - colIndex, 1),
        },
      });
    }
  });

  let pasteContent: Array<Record<string, IDeltaConfigContentSpanning & IDeltaConfigContentCellStyle>> = [];
  if (pasteHTML) {
    const formatData = extractTable(pasteHTML);
    pasteContent = formatData.map((rows) =>
      rows.reduce((acc, curVal, colIndex) => {
        const currentField = columnKeys[columnIndex + colIndex] || '';
        const attributes = curVal?.attributes || {};
        const spanning = {} as TDeepRequired<IDeltaConfigContentSpanning>['spanning'];
        if (attributes?.rowspan) {
          spanning.row = Number(attributes.rowspan);
        }
        if (attributes?.colspan) {
          spanning.column = Number(attributes.colspan);
        }
        acc[currentField] = {
          cellStyle: parseStyleText(attributes.style || ''),
          spanning,
        };
        return acc;
      }, {} as Record<string, IDeltaConfigContentSpanning & IDeltaConfigContentCellStyle>),
    );
  }

  pasteContent.forEach((row, index) => {
    content[index + rowStartIndex] = lodash.merge({}, content[index + rowStartIndex], row);
  });

  api.clearRangeSelection();
  api.addCellRange({
    rowEndIndex: rowStartIndex + pasteContent.length - 1,
    rowStartIndex,
    columns: columnDefs.slice(columnIndex, columnIndex + columnMax).map((item) => item.field || ''),
  });

  callback({
    rowData,
    content,
    columnDefs,
  });
};
