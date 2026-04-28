import lodash from 'lodash';
import { ColDef, GridApi, CellStyle, CellStyleFunc, CellClassParams } from 'ag-grid-community';
import { TContent } from './types';

/**
 * 解决换行 + 合并单元格的bug
 */
export const fixWrapTextAndSpanning = (
  api: GridApi,
  content: TContent,
  colDef: Array<ColDef>,
  spanningHeightInfo: Record<string, number>,
) => {
  const segmentation = '~_~';
  const cacheHeight = {} as { [key: string]: number };
  // 重新计算单元格跨越
  // 为了解决换行以后高度异常问题
  content.forEach((item, rowIndex) =>
    Object.entries(item).forEach(([field, value]) => {
      const { spanning } = value;
      if (spanning?.row && spanning?.row > 1) {
        const spanningRowIndex = new Array(spanning.row).fill(0).map((_, index) => String(rowIndex + index));
        let cacheInnerHeight = 0;
        spanningRowIndex.forEach((targetRowIndex) => {
          const tRow = api.getRowNode(targetRowIndex);
          const rowHei = tRow?.rowHeight;
          cacheInnerHeight += rowHei || 0;
        });
        cacheHeight[`${rowIndex}${segmentation}${field}`] = cacheInnerHeight;
      }
    }),
  );

  if (!lodash.isEqual(cacheHeight, spanningHeightInfo)) {
    const newColumnDefs = [...colDef];
    Object.entries(cacheHeight).forEach(([key, value]) => {
      const [rowIndexString, fieldMark] = key.split(segmentation);
      const rowIndexMark = Number(rowIndexString);
      const columnIndex = newColumnDefs.findIndex((item) => item.field === fieldMark);
      if (columnIndex >= 0 && fieldMark) {
        const targetColumn = newColumnDefs[columnIndex];
        newColumnDefs[columnIndex] = {
          ...targetColumn,
          cellStyle: (params: CellClassParams) => {
            const { rowIndex } = params;
            let cacheCellStyle = {} as CellStyle;
            if (typeof targetColumn?.cellStyle === 'function') {
              cacheCellStyle = (targetColumn.cellStyle as CellStyleFunc)(params) || ({} as CellStyle);
            } else {
              cacheCellStyle = (targetColumn.cellStyle || {}) as CellStyle;
            }
            if (rowIndex === rowIndexMark) {
              return {
                ...cacheCellStyle,
                height: `${value}px`,
              };
            }
            return cacheCellStyle;
          },
        };
      }
    });
    api.setColumnDefs(newColumnDefs);
    return cacheHeight;
  }
  return null;
};
