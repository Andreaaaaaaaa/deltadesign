export interface RangeValue {
  type: string;
  time: (Date | undefined)[];
}

export interface InnerRangeValue extends RangeValue {
  isCompare: boolean;
}

export type PickerTypeString = 'Hms' | 'Hm' | 'H';

export interface RangeTimeOption {
  title: string;
  type: string;
  regex?: RegExp;
  relative?: boolean;
  isCompare?: boolean;
  time: (() => Date[]) | Date[];
  mode?: 'month' | 'date' | 'week' | PickerTypeString;
  isCustom?: boolean
  hide?: boolean;
  group?: string;
}

export interface SingleRangeValue {
  type: string;
  time: Date;
}

export interface SingleInnerRangeValue extends SingleRangeValue {
  isCompare: boolean;
}

export interface SingleRangeTimeOption {
  title: string;
  type: string;
  regex?: RegExp;
  relative?: boolean;
  isCompare?: boolean;
  time: (() => Date[]) | (() => Date) | Date[] | Date;
  mode?: 'month' | 'date' | 'week' | PickerTypeString;
  isCustom?: boolean
  hide?: boolean;
  group?: string;
}

export interface GroupOption {
  title: string;
  id: string;
  children: RangeTimeOption[] | SingleRangeTimeOption[];
}

export interface DisableDataObj {
  from?: Date;
  to?: Date;
  before?: Date;
  after?: Date;
}

export type DisableDateType = (dateValue: Date) => boolean | Date[] | DisableDataObj;

export interface DateObj {
  year: number;
  month: number;
}

export interface OptionsType {
  firstDayOfWeek?: number;
  minDate?: Date;
  maxDate?: Date;
  monthLocal?: string[];
  disableDate?: (dateValue: Date) => boolean;
  timeOffset?: number;
  showWeekOfYear?: boolean;
}

export interface DayDate {
  text: number | string;
  active: boolean;
  value: Date;
  type: string;
  now?: boolean;
  firstDayOfMonth?: boolean;
  lastDayOfMonth?: boolean;
  additional?: boolean; // 是否当前月
  disabled?: boolean;
  isWeekNum?: boolean;
}

export interface YearDate {
  text: number | string;
  active: boolean;
  value: Date;
  now?: boolean;
}

export interface MonthDate {
  text: number | string;
  active: boolean;
  value: Date;
  now?: boolean;
  disabled?: boolean;
}

export interface DateTime extends DayDate, YearDate, MonthDate {
  highlight: boolean;
  startOfRange: boolean;
  endOfRange: boolean;
  activeCompare?: boolean;
  highlightCompare?: boolean;
  startOfRangeCompare?: boolean;
  endOfRangeCompare?: boolean;
}

export interface ActiveOptions {
  start?: Date;
  end?: Date;
  type: string;
  clickStart?: Date;
  clickEnd?: Date;
  mouseValue?: Date;
  activeTimeIndex?: number;
  isSingleDate?: boolean;
  firstDayOfWeek?: number;
  realType?: string;
}

export interface RangePickerSelectOption {
  label: string;
  value: number;
}

export interface RecycleScrollerItem {
  id: string;
  type: string;
  data: (DayDate | YearDate | MonthDate)[][];
  year: number;
  month: number;
  size: number;
  sumSize: number;
}
