import { PropType } from 'vue';
import { PopupProps } from 'tdesign-vue-next/esm/popup';
import { RangeValue, RangeTimeOption, DisableDateType } from './type';

export default {
  value: {
    type: Object as PropType<RangeValue>,
    default: () => ({
      time: [],
    }),
  },
  // 是否允许清空
  allowClear: {
    type: Boolean,
    default: false,
  },
  // 是否可选择对比
  showCompare: {
    type: Boolean,
    default: false,
  },
  // 是否对比
  isCompare: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  compareValue: {
    type: Array as PropType<RangeValue[]>,
    default: () => [],
  },
  // 侧边栏额外配置按钮
  rangeTimeOptions: {
    type: Array as PropType<RangeTimeOption[]>,
    default: () => [],
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // 禁用时间范围，参考tdesign
  disableDate: {
    type: [Function, Array, Object] as PropType<DisableDateType>,
    default: () => ({}),
  },
  // 是否展示快捷按钮（侧边栏）
  showShortcut: {
    type: Boolean,
    default: true,
  },
  // 透传给 popup 组件的参数
  popupProps: {
    type: Object as PropType<PopupProps>,
    default: () => ({}),
  },
  // 尺寸
  size: {
    type: String,
    default: 'medium',
  },
  sideWidth: {
    type: Number,
    default: 0,
  },
  // 选择器模式
  mode: {
    type: String as PropType<'month' | 'date' | 'week'>,
    default: 'date',
  },
  // input显示完整时间，false时就显示个tag
  showCompleteInput: {
    type: Boolean,
    default: true,
  },
  // 支持动态自定义
  showDynamic: {
    type: Boolean,
    default: true,
  },
  // 是否无边框
  borderless: {
    type: Boolean,
    default: false,
  },
  // 时间偏移
  timeOffset: {
    type: Number,
    default: 0,
  },
  // 第一天从星期几开始
  firstDayOfWeek: {
    type: Number,
    default: 1,
  },
  // 私有对比，外部禁用
  isPrivateCompare: {
    type: Boolean,
    default: false,
  },
  // 私有时间，外部禁用
  privateTime: {
    type: Array as PropType<(Date | undefined)[]>,
    default: () => [],
  },
  // 自定义侧边栏快捷键
  customShortcutDecorator: {
    type: Function as PropType<(options: any) => any>,
    default: undefined,
  },
};
