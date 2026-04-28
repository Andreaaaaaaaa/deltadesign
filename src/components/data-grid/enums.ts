/**
 * 数据条
 * 填充方式
 */
export enum E_FILLING {
  SOLID = 'solid',
  GRADIEND = 'gradient',
}

/**
 * 方向
 */
export enum E_DIRECTION {
  ROW = 'row',
  COLUMN = 'column',
}

/**
 * 条件格式类型
 */
export enum E_CONDITION_RULES_KEY {
  // FORMAT = 'format',
  DATABAR = 'dataBar',
  SINGLEDATABAR = 'singleDataBar',
  COLORSCALE = 'colorScale',
}

/**
 * 格式的负数配置
 */
export enum E_FORMAT_NEGATIVE {
  BRACKETS = 'BRACKETS',
  MINUS = 'MINUS',
}

/**
 * 格式的时间配置
 */
export enum E_FORMAT_TIME {
  // 14:30
  HH_MM = 'HH_MM',
  // 2:30 PM
  HH_MM_PM = 'HH_MM_PM',
  // 14:30:30
  HH_MM_SS = 'HH_MM_SS',
  // 2:30:30 PM
  HH_MM_SS_PM = 'HH_MM_SS_PM',
  // 14时30分
  H_M = 'H_M',
  // 14时30分30秒
  H_M_S = 'H_M_S',
  // 下午2时30分
  PM_H_M = 'PM_H_M',
  // 下午2时30分30秒
  PM_H_M_S = 'PM_H_M_S',
  // 十四时三十分
  U_H_M = 'U_H_M',
  // 十四时三十分三十秒
  U_H_M_S = 'U_H_M_S',
}

/**
 * 日期
 */
export enum E_FORMAT_DATE {
  // 按天
  YYYY_MM_DD = 'YYYY_MM_DD',
  MM_DD = 'MM_DD',
  YYYY_MM_DD_WW = 'YYYY_MM_DD_WW',
  MM_DD_WW = 'MM_DD_WW',

  // 按周
  YYYY_MM_DD_YYYY_MM_DD = 'YYYY_MM_DD_YYYY_MM_DD',
  MM_DD_MM_DD = 'MM_DD_MM_DD',
  YYYY_WW = 'YYYY_WW',

  // 按月
  YYYY_MM = 'YYYY_MM',

  // 按季度
  YYYY_Q = 'YYYY_Q',

  // 按年
  YYYY = 'YYYY',
}

/**
 * 日期
 */
export enum E_DATE_KEY {
  // 年
  YYYY = 'YYYY',
  // 月
  MM = 'MM',
  // 天
  DD = 'DD',
  // 周
  WW = 'WW',
  // 季度
  SS = 'SS',
}

/**
 * 方向
 */
export enum E_AROUND {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}

/**
 * 格式化支持功能
 */
export enum E_FORMAT_KEY {
  UNSET = 'unset',
  NUMBER = 'number',
  PERCENT = 'percent',
  // TEXT = 'text',
  // TIME = 'time',
  DATE = 'date',
  CURRENCY = 'currency',
}

/**
 * 数据统计类型
 */
export enum E_STATISTICS {
  MAX = 'max',
  MIN = 'min',
  SUM = 'sum',
  AVG = 'avg',
}

/**
 * 工具栏key
 */
export enum E_HEADER_EDIT_TOOLBAR_KEY {
  UNDO = 'undo',
  REDO = 'redo',
  FORMAT = 'format',
  BOLD = 'fontWeight',
  ITALIC = 'fontStyle',
  FONTSIZE = 'fontSize',
  UNDERLINE = 'textDecoration',
  COLOR = 'color',
  BGCOLOR = 'backgroundColor',
  BORDER = 'border',
  WRAP = 'whiteSpace',
  MERGE = 'merge',
  HIDESHOWHEADER = 'hideShowHeader',
  PINNING = 'pinning',
  CONDITION = 'condition',
  ROLLBACKDIVIDER = 'rollbackDivider',
  FORMATDIVIDER = 'formatDivider',
  CELLDIVIDER = 'cellDivider',
  STYLEDIVIDER = 'styleDivider',
  CONDITIONDIVIDER = 'conditionDivider',
  DATABAR = 'data-bar',
  FORMATVERTICALALIGN = 'format-vertical-align',
  FORMATVERTICALALIGNRIGHTLEFT = 'text-align',
  FORMATVERTICALALIGNRIGHT = 'text-align',
  FORMATVERTICALALIGNCENTER = 'text-align',
}
/**
 * 工具栏类型
 */
export enum E_HEADER_EDIT_TOOLBAR_CONTROL {
  BTN = 'btn',
  MENU = 'menu',
  COLOR = 'color',
  DIALOG = 'dialog',
  DIVIDER = 'divider',
  DROPDOWN = 'dropdown',
  SWITCHVALUE = 'switchValue',
  // SELECT 类型
  SELECT = 'select',
  // 提示
  TIPS = 'tips',
}

/**
 * sideBar Tool Panel Key
 * value 是组件名称
 */
export enum E_SIDE_BAR_PANEL_KEY {
  // 管理规则
  SIDE_BAR_RULES = 'SideBarRules',
  // 添加管理规则
  CREATE_SIDE_BAR_RULES = 'CreateSizeBarRules',
  // 单元格格式
  CELL_FORMAT = 'CellFormat',
}

/**
 * 全局触发的事件
 */
export enum E_EVENT_BUS_KEY {
  // 创建格式
  CREATE_RULES = 'CREATE_RULES',
  // 修改格式
  EDIT_RULES = 'EDIT_RULES',
  // 单元格格式
  FORMATTER = 'FORMATTER',
}

/**
 * 货币类型
 */
export enum E_CURRENCY_KEY {
  // 无
  NULL = 'NULL',
  // 人民币 ¥
  CNY = 'CNY',
  // 美元 $
  USD = 'USD',
  // 港币 HK$
  HKD = 'HKD',
  // 欧元 €
  EUR = 'EUR',
  // 欧元 €
  EUR2 = 'EUR2',
  // 英镑 £
  GBP = 'GBP',
}

/**
 * 字体
 */
export enum E_FONTSIZE {
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  ELEVEN = '11',
  TWELVE = '12',
  FOURTEEN = '14',
  SIXTEEN = '16',
  EIGHTEEN = '18',
  TWENTY = '20',
  TWENTYTWO = '22',
  TWENTYFOUR = '24',
  TWENTYSIX = '26',
  TWENTYEIGHT = '28',
  THIRTYSIX = '36',
  FORTYTWO = '42',
  FORTYEIGHT = '48',
  SEVENTYTWO = '72',
}
