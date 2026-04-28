import { GetContextMenuItemsParams } from 'ag-grid-community';
import { localeStore } from '../../../locale';
import { TChangeProps, IContextMenuCallbackAppend } from '../../../types';

export const supportMenuFormat = (
  params: GetContextMenuItemsParams,
  callback: (params: TChangeProps, append?: IContextMenuCallbackAppend) => void,
) => {
  const locale = localeStore.getLocals();

  return {
    name: locale.format,
    action: () => {
      callback({}, { key: 'format', params });
    },
  };
};
