<template>
  <div class="color-render-list">
    <slot name="before"></slot>
    <div
      v-for="(el, i) in colors"
      :key="i"
      :class="{
        'color-render-item': true,
        'color-render-item--rotate': rulesType === E_CONDITION_RULES_KEY.DATABAR && i === 0,
      }"
      :style="barStyle(el || '')"
    />
    <slot name="after"></slot>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent, toRefs, computed } from 'vue';

import { E_FILLING, E_CONDITION_RULES_KEY } from '../../enums';
import { transformColorByFilling } from '../../utils';

export default defineComponent({
  name: 'ColorRender',
  props: {
    color: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },
    filling: {
      type: String as PropType<E_FILLING>,
      default: E_FILLING.SOLID,
    },
    direction: {
      type: String as PropType<'right' | 'left'>,
      default: 'right',
    },
    type: {
      type: String as PropType<E_CONDITION_RULES_KEY>,
      default: E_CONDITION_RULES_KEY.SINGLEDATABAR,
    },
  },
  setup(props) {
    const { color, filling, type, direction } = toRefs(props);

    const colors = computed(() => color.value || []);

    const rulesType = computed(() => type.value);

    const barStyle = (value: string) => `
      background: ${transformColorByFilling(value, filling.value, direction.value)};
    `;

    return { colors, rulesType, barStyle, E_CONDITION_RULES_KEY };
  },
});
</script>
<style lang="scss" scoped>
.color-render-list {
  position: relative;
  height: 20px;
  width: 100%;
  display: flex;
  align-items: center;
}

.color-render-item {
  flex: 1;
  height: 16px;
  padding: 6px 0;
  &--rotate {
    transform: rotate(180deg);
  }
}
</style>
