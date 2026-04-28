import { ref, computed, watch, nextTick, type Ref } from 'vue'
import dayjs from 'dayjs'
import { SwitchValue } from 'tdesign-vue-next/esm/switch';
import {
  CUSTOM_TYPE,
  CUSTOM_COMPARE_TYPE,
  MOM_COMPARE_TYPE,
  YOY_COMPARE_TYPE,
  INPUT_FORMAT_MAP,
  MOM_REGEX
} from '../constants'
import { getRelativeTime, formatWeekDate } from '../utils'
import type { RangeValue, RangeTimeOption } from '../type'

export const useRangeValue = (CONST: {
  RANGE_COMPARE_TIME: RangeTimeOption[]
  CUSTOM_COMPARE_TIME: RangeTimeOption
  CUSTOM_TIME: RangeTimeOption
  globalConfig: any
}, props: {
  value: RangeValue
  compareValue: RangeValue[]
  isCompare: boolean
  privateTime: (Date | undefined)[]
  mode: string
  firstDayOfWeek: number
}, dep: {
  showTimePicker: Ref<boolean>
  activeTimeIndex: Ref<number>
}, exec: {
  resetBtnActive: () => void,
  resetPanelCellClick: ()=> void,
  initialPicker: () => void,
  changeIndex: (index: number) => void
}) => {
  const initValue = () => {
    return {
      type: props.value.type || CUSTOM_TYPE,
      time: !(props.value?.time?.length === 0) ? props.value.time.concat() : []
    }
  }

  const initCompareValue = () => {
    if (!props.isCompare) {
      return []
    }
    return props.compareValue.map((item) => {
      return {
        type: item.type || CUSTOM_COMPARE_TYPE,
        time: !(item?.time?.length === 0) ? item.time.concat() : []
      }
    })
  }

  const innerValue = ref(initValue())

  const innerCompareValue = ref(initCompareValue())

  const innerIsCompare = ref(props.isCompare)

  const saveBtnDisabled = computed(() => {
    // 开启时间对比且对比值为空
    if (innerIsCompare.value && (!innerCompareValue.value.length || innerCompareValue.value.some((valueItem) => valueItem.time.filter((item) => !!item).length !== 2))) {
      return true
    }

    if (!dep.showTimePicker.value) {
      if (innerValue.value.time.filter((item) => !!item).length !== 2) {
        return true
      }

      return false
    }

    if (!innerValue.value.time[dep.activeTimeIndex.value]) {
      return true
    }

    if (dep.activeTimeIndex.value === 1 && !innerValue.value.time[0]) {
      return true
    }

    return false
  })

  watch(
    () => props.value,
    () => {
      innerValue.value = initValue()
    },
    {
      deep: true
    }
  )


  watch(
    () => props.compareValue,
    () => {
      innerCompareValue.value = initCompareValue()
    },
    {
      deep: true
    }
  )

  watch(
    () => props.isCompare,
    () => {
      innerIsCompare.value = props.isCompare
    }
  )

  const resetValue = () => {
    innerValue.value = initValue()
    innerIsCompare.value = props.isCompare
    innerCompareValue.value = initCompareValue()
  }

  const changeTime = ({ value }: { value: { type: string; time: Date[] } }, { resetClick } = { resetClick: false }) => {
    innerValue.value = value

    if (resetClick) {
      exec.resetBtnActive()
      exec.resetPanelCellClick()
    }

    innerCompareValue.value.forEach((valueItem, valueIndex) => {
      // 只有前一时间段和去年同期要重置
      if (
        CONST.RANGE_COMPARE_TIME.find(
          (item) => item.type === valueItem.type || (item.regex && item.regex.test(valueItem.type))
        )
      ) {
        innerCompareValue.value[valueIndex] = {
          ...valueItem,
          type: CUSTOM_COMPARE_TYPE
        }
      }
    })
  }

  const changeCompareTime = ({ value }: { value: { type: string; time: Date[] } }, index: number) => {
    innerCompareValue.value[index] = value
  }

  const changeMomType = (type: string) => {
    let time = innerValue.value.time
    if (props.privateTime[0] && props.privateTime[1]) {
      time = getRelativeTime(
        type,
        props.privateTime as Date[],
        props.mode,
        false,
        props.firstDayOfWeek
      ) as Date[]
    }

    innerValue.value = {
      type,
      time
    }

    exec.changeIndex(0)
    nextTick(() => {
      exec.initialPicker()
    })
  }

  const getOptionValue = (option: RangeTimeOption) => {
    let type = innerValue.value.type
    let time = innerValue.value.time

    if (option.isCompare) {
      type = option.type

      if (MOM_REGEX.test(type) || option.type === YOY_COMPARE_TYPE) {
        if (props.privateTime[0] && props.privateTime[1]) {
          time = getRelativeTime(
            type,
            props.privateTime as Date[],
            props.mode,
            false,
            props.firstDayOfWeek
          ) as Date[]
        }
      } else if (option.type !== CUSTOM_COMPARE_TYPE) {
        time = option.time instanceof Function ? option.time() : option.time
      }
    } else {
      type = option.type
      if (option.type !== CUSTOM_TYPE) {
        time = option.time instanceof Function ? option.time() : option.time
      }
    }

    return { type, time }
  }

  const getOptionValueText = (option: RangeTimeOption) => {
    const { time } = getOptionValue(option)
    if (props.mode === 'week') {
      return time.map((item) => item ? formatWeekDate(item, props.firstDayOfWeek, CONST.globalConfig.weekAbbreviation) : '')
    }
    return time.map((item) => dayjs(item).format(INPUT_FORMAT_MAP[props.mode]))
  }

  const clickSideBtn = (option: RangeTimeOption) => {
    const { type, time } = getOptionValue(option)

    if (!option.isCompare) {
      if (innerValue.value.type !== option.type) {
        // 对比需重置为自定义
        innerCompareValue.value.forEach((valueItem, valueIndex) => {
          if (
            CONST.RANGE_COMPARE_TIME.find(
              (item) => item.type === valueItem.type || (item.regex && item.regex.test(valueItem.type))
            )
          ) {
            // valueItem.type = CUSTOM_COMPARE_TYPE

            innerCompareValue.value[valueIndex] = {
              ...valueItem,
              type: CUSTOM_COMPARE_TYPE
            }
          }
        })
      }
    }

    innerValue.value = {
      type,
      time
    }

    exec.changeIndex(0)
    nextTick(() => {
      exec.initialPicker()
    })
  }

  const addCompare = () => {
    if (innerValue.value.time?.[0] && innerValue.value.time?.[1]) {
      innerCompareValue.value.push({
        type: MOM_COMPARE_TYPE,
        time: getRelativeTime(
          MOM_COMPARE_TYPE,
          innerValue.value.time as Date[],
          props.mode,
          false,
          props.firstDayOfWeek
        ) as Date[]
      })
    } else {
      innerCompareValue.value.push({
        type: CUSTOM_COMPARE_TYPE,
        time: []
      })
    }
  }

  const changeIsCompare = (val: SwitchValue) => {
    innerIsCompare.value = Boolean(val)

    if (!innerCompareValue.value.length) {
      addCompare()
    }
  }

  const MIN_COMPARE_LEN = 1
  const MAX_COMPARE_LEN = 4
  const enableAddCompare = computed(() => {
    return innerCompareValue.value.length < MAX_COMPARE_LEN
  })
  const enableDelCompare = computed(() => {
    return innerCompareValue.value.length > MIN_COMPARE_LEN
  })

  const handleDelCompare = (index: number) => {
    innerCompareValue.value.splice(index, 1)
  }

  return {
    innerValue,
    innerCompareValue,
    innerIsCompare,
    saveBtnDisabled,
    resetValue,
    changeIsCompare,
    changeTime,
    changeCompareTime,
    changeMomType,
    clickSideBtn,
    addCompare,
    handleDelCompare,
    enableAddCompare,
    enableDelCompare,
    getOptionValueText
  }
}