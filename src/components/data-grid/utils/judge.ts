import dayjs from 'dayjs';
import { GridApi } from 'ag-grid-community';
import { TContent } from '../types';
import { getRangeInfo, getRangeContent } from './obtain';
import {
  regexExcelRange,
  regexEqualStart,
  regexColumnIndexEnd,
  regexColumnIndexView,
  regexNumberPercentage,
} from '../regex';

/**
 * 正则判断公共函数
 */
export const regexTest = (str: string, regex: RegExp) => regex.test(str);

/**
 * 判断是否百分比
 */
export const isPercentage = (str: string) => regexTest(str, regexNumberPercentage);

/**
 * 判断是否等号开头
 */
export const isEqualStart = (str: string) => regexTest(str, regexEqualStart);

/**
 * 判断公式是否完整输入
 * 即数字或者)结尾
 */
export const isFormulaComplete = (str: string) => regexTest(str, regexColumnIndexEnd);

/**
 * 判断是否存在（字母 + 数字）的情况
 */
export const isIncludeColumnIndex = (str: string) => regexTest(str, regexColumnIndexView);

/**
 * 判断是否是字符串类型的数字
 */
export const isNumeric = (value: string) => !isNaN(Number(value)) && !isNaN(parseFloat(value));

/**
 * 判断是否为范围表示
 */
export const isValidRange = (str: string) => regexTest(str, regexExcelRange);

/**
 * 判断是否为可以处理的字符串类型
 */
export const isNumericOrPercent = (value: string) => isPercentage(value) || isNumeric(value);

/**
 * 判断是否合法的日期格式
 */
export const isDate = (str: string) => dayjs(str).isValid();

/**
 * 选中区域判断是否只包含单个单元格
 * 满足条件1或2
 * 1、看是否最大的合并单元格和选取区域行列相同
 * 2、单行 且 单列
 */
export const isSingleCell = (api: GridApi, content: TContent) => {
  const range = getRangeInfo(api);
  const { startRowIndex, endRowIndex, columnKeys } = range;
  if (startRowIndex === endRowIndex && columnKeys?.length === 1) {
    return true;
  }
  const rangeContent = getRangeContent(api, content, range);
  const maxSpanning = {
    column: 1,
    row: 1,
  };
  rangeContent.forEach((row) =>
    Object.values(row).forEach((cell) => {
      maxSpanning.row = Math.max(maxSpanning.row, cell?.spanning?.row || 1);
      maxSpanning.column = Math.max(maxSpanning.column, cell?.spanning?.column || 1);
    }),
  );

  return maxSpanning.column === columnKeys.length && maxSpanning.row === endRowIndex - startRowIndex + 1;
};

/**
 * 判断是否存在合并单元格的情况
 */
export const isSpanning = (api: GridApi, content: TContent) => {
  const range = getRangeInfo(api);
  const rangeContent = getRangeContent(api, content, range);
  return (rangeContent || []).some((row) =>
    Object.entries(row).some(
      ([_, cell]) =>
        (cell?.spanning?.row && cell?.spanning?.row > 1) || (cell?.spanning?.column && cell?.spanning?.column > 1),
    ),
  );
};
