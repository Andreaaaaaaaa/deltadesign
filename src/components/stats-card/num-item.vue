<script lang="ts" name="NumItem">
import { defineComponent, reactive, toRefs, computed, watch, PropType } from 'vue';
import { Tooltip as TTooltip } from 'tdesign-vue-next/esm/tooltip';
import { NumItemState } from './types';
import { formatNum } from './utils';

export default defineComponent({
  name: 'NumItem',
  components: {
    TTooltip,
  },
  props: {
    itemValue: {
      type: [String, Number] as PropType<string | number>,
      default: '',
    },
    itemDate: {
      type: String as PropType<string>,
      default: '',
    },
    itemNum: {
      type: [String, Number] as PropType<string | number>,
      default: '',
    },
    showNum: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const state = reactive<NumItemState>({
      isPositive: false,
      isNegative: false,
      isZero: false,
      isNaN: false,
      num: 0,
    });
    watch(
      () => props.itemValue,
      () => {
        state.isPositive = false;
        state.isNegative = false;
        state.isZero = false;
        state.isNaN = false;
        state.num = 0;
        const val = props.itemValue;
        let num: number | string = val;
        if (typeof val === 'number') {
          num = Math.abs(val);
          if (val > 0) {
            state.isPositive = true;
            num = `${Number(num * 100).toFixed(2)}%`;
          } else if (val < 0) {
            state.isNegative = true;
            num = `${Number(num * 100).toFixed(2)}%`;
          } else {
            state.isZero = true;
          }
        } else {
          state.isNaN = true;
        }
        state.num = num;
      },
      { immediate: true },
    );
    const tips = computed(() => {
      let res = '';
      if (state.isPositive) {
        res = `增长了${state.num}`;
      }
      if (state.isNegative) {
        res = `减少了${state.num}`;
      }
      if (state.isZero) {
        res = '持平';
      }
      return `对比${props.itemDate} | ${props.itemNum} ${res} `;
    });
    // 文字样式类
    const numClass = computed(() => [
      { 'text-error': state.isNegative },
      { 'text-success': state.isPositive },
      'font-stats',
    ]);
    // 数字格式化
    const formatNumber = (value) => formatNum(value);
    return {
      ...toRefs(state),
      tips,
      numClass,
      formatNumber,
    };
  },
});
</script>
<template>
  <div class="flex flex-row items-center">
    <div v-if="showNum" class="text-black flex items-center">
      <span class="font-stats flex items-center">{{ formatNumber(itemValue).num }}</span>
      <span class="unit flex items-center ml-1">{{ formatNumber(itemValue).unit }}</span>
    </div>
    <template v-else>
      <svg
        v-if="isNegative"
        class="mr-1"
        width="6"
        height="4"
        viewBox="0 0 6 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.29721 0.129639C5.72678 0.129639 5.95637 0.635599 5.67349 0.958891L3.27538 3.6996C3.07617 3.92726 2.72201 3.92726 2.5228 3.69959L0.124684 0.958891C-0.158196 0.635599 0.0713939 0.129639 0.500974 0.129639L5.29721 0.129639Z"
          fill="#E45356"
        />
      </svg>
      <svg
        v-if="isPositive"
        class="mr-1"
        width="7"
        height="4"
        viewBox="0 0 7 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.89812 4C6.3277 4 6.55728 3.49404 6.2744 3.17075L3.87629 0.430043C3.67708 0.20238 3.32292 0.20238 3.12371 0.430044L0.725595 3.17075C0.442715 3.49404 0.672305 4 1.10188 4L5.89812 4Z"
          fill="#4EB596"
        />
      </svg>

      <t-tooltip :disabled="!itemDate || num === '-'" class="placement top center" :content="tips" placement="top">
        <span :class="numClass">{{ num }}</span>
      </t-tooltip>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.items-center {
  align-items: center;
}
.mr-1 {
  margin-right: 4px;
}
.ml-1 {
  margin-left: 4px;
}

.text-error {
  color: #E45356;
}
.text-success {
  color: #4EB596;
}
.unit {
  font-size: 14px;
  line-height: 20px;
}
// @font-face {
//   font-family: 'Product Sans Medium';
//   src: url('../../assets/fonts/product-sans-medium.woff2') format('woff2');
//   font-weight: 400;
//   font-style: normal;
// }
.text-black {
  color: #202020;
}
.font-stats {
  font-size: 14px;
  line-height: 21px;
  font-family: 'Product Sans Medium';
}
</style>
