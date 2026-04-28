<template>
  <div class="aw-relative aw-inline-block">
    <div
      v-if="$attrs.disabled"
      class="aw-absolute aw-top-0 aw-left-0 aw-z-10 aw-inline-block aw-h-full aw-w-full aw-cursor-not-allowed"
      @click="handleClick"
    ></div>
    <TimePicker v-bind="$attrs">
      <template v-for="(_, name) in slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </TimePicker>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { TimePicker } from 'tdesign-vue-next/esm/time-picker';

export default defineComponent({
  name: 'TTimePicker',

  components: {
    TimePicker,
  },

  setup(_props, { slots, attrs }) {
    const handleClick = () => {
      if (attrs?.disabled) {
        return false;
      }
    };

    return {
      slots,
      handleClick,
    };
  },
});
</script>
