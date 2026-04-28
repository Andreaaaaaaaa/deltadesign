import { GetContextMenuItemsParams } from 'ag-grid-community';
import { TChangeProps } from '../../../types';
import { localeStore } from '../../../locale';
import { getRangeInfo } from '../../../utils';
import { insertRow, delectRows } from '../crud';

export const supportMenuRows = (params: GetContextMenuItemsParams, callback: (params: TChangeProps) => void) => {
  const locale = localeStore.getLocals();
  const { startRowIndex, endRowIndex } = getRangeInfo(params.api);
  const selectRows = endRowIndex - startRowIndex + 1;

  // 最后一行不能删除
  const deletabled = (params.api.getDisplayedRowCount() || 0) - selectRows >= 1;

  return [
    {
      name: `${locale.insertAbove} ${selectRows} ${locale.row}`,
      action: () => {
        const result = insertRow(params, startRowIndex, selectRows);
        callback(result);
      },
    },
    {
      name: `${locale.insertBelow} ${selectRows} ${locale.row}`,
      action: () => {
        const result = insertRow(params, endRowIndex + 1, selectRows);
        callback(result);
      },
    },
    {
      name: locale.deleteSelectedRow,
      action: () => {
        if (deletabled) {
          const result = delectRows(params, startRowIndex, selectRows);
          callback(result);
        } else {
          // eslint-disable-next-line no-alert
          window.alert(locale.cannotDeleteAllRows);
        }
      },
    },
  ];
};
