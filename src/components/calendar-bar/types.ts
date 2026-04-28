import { TooltipListItem } from './tooltip-item/const';
export const enum CalendarItemType {
  DayByDay = 'DayByDay',
  EventUnity = 'EventUnity',
}

export interface CalendarDetailValueItem {
  name: string;
  key: string;
  start: number;
  end: number;
  oriStart?: number;
  oriEnd?: number;
  type?: string[];
  color?: string[];
}

export interface CalendarDetailItem extends CalendarDetailValueItem {
  value: CalendarDetailValueItem[];
}

export interface CalendarDetailItemFormat extends CalendarDetailItem {
  rootType?: string;
  zIndex?: number;
  style?: string;
  tooltipList?: TooltipListItem[];
  overlapText?: string;
  options?: DropdownOptionsItem[]; // 是否有重叠选项，和overlapText一同存在
  type?: string[];
}

export interface CalendarItem {
  name: string;
  key: string;
  type: CalendarItemType;
  value: CalendarDetailItem[];
}

export interface NewCalendarItem {
  name: string;
  key: string;
  type: CalendarItemType;
  value: CalendarDetailItemFormat[];
}

export interface DropdownOptionsItem {
  // 下拉菜单定义值,origin为日历原始值
  content: string;
  value: string;
  active: boolean;
  disabled: boolean;
  origin?: CalendarDetailItem;
}
