import dayjs from 'dayjs';
import { day, isDate, isNumeric, isPercentage } from '../utils';
import { E_FORMAT_KEY, E_FORMAT_DATE, E_CURRENCY_KEY, E_FORMAT_NEGATIVE } from '../enums';
import { IValueFormatterNumber, IValueFormatterPercent, IValueFormatterCurrency, IValueFormatterDate } from '../types';

export const formattedText: Record<E_FORMAT_KEY, (value: string | number, params: any) => string | number> = {
  [E_FORMAT_KEY.DATE]: (value, params: IValueFormatterDate) => {
    if (!isDate(String(value))) {
      return value;
    }
    const { date } = params;
    const dayValue = day(value);
    const curYear = dayValue.year();
    const curWeek = dayValue.isoWeek();
    const curStart = dayValue.startOf('isoWeek');
    const curEnd = dayValue.endOf('isoWeek');
    const wednesday = dayValue.localeData().weekdaysShort()[dayValue.day()];
    switch (date) {
      case E_FORMAT_DATE.YYYY:
      case E_FORMAT_DATE.MM_DD:
      case E_FORMAT_DATE.YYYY_MM:
      case E_FORMAT_DATE.YYYY_MM_DD:
        return day(dayValue).format(date.replace(/_/g, '-'));

      case E_FORMAT_DATE.YYYY_MM_DD_WW:
        return `${dayValue.format('YYYY-MM-DD')}(${wednesday})`;
      case E_FORMAT_DATE.MM_DD_WW:
        return `${dayValue.format('MM-DD')}(${wednesday})`;

      // 按周
      case E_FORMAT_DATE.YYYY_MM_DD_YYYY_MM_DD:
        return `${curStart.format('YYYY-MM-DD')}至${curEnd.format('YYYY-MM-DD')}`;
      case E_FORMAT_DATE.MM_DD_MM_DD:
        return `${curStart.format('MM-DD')}至${curEnd.format('MM-DD')}`;
      case E_FORMAT_DATE.YYYY_WW:
        return `${curYear}-${curWeek.toString().padStart(2, '0')}周`;

      // 按季度
      case E_FORMAT_DATE.YYYY_Q:
        return `${curYear}-Q${dayValue.quarter()}`;
      default:
        return value;
    }
  },
  [E_FORMAT_KEY.UNSET]: (value) => value,
  [E_FORMAT_KEY.NUMBER]: (value, params: IValueFormatterNumber) => {
    if (!isNumeric(String(value))) {
      return value;
    }
    let innerValue = Math.abs(Number(value));
    const { decimal, negative, thousandths } = params;

    // 小数 & 千分位
    const formatter = new Intl.NumberFormat('en-US', {
      useGrouping: thousandths,
      minimumFractionDigits: decimal, // 最少保留两位小数
      maximumFractionDigits: decimal,
    });

    innerValue = formatter.format(innerValue) as any; // 可以不关注类型

    // 负数处理逻辑
    if (Number(value) < 0) {
      switch (negative) {
        case E_FORMAT_NEGATIVE.BRACKETS:
          return `(${innerValue})`;
        case E_FORMAT_NEGATIVE.MINUS:
        default:
          return `-${innerValue}`;
      }
    }

    return innerValue;
  },
  [E_FORMAT_KEY.PERCENT]: (value, params: IValueFormatterPercent) => {
    if (!isPercentage(String(value)) && !isNumeric(String(value))) {
      return value;
    }
    let innerValue = String(value);
    // 这两个判断不能调整顺序
    if (isNumeric(innerValue)) {
      innerValue = (parseFloat(innerValue) * 100).toFixed(params.decimal);
    }
    if (isPercentage(innerValue)) {
      innerValue = parseFloat(innerValue).toFixed(params.decimal);
    }
    return `${innerValue}%`;
  },
  [E_FORMAT_KEY.CURRENCY]: (value, config: IValueFormatterCurrency) => {
    if (!isNumeric(String(value))) {
      return value;
    }
    const { negative, sign, decimal } = config;
    let numberRes = formattedText[E_FORMAT_KEY.NUMBER](value, {
      decimal,
      thousandths: true,
      negative: E_FORMAT_NEGATIVE.MINUS,
    });

    if (Number(value) < 0 && negative === E_FORMAT_NEGATIVE.BRACKETS) {
      numberRes = `(${String(numberRes).replace('-', '')})`;
    }

    switch (sign) {
      case E_CURRENCY_KEY.CNY:
        numberRes = `¥${numberRes}`;
        break;
      case E_CURRENCY_KEY.EUR:
        numberRes = `${numberRes}€`;
        break;
      case E_CURRENCY_KEY.EUR2:
        numberRes = `€${numberRes}`;
        break;
      case E_CURRENCY_KEY.GBP:
        numberRes = `£${numberRes}`;
        break;
      case E_CURRENCY_KEY.HKD:
        numberRes = `HK${numberRes}`;
        break;
      case E_CURRENCY_KEY.USD:
        numberRes = `$${numberRes}`;
        break;
      default:
    }

    return numberRes;
  },
};
