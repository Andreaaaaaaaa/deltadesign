import lodash from 'lodash';
import { hexToRgb } from './format';
import { E_CONDITION_RULES_KEY } from '../enums';
import { ROWS_SEPARATOR, VALUE_SEPARATOR, DATA_BAR_COLORS, SCALE_PARTITION } from '../constant';

/**
 * 生成指定长度的随机字符串
 */
export const randomString = (length?: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < (length || 10); i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

/**
 * 生成剪切板内容
 */
export const generateClipboard = (rowData: Array<Array<any>>, isFilter?: boolean) => {
  const innerRowData = rowData.map((item) =>
    item.map((child) =>
      child
        ? {
            ...child,
            textContent:
              typeof child?.textContent === 'string' ? child.textContent.replace('\r', '') : child?.textContent,
          }
        : child,
    ),
  );
  const tableContent = innerRowData.reduce((tr, row) => {
    const td = row.reduce((acc, curVal) => {
      if (curVal) {
        let rowSpanning = '';
        let colSpanning = '';

        // 过滤的条件下，不合并单元格
        if (!isFilter) {
          if (curVal?.spanning?.column > 1) {
            colSpanning = `colspan="${curVal?.spanning?.column}"`;
          }
          if (curVal?.spanning?.row > 1) {
            rowSpanning = `rowspan="${curVal?.spanning?.row}"`;
          }
        }

        const style = Object.entries(curVal?.cellStyle || {}).reduce((styleAcc, curStyle) => {
          const [key, value] = curStyle;
          // eslint-disable-next-line no-param-reassign
          styleAcc += `${lodash.kebabCase(key)}: ${(value as string).toString().replace('px', 'pt')};`;
          return styleAcc;
        }, '');
        // eslint-disable-next-line no-param-reassign
        acc += `<td ${colSpanning} ${rowSpanning} style="${style}">${curVal?.textContent || ''}</td>`;
      }
      return acc;
    }, '');
    // eslint-disable-next-line no-param-reassign
    tr += `<tr>${td}</tr>`;
    return tr;
  }, '');

  const plain = innerRowData
    .map((row) => row.map((cell) => cell?.textContent || '').join(VALUE_SEPARATOR))
    .join(ROWS_SEPARATOR);
  const colDomMax = lodash.max(innerRowData.map((col) => col.length));

  const html = `
    <html xmlns:x="tencent">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <body>
        <table>
          ${new Array(colDomMax)
            .fill(0)
            .map(() => '<col />')
            .join('')}
          ${tableContent}
        </table>
      </body>
    </html>
  `;

  return {
    html,
    plain,
  };
};

/**
 * 根据条件格式生成颜色选项
 */
export const generateOptionByRulesType = (type: E_CONDITION_RULES_KEY) =>
  DATA_BAR_COLORS[type].map((color, index) => ({ label: color as Array<string>, value: String(index) }));

/**
 * 给定两个颜色，生成色阶
 */
export const generateColorScale = (color: { start: string; end: string }, quantity: number = SCALE_PARTITION) => {
  const { start, end } = color;
  // 将 hex 颜色值转换为 rgb 格式
  const startColor = hexToRgb(start);
  const endColor = hexToRgb(end);

  // 计算当前值在最大最小值中的位置
  const colorList = Array.from({ length: 10 }, (_, index) => {
    const weight = (index + 1) / quantity;

    // 线性插值公式
    const r = Math.max(0, (1 - weight) * startColor.r + weight * endColor.r);
    const g = Math.max(0, (1 - weight) * startColor.g + weight * endColor.g);
    const b = Math.max(0, (1 - weight) * startColor.b + weight * endColor.b);

    return `rgb(${r.toFixed(0)},${g.toFixed(0)},${b.toFixed(0)})`;
  });

  return colorList;
};
