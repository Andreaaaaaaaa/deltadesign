<template>
  <div ref="bodyRef" :class="`${COMPONENT_NAME}__panel-body`">
    <div ref="maskRef" :class="`${COMPONENT_NAME}__panel-body-active-mask`">
      <div v-for="(col, idx) in cols" :key="`${col}_${idx}`"></div>
    </div>
    <ul
      v-for="(col, index) in cols"
      :key="`${col}_${index}`"
      :ref="(el) => (colsRef[col] = el as HTMLElement)"
      :class="`${COMPONENT_NAME}__panel-body-scroll`"
      @scroll="onScroll[col]"
    >
      <template v-for="el in getColList(col)" :key="el">
        <li
          v-if="timeItemCanUsed(col, el) || !hideDisabledTime"
          :class="{
            [`${COMPONENT_NAME}__panel-body-scroll-item`]: true,
            [STATUS.disabled]: !timeItemCanUsed(col, el),
            [STATUS.current]: isCurrent(col, el),
          }"
          @click="handleTimeItemClick(col, el, index)"
        >
          {{ cols.length === 1 && cols[0] === 'hour' ? `${el} : 00` : el }}
        </li>
      </template>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, nextTick, defineExpose } from 'vue';
import { debounce, range, padStart } from 'lodash';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { EPickerCols } from '../constants';

dayjs.extend(customParseFormat);

type TimeUnitType = 'hour' | 'minute' | 'second';

const props = withDefaults(
  defineProps<{
    format?: string;
    cols: Array<EPickerCols>;
    value: dayjs.Dayjs;
    range?: Array<dayjs.Dayjs>;
    steps?: Array<string | number>;
    hideDisabledTime?: boolean;
    // eslint-disable-next-line vue/require-default-prop
    disableTime?: (h: number, m: number, s: number) => Record<EPickerCols, Array<number>>;
    // eslint-disable-next-line vue/require-default-prop
    localeMeridiems?: Array<string>;
  }>(),
  {
    format: 'HH:mm:ss',
    cols: () => [EPickerCols.hour, EPickerCols.minute, EPickerCols.second],
    value: () => dayjs(),
    range: () => [] as Array<dayjs.Dayjs>,
    steps: () => [1, 1, 1],
    hideDisabledTime: false,
  },
);

const emit = defineEmits<{
  (e: 'time-pick', v: dayjs.Dayjs): void;
}>();

const { steps, value, format, cols } = toRefs(props);

const bodyRef = ref<HTMLElement>();
const maskRef = ref<HTMLElement>();
const colsRef = reactive<Partial<Record<EPickerCols, HTMLElement | undefined>>>({});

const timeArr = [EPickerCols.hour, EPickerCols.minute, EPickerCols.second];

const COMPONENT_NAME = 't-time-picker';
const STATUS = {
  disabled: 't-is-disabled',
  current: 't-is-current',
};

// 获取每个时间的高度
const getItemHeight = () => {
  const maskDom = maskRef.value?.querySelector('div');
  if (!maskDom) {
    return {
      offsetHeight: 0,
      margin: 0,
    };
  }

  return {
    offsetHeight: parseFloat(getComputedStyle(maskDom).height),
    margin: 8,
  };
};

const timeItemCanUsed = (col: EPickerCols, el: string | number) => {
  const colIdx = timeArr.indexOf(col);
  if (colIdx !== -1) {
    const params: [number, number, number] = [value.value.hour(), value.value.minute(), value.value.second()];
    params[colIdx] = Number(el);
    return !props.disableTime?.(...params)?.[col]?.includes(Number(el));
  }

  return true;
};

// 获取需要渲染的column
const getColList = (col: EPickerCols) => {
  let count = 0;

  if (timeArr.includes(col)) {
    // hour、minute and second columns
    const colIdx = timeArr.indexOf(col);
    const colStep = steps.value[colIdx] || 1;

    count = col === EPickerCols.hour ? 23 : 59;

    const colList = range(0, count + 1, Number(colStep)).map((v) => padStart(String(v), 2, '0')) || [];
    return props.hideDisabledTime && !!props.disableTime
      ? colList.filter((t) => {
          const params: [number, number, number] = [value.value.hour(), value.value.minute(), value.value.second()];
          params[colIdx] = Number(t);
          return !props.disableTime?.(...params)?.[col]?.includes(Number(t));
        })
      : colList;
  }
  // meridiem column
  return [];
};

const getScrollDistance = (col: EPickerCols, time: number | string) => {
  if (col === EPickerCols.hour && /[h]{1}/.test(format.value)) {
    // eslint-disable-next-line no-param-reassign
    (time as number) %= 12; // 一定是数字，直接cast
  }

  const itemIdx = getColList(col).indexOf(padStart(String(time), 2, '0'));
  const { offsetHeight, margin } = getItemHeight();
  const timeItemTotalHeight = offsetHeight + margin;
  const distance = Math.abs(Math.max(0, itemIdx) * timeItemTotalHeight);
  return distance;
};

const closestLookup = (availableArr: Array<any>, calcVal: number, step: number) => {
  if (step <= 1) return calcVal;
  return availableArr.sort((a, b) => Math.abs(calcVal + 1 - a) - Math.abs(calcVal + 1 - b))[0];
};

const handleScroll = (col: EPickerCols) => {
  let val = 0;
  // if (!props.isShowPanel) return;

  const scrollTop = colsRef[col]?.scrollTop || 0;
  const { offsetHeight, margin } = getItemHeight();
  const timeItemTotalHeight = offsetHeight + margin;
  let colStep = Math.abs(Math.round(scrollTop / timeItemTotalHeight + 0.5));

  if (Number.isNaN(colStep)) colStep = 1;
  if (timeArr.includes(col)) {
    let max = 59;
    if (col === EPickerCols.hour) max = /[h]{1}/.test(format.value) ? 11 : 23; // 小时最大为23 12小时制最大为11

    const colIdx = timeArr.indexOf(col);
    const availableArr = range(0, max + 1, Number(steps.value[colIdx]) || 1);
    val = closestLookup(
      availableArr,
      Math.min(Math.abs(Math.round((scrollTop / (offsetHeight + margin)) * Number(steps.value[colIdx]))), max),
      Number(steps.value[colIdx]) || 1,
    );
    if (Number.isNaN(val)) val = availableArr[availableArr.length - 1];
  }

  if (!props.value.isSame(dayjs(props.value)?.[col as TimeUnitType]?.(val), col as TimeUnitType)) {
    const newValue = dayjs(props.value)[col as TimeUnitType](val) as dayjs.Dayjs;
    emit('time-pick', newValue);
  }

  const distance = getScrollDistance(col, val);
  if (!dayjs(value.value).isValid() || (value.value && !dayjs(value.value, format.value, true).isValid())) return;

  if (distance !== scrollTop) {
    const scrollCtrl = colsRef[col];

    if (!scrollCtrl || scrollCtrl.scrollTop === distance) return;

    scrollCtrl.scrollTo?.({
      top: distance,
      behavior: 'smooth',
    });
  }
};

const onScroll: Partial<Record<EPickerCols, () => void>> = {
  [EPickerCols.hour]: debounce(() => handleScroll(EPickerCols.hour), 50),
  [EPickerCols.minute]: debounce(() => handleScroll(EPickerCols.minute), 50),
  [EPickerCols.second]: debounce(() => handleScroll(EPickerCols.second), 50),
};

const scrollToTime = (col: EPickerCols, time: number | string, idx: number, behavior: 'auto' | 'smooth' = 'auto') => {
  const distance = getScrollDistance(col, time);
  const scrollCtrl = colsRef[col];
  if (!scrollCtrl || scrollCtrl.scrollTop === distance || !timeItemCanUsed(col, time)) return;

  scrollCtrl.scrollTo?.({
    top: distance,
    behavior,
  });
};

const handleTimeItemClick = (col: EPickerCols, el: string | number, idx: number) => {
  if (!timeItemCanUsed(col, el)) return;
  if (timeArr.includes(col)) {
    scrollToTime(col, el, idx, 'smooth');
  }
};

// update each columns scroll distance
const updateTimeScrollPos = (isAutoScroll = false) => {
  const behavior = value.value && !isAutoScroll ? 'smooth' : 'auto';
  const isStepsSet = !!steps.value.filter((step) => Number(step) > 1).length;
  nextTick(() => {
    cols.value.forEach((col: EPickerCols, idx: number) => {
      if (!isStepsSet || (isStepsSet && value.value)) {
        // 如果没有设置大于1的steps或设置了大于1的step 正常处理滚动
        scrollToTime(col, value.value[col as TimeUnitType]?.(), idx, behavior);
      } else {
        // 否则初始化到每列第一个选项
        scrollToTime(col, getColList(col)?.[0], idx, behavior);
      }
    });
  });

  // props.resetTriggerScroll();
};

const isCurrent = (col: EPickerCols, colItem: string | number) => {
  let colVal: number;
  if (col === EPickerCols.meridiem) {
    const currentMeridiem = value.value.format('a');
    return currentMeridiem === colItem;
  }
  colVal = value.value[col]?.();
  if (col === EPickerCols.hour && /[h]{1}/.test(format.value)) {
    colVal %= 12;
  }
  return colVal === Number(colItem);
};

defineExpose({
  updateTimeScrollPos,
});
</script>
