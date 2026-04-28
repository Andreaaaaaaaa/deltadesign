<template>
  <Layout title="标题" @close="handleClose">
    <div class="t-data-grid-size-bar-rules">body</div>
    <template #footer>
      <t-button>确定</t-button>
      <t-button theme="default" variant="outline" @click="handleClose">取消</t-button>
    </template>
  </Layout>
</template>

<script lang="ts">
import { toRefs, PropType, defineComponent } from 'vue';
import Layout from './Layout.vue';
import { IAgGridCommon } from '../../types';
import { Button as TButton } from '../../../button/index';
import { closeBarToolPanels } from '../../plugin/sideBar';

export default defineComponent({
  name: 'SideBarTemplate',
  components: {
    Layout,
    TButton,
  },
  props: {
    params: {
      required: true,
      type: Object as PropType<IAgGridCommon>,
    },
  },
  setup(props) {
    console.log('props', props);
    const { params } = toRefs(props);

    const handleClose = () => {
      closeBarToolPanels(params.value.api);
    };

    return {
      handleClose,
    };
  },
});
</script>

<style lang="scss">
.t-data-grid-size-bar-rules {
  padding: 8px;
}
</style>
