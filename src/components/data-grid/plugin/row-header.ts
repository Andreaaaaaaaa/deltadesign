import { ColDef } from 'ag-grid-community';
import { ROW_HEADER_FIELD_NAME } from '../constant';

export const rowHeaderColumnDef: ColDef = {
  headerName: '',
  field: ROW_HEADER_FIELD_NAME,
  width: 60,
  minWidth: 60,
  sortable: false,
  lockVisible: true,
  suppressMovable: true,
  suppressSizeToFit: true,
  suppressMenu: true,
  resizable: false,
  lockPosition: 'left',
  filter: false,
  pinned: 'left',
  valueGetter: 'isNaN(Number(node.id))? "" : Number(node.id) + 1',
  // cellClass: 'row-header',
  cellStyle: {
    // textAlign: 'center',
    color: '#374774',
    backgroundColor: '#F2F4F7',
  },
  getQuickFilterText: () => '',
};
