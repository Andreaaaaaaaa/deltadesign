<template>
  <td
    class="aw-range-picker-td aw-range-picker-cell"
    :class="cellClass"
    @click.stop="clickCell(value, 'td')"
    @mouseenter="mouseEnterCell(value)"
    @mouseleave="mouseEnterCell()"
  >
    <div
      v-if="text"
      class="aw-range-picker-cell-wrapper"
      @click.stop="clickCell(value, 'text')"
    >
      <span class="aw-range-picker-cell-value">{{ text }}</span>
    </div>
  </td>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'RangePickerCell',

  props: {
    type: {
      type: String,
      default: 'date',
    },
    value: {
      type: Date,
      required: true,
    },
    text: {
      type: [String, Number],
      required: true,
    },
    now: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    highlight: {
      type: Boolean,
      default: false,
    },
    startOfRange: {
      type: Boolean,
      default: false,
    },
    endOfRange: {
      type: Boolean,
      default: false,
    },
    additional: {
      type: Boolean,
      default: false,
    },
    isWeekNum: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['click-cell', 'mouse-enter-cell'],

  setup(props, { emit }) {
    const cellClass = computed(() => {
      return props.isWeekNum
        ? ['aw-range-picker-weeknum'] : [
            `aw-range-picker-cell-${props.type}`,
            {
              'aw-range-picker-cell--now': props.now,
              'aw-range-picker-cell--active': props.active,
              'aw-range-picker-cell--disabled': props.disabled,
              'aw-range-picker-cell--highlight': props.highlight,
              'aw-range-picker-cell--active-start': props.startOfRange,
              'aw-range-picker-cell--active-end': props.endOfRange,
              'aw-range-picker-cell--additional': props.additional,
            },
        ];
    });

    const clickCell = (value: Date, clickType: string) => {
      if (props.disabled) {
        return;
      }

      if (
        (clickType === 'td' && props.type !== 'week')
        || (clickType === 'div' && props.type === 'week')
      ) {
        return;
      }

      emit('click-cell', value);
    };

    const mouseEnterCell = (value?: Date) => {
      if (!props.disabled && props.text) {
        emit('mouse-enter-cell', value);
      }
    };

    return {
      cellClass,
      clickCell,
      mouseEnterCell,
    };
  },
});
</script>
