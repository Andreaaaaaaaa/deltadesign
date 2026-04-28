import { GridApi } from 'ag-grid-community';
import { E_SIDE_BAR_PANEL_KEY } from '../enums';

const sidebarMappingId = {
  // 管理规则
  // [E_SIDE_BAR_PANEL_KEY.SIDE_BAR_RULES]: 'SideBarRules',
  // 添加管理规则
  [E_SIDE_BAR_PANEL_KEY.CREATE_SIDE_BAR_RULES]: 't-data-grid-create-rules-select-attach',
  // 单元格格式
  [E_SIDE_BAR_PANEL_KEY.CELL_FORMAT]: 't-data-grid-cell-format-select-attach',
};

const formatMappingId: Array<string> = [
  't-data-grid-format-currency-select-attach',
  't-data-grid-format-date-select-attach',
  't-data-grid-format-time-select-attach',
];

const hideTargetElement = (target: HTMLElement) => {
  const popupDom = target.getElementsByClassName('t-popup');

  Array.from(popupDom).forEach((element) => {
    (element as HTMLElement).style.display = 'none';
  });
};

export const clearSidebarAttachChildren = (gridApi: GridApi) => {
  const currentShowId = gridApi.getOpenedToolPanel() as E_SIDE_BAR_PANEL_KEY;
  Object.entries(sidebarMappingId).forEach((currentVal) => {
    const [key, id] = currentVal;
    if (key === currentShowId) {
      const target = document.getElementById(id);
      if (target) {
        hideTargetElement(target);
      }
    }
  });
};

export const clearFormatAttachChildren = (currentShowId: string) => {
  formatMappingId.forEach((id) => {
    if (id !== currentShowId) {
      const target = document.getElementById(id);
      if (target) {
        hideTargetElement(target);
      }
    }
  });
};
