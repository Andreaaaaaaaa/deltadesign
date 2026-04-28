import { ColDef } from 'ag-grid-community';
import { HEADER_MENU_TABS } from '../constant';

export const innerDefaultColumnDefs: (editable?: boolean) => ColDef = (editable = false) => ({
  flex: 1,
  editable,
  minWidth: 20,
  filter: false,
  resizable: true,
  lockPinned: true,
  enablePivot: true,
  enableValue: true,
  sortable: !editable,
  wrapHeaderText: true,
  enableRowGroup: true,
  floatingFilter: false,
  /**
   * 默认关闭拖动，如果开启了图表功能，可能会造成误操作，其他功能也会收到影响，需要慎重开启
   * 尤其是列的顺序可能会收到影响，range区域会变化
   */
  suppressMovable: true,
  autoHeaderHeight: true,
  menuTabs: editable ? [] : HEADER_MENU_TABS,
  ...(editable ? { useValueParserForImport: true, useValueFormatterForExport: true } : {}),
});
