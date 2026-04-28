import lodash from 'lodash';
import { ColDef, ColumnApi, GridApi, RowNode } from 'ag-grid-community';
import { generateColorScale } from './generate';
import { base26ToDecimal, parseRangeExpression } from './format';
import { ROW_HEADER_FIELD_NAME } from '../constant';
import { isEqualStart, isPercentage, isNumericOrPercent, isIncludeColumnIndex } from './judge';
import { E_DIRECTION, E_CONDITION_RULES_KEY } from '../enums';
import { regexColumnIndexView, regexSplitColumnIndex } from '../regex';
import { ISignCell, IRange, TContent, IBaseActiveCell, IDeltaConfigGrid } from '../types';

/**
 * 获取所有显示的数据
 * 筛选过后的数据
 */
export const getAllFilterRows = (api: GridApi) => {
  const allData = api.getModel();
  const targetData: Array<RowNode> = [];
  allData.forEachNode((rows) => {
    if (rows.displayed) {
      targetData.push(rows);
    }
  });
  return targetData;
};

/**
 * 获取选中范围内的content内容
 * 这里需要考虑筛选的情况
 * 1、先获取所有筛选后的数据
 * 2、然后找到对应行
 * 3、找到对应行位置
 * 4、再找到对应的配置
 */
export const getRangeContent = (api: GridApi, content: TContent, range: IRange) => {
  const { endRowIndex, startRowIndex, columnKeys } = range;
  const getAllShowRowData = getAllFilterRows(api);
  const rangeRow = getAllShowRowData.slice(startRowIndex, endRowIndex + 1);
  return rangeRow.map((item) => content?.[Number(item.id)]).map((item) => lodash.pick(item, columnKeys));
};

/**
 * 获取指定值的合并单元格情况
 */
export const getSpanningInfo = (content: TContent, key: E_DIRECTION) =>
  content.map((item) =>
    Object.keys(item).reduce((acc, currentKey) => {
      const currentValue = item[currentKey];
      acc[currentKey] = currentValue?.spanning?.[key] || 1;
      return acc;
    }, {} as { [key: string]: number }),
  );

/**
 * 获取当前列的位置(通过列头的定义)
 */
export const getColumnInfoByFieldByColsDef = (colsDef: Array<ColDef>, field: string) => {
  const allColumn = [...colsDef];
  const currentColumnIndex = allColumn.findIndex((item) => item.field === field);
  const columnKeys = allColumn.map((item) => item.field);

  return {
    columnKeys,
    column: allColumn,
    columnIndex: currentColumnIndex,
  };
};

/**
 * 获取单元格内所有数据
 */
export const getAllRowData = (api: GridApi) => {
  const rowData: Array<any> = [];
  api?.forEachNode((rowNode) => {
    rowData.push(rowNode.data);
  });
  return rowData;
};

/**
 * 获取指定单元格的数据
 */
export const getCellData = (api: GridApi, cell: ISignCell) => {
  let cache = '';
  api.forEachNode((rowNode) => {
    if (rowNode.rowIndex === cell.rowIndex) {
      cache = rowNode.data[cell.field];
    }
  });

  return cache;
};

/**
 * 从rowData里面获取单元格内容
 */
export const batchGetCellData = (api: GridApi, cell: Array<ISignCell & { key: string }>) => {
  const allData = getAllRowData(api);
  const result = cell.map((item) => {
    const { field, rowIndex, key } = item;
    return [key, allData?.[rowIndex]?.[field] || ''] as Array<string>;
  });
  return result;
};

/**
 * 获取选中范围的相关信息
 * @returns 开始/结束行、列、列标识
 */
export const getRangeInfo: (api: GridApi) => IBaseActiveCell = (api) => {
  const [selectRanges] = api.getCellRanges() || [];
  if (!selectRanges) {
    return { startRowIndex: 0, endRowIndex: 0, columns: [], columnKeys: [] };
  }

  const { endRow, startRow, columns } = selectRanges;

  const columnKeys = columns.map((item) => item.getColDef()?.field || '');
  const startRowIndex = Math.min(endRow?.rowIndex || 0, startRow?.rowIndex || 0);
  const endRowIndex = Math.max(endRow?.rowIndex || 0, startRow?.rowIndex || 0);

  return { startRowIndex, endRowIndex, columns, columnKeys };
};

/**
 * 获取制定区域单元格数据（带列名称）
 */
export const getRangeRowDataAndField = (api: GridApi, params: IRange) => {
  const { endRowIndex, startRowIndex, columnKeys } = params;
  const allData = getAllFilterRows(api).map((item) => item.data);
  return allData.slice(startRowIndex, endRowIndex + 1).map((item) => lodash.pick(item, columnKeys));
};

/**
 * 获取指定区域单元格数据(纯数据)
 */
export const getRangeRowData = (api: GridApi, params?: IRange) => {
  const range = params || getRangeInfo(api);
  return getRangeRowDataAndField(api, range).map((data) => Object.entries(data).map(([, value]) => value));
};

/**
 * 提取列的表达式
 */
export const getCellByColumnView = (str: string) =>
  str.match(regexColumnIndexView)?.map((item) => {
    const formatColumn = lodash.toUpper(item);
    const [headerName, rowIndex] = formatColumn.match(regexSplitColumnIndex) || [];
    return {
      key: item,
      headerName,
      rowIndex: Number(rowIndex) - 1,
    };
  }) || [];

/**
 * 提取单元格里面的列标识
 */
export const getRowDataCellSign = (api: GridApi<Record<string, string>>) => {
  const cacheData: Array<string> = [];
  api.forEachNode((rowNode) => {
    Object.entries(rowNode.data || {}).forEach(([_, value]) => {
      if (value && isEqualStart(value) && isIncludeColumnIndex(value)) {
        const cellColumIndexList = value.match(regexColumnIndexView) || [];
        cacheData.push(...cellColumIndexList);
      }
    });
  });
  return Array.from(new Set(cacheData));
};

/**
 * 在选中区域提取数据和样式
 * 如果content为空的话，说明没有任何配置文件，则直接显示内容即可
 */
export const obtainDataStyleByRange = (
  api: GridApi,
  content: TContent,
  range: IRange,
  tableData?: Array<Array<string>>,
) => {
  const { columnKeys } = range;
  const rangeContent = getRangeContent(api, content, range);
  const rangeRowData = getRangeRowDataAndField(api, range);

  /**
   * 转换成具有列顺序的数据
   */
  const spanningCellList: Array<{
    rowIndex: number;
    colIndex: number;
    colSpanning?: number;
    rowSpanning?: number;
  }> = [];
  // 以rowData为基础，避免content为空的情况
  const rangeInfo: Array<Array<any>> = rangeRowData.map((defaultRowData, rowIndex) =>
    columnKeys.map((field, colIndex) => {
      const currentContent = rangeContent[rowIndex][field];
      const currentContentSpanning = currentContent?.spanning || {};
      if (
        (currentContentSpanning.column && currentContentSpanning.column > 1) ||
        (currentContentSpanning.row && currentContentSpanning.row > 1)
      ) {
        spanningCellList.push({
          rowIndex,
          colIndex,
          colSpanning: currentContentSpanning?.column || 1,
          rowSpanning: currentContentSpanning?.row || 1,
        });
      }
      return {
        ...currentContent,
        textContent: tableData?.[rowIndex]?.[colIndex] ?? defaultRowData[field],
      };
    }),
  );
  /**
   * 将被合并的单元格置为null，以便后续识别
   */
  spanningCellList.forEach((item) => {
    const { rowIndex, rowSpanning, colIndex, colSpanning } = item;
    if (colSpanning && colSpanning > 1) {
      new Array(colSpanning).fill(0).forEach((_, index) => {
        if (index !== 0) {
          const currentIndex = colIndex + index;
          rangeInfo[rowIndex][currentIndex] = null;
        }
      });
    }
    if (rowSpanning && rowSpanning > 1) {
      new Array(rowSpanning).fill(0).forEach((_, index) => {
        if (index !== 0) {
          const currentIndex = rowIndex + index;
          rangeInfo[currentIndex][colIndex] = null;
        }
      });
    }
  });
  return rangeInfo;
};

/**
 * 获取指定列在页面中的位置
 */
export const obtainColumnIndexByField = (columnApi: ColumnApi, field: string, includeRowHeader?: boolean) => {
  const allColumn = columnApi.getAllDisplayedColumns();
  const filterColumn = allColumn.filter((item) => item.getColDef().field !== ROW_HEADER_FIELD_NAME);
  return (includeRowHeader ? allColumn : filterColumn).findIndex((item) => item.getColDef().field === field);
};

/**
 * 获取不包含rowHeader的所有列
 */
export const obtainColumnExcludeRowHeader = (columnApi: ColumnApi) =>
  columnApi.getAllDisplayedColumns().filter((item) => item.getColDef().field !== ROW_HEADER_FIELD_NAME);

/**
 * 获取当前列的位置
 */
export const getColumnInfoByField = (columnApi: ColumnApi, field: string, includeRowHeader?: boolean) => {
  const allColumn = includeRowHeader ? columnApi.getAllDisplayedColumns() : obtainColumnExcludeRowHeader(columnApi);
  let currentColumnIndex = 0;
  const columnKeys = allColumn.map((item, index) => {
    const colField = item.getColDef().field || '';
    if (colField === field) {
      currentColumnIndex = index;
    }
    return colField;
  });

  return {
    columnKeys,
    column: allColumn,
    columnIndex: currentColumnIndex,
  };
};

/**
 * 根据列索引获取列的范围
 */
export const getColumnInfoByColumIndex = (
  columnApi: ColumnApi,
  { start, end }: { start: number; end: number },
  includeRowHeader?: boolean,
) => {
  const allColumn = includeRowHeader ? columnApi.getAllDisplayedColumns() : obtainColumnExcludeRowHeader(columnApi);
  const targetColumn = allColumn.slice(start, end + 1);

  return {
    columnKeys: targetColumn.map((item) => item.getColDef().field || ''),
    columns: targetColumn,
  };
};

/**
 * 根据两个颜色，获取颜色列表
 */
export const getColorList = (color: { start: string; end: string }, type: E_CONDITION_RULES_KEY) =>
  type === E_CONDITION_RULES_KEY.COLORSCALE ? generateColorScale(color) : [color.start, color.end];

/**
 * 获取条件格式
 */
export const getConditionRule = (
  columnApi: ColumnApi,
  cell: ISignCell,
  conditionRules: IDeltaConfigGrid['conditionRules'] = [],
) => {
  const { field, rowIndex } = cell;
  const colIndex = obtainColumnIndexByField(columnApi, field);
  return conditionRules.find((elRules) => {
    const { range } = elRules;
    const conditionRangeInfo = parseRangeExpression(range);
    if (conditionRangeInfo) {
      const { endRowIndex, startRowIndex, endColumnIndex, startColumnIndex } = conditionRangeInfo;
      if (
        rowIndex <= endRowIndex &&
        rowIndex >= startRowIndex &&
        colIndex <= endColumnIndex &&
        colIndex >= startColumnIndex
      ) {
        return true;
      }
    }
    return false;
  });
};

/**
 * 提取数组内的所有数字类型，包括百分百字符串
 */
export const getNumbicData = (rangeData: Array<string>) =>
  rangeData
    .filter((item) => isNumericOrPercent(item))
    .map((item) => {
      if (isPercentage(item)) {
        // 百分百数字
        return parseFloat(item.replace(/%/g, '')) / 100;
      }
      return parseFloat(item);
    });

/**
 * 提取range格式的列信息
 */
export const getRangeInfoByCellSign = (columnApi: ColumnApi, range: string) => {
  const [startInfo, endInfo] = getCellByColumnView(range);

  if (startInfo?.headerName && endInfo.headerName) {
    const startColumnIndex = base26ToDecimal(startInfo.headerName);
    const endColumnIndex = base26ToDecimal(endInfo.headerName);
    const currentRangeInfo = getColumnInfoByColumIndex(columnApi, {
      start: startColumnIndex - 1,
      end: endColumnIndex - 1,
    });
    return { ...currentRangeInfo, startInfo, endInfo };
  }
  return {
    columnKeys: [],
    columns: [],
    startInfo,
    endInfo,
  };
};
