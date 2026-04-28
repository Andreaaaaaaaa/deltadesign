<template>
  <div>
    <div class="aw-range-picker-table-title">
      {{
        type === 'month'
          ? `${year} ${globalConfig.dayjsLocale === 'zh-cn' ? globalConfig.yearAriaLabel : ''}`
          : `${year} ${globalConfig.dayjsLocale === 'zh-cn' ? globalConfig.yearAriaLabel : ''} ${
              globalConfig.months[month]
            }`
      }}
    </div>
    <table class="aw-range-picker-table">
      <tbody>
        <tr
          v-for="(rowItem, rowIndex) in tableData"
          :key="rowIndex"
          class="aw-range-picker-tr"
          :class="getRowClass(rowItem)"
        >
          <range-picker-cell
            v-for="(cellItem, cellIndex) in rowItem"
            :key="cellIndex"
            v-bind="{ ...$attrs, ...cellItem }"
            :type="type"
            @click-cell="clickCell"
            @mouse-enter-cell="mouseEnterCell"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue';
import { noop, cloneDeep } from 'lodash';
import dayjs from 'dayjs';
import { useRangeGlobalConfig, MODE_MAP } from '../constants';
import RangePickerCell from './cell.vue';
import { DateTime } from '../type';
import { flagActive } from '../utils';
import { getIsoWeek, getStartEndTime, getWeekRange } from '../week';

export default defineComponent({
  name: 'RangePickerTable',

  components: {
    RangePickerCell,
  },

  props: {
    type: {
      type: String,
      default: 'date',
    },
    data: {
      type: Array as PropType<DateTime[][]>,
      default: () => [],
    },
    onCellMouseEnter: {
      type: Function,
      default: noop,
    },
    year: {
      type: Number,
      default: 2023,
    },
    month: {
      type: Number,
      default: 3,
    },
    start: {
      type: Date,
      default: null,
    },
    end: {
      type: Date,
      default: null,
    },
    isSingleDate: {
      type: Boolean,
      default: false,
    },
    clickStart: {
      type: Date,
      default: null,
    },
    clickEnd: {
      type: Date,
      default: null,
    },
    firstDayOfWeek: {
      type: Number,
      default: 1,
    },
    mouseValue: {
      type: Date,
      default: null,
    },
    activeTimeIndex: {
      type: Number,
      default: 0,
    },
  },

  emits: ['click-cell', 'mouse-enter-cell'],

  setup(props, { emit }) {
    // 国际化
    const CONST = useRangeGlobalConfig();
    const { globalConfig } = CONST;

    // 可以用 listener，不过觉得不直观
    const clickCell = (value: Date) => {
      emit('click-cell', value);
    };

    const mouseEnterCell = (value?: Date) => {
      emit('mouse-enter-cell', value);
    };

    const tableData = computed(() => {
      const type = [MODE_MAP.H, MODE_MAP.Hm, MODE_MAP.Hms, MODE_MAP.WEEK].includes(props.type)
        ? 'date'
        : props.type;

      let start = props.start;
      let end = props.end;
      let clickStart = props.clickStart;
      let clickEnd = props.clickEnd;

      if (props.type === 'week') {
        if (start && props.isSingleDate) {
          const weekRange = getWeekRange(start, props.firstDayOfWeek);

          start = weekRange[0];
          end = weekRange[1];
        }

        if (clickStart) {
          clickStart = getStartEndTime('start', clickStart, 'isoWeek', props.firstDayOfWeek).toDate();
        }
        if (clickEnd) {
          clickEnd = getStartEndTime('end', clickEnd, 'isoWeek', props.firstDayOfWeek).startOf('d').toDate();
        }
      }

      return flagActive(cloneDeep(props.data), {
        start,
        end,
        type,
        realType: props.type,
        clickStart,
        clickEnd,
        mouseValue: props.mouseValue,
        activeTimeIndex: props.activeTimeIndex,
        firstDayOfWeek: props.firstDayOfWeek,
        isSingleDate: props.isSingleDate,
      });
    });

    const mouseWeek = computed(() => {
      if (props.mouseValue) {
        return getIsoWeek(
          getStartEndTime('start', props.mouseValue, 'isoWeek', props.firstDayOfWeek),
          props.firstDayOfWeek,
        );
      }
      return '';
    });

    const WEEKNUM = 8; // 周一到周日，加个周显示

    const getRowClass = (rowItem: DateTime[]) => {
      const cellItem = rowItem?.[0];
      const weekText = mouseWeek.value?.toString();
      // const weekText = '18';
      if (cellItem && cellItem.isWeekNum && weekText) {
        if (cellItem.text.toString() === weekText) {
          return ['aw-range-picker-row-mouse--active', { 'aw-range-picker-row-all': rowItem.length === WEEKNUM }];
        }
      }
      return '';
    };

    return {
      globalConfig,
      clickCell,
      mouseEnterCell,
      tableData,
      getRowClass,
    };
  },
});
</script>
