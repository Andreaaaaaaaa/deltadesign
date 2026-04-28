<template>
  <Tooltip>
    <slot></slot>
    <template #content>
      <div class="contentContainer">{{ content }}</div>
    </template>
  </Tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Tooltip } from 'tdesign-vue-next/esm/tooltip';
import { TNode } from 'tdesign-vue-next/esm/common';

export default defineComponent({
  name: 'TTooltip',
  components: {
    Tooltip,
  },
  props: {
    content: {
      type: String || (Object as () => TNode),
      default: () => '',
    },
  },
  setup() {
    return {
    };
  },
});
</script>