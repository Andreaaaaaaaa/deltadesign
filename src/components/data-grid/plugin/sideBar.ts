import { GridApi } from 'ag-grid-community';
import { eventBus } from '../class';
import { TEmitEditChange } from '../types';
import { clearSidebarAttachChildren } from '../utils';
import { E_EVENT_BUS_KEY, E_SIDE_BAR_PANEL_KEY } from '../enums';

const sideBarWidth = 280;

interface ISideBarToolPanelParams {
  onChange: TEmitEditChange;
}

export const sideBarToolPanels = ({ onChange }: ISideBarToolPanelParams) => {
  const cache = Object.keys(E_SIDE_BAR_PANEL_KEY).map((key) => ({
    id: E_SIDE_BAR_PANEL_KEY[key as keyof typeof E_SIDE_BAR_PANEL_KEY],
    labelKey: key,
    labelDefault: key,
    width: sideBarWidth,
    minWidth: sideBarWidth,
    maxWidth: sideBarWidth,
    toolPanel: E_SIDE_BAR_PANEL_KEY[key as keyof typeof E_SIDE_BAR_PANEL_KEY],
    toolPanelParams: { onChange },
  }));
  console.log('cache', cache);

  return cache;
};

export const closeBarToolPanels = (api: GridApi) => {
  // 需要先将所有的挂载节点清除以后，才能关闭
  clearSidebarAttachChildren(api);
  api.hideOverlay();
  api.setSideBarVisible(false);
};

export const openBarToolPanelsByKey = (api: GridApi, key: E_SIDE_BAR_PANEL_KEY, uuid?: string) => {
  // 先将所有的关闭
  closeBarToolPanels(api);
  // 所有的测边栏展开都设置蒙层
  api.showLoadingOverlay();

  // 触发事件
  switch (key) {
    case E_SIDE_BAR_PANEL_KEY.CREATE_SIDE_BAR_RULES:
      eventBus.emit(E_EVENT_BUS_KEY.CREATE_RULES, { uuid });
      break;
    case E_SIDE_BAR_PANEL_KEY.CELL_FORMAT:
      eventBus.emit(E_EVENT_BUS_KEY.FORMATTER, { uuid });
      break;
    default:
  }

  if (!api.isSideBarVisible()) {
    api.setSideBarVisible(true);
  }
  api.openToolPanel(key);
};
