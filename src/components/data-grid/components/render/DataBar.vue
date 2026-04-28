<template>
  <div :class="componentName">
    <span :class="`${componentName}-before`" :style="negativeStyle"></span>
    <span :class="`${componentName}-content`">{{ currentValue }}</span>
    <span :class="`${componentName}-after`" :style="positiveStyle"></span>
  </div>
</template>

<!-- eslint-disable no-case-declarations -->
<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';
import { dataBarRules, scaleRules, singleDataBarRules } from '../../plugin';
import { E_CONDITION_RULES_KEY } from '../../enums';
import {
  isPercentage,
  getColorList,
  getNumbicData,
  getRangeRowData,
  transformColorByFilling,
  rangeExpressionTransformRange,
} from '../../utils';
import { IAgGridCommon, TDeltaConfigContentConditionRules } from '../../types';

const componentName = 't-data-grid-cell-data-bar';

const changeValue = (value: string) =>
  isPercentage(value) ? Number(value.toString().replace('%', '')) / 100 : Number(value);

export default defineComponent({
  name: 'DataBar',
  props: {
    params: {
      type: Object as PropType<
        IAgGridCommon & {
          value: string;
          renderData: TDeltaConfigContentConditionRules;
        }
      >,
      default: () => ({}),
    },
  },
  setup(props) {
    const { params } = toRefs(props);
    // console.log('params', params.value);
    const currentValue = computed(() => params.value.value);
    const colorList = computed(() =>
      getColorList(
        { start: params.value.renderData.startColor, end: params.value.renderData.endColor },
        params.value.renderData.type,
      ),
    );

    const dataInfo = computed(() => {
      const { api, renderData, value, columnApi } = params.value;
      const { range, type, startMode, startValue, endMode, endValue, startColor, endColor } = renderData;
      const activeRange = rangeExpressionTransformRange(columnApi, range);
      const innerValue = changeValue(value);
      let width = 0;
      let origin = 0;
      let color = '';
      if (activeRange) {
        const { startRowIndex, endRowIndex, columnKeys } = activeRange;
        const getRangeData = getRangeRowData(api, { startRowIndex, endRowIndex, columnKeys }).flat(2);
        const numberData = getNumbicData(getRangeData);
        const config = {
          endColor,
          startColor,
          max: endMode === 'auto' ? undefined : (endValue as number),
          min: startMode === 'auto' ? undefined : (startValue as number),
        };
        switch (type) {
          case E_CONDITION_RULES_KEY.DATABAR:
            const dataBar = dataBarRules(innerValue, numberData, config);
            width = dataBar.width;
            origin = dataBar.origin;
            break;
          case E_CONDITION_RULES_KEY.SINGLEDATABAR:
            const singleDataBar = singleDataBarRules(innerValue, numberData, config);
            width = singleDataBar.width;
            origin = singleDataBar.origin;
            break;
          case E_CONDITION_RULES_KEY.COLORSCALE:
            const scale = scaleRules(innerValue, numberData, config);
            width = 1;
            origin = 0;
            color = colorList.value?.[scale] || '';
            break;
          default:
        }
      }
      // console.log('width, origin, color', width, origin, color);
      return { width, origin, color };
    });

    // 负向
    const negativeStyle = computed(() => {
      const { renderData, value } = params.value;
      const { width: infoWidth, origin, color: infoColor } = dataInfo.value;
      const innerValue = changeValue(value);
      const width = Math.abs(innerValue < 0 ? infoWidth : 0) * 100;

      return `
        display: ${renderData.type === E_CONDITION_RULES_KEY.DATABAR ? 'block' : 'none'};
        background: ${transformColorByFilling(infoColor || renderData.startColor, renderData.filling, 'left')};
        width: ${width}%;
        left: calc(${origin}% - ${width}%)
      `;
    });

    // 正向
    const positiveStyle = computed(() => {
      const { renderData, value } = params.value;
      const { width: infoWidth, origin, color: infoColor } = dataInfo.value;
      const innerValue = changeValue(value);
      const width =
        Math.abs(renderData.type !== E_CONDITION_RULES_KEY.DATABAR || innerValue >= 0 ? infoWidth : 0) * 100;

      return `
        background: ${transformColorByFilling(infoColor || renderData.endColor, renderData.filling)};
        width: ${width}%;
        left: ${origin}%;
      `;
    });

    return {
      currentValue,
      negativeStyle,
      positiveStyle,
      componentName,
    };
  },
});
</script>

<style lang="scss">
.t-data-grid-cell-data-bar {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  // text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.t-data-grid-cell-data-bar-before {
  position: absolute;
  top: 0;
  bottom: 0;
  display: inline-block;
  z-index: 99;
}
.t-data-grid-cell-data-bar-before::before {
  content: '';
  position: absolute;
  right: 0;
  top: -2px;
  bottom: -2px;
  border-right: 1px dotted gray;
  height: 100%;
}
.t-data-grid-cell-data-bar-after {
  position: absolute;
  display: inline-block;
  top: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 99;
}
.t-data-grid-cell-data-bar-content {
  position: relative;
  flex: 1;
  padding: 0 11px;
  z-index: 999;
}
</style>
