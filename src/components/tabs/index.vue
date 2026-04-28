<template>
  <Tabs v-if="isSizeSmall" size="" :class="[typeClassName]">
    <slot></slot>
  </Tabs>
  <Tabs v-else>
    <slot></slot>
  </Tabs>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Tabs, TabPanel } from 'tdesign-vue-next/esm/tabs';
// import { TNode } from 'tdesign-vue-next/esm/common';

export default defineComponent({
  name: 'TTabs',
  components: {
    Tabs,
  },
  props: {
    size: {
      type: String,
      default: () => 'medium',
    },
  },
  setup(props) {
    const isSizeSmall = computed(() => props.size === 'small');

    let typeClassName = '';
    if (isSizeSmall.value) {
      typeClassName = 't-size-s';
    }

    return {
      isSizeSmall,
      typeClassName,
    };
  },
});
</script>