import dayjs from 'dayjs';
import { numberFormater } from '@tencent/awcharts-shared-utils';
// 获取时间对应周几
export const getWeekName = (date: Date | string) => {
  if (!date) {
    return '';
  }
  const week = dayjs(date).day();
  let weekName = '';
  switch (String(week)) {
    case '0':
      weekName = '日';
      break;
    case '1':
      weekName = '一';
      break;
    case '2':
      weekName = '二';
      break;
    case '3':
      weekName = '三';
      break;
    case '4':
      weekName = '四';
      break;
    case '5':
      weekName = '五';
      break;
    case '6':
      weekName = '六';
      break;
    default:
      break;
  }
  return `(${weekName})`;
};

const getNumUnit = (num: number) => {
  const param = { value: NaN, unit: '' };
  const base = 10000;
  const sizes = ['', '万', '亿', '万亿'];

  if (num < base) {
    param.value = num;
    param.unit = '';
  } else {
    const i = Math.floor(Math.log(num) / Math.log(base));
    param.value = num / base ** i;
    param.unit = sizes[i];
  }
  return param;
};

// 设置数值千分位
export const formatNum = (num: string | undefined | number, isPercent = false) => {
  if (String(num) === '' || String(num) === '-' || num === undefined) {
    return { num: '-', unit: '' };
  }

  const { value, unit } = getNumUnit(num);
  // 统一保留两位小数
  const digit = 2;
  let format = '#,###';
  if (digit >= 1) {
    format += '.';
    for (let i = 0; i < digit; i += 1) {
      format += '#';
    }
  }
  if (isPercent) {
    format += '%';
  }
  // numberFormater函数保留两位小数会将末尾的0去除，所以这里加补全操作
  let formattedNum = numberFormater(value, format);
  const splittedNum = isPercent ? formattedNum.split('%')[0] : formattedNum;
  const first = splittedNum.split('.')[0];
  let second = splittedNum.split('.')[1] || '';
  if (second.length < 2) {
    const len0 = 2 - (second || '').length;
    for (let i = 0; i < len0; i += 1) {
      second += '0';
    }
  }
  const endSymbol = isPercent ? '%' : '';
  formattedNum = ([first, second].join('.') + endSymbol).replace(/\s*/g, '');
  return { num: formattedNum, unit };
};
