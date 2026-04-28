import { provide, inject, ref } from 'vue'

const SIDE_MOUSE = Symbol('sideMouse')

export const useSideMouse = () => {
  const sideTimeEnter = ref(false)

  const handleMouseEnterSideTime = (e: MouseEvent) => {
    const element = e.currentTarget as HTMLElement;
    if (element) {
      sideTimeEnter.value = element.scrollHeight > element.clientHeight;
    }
  }

  const handleMouseLeaveSideTime = () => {
    sideTimeEnter.value = false
  }

  provide(SIDE_MOUSE, sideTimeEnter)

  return {
    sideTimeEnter,
    handleMouseEnterSideTime,
    handleMouseLeaveSideTime
  }
}

export const injectSideMouse = () => {
  return inject(SIDE_MOUSE, ref(false))
}