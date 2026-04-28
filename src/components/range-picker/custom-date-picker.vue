<template>
  <div>
    <t-popup
      ref="popupRef"
      :visible="panelVisible"
      :disabled="disabled"
      :placement="popupPlacement"
      trigger="click"
      overlay-class-name="aw-range-picker-popover"
      v-bind="{ ...popupProps }"
      destroy-on-close
      @visible-change="handlePanelVisibleChange"
    >
      <div ref="pickerInputRef" class="aw-range-picker-input-container">
        <custom-date-picker-input
          :inner-value="innerValue"
          :inner-compare-value="innerCompareValue"
          :inner-is-compare="innerIsCompare"
          :show-compare="showCompare"
          :size="size"
          :mode="mode"
          :range-time-options="rangeTimeOptions"
          :disabled="disabled"
          :show-shortcut="showShortcut"
          :allow-clear="allowClear"
          :placeholder="placeholder"
          :panel-visible="panelVisible"
          :show-complete-input="showCompleteInput"
          :is-private-compare="isPrivateCompare"
          :side-time-dynamic-active="sideTimeDynamicActive"
          :borderless="borderless"
          :first-day-of-week="firstDayOfWeek"
          :mouse-value="mouseValue"
          :all-range-options="allRangeOptions"
          @clear="clearValue"
          @click-input="showPanel"
          @change-time="changeTime"
          @save-time="saveTime"
        >
          <template v-if="$slots.title" #title>
            <slot name="title" />
          </template>
        </custom-date-picker-input>
      </div>
      <template #content>
        <div
          class="aw-range-picker-main"
          :class="{ 'aw-range-picker-main-compare': innerIsCompare && showCompare }"
          :style="wrapStyle"
        >
          <div v-if="!innerIsCompare" class="aw-range-picker-body">
            <!-- @vue-ignore -->
            <range-picker-sider
              v-if="showShortcut"
              ref="pickerSideRef"
              :show-shortcut="showShortcut"
              :is-private-compare="isPrivateCompare"
              :inner-value="innerValue"
              :side-time-compare-active="sideTimeCompareActive"
              :side-time-btn-active="sideTimeBtnActive"
              :show-dynamic="showDynamic"
              :btn-compare-options="btnCompareOptions"
              :btn-fixed-options="btnFixedOptions"
              :side-time-dynamic-active="sideTimeDynamicActive"
              :btn-custom-range-options="btnCustomRangeOptions"
              :get-option-value-text="getOptionValueText"
              @click-side-btn="handleSideTimeBtnClick"
              @click-relative-btn="handleSideTimeRelativeClick"
              @click-dynamic-btn="handleSideTimeDynamicClick"
            />
            <div :class="showShortcut && 'aw-range-picker-content-margin'">
              <custom-date-picker-content
                ref="pickerContentRef"
                :inner-value="innerValue"
                :disable-date="disableDate"
                :side-time-btn-active="sideTimeBtnActive"
                :side-time-dynamic-active="sideTimeDynamicActive"
                :mode="mode"
                :time-offset="timeOffset"
                :is-private-compare="isPrivateCompare"
                :first-day-of-week="firstDayOfWeek"
                :show-mom-select="showMomSelect"
                @change-time="changeTime"
                @change-mom-type="changeMomType"
                @mouse-enter-cell="handleMouseEnterCell"
              >
                <template #panelTip="{ date }">
                  <slot name="panelTip" :date="date" />
                </template>
                <template #dynamicTip="{ date }">
                  <slot name="dynamicTip" :date="date" />
                </template>
              </custom-date-picker-content>
            </div>
          </div>
          <div v-else class="aw-range-picker-compare-container">
            <span class="aw-range-picker-compare-container-text">{{ globalConfig.currentDateLabel }}：</span>
            <custom-date-picker
              class="aw-range-picker-compare-container-picker"
              size="small"
              :allow-clear="allowClear"
              :value="innerValue"
              :mode="mode"
              :placeholder="placeholder"
              :range-time-options="rangeTimeOptions"
              :disable-date="disableDate"
              :show-shortcut="showShortcut"
              :show-dynamic="showDynamic"
              :time-offset="timeOffset"
              :first-day-of-week="firstDayOfWeek"
              @change="changeTime"
            >
              <!-- @vue-ignore -->
              <template #panelTip="{ date }">
                <slot name="panelTip" :date="date" />
              </template>
              <!-- @vue-ignore -->
              <template #dynamicTip="{ date }">
                <slot name="dynamicTip" :date="date" />
              </template>
            </custom-date-picker>
            <div class="aw-range-picker-compare-container-divider">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.92495 0.165916H5.21711L3.18599 5.85338H2.01093L0 0.165916H1.32851L2.62067 4.4836L3.92495 0.165916Z"
                  fill="#202020"
                  fill-opacity="0.6"
                />
                <path
                  d="M6.30522 4.09775C6.34291 4.35756 6.41694 4.55177 6.52731 4.68039C6.72921 4.91447 7.07513 5.03151 7.56508 5.03151C7.85851 5.03151 8.09675 5.00064 8.27981 4.93891C8.62708 4.82058 8.80071 4.60064 8.80071 4.2791C8.80071 4.09132 8.71457 3.94598 8.54228 3.84309C8.36999 3.74277 8.09944 3.65402 7.73064 3.57685L7.10071 3.4418C6.48155 3.30804 6.05352 3.1627 5.81662 3.00579C5.41551 2.74341 5.21496 2.33312 5.21496 1.77492C5.21496 1.26559 5.40878 0.842444 5.79643 0.505466C6.18408 0.168489 6.75344 0 7.50451 0C8.13175 0 8.66611 0.159486 9.1076 0.478457C9.55178 0.794855 9.78464 1.25531 9.80618 1.85981H8.61092C8.58939 1.51768 8.43325 1.2746 8.14251 1.13055C7.94869 1.03537 7.70776 0.987781 7.41971 0.987781C7.09936 0.987781 6.84362 1.04952 6.65249 1.17299C6.46136 1.29646 6.36579 1.46881 6.36579 1.69003C6.36579 1.89325 6.46001 2.04502 6.64845 2.14534C6.76959 2.21222 7.02802 2.29068 7.42375 2.38071L8.4494 2.61608C8.89897 2.71897 9.23816 2.85659 9.46698 3.02894C9.82233 3.29646 10 3.6836 10 4.19035C10 4.70997 9.79137 5.14212 9.37411 5.48682C8.95954 5.82894 8.37268 6 7.61353 6C6.83824 6 6.2285 5.83151 5.78432 5.49453C5.34014 5.15498 5.11804 4.68939 5.11804 4.09775H6.30522Z"
                  fill="#202020"
                  fill-opacity="0.6"
                />
              </svg>
              <div></div>
            </div>
            <template v-for="(compareItem, compareItemIndex) in innerCompareValue">
              <span class="aw-range-picker-compare-container-text">{{ globalConfig.compareDateLabel }}{{ innerCompareValue.length > 2 ? compareItemIndex + 1 : ''}}：</span>
              <custom-date-picker
                class="aw-range-picker-compare-container-picker"
                size="small"
                :allow-clear="allowClear"
                :value="compareItem"
                :mode="mode"
                :placeholder="placeholder"
                :range-time-options="rangeTimeOptions"
                :is-private-compare="true"
                :private-time="innerValue.time"
                :disable-date="disableDate"
                :show-shortcut="showShortcut"
                :show-dynamic="showDynamic"
                :time-offset="timeOffset"
                :first-day-of-week="firstDayOfWeek"
                @change="changeCompareTime($event, compareItemIndex)"
              >
                <!-- @vue-ignore -->
                <template #panelTip="{ date }">
                  <slot name="panelTip" :date="date" />
                </template>
                <!-- @vue-ignore -->
                <template #dynamicTip="{ date }">
                  <slot name="dynamicTip" :date="date" />
                </template>
              </custom-date-picker>
              <compare-icon
                :enable-add="enableAddCompare"
                :enable-del="enableDelCompare"
                @add="addCompare"
                @del="handleDelCompare(compareItemIndex)"
              />
            </template>
          </div>
          <div class="aw-range-picker-footer">
            <div v-if="showCompare" class="aw-range-picker-compare-switch">
              <t-switch :value="innerIsCompare" size="small" @change="handleChangeSwitch" />
              <span class="aw-range-picker-compare-switch-text">{{ globalConfig.compareTimeLabel }}</span>
            </div>
            <div class="aw-range-picker-btn-group">
              <!-- shape round 无效，因为 button-hook.scss 直接设置了 t-button 的 radius，那里优先级高 -->
              <t-button
                class="aw-range-picker-btn-round"
                theme="primary"
                :disabled="saveBtnDisabled"
                @click="saveTime"
                >{{ globalConfig.confirmLabel }}</t-button
              >
              <t-button
                class="aw-range-picker-btn-round aw-range-picker-btn-round-margin"
                shape="round"
                variant="outline"
                theme="default"
                @click="resetTime"
                >{{ globalConfig.cancelLabel }}</t-button
              >
            </div>
          </div>
        </div>
      </template>
    </t-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, computed } from 'vue';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import { default as TPopup } from 'tdesign-vue-next/esm/popup';
import { default as TButton } from 'tdesign-vue-next/esm/button';
import { default as TSwitch, SwitchValue } from 'tdesign-vue-next/esm/switch';
import { PopupVisibleChangeContext } from 'tdesign-vue-next';
import CustomDatePickerInput from './custom-date-picker-input.vue';
import CustomDatePickerContent from './custom-date-picker-content.vue';
import RangePickerSider from './base/picker-sider.vue';
import CompareIcon from './base/compare-icon.vue';
import {
  getDynamicTimeType,
  getSingleOptionTime,
  getRelativeTime,
  formatWeekDate,
  getDayjsType,
  getDayjsIosType,
} from './utils';
import { getStartEndTime } from './week';
import {
  useRangeGlobalConfig,
  DAYJS_UNIT_MAP,
  MOM_COMPARE_TYPE,
  YOY_COMPARE_TYPE,
  CUSTOM_TYPE,
  CUSTOM_COMPARE_TYPE,
  NDAY,
  INPUT_FORMAT_MAP,
  MOM_REGEX,
} from './constants';
import { SingleRangeValue, SingleRangeTimeOption } from './type';
import vueProps from './custom-date-props';
import { useProvideTempTime } from './hooks/useTempTime';
import { useBtnActive } from './hooks/useBtnActive';
import { usePickerPopup } from './hooks/usePickerPopup';
import { useSingleValue } from './hooks/useSingleValue';

const props = defineProps(vueProps);

const emit = defineEmits(['change']);

// 国际化
const CONST = useRangeGlobalConfig(props);
const { globalConfig } = CONST;

useProvideTempTime();

const pickerContentRef = ref<typeof CustomDatePickerContent>();
const pickerSideRef = ref<typeof RangePickerSider>();

const initialPicker = () => {
  pickerContentRef.value?.initialPicker();
}

const hackSafariScroll = () => {
  pickerContentRef.value?.hackSafariScroll();
}

const initActiveTab = () => {
  pickerSideRef.value?.initActiveTab()
}

const {
  panelVisible,
  popupPlacement,
  wrapStyle,
  pickerInputRef,
  popupRef,
  showPanel
} = usePickerPopup(props, {
  initialPicker,
  hackSafariScroll,
  initActiveTab
}, true)

const {
  sideTimeBtnActive,
  sideTimeDynamicActive,
  sideTimeCompareActive,
  allRangeOptions,
  btnCompareOptions,
  btnFixedOptions,
  btnCustomRangeOptions,
  setTimeActive,
  resetBtnActive
} = useBtnActive(CONST, props, true)

const {
  innerValue,
  innerCompareValue,
  innerIsCompare,
  saveBtnDisabled,
  resetValue,
  changeIsCompare,
  getOptionValueText,
  changeTime,
  changeCompareTime,
  changeMomType,
  clickSideBtn,
  addCompare,
  handleDelCompare,
  enableAddCompare,
  enableDelCompare
} = useSingleValue(CONST, props, {
  resetBtnActive,
  initialPicker
})

const showMomSelect = computed(() => {
  return innerValue.value.type === MOM_COMPARE_TYPE || sideTimeCompareActive.value
})

// 取消btn
const resetTime = () => {
  panelVisible.value = false;

  // 重置btn active
  setTimeActive(props.value);

  nextTick(() => {
    resetValue()
  });
};

const handlePanelVisibleChange = (_visible: boolean, { trigger }: PopupVisibleChangeContext) => {
  if (trigger === 'document') {
    panelVisible.value = false;
    resetTime();
  }
};

const mouseValue = ref<Date | undefined>();
const handleMouseEnterCell = (value?: Date) => {
  mouseValue.value = value;
};

const clearValue = () => {
  emit('change', {
    value: {
      type: '',
      time: undefined,
    },
    isCompare: false,
    compareValue: [],
  });

  panelVisible.value = false;

  nextTick(() => {
    innerIsCompare.value = false;
    sideTimeBtnActive.value = true;
    sideTimeDynamicActive.value = false;
  });
};

const saveTime = () => {
  if (saveBtnDisabled.value) {
    return;
  }

  if (props.showCompare) {
    emit('change', {
      value: {
        type: innerValue.value.type,
        time: innerValue.value.time
      },
      isCompare: innerIsCompare.value,
      compareValue: innerIsCompare.value ? cloneDeep(innerCompareValue.value) : []
    })
  } else {
    emit('change', {
      value: {
        type: innerValue.value.type,
        time: innerValue.value.time
      },
      isCompare: false,
      compareValue: []
    })
  }

  panelVisible.value = false;
};


// copy from clickSideBtn
const getOptionTimeValue = (option: SingleRangeTimeOption, isCompare = false) => {
  let time: Date | undefined;
  if (isCompare) {
    if (option.type === MOM_COMPARE_TYPE || option.type === YOY_COMPARE_TYPE) {
      if (props.privateTime) {
        time = getRelativeTime(option.type, props.privateTime, props.mode, false, props.firstDayOfWeek) as Date;
      }
    } else if (option.type !== CUSTOM_COMPARE_TYPE) {
      time = getSingleOptionTime(option);
    }
  } else if (option.type !== CUSTOM_TYPE) {
    time = getSingleOptionTime(option);
  }
  if (props.mode === 'week') {
    return time ? formatWeekDate(time, props.firstDayOfWeek, globalConfig.weekAbbreviation) : '';
  }
  return dayjs(time).format(INPUT_FORMAT_MAP[props.mode]);
};

const handleSideTimeBtnClick = (option: SingleRangeTimeOption) => {
  sideTimeBtnActive.value = true;
  sideTimeDynamicActive.value = false;
  sideTimeCompareActive.value = false;

  clickSideBtn(option);
};

const handleSideTimeRelativeClick = (option: SingleRangeTimeOption) => {
  sideTimeBtnActive.value = true
  sideTimeDynamicActive.value = false
  sideTimeCompareActive.value = true

  const match = innerValue.value.type.match(MOM_REGEX)
  const dayjsType = getDayjsType(props.mode)
  const dayjsIosType = getDayjsIosType(props.mode)
  const nowDayjs = dayjs().add(props.timeOffset, 'h')

  if (!match?.[1]) {
    const num = getStartEndTime('start', props.privateTime || nowDayjs, dayjsIosType, props.firstDayOfWeek).diff(
      getStartEndTime('start', innerValue.value.time || nowDayjs, dayjsIosType, props.firstDayOfWeek),
      dayjsType
    )
    const type = `${option.type}${num >= 0 ? '-' : '+'}${Math.abs(num)}${dayjsType}`
    clickSideBtn({
      title: '',
      type,
      isCompare: true,
      time: () => []
    })
  }
}

const handleSideTimeDynamicClick = () => {
  sideTimeBtnActive.value = false;
  sideTimeDynamicActive.value = true;

  let time = getStartEndTime(
    'start',
    dayjs().add(props.timeOffset, 'h'),
    DAYJS_UNIT_MAP[props.mode],
    props.firstDayOfWeek,
  ).toDate();

  if (innerValue.value.time && innerValue.value.time <= time) {
    time = innerValue.value.time
  }

  const leftType = getDynamicTimeType(
    'left',
    NDAY,
    innerValue.value.type,
    [time, undefined],
    props.mode,
    props.timeOffset,
    props.firstDayOfWeek,
  )[0];

  const timeType = `${leftType}`;

  clickSideBtn({
    title: '',
    type: timeType,
    isCompare: false,
    time: () => time,
  });
};

const handleChangeSwitch = (val: SwitchValue) => {
  changeIsCompare(val)
  setTimeActive(innerValue.value)
}
</script>
