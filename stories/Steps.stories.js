// import { action } from '@storybook/addon-actions';
import { reactive, toRefs } from 'vue';
import { Button as TButton } from 'tdesign-vue-next/esm/button';
import { LoginIcon, CartIcon, WalletIcon, CheckCircleIcon } from 'tdesign-icons-vue-next';
import { Steps as TSteps, StepItem as TStepItem } from '../src/components/steps/index.ts';
import '../src/assets/steps-hook.scss';

export const actionsData = {
  // onShowDialog: action('click'),å
};

export default {
  title: '导航/Steps 步骤条',
  component: { TSteps, TStepItem },
  argTypes: {
    current: {
      description: `当前步骤，即整个步骤条进度。默认根据步骤下标判断步骤的完成状态，当前步骤为进行中，当前步骤之前的步骤为已完成，当前步骤之后的步骤为未开始。如果每个步骤没有设置 value，current 值为步骤长度则表示所有步骤已完成。如果每个步骤设置了自定义 value，则 current = 'FINISH' 表示所有状态完成。支持语法糖 v-model 或 v-model:current`,
      table: {
        category: 'Props',
        type: { summary: 'String / Number' },
      },
      control: {
        type: 'text',
      },
    },
    defaultCurrent: {
      description: `当前步骤，即整个步骤条进度。默认根据步骤下标判断步骤的完成状态，当前步骤为进行中，当前步骤之前的步骤为已完成，当前步骤之后的步骤为未开始。如果每个步骤没有设置 value，current 值为步骤长度则表示所有步骤已完成。如果每个步骤设置了自定义 value，则 current = 'FINISH' 表示所有状态完成。非受控属性`,
      table: {
        category: 'Props',
        type: { summary: 'String / Number' },
      },
      control: {
        type: 'text',
      },
    },
    direction: {
      description: '已废弃。步骤条方向，有两种：横向和纵向。可选项：horizontal/vertical',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'horizontal' },
      },
      control: {
        type: null,
      },
    },
    layout: {
      description: '步骤条方向，有两种：横向和纵向。可选项：horizontal/vertical',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'horizontal' },
      },
      control: {
        type: 'inline-radio',
        options: ['horizontal', 'vertical'],
      },
    },
    options: {
      description: '步骤条数据列表（作用和 StepItem 效果一样）。TS 类型：TdStepItemProps[]',
      table: {
        category: 'Props',
        type: { summary: 'Array' },
      },
      control: {
        type: 'object',
      },
    },
    readonly: {
      description: '是否只读',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
      },
    },
    separator: {
      description: '步骤条分割符。可选项：line/dashed/arrow',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'line' },
      },
      control: {
        type: 'inline-radio',
        options: ['line', 'dashed', 'arrow'],
      },
    },
    sequence: {
      description: '步骤条顺序，纵向步骤有效（direction = horizontal）。可选项：positive/reverse',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'positive' },
      },
      control: {
        type: 'select',
        options: ['positive', 'reverse'],
      },
    },
    theme: {
      description: '步骤条风格。可选项：default/dot',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'default' },
      },
      control: {
        type: 'select',
        options: ['default', 'dot'],
      },
    },
    onChange: {
      description: `TS 类型：(current: string | number, previous: string | number, context?: { e?: MouseEvent }) => void
      当前步骤发生变化时触发`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
      },
      control: {
        type: null,
      },
    },
    change: {
      description: `当前步骤发生变化时触发`,
      table: {
        category: 'Events',
        type: { summary: '(current: string | number, previous: string | number, context?: { e?: MouseEvent })' },
      },
      control: {
        type: null,
      },
    },
    content: {
      description: `步骤描述。TS 类型：string | TNode。`,
      table: {
        category: 'StepItem Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: { summary: '' },
      },
      control: {
        type: null,
      },
    },
    default: {
      description: `步骤描述，同 content。TS 类型：string | TNode`,
      table: {
        category: 'StepItem Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: null,
      },
    },
    extra: {
      description: `显示在步骤描述下方的额外内容，比如：操作项。TS 类型：string | TNode。`,
      table: {
        category: 'StepItem Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: null,
      },
    },
    icon: {
      description: `图标，默认显示内置图标，也可以自定义图标，值为 false 则不显示图标。优先级大于 status 定义的图标。TS 类型：boolean | TNode。`,
      table: {
        category: 'StepItem Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: { summary: 'true' },
      },
      control: {
        type: null,
      },
    },
    status: {
      description: `当前步骤的状态。可选项：default/process/finish/error。TS 类型：StepStatus。`,
      table: {
        category: 'StepItem Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'default' },
      },
      control: {
        type: null,
      },
    },
    title: {
      description: `标题。TS 类型：string | TNode。`,
      table: {
        category: 'StepItem Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: { summary: '' },
      },
      control: {
        type: null,
      },
    },
    value: {
      description: `当前步骤标识`,
      table: {
        category: 'StepItem Props',
        type: { summary: 'String / Number' },
      },
      control: {
        type: null,
      },
    },
  },
  excludeStories: /.Data$/,
};

// {
//   /* <t-steps :default-current="1">
// <t-step-item title="已完成的步骤" />
// <t-step-item title="进行中的步骤" />
// <t-step-item title="未进行的步骤" />
// <t-step-item title="未进行的步骤" />
// </t-steps> */
// }
const aControlTemplate = (args) => ({
  components: { TSteps, TStepItem },
  template: ` <div>
  <t-steps
  :default-current="1"
  v-model="current"
  :options="options"
  :readonly="readonly"
  :separator="separator"
  :sequence="sequence"
  :theme="theme"
  :layout="layout"
  >
    <t-step-item title="已完成的步骤" />
    <t-step-item title="进行中的步骤" />
    <t-step-item title="未进行的步骤" />
    <t-step-item title="未进行的步骤" />
  </t-steps>
</div>`,
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

export const aControl = aControlTemplate.bind({});
aControl.args = {
  options: [
    { title: '已完成的步骤', value: 'first', content: '点击切换步骤' },
    { title: '进行中的步骤', value: 'second', content: '点击切换步骤' },
    { title: '进行中的步骤', value: 'third', content: () => '这是进行中的步骤' },
    { title: '已完成的步骤', value: 'forth', content: '点击切换步骤' },
  ],
  separator: 'line',
  readonly: false,
  layout: 'horizontal',
  sequence: 'positive',
  theme: 'default',
  current: 'third',
};
aControl.storyName = '控制';

const Template = (args) => ({
  components: { TSteps, TStepItem },
  template: ` <div>
  <t-steps :default-current="1">
    <t-step-item title="已完成的步骤" />
    <t-step-item title="进行中的步骤" />
    <t-step-item title="未进行的步骤" />
    <t-step-item title="未进行的步骤" />
  </t-steps>
  <br />
  <t-steps v-model="current" :options="steps" />
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      current: 'third',
    });
    return {
      ...toRefs(state),
    };
  },
});

export const horizontal = Template.bind({});
horizontal.args = {
  steps: [
    { title: '已完成的步骤', value: 'first', content: '点击切换步骤' },
    { title: '进行中的步骤', value: 'second', content: '点击切换步骤' },
    { title: '进行中的步骤', value: 'third', content: () => '这是进行中的步骤' },
    { title: '已完成的步骤', value: 'forth', content: '点击切换步骤' },
  ],
};
horizontal.storyName = '带序号的水平步骤条';

// 水平 点
const horizontalDotTemplate = (args) => ({
  components: { TSteps, TStepItem },
  template: ` <div>
  <t-steps theme="dot" :current="current" readonly>
  <t-step-item title="已完成的步骤" content="这里是提示文字" />
  <t-step-item title="进行中的步骤" content="这里是提示文字" />
  <t-step-item title="未进行的步骤" content="这里是提示文字" />
  <t-step-item title="未进行的步骤" content="这里是提示文字" />
</t-steps>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      current: 1,
    });
    return {
      ...toRefs(state),
    };
  },
});
export const horizontalDot = horizontalDotTemplate.bind({});
horizontalDot.args = {};
horizontalDot.storyName = '不带序号的水平步骤条';

// 垂直
const verticalTemplate = (args) => ({
  components: { TSteps, TStepItem },
  template: `  <div class="setps-demo">
  <div class="tdesign-demo-block" style="display: flex;justify-content: space-around;">
    <t-steps layout="vertical" :current="1" readonly>
      <t-step-item title="已完成的步骤" content="这里是提示文字" />
      <t-step-item title="进行中的步骤" content="这里是提示文字" />
      <t-step-item title="未进行的步骤" content="这里是提示文字" />
      <t-step-item title="未进行的步骤" content="这里是提示文字" />
    </t-steps>
    <div style="margin: 16px 0" />
    <t-steps layout="vertical" sequence="reverse" :current="1" readonly>
      <t-step-item title="已完成的步骤" content="这里是提示文字" />
      <t-step-item title="进行中的步骤" content="这里是提示文字" />
      <t-step-item title="未进行的步骤" content="这里是提示文字" />
      <t-step-item title="未进行的步骤" content="这里是提示文字" />
    </t-steps>
  </div>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      current: 1,
    });
    return {
      ...toRefs(state),
    };
  },
});
export const vertical = verticalTemplate.bind({});
vertical.args = {};
vertical.storyName = '带序号的垂直步骤条';

// 垂直 点
const verticalDotTemplate = (args) => ({
  components: { TSteps, TStepItem },
  template: `  <div class="setps-demo">
  <div class="tdesign-demo-block" style="display: flex;justify-content: space-around;">
    <t-steps layout="vertical" :current="1" readonly theme="dot" >
      <t-step-item title="已完成的步骤" content="这里是提示文字" />
      <t-step-item title="进行中的步骤" content="这里是提示文字" />
      <t-step-item title="未进行的步骤" content="这里是提示文字" />
      <t-step-item title="未进行的步骤" content="这里是提示文字" />
    </t-steps>
    <div style="margin: 16px 0" />
    <t-steps layout="vertical" sequence="reverse" :current="1" readonly theme="dot" >
      <t-step-item title="已完成的步骤" content="这里是提示文字" />
      <t-step-item title="进行中的步骤" content="这里是提示文字" />
      <t-step-item title="未进行的步骤" content="这里是提示文字" />
      <t-step-item title="未进行的步骤" content="这里是提示文字" />
    </t-steps>
  </div>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      current: 1,
    });
    return {
      ...toRefs(state),
    };
  },
});
export const verticalDot = verticalDotTemplate.bind({});
verticalDot.args = {};
verticalDot.storyName = '不带序号的垂直步骤条';
// 带额外内容的步骤条
const etraTemplate = (args) => ({
  components: { TSteps, TStepItem, TButton },
  template: `  <t-steps layout="vertical" :current="current" status="process" class="steps-demos-extra">
  <t-step-item title="步骤1" content="这里是提示文字">
    <template v-if="current === 0" #extra>
      <t-button size="small" variant="base" @click="current++"> 下一步 </t-button>
    </template>
  </t-step-item>
  <t-step-item title="步骤2" content="这里是提示文字">
    <template v-if="current === 1" #extra>
      <t-button size="small" variant="text" @click="current--"> 上一步 </t-button>
      <t-button size="small" variant="base" @click="current++"> 下一步 </t-button>
    </template>
  </t-step-item>
  <t-step-item title="步骤3" content="这里是提示文字">
    <template v-if="current === 2" #extra>
      <t-button size="small" variant="text" @click="current--"> 上一步 </t-button>
      <t-button size="small" variant="base" @click="current++"> 下一步 </t-button>
    </template>
  </t-step-item>
  <t-step-item title="步骤4" content="这里是提示文字">
    <template v-if="current === 3" #extra>
      <t-button size="small" @click="current--"> 上一步 </t-button>
    </template>
  </t-step-item>
</t-steps>`,
  setup() {
    const state = reactive({
      ...args,
      current: 0,
    });
    return {
      ...toRefs(state),
    };
  },
});
export const extra = etraTemplate.bind({});
extra.args = {};
extra.storyName = '带额外内容的步骤条';

const statusTemplate = (args) => ({
  components: { TSteps, TStepItem },
  template: `<div>
    <t-steps :current="1" readonly>
      <t-step-item title="已完成的步骤" content="这里是提示文字" />
      <t-step-item title="进行中的步骤" content="这里是提示文字" />
      <t-step-item title="未进行的步骤" content="这里是提示文字" />
      <t-step-item title="未进行的步骤" content="这里是提示文字" />
    </t-steps>
    <div style="margin: 16px 0" />
    <t-steps :current="2" readonly>
      <t-step-item title="已完成的步骤" content="这里是提示文字" />
      <t-step-item title="已完成的步骤" content="这里是提示文字" />
      <t-step-item title="错误的步骤" status="error" content="优先展示step中设置的 status" />
      <t-step-item title="未进行的步骤" content="这里是提示文字" />
    </t-steps>
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});
export const status = statusTemplate.bind({});
status.args = {};
status.storyName = '带状态的步骤条';

const iconTemplate = (args) => ({
  components: { TSteps, TStepItem },
  template: `  <div>
  <t-steps :current="1" readonly>
    <t-step-item title="登录" content="已完成状态" :icon="renderLoginIcon" />
    <t-step-item title="购物" content="进行中状态" :icon="renderCartIcon" />
    <t-step-item title="支付" content="未开始" :icon="renderWalletIcon" />
    <t-step-item title="完成" content="未开始" :icon="renderSuccessIcon" />
  </t-steps>
</div>`,
  setup() {
    const state = reactive({
      ...args,
    });

    const renderLoginIcon = () => {
      return <LoginIcon size="24" class="icon-margin" />;
    };
    const renderCartIcon = () => {
      return <CartIcon size="24" class="icon-margin" />;
    };
    const renderWalletIcon = () => {
      return <WalletIcon size="24" class="icon-margin" />;
    };
    const renderSuccessIcon = () => {
      return <CheckCircleIcon size="24" class="icon-margin" />;
    };
    return {
      ...toRefs(state),
      renderLoginIcon,
      renderCartIcon,
      renderWalletIcon,
      renderSuccessIcon,
    };
  },
});
export const icon = iconTemplate.bind({});
icon.args = {};
icon.storyName = '带图标的步骤条';
