import { AttachNode } from 'tdesign-vue-next/esm/common';
import { GetContextMenuItemsParams, GridApi } from 'ag-grid-community';
import { localeStore } from '../../../locale';
import { E_FORMAT_KEY } from '../../../enums';
import { DialogPlugin } from '../../../../dialog';
import { TChangeProps, IBaseActiveCell, TContent } from '../../../types';
import {
  isSpanning,
  isSingleCell,
  getRangeInfo,
  getAllRowData,
  getRangeRowData,
  clearRangeRowData,
  rangesUpdateContent,
} from '../../../utils';

export const handleSpanning = (
  api: GridApi,
  content: TContent,
  range: IBaseActiveCell,
  callback: (params: TChangeProps) => void,
) => {
  const { startRowIndex, endRowIndex, columnKeys } = range;
  const countColumn = columnKeys.length;
  const spanningTarget = columnKeys[0];
  const countRow = endRowIndex - startRowIndex + 1;

  // 重置单元格
  const resetContent = rangesUpdateContent(content, startRowIndex, endRowIndex, columnKeys, {
    spanning: {
      row: 1,
      column: 1,
    },
  });
  const newContent = rangesUpdateContent(resetContent, startRowIndex, startRowIndex, [spanningTarget], {
    spanning: {
      row: countRow,
      column: countColumn,
    },
  });
  const allData = getAllRowData(api);
  const newRowData = clearRangeRowData(
    allData,
    {
      startRowIndex,
      endRowIndex,
      columnKeys,
    },
    [{ rowIndex: startRowIndex, field: columnKeys[0] }],
  );

  callback({ content: newContent, rowData: newRowData });
};

export const handleUnspanning = (
  content: TContent,
  range: IBaseActiveCell,
  callback: (params: TChangeProps) => void,
) => {
  const { startRowIndex, endRowIndex, columnKeys } = range;
  const newContent = rangesUpdateContent(content, startRowIndex, endRowIndex, columnKeys, {
    spanning: {
      row: 1,
      column: 1,
    },
  });
  callback({ content: newContent });
};

export const handleSanningMerge = (
  api: GridApi,
  content: TContent,
  callback: (params: TChangeProps) => void,
  confirm?: {
    callback: (disabled: boolean) => void;
    attach: () => AttachNode;
  },
) => {
  const range = getRangeInfo(api);
  const { startRowIndex, endRowIndex, columnKeys } = range;
  const locale = localeStore.getLocals();

  /**
   * 这里要进行判断
   * 1、如果只有一个单元格，并且没有合并的情况下，则该功能不响应
   * 2、如果只有一个单元格，并且是合并的情况下，点击合并，则为拆分单元格
   * 3、如果多个单元格的情况下
   *  3.1、有非空内容的情况下，进行提示
   */
  const isSingle = isSingleCell(api, content);
  const isSpanningRange = isSpanning(api, content);
  if (!(isSingle && !isSpanningRange)) {
    if (isSingle && isSpanningRange) {
      // 单个单元格，且存在合并，执行拆分单元格
      handleUnspanning(content, range, callback);
      return;
    }
    // 合并单元格
    const [_, ...allCell] = getRangeRowData(api, range).flat(2);
    const rangeRowDataFlat = (allCell || []).filter((item) => Boolean(item));
    // 除去左上角的单元格其他单元格如果存在内容，则提示
    if (DialogPlugin && (startRowIndex !== endRowIndex || columnKeys?.length !== 1) && rangeRowDataFlat.length > 0) {
      confirm?.callback?.(true);
      const confirmDia = DialogPlugin.confirm({
        header: locale.mergeCellTips,
        body: locale.mergeCellConfirm,
        confirmBtn: locale.confirm,
        cancelBtn: locale.cancel,
        // theme: 'warning',
        showInAttachedElement: true,
        onConfirm: () => {
          handleSpanning(api, content, range as IBaseActiveCell, callback);
          confirm?.callback?.(false);
          confirmDia?.destroy?.();
        },
        onCancel: () => {
          confirm?.callback?.(false);
        },
      });
      return;
    }
    handleSpanning(api, content, range, callback);
  }
};

export const supportMenuCell = (params: GetContextMenuItemsParams, callback: (params: TChangeProps) => void) => {
  const locale = localeStore.getLocals();
  const { api, context } = params;
  const { columnKeys, columns, startRowIndex, endRowIndex } = getRangeInfo(api);

  const handleAlign = (align: 'left' | 'center' | 'right') => {
    const content = rangesUpdateContent(context.content, startRowIndex, endRowIndex, columnKeys, {
      cellStyle: {
        textAlign: align,
      },
    });
    callback({ content });
  };

  const clearStyle = () => {
    const content = rangesUpdateContent(
      context.content,
      startRowIndex,
      endRowIndex,
      columnKeys,
      {
        cellStyle: {},
        valueFormatter: {
          key: E_FORMAT_KEY.UNSET,
        },
      },
      true,
    );
    callback({ content });
  };

  const clearCell = () => {
    const allData = getAllRowData(api);
    const newData = allData.map((item, index) => {
      const emptyValue = columnKeys.reduce((acc, curVal) => {
        acc[curVal] = '';
        return acc;
      }, {} as Record<string, string>);
      if (index >= startRowIndex && index <= endRowIndex) {
        return {
          ...item,
          ...emptyValue,
        };
      }

      return item;
    });

    callback({ rowData: newData });
  };

  /**
   * 只选中一个单元格，合并以后也算一个
   */
  const onlyOneSpanning = isSingleCell(api, context.content);
  const isSpanningRange = isSpanning(api, context.content);

  return [
    {
      name: locale.mergeCell,
      disabled: onlyOneSpanning,
      action: () => handleSanningMerge(api, context.content, callback),
    },
    {
      name: locale.splitCell,
      disabled: !isSpanningRange,
      action: () => handleUnspanning(context.content, { columns, columnKeys, startRowIndex, endRowIndex }, callback),
    },
    {
      name: locale.cellEqually,
      disabled: true,
      action: () => 'align',
    },
    {
      name: locale.align,
      action: () => 'align',
      subMenu: [
        {
          name: locale.alignLeft,
          action: () => handleAlign('left'),
        },
        {
          name: locale.alignCenter,
          action: () => handleAlign('center'),
        },
        {
          name: locale.alignRight,
          action: () => handleAlign('right'),
        },
      ],
    },
    {
      name: locale.clear,
      action: () => 'clear',
      subMenu: [
        {
          name: locale.clearFromat,
          action: () => clearStyle(),
        },
        {
          name: locale.clearContent,
          action: () => clearCell(),
        },
      ],
    },
  ];
};
