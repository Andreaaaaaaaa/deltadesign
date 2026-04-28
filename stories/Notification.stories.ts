import { reactive, toRefs, ref, onMounted, computed, createApp } from 'vue';
import { NotifyPlugin } from 'tdesign-vue-next';
import { Button as TButton } from 'tdesign-vue-next/esm/button';
import { Icon as TIcon } from 'tdesign-icons-vue-next';
import { Notification as TNotification } from 'tdesign-vue-next/esm/notification';
import { Message as TMessage, MessagePlugin } from '../src/components/message/index';

// import { RadioGroup as TRadioGroup, Radio as TRadio, RadioButton as TRadioButton } from '../src/components/radio';

import './notification.scss';

export const actionsData = {};

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#defaulexport
export default {
  title: '消息提醒/Notification 消息通知',
  component: { TNotification },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    addable: {
      description: '选项卡是否可增加',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: '是否禁用选项卡',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
      },
    },
    dragSort: {
      description: '是否开启拖拽调整顺序',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
      },
    },
    list: {
      description: '选项卡列表。TS 类型：Array<TdTabPanelProps>',
      table: {
        category: 'Props',
        type: { summary: 'Array' },
      },
    },
    placement: {
      description: '选项卡位置。可选项：left/top/bottom/right',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'top' },
      },
    },
    size: {
      description: '组件尺寸。可选项：medium/large。',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'medium' },
      },
      control: {
        type: null,
      },
    },
    theme: {
      description: '选项卡风格，包含 默认风格 和 卡片风格两种。可选项：normal/card',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'normal' },
      },
    },
    value: {
      // name: 'data',
      // type: { name: 'Array', required: false },
      // defaultValue: [],
      description:
        '激活的选项卡值。支持语法糖 v-model 或 v-model:value。TS 类型：TabValue type TabValue = string | number.',
      table: {
        category: 'Props',
        type: { summary: 'String / Number' },
        defaultValue: { summary: '[]' },
      },
      control: {
        type: null,
        // null text radio select/option
      },
    },
    defaultValue: {
      description: '激活的选项卡值。非受控属性。TS 类型：TabValue type TabValue = string | number。',
      table: {
        category: 'Props',
        type: { summary: 'String / Number' },
        defaultValue: { summary: 'false' },
      },
    },
    onAdd: {
      description: 'TS 类型：(context: { e: MouseEvent }) => void 添加选项卡时触发',
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        // defaultValue: { summary: '-' },
      },
    },
    onChange: {
      description: 'TS 类型：(value: TabValue) => void 激活的选项卡发生变化时触发.',
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        // defaultValue: { summary: '' },
      },
    },
    onDragSort: {
      description:
        'TS 类型：(context: TabsDragSortContext) => void 拖拽排序时触发。详细类型定义。 interface TabsDragSortContext { currentIndex: number; current: TabValue; targetIndex: number; target: TabValue }',
      table: {
        category: 'Props',
        type: { summary: 'Function' },
      },
    },
    onRemove: {
      description: 'TS 类型：(options: { value: TabValue; index: number; e: MouseEvent }) => void 删除选项卡时触发',
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        // defaultValue: { summary: '[]' },
      },
    },
    add: {
      description: '展开的节点值',
      table: {
        category: '(context: { e: MouseEvent })',
        type: { summary: 'Array' },
      },
    },
    change: {
      description: '	添加选项卡时触发',
      table: {
        category: '(value: TabValue)',
        type: { summary: 'Array' },
      },
    },
    dragSort1: {
      description: '拖拽排序时触发',
      table: {
        category: '(context: TabsDragSortContext)',
        type: { summary: 'Array' },
      },
    },
    remove: {
      description: '删除选项卡时触发',
      table: {
        category: '(options: { value: TabValue; index: number; e: MouseEvent })',
        type: { summary: 'Array' },
      },
    },
  },
  excludeStories: /.Data$/,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TNotification, TButton },
  // The story's `args` need to be mapped into the template through the `setup()` method

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div>
  <t-notification
  v-bind="args"
    theme="info"
    title="标题名称"
    content="这是一条消息通知"
  />
  <t-notification
    v-if="show"
    v-bind="args"
    theme="info"
    title="标题名称"
    content="这是一条消息通知（展示 5 秒后消失）"
    :duration="5000"
    @duration-end="show = false"
  />
  <t-button variant="outline" @click="show = true" v-if="!show">点击打开计时通知</t-button>
</div>`,

  setup() {
    const state = reactive({
      ...args,
    });

    return {
      args,
      ...toRefs(state),

      show: true,
    };
  },
});

export const Demo = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Demo.args = {};
Demo.storyName = '基础的消息通知';

const IconTab = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TNotification, TButton, TIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div>
  <t-notification theme="info" title="普通通知" content="这是一条普通的消息通知" />
  <t-notification theme="error" title="危险通知" content="这是一条危险的消息通知" />
  <t-notification theme="warning" title="告警通知" content="这是一条告警的消息通知" />
  <t-notification theme="success" title="成功通知" content="这是一条成功的消息通知" />
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

export const icon = IconTab.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
icon.args = {};

icon.storyName = '带图标的消息通知';

const positionTab = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TNotification, TButton, TIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method

  // And then the `args` are bound to your component with `v-bind="args"`
  template: ` <div>
  <t-notification theme="info" title="超出的文本省略号显示" :content="content"  />
  <t-notification theme="info" title="带关闭按钮" content="这是一条消息通知" :close-btn="true" />
  <t-notification theme="info" title="消息通知标题" content="使用 function 自定义底部内容"  />
  <t-notification v-if="visible" theme="info" content="1. 使用插槽自定义标题 2. 使用插槽自定义底部内容">
    <template #title>
      <div>消息通知标题 <small>消息通知副标题</small></div>
    </template>
    <template #footer>
      <div class="t-notification__detail">
        <t-button class="t-notification__detail-item" theme="default" variant="text">取消</t-button>
        <t-button class="t-notification__detail-item" theme="primary" variant="text" @click="remind">
          稍后提醒我(10s)
        </t-button>
      </div>
    </template>
  </t-notification>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const visible = ref(true);

    const remind = () => {
      visible.value = false;
      setTimeout(() => {
        visible.value = true;
      }, 10000);
    };

    const footer = () => {
      return `<div slot="footer" class="t-notification__detail">
      <t-button class="t-notification__detail-item" theme="primary" variant="text">
        查看详情
      </t-button>
    </div>`;
    };

    const footer2 = () => {
      return ` <div slot="footer" class="t-notification__detail">
      <t-button class="t-notification__detail-item" theme="primary" variant="text">
        查看详情
      </t-button>
    </div>`;
    };

    const content = () => {
      return '文案不限长度，但在实际使用时建议文案显示内容不易过多，建议最大展示行数数量以三行为宜，最后一行折行末尾处超出文本建议会变为省略号显示。';
    };

    return {
      ...toRefs(state),
      args,
      remind,
      footer,
      footer2,
      content,
    };
  },
});

export const position = positionTab.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
position.args = {};

position.storyName = '带操作的消息通知';

const sizeTab = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TNotification, TButton,  TIcon, NotifyPlugin },
  // The story's `args` need to be mapped into the template through the `setup()` method

  // And then the `args` are bound to your component with `v-bind="args"`
  template: ` <div>
  <t-button variant="outline" @click="toggle">自由控制关闭时机（{{ notification ? '关闭' : '打开' }}）</t-button>
</div>`,
  setup() {
    const state = reactive({
      ...args,
    });

    const notification = ref(null);
    const toggle = () => {
      if (!notification.value) {
        notification.value = NotifyPlugin.info({
          title: '标题名称',
          content: '这是一条需要手动关闭的消息通知',
          duration: 0,
        });
      } else {
        NotifyPlugin.close(notification.value);
        notification.value = null;
      }
    };

    return {
      ...toRefs(state),
      args,
      notification,
      toggle,
    };
  },
});

export const size = sizeTab.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
size.args = {};

size.storyName = '关闭提示';

// 关闭多条全局提示
const closeAllTemplate = (args) => ({
  components: { MessagePlugin, TButton },
  template: ` <div>
  <t-button variant="outline" @click="openSomeNotification">点击打开多个通知</t-button>
  <t-button id="t-demo-msg-close-all" variant="outline" @click="closeAll">点击关闭所有通知</t-button>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });

    const openSomeNotification = () => {
      NotifyPlugin.info({ title: '这是第一条通知' });
      NotifyPlugin.warning({ title: '这是第二条通知' });
      NotifyPlugin.error({ title: '这是第三条通知' });
    };
    const closeAll = () => {
      NotifyPlugin.closeAll();
    };
    return {
      ...toRefs(state),
      openSomeNotification,
      closeAll,
    };
  },
});

export const closeAll = closeAllTemplate.bind({});

closeAll.storyName = '关闭多个消息通知';
