<template>
  <Loading :class="{ 'aw-flex-col': direction === 'vertical', 'aw-loading-container': true }">
    <template v-for="(_, name) in slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </Loading>
</template>

<script lang="ts">
import { Loading } from 'tdesign-vue-next/esm/loading';

export default {
  name: 'TLoading',

  components: {
    Loading,
  },

  setup(props, { slots, attrs }) {
    return {
      slots,
      direction: attrs?.direction
    };
  },
};
</script>
<style lang="scss" scoped>
.aw-loading-container {
  :deep(.t-icon-loading .t-loading__gradient-conic) {
    background: conic-gradient(from 90deg at 50% 50%, rgba(77, 93, 178, 0.0001) 0deg, #4D5DB2 360deg) !important;
    opacity: 0.6;
  }

  :deep(.t-loading__text) {
    @apply aw-text-black-60;

  }
}
</style>
