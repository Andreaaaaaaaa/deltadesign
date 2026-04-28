<template>
  <div class="t-data-grid-rule-item">
    <div class="t-data-grid-rule-item-icon">
      <ColorRender :color="color" :type="item.type" :filling="item.filling" style="height: 100%" />
    </div>
    <div class="t-data-grid-rule-item-content">
      <div class="t-data-grid-rule-item-type">{{ type }}</div>
      <div class="t-data-grid-rule-item-range">{{ item.range }}</div>
    </div>
    <div class="t-data-grid-rule-item-operate">
      <Edit2Icon class="t-data-grid-rule-item-operate-icon" size="16px" @click="handleEditClick" />
      <t-popconfirm
        :content="locale.confirmDelete"
        :cancel-btn="locale.cancel"
        :confirm-btn="locale.confirm"
        theme="danger"
        @confirm="handleDeleteClick"
      >
        <DeleteIcon class="t-data-grid-rule-item-operate-icon" size="16px" />
      </t-popconfirm>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, toRefs, computed } from 'vue';
import { Edit2Icon, DeleteIcon } from 'tdesign-icons-vue-next';
import { Popconfirm as TPopconfirm } from '../../../popconfirm';

import ColorRender from './ColorRender.vue';

import { useLocale } from '../../hooks';
import { getColorList } from '../../utils';
import { RULES_TYPE_MAPPING } from '../../constant';
import { TDeltaConfigContentConditionRules } from '../../types';

export default defineComponent({
  name: 'RulesItem',
  components: { Edit2Icon, DeleteIcon, ColorRender, TPopconfirm },
  emits: ['edit', 'delete'],
  // eslint-disable-next-line vue/order-in-components
  props: {
    item: {
      type: Object as PropType<TDeltaConfigContentConditionRules>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { item } = toRefs(props);

    const { locale } = useLocale();

    const type = computed(() => RULES_TYPE_MAPPING()[item.value.type]);
    const color = computed(() =>
      getColorList({ start: item.value.startColor, end: item.value.endColor }, item.value.type),
    );

    const handleEditClick = () => emit('edit', item.value.key);
    const handleDeleteClick = () => emit('delete', item.value.key);

    return { ...toRefs(props), locale, color, type, handleEditClick, handleDeleteClick };
  },
});
</script>

<style lang="scss" scoped>
.t-data-grid-rule-item {
  padding: 8px 16px 8px 4px;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;

  &-icon {
    width: 40px;
    height: 40px;
  }

  &-content {
    font-size: 12px;
    line-height: 18px;
    color: #202020;
    flex: 1;
  }

  &-type {
    font-weight: bold;
  }

  &-range {
    margin-top: 8px;
  }

  &-operate {
    display: flex;
    gap: 8px;
    color: rgba(32, 32, 32, 0.6);

    &-icon {
      cursor: pointer;
    }
  }
}
</style>
