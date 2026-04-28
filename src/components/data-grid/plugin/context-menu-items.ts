import { MenuItemDef, GetContextMenuItemsParams } from 'ag-grid-community';
import { ROW_HEADER_FIELD_NAME } from '../constant';
import { supportMenuPinning } from './edit/menu/pinning';
import { IDeltaConfig, TChangeProps, IContextMenuCallbackAppend } from '../types';
import { supportMenu, supportMenuCopy, supportMenuCopyIncludeHeaders } from '../plugin';

export const contextMenuItems = (
  params: GetContextMenuItemsParams,
  deltaConfig: IDeltaConfig,
  appendContextMenuItems: (params: GetContextMenuItemsParams<any, any>) => (string | MenuItemDef)[],
  menuCallback: (params: TChangeProps, append?: IContextMenuCallbackAppend) => void,
) => {
  // row header 禁用菜单
  const currentColumn = params?.column?.getColDef().field;
  if (!currentColumn || currentColumn === ROW_HEADER_FIELD_NAME) {
    return;
  }
  const { multiCopy, editable } = deltaConfig;
  // 启用菜单功能
  const cache: Array<MenuItemDef | string> = [];
  if (!editable && multiCopy) {
    cache.push(
      supportMenuCopy(params),
      supportMenuCopyIncludeHeaders(params),
      // 'separator',
      // // 冻结
      // supportMenuPinning(params),
    );
  }

  if (editable) {
    const menu = supportMenu(params, menuCallback);
    cache.push(...menu);
  }
  // eslint-disable-next-line consistent-return
  return (appendContextMenuItems?.(params) || []).concat(cache);
};
