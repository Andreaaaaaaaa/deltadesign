<template>
  <div class="aw-range-picker__compare-container-icon-wrapper">
    <t-tooltip :content="globalConfig.compareMaxTip" :disabled="enableAdd" placement="top-right" overlay-class-name="aw-range-picker-icon__tooltip">
      <svg
        class="aw-range-picker__compare-container-icon"
        :class="{ 'aw-range-picker__compare-container-icon--disabled': !enableAdd }"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="handleAdd"
      >
        <path
          d="M8.0001 4.9873C8.33147 4.9873 8.6001 5.25593 8.6001 5.5873V7.4873H10.4999C10.8313 7.4873 11.0999 7.75593 11.0999 8.08731C11.0999 8.41868 10.8313 8.6873 10.4999 8.6873H8.6001V10.5873C8.6001 10.9187 8.33147 11.1873 8.0001 11.1873C7.66873 11.1873 7.4001 10.9187 7.4001 10.5873V8.6873H5.4999C5.16853 8.6873 4.8999 8.41868 4.8999 8.0873C4.8999 7.75593 5.16853 7.4873 5.4999 7.4873H7.4001V5.5873C7.4001 5.25593 7.66873 4.9873 8.0001 4.9873Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.8999 3.5873C1.8999 2.70365 2.61625 1.9873 3.4999 1.9873H12.4999C13.3836 1.9873 14.0999 2.70365 14.0999 3.5873V12.5873C14.0999 13.471 13.3836 14.1873 12.4999 14.1873H3.4999C2.61625 14.1873 1.8999 13.471 1.8999 12.5873V3.5873ZM3.4999 3.1873C3.27899 3.1873 3.0999 3.36639 3.0999 3.5873V12.5873C3.0999 12.8082 3.27899 12.9873 3.4999 12.9873H12.4999C12.7208 12.9873 12.8999 12.8082 12.8999 12.5873V3.5873C12.8999 3.36639 12.7208 3.1873 12.4999 3.1873H3.4999Z"
          fill="currentColor"
        />
      </svg>
    </t-tooltip>
    <t-tooltip :content="globalConfig.compareMinTip" :disabled="enableDel" placement="top-right" overlay-class-name="aw-range-picker-icon__tooltip">
      <svg
        class="aw-range-picker__compare-container-icon"
        :class="{ 'aw-range-picker__compare-container-icon--disabled': !enableDel }"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="handleDelete"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.8499 3.4873V3.0873C5.8499 2.86639 6.02899 2.6873 6.2499 2.6873H9.7499C9.97082 2.6873 10.1499 2.86639 10.1499 3.0873V3.4873H5.8499ZM4.6499 3.4873V3.0873C4.6499 2.20365 5.36625 1.4873 6.2499 1.4873H9.7499C10.6336 1.4873 11.3499 2.20365 11.3499 3.0873V3.4873H12.9999C13.3313 3.4873 13.5999 3.75593 13.5999 4.0873C13.5999 4.41868 13.3313 4.6873 12.9999 4.6873H12.5999V13.0873C12.5999 13.971 11.8836 14.6873 10.9999 14.6873H4.9999C4.11625 14.6873 3.3999 13.971 3.3999 13.0873V4.6873H2.9999C2.66853 4.6873 2.3999 4.41868 2.3999 4.0873C2.3999 3.75593 2.66853 3.4873 2.9999 3.4873H4.6499ZM4.5999 4.6873V13.0873C4.5999 13.3082 4.77899 13.4873 4.9999 13.4873H10.9999C11.2208 13.4873 11.3999 13.3082 11.3999 13.0873V4.6873H4.5999ZM6.7499 6.4873C7.08127 6.4873 7.3499 6.75593 7.3499 7.0873V11.0873C7.3499 11.4187 7.08127 11.6873 6.7499 11.6873C6.41853 11.6873 6.1499 11.4187 6.1499 11.0873V7.0873C6.1499 6.75593 6.41853 6.4873 6.7499 6.4873ZM9.8499 7.0873C9.8499 6.75593 9.58127 6.4873 9.2499 6.4873C8.91853 6.4873 8.6499 6.75593 8.6499 7.0873V11.0873C8.6499 11.4187 8.91853 11.6873 9.2499 11.6873C9.58127 11.6873 9.8499 11.4187 9.8499 11.0873V7.0873Z"
          fill="currentColor"
        />
      </svg>
    </t-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { default as TTooltip } from 'tdesign-vue-next/esm/tooltip';
import { useRangeGlobalConfig } from '../constants';

defineOptions({
  name: 'RangePickerCompareIcon'
})

const CONST = useRangeGlobalConfig();
const { globalConfig } = CONST;

const props = defineProps({
  enableAdd: {
    type: Boolean,
    default: false,
  },
  enableDel: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['add', 'del'])

const handleAdd = () => {
  if (props.enableAdd) {
    emit('add')
  }
}

const handleDelete = () => {
  if (props.enableDel) {
    emit('del')
  }
}
</script>
