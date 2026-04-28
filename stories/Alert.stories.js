// import { action } from '@storybook/addon-actions';
import { reactive, toRefs } from 'vue';
import { Alert as TAlert } from '../src/components/alert/index.ts';
import '../src/assets/alert-hook.scss';
import './alert.scss';

export const actionsData = {};

export default {
  title: '消息提醒/Alert 警告提醒',
  component: { TAlert },
  argTypes: {
    close: {
      description: `关闭按钮。值为 true 则显示默认关闭按钮；值为 false 则不显示按钮；值类型为 string 则直接显示；值类型为 Function 则可以自定关闭按钮。TS 类型：string | boolean | TNode。`,
      table: {
        category: 'Props',
        type: { summary: 'String / Boolean / Slot / Function' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
    },
    default: {
      description: `内容，同 message。TS 类型：string | TNode。`,
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: 'text',
      },
    },
    icon: {
      description: `图标。TS 类型：TNode。`,
      table: {
        category: 'Props',
        type: { summary: 'Slot / Function' },
      },
      control: {
        type: null,
      },
    },
    maxLine: {
      description: `内容显示最大行数，超出的内容会折叠收起，用户点击后再展开。值为 0 表示不折叠`,
      table: {
        category: 'Props',
        type: { summary: 'Number', min: 0 },
        defaultValue: { summary: 0 },
      },
      control: {
        // type: null,
        type: 'number',
      },
    },
    message: {
      description: `内容（子元素）。TS 类型：string | TNode`,
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: 'text',
      },
    },
    operation: {
      description: `跟在告警内容后面的操作区。TS 类型：TNode。`,
      table: {
        category: 'Props',
        type: { summary: 'Slot / Function' },
      },
      control: {
        type: null,
      },
    },
    theme: {
      description: `组件风格。可选项：success/info/warning/error`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'info' },
      },
      control: {
        type: 'select',
        options: ['success', 'warning', 'error', 'info'],
      },
    },
    title: {
      description: `标题。TS 类型：string | TNode。`,
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: 'text',
      },
    },
    onClose: {
      description: `TS 类型：(context: { e: MouseEvent }) => void
      关闭按钮点击时触发`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
      },
      control: {
        type: null,
      },
    },
    onClosed: {
      description: `TS 类型：(context: { e: TransitionEvent }) => void
      告警提示框关闭动画结束后触发`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
      },
      control: {
        type: null,
      },
    },
    closeEvent: {
      name: 'close',
      description: `关闭按钮点击时触发`,
      table: {
        category: 'Alert Events',
        type: { summary: '(context: { e: MouseEvent })' },
      },
      control: {
        type: null,
      },
    },
    closed: {
      description: `告警提示框关闭动画结束后触发
      `,
      table: {
        category: 'Alert Events',
        type: { summary: '(context: { e: TransitionEvent })' },
      },
      control: {
        type: null,
      },
    },
  },
  excludeStories: /.Data$/,
};

// 控制
const aControlTemplate = (args) => ({
  components: { TAlert },
  template: `  <div class="tdesign-demo-block tdesign-demo-block--msg" >
  <t-alert :message="message" :close="close"  :theme="theme"  :title="title">
    <template #operation>
       <span @click="handleOperation">相关操作</span>
    </template>
  </t-alert>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const handleOperation = () => {
      alert('operation clicked');
    };
    return {
      handleOperation,
      ...toRefs(state),
    };
  },
});

export const aControl = aControlTemplate.bind({});
aControl.args = {
  close: false,
  theme: 'info',
  message: '这是与普通的消息提示相关的文字辅助说明',
  default: '',
  title: '这是一条普通的消息提示',
};
aControl.storyName = '控制';

// 基础警告
const Template = (args) => ({
  components: { TAlert },
  template: `  <div class="tdesign-demo-block">
  <t-alert theme="success" message="这是一条成功的消息提示" />
  <t-alert theme="info" :message="infoMessage" />
  <t-alert theme="warning">
    <template #message> 这是一条警示信息 </template>
  </t-alert>
  <t-alert theme="error"> 高危操作/出错信息提示 </t-alert>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const infoMessage = () => <div>这是一条普通的消息提示</div>;
    return {
      ...toRefs(state),
      infoMessage,
    };
  },
});

export const base = Template.bind({});
base.args = {};
base.storyName = '基础警告';

// 带操作的警告
const operationTemplate = (args) => ({
  components: { TAlert },
  template: `  <div class="tdesign-demo-block">
  <t-alert theme="info" message="这是一条普通的消息提示" close>
    <template #operation>
      <span @click="handleOperation">相关操作</span>
    </template>
  </t-alert>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const handleOperation = () => {
      alert('operation clicked');
    };
    return {
      ...toRefs(state),
      handleOperation,
    };
  },
});

export const operation = operationTemplate.bind({});
operation.args = {};
operation.storyName = '带操作的警告';

// 折叠
const collapseTemplate = (args) => ({
  components: { TAlert },
  template: ` <t-alert theme="info" close :max-line="maxLine">
  <span>这是折叠的第一条消息</span>
  <span>这是折叠的第二条消息</span>
  <span>这是折叠的第三条消息</span>
  <span>这是折叠的第四条消息</span>
  <span>这是折叠的第五条消息</span>
  <span>这是折叠的第六条消息</span>
</t-alert>`,
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

export const collapse = collapseTemplate.bind({});
collapse.args = { maxLine: 2 };
collapse.storyName = '折叠的警告';

// 带文字描述
const titleTemplate = (args) => ({
  components: { TAlert },
  template: `  <div class="tdesign-demo-block">
  <t-alert theme="info" title="这是一条普通的消息提示" message="这是与普通的消息提示相关的文字辅助说明" close>
    <template #operation>
      <span @click="handleOperation">相关操作</span>
    </template>
  </t-alert>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const handleOperation = () => {
      alert('operation clicked');
    };
    return {
      ...toRefs(state),
      handleOperation,
    };
  },
});

export const title = titleTemplate.bind({});
title.args = {};
title.storyName = '带相关描述文字的警告';
