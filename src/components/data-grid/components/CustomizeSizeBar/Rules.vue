<template>
  <Layout :title="locale.managementConditional" @close="handleClose">
    <div class="t-data-grid-size-bar-rules">
      <RulesItem
        v-for="item in rulesList"
        :key="item.key"
        :item="item"
        @edit="handleEditItem"
        @delete="handleDeleteItem"
      />
    </div>
    <template #footer>
      <div style="flex: 1; text-align: center">
        <t-button variant="text" size="small" theme="primary" style="font-size: 14px" @click="handleNavigateCreate">
          <template #icon>
            <AddRectangleIcon />
          </template>
          {{ locale.addConditional }}
        </t-button>
      </div>
    </template>
  </Layout>
</template>

<script lang="ts">
import { toRefs, PropType, defineComponent, computed } from 'vue';
import { AddRectangleIcon } from 'tdesign-icons-vue-next';

import Layout from './Layout.vue';
import RulesItem from '../common/RulesItem.vue';

import { eventBus } from '../../class';
import { useLocale } from '../../hooks';
import { closeBarToolPanels, openBarToolPanelsByKey } from '../../plugin';
import { Button as TButton } from '../../../button/index';
import { IAgGridCommon, TEmitEditChange } from '../../types';
import { E_EVENT_BUS_KEY, E_SIDE_BAR_PANEL_KEY } from '../../enums';

export default defineComponent({
  name: 'SideBarRules',
  components: {
    Layout,
    TButton,
    RulesItem,
    AddRectangleIcon,
  },
  props: {
    params: {
      required: true,
      type: Object as PropType<
        IAgGridCommon & {
          onChange: TEmitEditChange;
        }
      >,
    },
  },
  setup(props) {
    console.log('props', props);
    const { params } = toRefs(props);
    const { locale } = useLocale();

    const rulesList = computed(() => params.value.context.grid?.conditionRules || []);
    const handleClose = () => {
      closeBarToolPanels(params.value.api);
    };

    const handleNavigateCreate = () => {
      openBarToolPanelsByKey(params.value.api, E_SIDE_BAR_PANEL_KEY.CREATE_SIDE_BAR_RULES, params.value.context.uuid);
    };

    const handleEditItem = (key: string) => {
      handleNavigateCreate();
      eventBus.emit(E_EVENT_BUS_KEY.EDIT_RULES, { key, uuid: params.value.context.uuid });
    };

    const handleDeleteItem = (key: string) => {
      const { conditionRules } = params.value.context.grid;
      if (conditionRules) {
        params.value.context.grid.conditionRules = conditionRules.filter((item) => item.key !== key);
        params.value?.onChange({ grid: params.value.context.grid });
      }
    };

    return {
      locale,
      rulesList,
      handleClose,
      handleEditItem,
      handleDeleteItem,
      handleNavigateCreate,
    };
  },
});
</script>
