import { GetContextMenuItemsParams } from 'ag-grid-community';
import { TChangeProps } from '../../../types';
import { localeStore } from '../../../locale';
import { insertColumn, deleteColumn } from '../crud';

export const supportMenuColumns = (params: GetContextMenuItemsParams, callback: (params: TChangeProps) => void) => {
  const locale = localeStore.getLocals();
  const [selectRanges] = params.api.getCellRanges() || [];
  const [firstColumn] = selectRanges.columns;
  const [lastColumn] = [...selectRanges.columns].reverse();
  const selectKey = selectRanges.columns.map((item) => item.getColDef().field || '').filter((item) => Boolean(item));
  const count = selectRanges.columns.length;

  const canDelete = params.columnApi.getAllDisplayedColumns().length - count >= 1;

  const handleInsert = (key: 'left' | 'right') => {
    const field = key === 'left' ? firstColumn.getColDef().field : lastColumn.getColDef().field;
    const result = insertColumn(params, field || '', count, key);
    callback(result);
  };

  return [
    {
      name: `${locale.insertLeft} ${count} ${locale.column}`,
      action: () => handleInsert('left'),
    },
    {
      name: `${locale.insertRight} ${count} ${locale.column}`,
      action: () => handleInsert('right'),
    },
    {
      name: locale.deleteSelectedColumns,
      action: () => {
        if (canDelete) {
          const result = deleteColumn(params, selectKey);
          callback(result);
        } else {
          // eslint-disable-next-line no-alert
          window.alert(locale.cannotDeleteAllColumns);
        }
      },
    },
  ];
};
