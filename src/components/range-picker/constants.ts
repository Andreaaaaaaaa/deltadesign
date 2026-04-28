import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import isoWeek from 'dayjs/plugin/isoWeek';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';

import { mergeObject } from '@tencent/awcharts-shared-utils';
import { useConfig } from 'tdesign-vue-next/esm/hooks';
import { RangeTimeOption, SingleRangeTimeOption, PickerTypeString } from './type';

import { getStartEndTime } from './week';

import localeKo from './locale-ko';
import localeCn from './locale-cn';
import localeEn from './locale-en';

type LocaleJSON = typeof localeCn;
interface LocaleConfig {
  ko: LocaleJSON;
  'zh-cn': LocaleJSON;
  en: LocaleJSON;
}

const BASE_LOCALE = 'zh-cn';

const localeConfig: LocaleConfig = {
  ko: localeKo,
  'zh-cn': localeCn,
  en: localeEn,
};

if (dayjs.Ls?.ko) {
  dayjs.Ls.ko.weekStart = 0;
}

if (dayjs.Ls?.en) {
  dayjs.Ls.en.weekStart = 0;
}

if (dayjs.Ls?.['zh-cn']) {
  dayjs.Ls['zh-cn'].weekStart = 0;
}

dayjs.extend(localeData);
dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);
dayjs.extend(quarterOfYear);

export const enum EPickerCols {
  hour = 'hour',
  minute = 'minute',
  second = 'second',
  meridiem = 'meridiem',
}

export const TIME_PICKER_TYPE: Record<string, PickerTypeString> = {
  SECOND: 'Hms',
  MINUTE: 'Hm',
  HOUR: 'H',
};

export const TIME_PICKER_COLS = [EPickerCols.hour, EPickerCols.minute, EPickerCols.second];

export const MODE_MAP = {
  MONTH: 'month',
  DATE: 'date',
  WEEK: 'week',
  H: 'H',
  Hm: 'Hm',
  Hms: 'Hms',
};

export const TIME_INPUT_FORMAT_MAP = {
  [MODE_MAP.H]: 'YYYY-MM-DD HH:00',
  [MODE_MAP.Hm]: 'YYYY-MM-DD HH:mm',
  [MODE_MAP.Hms]: 'YYYY-MM-DD HH:mm:ss',
};

export const INPUT_FORMAT_MAP = {
  [MODE_MAP.MONTH]: 'YYYY-MM',
  [MODE_MAP.DATE]: 'YYYY-MM-DD',
  [MODE_MAP.WEEK]: 'YYYY-WW[Week]',
  [MODE_MAP.H]: 'YYYY-MM-DD HH:00',
  [MODE_MAP.Hm]: 'YYYY-MM-DD HH:mm',
  [MODE_MAP.Hms]: 'YYYY-MM-DD HH:mm:ss',
};

export const DAYJS_UNIT_MAP: Record<string, dayjs.UnitType> = {
  [MODE_MAP.MONTH]: 'M',
  [MODE_MAP.DATE]: 'd',
  [MODE_MAP.WEEK]: 'isoWeek' as unknown as dayjs.UnitType,
  [MODE_MAP.H]: 'h',
  [MODE_MAP.Hm]: 'm',
  [MODE_MAP.Hms]: 's',
};

export const MOM_COMPARE_TYPE = 'mom';

export const YOY_COMPARE_TYPE = 'yoy';

export const MOM_REGEX = /^mom(([+-]\d+)([dwMQy])?)?$/;

export const CUSTOM_TYPE = 'custom';

export const CUSTOM_COMPARE_TYPE = 'customCompare';

export const DYNAMIC_REGEX = /^([dwMQy][+-]\d+|\d{8})~([dwMQy][+-]\d+)$/i;
export const NDAY_REGEX = /^([dwMQy])([-+]\d+)$/;
export const FIXEDDAY_REGEX = /^\d{8}$/;
export const MONTH_DYNAMIC_REGEX = /^(M[-+]\d+|\d{6})~(M[-+]\d+)$/;
export const MONTH_NDAY_REGEX = /^M([-+]\d+)$/;
export const MONTH_FIXEDDAY_REGEX = /^\d{6}$/;
export const TIME_DYNAMIC_REGEX = /^([dwMQy][-+]\d+:\d{6}|\d{14})~([dwMQy][-+]\d+:\d{6})$/;
export const TIME_NDAY_REGEX = /^([dwMQy])([-+]\d+:\d{6})$/;
export const TIME_FIXEDDAY_REGEX = /^\d{14}$/;
export const SINGLE_TIME_DYNAMIC_REGEX = /^(([dwMQy])[-+]\d+:\d{6})$/;

export const SINGLE_DYNAMIC_REGEX = /^([dwMQy][-+]\d+)$/;
export const SINGLE_MONTH_DYNAMIC_REGEX = /^(M[-+]\d+)$/;

export const NDAY = 'NDAY';
export const FIXEDDAY = 'FIXEDDAY';

export const TIME_DYNAMIC_FORMAT_MAP = {
  [MODE_MAP.MONTH]: 'YYYYMM',
  [MODE_MAP.DATE]: 'YYYYMMDD',
  [MODE_MAP.WEEK]: 'YYYYMMDD',
  [MODE_MAP.H]: 'YYYYMMDDHHmmss',
  [MODE_MAP.Hm]: 'YYYYMMDDHHmmss',
  [MODE_MAP.Hms]: 'YYYYMMDDHHmmss',
};

export const SIZE_PADDING = 20; // 判断动态placement的空余量

export const DEFAULT_PLACEMENT = 'bottom-left';

export const DATE_HEIGHT = 438; // panel日的高度
export const MONTH_HEIGHT = 328; // panel月的高度

export const TODAY = dayjs();
export const TODAY_START = dayjs().startOf('d').toDate();
export const TODAY_END = dayjs().endOf('d').toDate();

export const START_YEAR = 2015;
export const END_YEAR = new Date().getFullYear() + 3;

export const TITLE_HEIGHT = 34; // panel里title的高度
export const CELL_HEIGHT = 36; // panel里cell的高度
export const PADDING_SCROLL = 20; // 滚动空余

export const HIGHLIGHT_CLASS = 'aw-range-picker-highlight'

export const getSideWidth = (sideWidth = 0) => {
  // 侧边栏宽度支持配置化
  // 关联更新： src/assets/range-picker-hook.scss， $sideWidth: 160px;
  const SIDE_WIDTH = Math.max(sideWidth || 180, 120);
  // const NOSHORT_WIDTH = 244;
  // const SHORT_WIDTH = 608;
  // const SINGLE_SHORT_WIDTH = 364;
  const TIMEPICKER_WIDTH = 120; // 时分秒宽度
  const PANEL_WIDTH = 250; // panel的宽度。取的日期宽
  const SHORT_WIDTH = PANEL_WIDTH + SIDE_WIDTH; // 有快捷键的panel宽，取的最宽，即动态自定义时
  const TIME_NOSHORT_WIDTH = PANEL_WIDTH + TIMEPICKER_WIDTH; // 时分秒，无快捷键的宽
  const TIME_SHORT_WIDTH = SHORT_WIDTH + TIMEPICKER_WIDTH; // 时分秒，有快捷键的宽
  const SINGLE_SHORT_WIDTH = PANEL_WIDTH + SIDE_WIDTH; // 单个日期，有快捷键的
  const TIME_SINGLE_SHORT_WIDTH = SINGLE_SHORT_WIDTH + TIMEPICKER_WIDTH; // 单个日期，时分秒，有快捷键的
  return {
    SIDE_WIDTH,
    TIMEPICKER_WIDTH,
    PANEL_WIDTH,
    SHORT_WIDTH,
    TIME_NOSHORT_WIDTH,
    TIME_SHORT_WIDTH,
    SINGLE_SHORT_WIDTH,
    TIME_SINGLE_SHORT_WIDTH,
  };
};

const LANG = ['zh-cn', 'en', 'ko'];

export function useRangeGlobalConfig(props: { timeOffset?: number; firstDayOfWeek?: number; locale?: string } = {}) {
  // cn 需处理为 zh-cn
  let dayjsLocale = !props.locale || props.locale === 'cn' ? BASE_LOCALE : props.locale;

  if (!LANG.includes(dayjsLocale)) {
    dayjsLocale = BASE_LOCALE;
  }

  let globalConfig = {};

  // 为了防止在utils中出现inject，目前该多语言方案对 CONST 处理仍存在问题
  if (!props.locale) {
    // 国际化文本初始化，更新 Tdesign v1.0 后，请更新此处理
    globalConfig = useConfig('datePicker').global.value;

    // dayjsLocale 为 Tdesign v1.0 的配置
    dayjsLocale = (globalConfig as any).dayjsLocale || BASE_LOCALE;
  }

  // 设置 dayjs 翻译
  if (dayjsLocale !== dayjs.locale()) {
    dayjs.locale(dayjsLocale);
  }

  const localeDef = localeConfig[dayjsLocale] || localeConfig[BASE_LOCALE];

  const rangePickerGlobalConfig = mergeObject(localeDef, {
    // 其它配置请在这里定义
    // ...
    ...globalConfig,
  });

  const RANGE_TIME: (timeOffset: number, firstDayOfWeek?: number) => RangeTimeOption[] = (
    timeOffset = 0,
    firstDayOfWeek = 1,
  ) => [
    {
      // title: '今天',
      title: rangePickerGlobalConfig.todayLabel,
      type: 'd~d',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').startOf('d').toDate(),
        dayjs().add(timeOffset, 'h').endOf('d').toDate(),
      ],
      mode: 'date',
    },
    {
      // title: '昨天',
      title: rangePickerGlobalConfig.yesterdayLabel,
      type: 'd-1~d-1',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-1, 'd').startOf('d').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'd').endOf('d').toDate(),
      ],
      mode: 'date',
    },
    {
      // title: '本周',
      title: rangePickerGlobalConfig.currentWeekLabel,
      type: 'w~d',
      relative: true,
      isCompare: false,
      time: () => [
        getStartEndTime('start', dayjs().add(timeOffset, 'h'), 'isoWeek', firstDayOfWeek).toDate(),
        dayjs().add(timeOffset, 'h').endOf('d').toDate(),
      ],
      mode: 'date',
    },
    {
      // title: '上周',
      title: rangePickerGlobalConfig.lastWeekLabel,
      type: 'w-1~w-1',
      relative: true,
      isCompare: false,
      time: () => [
        getStartEndTime('start', dayjs().add(timeOffset, 'h'), 'isoWeek', firstDayOfWeek).subtract(1, 'week').toDate(),
        getStartEndTime('end', dayjs().add(timeOffset, 'h'), 'isoWeek', firstDayOfWeek).subtract(1, 'week').toDate(),
      ],
      mode: 'date',
    },
    {
      // title: '过去7天',
      title: rangePickerGlobalConfig.last7DayLabel,
      type: 'd-7~d-1',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-7, 'd').startOf('d').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'd').endOf('d').toDate(),
      ],
      mode: 'date',
    },
    {
      // title: '过去14天',
      title: rangePickerGlobalConfig.last14DayLabel,
      type: 'd-14~d-1',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-14, 'd').startOf('d').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'd').endOf('d').toDate(),
      ],
      mode: 'date',
    },
    {
      // title: '过去30天',
      title: rangePickerGlobalConfig.last30DayLabel,
      type: 'd-30~d-1',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-30, 'd').startOf('d').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'd').endOf('d').toDate(),
      ],
      mode: 'date',
    },
    {
      // title: '过去60天',
      title: rangePickerGlobalConfig.last60DayLabel,
      type: 'd-60~d-1',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-60, 'd').startOf('d').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'd').endOf('d').toDate(),
      ],
      mode: 'date',
    },
    {
      // title: '过去90天',
      title: rangePickerGlobalConfig.last90DayLabel,
      type: 'd-90~d-1',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-90, 'd').startOf('d').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'd').endOf('d').toDate(),
      ],
      mode: 'date',
    },
    {
      // title: '过去180天',
      title: rangePickerGlobalConfig.last180DayLabel,
      type: 'd-180~d-1',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-180, 'd').startOf('d').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'd').endOf('d').toDate(),
      ],
      mode: 'date',
    },
    {
      // title: '本月',
      title: rangePickerGlobalConfig.currentMonthLabel,
      type: 'M~d',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').startOf('M').toDate(),
        dayjs().add(timeOffset, 'h').endOf('d').toDate(),
      ],
      mode: 'date',
    },
    {
      // title: '上月',
      title: rangePickerGlobalConfig.lastMonthLabel,
      type: 'M-1~M-1',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-1, 'M').startOf('M').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'M').endOf('M').toDate(),
      ],
      mode: 'date',
    },
    {
      // title: '本季度',
      title: rangePickerGlobalConfig.currentQuarterLabel,
      type: 'Q~d',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').startOf('quarter').toDate(),
        dayjs().add(timeOffset, 'h').endOf('d').toDate(),
      ],
      mode: 'date',
    },
    {
      // title: '上季度',
      title: rangePickerGlobalConfig.lastQuarterLabel,
      type: 'Q-1~Q-1',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-1, 'Q').startOf('quarter').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'Q').endOf('quarter').toDate(),
      ],
      mode: 'date',
    },
    {
      // title: '今年',
      title: rangePickerGlobalConfig.thisYearLabel,
      type: 'Y~d-1',
      relative: true,
      isCompare: false,
      time: () => {
        const today = dayjs().add(timeOffset, 'h');
        // 如果今天是今年的第一天，那么返回去年最后一天
        if (today.isSame(today.startOf('year'), 'day'))
          return [today.subtract(1, 'day').startOf('day').toDate(), today.subtract(1, 'day').endOf('day').toDate()];
        // 返回今年1号到昨天
        return [today.startOf('year').toDate(), today.subtract(1, 'day').endOf('day').toDate()];
      },
      mode: 'date',
    },
    {
      // title: '去年',
      title: rangePickerGlobalConfig.lastYearLabel,
      type: 'Y-1~Y-1',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-1, 'y').startOf('y').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'y').endOf('y').toDate(),
      ],
      mode: 'date',
    },
    {
      // title: '本月',
      title: rangePickerGlobalConfig.currentMonthLabel,
      type: 'M~M',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').startOf('M').toDate(),
        dayjs().add(timeOffset, 'h').endOf('M').toDate(),
      ],
      mode: 'month',
    },
    {
      // title: '上月',
      title: rangePickerGlobalConfig.lastMonthLabel,
      type: 'M-1~M-1',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-1, 'M').startOf('M').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'M').endOf('M').toDate(),
      ],
      mode: 'month',
    },
    {
      // title: '过去3个月',
      title: rangePickerGlobalConfig.last3MonthLabel,
      type: 'M-3~M-1',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-3, 'M').startOf('M').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'M').endOf('M').toDate(),
      ],
      mode: 'month',
    },
    {
      // title: '过去6个月',
      title: rangePickerGlobalConfig.last6MonthLabel,
      type: 'M-6~M-1',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-6, 'M').startOf('M').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'M').endOf('M').toDate(),
      ],
      mode: 'month',
    },
    {
      // title: '今年',
      title: rangePickerGlobalConfig.thisYearLabel,
      type: 'Y~M',
      relative: true,
      isCompare: false,
      time: () => {
        return [
          dayjs().add(timeOffset, 'h').startOf('year').startOf('M').toDate(),
          dayjs().add(timeOffset, 'h').endOf('M').toDate(),
        ];
      },
      mode: 'month',
    },
    {
      // title: '去年',
      title: rangePickerGlobalConfig.lastYearLabel,
      type: 'Y-1~Y-1',
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-1, 'y').startOf('y').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'y').endOf('y').toDate(),
      ],
      mode: 'month',
    },
    {
      // title: '本周',
      title: rangePickerGlobalConfig.currentWeekLabel,
      type: 'w~d',
      relative: true,
      isCompare: false,
      // 每周第一天是周一
      time: () => [
        getStartEndTime('start', dayjs().add(timeOffset, 'h'), 'isoWeek', firstDayOfWeek).toDate(),
        getStartEndTime('end', dayjs().add(timeOffset, 'h'), 'isoWeek', firstDayOfWeek).toDate(),
      ],
      mode: 'week',
    },
    {
      // title: '上周',
      title: rangePickerGlobalConfig.lastWeekLabel,
      type: 'w-1~w-1',
      relative: true,
      isCompare: false,
      // 每周第一天是周一
      time: () => [
        getStartEndTime('start', dayjs().add(timeOffset, 'h'), 'isoWeek', firstDayOfWeek).subtract(1, 'week').toDate(),
        getStartEndTime('end', dayjs().add(timeOffset, 'h'), 'isoWeek', firstDayOfWeek).subtract(1, 'week').toDate(),
      ],
      mode: 'week',
    },
    {
      // title: '过去4周',
      title: rangePickerGlobalConfig.last4WeekLabel,
      type: 'w-4~w-1',
      relative: true,
      isCompare: false,
      // 每周第一天是周一
      time: () => [
        getStartEndTime('start', dayjs().add(timeOffset, 'h'), 'isoWeek', firstDayOfWeek).subtract(4, 'week').toDate(),
        getStartEndTime('end', dayjs().add(timeOffset, 'h'), 'isoWeek', firstDayOfWeek).subtract(1, 'week').toDate(),
      ],
      mode: 'week',
    },
    {
      // title: '过去6周',
      title: rangePickerGlobalConfig.last6WeekLabel,
      type: 'w-6~w-1',
      relative: true,
      isCompare: false,
      // 每周第一天是周一
      time: () => [
        getStartEndTime('start', dayjs().add(timeOffset, 'h'), 'isoWeek', firstDayOfWeek).subtract(6, 'week').toDate(),
        getStartEndTime('end', dayjs().add(timeOffset, 'h'), 'isoWeek', firstDayOfWeek).subtract(1, 'week').toDate(),
      ],
      mode: 'week',
    },
    {
      // title: '过去8周',
      title: rangePickerGlobalConfig.last8WeekLabel,
      type: 'w-8~w-1',
      relative: true,
      isCompare: false,
      // 每周第一天是周一
      time: () => [
        getStartEndTime('start', dayjs().add(timeOffset, 'h'), 'isoWeek', firstDayOfWeek).subtract(8, 'week').toDate(),
        getStartEndTime('end', dayjs().add(timeOffset, 'h'), 'isoWeek', firstDayOfWeek).subtract(1, 'week').toDate(),
      ],
      mode: 'week',
    },
    {
      // title: '今天此刻',
      title: rangePickerGlobalConfig.todayNowLabel,
      type: `d:now~d:now`,
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').startOf('hour').toDate(),
        dayjs().add(timeOffset, 'h').startOf('hour').toDate(),
      ],
      mode: 'H',
    },
    {
      // title: '昨天此刻',
      title: rangePickerGlobalConfig.yesterdayNowLabel,
      type: `d-1:now~d-1:now`,
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-1, 'd').startOf('hour').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'd').startOf('hour').toDate(),
      ],
      mode: 'H',
    },
    {
      // title: '今天此刻',
      title: rangePickerGlobalConfig.todayNowLabel,
      type: `d:now~d:now`,
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').startOf('minute').toDate(),
        dayjs().add(timeOffset, 'h').startOf('minute').toDate(),
      ],
      mode: 'Hm',
    },
    {
      // title: '昨天此刻',
      title: rangePickerGlobalConfig.yesterdayNowLabel,
      type: `d-1:now~d-1:now`,
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-1, 'd').startOf('minute').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'd').startOf('minute').toDate(),
      ],
      mode: 'Hm',
    },
    {
      // title: '今天此刻',
      title: rangePickerGlobalConfig.todayNowLabel,
      type: `d:now~d:now`,
      relative: true,
      isCompare: false,
      time: () => [dayjs().add(timeOffset, 'h').toDate(), dayjs().add(timeOffset, 'h').toDate()],
      mode: 'Hms',
    },
    {
      // title: '昨天此刻',
      title: rangePickerGlobalConfig.yesterdayNowLabel,
      type: `d-1:now~d-1:now`,
      relative: true,
      isCompare: false,
      time: () => [
        dayjs().add(timeOffset, 'h').add(-1, 'd').toDate(),
        dayjs().add(timeOffset, 'h').add(-1, 'd').toDate(),
      ],
      mode: 'Hms',
    },
  ];

  const SINGLE_RANGE_TIME: (timeOffset: number, firstDayOfWeek?: number) => SingleRangeTimeOption[] = (
    timeOffset = 0,
    firstDayOfWeek = 1,
  ) => [
    {
      // title: '今天',
      title: rangePickerGlobalConfig.todayLabel,
      type: 'd',
      relative: true,
      isCompare: false,
      time: () => dayjs().add(timeOffset, 'h').startOf('d').toDate(),
      mode: 'date',
    },
    {
      // title: '昨天',
      title: rangePickerGlobalConfig.yesterdayLabel,
      type: 'd-1',
      relative: true,
      isCompare: false,
      time: () => dayjs().add(timeOffset, 'h').add(-1, 'd').startOf('d').toDate(),
      mode: 'date',
    },
    {
      // title: '本月',
      title: rangePickerGlobalConfig.currentMonthLabel,
      type: 'M',
      relative: true,
      isCompare: false,
      time: () => dayjs().add(timeOffset, 'h').startOf('M').toDate(),
      mode: 'month',
    },
    {
      // title: '上月',
      title: rangePickerGlobalConfig.lastMonthLabel,
      type: 'M-1',
      relative: true,
      isCompare: false,
      time: () => dayjs().add(timeOffset, 'h').add(-1, 'M').startOf('M').toDate(),
      mode: 'month',
    },
    {
      // title: '本周',
      title: rangePickerGlobalConfig.currentWeekLabel,
      type: 'w~d',
      relative: true,
      isCompare: false,
      // 每周第一天是周一
      time: () => getStartEndTime('start', dayjs().add(timeOffset, 'h'), 'isoWeek', firstDayOfWeek).toDate(),
      mode: 'week',
    },
    {
      // title: '上周',
      title: rangePickerGlobalConfig.lastWeekLabel,
      type: 'w-1~w-1',
      relative: true,
      isCompare: false,
      // 每周第一天是周一
      time: () =>
        getStartEndTime('start', dayjs().add(timeOffset, 'h'), 'isoWeek', firstDayOfWeek).subtract(1, 'week').toDate(),
      mode: 'week',
    },
    {
      // title: '今天此刻',
      title: rangePickerGlobalConfig.todayNowLabel,
      type: `d:now`,
      relative: true,
      isCompare: false,
      time: () => dayjs().add(timeOffset, 'h').startOf('hour').toDate(),
      mode: 'H',
    },
    {
      // title: '昨天此刻',
      title: rangePickerGlobalConfig.yesterdayNowLabel,
      type: `d-1:now`,
      relative: true,
      isCompare: false,
      time: () => dayjs().add(timeOffset, 'h').add(-1, 'd').startOf('hour').toDate(),
      mode: 'H',
    },
    {
      // title: '今天此刻',
      title: rangePickerGlobalConfig.todayNowLabel,
      type: `d:now`,
      relative: true,
      isCompare: false,
      time: () => dayjs().add(timeOffset, 'h').startOf('minute').toDate(),
      mode: 'Hm',
    },
    {
      // title: '昨天此刻',
      title: rangePickerGlobalConfig.yesterdayNowLabel,
      type: `d-1:now`,
      relative: true,
      isCompare: false,
      time: () => dayjs().add(timeOffset, 'h').add(-1, 'd').startOf('minute').toDate(),
      mode: 'Hm',
    },
    {
      // title: '今天此刻',
      title: rangePickerGlobalConfig.todayNowLabel,
      type: `d:now`,
      relative: true,
      isCompare: false,
      time: () => dayjs().add(timeOffset, 'h').toDate(),
      mode: 'Hms',
    },
    {
      // title: '昨天此刻',
      title: rangePickerGlobalConfig.yesterdayNowLabel,
      type: `d-1:now`,
      relative: true,
      isCompare: false,
      time: () => dayjs().add(timeOffset, 'h').add(-1, 'd').toDate(),
      mode: 'Hms',
    },
  ];

  const STATIC_RANGE_TIME = RANGE_TIME(props.timeOffset || 0, props.firstDayOfWeek || 1);
  const STATIC_SINGLE_RANGE_TIME = SINGLE_RANGE_TIME(props.timeOffset || 0, props.firstDayOfWeek || 1);

  const RANGE_COMPARE_TIME: RangeTimeOption[] = [
    {
      // title: '前一时间段',
      title: rangePickerGlobalConfig.sameTimeLastMonthLabel,
      type: 'mom',
      regex: MOM_REGEX,
      relative: true,
      isCompare: true,
      time: () => [],
    },
    {
      // title: '去年同期',
      title: rangePickerGlobalConfig.oneYearAgoLabel,
      type: 'yoy',
      relative: true,
      isCompare: true,
      time: () => [],
    },
  ];

  const CUSTOM_TIME: RangeTimeOption = {
    // title: '自定义',
    title: rangePickerGlobalConfig.customTimeLabel,
    type: 'custom',
    relative: false,
    isCompare: false,
    time: () => [],
  };

  const CUSTOM_COMPARE_TIME: RangeTimeOption = {
    // title: '自定义',
    title: rangePickerGlobalConfig.customTimeLabel,
    type: 'customCompare',
    relative: false,
    isCompare: true,
    time: () => [],
  };


  const ONE_DAY_AGO = {
    // title: '1天前',
    title: rangePickerGlobalConfig.oneDayAgoLabel,
    type: 'mom-1d',
    relative: true,
    isCompare: true,
    time: () => []
  }

  const ONE_WEEK_AGO = {
    // title: '1周前',
    title: rangePickerGlobalConfig.oneWeekAgoLabel,
    type: 'mom-1w',
    relative: true,
    isCompare: true,
    time: () => []
  }

  const ONE_MONTH_AGO = {
    // title: '1月前',
    title: rangePickerGlobalConfig.oneMonthAgoLabel,
    type: 'mom-1M',
    relative: true,
    isCompare: true,
    time: () => []
  }

  const ONE_YEAR_AGO = {
    // title: '1年前',
    title: rangePickerGlobalConfig.oneYearAgoLabel,
    type: 'yoy',
    relative: true,
    isCompare: true,
    time: () => []
  }

  const RANGE_DYNAMIC_MOM = {
    'date': [
      ONE_DAY_AGO,
      ONE_WEEK_AGO,
      ONE_MONTH_AGO,
      ONE_YEAR_AGO
    ],
    'week': [
      ONE_WEEK_AGO,
      ONE_MONTH_AGO,
      ONE_YEAR_AGO
    ],
    'month': [
      ONE_MONTH_AGO,
      ONE_YEAR_AGO
    ],
    'H': [
      ONE_DAY_AGO,
      ONE_WEEK_AGO,
      ONE_YEAR_AGO
    ],
    'Hm': [
      ONE_DAY_AGO,
      ONE_WEEK_AGO,
      ONE_YEAR_AGO
    ],
    'Hms': [
      ONE_DAY_AGO,
      ONE_WEEK_AGO,
      ONE_YEAR_AGO
    ]
  }

  // 动态能选的粒度
  const DYNAMIC_OPTIONS_MAP = {
    'date': [
      {
        label: rangePickerGlobalConfig.dayLabel,
        value: 'd'
      },
      {
        label: rangePickerGlobalConfig.weekLabel,
        value: 'w'
      },
      {
        label: rangePickerGlobalConfig.monthLabel,
        value: 'M'
      },
      {
        label: rangePickerGlobalConfig.quarterLabel,
        value: 'Q'
      },
      {
        label: rangePickerGlobalConfig.yearLabel,
        value: 'y'
      }
    ],
    'week': [
      {
        label: rangePickerGlobalConfig.weekLabel,
        value: 'w'
      },
      {
        label: rangePickerGlobalConfig.monthLabel,
        value: 'M'
      },
      {
        label: rangePickerGlobalConfig.quarterLabel,
        value: 'Q'
      },
      {
        label: rangePickerGlobalConfig.yearLabel,
        value: 'y'
      }
    ],
    'month': [
      {
        label: rangePickerGlobalConfig.monthLabel,
        value: 'M'
      },
      {
        label: rangePickerGlobalConfig.quarterLabel,
        value: 'Q'
      },
      {
        label: rangePickerGlobalConfig.yearLabel,
        value: 'y'
      }
    ],
    'H': [
      {
        label: rangePickerGlobalConfig.dayLabel,
        value: 'd'
      },
      {
        label: rangePickerGlobalConfig.weekLabel,
        value: 'w'
      },
    ],
    'Hm': [
      {
        label: rangePickerGlobalConfig.dayLabel,
        value: 'd'
      },
      {
        label: rangePickerGlobalConfig.weekLabel,
        value: 'w'
      },
    ],
    'Hms': [
      {
        label: rangePickerGlobalConfig.dayLabel,
        value: 'd'
      },
      {
        label: rangePickerGlobalConfig.weekLabel,
        value: 'w'
      },
    ]
  }

  const MODE_LABEL: Record<string, string> = {
    'd': rangePickerGlobalConfig.dayLabel,
    'w': rangePickerGlobalConfig.weekLabel,
    'M': rangePickerGlobalConfig.monthLabel,
    'Q': rangePickerGlobalConfig.quarterLabel,
    'y': rangePickerGlobalConfig.yearLabel,
  }

  const DYNAMIC_AGO_LABEL: Record<string, string> = {
    'd': rangePickerGlobalConfig.dayAgoLabel,
    'w': rangePickerGlobalConfig.weekAgoLabel,
    'M': rangePickerGlobalConfig.monthAgoLabel,
    'Q': rangePickerGlobalConfig.quarterAgoLabel,
    'y': rangePickerGlobalConfig.yearAgoLabel
  }

  return {
    // 国际化输出
    globalConfig: rangePickerGlobalConfig,

    RANGE_TIME,
    SINGLE_RANGE_TIME,
    STATIC_RANGE_TIME,
    STATIC_SINGLE_RANGE_TIME,
    RANGE_COMPARE_TIME,
    CUSTOM_TIME,
    CUSTOM_COMPARE_TIME,
    RANGE_DYNAMIC_MOM,
    DYNAMIC_OPTIONS_MAP,
    MODE_LABEL,
    DYNAMIC_AGO_LABEL
  };
}
