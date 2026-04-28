<template>
  <div class="t-data-grid-overlay-loading">{{ loadingMessage }}</div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { ILoadingOverlayParams } from 'ag-grid-community';

const props = defineProps({
  params: {
    type: Object as PropType<ILoadingOverlayParams & { loadingMessage: string }>,
    default: () => ({ params: { loadingMessage: '' } }),
  },
});

const loadingMessage = computed(() => props.params.loadingMessage);
</script>

<style lang="scss" scoped>
.t-data-grid-overlay-loading {
}
</style>
