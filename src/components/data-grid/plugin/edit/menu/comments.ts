import { GetContextMenuItemsParams } from 'ag-grid-community';
import { localeStore } from '../../../locale';

export const supportMenuCommments = (params: GetContextMenuItemsParams) => {
  const locale = localeStore.getLocals();
  return {
    name: locale.comment,
    disabled: true,
    action: () => '评论',
  };
};
