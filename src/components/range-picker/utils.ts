import { chunk } from 'lodash';
import dayjs from 'dayjs';
import {
  DateObj,
  OptionsType,
  DayDate,
  YearDate,
  MonthDate,
  DateTime,
  ActiveOptions,
  SingleRangeTimeOption,
  RangeTimeOption,
  RangeValue,
  SingleRangeValue,
} from './type';
import {
  useRangeGlobalConfig,
  MODE_MAP,
  TIME_INPUT_FORMAT_MAP,
  INPUT_FORMAT_MAP,
  DAYJS_UNIT_MAP,
  YOY_COMPARE_TYPE,
  MOM_REGEX,
  DYNAMIC_REGEX,
  NDAY_REGEX,
  MONTH_DYNAMIC_REGEX,
  MONTH_NDAY_REGEX,
  SINGLE_MONTH_DYNAMIC_REGEX,
  SINGLE_DYNAMIC_REGEX,
  SINGLE_TIME_DYNAMIC_REGEX,
  TIME_DYNAMIC_REGEX,
  TIME_NDAY_REGEX,
  TIME_DYNAMIC_FORMAT_MAP,
  NDAY,
  FIXEDDAY,
  TIME_FIXEDDAY_REGEX,
  MONTH_FIXEDDAY_REGEX,
  FIXEDDAY_REGEX,
} from './constants';
import { getIsoWeek, getIsoWeekInYear, getStartEndTime, setIsoWeek } from './week';

export { getIsoWeek };

/**
 * next Month
 * @param { Date } date
 * @returns {Date}
 */
export const nextMonth = (date: Date) => {
  const isPassYear = date.getMonth() === 11;
  const newMonth = isPassYear ? 0 : date.getMonth() + 1;
  const year = isPassYear ? date.getFullYear() + 1 : date.getFullYear();
  return new Date(year, newMonth, 1);
};

/**
 * prev Month
 * @param {Date} date
 * @returns {Date}
 */
export const prevMonth = (date: Date) => {
  const passYear = date.getMonth() === 0;
  const newMonth = passYear ? 11 : date.getMonth() - 1;
  const year = passYear ? date.getFullYear() - 1 : date.getFullYear();
  return new Date(year, newMonth, 1);
};

/**
 * To Dashed from Camel Case
 * @param {String} strCamelCase
 * @returns {string}
 * @example
 * toDash('strCamelCase') === 'str-camel-case'
 */
export function toDash(strCamelCase: string): string {
  return String(strCamelCase)
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
}

/**
 * 首字母大写
 * @param {String} str 目标字符串
 * @returns {String}
 */
export function firstUpperCase(str: string): string {
  if (!str) return str;
  return str[0].toUpperCase().concat(str.substring(1, str.length));
}

/**
 * 返回指定年、月的第一天日期
 * @param {Object} { year, month }
 * @returns {Date}
 */
function getFirstDayOfMonth({ year, month }: DateObj): Date {
  return new Date(year, month, 1);
}

/**
 * 返回指定年、月的天数
 * @param {Object} { year, month }
 * @returns {Number}
 */
function getDaysInMonth({ year, month }: DateObj): number {
  return new Date(year, month + 1, 0).getDate();
}

function isSameYear(date1: Date, date2: Date) {
  return date1.getFullYear() === date2.getFullYear();
}

function isSameMonth(date1: Date, date2: Date) {
  return isSameYear(date1, date2) && date1.getMonth() === date2.getMonth();
}

function isSameDate(date1: Date, date2: Date) {
  return isSameMonth(date1, date2) && date1.getDate() === date2.getDate();
}

function isSameHour(date1: Date, date2: Date) {
  return isSameDate(date1, date2) && date1.getHours() === date2.getHours();
}

function isSameMinute(date1: Date, date2: Date) {
  return isSameHour(date1, date2) && date1.getMinutes() === date2.getMinutes();
}

function isSameSecond(date1: Date, date2: Date) {
  return isSameMinute(date1, date2) && date1.getSeconds() === date2.getSeconds();
}

export function mergeDateTime(date: Date | dayjs.Dayjs, time: Date | dayjs.Dayjs | undefined): Date {
  const t1 = dayjs(date);
  const t2 = dayjs(time || dayjs().startOf('d').toDate());

  return t1.hour(t2.hour()).minute(t2.minute()).second(t2.second()).toDate();
}

export function isValidTimeSpan(date: Date[]) {
  const [start, end] = date;
  return start.getTime() <= end.getTime();
}

/**
 * 是否是某法范围内的日期，精确到日
 * @param {Date} value 目标日期
 * @param {Object} { start, end } 范围
 * @returns {Boolean}
 */
export function isBetween(
  value: { getFullYear: () => number; getMonth: () => number; getDate: () => number },
  { start, end }: { start: Date; end: Date },
  type: string,
): boolean {
  const date = new Date(value.getFullYear(), value.getMonth(), value.getDate());

  let startTime;
  let endTime;
  if (type === 'year') {
    startTime = new Date(start.getFullYear());
    endTime = new Date(end.getFullYear());
  } else if (type === 'month') {
    startTime = new Date(start.getFullYear(), start.getMonth());
    endTime = new Date(end.getFullYear(), end.getMonth());
  } else {
    startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  }

  return startTime <= date && endTime >= date;
}

/**
 * 比较两个日期对象的时间戳
 * @param {Date} date1 日期1
 * @param {Date} date2 日期2
 * @returns {Number} 返回 date1.getTime() - date2.getTime() 的差值
 */
function compareAsc(date1: { getTime: () => number }, date2: Date): number {
  const d1 = date1.getTime();
  const d2 = date2.getTime();

  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
}

/**
 * 比较两个 Date 是否是同一天 或则 同一月 或则 同一年
 * @param {Date} date1 比较的日期
 * @param {Date} date2 比较的日期
 * @param {String} type 比较类型，默认比较到『日』 date|month|year
 * @returns {Boolean}
 */
export function isSame(date1: Date, date2: Date, type = 'date'): boolean {
  const func = {
    isSameYear,
    isSameMonth,
    isSameDate,
    isSameH: isSameDate,
    isSameHm: isSameDate,
    isSameHms: isSameDate,
  };
  if (![...Object.values(MODE_MAP), 'year'].includes(type)) {
    console.error('类型错误');
    return isSameDate(date1, date2);
  }

  return dayjs(date1).isSame(dayjs(date2), type as dayjs.OpUnitType);
  // eslint-disable-next-line
  // @ts-ignore
  // return func[`isSame${firstUpperCase(type)}`](date1, date2);
}

export function outOfRanges(d: Date, min: Date, max: Date) {
  return (min && compareAsc(d, min) === -1) || (max && compareAsc(d, max) === 1);
}

/**
 * @returns {Date} 当天零点的日期对象
 */
export function getToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
}

/**
 * @returns {Date} 当天23点的日期对象
 */
export function getTodayEnd(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
}

/**
 * 返回日期对象的年、月、日、小时、分钟、秒、12小时制标识
 * @param {Date} date
 * @returns {Object}
 */
export function getDateObj(date: Date) {
  let tempDate = date;
  if (!(date instanceof Date)) {
    tempDate = getToday();
  }
  return {
    year: tempDate.getFullYear(),
    month: tempDate.getMonth(),
    date: tempDate.getDate(),
    hours: tempDate.getHours(),
    minutes: tempDate.getMinutes(),
    seconds: tempDate.getSeconds(),
    meridiem: tempDate.getHours() > 11 ? 'PM' : 'AM',
  };
}

/**
 * 设置日期对象的时间部分
 * @param {Date} d 日期
 * @param {Number} hour 小时
 * @param {Number} min 分钟
 * @param {Number} sec 秒
 * @returns {Date} 一个新的date
 */
export function setDateTime(d: Date, hour: number, min: number, sec: number): Date {
  // eslint-disable-next-line
  const { year, month, date } = getDateObj(d);
  return new Date(year, month, date, hour, min, sec, 0);
}

/**
 * 增加月份
 * @param {Date} date 起始日期
 * @param {Number} num 月份数
 * @returns {Date}
 */
export function subtractMonth(date: Date, num: number): Date {
  const day = date.getDate();
  const newDate = new Date(date);

  let NUM = num;
  // eslint-disable-next-line no-plusplus
  while (NUM--) {
    newDate.setDate(0);
  }
  newDate.setDate(day);
  return newDate;
}

/**
 * 减月份
 * @param {Date} date 起始日期
 * @param {Number} num 月份数
 * @returns {Date}
 */
export function addMonth(date: Date, num: number): Date {
  let NUM = num;
  if (NUM < 0) {
    NUM = 0;
  }
  const newDate = new Date(date);
  return dayjs(newDate)
    .set('month', date.getMonth() + NUM)
    .toDate();
}

function getOffsetToday(timeOffset = 0) {
  return dayjs().add(timeOffset, 'h').startOf('d').toDate();
}

export function getWeeks(
  { year, month }: { year: number; month: number },
  { firstDayOfWeek = 1, disableDate, timeOffset, showWeekOfYear = false }: OptionsType,
) {
  const prependDay = getFirstDayOfMonth({ year, month });

  const maxDays = getDaysInMonth({ year, month });

  const daysArr: DayDate[] = [];

  const today = getOffsetToday(timeOffset);

  for (let i = 1; i <= maxDays; i += 1) {
    const currentDay = new Date(year, month, i);

    daysArr.push({
      text: i,
      active: false,
      value: currentDay,
      now: isSame(today, currentDay),
      firstDayOfMonth: i === 1,
      lastDayOfMonth: i === maxDays,
      type: 'current-month',
      disabled: disableDate ? disableDate(currentDay) : false,
    });
  }

  if (prependDay.getDay() !== firstDayOfWeek) {
    prependDay.setDate(0); // 上一月

    const getDay = prependDay.getDay();
    if (isNaN(getDay)) {
      console.error('时间异常');
      return [];
    }

    while (prependDay.getDay() !== Math.abs(firstDayOfWeek + 6) % 7) {
      daysArr.unshift({
        text: '',
        active: false,
        value: new Date(prependDay),
        additional: true, // 非当前月
        type: 'prev-month',
        disabled: disableDate ? disableDate(prependDay) : false,
      });
      prependDay.setDate(prependDay.getDate() - 1);
    }
  }

  const dataList = chunk(daysArr, 7);

  if (showWeekOfYear) {
    dataList.forEach((d) => {
      d.unshift({
        ...d[0],
        active: false,
        value: d[0].value,
        now: false,
        text: getIsoWeek(getStartEndTime('start', d[0].value, 'isoWeek', firstDayOfWeek), firstDayOfWeek),
        isWeekNum: true,
      });
    });
  }

  return dataList;
}

export function getYears(year: number, { timeOffset }: OptionsType) {
  const startYear = parseInt((year / 10).toString(), 10) * 10;
  const endYear = startYear + 9;

  const yearArr: YearDate[] = [];

  const today = getOffsetToday(timeOffset);

  for (let i = startYear; i <= endYear; i += 1) {
    const date = new Date(i, 1);

    yearArr.push({
      value: date,
      now: isSame(date, today, 'year'),
      active: false,
      text: `${date.getFullYear()}`,
    });
  }

  return chunk(yearArr, 4);
}

export function getMonths(year: number, { disableDate, timeOffset, monthLocal }: OptionsType) {
  const MONTH_ARR: MonthDate[] = [];

  const today = getOffsetToday(timeOffset);

  for (let i = 0; i <= 11; i += 1) {
    const date = new Date(year, i);

    MONTH_ARR.push({
      value: date,
      now: isSame(date, today, 'month'),
      active: false,
      // text: `${date.getMonth() + 1}月`,
      text: monthLocal?.[date.getMonth()] || '',
      disabled: disableDate ? disableDate(date) : false,
    });
  }

  return chunk(MONTH_ARR, 4);
}

// 非纯函数
export function flagActive(data: (DayDate | MonthDate | YearDate)[][], { ...args }: ActiveOptions): DateTime[][] {
  let { start, end, type = 'date', mouseValue, activeTimeIndex, isSingleDate, firstDayOfWeek, realType } = args;

  if (mouseValue && !isSingleDate) {
    if (!start || activeTimeIndex === 0) {
      start = mouseValue;
      if (realType === 'week') {
        start = getStartEndTime('start', mouseValue, 'isoWeek', firstDayOfWeek).toDate();
      }
    }
    if (!end || activeTimeIndex === 1) {
      end = mouseValue;
      if (realType === 'week') {
        end = getStartEndTime('end', mouseValue, 'isoWeek', firstDayOfWeek).startOf('d').toDate();
      }
    }
  }

  if (start && end) {
    if (end.getTime() < start.getTime()) {
      [start, end] = [end, start];
    }
  }

  return data.map((row) =>
    row.map((item) => {
      const ITEM = item as DateTime;
      const date = item.value;

      if (!end) {
        ITEM.active = start ? isSame(item.value, start, type) : false;
      } else {
        const isStart = start ? isSame(start, date, type) : false;
        const isEnd = end ? isSame(end, date, type) : false;

        ITEM.active = isStart || isEnd;

        ITEM.highlight = start && end ? isBetween(date, { start, end }, type) : false;

        ITEM.startOfRange = isStart;
        ITEM.endOfRange = isEnd;
      }

      return ITEM;
    }),
  );
}

export function getDisplayNoneSize(el: HTMLElement) {
  const cloneNode = el.cloneNode(true) as HTMLElement;

  cloneNode.style.position = 'absolute';
  cloneNode.style.left = '-9999px';
  cloneNode.style.visibility = 'none';
  document.body.appendChild(cloneNode);
  const { width, height } = cloneNode.getBoundingClientRect();
  document.body.removeChild(cloneNode);

  return {
    width,
    height,
  };
}

export function clearDateSlant(str: string) {
  return str.replace(/\D/g, '');
}

export function isTimeType(mode = '') {
  return [MODE_MAP.H, MODE_MAP.Hm, MODE_MAP.Hms].includes(mode);
}

export function isValidDateTime(str: string, mode: string) {
  return isTimeType(mode) && dayjs(str, TIME_INPUT_FORMAT_MAP[mode], true).isValid();
}

export function isValidDate(dateStr: string, mode: string, firstDayOfWeek = 1, weekAbbreviation = '') {
  if (mode !== 'week') {
    return dayjs(dateStr, INPUT_FORMAT_MAP[mode] || 'YYYY-MM-DD', true).isValid();
  }

  const dateRegex = new RegExp(`^([12]\\d{3})-(0[1-9]|[1-4][0-9]|5[0-3])${weekAbbreviation}$`);

  if (!dateRegex.test(dateStr)) {
    return false;
  }

  const matchItem = dateStr.match(dateRegex);
  const year = Number(matchItem![1]);
  const week = Number(matchItem![2]);

  if (getIsoWeekInYear(dayjs().year(year), firstDayOfWeek) < week) {
    return false;
  }

  return true;
  // const dateRegex =
  //   mode === 'date' || mode === 'week'
  //     ? /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/
  //     : /^([12]\d{3}-(0[1-9]|1[0-2]))$/;
  // const matchItem = dateStr.match(dateRegex);
  // if (matchItem === null) {
  //   return false;
  // }

  // const cleanDateStr = clearDateSlant(dateStr);

  // const year = parseInt(cleanDateStr.substring(0, 4), 10);
  // const month = parseInt(cleanDateStr.substring(4, 6), 10);
  // const day = parseInt(cleanDateStr.substring(6, 8), 10);

  // const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
  //   daysInMonth[1] = 29;
  // }

  // if (month < 1 || month > 12) {
  //   return false;
  // }

  // if ((mode === 'date' || mode === 'week') && (day < 1 || day > daysInMonth[month - 1])) {
  //   return false;
  // }

  // return true;
}

export const getSingleOptionTime = (option: SingleRangeTimeOption) => {
  if (option.time instanceof Function) {
    const result = option.time();
    if (Array.isArray(result)) {
      return result[0];
    }
    return result;
  }
  if (Array.isArray(option.time)) {
    return option.time[0];
  }
  return option.time;
};

// 解析时间选择中d-1:HHmmss的HHmmss部分
export const parseTimeString = (str: string): number[] => {
  return chunk(str.split(':')[1].split(''), 2).map((t) => Number(t.join('')));
};

export const getDynamicRegex = (mode: string, isSingle = false) => {
  let regPattern = isSingle ? SINGLE_DYNAMIC_REGEX : DYNAMIC_REGEX;
  let ndayRegPattern = NDAY_REGEX;

  if ([MODE_MAP.H, MODE_MAP.Hm, MODE_MAP.Hms].includes(mode)) {
    regPattern = isSingle ? SINGLE_TIME_DYNAMIC_REGEX : TIME_DYNAMIC_REGEX
    ndayRegPattern = TIME_NDAY_REGEX
  }

  return {
    regPattern,
    ndayRegPattern,
  };
};

export const getFixedDayRegex = (mode: string) => {
  switch (mode) {
    case MODE_MAP.MONTH:
      return MONTH_FIXEDDAY_REGEX;
    case MODE_MAP.DATE:
    case MODE_MAP.WEEK:
      return FIXEDDAY_REGEX;
    case MODE_MAP.H:
    case MODE_MAP.Hm:
    case MODE_MAP.Hms:
      return TIME_FIXEDDAY_REGEX;
    default:
      return '';
  }
};

export const getDynamicActive = (
  type: string,
  mode: string,
  isSingle: boolean,
) => {
  const { regPattern } = getDynamicRegex(mode, isSingle);
  return type?.match(regPattern)
};

export function getDayjsIosType(mode: string) {
  const isPickerType = isTimeType(mode);
  let dayjsType: 'isoWeek' | 'd' | 'M' = 'M';

  if (isPickerType || mode === MODE_MAP.DATE) {
    dayjsType = 'd';
  } else if (mode === MODE_MAP.WEEK) {
    dayjsType = 'isoWeek';
  }
  return dayjsType;
}

export function getDayjsType(mode: string) {
  const isPickerType = isTimeType(mode);
  let dayjsType: 'w' | 'd' | 'M' = 'M';

  if (isPickerType || mode === MODE_MAP.DATE) {
    dayjsType = 'd';
  } else if (mode === MODE_MAP.WEEK) {
    dayjsType = 'w';
  }
  return dayjsType;
}

const formatWeekYear = (date: Date, firstDayOfWeek: number) => {
  let year = dayjs(date).year();
  const week = getIsoWeek(date, firstDayOfWeek);

  // 如果日期是1月1日至1月3日并且属于上一年的最后一周
  if (dayjs(date).month() === 0 && dayjs(date).date() <= 3 && week > 51) {
    year -= 1;
  }

  // 如果日期是12月29日至12月31日并且属于下一年的第一周
  if (dayjs(date).month() === 11 && dayjs(date).date() >= 29 && week === 1) {
    year += 1;
  }

  return {
    year,
    week,
  };
};

export const formatWeekDate = (date: Date, firstDayOfWeek: number, weekAbbreviation = '') => {
  const { week, year } = formatWeekYear(date, firstDayOfWeek);

  return `${year}-${week < 10 ? `0${week}` : week}${weekAbbreviation}`;
};

export function parseMatchItem(type: string, mode = 'date', isSingle = false, timeOffset = 0, firstDayOfWeek = 1) {
  const isPickerType = isTimeType(mode);
  const { regPattern, ndayRegPattern } = getDynamicRegex(mode, isSingle);

  const dayjsIosType = getDayjsIosType(mode);

  let formatType = [MODE_MAP.DATE, MODE_MAP.WEEK].includes(mode) ? 'YYYYMMDD' : 'YYYYMM';
  if (isPickerType) {
    formatType = 'YYYYMMDDHHmmss';
  }

  const matchItem = type.match(regPattern);
  if (matchItem) {
    const left = matchItem[1];
    const right = matchItem[2];

    let leftTime;
    const leftNMatch = left.match(ndayRegPattern);
    if (leftNMatch) {
      const nValue = isPickerType ? +leftNMatch[2].split(':')[0] : +leftNMatch[2];
      const dynamicMode = leftNMatch[1] as dayjs.ManipulateType;

      if (isPickerType) {
        const timeArr = parseTimeString(leftNMatch[2]);
        leftTime = dayjs()
          .add(timeOffset, 'h')
          .add(nValue, dynamicMode)
          .hour(timeArr[0])
          .minute(timeArr[1])
          .second(timeArr[2])
          .toDate();
      } else {
        leftTime = getStartEndTime(
          'start',
          dayjs().add(timeOffset, 'h').add(nValue, dynamicMode),
          dayjsIosType,
          firstDayOfWeek,
        ).toDate();
      }
    } else {
      const leftDayjs = dayjs(left, formatType);
      if (isPickerType) {
        leftTime = leftDayjs.toDate();
      } else {
        leftTime = getStartEndTime('start', leftDayjs, dayjsIosType, firstDayOfWeek).toDate();
      }
    }

    if (isSingle) {
      return leftTime;
    }

    let rightTime;
    const rightNMatch = right.match(ndayRegPattern);
    if (rightNMatch) {
      const nValue = isPickerType ? +rightNMatch[2].split(':')[0] : +rightNMatch[2];
      const dynamicMode = rightNMatch[1] as dayjs.ManipulateType;
      if (isPickerType) {
        const timeArr = parseTimeString(rightNMatch[2]);
        rightTime = dayjs()
          .add(timeOffset, 'h')
          .add(nValue, dynamicMode)
          .hour(timeArr[0])
          .minute(timeArr[1])
          .second(timeArr[2])
          .toDate();
      } else {
        rightTime = getStartEndTime(
          'end',
          dayjs().add(timeOffset, 'h').add(nValue, dynamicMode),
          dayjsIosType,
          firstDayOfWeek,
        ).toDate();
      }
    } else {
      const rightDayjs = dayjs(right, formatType);
      if (isPickerType) {
        rightTime = rightDayjs.toDate();
      } else {
        rightTime = getStartEndTime('end', rightDayjs, dayjsIosType, firstDayOfWeek).toDate();
      }
    }

    return [leftTime, rightTime];
  }

  return isSingle ? null : [];
}

export const getPickerTime = (
  type: string,
  mode = 'date',
  isSingle = false,
  timeOffset = 0,
  firstDayOfWeek = 1,
  locale = 'zh-cn',
) => {
  const CONST = useRangeGlobalConfig({ timeOffset, firstDayOfWeek, locale });
  const rangeTime = isSingle ? CONST.SINGLE_RANGE_TIME : CONST.RANGE_TIME;

  const findItem = rangeTime(timeOffset, firstDayOfWeek)
    .filter((item) => !item.mode || item.mode === mode)
    .find((item) => item.type === type);

  if (findItem) {
    if (isSingle) {
      return getSingleOptionTime(findItem);
    }
    return findItem.time instanceof Function ? findItem.time() : findItem.time;
  }

  return parseMatchItem(type, mode, isSingle, timeOffset, firstDayOfWeek);
};

export const isRelativeType = (type: string) => {
  return type === YOY_COMPARE_TYPE || MOM_REGEX.test(type);
};

export const getRelativeTime = (
  type: string,
  time: Date[] | Date,
  mode = 'date',
  isSingle = false,
  firstDayOfWeek = 1,
): Date[] | Date => {
  const dayjsIosType = DAYJS_UNIT_MAP[mode] || 'M';
  const dayjsType = getDayjsType(mode);

  if (MOM_REGEX.test(type)) {
    const match = type.match(MOM_REGEX);
    const matchNum = match?.[2] ? Number(match[2]) : null
    const momMode = match?.[3] as dayjs.ManipulateType

    if (isSingle) {
      return getStartEndTime(
        'start',
        dayjs(time as Date).add(matchNum ?? -1, momMode || dayjsType),
        dayjsIosType,
        firstDayOfWeek,
      ).toDate();
    }

    let diff = dayjs((time as Date[])[1]).diff(dayjs((time as Date[])[0]), dayjsType);

    if (mode === 'week') {
      const WEEKDAY = 7;
      diff = Math.floor(dayjs((time as Date[])[1]).diff(dayjs((time as Date[])[0]), 'd') / WEEKDAY);
    }

    return [
      getStartEndTime(
        'start',
        dayjs((time as Date[])[0]).add(matchNum ?? -1 - diff, momMode || dayjsType),
        dayjsIosType,
        firstDayOfWeek,
      ).toDate(),
      getStartEndTime(
        'end',
        dayjs((time as Date[])[1]).add(matchNum ?? -1 - diff, momMode || dayjsType),
        dayjsIosType,
        firstDayOfWeek,
      ).toDate(),
    ];
  }

  if (type === YOY_COMPARE_TYPE) {
    if (isSingle) {
      if (mode === 'week') {
        const week = getIsoWeek(dayjs(time as Date), firstDayOfWeek);
        return getStartEndTime(
          'start',
          setIsoWeek(dayjs(time as Date).add(-1, 'y'), week, firstDayOfWeek),
          dayjsIosType,
          firstDayOfWeek,
        ).toDate();
      }

      return dayjs(time as Date)
        .add(-1, 'y')
        .startOf(dayjsIosType)
        .toDate();
    }

    if (mode === 'week') {
      const weekYear = [
        formatWeekYear((time as Date[])[0], firstDayOfWeek),
        formatWeekYear((time as Date[])[1], firstDayOfWeek),
      ];

      const isoWeeksInYear = [
        getIsoWeekInYear(dayjs().year(weekYear[0].year - 1), firstDayOfWeek),
        getIsoWeekInYear(dayjs().year(weekYear[1].year - 1), firstDayOfWeek),
      ];

      return [
        getStartEndTime(
          'start',
          setIsoWeek(dayjs().year(weekYear[0].year - 1), Math.min(weekYear[0].week, isoWeeksInYear[0]), firstDayOfWeek),
          dayjsIosType,
          firstDayOfWeek,
        ).toDate(),
        getStartEndTime(
          'end',
          setIsoWeek(
            dayjs((time as Date[])[1]).year(weekYear[1].year - 1),
            Math.min(weekYear[1].week, isoWeeksInYear[1]),
            firstDayOfWeek,
          ),
          dayjsIosType,
          firstDayOfWeek,
        ).toDate(),
      ];
    }

    return [
      dayjs((time as Date[])[0])
        .add(-1, 'y')
        .startOf(dayjsIosType)
        .toDate(),
      dayjs((time as Date[])[1])
        .add(-1, 'y')
        .endOf(dayjsIosType)
        .toDate(),
    ];
  }

  return [];
};

export const getPickerCompareTime = (
  type: string,
  time: Date[] | Date,
  mode = 'date',
  isSingle = false,
  timeOffset = 0,
  firstDayOfWeek = 1,
  locale = 'zh-cn',
) => {
  const CONST = useRangeGlobalConfig({ timeOffset, firstDayOfWeek, locale });
  const findItem = CONST.RANGE_COMPARE_TIME.find((item) => {
    return item.type === type || (item.regex && item.regex.test(type));
  });

  if (isSingle && !time) {
    return null;
  }

  if (!isSingle && (time as Date[])?.filter((item) => !!item).length !== 2) {
    return [];
  }

  if (findItem) {
    return getRelativeTime(type, time, mode, isSingle, firstDayOfWeek);
  }

  return parseMatchItem(type, mode, isSingle, timeOffset, firstDayOfWeek);
};

export const getDynamicTimeType = (
  direction: string,
  dynamicType: string,
  timeType: string,
  time: (Date | undefined)[],
  mode = 'date',
  timeOffset = 0,
  firstDayOfWeek = 1,
) => {
  const isTimePickerType = isTimeType(mode);

  const dayjsIosType = getDayjsIosType(mode);
  const dayjsType = getDayjsType(mode);

  const formatType = TIME_DYNAMIC_FORMAT_MAP[mode] || 'YYYYMM';

  const type = timeType.split('~');
  let [start, end] = time;
  if (!start) {
    start = getStartEndTime('start', dayjs().add(timeOffset, 'h'), dayjsIosType, firstDayOfWeek).toDate();
  }
  if (!end) {
    end = getStartEndTime('end', dayjs().add(timeOffset, 'h'), dayjsIosType, firstDayOfWeek).toDate();
  }

  if (dynamicType === FIXEDDAY) {
    if (direction === 'left') {
      type[0] = dayjs(start).format(formatType);
    } else {
      type[1] = dayjs(end).format(formatType);
    }
  } else if (dynamicType === NDAY) {
    // 当左侧已选中「N天前」，右侧直接跳转至「N天前」 且「具体时间」置灰不可点
    if (direction === 'left') {
      const diffLeft = getStartEndTime('start', dayjs().add(timeOffset, 'h'), dayjsIosType, firstDayOfWeek).diff(
        getStartEndTime('start', start, dayjsIosType, firstDayOfWeek),
        dayjsType,
      );
      type[0] = `${dayjsType}${diffLeft >= 0 ? '-' : '+'}${Math.abs(diffLeft)}`;

      const diffRight = getStartEndTime('end', dayjs().add(timeOffset, 'h'), dayjsIosType, firstDayOfWeek).diff(
        getStartEndTime('end', end, dayjsIosType, firstDayOfWeek),
        dayjsType,
      );
      type[1] = `${dayjsType}${diffRight >= 0 ? '-' : '+'}${Math.abs(diffRight)}`;

      if (isTimePickerType) {
        type[0] = `${type[0]}:${dayjs(start).startOf(DAYJS_UNIT_MAP[mode]).format('HHmmss')}`;
        type[1] = `${type[1]}:${dayjs(end).endOf(DAYJS_UNIT_MAP[mode]).format('HHmmss')}`;
      }
    } else {
      const diff = getStartEndTime('end', dayjs().add(timeOffset, 'h'), dayjsIosType, firstDayOfWeek).diff(
        getStartEndTime('end', end, dayjsIosType, firstDayOfWeek),
        dayjsType,
      );
      type[1] = `${dayjsType}${diff >= 0 ? '-' : '+'}${Math.abs(diff)}`;
      if (isTimePickerType) {
        type[1] = `${type[1]}:${dayjs(end).startOf(DAYJS_UNIT_MAP[mode]).format('HHmmss')}`;
      }
    }
  }
  return type;
};

export const replaceDynamicTimeType = (
  direction: string,
  timeType: string,
  time: Date,
  mode = 'Hms',
) => {
  const dayType = timeType.split(':')[0]
  let hmsType: string;
  if (direction === 'left') {
    hmsType = dayjs(time).startOf(DAYJS_UNIT_MAP[mode]).format('HHmmss')
  } else {
    hmsType = dayjs(time).endOf(DAYJS_UNIT_MAP[mode]).format('HHmmss')
  }
  return `${dayType}:${hmsType}`
}

export const getFixedNumber = (n: number, digits: number): number => {
  return Number(n.toFixed(digits));
};

export const formatWeekStrToTime = (value: string, firstDayOfWeek = 1, weekAbbreviation = '') => {
  const dateRegex = new RegExp(`^([12]\\d{3})-(0[1-9]|[1-4][0-9]|5[0-3])${weekAbbreviation}$`);
  const matchItem = value.match(dateRegex);
  if (!matchItem) {
    return dayjs();
  }

  return setIsoWeek(dayjs().year(Number(matchItem[1])), Number(matchItem[2]), firstDayOfWeek);
};

export const getInputTextTime = (value: string[], mode: string, firstDayOfWeek = 1, weekAbbreviation = '') => {
  const isTimePickerType = isTimeType(mode);

  const dayjsType = DAYJS_UNIT_MAP[mode] || 'd';
  const formatType = INPUT_FORMAT_MAP[mode] || 'YYYY-MM-DD';

  if (isTimePickerType) {
    return [
      value[0] ? dayjs(value[0], TIME_INPUT_FORMAT_MAP[mode]).toDate() : undefined,
      value[1] ? dayjs(value[1], TIME_INPUT_FORMAT_MAP[mode]).toDate() : undefined,
    ];
  }

  if (mode === 'week') {
    return [
      value[0]
        ? getStartEndTime(
            'start',
            formatWeekStrToTime(value[0], firstDayOfWeek, weekAbbreviation),
            dayjsType,
            firstDayOfWeek,
          ).toDate()
        : undefined,
      value[1]
        ? getStartEndTime(
            'end',
            formatWeekStrToTime(value[1], firstDayOfWeek, weekAbbreviation),
            dayjsType,
            firstDayOfWeek,
          ).toDate()
        : undefined,
    ];
  }

  return [
    value[0] ? dayjs(value[0], formatType).startOf(dayjsType).toDate() : undefined,
    value[1] ? dayjs(value[1], formatType).endOf(dayjsType).toDate() : undefined,
  ];
};

export const detectIsSafari = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

export const getTypeTitle = (
  type = '',
  mode = 'date',
  isSingle = false,
  rangeTimeOptions: RangeTimeOption[] = [],
  locale = 'zh-cn',
) => {
  const CONST = useRangeGlobalConfig({ locale });
  const constTime = isSingle ? CONST.STATIC_SINGLE_RANGE_TIME : CONST.STATIC_RANGE_TIME;
  const options = constTime.concat(rangeTimeOptions);

  const findItem = options.filter((item) => !item.mode || item.mode === mode).find((item) => item.type === type);
  if (findItem) {
    return findItem.title;
  }

  return '';
};

export const getMomTitle = (type: string, title: string, locale = 'zh-cn') => {
  const CONST = useRangeGlobalConfig({ locale });
  const matchMom = type.match(MOM_REGEX)
  if (matchMom?.[1]) {
    const num = Number(matchMom[2]) * -1
    const mode = matchMom[3] as keyof typeof CONST.DYNAMIC_AGO_LABEL
    return `${num}${CONST.DYNAMIC_AGO_LABEL[mode]}`
  }
  return title
}

export const getCompareTypeTitle = (
  type: string,
  options: RangeTimeOption[] | SingleRangeTimeOption[],
  mode: string,
  isSingle: boolean,
  locale = 'zh-cn'
) => {
  const CONST = useRangeGlobalConfig({ locale });
  const constTime = isSingle ? CONST.STATIC_SINGLE_RANGE_TIME : CONST.STATIC_RANGE_TIME

  const allOptions = constTime.concat(options as any, CONST.RANGE_COMPARE_TIME).filter((item) => !item.mode || item.mode === mode)

  const findItem = allOptions.find((item) => item.type === type || (item.regex && item.regex.test(type)));
  if (findItem) {
    return getMomTitle(type, findItem.title, locale)
  } else if (getDynamicActive(type, mode, isSingle)) {
    return CONST.globalConfig.dynamicTimeLabel
  }

  return CONST.globalConfig.customTimeLabel
}

export const getTimeText = (
  time: Date[] | Date,
  mode: string,
  isSingle = false,
  firstDayOfWeek = 1,
  locale = 'zh-cn',
) => {
  const CONST = useRangeGlobalConfig({ locale });

  let formatType;
  if (isTimeType(mode)) {
    formatType = TIME_INPUT_FORMAT_MAP[mode];
  } else {
    formatType = mode === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM';
  }
  if (isSingle) {
    if (mode === 'week') {
      return time ? formatWeekDate(time as Date, firstDayOfWeek, CONST.globalConfig.weekAbbreviation) : '';
    }
    return time ? dayjs(time as Date).format(formatType) : '';
  }

  if (Array.isArray(time) && time.length > 0) {
    if (mode === 'week') {
      return [
        time[0] ? formatWeekDate(time[0], firstDayOfWeek, CONST.globalConfig.weekAbbreviation) : '',
        time[1] ? formatWeekDate(time[1], firstDayOfWeek, CONST.globalConfig.weekAbbreviation) : '',
      ];
    }
    return [time[0] ? dayjs(time[0]).format(formatType) : '', time[1] ? dayjs(time[1]).format(formatType) : ''];
  }

  return [];
};

// 用于 index.ts 导出 pickerUtils
export { getStartEndTime };
