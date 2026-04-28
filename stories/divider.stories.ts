import { Divider as TDivider } from '../src/components/divider/index';

export default {
  title: '基础/Divider 分割线',
  component: TDivider,
  argTypes: {
    align: {
      description: '文本位置（仅在水平分割线有效）。可选项：left/right/center',
      table: {
        category: 'Props',
        type: { summary: '' },
        defaultValue: { summary: 'center' },
      },
    },
    content: {
      description: '子元素。TS 类型：string | TNode',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
    },
    dashed: {
      description: '是否虚线（仅在水平分割线有效）',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    default: {
      description: '子元素，同 content。TS 类型：string | TNode',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
    },
    layout: {
      description: '分隔线类型有两种：水平和垂直。可选项：horizontal/vertical',
      table: {
        category: 'Props',
        type: { summary: '' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    theme: {
      description: '已废弃。请更为使用 layout。分隔线类型有两种：水平和垂直。可选项：horizontal/vertical',
      table: {
        category: 'Props',
        type: { summary: '' },
        defaultValue: { summary: 'horizontal' },
      },
    },
  },
};

const Template = (args) => ({
  components: { TDivider },
  setup() {
    return { args };
  },
  template: `<t-divider v-bind="args" >button</t-divider>`,
});

export const Demo = Template.bind({});
Demo.storyName = '基础';
Demo.args = {
  dashed: true,
};
