import { reactive, toRefs, ref } from 'vue';
import { TreeSelect as TTreeSelect } from '../src/components/tree-select';

export default {
  title: '输入/TreeSelect 树选择',
  component: TTreeSelect,
  argTypes: {
    clearable: {
      description: '是否允许清空',
      table: {
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    disabled: {
      description: '是否禁用组件',
      table: {
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    data: {
      description: '数据。',
      table: {
        category: 'Props',
        type: { summary: 'Array' },
        defaultValue: { summary: '-' },
      },
    },
  },
};

const Template = (args) => ({
  components: { TTreeSelect },
  template: '<t-tree-select v-model="value" :data="options" clearable placeholder="请选择" />',
  setup() {
    const options = [
      {
        label: '广东省',
        value: 'guangdong',
        children: [
          {
            label: '广州市',
            value: 'guangzhou',
          },
          {
            label: '深圳市',
            value: 'shenzhen',
          },
        ],
      },
      {
        label: '江苏省',
        value: 'jiangsu',
        children: [
          {
            label: '南京市',
            value: 'nanjing',
          },
          {
            label: '苏州市',
            value: 'suzhou',
          },
        ],
      },
    ];
    const value = ref('');
    const state = reactive({
      ...args,
    });

    return {
      ...toRefs(state),
      options,
      value,
    };
  },
});

export const treeSelectTem = Template.bind({});
treeSelectTem.args = {
  value: '',
};
treeSelectTem.storyName = '基础';

const MultTemplate = (args) => ({
  components: { TTreeSelect },
  template: `<div class="tdesign-tree-select-multiple">
  <t-tree-select v-model="value" :data="options" multiple clearable placeholder="请选择" />
</div>`,
  setup() {
    const options = [
      {
        label: '广东省',
        value: 'guangdong',
        children: [
          {
            label: '广州市',
            value: 'guangzhou',
          },
          {
            label: '深圳市',
            value: 'shenzhen',
          },
        ],
      },
      {
        label: '江苏省',
        value: 'jiangsu',
        children: [
          {
            label: '南京市',
            value: 'nanjing',
          },
          {
            label: '苏州市',
            value: 'suzhou',
          },
        ],
      },
    ];
    const value = ref(['guangzhou', 'shenzhen']);
    const state = reactive({
      ...args,
    });

    return {
      ...toRefs(state),
      options,
      value,
    };
  },
});

export const multTem = MultTemplate.bind({});
multTem.args = {
  value: '',
};
multTem.storyName = '带多选的树选择';
