<template>
  <div
    ref="tooltip"
    :class="[
      'delta-ui-tooltip-container',
      isFollowProp.value ? 'delta-ui-follow' : '',
    ]"
    :style="`padding-left: ${left}px;`"
  >
    <span
      v-if="valueProp.value.color && valueProp.value.color.length"
      class="color"
    >
      <span
        v-for="(item, i) in valueProp.value.color"
        :key="i"
        :class="isWhiteProp.value ? ['no-border-item', 'item']: 'item'"
        :style="itemStyle(item, i)"
      ></span>
    </span>
    <span
      :class="[
        'text',
        valueProp.value.type && valueProp.value.type.length ? 'type-text' : '',
      ]"
      >{{ valueProp.value.text }}
      <span
        v-if="valueProp.value.type.length && isFollowProp.value"
        :class="indexProp.value !== 0 ? ['suffix', 'sub-suffix'] : 'suffix'"
        >{{ valueProp.value.type.join("/") }}</span
      >
    </span>
    <span
      v-if="valueProp.value.type.length && !isFollowProp.value"
      :class="isWhiteProp.value ? 'black': 'suffix'"
      >{{ valueProp.value.type.join("/") }}</span
    >
  </div>
</template>

<script lang="ts" name="CalendarTooltipItem">
import { defineComponent, toRefs, reactive, PropType } from 'vue';
import { TooltipListItem } from './const';

// export interface TooltipListItem {
//   text: string;
//   color: string[];
//   type: string[];
// }

function itemStyle(color: string, index: number) {
  // 格式化标记颜色
  return `background-color: ${color}; left: ${index * 5}px; z-index: ${
    8 - index
  };`;
}

export default defineComponent({
  name: 'TooltipItem',
  props: {
    value: {
      type: Object as PropType<TooltipListItem>,
      default: () => ({
        text: '',
        color: [],
        type: [],
      }),
    },
    isFollow: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    index: {
      type: Number as PropType<number>,
      default: 0,
    },
    isWhite: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const { value, isFollow, index, isWhite } = toRefs(props);
    const valueProp = reactive({
      value,
    });
    const isFollowProp = reactive({
      value: isFollow,
    });
    const indexProp = reactive({
      value: index,
    });
    const isWhiteProp = reactive({
      value: isWhite,
    });
    const { length } = value.value.color;
    const left = length ? 10 + (length - 1) * 5 + 8 : 0;

    return {
      valueProp,
      isFollowProp,
      indexProp,
      isWhiteProp,
      left,
      itemStyle,
    };
  },
});
</script>

<style lang="scss" scope>
.delta-ui-tooltip-container {
  height: fit-content;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  .color {
    position: absolute;
    left: 0;
    top: 0;
  }
  .item {
    display: inline-block;
    position: absolute;
    top: 5px;
    left: 0;
    width: 10px;
    height: 10px;
    border-radius: 8px;
    border: 1px solid #ffffff;
  }
  .no-border-item {
    top: 4px;
    width: 12px;
    height: 12px;
  }
  .text {
    display: inline-block;
    // width: 100%;
    max-width: 200px;
  }
  .suffix {
    display: inline-block;
    text-align: right;
    color: rgba(#ffffff, 0.6);
    margin-left: 16px;
  }
  .black {
    color: rgba(#202020, 0.6);
    padding-left: 8px;
  }
}

.delta-ui-follow {
  display: inline-block;
  .text {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: none;
  }
  .sub-suffix {
    color: rgba(#202020, 0.3);
  }
}
</style>
