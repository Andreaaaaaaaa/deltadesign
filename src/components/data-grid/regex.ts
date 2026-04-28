/**
 * 数字+百分比
 * 用于判断是否为百分比字符串
 */
export const regexNumberPercentage = /\d+%$|\d+\.\d+%$/;

/**
 * 等号开头
 * 用于判断是否公式逻辑
 */
export const regexEqualStart = /^=/;

/**
 * (字母 + 数字)结尾
 * 用于判断是否列的展示表达式例如A4,B5
 */
export const regexColumnIndexEnd = /([0-9]+\)*)$/;

/**
 * (字母 + 数字)组合
 * 用于提取列的展示表达式
 */
export const regexColumnIndexView = /[A-Z]+[0-9]+/gi;

/**
 * 分割字母和数字
 * 用于提取列的行和列
 */
export const regexSplitColumnIndex = /[A-Z]+|[0-9]+/g;

/**
 * 提取HTML table的内容
 */
export const regexExecTableInnerHTML = /<table[^>]*>([\s\S]*)<\/table>/i;

/**
 * 判断是否为范围表示
 */
export const regexExcelRange = /^([A-Z]+[1-9][0-9]*):([A-Z]+[1-9][0-9]*)$/;

/**
 * 单个单元格格式
 */
export const regexCell = /^([A-Z]+)([1-9][0-9]*)$/;
