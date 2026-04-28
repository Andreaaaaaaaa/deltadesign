import { MenuItemDef, GetMainMenuItemsParams } from 'ag-grid-community';
import { IDGContext } from '../types';
import { localeStore } from '../locale';
import { E_STATISTICS } from '../enums';
import { STATISTICS_KEY } from '../constant';
/**
 * 自定义列菜单
 */
export const getMainMenuItems = (
  params: GetMainMenuItemsParams<any, IDGContext>,
  callback: (key: string, value: any) => void,
) => {
  const { defaultItems, context } = params;
  const append: Array<MenuItemDef | string> = ['separator'];
  const { grid } = context;
  const checkedList: Array<E_STATISTICS> = [...grid.column.showStatisticsKey];
  const locale = localeStore.getLocals();

  const menuAction = (key: E_STATISTICS) => {
    if (checkedList.includes(key)) {
      const actionIndex = checkedList.findIndex((item) => item === key);
      checkedList.splice(actionIndex, 1);
    } else {
      checkedList.push(key);
    }
    callback('statistics', checkedList);
  };

  const subMenu = STATISTICS_KEY.map((key) => ({
    name: locale[key],
    checked: checkedList.includes(key),
    action: () => menuAction(key),
  }));
  /**
   * 统计字段
   */
  append.push({
    name: locale.count,
    subMenu,
  });
  // if (append.length > 0) {
  //   append.push('separator');
  // }
  return [...defaultItems, ...append];
};
