import { ref, computed, watch, nextTick } from 'vue'
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
import { getRelativeTime, getSingleOptionTime, formatWeekDate } from '../utils'
import type { SingleRangeValue, SingleRangeTimeOption, RangeTimeOption } from '../type'

export const useSingleValue = (CONST: {
  RANGE_COMPARE_TIME: RangeTimeOption[]
  CUSTOM_COMPARE_TIME: RangeTimeOption
  CUSTOM_TIME: RangeTimeOption
  globalConfig: any
}, props: {
  value: SingleRangeValue
  compareValue: SingleRangeValue[]
  isCompare: boolean
  privateTime?: Date
  mode: string
  firstDayOfWeek: number
}, exec: {
  resetBtnActive: () => void,
  initialPicker?: () => void
}) => {
  const initValue = () => {
    return {
      type: props.value.type || CUSTOM_TYPE,
      time: props.value.time
    }
  }

  const initCompareValue = () => {
    if (!props.isCompare) {
      return []
    }
    return props.compareValue.map((item) => {
      return {
        type: item.type || CUSTOM_COMPARE_TYPE,
        time: item.time
      }
    })
  }

  const innerValue = ref(initValue())

  const innerCompareValue = ref(initCompareValue())

  const innerIsCompare = ref(props.isCompare)

  const saveBtnDisabled = computed(() => {
    if (!innerValue.value.time) {
      return true
    }

    if (innerIsCompare.value && (!innerCompareValue.value.length || innerCompareValue.value.some((item) => !item.time))) {
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

  const changeTime = ({ value }: { value: { type: string; time: Date }}, { resetClick } = { resetClick: false }) => {
    innerValue.value = value

    if (resetClick) {
      exec.resetBtnActive()
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

  const changeCompareTime = ({ value }: { value: { type: string; time: Date }}, index: number) => {
    innerCompareValue.value[index] = value
  }

  const changeMomType = (type: string) => {
    let time = innerValue.value.time
    if (props.privateTime) {
      time = getRelativeTime(type, props.privateTime, props.mode, true, props.firstDayOfWeek) as Date
    }

    innerValue.value = {
      type,
      time
    }

    nextTick(() => {
      exec.initialPicker?.()
    })
  }

  const getOptionValue = (option: SingleRangeTimeOption) => {
    let type = innerValue.value.type
    let time = innerValue.value.time

    if (option.isCompare) {
      type = option.type

      if (MOM_REGEX.test(type) || option.type === YOY_COMPARE_TYPE) {
        if (props.privateTime) {
          time = getRelativeTime(
            type,
            props.privateTime,
            props.mode,
            true,
            props.firstDayOfWeek
          ) as Date
        }
      } else if (option.type !== CUSTOM_COMPARE_TYPE) {
        time = getSingleOptionTime(option)
      }
    } else {
      type = option.type
      if (option.type !== CUSTOM_TYPE) {
        time = getSingleOptionTime(option)
      }
    }

    return { type, time }
  }

  const getOptionValueText = (option: SingleRangeTimeOption) => {
    const { time } = getOptionValue(option)
    let text = dayjs(time).format(INPUT_FORMAT_MAP[props.mode])
    if (props.mode === 'week') {
      text = formatWeekDate(time!, props.firstDayOfWeek, CONST.globalConfig.weekAbbreviation)
    }
    return [text]
  }

  const clickSideBtn = (option: SingleRangeTimeOption) => {
    const { type, time } = getOptionValue(option)

    if (!option.isCompare) {
      // 对比需重置为自定义
      if (innerValue.value.type !== option.type) {
        innerCompareValue.value.forEach((valueItem, valueIndex) => {
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
    }

    innerValue.value = {
      type,
      time
    }

    nextTick(() => {
      exec.initialPicker?.()
    })
  }

  const addCompare = () => {
    if (innerValue.value.time) {
      innerCompareValue.value.push({
        type: MOM_COMPARE_TYPE,
        time: getRelativeTime(
          MOM_COMPARE_TYPE,
          innerValue.value.time as Date,
          props.mode,
          true,
          props.firstDayOfWeek
        ) as Date
      })
    } else {
      innerCompareValue.value.push({
        type: CUSTOM_COMPARE_TYPE,
        time: null as any
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