import { AgGridVue } from 'ag-grid-vue3';
import { Popup as TPopup } from '../../popup';
import { Dialog as TDialog } from '../../dialog';
import RootAttach from '../components/RootAttach.vue';
import DataBar from '../components/render/DataBar.vue';
import HeaderToolbar from '../components/HeaderToolbar.vue';
import agColumnHeader from '../components/ColumnHeader.vue';
import LoadingOverlay from '../components/LoadingOverlay.vue';

// SideBar
import SideBarRules from '../components/CustomizeSizeBar/Rules.vue';
import CellFormat from '../components/CustomizeSizeBar/CellFormat.vue';
import CreateSizeBarRules from '../components/CustomizeSizeBar/CreateRules.vue';

export const dataGridComponents = {
  TPopup,
  TDialog,
  DataBar,
  AgGridVue,
  RootAttach,
  HeaderToolbar,
  LoadingOverlay,
  agColumnHeader,

  // SideBar Components
  CellFormat,
  SideBarRules,
  CreateSizeBarRules,
};
