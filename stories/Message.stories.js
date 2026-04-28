// import { action } from '@storybook/addon-actions';
import { reactive, toRefs, ref, onMounted, computed, createApp } from 'vue';
import { Button as TButton } from 'tdesign-vue-next/esm/button';
import { Input as TInput } from 'tdesign-vue-next/esm/input';
import { Message as TMessage, MessagePlugin } from '../src/components/message/index.ts';
import './message.scss';
import '../src/assets/message-hook.scss';

export const actionsData = {};

export default {
  title: '消息提醒/Message 全局提示',
  component: { TMessage },
  argTypes: {
    closeBtn: {
      description: `关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。也可以完全自定义按钮。`,
      table: {
        category: 'Props',
        type: { summary: 'String / Boolean / Slot / Function' },
        defaultValue: { summary: 'undefined' },
      },
      control: {
        type: 'boolean',
      },
    },
    content: {
      description: `用于自定义消息弹出内容。TS 类型：string | TNode。`,
      table: {
        category: 'Props',
        type: { summary: 'content	String / Slot / Function' },
      },
      control: {
        type: 'text',
      },
    },
    duration: {
      description: `消息内置计时器，计时到达时会触发 duration-end 事件。单位：毫秒。值为 0 则表示没有计时器。`,
      table: {
        category: 'Props',
        type: { summary: 'Number' },
        defaultValue: { summary: '3000' },
      },
      control: {
        type: null,
      },
    },
    icon: {
      description: `用于自定义消息前面的图标，优先级大于 theme 设定的图标。值为 false 则不显示图标，值为 true 显示 theme 设定图标。TS 类型：boolean | TNode。`,
      table: {
        category: 'Props',
        type: { summary: 'icon	Boolean / Slot / Function' },
        defaultValue: { summary: 'true' },
      },
      control: {
        type: 'boolean',
      },
    },
    theme: {
      description: `消息组件风格。可选项：info/success/warning/error/question/loading。TS 类型：MessageThemeList。`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'info' },
      },
      control: {
        type: 'select',
        options: ['success', 'warning', 'error', 'info', 'question', 'loading'],
      },
    },
    onDurationEnd: {
      description: `TS 类型：() => void
      计时结束后触发`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
      },
      control: {
        type: null,
      },
    },

    onCloseBtnClick: {
      description: `TS 类型：(context: { e: MouseEvent }) => void
      当关闭按钮存在时，用户点击关闭按钮触发`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
      },
      control: {
        type: null,
      },
    },
    onCloseBtnClickEvent: {
      name: 'close-btn-click',
      description: `当关闭按钮存在时，用户点击关闭按钮触发`,
      table: {
        category: 'Message Events',
        type: { summary: '(context: { e: MouseEvent })' },
      },
      control: {
        type: null,
      },
    },
    durationEnd: {
      name: 'duration-end',
      description: `计时结束后触发`,
      table: {
        category: 'Message Events',
        // type: { summary: 'Function' },
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
  components: { TMessage },
  template: ` <div class="t-demo-message">
  <t-message
  :icon="icon"
  :theme="theme" :duration="0" :content="content"  :closeBtn="closeBtn" />
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
aControl.args = { icon: true, theme: 'error', content: '这里是 Message 信息', closeBtn: true };
aControl.storyName = '控制';

// 普通全局提示
const Template = (args) => ({
  components: { TMessage },
  template: ` <div class="t-demo-message">
  <t-message theme="info">用于表示普通操作信息提示</t-message>
  <t-message theme="success">用于表示操作顺利达成</t-message>
  <t-message theme="warning">用于表示操作引起一定后果</t-message>
  <t-message theme="error">用于表示操作引起严重的后果</t-message>
  <t-message theme="question">用于帮助用户操作的信息提示</t-message>
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

export const base = Template.bind({});
base.args = {};
base.storyName = '普通全局提示';

// 加载中信息提示
const loadingTemplate = (args) => ({
  components: { TMessage, TButton },
  template: ` <div class="t-demo-message">
  <t-message theme="loading"> 用于表示操作正在生效的过程中 </t-message>
  <t-message :theme="status1"> 用于表示操作顺利达成(10s) </t-message>
  <t-message :theme="status2"> 用于表示普通操作失败中断(10s) </t-message>
  <t-button :disabled="isDisabled" @click="reset"> 重置 </t-button>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const status1 = ref('loading');
    const status2 = ref('loading');

    const isDisabled = computed(() => {
      return status1.value === 'loading' && status2.value === 'loading';
    });

    const fn1 = () => {
      setTimeout(() => {
        status1.value = 'success';
      }, 10000);
    };

    const fn2 = () => {
      setTimeout(() => {
        status2.value = 'warning';
      }, 10000);
    };

    const reset = () => {
      status1.value = 'loading';
      status2.value = 'loading';
      fn1();
      fn2();
    };

    onMounted(() => {
      fn1();
      fn2();
    });
    return {
      ...toRefs(state),
      isDisabled,
      reset,
      status1,
      status2,
    };
  },
});

export const loading = loadingTemplate.bind({});
loading.args = {};
loading.storyName = '加载中信息提示';

// 带关闭按钮的全局提示
const closeTemplate = (args) => ({
  components: { TMessage },
  template: `  <div class="t-demo-message">
  <t-message v-if="isShowMsg" :close-btn="true" @close-btn-click="isShowMsg = false">
    点击关闭按钮触发事件 close-btn-click
  </t-message>

  <t-message v-if="closableMsg" close-btn="关闭" @close-btn-click="closableMsg = false">
    自定义关闭按钮（文字）
  </t-message>

  <t-message v-if="closableMsg1" :close-btn="closeBtn"> 自定义关闭按钮（函数） </t-message>

  <t-message v-if="closableMsg2">
    自定义关闭按钮（插槽）
    <template #closeBtn>
      <div class="Message-close" @click="closableMsg2 = false">
        <b>x</b>
      </div>
    </template>
  </t-message>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      isShowMsg: true,
      closableMsg: true,
      closableMsg1: true,
      closableMsg2: true,
    });

    const closeBtn = () => {
      return (
        <div
          class="t-message-close"
          onClick={() => {
            state.closableMsg1 = false;
          }}
        >
          <b>x</b>
        </div>
      );
    };
    return {
      ...toRefs(state),
      closeBtn,
    };
  },
});

export const close = closeTemplate.bind({});
close.args = {};
close.storyName = '带关闭按钮的全局提示';

// 使用关闭函数控制全局提示
const toggleTemplate = (args) => ({
  components: { TButton, MessagePlugin },
  template: `  <div id="t-demo-message-toggle">
  <t-button variant="outline" @click="closeFunc"> 自由控制关闭时机（{{ msg ? '关闭' : '打开' }}） </t-button>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      msg: null,
    });

    const closeFunc = () => {
      if (!state.msg) {
        state.msg = MessagePlugin.info({
          content: '调用关闭函数关闭信息提示框',
          duration: 0,
          // 层级控制：非当前场景自由控制开关的关键代码，仅用于测试 API 是否运行正常
          zIndex: 1001,
          // 挂载元素控制：非当前场景自由控制开关的关键代码，仅用于测试 API 是否运行正常
          attach: '#t-demo-message-toggle',
        });
      } else {
        // 关键代码
        MessagePlugin.close(state.msg);
        state.msg = null;
      }
    };
    return {
      ...toRefs(state),
      closeFunc,
    };
  },
});

export const toggle = toggleTemplate.bind({});
toggle.args = {};
toggle.storyName = '使用关闭函数控制全局提示';

// 关闭多条全局提示
const closeAllTemplate = (args) => ({
  components: { MessagePlugin, TButton },
  template: `  <div>
  <t-button variant="outline" @click="openSomeMsg"> 点击打开多个消息 </t-button>
  <t-button id="t-demo-msg-close-all" variant="outline" @click="closeAll"> 点击关闭所有消息 </t-button>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });

    const openSomeMsg = () => {
      MessagePlugin.info('这是第一条消息');
      MessagePlugin.warning('这是第二条消息');
      MessagePlugin.error('这是第三条消息');
    };
    const closeAll = () => {
      MessagePlugin.closeAll();
    };
    return {
      ...toRefs(state),
      openSomeMsg,
      closeAll,
    };
  },
});

export const closeAll = closeAllTemplate.bind({});
base.closeAll = {};
closeAll.storyName = '关闭多条全局提示';

// 控制全局提示显示位置
const placementTemplate = (args) => ({
  components: { TButton, TInput },
  template: ` <div class="placement-demo">
  <div class="t-message-offset">
    <t-input v-model="offsetX" placeholder="请输入横向偏移量" class="placement-demo-input-width" />
    <t-input v-model="offsetY" placeholder="请输入纵向偏移量"  class="placement-demo-input-width"  />
  </div>
  <div class="t-message-placement">
    <t-button variant="outline" class="placement-center" @click="setMessage.success(msgList[0])"> center </t-button>
    <t-button variant="outline" class="placement-top" @click="setMessage.info(msgList[1])"> top </t-button>
    <t-button variant="outline" class="placement-left" @click="setMessage.warning(msgList[2])"> left </t-button>
    <t-button variant="outline" class="placement-right" @click="setMessage.loading(msgList[3])"> right </t-button>
    <t-button variant="outline" class="placement-bottom" @click="setMessage.warning(msgList[4])"> bottom </t-button>
    <t-button variant="outline" class="placement-top-left" @click="setMessage.error(msgList[5])"> top-left </t-button>
    <t-button variant="outline" class="placement-top-right" @click="setMessage.question(msgList[6])">
      top-right
    </t-button>
    <t-button variant="outline" class="placement-bottom-left" @click="setMessage.warning(msgList[7])">
      bottom-left
    </t-button>
    <t-button variant="outline" class="placement-bottom-right" @click="setMessage.warning(msgList[8])">
      bottom-right
    </t-button>
  </div>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const offsetX = ref('');
    const offsetY = ref('');
    const app = createApp({});
    app.use(MessagePlugin);
    app.use(TMessage);
    // getCurrentInstance().setMessage = app.config.globalProperties;
    const { $message: setMessage } = app.config.globalProperties;
    // console.log('app.config.globalPropertiesbject :>> ', getCurrentInstance(), app.config.globalProperties);

    const msgList = computed(() =>
      [
        { content: '用户表示操作顺利达成', placement: 'center' },
        { content: '用户表示普通操作信息提示', placement: 'top' },
        { content: '用户表示操作引起一定后果', placement: 'left' },
        { content: '用于表示操作正在生效的过程中', placement: 'right' },
        { content: '用于表示操作正在生效的过程中', placement: 'bottom' },
        { content: '用户表示操作引起严重的后果', placement: 'top-left' },
        { content: '用于帮助用户操作的信息提示', placement: 'top-right' },
        { content: '用于表示操作正在生效的过程中', placement: 'bottom-left' },
        { content: '用于表示操作正在生效的过程中', placement: 'bottom-right' },
      ].map((item) => ({
        ...item,

        offset: [offsetX.value, offsetY.value],
      })),
    );
    return {
      ...toRefs(state),
      msgList,
      offsetX,
      offsetY,
      setMessage,
    };
  },
});

export const placement = placementTemplate.bind({});
placement.args = {};
placement.storyName = '控制全局提示显示位置';

// 插件调用与函数式调用

const pluginTemplate = (args) => ({
  components: { TMessage, TButton, MessagePlugin },
  template: `  <div class="t-message-plugin">
  <p>插件调用</p>
  <br />
  <div class="t-demo-message-duration">
    <t-button theme="primary" variant="outline" @click="setMessage.info('用户表示普通操作信息提示')"> 消息 </t-button>
    <t-button
      theme="success"
      variant="outline"
      @click="setMessage.success({ content: '用户表示操作顺利达成', duration: 2000 })"
    >
      成功
    </t-button>
    <t-button theme="warning" variant="outline" @click="setMessage('warning', '用户表示操作引起一定后果')">
      警示
    </t-button>
    <t-button
      theme="danger"
      variant="outline"
      @click="setMessage('error', { content: '用户表示操作引起严重的后果', duration: 4000 })"
    >
      失败
    </t-button>
    <t-button theme="primary" variant="outline" @click="setMessage.question('用于帮助用户操作的信息提示', 5000)">
      询问
    </t-button>
    <!-- 0 表示永远不自动消失 -->
    <t-button theme="primary" variant="outline" @click="setMessage.loading('用于表示操作正在生效的过程中', 0)">
      加载中
    </t-button>
    <t-button theme="default" variant="outline" @click="setMessage.closeAll()"> 关闭所有 </t-button>
  </div>
  <br /><br />

  <p>函数式调用</p>
  <br />
  <div class="t-demo-message-theme">
    <t-button theme="primary" variant="outline" @click="MessagePlugin.info('用户表示普通操作信息提示')">
      消息
    </t-button>
    <t-button theme="success" variant="outline" @click="MessagePlugin.success('用户表示操作顺利达成')">
      成功
    </t-button>
    <t-button
      theme="warning"
      variant="outline"
      @click="MessagePlugin.warning({ content: '用户表示操作引起一定后果' })"
    >
      警示
    </t-button>
    <t-button theme="danger" variant="outline" @click="MessagePlugin.error({ content: content })"> 失败 </t-button>
    <t-button theme="primary" variant="outline" @click="MessagePlugin.question('用于帮助用户操作的信息提示')">
      询问
    </t-button>
    <t-button theme="primary" variant="outline" @click="MessagePlugin.loading('用于表示操作正在生效的过程中')">
      加载中
    </t-button>
    <t-button theme="default" variant="outline" @click="MessagePlugin.closeAll()"> 关闭所有 </t-button>
  </div>
  <br /><br />
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const app = createApp({});
    app.use(MessagePlugin);
    app.use(TMessage);
    // getCurrentInstance().setMessage = app.config.globalProperties;
    const { $message: setMessage } = app.config.globalProperties;
    const content = () => {
      return (
        <div>
          操作有误，<a href="#">前往查看</a>
        </div>
      );
    };
    return {
      ...toRefs(state),
      setMessage,
      content,
      MessagePlugin,
    };
  },
});

export const plugin = pluginTemplate.bind({});
plugin.args = {};
plugin.storyName = '插件调用与函数式调用';
