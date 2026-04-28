import lodash from 'lodash';
import { ColDef, IRowNode, GridApi, ColumnApi } from 'ag-grid-community';
import { E_DIRECTION } from '../enums';
import { MAX_PARSE } from '../constant';
import { isIncludeColumnIndex } from './judge';
import { regexSplitColumnIndex } from '../regex';
import { base26ToDecimal, decimalToBase26 } from './format';
import { batchGetCellData, getCellByColumnView } from './obtain';
import {
  IRange,
  TContent,
  ISignCell,
  TRangeCross,
  IRangeCross,
  TDeltaConfigContent,
  TDeltaConfigContentItem,
} from '../types';

export * from './day';
export * from './judge';
export * from './attach';
export * from './obtain';
export * from './format';
export * from './generate';
export * from './interaction';

export const rangesUpdateContent = (
  content: Array<TDeltaConfigContent>,
  startRowIndex: number,
  endRowIndex: number,
  columnKeys: Array<string>,
  value: TDeltaConfigContentItem,
  replace?: boolean,
) => {
  const columnSet = new Set(columnKeys);
  const newContent = content.map((item, index) => {
    if (index >= startRowIndex && index <= endRowIndex) {
      const cache = Object.keys(item).reduce((acc, currentKey) => {
        let target = item[currentKey];
        if (columnSet.has(currentKey)) {
          target = replace ? { ...target, ...value } : lodash.merge({}, target, value);
        }
        acc[currentKey] = target;
        return acc;
      }, {} as TDeltaConfigContent);
      return cache;
    }
    return item;
  });
  return newContent;
};

export const createData = (columnDefs: Array<ColDef>) =>
  columnDefs.reduce(
    (acc, currentVal) => {
      const { field = '' } = currentVal;
      // rowData
      acc.rowData[field] = '';
      // content
      acc.content[field] = {};
      return acc;
    },
    {
      rowData: {},
      content: {},
    } as { rowData: Record<string, string>; content: Record<string, any> },
  );

export const getAllRowNode = (api: GridApi) => {
  const allNode: Array<IRowNode> = [];
  api.forEachNode((node) => allNode.push(node));
  return allNode;
};

export const rowSpanningCrossRange = (data: Array<Array<number>>, range: IRangeCross) => {
  const rowMax = data.map((item) => Math.max(...item.slice(range.crossStart, range.crossEnd + 1)));
  return rowMax.map((item, rowIndex) => item + rowIndex - 1);
};

export const calculateRangeSpanning = (data: Array<Array<number>>, range: TRangeCross) => {
  const rowSpanning = rowSpanningCrossRange(data, { crossStart: range.crossStart, crossEnd: range.crossEnd });
  let startRange = range.mainStart;
  let endRange = range.mainEnd;
  let mark = false;
  rowSpanning.forEach((item, index) => {
    if (index < startRange && item >= startRange) {
      // 未进入选中框内
      startRange = index;
      mark = true;
    } else if (index <= endRange && item > endRange) {
      // 进入选中框内
      endRange = item;
      mark = true;
    }
  });

  if (mark) {
    const { start, end } = calculateRangeSpanning(data, {
      mainEnd: endRange,
      mainStart: startRange,
      crossEnd: range.crossEnd,
      crossStart: range.crossStart,
    });
    startRange = start;
    endRange = end;
  }

  return { start: startRange, end: endRange };
};

/**
 * 二维数组转置
 */
export const transpose = (array: Array<Array<any>>) =>
  (array[0] || []).map((_, colIndex) => array.map((row) => row[colIndex]));

/**
 * 清空指定区域的内容，允许排除部分单元格
 */
export const clearRangeRowData = (rowData: Array<Record<string, any>>, range: IRange, exclude?: Array<ISignCell>) => {
  const { endRowIndex, startRowIndex, columnKeys } = range;
  return rowData.map((item, rowIndex) => {
    if (rowIndex >= startRowIndex && rowIndex <= endRowIndex) {
      const newData = columnKeys.reduce((acc, curVal) => {
        const isExclude = (exclude || []).find((cell) => cell.rowIndex === rowIndex && cell.field === curVal);
        if (isExclude) {
          acc[curVal] = item[curVal];
        } else {
          acc[curVal] = '';
        }
        return acc;
      }, {} as Record<string, any>);
      return {
        ...item,
        ...newData,
      };
    }
    return item;
  });
};

/**
 * 行插入的合并单元格计算
 */
export const insertRowSpanning = (data: Array<Record<string, number>>, insertSign: number) => {
  /**
   * 将合并单元格信息按照列进行归总
   * 输出Array<Record<field, Array<number>>>
   */
  const columnSpanningInfo = data.reduce((acc, curVal) => {
    Object.entries(curVal).forEach(([key, value]) => {
      acc[key] = acc[key] || [];
      acc[key].push(value);
    });
    return acc;
  }, {} as Record<string, Array<number>>);

  const cacheRes: Array<ISignCell> = [];
  /**
   * 对每一列都进行计算，得出需要调整的单元格
   */
  Object.entries(columnSpanningInfo).forEach(([field, columnSpanning]) => {
    const columnMax = columnSpanning.map((item, rowIndex) => item + rowIndex - 1);
    columnMax.forEach((item, index) => {
      if (index < insertSign && item >= insertSign) {
        cacheRes.push({
          field,
          rowIndex: index,
        });
      }
    });
  });

  return cacheRes;
};

/**
 * 列插入的合并单元格计算
 */
export const insertColumnSpanning = (data: Array<Array<Array<string | number>>>, insertSign: number) => {
  const cacheRes: Array<ISignCell> = [];
  data.forEach((row, rowIndex) => {
    row.forEach(([field, value], cloumnIndex) => {
      const currentValue = (value as number) + cloumnIndex - 1;
      if (cloumnIndex < insertSign && currentValue >= insertSign) {
        cacheRes.push({
          field: field as string,
          rowIndex,
        });
      }
    });
  });
  return cacheRes;
};

/**
 * 修改指定单元格的spanning
 */
export const changeSpanningBySignCell = (
  content: TContent,
  key: E_DIRECTION,
  signCell: Array<ISignCell>,
  appendCount: number,
) => {
  const innerContent = lodash.cloneDeep(content);
  signCell.forEach((item) => {
    const { field, rowIndex } = item;
    const target = innerContent[rowIndex][field];
    if (target?.spanning?.[key]) {
      // eslint-disable-next-line operator-assignment
      target.spanning[key] = (target?.spanning?.[key] || 1) + appendCount;
    }
  });
  return innerContent;
};

/**
 * 解析单元格的列表达式
 */
export const parseCellExpression = (api: GridApi, columnApi: ColumnApi, str: string, count?: number) => {
  let currentVal = str;
  const innerCount = count || 1;
  const cellExpression = getCellByColumnView(currentVal);
  const allColumn = columnApi.getAllDisplayedColumns();
  const formatCellExpression = cellExpression.map((item) => {
    const { headerName, key, rowIndex } = item;
    const targetColumn = allColumn.find((col) => col.getColDef().headerName === headerName);
    const field = targetColumn?.getColDef().field || '';

    return {
      key,
      field,
      rowIndex,
    };
  });
  const columnValue = batchGetCellData(api, formatCellExpression);
  columnValue.forEach(([key, cellValue]) => {
    currentVal = currentVal.replace(key, `(${cellValue})`);
  });

  const isArithmetic = isIncludeColumnIndex(currentVal);
  if (isArithmetic && innerCount <= MAX_PARSE) {
    currentVal = parseCellExpression(api, columnApi, currentVal, innerCount + 1);
  }
  return currentVal;
};

/**
 * 计算需要修改的列标识
 */
export const calcNewCellSign = (cellSign: Array<string>, insertSign: number, direction: E_DIRECTION, count: number) => {
  const needChange: Array<Array<string>> = [];
  cellSign.forEach((item) => {
    const [headerName, rowIndex] = item.match(regexSplitColumnIndex) || [];
    if (headerName !== undefined && rowIndex !== undefined) {
      let newHeaderName = headerName;
      let newRowIndex = rowIndex;
      const calcIndex = (direction === E_DIRECTION.COLUMN ? base26ToDecimal(headerName) : Number(rowIndex)) - 1;
      if (calcIndex >= insertSign) {
        const newIndex = calcIndex + count + 1;
        if (direction === E_DIRECTION.COLUMN) {
          newHeaderName = decimalToBase26(newIndex);
        } else {
          newRowIndex = `${newIndex}`;
        }
        needChange.push([item, `${newHeaderName}${newRowIndex}`]);
      }
    }
  });

  return needChange;
};

/**
 * 更新cellsign
 */
export const updateCellSignData = (api: GridApi<Record<string, string>>, cellSignMapping: Array<Array<string>>) => {
  const rowData: Array<Record<string, string>> = [];
  const sortCellSignMapping = lodash.sortBy(cellSignMapping, (item) => item[0]).reverse();
  api.forEachNode((rowNode) => {
    const cacheRow: Record<string, string> = {};
    Object.entries(rowNode.data || {}).forEach(([field, value]) => {
      let innerVal = value;
      if (innerVal) {
        sortCellSignMapping.forEach(([oldValue, newValue]) => {
          const regex = new RegExp(oldValue, 'ig');
          innerVal = innerVal.replace(regex, newValue);
        });
      }
      cacheRow[field] = innerVal;
    });
    rowData.push(cacheRow);
  });
  return rowData;
};
