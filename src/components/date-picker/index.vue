<template>
  <date-picker>
    <template #suffixIcon>
      <slot name="suffixIcon">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.5 0C9.77614 0 10 0.223858 10 0.5V1H11C12.3807 1 13.5 2.11929 13.5 3.5V11C13.5 12.3807 12.3807 13.5 11 13.5H3C1.61929 13.5 0.5 12.3807 0.5 11V3.5C0.5 2.11929 1.61929 1 3 1H4V0.5C4 0.223858 4.22386 0 4.5 0C4.77614 0 5 0.223858 5 0.5V1H9V0.5C9 0.223858 9.22386 0 9.5 0ZM4 2V2.5C4 2.77614 4.22386 3 4.5 3C4.77614 3 5 2.77614 5 2.5V2H9V2.5C9 2.77614 9.22386 3 9.5 3C9.77614 3 10 2.77614 10 2.5V2H11C11.8284 2 12.5 2.67157 12.5 3.5V4.5H1.5V3.5C1.5 2.67157 2.17157 2 3 2H4ZM1.5 5.5V11C1.5 11.8284 2.17157 12.5 3 12.5H11C11.8284 12.5 12.5 11.8284 12.5 11V5.5H1.5Z"
            :fill="$attrs.disabled ? 'rgba(32, 32, 32, 0.3)' : 'rgba(32, 32, 32, 0.6)'"
          />
        </svg>
      </slot>
    </template>
  </date-picker>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DatePicker from 'tdesign-vue-next/esm/date-picker';

export default defineComponent({
  name: 'TDatePicker',

  components: {
    DatePicker,
  },
});
</script>
