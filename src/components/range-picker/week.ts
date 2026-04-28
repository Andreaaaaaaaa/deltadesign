import dayjs, { Dayjs } from 'dayjs';

// 获取周范围
export const getWeekRange = (date: Date | undefined, firstDayOfWeek = 1) => {
  const rDate = date || new Date();

  // 计算当前日期距离周开始的天数
  const daysFromStartOfWeek = (rDate.getDay() - firstDayOfWeek + 7) % 7;

  // 计算周开始时间
  const start = new Date(rDate);
  start.setDate(rDate.getDate() - daysFromStartOfWeek);
  start.setHours(0, 0, 0);

  // 计算周结束时间
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59);

  return [start, end];
};

export const getStartEndTime = (
  type: 'start' | 'end',
  date: Date | undefined | Dayjs,
  dayjsType: string,
  firstDayOfWeek = 1,
) => {
  let timeDayjs: Dayjs;

  if (dayjs.isDayjs(date)) {
    timeDayjs = date;
  } else {
    timeDayjs = dayjs(date);
  }

  if (dayjsType === 'isoWeek') {
    const weekRange = getWeekRange(timeDayjs.toDate(), firstDayOfWeek);
    const index = type === 'start' ? 0 : 1;
    return dayjs(weekRange[index]);
  }

  const startEndKey = type === 'start' ? 'startOf' : 'endOf';
  return timeDayjs[startEndKey](dayjsType as any);
};

// 获取当前处于第几周
export const getIsoWeek = (date: Date | undefined | Dayjs, firstDayOfWeek: number) => {
  let rDate: Date;

  if (dayjs.isDayjs(date)) {
    rDate = date.toDate();
  } else {
    rDate = date || new Date();
  }

  // 计算 1 月 4 日所在的周的第一天
  const jan4 = new Date(rDate.getFullYear(), 0, 4);
  const jan4WeekStart = getStartEndTime('start', jan4, 'isoWeek', firstDayOfWeek);

  // 计算下一年 1 月 4 日所在的周的第一天
  const nextJan4 = new Date(rDate.getFullYear() + 1, 0, 4);
  const nextJan4WeekStart = getStartEndTime('start', nextJan4, 'isoWeek', firstDayOfWeek);

  // 计算给定日期所在周的第一天
  const weekStart = getStartEndTime('start', rDate, 'isoWeek', firstDayOfWeek);

  // 对于和 1 月 4 日同一周的特殊处理
  if (
    weekStart.toDate().getTime() === jan4WeekStart.toDate().getTime() ||
    weekStart.toDate().getTime() === nextJan4WeekStart.toDate().getTime()
  ) {
    return 1;
  }

  // 计算给定日期与 1 月 4 日所在周的第一天之间的天数
  const weekNumber =
    Math.floor((weekStart.toDate().getTime() - jan4WeekStart.toDate().getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;

  return weekNumber;
};

// 获取一年周数
export const getIsoWeekInYear = (date: Date | undefined | Dayjs, firstDayOfWeek: number) => {
  let rDate: Date;

  if (dayjs.isDayjs(date)) {
    rDate = date.toDate();
  } else {
    rDate = date || new Date();
  }

  // 计算 1 月 4 日所在的周的第一天
  const jan4 = new Date(rDate.getFullYear(), 0, 4);
  const jan4WeekStart = getStartEndTime('start', jan4, 'isoWeek', firstDayOfWeek);

  // 计算下一年 1 月 4 日所在的周的第一天
  const nextJan4 = new Date(rDate.getFullYear() + 1, 0, 4);
  const nextJan4WeekStart = getStartEndTime('start', nextJan4, 'isoWeek', firstDayOfWeek);

  return Math.floor(
    (nextJan4WeekStart.toDate().getTime() - jan4WeekStart.toDate().getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
};

// 设置周
export const setIsoWeek = (date: Date | undefined | Dayjs, week: number, firstDayOfWeek: number) => {
  let timeDayjs: Dayjs;

  if (dayjs.isDayjs(date)) {
    timeDayjs = date;
  } else {
    timeDayjs = dayjs(date);
  }

  const isoWeek = getIsoWeek(timeDayjs, firstDayOfWeek);

  return timeDayjs.add(week - isoWeek, 'w');
};
