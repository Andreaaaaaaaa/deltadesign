<template>
  <div ref="dataGridRootRef" class="t-data-grid-wrap">
    <TPopup :visible="context?.editable && context?.isCellFocus" :z-index="5">
      <template #content>
        <header-toolbar
          :context="context"
          :grid-api="gridApi"
          :range="currentRange"
          :history-info="historyInfo"
          :column-api="gridColumnApi"
          :style="{ width: style.width }"
          @history-click="handleHistoryClick"
          @emit-change="headerEditToolbarEmitChange"
          @emit-grid-edit-change="handleGridEditChange"
        />
      </template>
      <div />
    </TPopup>
    <ag-grid-vue
      v-bind="$attrs"
      ref="dataGridRef"
      :class="`${hiddenColHeader ? 'hide-ag-header-container' : ''} ag-theme-balham ag-theme-handson`"
      loading-overlay-component="LoadingOverlay"
      :style="style"
      :context="context"
      :side-bar="sideBar"
      :dom-layout="domLayout"
      :locale-text="innerLocaleText"
      :suppress-row-transform="true"
      :enable-range-selection="true"
      :column-defs="innerColumnDefs"
      :suppress-clipboard-api="true"
      :enable-cell-change-flash="true"
      :popup-parent="contextMenuParentRef"
      :send-to-clipboard="sendToClipboard"
      :default-col-def="innerDefaultColDef"
      :enable-fill-handle="context?.editable"
      :process-data-from-clipboard="() => []"
      :chart-tool-panels-def="chartToolPanelsDef"
      :get-main-menu-items="innerGetMainMenuItems"
      :get-chart-toolbar-items="getChartToolbarItems"
      :get-context-menu-items="innterGetContextMenuItems"
      :process-cell-from-clipboard="innerProcessCellFromClipboard"
      :loading-overlay-component-params="innerLoadingOverlayComponentParams"
      @click.stop="() => {}"
      @grid-ready="innerGridReady"
      @body-scroll="innerBodyScroll"
      @cell-clicked="innerCellClicked"
      @cell-key-down="innerCellKeyDown"
      @filter-changed="onFilterChanged"
      @body-scroll-end="innerBodyScrollEnd"
      @cell-context-menu="innerCellContextMenu"
      @cell-value-changed="innerCellValueChanged"
      @cell-editing-stopped="innerCellEditingStopped"
      @cell-editing-started="innerCellEditingStarted"
      @range-selection-changed="innerRangeSelectionChanged"
    ></ag-grid-vue>
    <RootAttach />
  </div>
</template>

<script lang="ts">
import lodash from 'lodash';
import {
  ref,
  Ref,
  unref,
  watch,
  toRefs,
  provide,
  computed,
  reactive,
  onMounted,
  watchEffect,
  onUnmounted,
  SetupContext,
  onBeforeMount,
  defineComponent,
  getCurrentInstance,
} from 'vue';
import {
  GridApi,
  IRowNode,
  ColumnApi,
  RowPinnedType,
  GridReadyEvent,
  BodyScrollEvent,
  CellKeyDownEvent,
  CellClickedEvent,
  BodyScrollEndEvent,
  FilterChangedEvent,
  SendToClipboardParams,
  CellValueChangedEvent,
  GetMainMenuItemsParams,
  CellEditingStartedEvent,
  GetContextMenuItemsParams,
  RangeSelectionChangedEvent,
  ProcessCellForExportParams,
} from 'ag-grid-community';
import { chartState } from './store';
import { gridState } from './store/grid';
import { renderChartStack } from './class';
import { fixWrapTextAndSpanning } from './hack';
import { AG_GRID_LOCALE_ZH, localeStore } from './locale';
import { useLoading, useHistory, ILoadingParams } from './hooks';
import { dataGridEmits, dataGridProps, dataGridComponents } from './options';
import { ROW_HEADER_FIELD_NAME, HEADER_CHANGE_RESERVE, deltaConfigDefault } from './constant';
import { randomString, isEqualStart, getAllRowData, parsePasteText, isFormulaComplete } from './utils';
import {
  ISignCell,
  IDGContext,
  IDeltaConfig,
  TChangeProps,
  IChangeProps,
  IBaseActiveCell,
  IContextMenuCallbackAppend,
  IHeaderComponentAppendParams,
  IGridConfig,
} from './types';
import {
  copyRangeData,
  appendContent,
  getChartConfig,
  bottomingEvent,
  handlePasteParse,
  getMainMenuItems,
  contextMenuItems,
  sideBarToolPanels,
  rowHeaderColumnDef,
  setEditorCursorLast,
  rangeSelectionChanged,
  innerDefaultColumnDefs,
} from './plugin';

import { closeBarToolPanels } from './plugin/sideBar';

interface IArithmeticModel extends ISignCell {
  value: string;
  pinned: RowPinnedType;
  model: boolean;
}

export default defineComponent({
  name: 'TDataGrid',
  components: dataGridComponents,
  props: dataGridProps,
  emits: dataGridEmits,
  setup(props, { emit }) {
    //  设置默认值
    const {
      width,
      height,
      loading,
      domLayout,
      localeText,
      columnDefs,
      deltaConfig,
      defaultColDef,
      getContextMenuItems: outsideGetContextMenuItems,
    } = toRefs(props);

    const dataGridRef = ref<Element | null>(null);
    const dataGridRootRef = ref<Element | null>(null);
    const getRootRef = () => dataGridRootRef.value;
    const context = reactive<IDGContext>({
      content: [],
      grid: gridState,
      editable: false,
      isEditing: false,
      isCellFocus: false,
      uuid: '',
      rootRef: getRootRef,
      gridConfig: {
        suppressRowHeader: false,
        suppressColHeader: false,
      },
    });
    const currentRange = ref<IBaseActiveCell | null>(null);
    const chartToolPanelsDef = ref(null);
    const gridApi = ref<GridApi | null>(null);
    const gridColumnApi = ref<ColumnApi | null>(null);
    let arithmeticModel: IArithmeticModel = {
      rowIndex: -1,
      field: '',
      value: '',
      pinned: null,
      model: false,
    };
    const innerLoadingOverlayComponentParams = ref<ILoadingParams | null>(null);
    const contextMenuParentRef = ref<HTMLElement | null>(null);
    // 先暂时通过global实现，解决队列渲染问题，后面要改成props下钻方式
    const headerComponentParams = reactive<IHeaderComponentAppendParams>({
      chart: { columnDefs: [] },
    });

    // eslint-disable-next-line no-undef
    let changeTimer: null | NodeJS.Timeout = null;
    // eslint-disable-next-line no-undef
    let firstStateTimer: NodeJS.Timeout | null = null;
    let firstStateMark = false;
    // eslint-disable-next-line no-undef
    let verticalBottomScrollMark = false;
    let spanningHeightInfo = {};
    useLoading({ gridApi: gridApi as Ref<GridApi>, params: innerLoadingOverlayComponentParams, loading });

    onBeforeMount(() => {
      chartToolPanelsDef.value = {
        panels: [],
      } as any;
    });

    const innerLocaleText = computed(() => localeText.value);

    const hiddenColHeader = computed(() => {
      return context?.gridConfig.suppressColHeader && context?.gridConfig.suppressRowHeader;
    });

    /**
     * 合并 deltaConfig 配置
     */
    const innerDeltaConfig = computed(() => {
      return lodash.merge({}, deltaConfigDefault, deltaConfig.value || {}) as IDeltaConfig;
    });

    const style = computed(() => ({
      width: typeof width.value === 'number' ? `${width.value}px` : width.value,
      ...(domLayout.value === 'autoHeight'
        ? {}
        : { height: typeof height.value === 'number' ? `${height.value}px` : height.value }),
    }));

    // 默认列定义
    const innerDefaultColDef = computed(() => {
      return {
        ...innerDefaultColumnDefs(innerDeltaConfig.value.editable),
        ...(defaultColDef.value || {}),
      };
    });

    /**
     * 重置列定义
     * 加入row header
     */
    const innerColumnDefs = computed(() => {
      return [
        ...(innerDeltaConfig.value?.gridConfig?.suppressRowHeader ? [] : [rowHeaderColumnDef]),
        ...appendContent(columnDefs.value, context.content).map((item) => ({
          ...item,
          editable: innerDeltaConfig.value.editable,
          sortable: !innerDeltaConfig.value.editable,
          headerComponentParams,
        })),
      ];
    });

    watch(
      () => innerDeltaConfig.value.chart,
      (newVal) => {
        // headerComponentParams.chart = newVal as IDataGridChart;
        chartState.setChartConfig(newVal);
      },
    );

    // 模拟渲染结束
    const simulationRenderingEnds = () => {
      if (gridApi.value && context.content) {
        const calcRes = fixWrapTextAndSpanning(
          gridApi.value as GridApi,
          context.content,
          innerColumnDefs.value,
          spanningHeightInfo,
        );
        if (calcRes) {
          spanningHeightInfo = calcRes;
        }
      }
    };

    const emitOutsideChange = (params: IChangeProps) => {
      if (innerDeltaConfig.value.editable) {
        emit('editChange', params);
        setTimeout(() => {
          simulationRenderingEnds();
        }, 400);
      }
    };

    const {
      historyPush,
      historyInfo,
      historyUndo,
      historyRedo,
      historyClear,
      saveBaseState,
      historyClick: handleHistoryClick,
    } = useHistory({ emitChange: emitOutsideChange });

    const firstRenderStateWriteToHistory = () => {
      /**
       * 1、第一次渲染
       * 2、1秒后无变更
       * 3、满足数据有长度的情况下（防止外部接口超过1秒导致的问题）
       */
      if (firstStateTimer) {
        clearTimeout(firstStateTimer);
      }
      if (!firstStateMark && historyInfo.value.historyStack?.length === 0) {
        firstStateTimer = setTimeout(() => {
          const rowData = getAllRowData(gridApi?.value as GridApi);
          // 简单做校验
          if (rowData?.length === context.content?.length && rowData?.length !== 0) {
            const cacheParams = {
              rowData: lodash.cloneDeep(rowData),
              grid: { ...context.grid },
              content: context.content.map((item) => item),
              columnDefs: columnDefs.value.map((item) => lodash.pick(item, HEADER_CHANGE_RESERVE)),
            };
            saveBaseState(lodash.cloneDeep({ ...unref(cacheParams) }));
            historyPush(lodash.cloneDeep({ ...unref(cacheParams) }));
            firstStateMark = true;
          }
        }, 1000);
      }
    };

    // 内容/配置更改事件
    const emitEditChange = (params?: TChangeProps) => {
      const {
        grid: paramsGrid,
        content: paramsContent,
        rowData: paramsRowData,
        columnDefs: paramsColumnDefs,
      } = params || {};
      let rowData = paramsRowData || [];
      if (!paramsRowData && gridApi.value) {
        rowData = getAllRowData(gridApi.value as GridApi);
      }
      if (changeTimer) {
        clearTimeout(changeTimer);
      }
      if (innerDeltaConfig.value.editable) {
        changeTimer = setTimeout(() => {
          const changeParams = {
            rowData,
            grid: paramsGrid || context.grid,
            columnDefs: (paramsColumnDefs || columnDefs.value)
              .filter((item) => item.field !== ROW_HEADER_FIELD_NAME)
              .map((item) => lodash.pick(item, HEADER_CHANGE_RESERVE)),
            content: paramsContent || context.content,
          };
          // 添加到历史记录
          historyPush(changeParams) as any;
          emitOutsideChange(changeParams);
        }, 200);
      }
    };

    // 全局更改 Grid事件
    const handleGridEditChange = (params?: IGridConfig) => {
      const { suppressRowHeader, suppressColHeader } = params || {};
      const changeParams = {
        suppressRowHeader:
          suppressRowHeader !== undefined || suppressRowHeader !== null ? suppressRowHeader : context.suppressRowHeader,
        suppressColHeader:
          suppressColHeader !== undefined || suppressColHeader !== null ? suppressColHeader : context.suppressColHeader,
      };

      if (innerDeltaConfig.value.editable) {
        emit('gridEditChange', changeParams);
      }
    };

    const sideBar = computed(() => ({
      toolPanels: sideBarToolPanels({ onChange: emitEditChange }),
      position: 'right',
    }));

    const menuCallback = (params: TChangeProps, append?: IContextMenuCallbackAppend) => {
      if (append?.key) {
        return;
      }
      const { content, grid } = params;
      if (content) {
        context.content = content;
      }

      if (grid) {
        context.grid = grid;
      }

      emitEditChange(params);
    };

    // 菜单配置
    const innterGetContextMenuItems = (params: GetContextMenuItemsParams) =>
      contextMenuItems(params, innerDeltaConfig.value, outsideGetContextMenuItems.value, menuCallback);

    // 列菜单配置
    const innerGetMainMenuItems = (params: GetMainMenuItemsParams) =>
      getMainMenuItems(params, (key: string, value: any) => {
        switch (key) {
          case 'statistics':
            context.grid = {
              ...context.grid,
              column: {
                ...context.grid.column,
                showStatisticsKey: value,
              },
            };
            break;
          default:
        }
      });

    // 触底事件
    const innerBodyScroll = (event: BodyScrollEvent) => {
      emit('bodyScroll', event);
      requestAnimationFrame(() => {
        const { api, direction } = event;

        /**
         * 先加垂直触底事件，后面再按需开启横向触底事件
         */
        if (direction === 'vertical') {
          const displayRowLast = api.getLastDisplayedRow();
          const rowCount = api.getModel().getRowCount();
          // eslint-disable-next-line no-unsafe-optional-chaining
          const { verticalDistance, pageIndex, pageSize, count } = innerDeltaConfig.value.paging;
          const isEmit = rowCount - displayRowLast <= verticalDistance;
          if (isEmit && !verticalBottomScrollMark && pageIndex * pageSize < count) {
            verticalBottomScrollMark = true;
            emit('bottomScroll', { direction, pageIndex, pageSize, count }, event);
            return;
          }
          /**
           * 如果多于verticalBottomScrollMark限制后，可以再次触发
           * 该条件触发表面用户往上滚动以后再滚下来
           * 期望需要重新触发
           */
          if (!isEmit) {
            verticalBottomScrollMark = false;
          }
        }
      });
    };

    // 初始化回调
    const innerGridReady = (event: GridReadyEvent) => {
      emit('gridReady', event);
      const { api, columnApi: eventColumnApi } = event;
      gridApi.value = api;
      gridColumnApi.value = eventColumnApi;
      // 初始化关闭
      setTimeout(() => {
        closeBarToolPanels(api);
      }, 100);
    };

    // 区域选中事件
    const innerRangeSelectionChanged = (event: RangeSelectionChangedEvent) => {
      emit('rangeSelectionChanged', event);
      // 判断是否有选中区域
      context.isCellFocus = (event.api.getCellRanges() || []).length > 0;

      let curRange = rangeSelectionChanged(event);
      if (curRange === null) {
        const focusCell = gridApi.value?.getFocusedCell();
        if (focusCell) {
          const { rowIndex, column } = focusCell;
          curRange = {
            startRowIndex: rowIndex,
            endRowIndex: rowIndex,
            columns: [column],
            columnKeys: [column.getColDef()?.field || ''],
          };
        }
      }
      currentRange.value = curRange;
    };

    // 滚动结束事件
    const innerBodyScrollEnd = (event: BodyScrollEndEvent) => {
      emit('bodyScrollEnd', event);
      bottomingEvent(event, emit as SetupContext['emit']);
    };

    // 过滤以后拿到过滤后的数据
    const onFilterChanged = (event: FilterChangedEvent) => {
      emit('filterChanged', event);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { api, columnApi } = event;
      const { columnDefs: configColumnDefs } = innerDeltaConfig.value.chart;
      const columnsKeyList = configColumnDefs.map((item) => item.field);
      if (columnsKeyList.length > 0) {
        /**
         * 拿到数据以后，将需要显示的列筛选出来
         */
        const allFilterData: Array<any> = [];
        api.forEachNodeAfterFilter((rowNode: IRowNode) => allFilterData.push(rowNode.data));
        const allFilterDataByField = columnsKeyList.reduce((acc, curVal) => {
          const cache = allFilterData.map((item) => item[curVal]).filter((item) => item !== undefined);
          acc[curVal] = cache;
          return acc;
        }, {} as { [key: string]: Array<any> });

        const columnsType: { [key: string]: any } = {};
        columnsKeyList.forEach((field) => {
          columnsType[field] = columnApi.getColumn(field)?.getColDef().cellDataType;
        });

        Object.entries(allFilterDataByField).forEach(([field, data]: [string, Array<any>]) => {
          const column = columnApi.getColumn(field);
          // eslint-disable-next-line no-unused-expressions
          if (column) {
            renderChartStack.pushStack(field, data, getChartConfig(column, innerDeltaConfig.value.chart));
          }
        });
      }
    };

    const getChartToolbarItems = () => [] as any;

    watch(
      () => columnDefs.value,
      () => {
        firstRenderStateWriteToHistory();
      },
    );

    watchEffect(() => {
      const { content, gridConfig } = innerDeltaConfig.value;
      context.content = content;
      context.gridConfig = gridConfig;
      firstRenderStateWriteToHistory();
    });
    watchEffect(() => {
      context.editable = Boolean(innerDeltaConfig.value?.editable);
      /**
       * 非编辑态，则清空记录
       * 这样防止在编辑和非编辑之间切换的时候还有记录（这种情况理应该不需要保存记录）
       */
      if (!context?.editable) {
        historyClear();
      }
    });
    watchEffect(() => {
      context.grid = innerDeltaConfig.value?.grid || gridState;
      firstRenderStateWriteToHistory();
    });

    const exitEditMode = () => {
      // 退出运算模式
      arithmeticModel = {
        model: false,
        rowIndex: -1,
        value: '',
        pinned: null,
        field: '',
      };
    };
    const innerCellValueChanged = (event: CellValueChangedEvent) => {
      const { rowIndex, rowPinned, column, newValue } = event;

      firstRenderStateWriteToHistory();

      const isEqual = isEqualStart(newValue);
      const isWhole = isFormulaComplete(newValue);
      if (isEqual && !isWhole) {
        // 进入运算模式
        arithmeticModel = {
          model: true,
          rowIndex: rowIndex ?? -1,
          value: newValue,
          pinned: rowPinned,
          field: column.getColDef().field || '',
        };
      } else {
        // 退出运算模式
        exitEditMode();
        // 触发change事件
        emitEditChange();
      }
    };

    const innerCellClicked = (event: CellClickedEvent) => {
      emit('cellClicked', event);
      const { model, rowIndex, field, value, pinned } = arithmeticModel;
      const isWhole = isFormulaComplete(value);
      if (!isWhole) {
        // 退出运算模式
        exitEditMode();
      }
      const { api, column: selectColumn, columnApi, rowIndex: selectRowIndex } = event;
      const selectField = selectColumn.getColDef().field;
      if (model && !(rowIndex === selectRowIndex && selectField === field)) {
        const nickColumn = selectColumn.getColDef()?.headerName;
        // clear range start
        api.clearRangeSelection();
        api.addCellRange({
          rowEndIndex: rowIndex,
          rowStartIndex: rowIndex,
          columns: [field],
        });
        // clear range end
        const allData = getAllRowData(api);
        allData[rowIndex] = {
          ...allData[rowIndex],
          [field]: `${value}${nickColumn}${Number(selectRowIndex) + 1}`,
        };
        api.setRowData(allData);
        api.setFocusedCell(rowIndex, field, pinned);
        api.startEditingCell({
          rowIndex,
          colKey: field,
          rowPinned: pinned,
        });
      }

      if (!model) {
        const currentField = selectColumn.getColDef().field;
        if (currentField === ROW_HEADER_FIELD_NAME) {
          api.clearRangeSelection();
          api.addCellRange({
            rowEndIndex: selectRowIndex,
            rowStartIndex: selectRowIndex,
            columns: columnApi
              .getAllDisplayedColumns()
              .filter((item) => item.getColDef().field !== ROW_HEADER_FIELD_NAME),
          });
        }
      }
    };

    /**
     * 为了设置编辑光标在最后一个
     */
    const innerCellEditingStarted = (event: CellEditingStartedEvent) => {
      emit('cellEditingStarted', event);
      context.isEditing = true;
      setEditorCursorLast(event);
    };

    /**
     * 便捷结束事件
     */
    const innerCellEditingStopped = () => {
      context.isEditing = false;
    };

    const innerCellContextMenu = () => ({});

    const handlePasteEvent = (event: Event) => {
      if (gridApi.value && gridColumnApi.value && !context.isEditing && context.editable) {
        handlePasteParse(event, gridApi.value as GridApi, gridColumnApi.value as ColumnApi, context, emitEditChange);
      }
    };
    const innerProcessCellFromClipboard = (params: ProcessCellForExportParams) => {
      console.log('>>>>>params', params);
    };

    /**
     * 自定义剪切板内容
     */
    const sendToClipboard = (params: SendToClipboardParams<any, IDGContext>) => {
      const { api, data, context: paramsContext } = params;
      const tableData = parsePasteText(data);
      copyRangeData(api, paramsContext.content, { tableData, columnDefs: columnDefs.value });
    };

    const innerCellKeyDown = (e: CellKeyDownEvent) => {
      const { event } = e;
      if (event) {
        const { altKey, shiftKey, ctrlKey, metaKey, keyCode } = event as any;
        const { undoStack, historyStack } = historyInfo.value;
        switch (keyCode) {
          // z
          case 90:
            if (!altKey && (ctrlKey || metaKey) && !context.isEditing && context.editable) {
              if (shiftKey && undoStack.length > 0) {
                // ctrl + command + shift + Z redo
                historyRedo();
              } else if (historyStack.length > 1) {
                // ctrl + command + Z undo
                historyUndo();
              }
            }
            break;
          // y
          case 89:
            // Y redo
            if (!altKey && (ctrlKey || metaKey) && undoStack.length > 0 && !context.isEditing && context.editable) {
              historyRedo();
            }
            break;
          default:
        }
      }
    };

    const headerEditToolbarEmitChange = emitEditChange;

    const removeFocusCell = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // 检查点击事件是否发生在 AG Grid 外部
      if (
        !target?.closest('.t-data-grid-wrap') &&
        !target?.closest('.edit-toolbar') &&
        !target?.closest('.ag-popup') &&
        !target?.closest('.t-data-grid-attach-content')
      ) {
        // 如果是在 AG Grid 外部点击，清除焦点
        gridApi.value?.clearRangeSelection();
      }
    };

    onMounted(() => {
      contextMenuParentRef.value = document.querySelector('body');

      document.addEventListener('click', removeFocusCell);
    });

    onMounted(() => {
      if (dataGridRef.value) {
        (dataGridRef.value as any)?.$el.addEventListener('paste', handlePasteEvent);
      }

      contextMenuParentRef.value = document.querySelector('body');
    });

    onBeforeMount(() => {
      localeStore.setLocale(localeText?.value || AG_GRID_LOCALE_ZH);

      context.uuid = randomString(10);
    });

    onUnmounted(() => {
      (dataGridRef.value as any)?.$el.removeEventListener('paste', handlePasteEvent);
      document.removeEventListener('click', removeFocusCell);
    });

    return {
      style,
      gridApi,
      context,
      sideBar,
      domLayout,
      dataGridRef,
      historyInfo,
      currentRange,
      gridColumnApi,
      innerGridReady,
      dataGridRootRef,
      innerLocaleText,
      innerColumnDefs,
      innerBodyScroll,
      onFilterChanged,
      sendToClipboard,
      innerCellClicked,
      innerCellKeyDown,
      chartToolPanelsDef,
      innerDefaultColDef,
      innerBodyScrollEnd,
      handleHistoryClick,
      contextMenuParentRef,
      getChartToolbarItems,
      innerCellContextMenu,
      innerCellValueChanged,
      innerGetMainMenuItems,
      innerCellEditingStarted,
      innerCellEditingStopped,
      innterGetContextMenuItems,
      innerRangeSelectionChanged,
      headerEditToolbarEmitChange,
      innerProcessCellFromClipboard,
      innerLoadingOverlayComponentParams,
      handleGridEditChange,
      hiddenColHeader,
    };
  },
});
</script>

<style lang="scss">
@import 'ag-grid-community/styles/ag-grid.css';
@import 'ag-grid-community/styles/ag-theme-balham.css';

.ag-theme-handson {
  // header
  --ag-header-height: auto;
  --ag-header-foreground-color: #374774;
  --ag-header-background-color: #f2f4f7;
  --ag-header-column-separator-color: #e5e8f2;
  --ag-header-column-separator-height: 100%;

  --ag-secondary-foreground-color: #18804e;

  // rows
  --ag-row-height: calc(var(--ag-grid-size) * 6);
  --ag-row-border-color: #e5e8f2;
  --ag-foreground-color: #374774;
  --ag-background-color: #fff;
  --ag-odd-row-background-color: #fff;
  // --ag-balham-active-color: rgba(0, 94, 255, 0.1);
  --ag-selected-row-background-color: rgba(0, 94, 255, 0.1);

  // highlight
  --ag-range-selection-highlight-color: rgba(22, 160, 133, 0.5);
  --ag-value-change-value-highlight-background-color: rgba(22, 160, 133, 0.5);

  // cell
  --ag-border-color: #e5e8f2;
  --ag-data-color: #374774;
  --ag-range-selection-border-color: rgb(75, 137, 255);
  --ag-range-selection-border: 2px solid;
  --ag-cell-horizontal-border: solid #e5e8f2;

  // selection
  --ag-range-selection-background-color: rgba(0, 145, 234, 0);
  --ag-range-selection-border-color: rgba(32, 32, 32, 1);
}
.ag-theme-handson .ag-header-row {
  font-weight: 400;
}
.ag-watermark {
  display: none;
}

.ag-row .ag-cell.row-spanning,
.ag-row .ag-cell.column-spanning,
.ag-center-cols-clipper .ag-center-cols-viewport .ag-center-cols-container .ag-row .ag-cell.row-spanning,
.ag-center-cols-clipper .ag-center-cols-viewport .ag-center-cols-container .ag-row .ag-cell.column-spanning {
  background-color: #fff;
  z-index: 1;
}
.row-spanning,
.column-spanning {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
}
.row-spanning {
  border-bottom: 1px var(--ag-cell-horizontal-border);
}
.ag-pinned-left-cols-container {
  border-right-width: 2px;
  border-color: var(--ag-border-color);
}
.ag-row-last {
  border-bottom: none;
}
.ag-side-buttons {
  display: none;
}

.t-data-grid-wrap {
  position: relative;
}

.ag-menu {
  .ag-icon-cut {
    visibility: hidden;
  }
}
.hide-ag-header-container {
  .ag-header {
    display: none;
  }
}
</style>
