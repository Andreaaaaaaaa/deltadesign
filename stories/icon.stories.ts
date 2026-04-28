import { reactive, toRefs, ref } from 'vue';
import { Icon as TIcon } from '../src/components/icon';

export default {
  title: '基础/Icon 图标',
  component: TIcon,
  argTypes: {
    loadDefaultIcons: {
      description: '是否加载组件库内置图标',
      table: {
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    name: {
      description: '必需。图标名称',
      table: {
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
  },
};

const Template = (args) => ({
  components: { TIcon },
  template: `
    <div class="aw-text-sm aw-mb-3">新增一个props:hover，默认为true，true的状态，悬浮icon会出现底色效果。</div>
    <div class="aw-border-black/20 aw-border aw-rounded-md aw-mt-4 aw-p-2">
      <t-icon :name="name" class="aw-mr-2"/>
      <t-icon :name="name" size="medium" :style="style"class="aw-mr-2"/>
      <t-icon :name="name" size="large" class="aw-mr-2"/>
      <t-icon :name="name" size="25px" class="aw-mr-2" :disabled="true"/>
      <t-icon :name="name" size="2em" class="aw-mr-2" :clicked="true"/>
    </div>

    <div class="aw-border-black/20 aw-border aw-bg-gray-10 aw-rounded-md aw-mt-4 aw-p-2">
      <t-icon :name="name" class="aw-mr-2"/>
      <t-icon :name="name" size="medium" :style="style"class="aw-mr-2"/>
      <t-icon :name="name" size="large" class="aw-mr-2"/>
      <t-icon :name="name" size="25px" class="aw-mr-2" :disabled="true"/>
      <t-icon :name="name" size="2em" class="aw-mr-2" :clicked="true"/>
    </div>

    <div class="aw-bg-black aw-rounded-md aw-mt-4 aw-p-2">
      <t-icon :name="name" theme="dark" class="aw-mr-2"/>
      <t-icon :name="name" theme="dark" size="medium" :style="style"class="aw-mr-2"/>
      <t-icon :name="name" theme="dark" size="large" class="aw-mr-2"/>
      <t-icon :name="name" theme="dark" size="25px" class="aw-mr-2" :disabled="true"/>
      <t-icon :name="name" theme="dark" size="2em" class="aw-mr-2" :clicked="true"/>
    </div>

    <div class="aw-bg-black/80 aw-mt-4 aw-p-2 aw-rounded-md">
      <t-icon :name="name" theme="gray" class="aw-mr-2"/>
      <t-icon :name="name" theme="gray" size="medium" :style="style"class="aw-mr-2"/>
      <t-icon :name="name" theme="gray" size="large" class="aw-mr-2"/>
      <t-icon :name="name" theme="gray" size="25px" class="aw-mr-2" :disabled="true"/>
      <t-icon :name="name" theme="gray" size="2em" class="aw-mr-2" :clicked="true"/>
    </div>

    <div class="aw-bg-brand aw-mt-4 aw-p-2 aw-rounded-md">
      <t-icon :name="name" theme="red" class="aw-mr-2"/>
      <t-icon :name="name" theme="red" size="medium" :style="style"class="aw-mr-2"/>
      <t-icon :name="name" theme="red" size="large" class="aw-mr-2"/>
      <t-icon :name="name" theme="red" size="25px" class="aw-mr-2" :disabled="true"/>
      <t-icon :name="name" theme="red" size="2em" class="aw-mr-2" :clicked="true"/>
    </div>
  `,
  setup() {
    const state = reactive({
      ...args,
    });

    return {
      ...toRefs(state),
    };
  },
});

export const treeSelectTem = Template.bind({});
treeSelectTem.args = {
  name: 'home',
  // style: { color: 'red' },
};
treeSelectTem.storyName = '基础使用';
