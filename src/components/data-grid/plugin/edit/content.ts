import lodash from 'lodash';
import {
  ColDef,
  Column,
  IRowNode,
  ColSpanParams,
  RowSpanParams,
  CellClassParams,
  ICellRendererParams,
  ValueFormatterParams,
} from 'ag-grid-community';
import { formattedText } from '../../plugin';
import { TDeltaConfigContent, IDGContext, TContent } from '../../types';
import { isEqualStart, isNumericOrPercent, parseCellExpression, getConditionRule } from '../../utils';

const getTargetSpanning = (state: Array<TDeltaConfigContent>, node: IRowNode | null, column: Column) => {
  const base = {
    row: 1,
    column: 1,
  };
  const field = column.getColDef().field;
  if (node && node?.rowIndex !== null && field) {
    const targetContent = state[node.rowIndex]?.[field] || {};
    return lodash.merge({}, base, targetContent?.spanning || {});
  }
  return base;
};

export const appendContent: (colDef: Array<ColDef>, state: Array<TDeltaConfigContent>) => Array<ColDef> = (
  colDef,
  state,
) =>
  colDef.map((item) => {
    const { field: colField = '' } = item;
    const autoHeight = true;

    // state.forEach((rowItem) => {
    //   const { cellStyle } = rowItem[colField] || {};
    //   if (cellStyle?.whiteSpace === 'pre-wrap') {
    //     autoHeight = true;
    //   }
    // });

    return {
      ...item,
      autoHeight,
      wrapText: autoHeight,
      cellClassRules: {
        'column-spanning': (params: CellClassParams) => {
          const { node, column: columnNode, context } = params;
          const { column } = getTargetSpanning(context?.content, node, columnNode);
          return column > 1;
        },
        'row-spanning': (params: CellClassParams) => {
          const { node, column: columnNode, context } = params;
          const { row } = getTargetSpanning(context?.content, node, columnNode);
          return row > 1;
        },
      },
      rowSpan: (params: RowSpanParams) => {
        const { node, column, context } = params;
        const { row } = getTargetSpanning(context?.content, node, column);
        return row;
      },
      colSpan: (params: ColSpanParams) => {
        const { node, column: columnNode, context } = params;
        const { column } = getTargetSpanning(context?.content, node, columnNode);
        return column;
      },
      cellStyle: (params: CellClassParams) => {
        const {
          rowIndex,
          colDef: { field },
          context,
          columnApi,
        } = params;
        let calcCellStyle = {};
        if (field && context?.content?.[rowIndex]?.[field]) {
          const { conditionRules } = context.grid;
          const { cellStyle } = context.content?.[rowIndex]?.[field] || {};
          const target = getConditionRule(columnApi, { field, rowIndex }, conditionRules);
          calcCellStyle = Object.entries(cellStyle || {}).reduce(
            (acc, [key, value]) => {
              if (target && key.includes('background')) {
                return acc;
              }
              acc[key] = value;
              return acc;
            },
            {
              whiteSpace: 'pre-wrap',
            } as any,
          );
        }

        return calcCellStyle;
      },
      valueFormatter: (params: ValueFormatterParams) => {
        const { api, columnApi, context, value, colDef: paramsColDef, node } = params;
        // console.log('params', params);
        const field = paramsColDef.field || '';
        const { rowIndex } = node || {};

        let currentVal = value;

        // arithmetic start
        const isArithmetic = isEqualStart(currentVal);
        if (isArithmetic) {
          // 等号开头，则走运算逻辑
          const columnValue = parseCellExpression(api, columnApi, currentVal);
          currentVal = columnValue.replace(/=/g, '');

          try {
            if (currentVal) {
              // eslint-disable-next-line no-eval
              const evalValu = eval(currentVal);
              currentVal = evalValu;
            }
          } catch (e) {
            currentVal = '#NUM!';
          }
        }
        // arithmetic end

        // format start
        if (rowIndex !== undefined && rowIndex !== null && field) {
          const { valueFormatter } = (context.content as TContent)?.[rowIndex]?.[field] || {};
          if (valueFormatter?.key) {
            currentVal = formattedText[valueFormatter.key](currentVal, valueFormatter);
          }
        }
        // format end

        return currentVal;
      },
      cellRendererSelector: (params: ICellRendererParams<any, any, IDGContext>) => {
        const { rowIndex, columnApi, colDef: paramsColDef, context, value } = params;
        const { conditionRules } = { conditionRules: [], ...context.grid };
        const field = paramsColDef?.field || '';
        const target = getConditionRule(columnApi, { field, rowIndex }, conditionRules);

        // 必须是数字或者带百分比的数字
        if (target && isNumericOrPercent(value)) {
          // console.log('target', rowIndex, field, colIndex, target);
          return { component: 'DataBar', params: { renderData: target } };
        }
        return undefined;
      },
    };
  });
