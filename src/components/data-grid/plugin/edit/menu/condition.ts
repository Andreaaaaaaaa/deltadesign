import { GetContextMenuItemsParams } from 'ag-grid-community';
import { localeStore } from '../../../locale';
import { E_SIDE_BAR_PANEL_KEY } from '../../../enums';
import { openBarToolPanelsByKey } from '../../sideBar';

export const supportMenuCondition = (params: GetContextMenuItemsParams) => {
  const locale = localeStore.getLocals();

  return {
    name: locale.conditionalFormat,
    action: () => openBarToolPanelsByKey(params.api, E_SIDE_BAR_PANEL_KEY.SIDE_BAR_RULES),
  };
};
