import { SetupContext } from 'vue';
import { BodyScrollEndEvent } from 'ag-grid-community';
/**
 * 触底事件
 */
export const bottomingEvent = (event: BodyScrollEndEvent, emit: SetupContext['emit']) => {
  const { direction, api, columnApi } = event;
  if (direction === 'horizontal') {
    const displayColumns = columnApi.getAllDisplayedVirtualColumns();
    const displayColumnsKey = displayColumns.map((item) => item.getColDef().field);
    emit('horizontalVirtualColumnsChanged', {
      columns: displayColumns,
      columnsKey: displayColumnsKey,
    });
  } else if (direction === 'vertical') {
    const displayRowFirst = api.getFirstDisplayedRow();
    const displayRowLast = api.getLastDisplayedRow();
    const displayRows = [];
    // eslint-disable-next-line no-plusplus
    for (let i = displayRowFirst; i <= displayRowLast; i++) {
      const rowNode = api.getDisplayedRowAtIndex(i);
      displayRows.push(rowNode);
    }
    emit('verticalVirtualColumnsChanged', {
      rows: displayRows,
      lastIndex: displayRowLast,
      firstIndex: displayRowFirst,
    });
  }
};
