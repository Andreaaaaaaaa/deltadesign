import { CSSProperties } from 'vue';
import { ColDef, Column, AgChartThemePalette, GetContextMenuItemsParams, GridApi, ColumnApi } from 'ag-grid-community';
import {
  E_FILLING,
  E_STATISTICS,
  E_FORMAT_KEY,
  E_FORMAT_TIME,
  E_FORMAT_DATE,
  E_CURRENCY_KEY,
  E_FORMAT_NEGATIVE,
  E_CONDITION_RULES_KEY,
  E_HEADER_EDIT_TOOLBAR_KEY,
  E_HEADER_EDIT_TOOLBAR_CONTROL,
} from './enums';

export type TDeepPartial<T> = {
  [U in keyof T]?: T[U] extends object ? TDeepPartial<T[U]> : T[U];
};
export type TDeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? TDeepRequired<T[P]> : T[P];
};

export type TOptionsItem<T = string> = { label: string; value: T };
export type TOptions<T = string> = Array<TOptionsItem<T>>;

export type TTableParserCellAdditionalAttributes = {
  elementId: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type TTableParserCellInfo = {
  tagName: string;
  textContent: string | null;
  attributes: Record<string, string>;
} & TTableParserCellAdditionalAttributes;

export type TAxesType = 'number' | 'log' | 'category' | 'groupedCategory' | 'time';
export type IBaseCellDataType = 'text' | 'number' | 'boolean' | 'date' | 'dateString' | 'object';
export type TTypeValue = 'column' | 'bar' | 'area' | 'nothing';

export interface IRange {
  startRowIndex: number;
  endRowIndex: number;
  columnKeys: Array<string>;
}

export interface IRangeCross {
  crossStart: number;
  crossEnd: number;
}
export interface IrangeMain {
  mainStart: number;
  mainEnd: number;
}

export type TRangeCross = IRangeCross & IrangeMain;

export interface ISignCell {
  rowIndex: number;
  field: string;
}

export interface IDataGridChart {
  // eslint-disable-next-line no-use-before-define
  columnDefs: Array<IDataGridChartColumnDefs>;
  max?: number;
  width?: number;
  height?: number;
  type?: TTypeValue;
  data?: Array<any>;
  series?: Array<any>;
  suppressNavigate?: boolean;
  palette?: Partial<AgChartThemePalette>;
}

export interface IDataGridChartColumnDefs extends Omit<IDataGridChart, 'columnDefs'> {
  field: string;
}

export interface TDeltaConfigContentConditionRules {
  // 标识
  key: string;
  // 范围
  range: string;
  // 填充方式
  filling: E_FILLING;
  // 类型
  type: E_CONDITION_RULES_KEY;
  // 最大/正向相关参数
  endValue: number | '';
  endColor: string;
  endMode: 'auto' | 'number';
  // 最小/负向相关参数
  startColor: string;
  startValue: number | '';
  startMode: 'auto' | 'number';
}

export interface IDeltaConfigGrid {
  pinning?: IRange;
  column: {
    showStatisticsKey: Array<E_STATISTICS>;
  };
  row: any;
  conditionRules?: Array<TDeltaConfigContentConditionRules>;
}

export interface IDeltaConfigContentCellStyle {
  cellStyle?: CSSProperties;
}
export interface IDeltaConfigContentCellClass {
  cellClass?: Array<string>;
}
export interface IDeltaConfigContentSpanning {
  spanning?: {
    row?: number;
    column?: number;
  };
}
export interface IValueFormatterNumber {
  key: E_FORMAT_KEY.NUMBER;
  decimal: number;
  thousandths: boolean;
  negative: E_FORMAT_NEGATIVE;
}

export interface IValueFormatterCurrency {
  key: E_FORMAT_KEY.CURRENCY;
  decimal: number;
  sign: E_CURRENCY_KEY;
  negative: E_FORMAT_NEGATIVE;
}

export interface IValueFormatterPercent {
  key: E_FORMAT_KEY.PERCENT;
  decimal: number;
}

export interface IValueFormatterUnset {
  key: E_FORMAT_KEY.UNSET;
}
export interface IValueFormatterTime {
  key: 'time';
  time: E_FORMAT_TIME;
}

export interface IValueFormatterDate {
  key: E_FORMAT_KEY.DATE;
  date: E_FORMAT_DATE;
}

export type TValueFormat =
  | IValueFormatterNumber
  | IValueFormatterCurrency
  | IValueFormatterPercent
  | IValueFormatterUnset
  // | IValueFormatterTime
  | IValueFormatterDate;

export type TValueFormatFormData = {
  decimal: number;
  key: E_FORMAT_KEY;
  time: E_FORMAT_TIME;
  date: E_FORMAT_DATE;
  sign: E_CURRENCY_KEY;
  thousandths: boolean;
  negative: E_FORMAT_NEGATIVE;
};
export interface IValueFormatter {
  valueFormatter?: TValueFormat;
}

export interface IGridConfig {
  suppressRowHeader: boolean;
  suppressColHeader: boolean;
}

export type TDeltaConfigContentItem = IDeltaConfigContentCellStyle &
  IDeltaConfigContentCellClass &
  IDeltaConfigContentSpanning &
  IValueFormatter;
export type TDeltaConfigContent = Record<string, TDeltaConfigContentItem>;
export interface IDeltaConfig {
  multiCopy: boolean;
  editable: boolean;
  gridConfig: IGridConfig;
  chart: IDataGridChart;
  paging: {
    verticalDistance: number;
    horizontalDistance: number;
    pageSize: number;
    pageIndex: number;
    count: number;
  };
  grid: IDeltaConfigGrid;
  content: Array<TDeltaConfigContent>;
}

export type TContent = IDeltaConfig['content'];

export interface ITdgCopyOptions {
  /**
   * 值与值之间的连字符
   * 默认为 \t
   */
  valueSeparator?: string;
  /**
   * 行与行之间的连字符
   * 默认为 \n
   */
  rowsSeparator?: string;
  /**
   * 包含表头
   */
  includeHeaders?: boolean;
  /**
   * 回调函数
   */
  callback?: (text: string) => void;
}

export interface IBaseActiveCell extends IRange {
  columns: Array<Column>;
}

export interface IHeaderComponentAppendParams {
  chart: IDeltaConfig['chart'];
}

export interface IDGContext {
  content: TContent;
  grid: IDeltaConfig['grid'];
  editable: IDeltaConfig['editable'];
  isEditing: boolean;
  isCellFocus: boolean;
  uuid: string;
  gridConfig: IGridConfig;
  rootRef: () => Element | null;
}
export interface IAgGridCommon {
  api: GridApi;
  context: IDGContext;
  columnApi: ColumnApi;
}

export interface IChangeProps extends Pick<IDGContext, 'content' | 'grid'> {
  rowData: Array<Record<string, any>>;
  columnDefs: Array<ColDef>;
}
export type TChangeProps = Partial<IChangeProps>;

export type TEmitEditChange = (params?: TChangeProps) => void;
export interface IContextMenuCallbackAppend {
  key: string;
  params: GetContextMenuItemsParams;
}

export interface IGridEmitEditChange {
  suppressRowHeader: boolean;
  suppressColHeader: boolean;
}

export type TSTate = Omit<TDeltaConfigContentConditionRules, 'range' | 'key'>;

/**
 * 头部工具栏的属性
 */
export interface IHeaderEditToolbar {
  key: E_HEADER_EDIT_TOOLBAR_KEY;
  control: E_HEADER_EDIT_TOOLBAR_CONTROL;
  name?: string;
  icon?: string;
  title?: string;
  active?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
  childIcon?: boolean;
  svgIcon?: string;
  option?: Array<string>;
  subMenu?: Array<IHeaderEditToolbar>;
  placeholder?: string;
  selectOptions?: Array<{ label: string | number; value: string | number }>;
}

export type TDataBarParams = TSTate & {
  visible: boolean;
};

// 历史记录内容及对象
export type THistoryItem = IChangeProps | undefined;
export interface IHistoryResult {
  baseState: THistoryItem;
  undoStack: Array<THistoryItem>;
  historyStack: Array<THistoryItem>;
  current: THistoryItem;
}
