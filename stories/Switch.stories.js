// import { action } from '@storybook/addon-actions';
import { reactive, toRefs, ref } from 'vue';
// import { CloseIcon, CheckIcon } from 'tdesign-icons-vue-next';
import { Switch as TSwitch } from '../src/components/switch/index.ts';
import './switch.scss';
import '../src/assets/switch-hook.scss';

export const actionsData = {
  // onShowDialog: action('click'),å
};

export default {
  title: '输入/Switch 开关',
  component: { TSwitch },
  argTypes: {
    customValue: {
      description: `开关内容，[打开时的值，关闭时的值]。默认为 [true, false]。示例：[1, 0]。TS 类型：Array<t-switchValue>`,
      table: {
        category: 'Props',
        type: { summary: 'Array' },
        // defaultValue: { summary: 'horizontal' },
      },
      control: {
        type: null,
      },
    },
    disabled: {
      description: `是否禁用组件`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
      },
    },
    label: {
      description: `开关内容，[开启时内容，关闭时内容]。示例：['开', '关'] 或 (value) => value ? '开' : '关'。TS 类型：Array<string | TNode> | TNode<{ value: SwitchValue }>。`,
      table: {
        category: 'Props',
        type: { summary: 'Array / Slot / Function' },
        defaultValue: { summary: '[]' },
      },
      control: {
        type: null,
      },
    },
    loading: {
      description: `是否处于加载中状态`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
      },
    },
    size: {
      description: `开关尺寸。可选项：small/medium/large`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'medium' },
      },
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    modelValue: {
      description: `开关值。支持语法糖 v-model。TS 类型：SwitchValue。`,
      table: {
        category: 'Props',
        type: { summary: 'String / Number / Boolean' },
        // defaultValue: { summary: 'horizontal' },
      },
      control: {
        type: null,
      },
    },
    value: {
      description: `开关值。TS 类型：SwitchValue。`,
      table: {
        category: 'Props',
        type: { summary: 'String / Number / Boolean' },
        // defaultValue: { summary: 'horizontal' },
      },
      control: {
        type: null,
      },
    },
    defaultValue: {
      description: `开关值。非受控属性。TS 类型：SwitchValue。`,
      table: {
        category: 'Props',
        type: { summary: 'String / Number / Boolean' },
        // defaultValue: { summary: 'horizontal' },
      },
      control: {
        type: null,
      },
    },
    onChange: {
      description: `TS 类型：(value: SwitchValue) => void
      数据发生变化时触发`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        // defaultValue: { summary: 'horizontal' },
      },
      control: {
        type: null,
      },
    },
    change: {
      description: `数据发生变化时触发`,
      table: {
        category: 'Events',
        type: { summary: '	(value: SwitchValue)' },
        // defaultValue: { summary: 'horizontal' },
      },
      control: {
        type: null,
      },
    },
  },
  excludeStories: /.Data$/,
};

const aControlTemplate = (args) => ({
  components: { TSwitch },
  template: ` <div class="tdesign-demo-block-row">
  <t-switch :disabled="disabled" :size="size" :loading="loading" />
  <t-switch v-model="checked" @change="onChange"  :disabled="disabled" :size="size" :loading="loading"/>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const checked = ref(true);
    return {
      ...toRefs(state),
      checked,
    };
  },
});

export const aControl = aControlTemplate.bind({});
aControl.args = { disabled: false, size: 'medium', loading: false };
aControl.storyName = '操作';

const Template = (args) => ({
  components: { TSwitch },
  template: ` <div class="tdesign-demo-block-row">
  <t-switch :disabled="disabled" />
  <t-switch v-model="checked" @change="onChange" />
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const checked = ref(true);

    const onChange = (val) => {
      console.log(val);
    };
    return {
      ...toRefs(state),
      checked,
      onChange,
    };
  },
});

export const base = Template.bind({});
base.args = {};
base.storyName = '基础开关';

// 带描述的开关
// const describeTemplate = (args) => ({
//
//   components: { Switch, CheckIcon, CloseIcon },
//   template: ` <div class="tdesign-demo-block-row">
//   <t-switch v-model="slotChecked" size="large">
//     <template #label="slotProps">{{ slotProps.value ? '开' : '关' }}</template>
//   </t-switch>
//   <t-switch size="large">
//     <template #label="slotProps">
//       <template v-if="slotProps.value">
//         <check-icon />
//       </template>
//       <template v-else>
//         <close-icon />
//       </template>
//     </template>
//   </t-switch>
// </div>

// <div class="tdesign-demo-block-row">
//   <t-switch v-model="checked" size="large" :label="['开', '关']"></t-switch>
//   <t-switch size="large" :label="['开', '关']"></t-switch>
// </div>

// <div class="tdesign-demo-block-row">
//   <t-switch v-model="renderChecked" size="large" :label="[renderActiveContent, renderInactiveContent]"></t-switch>
//   <t-switch size="large" :label="[renderActiveContent, renderInactiveContent]"></t-switch>
// </div>

// <div class="tdesign-demo-block-row">
//   <t-switch v-model="renderChecked2" size="large" :label="renderContent"></t-switch>
//   <t-switch size="large" :label="renderContent"></t-switch>
// </div>
// </div> `,
//   methods: {
//     actionsData,
//   },
//   setup() {
//     const state = reactive({
//       ...args,
//       checked: true,
//       renderChecked: true,
//       renderChecked2: true,
//       slotChecked: true,
//     });
//     const renderActiveContent = () => {
//       return <CheckIcon />;
//     };
//     const renderInactiveContent = () => {
//       return <CloseIcon />;
//     };
//     const renderContent = (h, data) => {
//       return data.value ? <CheckIcon /> : <CloseIcon />;
//     };
//     return {
//       ...toRefs(state),
//       renderActiveContent,
//       renderInactiveContent,
//       renderContent,
//     };
//   },
// });

// export const describe = describeTemplate.bind({});
// describe.args = {};
// describe.storyName = '不同状态的开关';
// 不同状态的开关
const statusTemplate = (args) => ({
  components: { TSwitch },
  template: `  <div class="tdesign-demo-block-row">
  <t-switch v-model="checked1" size="large" ></t-switch>
  <t-switch v-model="checked2" size="large" loading ></t-switch>
  <t-switch size="large" disabled></t-switch>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      checked1: true,
      checked2: true,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const status = statusTemplate.bind({});
status.args = {};
status.storyName = '不同状态的开关';

// 不同大小的开关
const sizeTemplate = (args) => ({
  components: { TSwitch },
  template: `  <div class="switch-demo">
  <div class="tdesign-demo-block">
    <t-switch v-model="checked" size="large" />
    <t-switch size="medium" />
    <t-switch size="small" />
  </div>
</div> `,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const size = sizeTemplate.bind({});
size.args = {};
size.storyName = '不同大小的开关';
