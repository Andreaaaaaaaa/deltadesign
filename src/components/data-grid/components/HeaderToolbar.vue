<template>
  <div ref="editToolbarRef" class="edit-toolbar">
    <div :class="{ 'edit-toolbar-left': true }">
      <EditToolbar
        :range="innerRange"
        :context="innerContext"
        :grid-api="innerGridApi"
        :column-api="innerColumnApi"
        :history-info="innerHistoryInfo"
        @first-line="handleFirstLine"
        @emit-change="innerEmitChange"
        @history-click="handleHistoryClick"
        @emit-grid-edit-change="handleGridEditChange"
      />
    </div>
    <div v-if="isShowMore" class="edit-toolbar-right">
      <t-popup trigger="click" :z-index="3500" placement="bottom-right">
        <span class="more">
          <icon-font name="ellipsis" />
        </span>
        <template #content>
          <EditToolbar
            :omit="omitKey"
            :range="innerRange"
            :context="innerContext"
            :grid-api="innerGridApi"
            :history-info="innerHistoryInfo"
            :column-api="innerColumnApi"
            @emit-change="innerEmitChange"
            @history-click="handleHistoryClick"
          />
        </template>
      </t-popup>
    </div>
  </div>
</template>
<script lang="ts">
import { IconFont } from 'tdesign-icons-vue-next';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { ref, onMounted, PropType, defineComponent, toRefs, computed, nextTick } from 'vue';

import { Popup as TPopup } from '../../popup';
import EditToolbar from './EditToolbar/index.vue';
import { E_HEADER_EDIT_TOOLBAR_KEY } from '../enums';
import { IDGContext, TChangeProps, IHistoryResult, IBaseActiveCell, IGridConfig } from '../types';

export default defineComponent({
  name: 'HeaderToolbar',
  components: { IconFont, TPopup, EditToolbar },
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
    historyInfo: {
      type: Object as PropType<IHistoryResult>,
      required: true,
    },
  },
  emits: ['emit-change', 'history-click', 'emit-grid-edit-change'],
  setup(props, { emit }) {
    const { columnApi, gridApi, range, context, historyInfo } = toRefs(props);
    const omitKey = ref<Array<string>>([]);
    const isShowMore = ref(false);
    const editToolbarRef = ref<HTMLElement | null>(null);
    const extraLong = ref(false);

    const innerRange = computed(() => range.value);
    const innerColumnApi = computed(() => columnApi.value);
    const innerGridApi = computed(() => gridApi.value);
    const innerContext = computed(() => context.value);
    const innerHistoryInfo = computed(() => historyInfo.value);

    const handleFirstLine = (value: { keyList: Array<string> }) => {
      omitKey.value = value.keyList;
    };

    const innerEmitChange = (params: TChangeProps) => {
      emit('emit-change', params);
    };

    const handleHistoryClick = (key: E_HEADER_EDIT_TOOLBAR_KEY) => {
      emit('history-click', key);
    };

    const handleGridEditChange = (params: IGridConfig) => {
      emit('emit-grid-edit-change', params);
    };

    onMounted(() => {
      nextTick(() => {
        if (editToolbarRef.value) {
          const wrapWidth = editToolbarRef.value.clientWidth;
          // 说明toobar长度大于整体长度，需要居左显示
          extraLong.value = wrapWidth < 460;
        }
      });
    });

    return {
      omitKey,
      extraLong,
      isShowMore,
      innerRange,
      innerGridApi,
      innerContext,
      innerColumnApi,
      editToolbarRef,
      innerEmitChange,
      innerHistoryInfo,
      handleFirstLine,
      handleHistoryClick,
      handleGridEditChange,
    };
  },
});
</script>

<style lang="scss">
.edit-toolbar {
  position: absolute;
  height: 0;
  z-index: 5;

  &-left {
    position: absolute;
    min-width: 460px;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #e8eaf1;
    border-radius: 4px;
    box-shadow: 0px 4px 20px 0px rgba(32, 32, 32, 0.1);
    transform: translate(-50%, calc(4px - 100%));
    display: flex;
    flex-wrap: wrap;
    white-space: nowrap;

    &--left {
      left: 0;
      transform: translate(0, calc(-12px - 100%));
    }
  }
  &-inner {
    gap: 4px;
    height: 20px;
    white-space: nowrap;
    align-items: start;
    display: flex;
    flex-wrap: nowrap;

    .edit-toolbar-item {
      padding: 4px;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      color: rgba(32, 32, 32, 0.6);
      align-items: center;
      gap: 4px;
      box-sizing: border-box;

      em {
        font-style: normal;
        line-height: 16px;
        font-size: 12px;
        color: rgba(32, 32, 32, 1);
      }

      &.active,
      &:hover {
        // color: #fff;
        border-radius: 4px;
        background-color: rgba(188, 194, 220, 0.5);
      }
    }

    .divider {
      height: 24px;
      width: 1px;
      padding: 0;
      box-sizing: border-box;
      border-left: 1px solid #dbdeeb;
      & + .divider {
        display: none;
      }
      &:first-child {
        display: none;
      }
    }
  }
  &-item {
    &--disabled {
      color: rgba(32, 32, 32, 0.3) !important;
      cursor: no-drop !important;
      &:hover {
        background-color: rgba(32, 32, 32, 0.1) !important;
      }
    }
  }
  &-menu {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0 -8px;
    font-size: 12px;
    line-height: normal;
    color: inherit;
    span {
      cursor: pointer;
      flex: 1;
      padding: 8px 6px;
      display: flex;
      align-items: center;
      min-width: 108px;
      &.active,
      &:hover {
        background-color: rgba(188, 194, 220, 0.5);
      }
    }

    em {
      font-style: normal;
      line-height: 12px;
      font-size: 12px;
    }
  }
}
</style>
