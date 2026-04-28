<!--
 * @Description: 隐藏显示列头和行头
 * @Author: nemomiao
 * @Date: 2024-06-05 16:04:17
 * @LastEditTime: 2024-06-05 17:42:25
 * @LastEditors: nemomiao
-->
<template>
  <t-popup attach="#toolbar-popup-attach" :z-index="4000" trigger="hover" :content="tipsMessage">
    <span class="edit-toolbar-item" @click="handleChange">
      <Svg>
        <path d="M2.5 4C2.5 3.44772 2.94772 3 3.5 3H12.5C13.0523 3 13.5 3.44772 13.5 4V5H2.5V4Z" fill="#9F9595" />
        <path
          d="M3.5 13C2.94772 13 2.5 12.5523 2.5 12L2.5 4C2.5 3.44772 2.94772 3 3.5 3H5.5L5.5 13H3.5Z"
          fill="#9F9595"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5 3H4C3.44772 3 3 3.44772 3 4V5H5V3ZM6 3V5H13V4C13 3.44772 12.5523 3 12 3H6ZM5 6H3V12C3 12.5523 3.44772 13 4 13H5V6ZM6 13V6H13V12C13 12.5523 12.5523 13 12 13H6ZM6 14H5H4C2.89543 14 2 13.1046 2 12V4C2 2.89543 2.89543 2 4 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H6Z"
          fill="#110000"
        />
      </Svg>
    </span>
  </t-popup>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Popup as TPopup } from '../../../popup';
import { localeStore } from '../../locale';
import Svg from '../EditToolbar/components/Svg.vue';

const emit = defineEmits(['change']);
const props = defineProps({
  itemData: {
    type: Object,
    required: true,
  },
  isHidden: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const handleChange = () => {
  emit('change');
};

const tipsMessage = computed(() => {
  const locale = localeStore.getLocals();
  return !props.isHidden ? locale.hideHeader : locale.displayHeader;
});
</script>

<style lang="scss"></style>
