<template>
  <div class="aw-range-picker-mom-container">
    <template v-if="momType === RELATIVE">
      <span>{{ globalConfig.baseAdjacentLabel }}</span>
      <t-tooltip placement="top-left" overlay-class-name="aw-range-picker-mom-tooltip-popup">
        <span class="aw-range-picker-mom-tooltip-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="16" height="16">
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8"
              clip-rule="evenodd"
            />
            <path
              fill="currentColor"
              d="M6.79 6.65c0-.372.128-.666.328-.865.198-.2.497-.335.894-.335.716 0 1.228.576 1.2 1.307-.02.348-.256.77-.656.975-.429.22-1.044.685-1.044 1.427v.342a.5.5 0 0 0 1 0v-.342c0-.142.141-.353.5-.536a2.24 2.24 0 0 0 1.2-1.814V6.8c.05-1.235-.852-2.351-2.2-2.351-.635 0-1.198.223-1.602.628s-.62.961-.62 1.573a.5.5 0 0 0 1 0M8 10.53a.65.65 0 1 1 0 1.3.65.65 0 0 1 0-1.3"
            />
          </svg>
        </span>
        <template #content>
          {{ globalConfig.baseTooltip }}
        </template>
      </t-tooltip>
    </template>
    <template v-else>
      <span class="aw-range-picker-mom-label">{{ globalConfig.baseDateLabel }}</span>
      <t-input
        v-model="innerMomNum"
        class="aw-range-picker-mom-input"
        size="small"
        :placeholder="globalConfig.placeholder.inputNumber"
        @change="handleChange"
        @blur="handleBlur"
      />
      <range-picker-select
        class="aw-range-picker-dynamic-input-select"
        :value="momMode"
        :options="modeOptions"
        @select="handleSelect"
      >
        <template #label>
          <span>{{ CONST.MODE_LABEL[momMode] }}</span>
        </template>
      </range-picker-select>
      <span>{{ globalConfig.agoLabel }}</span>
      <t-tooltip placement="top-left" overlay-class-name="aw-range-picker-mom-tooltip-popup">
        <span class="aw-range-picker-mom-tooltip-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="16" height="16">
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8"
              clip-rule="evenodd"
            />
            <path
              fill="currentColor"
              d="M6.79 6.65c0-.372.128-.666.328-.865.198-.2.497-.335.894-.335.716 0 1.228.576 1.2 1.307-.02.348-.256.77-.656.975-.429.22-1.044.685-1.044 1.427v.342a.5.5 0 0 0 1 0v-.342c0-.142.141-.353.5-.536a2.24 2.24 0 0 0 1.2-1.814V6.8c.05-1.235-.852-2.351-2.2-2.351-.635 0-1.198.223-1.602.628s-.62.961-.62 1.573a.5.5 0 0 0 1 0M8 10.53a.65.65 0 1 1 0 1.3.65.65 0 0 1 0-1.3"
            />
          </svg>
        </span>
        <template #content>
          {{ globalConfig.currentTooltip }}
        </template>
      </t-tooltip>
    </template>
  </div>
</template>

<script lang="ts" setup>
import TTooltip from 'tdesign-vue-next/esm/tooltip';
import TInput from 'tdesign-vue-next/esm/input';
import RangePickerSelect from './base/number-select.vue'
import { computed, ref, watch } from 'vue';
import { useRangeGlobalConfig, MOM_COMPARE_TYPE, MOM_REGEX, YOY_COMPARE_TYPE } from './constants';
import { getDayjsType } from './utils'

const props = defineProps({
  timeType: {
    type: String,
    default: '',
  },
  mode: {
    type: String,
    default: 'date',
  },
});

const emit = defineEmits(['change']);

const CONST = useRangeGlobalConfig();
const { globalConfig } = CONST;

const RELATIVE = 'relative'; // 相邻时间段
const DYNAMIC = 'dynamic'; // 动态

const momMatch = computed(() => {
  return props.timeType.match(MOM_REGEX)
})

const momType = computed(() => {
  return (momMatch.value?.[1] || props.timeType === YOY_COMPARE_TYPE) ? DYNAMIC : RELATIVE
});

const dayjsType = computed(() => {
  return getDayjsType(props.timeType)
})

const momMode = ref('d')
const momNum = ref('1')
const innerMomNum = ref('1')


const initMom = () => {
  momMode.value = props.timeType === YOY_COMPARE_TYPE ? 'y' : momMatch.value?.[3] || dayjsType.value
  momNum.value = momMatch.value?.[2] ? (-1 * Number(momMatch.value[2])).toString() : '1'
  innerMomNum.value = momNum.value
}

watch(
  () => props.timeType,
  () => {
    initMom()
  },
  {
    immediate: true
  }
)

const modeOptions = computed(() => {
  return CONST.DYNAMIC_OPTIONS_MAP[props.mode as keyof typeof CONST.DYNAMIC_OPTIONS_MAP]
})

const emitChange = () => {

  const type = `${MOM_COMPARE_TYPE}${Number(momNum.value) >= 0 ? '-' : ''}${Math.abs(Number(momNum.value))}${momMode.value}`

  if (type !== props.timeType) {
    emit('change', type);
  }
};

const handleBlur = () => {
  if (!/^\d+$/.test(innerMomNum.value)) {
    innerMomNum.value = momNum.value
  }
}

const handleChange = (value: string | number) => {
  if (/^\d+$/.test(innerMomNum.value)) {
    momNum.value = value.toString()
    innerMomNum.value = momNum.value
    emitChange()
  }
}

const handleSelect = (value: string) => {
  momMode.value = value
  emitChange()
}
</script>
