import * as clipboard from 'clipboard-polyfill';
import { GridApi, GetContextMenuItemsParams } from 'ag-grid-community';
import { localeStore } from '../locale';
import { IBaseActiveCell, ITdgCopyOptions, TContent } from '../types';
import { createData, getAllRowData, getRangeInfo, generateClipboard, obtainDataStyleByRange } from '../utils';

/**
 * 复制到剪切板
 */
export const copyTo = (data: { html: string; plain: string }) => {
  const clipboardItem = Object.entries(data).reduce((acc, curVal) => {
    const [key, value] = curVal;
    const type = `text/${key}`;
    acc[type] = new Blob([value], { type });
    return acc;
  }, {} as { [key: string]: Blob });
  const item = new clipboard.ClipboardItem(clipboardItem);
  clipboard.write([item]);
};

/**
 * 触发复制
 */
export const triggerCopy = (api: GridApi, includeHeaders?: boolean) => {
  // 做个小延时，为了复用上面的重新选定范围onchange回调（重新计算选中的行列是否合法）
  setTimeout(() => {
    api.copySelectedRangeToClipboard({ includeHeaders });
  }, 500);
};

/**
 * 复制范围内的值
 */
export const copyRangeData = (
  api: GridApi,
  content: TContent,
  config: { tableData?: Array<Array<string>>; rangeInfo?: IBaseActiveCell; columnDefs?: any },
) => {
  const innerRangeInfo = config?.rangeInfo || getRangeInfo(api);
  let innerTableData = config?.tableData || [];
  let innerHeader: Array<string> = [];
  const isFilter = api.isAnyFilterPresent();

  // let innerContent: Array<Record<string, any>> = [...content];
  /**
   * 判断选中区域与实际发过来的数据长度做对比，如果不一致，说明带了表头
   */
  if (innerRangeInfo.endRowIndex - innerRangeInfo.startRowIndex + 1 < (config.tableData || [])?.length) {
    const [header, ...restData] = config.tableData || [];
    innerTableData = [...restData];
    innerHeader = [...header];
  }

  const rangeData = obtainDataStyleByRange(api, content, innerRangeInfo, innerTableData);
  const { html, plain } = generateClipboard(
    innerHeader.length > 0 ? [innerHeader.map((item) => ({ textContent: item })), ...rangeData] : rangeData,
    isFilter,
  );
  copyTo({ html, plain });
};

/**
 * 复制单元格
 */
export const tdgCopyCell = (menuParams: GetContextMenuItemsParams, options?: ITdgCopyOptions) => {
  const { api } = menuParams;
  const rangeInfo = getRangeInfo(api);
  api.clearRangeSelection();
  api.addCellRange({
    rowEndIndex: rangeInfo.endRowIndex,
    rowStartIndex: rangeInfo.startRowIndex,
    columns: rangeInfo.columns,
  });

  triggerCopy(api, options?.includeHeaders);
};

/**
 * 复制行
 */
export const tdgCopyRows = (menuParams: GetContextMenuItemsParams, options?: ITdgCopyOptions) => {
  const { api, columnApi } = menuParams;
  const [cellRanges] = api.getCellRanges() || [{ startRow: { rowIndex: 0 }, endRow: { rowIndex: 0 } }];
  const rowStartIndex = Math.min(cellRanges.startRow?.rowIndex || 0, cellRanges.endRow?.rowIndex || 0);
  const rowEndIndex = Math.max(cellRanges.startRow?.rowIndex || 0, cellRanges.endRow?.rowIndex || 0);

  api.clearRangeSelection();
  api.addCellRange({
    rowEndIndex,
    rowStartIndex,
    columns: columnApi.getAllDisplayedColumns(),
  });

  triggerCopy(api, options?.includeHeaders);
};

/**
 * 复制列
 */
export const tdgCopyColums = (menuParams: GetContextMenuItemsParams, options?: ITdgCopyOptions) => {
  const { api } = menuParams;
  const [{ columns }] = api.getCellRanges() || [{ columns: [] }];
  const columnKeys = columns.map((col) => col.getColDef().field || '');

  api.clearRangeSelection();
  api.addCellRange({
    rowEndIndex: api.getDisplayedRowCount() - 1,
    rowStartIndex: 0,
    columns: columnKeys,
  });

  triggerCopy(api, options?.includeHeaders);
};

/**
 * 复制所有
 */
export const tdgCopyAll = (menuParams: GetContextMenuItemsParams, options?: ITdgCopyOptions) => {
  const { api, columnApi } = menuParams;

  api.clearRangeSelection();
  api.addCellRange({
    rowEndIndex: api.getDisplayedRowCount() - 1,
    rowStartIndex: 0,
    columns: columnApi.getAllDisplayedColumns(),
  });

  triggerCopy(api, options?.includeHeaders);
};

export const supportMenuCopy = (params: GetContextMenuItemsParams) => {
  const locale = localeStore.getLocals();
  return {
    name: locale.copy,
    subMenu: [
      {
        name: locale.copyCell,
        action: () => tdgCopyCell(params),
      },
      {
        name: locale.copyRows,
        action: () => tdgCopyRows(params),
      },
      {
        name: locale.copyColums,
        action: () => tdgCopyColums(params),
      },
      {
        name: locale.copyAll,
        action: () => tdgCopyAll(params),
      },
    ],
  };
};

export const supportMenuCopyIncludeHeaders = (params: GetContextMenuItemsParams) => {
  const locale = localeStore.getLocals();
  return {
    name: locale.copyWithHeaders,
    subMenu: [
      {
        name: locale.copyCell,
        action: () => tdgCopyCell(params, { includeHeaders: true }),
      },
      {
        name: locale.copyRows,
        action: () => tdgCopyRows(params, { includeHeaders: true }),
      },
      {
        name: locale.copyColums,
        action: () => tdgCopyColums(params, { includeHeaders: true }),
      },
      {
        name: locale.copyAll,
        action: () => tdgCopyAll(params, { includeHeaders: true }),
      },
    ],
  };
};

export const supportMenuBase = (params: GetContextMenuItemsParams) => {
  const locale = localeStore.getLocals();
  const cut = {
    name: locale.cut,
    shortcut: locale.ctrlX,
    action: () => 'cut',
  };
  const paste = {
    name: locale.paste,
    shortcut: locale.ctrlV,
    disabled: true,
    action: () => 'paste',
  };
  return ['cut', supportMenuCopy(params), 'paste'];
};
