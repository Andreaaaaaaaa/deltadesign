import { ref, computed, watch } from 'vue'
import {
  MOM_COMPARE_TYPE,
  MOM_REGEX,
  SINGLE_TIME_DYNAMIC_REGEX,
  MODE_MAP,
  SINGLE_DYNAMIC_REGEX,
  SINGLE_MONTH_DYNAMIC_REGEX,
  TIME_DYNAMIC_REGEX,
  DYNAMIC_REGEX,
  MONTH_DYNAMIC_REGEX,
} from '../constants'
import type { SingleRangeValue, RangeValue, SingleRangeTimeOption, RangeTimeOption, GroupOption } from '../type'

const groupOptions = (options: (RangeTimeOption | SingleRangeTimeOption)[]): (RangeTimeOption | SingleRangeTimeOption | GroupOption)[] => {
  const result: (RangeTimeOption | SingleRangeTimeOption | GroupOption)[] = [];
  const groupMap = new Map<string, (RangeTimeOption | SingleRangeTimeOption)[]>();
  const processedGroups = new Set<string>();

  // 第一次遍历：收集所有分组
  options.forEach((option) => {
    if (option.group) {
      if (!groupMap.has(option.group)) {
        groupMap.set(option.group, []);
      }
      groupMap.get(option.group)?.push(option);
    }
  });

  // 第二次遍历：按原始顺序处理
  options.forEach((option) => {
    if (!option.group) {
      // 非分组项直接添加
      result.push(option);
    } else if (!processedGroups.has(option.group)) {
      // 遇到新分组时，添加整个分组
      processedGroups.add(option.group);
      const children = groupMap.get(option.group);
      if (children?.length) {
        result.push({
          title: option.group,
          children,
          id: Math.random().toString(36).substring(2, 15)
        });
      }
    }
    // 如果是已处理过的分组项，则跳过
  });

  return result;
}

export const useBtnActive = (CONST: {
  RANGE_COMPARE_TIME: RangeTimeOption[]
  CUSTOM_COMPARE_TIME: RangeTimeOption
  CUSTOM_TIME: RangeTimeOption
  SINGLE_RANGE_TIME: (timeOffset: number, firstDayOfWeek?: number) => SingleRangeTimeOption[]
  RANGE_TIME: (timeOffset: number, firstDayOfWeek?: number) => RangeTimeOption[]
  RANGE_DYNAMIC_MOM: any
}, props: {
  isPrivateCompare: boolean
  rangeTimeOptions: any[]
  mode: string
  timeOffset: number
  firstDayOfWeek: number
  showDynamic: boolean
  value: RangeValue | SingleRangeValue
  customShortcutDecorator?: (options: any) => any
}, isSingle: boolean) => {
  // 普通按钮与动态自定义按钮的active状态
  const sideTimeBtnActive = ref(true)
  const sideTimeDynamicActive = ref(false)
  const sideTimeCompareActive = ref(false)

  const options = computed(() => {
    return isSingle ? CONST.SINGLE_RANGE_TIME(props.timeOffset, props.firstDayOfWeek) : CONST.RANGE_TIME(props.timeOffset, props.firstDayOfWeek)
  })

  // 按钮展示的对比选项
  const btnCompareOptions = computed(() => {
    return CONST.RANGE_DYNAMIC_MOM[props.mode as keyof typeof CONST.RANGE_DYNAMIC_MOM]
  })

  // 按钮展示的固定选项
  const btnFixedOptions = computed<(SingleRangeTimeOption | RangeTimeOption | GroupOption)[]>(() => {
    const timeOptions = options.value
      .concat(props.isPrivateCompare ? CONST.CUSTOM_COMPARE_TIME : CONST.CUSTOM_TIME)
      .filter((item) => !item.mode || item.mode === props.mode)

    let processedOptions = timeOptions;
    if (props.customShortcutDecorator) {
      processedOptions = props.customShortcutDecorator(timeOptions);
    }
    return groupOptions(processedOptions);
  });

  // 按钮展示的额外选项
  const btnCustomRangeOptions = computed(() => {
    const customRangeOptions = props.rangeTimeOptions?.filter((item) => !item.hide) || [];
    return groupOptions(customRangeOptions);
  })

  // 全部的时间选项
  const allRangeOptions = computed<(SingleRangeTimeOption | RangeTimeOption)[]>(() => {
    let concatOptions = options.value
      .concat(props.rangeTimeOptions as any, btnCompareOptions.value)

    if (props.isPrivateCompare) {
      concatOptions = concatOptions.concat(CONST.RANGE_COMPARE_TIME, CONST.CUSTOM_COMPARE_TIME)
    } else {
      concatOptions = concatOptions.concat(CONST.CUSTOM_TIME)
    }

    return concatOptions.filter((item) => !item.mode || item.mode === props.mode)
  })

  const setTimeActive = (value: SingleRangeValue | RangeValue) => {
    const findItem = allRangeOptions.value.find((item) => item.type === value.type)
    let regPattern: RegExp

    if (isSingle) {
      regPattern = SINGLE_TIME_DYNAMIC_REGEX
      if ([MODE_MAP.DATE, MODE_MAP.MONTH, MODE_MAP.WEEK].includes(props.mode)) {
        regPattern = SINGLE_DYNAMIC_REGEX
      }
    } else {
      regPattern = TIME_DYNAMIC_REGEX
      if ([MODE_MAP.DATE, MODE_MAP.MONTH, MODE_MAP.WEEK].includes(props.mode)) {
        regPattern = DYNAMIC_REGEX
      }
    }
    const matchItem = value.type?.match(regPattern)
    // 找到的直接强制调整为默认
    if (findItem || !matchItem || !props.showDynamic) {
      sideTimeBtnActive.value = true
      sideTimeDynamicActive.value = false
    } else if (matchItem) {
      sideTimeBtnActive.value = false
      sideTimeDynamicActive.value = true
    }

    // mom的特殊处理
    if (props.isPrivateCompare && !findItem && MOM_REGEX.test(value.type)) {
      if (value.type === MOM_COMPARE_TYPE) {
        sideTimeCompareActive.value = false
      } else {
        sideTimeCompareActive.value = true
      }
    } else {
      sideTimeCompareActive.value = false
    }
  }

  const resetBtnActive = () => {
    sideTimeBtnActive.value = true
    sideTimeDynamicActive.value = false
    sideTimeCompareActive.value = false
  }

  watch(
    [() => props.value, () => props.mode],
    () => {
      setTimeActive(props.value)
    },
    {
      deep: true,
      immediate: true
    }
  )

  return {
    sideTimeBtnActive,
    sideTimeDynamicActive,
    sideTimeCompareActive,
    allRangeOptions,
    btnCompareOptions,
    btnFixedOptions,
    btnCustomRangeOptions,
    setTimeActive,
    resetBtnActive
  }
}