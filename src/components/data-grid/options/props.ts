import { PropType } from 'vue';
import { ColDef, MenuItemDef, GetContextMenuItemsParams } from 'ag-grid-community';
import { AG_GRID_LOCALE_EN } from '../locale';
import { deltaConfigDefault } from '../constant';
import { TDeepPartial, IDeltaConfig } from '../types';

export const dataGridProps = {
  width: {
    type: [Number, String],
    default: 800,
  },
  height: {
    type: [Number, String],
    default: 500,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  domLayout: {
    type: String as PropType<'autoHeight' | 'normal'>,
    default: 'normal',
  },
  columnDefs: {
    type: Array as PropType<Array<ColDef>>,
    required: true,
    default() {
      return [];
    },
  },
  localeText: {
    type: Object as PropType<{ [key: string]: string }>,
    default() {
      return AG_GRID_LOCALE_EN;
    },
  },
  deltaConfig: {
    type: Object as PropType<TDeepPartial<IDeltaConfig>>,
    default() {
      return deltaConfigDefault;
    },
  },
  defaultColDef: {
    type: Object as PropType<ColDef>,
    default() {
      return {};
    },
  },
  getContextMenuItems: {
    type: Function as PropType<(params: GetContextMenuItemsParams) => Array<MenuItemDef | string>>,
    default() {
      return [];
    },
  },
};
