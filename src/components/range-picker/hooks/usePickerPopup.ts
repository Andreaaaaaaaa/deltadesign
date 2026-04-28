import { ref, computed, watch, nextTick, type Ref } from 'vue'
import { PopupPlacement } from 'tdesign-vue-next/esm/popup';
import {
  getSideWidth,
  SIZE_PADDING,
  DEFAULT_PLACEMENT,
  DATE_HEIGHT,
  MONTH_HEIGHT,
} from '../constants'
import { isTimeType, detectIsSafari } from '../utils'

export const usePickerPopup = (props: {
  sideWidth: number
  mode: string
  showShortcut: boolean
  disabled: boolean
}, exec: {
  initialPicker: () => void
  hackSafariScroll: () => void
  scrollPicker?: () => void
  initActiveTab?: () => void
}, isSingle: boolean) => {
  const popupRef = ref();

  const WIDTH = getSideWidth(props.sideWidth)

  const panelVisible = ref(false)

  const isSafari = detectIsSafari()
  watch(
    () => panelVisible.value,
    () => {
      if (isSafari && !panelVisible.value) {
        exec.hackSafariScroll()
      }
    }
  )

  const popupPlacement: Ref<PopupPlacement> = ref('bottom-left')

  const wrapStyle = computed(() => {
    const sidebarWidth = `${WIDTH.SIDE_WIDTH}px`
    return `--aw-range-picker-sidebar: ${sidebarWidth}`;
  })

  const showTimePicker = computed(() => isTimeType(props.mode))

  const pickerInputRef = ref<any>(null)

  const showPanel = () => {
    if (!props.disabled && !panelVisible.value) {
      panelVisible.value = true
      exec.initialPicker?.()
      exec.initActiveTab?.()

      const position: string[] = []

      const inputEle = pickerInputRef.value

      if (!inputEle) {
        return
      }

      const inputRect = inputEle.getBoundingClientRect()

      let width = 0
      let height = 0

      if (isSingle) {
        height = props.mode === 'date' || props.mode === 'week' ? DATE_HEIGHT : MONTH_HEIGHT

        if (props.showShortcut) {
          width = showTimePicker.value ? WIDTH.TIME_SINGLE_SHORT_WIDTH : WIDTH.SINGLE_SHORT_WIDTH
        } else {
          width = showTimePicker.value ? WIDTH.TIME_NOSHORT_WIDTH : WIDTH.PANEL_WIDTH
        }
      } else {
        height = props.mode === 'date' || props.mode === 'week' || showTimePicker.value ? DATE_HEIGHT : MONTH_HEIGHT

        if (props.showShortcut) {
          width = showTimePicker.value ? WIDTH.TIME_SHORT_WIDTH : WIDTH.SHORT_WIDTH
        } else {
          width = showTimePicker.value ? WIDTH.TIME_NOSHORT_WIDTH : WIDTH.PANEL_WIDTH
        }
      }

      const { clientHeight, clientWidth } = document.documentElement

      const bottom = clientHeight - inputRect.bottom
      const top = inputRect.top
      const right = clientWidth - inputRect.right
      const left = inputRect.left
      const needHeight = height + SIZE_PADDING
      const needWidth = width + SIZE_PADDING

      if (bottom > needHeight) {
        position.push('bottom')
      } else if (top > needHeight) {
        position.push('top')
      }

      // 当上下都没空间时，直接看左右剩余空间
      if (position.length === 0) {
        if (right > needWidth) {
          position.push('right')
        } else if (left > needWidth) {
          position.push('left')
        }
        // 上下有足够空间，需要加上原本宽度
      } else if (right + inputRect.width > needWidth) {
        position.push('left')
      } else if (left + inputRect.width > needWidth) {
        position.push('right')
      }

      const placement = position.join('-') as PopupPlacement;
      if (!placement) {
        // 固定位置，防止疯狂闪烁
        popupPlacement.value = DEFAULT_PLACEMENT;
        nextTick(() => {
          const parent = popupRef.value?.getOverlay()?.parentElement;
          if (parent) {
            parent.classList.add('aw-range-picker-overlay');
            document.documentElement.style.setProperty('--aw-range-picker-left', `${left}px`);
            document.documentElement.style.setProperty('--aw-range-picker-top', `${top + inputRect.height}px`);
          }
        });
      } else {
        popupPlacement.value = placement;
        document.documentElement.style.removeProperty('--aw-range-picker-left');
        document.documentElement.style.removeProperty('--aw-range-picker-top');
      }
    }

    if (!props.disabled && panelVisible.value && !isSingle) {
      exec.scrollPicker?.()
    }
  }

  return {
    panelVisible,
    popupPlacement,
    wrapStyle,
    showTimePicker,
    pickerInputRef,
    showPanel,
    popupRef
  }
}