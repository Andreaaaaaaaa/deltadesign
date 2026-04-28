import { ColDef, ColumnMenuTab } from 'ag-grid-community';

import { gridState } from './store/grid';
import { localeStore } from './locale';
import { IDeltaConfig, TOptions, TOptionsItem } from './types';
import {
  E_DATE_KEY,
  E_STATISTICS,
  E_FORMAT_TIME,
  E_FORMAT_DATE,
  E_CURRENCY_KEY,
  E_FORMAT_NEGATIVE,
  E_CONDITION_RULES_KEY,
} from './enums';

/**
 * 前缀
 */
export const COMPONENT_PREFIX = 't-data-grid';

// 表头名称
export const ROW_HEADER_FIELD_NAME = '$rowHeader';

// 图表默认高度
export const DEFAULT_CHART_HEGIHT = 50;

// 色阶分桶数量
export const SCALE_PARTITION = 10;

export const deltaConfigDefault: IDeltaConfig = {
  multiCopy: true,
  editable: false,
  gridConfig: {
    suppressRowHeader: false,
    // 是否隐藏列头
    suppressColHeader: false,
  },
  paging: {
    count: 0,
    pageIndex: 1,
    pageSize: 100,
    verticalDistance: 10,
    horizontalDistance: 10,
  },
  chart: {
    columnDefs: [],
  },
  content: [],
  grid: { ...gridState },
};

// edit toolbar 偏移量
export const EDIT_TOOLBAL_OFFSET = 15;

/**
 * 数据条内置颜色
 */
export const DATA_BAR_COLORS: Record<E_CONDITION_RULES_KEY, Array<string | Array<string>>> = {
  [E_CONDITION_RULES_KEY.SINGLEDATABAR]: [['#97B6FC'], ['#FF8F6C'], ['#B691FF'], ['#59CEF5'], ['#FCC04E']],
  [E_CONDITION_RULES_KEY.DATABAR]: [
    ['#FCD4D5', '#97B6FC'],
    ['#FFF0D9', '#A9EAFF'],
    ['#DDCBFF', '#8EE2C9'],
    ['#D52C2D', '#6B7B9C'],
    ['#D87A80', '#5FC8A8'],
  ],
  [E_CONDITION_RULES_KEY.COLORSCALE]: [
    ['#CDDCFF', '#7FA2F2', '#5480E6', '#3867D3', '#234BB1'],
    ['#FFD7CB', '#FCB098', '#FF8F6C', '#C9532D', '#95371A'],
    ['#EADEFF', '#D4BDFF', '#A67EF6', '#8E5CF2', '#6835CD'],
    ['#A4EED8', '#78D5B9', '#35A583', '#208768', '#066549'],
    ['#FFEECE', '#FFCD6D', '#ECAA2C', '#C8880E', '#A26B00'],
  ],
};

/**
 * 格式 - 默认展示数字数字
 */
export const FORMAT_NUMBER_DEFAULT = '12345.6789';

/**
 * 头部菜单排序
 */
export const HEADER_MENU_TABS: Array<ColumnMenuTab> = ['filterMenuTab', 'columnsMenuTab', 'generalMenuTab'];

/**
 * 统计字段的顺序及对应文案
 * 顺序不可以调整
 */
export const STATISTICS_KEY: Array<E_STATISTICS> = [
  E_STATISTICS.MIN,
  E_STATISTICS.MAX,
  E_STATISTICS.AVG,
  E_STATISTICS.SUM,
];

/**
 * 允许存储最大的记录
 */
export const HISTORY_LIMIT = 20;

/**
 * 运算最大解析层级
 */
export const MAX_PARSE = 10;

/**
 * 分隔符
 */
export const VALUE_SEPARATOR = '\t';
export const ROWS_SEPARATOR = '\n';

/**
 * onchange的时候保留的元素
 */
export const HEADER_CHANGE_RESERVE: Array<keyof ColDef> = ['field', 'headerName'];

/**
 * 粘贴提取样式属性
 */
export const PASTE_OBTAIN_ATTR = [
  'color',
  'font-style',
  'text-align',
  'font-weight',
  'white-space',
  'text-decoration',
  'background-color',
];

/**
 * 颜色选择器预设颜色
 */
export const SYSTEM_COLORS = {
  orange: [
    { name: 'orange-10', val: '#FFD7CB' },
    { name: 'orange-20', val: '#FDC2B0' },
    { name: 'orange-30', val: '#FCB098' },
    { name: 'orange-40', val: '#FF9D84' },
    { name: 'orange-50', val: '#FF8F6C' },
    { name: 'orange-60', val: '#F6764E' },
    { name: 'orange-70', val: '#DE6139' },
    { name: 'orange-80', val: '#C9532D' },
    { name: 'orange-90', val: '#B14320' },
    { name: 'orange-100', val: '#95371A' },
  ],
  blue: [
    { name: 'blue-10', val: '#CDDCFF' },
    { name: 'blue-20', val: '#B4CBFF' },
    { name: 'blue-30', val: '#97B6FC' },
    { name: 'blue-40', val: '#7FA2F2' },
    { name: 'blue-50', val: '#6690F1' },
    { name: 'blue-60', val: '#5480E6' },
    { name: 'blue-70', val: '#4674DD' },
    { name: 'blue-80', val: '#3867D3' },
    { name: 'blue-90', val: '#2F59C3' },
    { name: 'blue-100', val: '#234BB1' },
  ],
  lightBlue: [
    { name: 'light-blue-10', val: '#C4EDFF' },
    { name: 'light-blue-20', val: '#A9EAFF' },
    { name: 'light-blue-30', val: '#88E1FF' },
    { name: 'light-blue-40', val: '#6DDAFF' },
    { name: 'light-blue-50', val: '#59CEF5' },
    { name: 'light-blue-60', val: '#37BCE9' },
    { name: 'light-blue-70', val: '#26B3E3' },
    { name: 'light-blue-80', val: '#10A5D8' },
    { name: 'light-blue-90', val: '#0495C7' },
    { name: 'light-blue-100', val: '#0082AE' },
  ],
  purple: [
    { name: 'purple-10', val: '#EADEFF' },
    { name: 'purple-20', val: '#DDCBFF' },
    { name: 'purple-30', val: '#D4BDFF' },
    { name: 'purple-40', val: '#C4A6FF' },
    { name: 'purple-50', val: '#B691FF' },
    { name: 'purple-60', val: '#A67EF6' },
    { name: 'purple-70', val: '#9C70F3' },
    { name: 'purple-80', val: '#8E5CF2' },
    { name: 'purple-90', val: '#7D48E8' },
    { name: 'purple-100', val: '#6835CD' },
  ],
  green: [
    { name: 'green-10', val: '#A4EED8' },
    { name: 'green-20', val: '#8EE2C9' },
    { name: 'green-30', val: '#78D5B9' },
    { name: 'green-40', val: '#5FC8A8' },
    { name: 'green-50', val: '#4EB596' },
    { name: 'green-60', val: '#35A583' },
    { name: 'green-70', val: '#289574' },
    { name: 'green-80', val: '#208768' },
    { name: 'green-90', val: '#16795B' },
    { name: 'green-100', val: '#066549' },
  ],
  yellow: [
    { name: 'yellow-10', val: '#FFEECE' },
    { name: 'yellow-20', val: '#FCE0AB' },
    { name: 'yellow-30', val: '#FFD98F' },
    { name: 'yellow-40', val: '#FFCD6D' },
    { name: 'yellow-50', val: '#FCC04D' },
    { name: 'yellow-60', val: '#ECAA2C' },
    { name: 'yellow-70', val: '#E49C11' },
    { name: 'yellow-80', val: '#C8880E' },
    { name: 'yellow-90', val: '#B77903' },
    { name: 'yellow-100', val: '#A26B00' },
  ],
  cyan: [
    { name: 'cyan-10', val: '#E3FCC0' },
    { name: 'cyan-20', val: '#CEF593' },
    { name: 'cyan-30', val: '#BBE27F' },
    { name: 'cyan-40', val: '#AED86F' },
    { name: 'cyan-50', val: '#A5CF67' },
    { name: 'cyan-60', val: '#89B844' },
    { name: 'cyan-70', val: '#75A232' },
    { name: 'cyan-80', val: '#659122' },
    { name: 'cyan-90', val: '#537F11' },
    { name: 'cyan-100', val: '#486E0E' },
  ],
  berries: [
    { name: 'berries-10', val: '#BCC7DE' },
    { name: 'berries-20', val: '#A6B4D1' },
    { name: 'berries-30', val: '#8FA1C6' },
    { name: 'berries-40', val: '#7C8EB5' },
    { name: 'berries-50', val: '#6B7B9C' },
    { name: 'berries-60', val: '#606F8F' },
    { name: 'berries-70', val: '#556586' },
    { name: 'berries-80', val: '#4C5B7C' },
    { name: 'berries-90', val: '#43516F' },
    { name: 'berries-100', val: '#3C4966' },
  ],
};

/**
 * 条件格式名称对应
 */
export const RULES_TYPE_MAPPING = (): Record<E_CONDITION_RULES_KEY, string> => {
  const locale = localeStore.getLocals();
  return {
    [E_CONDITION_RULES_KEY.COLORSCALE]: locale.colorScale,
    [E_CONDITION_RULES_KEY.SINGLEDATABAR]: locale.oneWayDataStrip,
    [E_CONDITION_RULES_KEY.DATABAR]: locale.bidirectionalDataStrip,
  };
};

/**
 * 负数对应的表示
 */
export const NEGATIVE_MAPPING = [
  { label: '(1234.10)', value: E_FORMAT_NEGATIVE.BRACKETS },
  { label: '-1234.10', value: E_FORMAT_NEGATIVE.MINUS },
];

/**
 * 货币选项
 */
export const CURRENCY_MAPPING: Array<{ label: string; value: E_CURRENCY_KEY }> = [
  { label: '无', value: E_CURRENCY_KEY.NULL },
  { label: '¥', value: E_CURRENCY_KEY.CNY },
  { label: '$', value: E_CURRENCY_KEY.USD },
  { label: 'HK', value: E_CURRENCY_KEY.HKD },
  { label: '€(123€)', value: E_CURRENCY_KEY.EUR },
  { label: '€(€123)', value: E_CURRENCY_KEY.EUR2 },
  { label: '£', value: E_CURRENCY_KEY.GBP },
];

/**
 * 时间选项
 */
export const TIME_MAPPING: TOptions<E_FORMAT_TIME> = [
  { label: '14:30', value: E_FORMAT_TIME.HH_MM },
  { label: '2:30 PM', value: E_FORMAT_TIME.HH_MM_PM },
  { label: '14:30:30', value: E_FORMAT_TIME.HH_MM_SS },
  { label: '2:30:30 PM', value: E_FORMAT_TIME.HH_MM_SS_PM },
  { label: '14时30分', value: E_FORMAT_TIME.H_M },
  { label: '14时30分30秒', value: E_FORMAT_TIME.H_M_S },
  { label: '下午2时30分', value: E_FORMAT_TIME.PM_H_M },
  { label: '下午2时30分30秒', value: E_FORMAT_TIME.PM_H_M_S },
  { label: '十四时三十分', value: E_FORMAT_TIME.U_H_M },
  { label: '十四时三十分三十秒', value: E_FORMAT_TIME.U_H_M_S },
];

/**
 * 日期选项
 */
export const DATE_MAPPING = (): Array<TOptionsItem<E_DATE_KEY> & { children: Array<TOptionsItem<E_FORMAT_DATE>> }> => {
  const locale = localeStore.getLocals();

  return [
    {
      label: locale.byDay,
      value: E_DATE_KEY.DD,
      children: [
        { label: '2024-01-01', value: E_FORMAT_DATE.YYYY_MM_DD },
        { label: '01-01', value: E_FORMAT_DATE.MM_DD },
        { label: '2024-01-01(周一)', value: E_FORMAT_DATE.YYYY_MM_DD_WW },
        { label: '01-01(周一)', value: E_FORMAT_DATE.MM_DD_WW },
      ],
    },
    {
      label: locale.byWeek,
      value: E_DATE_KEY.WW,
      children: [
        { label: '2024-01-01至2024-01-07', value: E_FORMAT_DATE.YYYY_MM_DD_YYYY_MM_DD },
        { label: '01-01至01-07', value: E_FORMAT_DATE.MM_DD_MM_DD },
        { label: '2024-01周', value: E_FORMAT_DATE.YYYY_WW },
      ],
    },
    {
      label: locale.byMonth,
      value: E_DATE_KEY.MM,
      children: [{ label: '2024-01', value: E_FORMAT_DATE.YYYY_MM }],
    },
    {
      label: locale.byQuarter,
      value: E_DATE_KEY.SS,
      children: [{ label: '2024-Q1', value: E_FORMAT_DATE.YYYY_Q }],
    },
    {
      label: locale.byYear,
      value: E_DATE_KEY.YYYY,
      children: [{ label: '2024', value: E_FORMAT_DATE.YYYY }],
    },
  ];
};
