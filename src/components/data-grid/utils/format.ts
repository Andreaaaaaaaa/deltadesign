import { ColumnApi } from 'ag-grid-community';
import { IBaseActiveCell } from '../types';
import { regexExcelRange } from '../regex';
import { E_FILLING, E_FORMAT_NEGATIVE } from '../enums';
import { obtainColumnExcludeRowHeader } from './obtain';
import { ROWS_SEPARATOR, PASTE_OBTAIN_ATTR, VALUE_SEPARATOR } from '../constant';
import { isNumeric } from './judge';

/**
 * hex to rgb
 */
export const hexToRgb = (hex: string) => {
  let r;
  let g;
  let b;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }

  return { r, g, b };
};

/**
 * hex + opacity 转为rgba
 */
export const hexToRgba = (hex: string, opacity: number) => {
  let op = opacity;
  const { r, g, b } = hexToRgb(hex);

  if (opacity > 1) {
    op = opacity / 100;
  }
  return `rgba(${r}, ${g}, ${b}, ${op})`;
};

/**
 * 格式化颜色
 */
export const transformColorByFilling = (
  curColor: string,
  filling: E_FILLING,
  direction: 'right' | 'left' = 'right',
) => {
  switch (filling) {
    case E_FILLING.GRADIEND:
      return `linear-gradient(to ${direction}, ${curColor}, ${hexToRgba(curColor, 0.3)})`;
    case E_FILLING.SOLID:
    default:
      return curColor;
  }
};

/**
 * 数字转换成字母序号
 */
export const decimalToBase26 = (input: number) => {
  let result = '';
  let innerInput = input;
  while (innerInput > 0) {
    const remainder = (innerInput - 1) % 26;
    result = String.fromCharCode(remainder + 'A'.charCodeAt(0)) + result;
    innerInput = Math.floor((innerInput - 1) / 26);
  }
  return result;
};

/**
 * 字母转换成数字
 */
export const base26ToDecimal = (base26: string) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let decimal = 0;
  let power = 0;

  // eslint-disable-next-line no-plusplus
  for (let i = base26.length - 1; i >= 0; i--) {
    const letter = base26[i];
    const index = letters.indexOf(letter);
    if (index === -1) {
      throw new Error(`Invalid character: ${letter}`);
    }
    decimal += (index + 1) * 26 ** power;
    // eslint-disable-next-line no-plusplus
    power++;
  }

  return decimal;
};

/**
 * Array<Array<string>> to string
 */
export const tableDataToString = (data: Array<Array<string>>) =>
  data.map((row) => row.join(VALUE_SEPARATOR)).join(ROWS_SEPARATOR);

/**
 * 格式化粘贴的text文本，转换成二维数组
 */
export const parsePasteText = (value: string) => value.split(ROWS_SEPARATOR).map((item) => item.split(VALUE_SEPARATOR));

/**
 * 解析style样式
 */
export const parseStyleText = (value: string) =>
  value
    ? value.split(';').reduce((ruleMap, ruleString) => {
        const [key, cssValue] = ruleString.split(':');
        if (!key || !cssValue || !PASTE_OBTAIN_ATTR.includes(key)) {
          return ruleMap;
        }
        ruleMap[key?.trim()] = cssValue?.trim().replace('pt', 'px') || '';
        return ruleMap;
      }, {} as Record<string, string>)
    : {};

/**
 * 范围表达式结构
 * A1:C6 => {startRowIndex: 1, endRowIndex: 6, startColumnIndex: 0, endColumnIndex: 2}
 */
export const parseRangeExpression = (rangeValue: string) => {
  const match = rangeValue.match(regexExcelRange);

  if (!match) {
    return null;
  }

  const [, start, end] = match;

  const parseCell = (cell: string) => {
    const cellRegex = /^([A-Z]+)([1-9][0-9]*)$/;
    const [, column, row] = cell.match(cellRegex) as RegExpMatchArray;
    return { column: base26ToDecimal(column) - 1, row: parseInt(row, 10) - 1 };
  };

  const { column: cell1Col, row: cell1Row } = parseCell(start);
  const { column: cell2Col, row: cell2Row } = parseCell(end);

  return {
    endRowIndex: Math.max(cell1Row, cell2Row),
    startRowIndex: Math.min(cell1Row, cell2Row),
    endColumnIndex: Math.max(cell1Col, cell2Col),
    startColumnIndex: Math.min(cell1Col, cell2Col),
  };
};

/**
 * 范围表达式转为IRange
 */
export const rangeExpressionTransformRange: (columnApi: ColumnApi, rangeValue: string) => null | IBaseActiveCell = (
  columnApi,
  rangeValue,
) => {
  const parseRangeInfo = parseRangeExpression(rangeValue);
  if (parseRangeInfo) {
    const { endColumnIndex, endRowIndex, startColumnIndex, startRowIndex } = parseRangeInfo;
    const allColumn = obtainColumnExcludeRowHeader(columnApi);
    const columns = allColumn.slice(startColumnIndex, endColumnIndex + 1);

    return {
      columns,
      endRowIndex,
      startRowIndex,
      columnKeys: columns.map((item) => item.getColDef()?.field || ''),
    };
  }
  return null;
};

/**
 * 负数的处理
 */
export const negativeFormat = (value: string | number, key: E_FORMAT_NEGATIVE) => {
  if (!isNumeric(`${value}`)) {
    return value;
  }
  switch (key) {
    case E_FORMAT_NEGATIVE.BRACKETS:
      return `(${value})`;
    case E_FORMAT_NEGATIVE.MINUS:
      return `-${value}`;
    default:
      return value;
  }
};
