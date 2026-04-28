<template>
  <div class="aw-range-picker-time-container">
    <div class="aw-range-picker-time-header">{{ displayTime }}</div>
    <div class="aw-range-picker-time-picker">
      <time-col ref="timeColRef" :value="timeValue" :cols="cols" @time-pick="handleTimePick" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, defineExpose, nextTick } from 'vue';
import dayjs from 'dayjs';
import TimeCol from './base/time-col.vue';
import type { PickerTypeString } from './type';
import { TIME_PICKER_COLS as PICKER_COLS, TIME_PICKER_TYPE as PICKER_TYPE } from './constants';

const props = withDefaults(
  defineProps<{
    type: PickerTypeString;
  }>(),
  {
    type: 'Hms',
  },
);

const emit = defineEmits<{
  (e: 'change', time: dayjs.Dayjs): void;
}>();

/**
 * 时间选择列
 */
const cols = computed(() => {
  const colMap = {
    [PICKER_TYPE.HOUR]: 1,
    [PICKER_TYPE.MINUTE]: 2,
    [PICKER_TYPE.SECOND]: 3,
  };

  return PICKER_COLS.slice(0, colMap[props.type] || 3);
});

/**
 * 时间值
 */
const timeValue = ref<dayjs.Dayjs>(dayjs().hour(0).minute(0).second(0));

/**
 * 时间选择组件Ref
 */
const timeColRef = ref<InstanceType<typeof TimeCol>>();

/**
 * 已选时间展示
 */
const displayTime = computed(() => {
  const formatMap = {
    [PICKER_TYPE.HOUR]: 'HH:00',
    [PICKER_TYPE.MINUTE]: `HH:mm`,
    [PICKER_TYPE.SECOND]: `HH:mm:ss`,
  };

  return timeValue.value.format(formatMap[props.type] || 'HH:mm:ss');
});

/**
 * 处理时间选择变更
 *
 * @param unit 单位
 * @param val 值
 */
const handleTimePick = (val: dayjs.Dayjs) => {
  timeValue.value = val;

  // 时间精度处理
  if (props.type === 'H') {
    emit('change', timeValue.value.startOf('hour'));
  } else if (props.type === 'Hm') {
    emit('change', timeValue.value.startOf('minute'));
  } else {
    emit('change', timeValue.value);
  }
};

/**
 * 重置已选值
 */
const initValue = () => {
  timeValue.value = dayjs().hour(0).minute(0).second(0);
  nextTick(() => {
    timeColRef.value?.updateTimeScrollPos(true);
  });
};

const setValue = (val: string | dayjs.Dayjs) => {
  const trueNewValue = (typeof val === 'string' ? dayjs(val) : val) as dayjs.Dayjs;

  timeValue.value = trueNewValue;
  nextTick(() => {
    timeColRef.value?.updateTimeScrollPos(true);
  });
};

onMounted(() => {
  initValue();
});

defineExpose({
  reset: initValue,
  setValue,
});
</script>
