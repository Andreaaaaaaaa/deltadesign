<template>
  <icon
    :class="[
      `${className}`,
      hover ? classNameHover : '',
      classNameClicked,
      { 'aw-cursor-pointer aw-rounded': !disabled && (hover || clicked) },
      classNameDisabled,
    ]"
  >
    <template v-for="(_, name) in slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </icon>
</template>

<script lang="ts">
import { Icon } from 'tdesign-vue-next/esm/icon';
import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
  name: 'TIcon',

  components: {
    Icon,
  },
  props: {
    hover: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
      default: 'light',
    },
    clicked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    const className = computed(() => {
      const curTheme = props.theme;
      let resClass = '';
      if (props.disabled) {
        return resClass;
      }
      switch (curTheme) {
        case 'light':
          resClass = 'aw-text-black-60';
          break;
        case 'dark':
          resClass = 'aw-text-white';
          break;
        case 'gray':
          resClass = 'aw-text-white';
          break;
        case 'red':
          resClass = 'aw-text-white';
          break;
        default:
          resClass = '';
          break;
      }
      return resClass;
    });

    // 悬浮颜色
    const classNameHover = computed(() => {
      const curTheme = props.theme;
      let resClass = '';
      if (props.disabled || !props.hover || props.clicked) {
        return resClass;
      }

      switch (curTheme) {
        case 'light':
          resClass = ' hover:aw-text-black ';
          break;
        case 'dark':
          resClass = 'hover:aw-text-white-70';
          break;
        case 'gray':
          resClass = 'hover:aw-text-white-70';
          break;
        case 'red':
          resClass = 'hover:aw-text-white-70';
          break;
        default:
          resClass = '';
          break;
      }
      resClass += ' hover:aw-bg-gray-50/30';
      return resClass;
    });

    // 选中颜色
    const classNameClicked = computed(() => {
      const curTheme = props.theme;
      let resClass = '';
      if (!props.clicked) {
        return resClass;
      }
      switch (curTheme) {
        case 'light':
          resClass = 'aw-text-black';
          break;
        case 'dark':
          resClass = 'aw-text-white';
          break;
        case 'gray':
          resClass = 'aw-text-white';
          break;
        case 'red':
          resClass = 'aw-text-white';
          break;
        default:
          resClass = '';
          break;
      }

      resClass += ' aw-bg-gray-50/50';
      return resClass;
    });

    // 禁止颜色
    const classNameDisabled = computed(() => {
      const curTheme = props.theme;
      let resClass = '';
      if (!props.disabled) {
        return resClass;
      }
      switch (curTheme) {
        case 'light':
          resClass = 'aw-text-black-30';
          break;
        case 'dark':
          resClass = 'aw-text-white-30';
          break;
        case 'gray':
          resClass = 'aw-text-white-30';
          break;
        case 'red':
          resClass = 'aw-text-white-30';
          break;
        default:
          resClass = '';
          break;
      }
      return resClass;
    });

    return {
      slots,
      className,
      classNameHover,
      classNameClicked,
      classNameDisabled,
    };
  },
});
</script>
