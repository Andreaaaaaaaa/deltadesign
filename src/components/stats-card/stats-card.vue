<script lang="ts" name="StatsCard">
import dayjs from 'dayjs';
import { Tooltip as TTooltip } from 'tdesign-vue-next/esm/tooltip';
import { defineComponent, reactive, toRefs, computed, ref, PropType, CSSProperties } from 'vue';
import NumItem from './num-item.vue';
import { getWeekName, formatNum } from './utils';
import { StatsItem } from './types';

export default defineComponent({
  name: 'StatsCard',
  components: {
    NumItem,
    TTooltip,
  },
  props: {
    // 指标卡数据
    data: {
      type: Array as PropType<StatsItem[]>,
      default: () => [],
    },
    // 是否为时间对比
    isCompare: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    // 是否显示同环比
    enableRatio: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    // 指标卡数值是否显示百分比
    isPercent: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    // 指标卡默认高度
    numAreaHeight: {
      type: Number as PropType<number>,
      default: 124,
    },
    // 是否显示时间
    showDate: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    // 显示边框
    showBorder: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    // 指标卡标题
    title: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const containerRef = ref();
    const state = reactive({
      cpOverflowState: {},
    });

    // 时间对比
    const hasDateCp = computed(() => props.isCompare);

    // 单对比项  无时间对比
    const isSingle = computed(() => props.data.length === 1 && !hasDateCp.value);

    // 对比项个数>1 无时间对比
    const hasCpItems = computed(() => props.data.length > 1 && !hasDateCp.value);

    // 为了实现样式 保持均分 增加vs项
    const extendCpItems = computed(() => {
      const items: any[] = [];
      props.data.forEach((data: StatsItem, ind) => {
        items.push(data);
        if (ind !== props.data.length - 1) {
          items.push({ id: 'vs' });
        }
      });
      return items;
    });

    const singleData = computed(() => props.data[0] || {});

    // 2022/02/09 12:00:00 => 2022/02/09
    const getFormattedDate = (date) => (date ? dayjs(date).format('YYYY/MM/DD') : '');

    // 2022/02/09 12:00:00 => (三）
    const getWeek = (date) => getWeekName(date);

    // 对比时间
    // 2022/02/09 12:00:00 => 2022/02/09(三）
    const cpDate = computed(() => getFormattedDate(singleData.value.cpDate) + getWeek(singleData.value.cpDate));

    // 基础时间
    const baseDate = computed(() => getFormattedDate(singleData.value.date) + getWeek(singleData.value.date));
    const formatNumber = (value) => formatNum(value, props.isPercent);
    // 容器宽度
    const containerWidth = computed(() => containerRef.value && containerRef.value.clientWidth);
    // 对比项的最大宽度
    const maxWidth = computed(() => {
      const len = props.data.length;
      const maxW = (containerWidth.value - 20 * 2 - 60 * (len - 1)) / len;
      return maxW;
    });

    const maxWidthStyle = computed(() => ({ maxWidth: `${maxWidth.value}px` }));
    // 时间最大宽度
    const maxDateWidth = computed(() => {
      const maxW = containerWidth.value - 42;
      return maxW;
    });
    const maxDateWidthStyle = computed<CSSProperties>(() => ({
      maxWidth: `${maxDateWidth.value}px`,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'block',
    }));
    // 判断对比项是否超出宽度
    const cpIsOverflow = (event, name) => {
      const { target } = event;
      const w = target.scrollWidth;
      const rW = target.clientWidth;
      if (w > rW) {
        state.cpOverflowState[name] = true;
      } else {
        state.cpOverflowState[name] = false;
      }
    };
    // 获取tips提示
    const getTips = (val, type = 'lp') => {
      let num: number | string = val;
      let isPositive;
      let isNegative;
      let isZero;
      if (typeof val === 'number') {
        num = Math.abs(val);
        if (val > 0) {
          isPositive = true;
          num = `${Number(num * 100).toFixed(2)}%`;
        } else if (val < 0) {
          isNegative = true;
          num = `${Number(num * 100).toFixed(2)}%`;
        } else {
          isZero = true;
        }
      }

      let res = '';
      if (isPositive) {
        res = `增长了${num}`;
      }
      if (isNegative) {
        res = `减少了${num}`;
      }
      if (isZero) {
        res = '持平';
      }

      const date = dayjs(singleData.value.date).add(type === 'lp' ? -1 : -7, 'd');
      const formattedDate = getFormattedDate(date) + getWeek(date);
      return `对比 ${formattedDate}，${res} `;
    };

    return {
      ...toRefs(state),
      getWeek,
      getFormattedDate,
      formatNumber,
      cpIsOverflow,
      getTips,
      isSingle,
      singleData,
      hasCpItems,
      extendCpItems,
      hasDateCp,
      cpDate,
      baseDate,
      maxWidthStyle,
      maxWidth,
      maxDateWidthStyle,
      containerRef,
    };
  },
});
</script>
<template>
  <div ref="containerRef" :class="['sc-container', { 'border-none': !showBorder }, { 'no-date-padding': !showDate }]">
    <div v-if="title" class="title">{{ title }}</div>
    <div v-if="isSingle" class="sc-content" :style="{ height: numAreaHeight + 'px' }">
      <div v-if="showDate" class="date">
        <span>{{ baseDate }}</span>
      </div>
      <!-- 指标值 -->
      <div :class="['index', { 'mt-4': !showDate }]">
        <span>{{ formatNumber(singleData.value).num }}</span>
        <span class="unit">{{ formatNumber(singleData.value).unit }}</span>
      </div>
      <div v-if="enableRatio" class="ratio mt-2">
        <t-tooltip
          v-if="singleData.sply !== ''"
          :disabled="singleData.sply === '-' || singleData.splyShowNum || singleData.splyHideTip"
          :content="getTips(singleData.sply, 'sply')"
          placement="top"
          :class="[
            'placement top center ratio-tooltip',
            { disabled: singleData.sply === '-' || singleData.splyShowNum || singleData.splyHideTip },
          ]"
        >
          <div class="items-center">
            <div class="mr-2">{{ singleData.splyName || '同比' }}</div>
            <num-item
              v-if="singleData.sply !== ''"
              :item-value="singleData.sply"
              :show-num="singleData.splyShowNum"
              :class="['ratio-value', { 'mr-5': maxWidth > 160 }]"
            ></num-item>
          </div>
        </t-tooltip>
        <t-tooltip
          v-if="singleData.lp !== ''"
          :disabled="singleData.lp === '-' || singleData.lpShowNum || singleData.lpHideTip"
          :content="getTips(singleData.lp, 'lp')"
          placement="top"
          :class="[
            'placement top center ratio-tooltip',
            { disabled: singleData.lp === '-' || singleData.lpShowNum || singleData.lpHideTip },
          ]"
        >
          <div class="items-center">
            <div class="mr-2">{{ singleData.lpName || '环比' }}</div>
            <num-item
              v-if="singleData.lp !== ''"
              :item-value="singleData.lp"
              :show-num="singleData.lpShowNum"
              class="ratio-value"
            ></num-item>
          </div>
        </t-tooltip>
      </div>
      <div></div>
    </div>
    <!-- 多对比项 无时间对比 -->
    <div v-else-if="hasCpItems" class="content" :style="{ height: numAreaHeight + 'px' }">
      <div v-if="showDate" class="date">
        <span>{{ baseDate }}</span>
      </div>
      <div class="flex mt-3">
        <div
          v-for="(item, ind) in extendCpItems"
          :key="ind"
          :class="{
            'flex-col-1': ind % 2 === 0,
            'vs-container': ind % 2 === 1,
          }"
        >
          <template v-if="item.id === 'vs'">
            <div class="split-line bg-gray-30"></div>
            <div class="vs">
              {{ 'vs' }}
            </div>
            <div class="split-line"></div>
          </template>
          <template v-else>
            <t-tooltip
              :disabled="!cpOverflowState[item.compare]"
              class="placement top center"
              :content="item.compare"
              placement="top"
              show-arrow
            >
              <div class="cp" :style="maxWidthStyle" @mouseenter="cpIsOverflow($event, item.compare)">
                {{ item.compare }}
              </div>
            </t-tooltip>

            <div class="index mt-1">
              <span>{{ formatNumber(item.value).num }}</span>
              <span class="unit">{{ formatNumber(item.value).unit }}</span>
            </div>
            <div>
              <div v-if="enableRatio" class="ratio">
                <t-tooltip
                  v-if="item.sply !== ''"
                  :disabled="item.sply === '-' || item.splyShowNum || item.splyHideTip"
                  :content="getTips(item.sply, 'sply')"
                  placement="top"
                  :class="[
                    'placement top center ratio-tooltip',
                    { disabled: item.sply === '-' || item.splyShowNum || item.splyHideTip },
                  ]"
                >
                  <div class="flex">
                    <div class="mr-2">{{ item.splyName || '同比' }}</div>
                    <num-item
                      v-if="item.sply !== ''"
                      :item-value="item.sply"
                      :show-num="item.splyShowNum"
                      :class="['ratio-value', { 'mr-5': maxWidth > 160 }]"
                    ></num-item>
                  </div>
                </t-tooltip>

                <t-tooltip
                  v-if="item.lp !== ''"
                  :disabled="item.lp === '-' || item.lpShowNum || item.lpHideTip"
                  :content="getTips(item.lp, 'lp')"
                  placement="top"
                  :class="[
                    'placement top center ratio-tooltip',
                    { disabled: item.lp === '-' || item.lpShowNum || item.lpHideTip },
                  ]"
                >
                  <div class="flex">
                    <div class="mr-2">{{ item.lpName || '环比' }}</div>
                    <num-item
                      v-if="item.lp !== ''"
                      :item-value="item.lp"
                      :show-num="item.lpShowNum"
                      class="ratio-value"
                    ></num-item>
                  </div>
                </t-tooltip>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 时间对比 -->
    <div v-else-if="hasDateCp" class="content" :style="{ height: numAreaHeight + 'px' }">
      <div v-if="showDate" class="items-center" :style="maxDateWidthStyle">
        <span class="date-symbol date-symbol-primary"></span>
        <span class="date">{{ baseDate }}</span>
        <span class="date-vs">VS</span>
        <span class="date-symbol date-symbol-info"></span>
        <span class="date">{{ cpDate }}</span>
      </div>
      <div :class="['flex mt-3 ', { 'mt-8': data.length === 1 }]">
        <div
          v-for="(item, ind) in extendCpItems"
          :key="ind"
          :class="{
            'flex-col-1': ind % 2 === 0,
            'vs-container': ind % 2 === 1,
          }"
        >
          <template v-if="item.id === 'vs'">
            <div class="split-line"></div>
            <div class="vs">
              {{ 'vs' }}
            </div>
            <div class="split-line"></div>
          </template>
          <template v-else>
            <t-tooltip
              v-if="data.length > 1"
              :disabled="!cpOverflowState[item.compare]"
              class="placement top center"
              :content="item.compare"
              placement="top"
              show-arrow
            >
              <div class="cp" :style="maxWidthStyle" @mouseenter="cpIsOverflow($event, item.compare)">
                {{ item.compare }}
              </div>
            </t-tooltip>
            <div class="index mt-1">
              <span>{{ formatNumber(item.value).num }}</span>
              <span class="unit">{{ formatNumber(item.value).unit }}</span>
            </div>
            <div class="mt-1">
              <div class="flex">
                <num-item
                  v-if="item.cp !== undefined"
                  :item-value="item.cp"
                  :item-date="cpDate"
                  :item-num="item.cpValue"
                  class="text-base text-right"
                ></num-item>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.sc-container {
  &.border-none {
    border: none !important;
  }

  // @font-face {
  //   font-family: 'Product Sans Medium';
  //   src: url('../../assets/fonts/product-sans-medium.woff2') format('woff2');
  //   font-weight: 400;
  //   font-style: normal;
  // }
  .font-psm {
    font-family: 'Product Sans Medium';
  }
  border: 1px solid rgba(209, 213, 230);
  padding: 16px 20px;
  &.no-date-padding {
    padding: 16px 20px 12px 20px;
  }
  background-color: transparent;
  border-radius: 12px;
  .title {
    // height: 20px;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: #202020;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .sc-content {
    display: flex;
    flex-direction: column;
  }
  .date {
    font-size: 12px;
    line-height: 18px;
    color: rgba(#202020, 0.6);
    &-symbol {
      height: 12px;
      display: inline-block;
      width: 3px;
      margin-right: 4px;
      &-primary {
        background-color: rgb(32, 32, 32);
      }
      &-info {
        background-color: rgb(46, 140, 250);
      }
    }
    &-vs {
      padding: 0 12px 0 12px;
      color: rgba(#202020, 0.6);
    }
  }
  .index {
    margin-top: 30px;
    font-weight: 500;
    font-family: 'Product Sans Medium';
    font-size: 32px;
    line-height: 32px;
    &-mt {
      margin-top: 4px;
    }
  }
  .unit {
    font-size: 14px;
    line-height: 20px;
    color: rgba(#202020, 0.6);
    margin-left: 8px;
  }
  .ratio {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    align-items: flex-start;
    margin-top: 4px;
    &-value {
      font-size: 12px;
      line-height: 18px;
      text-align: right;
    }
    &-tooltip {
      font-size: 14px;
      line-height: 20px;
      color: rgba(#202020, 0.6);
      &:hover {
        color: #202020;
      }
      &.disabled {
        &:hover {
          color: rgba(#202020, 0.6);
        }
      }
    }
  }

  .cp {
    font-size: 14px;
    line-height: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .split-line {
    background-color: rgba(219, 222, 235, 1);
    width: 1px;
    display: flex;
    flex: 1;
  }
  .vs-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: none;
    width: 84px;
  }
  // 分割vs
  .vs {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    border-radius: 4px;
    line-height: 20px;
    height: 20px;
    border-color: rgba(209, 213, 230, 1);
    background-color: rgba(246, 248, 250, 1);
    border-width: 1px;
    font-weight: 500;
    width: 20px;
    flex: none;
  }
  .mr-2 {
    margin-right: 8px;
  }
  .mr-5 {
    margin-right: 20px;
  }
  .mt-1 {
    margin-top: 4px;
  }
  .mt-3 {
    margin-top: 12px;
  }
  .mt-4 {
    margin-top: 16px;
  }
  .mt-8 {
    margin-top: 32px;
  }
  .mt-2 {
    margin-top: 8px;
  }

  .text-base {
    font-size: 14px;
    line-height: 20px;
  }
  .text-sm {
    font-size: 12px;
    line-height: 18px;
  }
  .flex {
    display: flex;
  }
  .flex-col-1 {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  .items-center {
    display: flex;
    align-items: center;
  }
  .bg-gray-30 {
    background-color: rgba(219, 222, 235, 1);
  }
}

// 指标卡字体使用
</style>
