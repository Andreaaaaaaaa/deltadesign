<template>
  <div ref="headerRef" class="edit-toolbar-inner">
    <template v-for="item of renderEditList" :key="item.key">
      <template v-if="renderButton.includes(item.control)">
        <!-- E_HEADER_EDIT_TOOLBAR_CONTROL.BTN -->
        <toolbar-item
          :params="item"
          :style="item?.style || {}"
          @click="() => !item?.disabled && handleControlClickEvent(item)"
        />
      </template>
      <template v-if="item.control === E_HEADER_EDIT_TOOLBAR_CONTROL.MENU">
        <!-- E_HEADER_EDIT_TOOLBAR_CONTROL.MENU -->
        <toolbar-item v-if="item?.disabled" :params="item" :style="item?.style || {}" />
        <t-popup v-else attach="#toolbar-popup-attach" :z-index="4000" trigger="hover" placement="bottom-left">
          <toolbar-item
            :params="item"
            :style="item?.style || {}"
            @click="() => !item?.disabled && handleControlClickEvent(item)"
          />
          <template #content>
            <div class="edit-toolbar-menu">
              <span
                v-for="sub of item?.subMenu"
                :key="sub.key"
                @click="() => !item?.disabled && handleControlClickEvent(sub)"
              >
                <img v-if="sub?.svgIcon" :src="sub?.svgIcon" />
                <icon-font v-if="sub?.icon" :name="sub?.icon" />
                <em v-if="sub?.name" style="margin-left: 4px">{{ sub?.name }}</em>
              </span>
            </div>
          </template>
        </t-popup>
      </template>
      <template v-if="item.control === E_HEADER_EDIT_TOOLBAR_CONTROL.COLOR">
        <!-- E_HEADER_EDIT_TOOLBAR_CONTROL.COLOR -->
        <toolbar-item v-if="item?.disabled" :params="item" :style="item?.style || {}" />
        <t-popup v-else attach="#toolbar-popup-attach" trigger="hover" placement="bottom">
          <toolbar-item :params="item" :style="item?.style || {}" />
          <template #content>
            <ColorContent @change="(value) => handleColorChange(value, item)" />
          </template>
        </t-popup>
      </template>
      <template v-if="item.control === E_HEADER_EDIT_TOOLBAR_CONTROL.SELECT">
        <toolbar-item v-if="item?.disabled" :params="item" :style="item?.style || {}" />
        <t-select
          v-else
          v-model="fontSizeModel"
          :borderless="true"
          :options="item?.selectOptions"
          class="toolbar-select"
          :placeholder="item?.placeholder"
          @change="
            (value: string | number) => {
              if(value?.toString()?.length>0){
                handleStyleChange({[item.key]: value+'px',})
              }
            }
          "
        ></t-select>
      </template>
      <template v-if="item.control === E_HEADER_EDIT_TOOLBAR_CONTROL.DIVIDER">
        <!-- E_HEADER_EDIT_TOOLBAR_CONTROL.DIVIDER -->
        <span :data-key="item.key" class="divider" />
      </template>
      <template v-if="item.control === E_HEADER_EDIT_TOOLBAR_CONTROL.TIPS">
        <toolbar-item v-if="item?.disabled" :params="item" :style="item?.style || {}" />
        <HeaderHideShow
          v-else
          :item-data="item"
          :is-hidden="isHidden"
          @change="
            () => {
              // 获取当前的style 状态
              handleHideHeader(item);
            }
          "
        ></HeaderHideShow>
      </template>
    </template>
    <div id="toolbar-popup-attach" />
  </div>
</template>
<script lang="ts">
import { IconFont } from 'tdesign-icons-vue-next';
import { GridApi, ColumnApi } from 'ag-grid-community';
// import { ColorPickerPanel as TColorPickerPanel } from 'tdesign-vue-next/esm/color-picker';
import { PropType, toRefs, ref, defineComponent, CSSProperties, onMounted, watch, computed } from 'vue';
import { useAttach } from '../../hooks';
import { ColorContent, HeaderHideShow } from '../common';
import { renderButton } from './constants';
import { Popup as TPopup } from '../../../popup';
import { Select as TSelect } from '../../../select';
import { openBarToolPanelsByKey } from '../../plugin';
import ToolbarItem from './components/ToolbarItem.vue';
import { handleSanningMerge } from '../../plugin/edit/menu/cell';
import { rangesUpdateContent, getRangeContent } from '../../utils';
import { useCalculateRangeStyle, useRenderEditList, useFormatStyleByKey } from './hooks';
import { E_SIDE_BAR_PANEL_KEY, E_HEADER_EDIT_TOOLBAR_KEY, E_HEADER_EDIT_TOOLBAR_CONTROL } from '../../enums';
import { IDGContext, TChangeProps, IHistoryResult, IBaseActiveCell, IHeaderEditToolbar } from '../../types';

export default defineComponent({
  name: 'EditToolbar',
  components: {
    TPopup,
    IconFont,
    ToolbarItem,
    ColorContent,
    HeaderHideShow,
    TSelect,
    // TColorPickerPanel,
  },
  props: {
    range: {
      type: Object as PropType<IBaseActiveCell | null>,
      default: null,
    },
    gridApi: {
      type: Object as PropType<GridApi>,
      required: true,
    },
    columnApi: {
      type: Object as PropType<ColumnApi>,
      required: true,
    },
    context: {
      type: Object as PropType<IDGContext>,
      required: true,
    },
    disabledFirstLine: {
      type: Boolean,
      default: false,
    },
    omit: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },
    historyInfo: {
      type: Object as PropType<IHistoryResult>,
      required: true,
    },
  },
  emits: ['first-line', 'emit-change', 'hide-dialog', 'history-click', 'emit-grid-edit-change'],
  setup(props, setupContext) {
    const { emit } = setupContext;
    const { omit, range, gridApi, context, historyInfo } = toRefs(props);

    const isHidden = computed(() => {
      const gridConfig = context?.value?.gridConfig;
      return gridConfig?.suppressColHeader && gridConfig?.suppressRowHeader;
    });

    const allDisabled = ref(false);
    const colorVisiblePicker = ref(false);

    const fontSizeModel = ref('12');
    const headerRef = ref<HTMLElement | null>(null);

    const { getAttach } = useAttach('#t-data-grid-dialog-attach', context.value.rootRef);

    const history = ref({
      redo: true,
      undo: true,
    });

    watch(
      () => [historyInfo.value.historyStack, historyInfo.value.undoStack],
      ([newHistoryStack, newUndoStack]) => {
        /**
         * 当撤销栈有内容的话，则可以重做
         * 当重做栈有内容的话，则可以撤销
         */
        history.value = {
          redo: newUndoStack?.length <= 0,
          undo: newHistoryStack?.length <= 1,
        };
      },
      {
        deep: true,
      },
    );

    const rangeContent = computed(() =>
      range.value ? getRangeContent(gridApi.value, context.value.content, range.value) : [],
    );

    const { sameStyle } = useCalculateRangeStyle(rangeContent);

    // 回显fontSize
    watch(sameStyle, (newSameStyle) => {
      const fontSize = newSameStyle?.fontSize;
      fontSizeModel.value = fontSize ? fontSize?.replace('px', '') : '12';
    });

    const { renderEditList } = useRenderEditList(gridApi, range, omit, sameStyle, {
      allDisabled,
      context,
      history,
    });

    const handleEmitChange = (params: TChangeProps) => emit('emit-change', params);

    const handleStyleChange = (css: CSSProperties) => {
      if (range.value) {
        const { startRowIndex, endRowIndex, columnKeys } = range.value;
        const newContent = rangesUpdateContent(context.value.content, startRowIndex, endRowIndex, columnKeys, {
          cellStyle: css,
        });
        handleEmitChange({
          content: newContent,
        });
      }
    };

    const handleColorChange = (value: string, item: IHeaderEditToolbar) => {
      if (!item?.disabled) {
        handleStyleChange({
          [item.key]: value,
        });
      }
    };

    const { handleValueSwitch } = useFormatStyleByKey({ change: handleStyleChange }, sameStyle);

    onMounted(() => {
      let rootTop = 0;
      const keyList: Array<string> = [];
      if (headerRef.value) {
        rootTop = headerRef.value.getBoundingClientRect().top;
        const spanNode = headerRef.value.querySelectorAll('span');
        if (spanNode) {
          Array.from(spanNode).forEach((childrenNode) => {
            const childrenNodeTop = childrenNode.getBoundingClientRect().top;
            if (rootTop === childrenNodeTop) {
              // 第一行显示内容
              const { dataset } = childrenNode;
              if (dataset?.key) {
                keyList.push(dataset.key);
              }
            }
          });
        }
      }
      emit('first-line', { keyList });
    });

    const handleControlClickEvent = (params: IHeaderEditToolbar) => {
      if (params.disabled) {
        return;
      }
      switch (params.key) {
        case E_HEADER_EDIT_TOOLBAR_KEY.UNDO:
        case E_HEADER_EDIT_TOOLBAR_KEY.REDO:
          emit('history-click', params.key);
          break;
        case E_HEADER_EDIT_TOOLBAR_KEY.FORMAT:
          openBarToolPanelsByKey(gridApi.value, E_SIDE_BAR_PANEL_KEY.CELL_FORMAT);
          break;
        case E_HEADER_EDIT_TOOLBAR_KEY.CONDITION:
          openBarToolPanelsByKey(gridApi.value, E_SIDE_BAR_PANEL_KEY.SIDE_BAR_RULES);
          break;
        case E_HEADER_EDIT_TOOLBAR_KEY.MERGE:
          if (gridApi.value) {
            handleSanningMerge(gridApi.value, context.value.content, handleEmitChange, {
              callback: (disabled) => {
                allDisabled.value = disabled;
              },
              attach: getAttach,
            });
          }
          break;
        default:
          if (params?.option) {
            // 点击切换（样式）
            handleValueSwitch(params.key, params.option);
          }
      }
    };

    const handleHideHeader = (item) => {
      if (!item?.disabled) {
        const gridConfig = context?.value?.gridConfig;
        emit('emit-grid-edit-change', {
          suppressRowHeader: !gridConfig?.suppressRowHeader,
          suppressColHeader: !gridConfig?.suppressColHeader,
        });
      }
    };
    return {
      document,
      headerRef,
      sameStyle,
      fontSizeModel,
      renderButton,
      renderEditList,
      handleColorChange,
      handleStyleChange,
      handleEmitChange,
      colorVisiblePicker,
      handleControlClickEvent,
      E_HEADER_EDIT_TOOLBAR_KEY,
      E_HEADER_EDIT_TOOLBAR_CONTROL,
      handleHideHeader,
      isHidden,
    };
  },
});
</script>
<style lang="scss">
.edit-toolbar-inner {
  .toolbar-select {
    .t-select {
      border: none;
      height: 24px;
      line-height: 24px;
      .t-select__placeholder {
        font-size: 12px;
      }
      &:hover {
        box-shadow: none;
      }
    }
  }
}
</style>
