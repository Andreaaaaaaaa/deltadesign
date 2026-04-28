import { reactive, toRefs, ref, onMounted, computed, createApp } from 'vue';
import { Button } from '../src/components/button/index';
import TDrawer from '../src/components/drawer/index';
import { RadioGroup as TRadioGroup, Radio as TRadio, RadioButton as TRadioButton } from '../src/components/radio';
import { Message as TMessage, MessagePlugin } from '../src/components/message/index';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: '消息提醒/Drawer 抽屉',
  component: TDrawer,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    attach: {
      description:
        "抽屉挂载的节点，默认挂在组件本身的位置。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：AttachNode。",
      table: {
        category: 'String / Function',
        type: { summary: 'Boolean' },
        defaultValue: { summary: '' },
      },
    },
    body: {
      description: '抽屉内容。TS 类型：string | TNode',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
        // // defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    cancelBtn: {
      description:
        '取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制取消事件。TS 类型：FooterButton',
      table: {
        category: 'Props',
        type: { summary: 'String / Object / Slot / Function' },
        defaultValue: { summary: '' },
      },
      control: {
        type: null,
      },
    },
    closeBtn: {
      description:
        '关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。值类型为 TNode，则表示呈现自定义按钮示例。TS 类型：string | boolean | TNode',
      table: {
        category: 'Props',
        type: { summary: 'String / Boolean / Slot / Function' },
        defaultValue: { summary: 'undefined' },
      },
      control: {
        type: null,
      },
    },
    closeOnEscKeydown: {
      description: '按下 ESC 时是否触发抽屉关闭事件',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeOnOverlayClick: {
      description: '点击蒙层时是否触发抽屉关闭事件',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    confirmBtn: {
      description:
        '确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制确认事件。TS 类型：FooterButton',
      table: {
        category: 'Props',
        type: { summary: 'String / Object / Slot / Function' },
        defaultValue: { summary: '' },
      },
      control: {
        type: null,
      },
    },
    default: {
      description: '抽屉内容，同 body。TS 类型：string | TNode',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: null,
      },
    },
    destroyOnClose: {
      description: '抽屉关闭时是否销毁节点',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    footer: {
      description:
        '底部操作栏，默认会有“确认”和“取消”两个按钮。值为 true 显示默认操作按钮，值为 false 或 null 不显示任何内容，值类型为 TNode 表示自定义底部内容。TS 类型：boolean | TNode',
      table: {
        category: 'Props',
        type: { summary: 'Boolean / Slot / Function' },
        defaultValue: { summary: 'true' },
      },
    },
    header: {
      description:
        '头部内容。值为 true 显示空白头部，值为 false 不显示头部，值类型为 string 则直接显示值，值类型为 TNode 表示自定义头部内容。TS 类型：string | boolean | TNode',
      table: {
        category: 'Props',
        type: { summary: 'String / Boolean / Slot / Function' },
        defaultValue: { summary: 'undefined' },
      },
    },
    mode: {
      description: '展开方式，有两种：直接展示在内容上方 和 推开内容区域。可选项：overlay/push',
      table: {
        category: 'Props',
        type: { summary: 'String', detail: 'overlay | push' },
        defaultValue: { summary: 'overlay' },
      },
    },
    placement: {
      description: '抽屉方向。可选项：left/right/top/bottom',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'right' },
      },
    },
    preventScrollThrough: {
      description: '防止滚动穿透',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showInAttachedElement: {
      description: '仅在挂载元素中显示抽屉，默认在浏览器可视区域显示。父元素需要有定位属性，如：position: relative',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showOverlay: {
      description: '是否显示遮罩层',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    size: {
      description:
        "尺寸，支持 'small', 'medium', 'large'，'35px', '30%', '3em' 等。纵向抽屉调整的是抽屉宽度，横向抽屉调整的是抽屉高度",
      table: {
        category: 'Props',
        type: {
          summary: 'String',
        },
        defaultValue: { summary: 'small' },
      },
    },
    sizeDraggable: {
      description: '抽屉大小可拖拽调整，横向抽屉调整宽度，纵向抽屉调整高度',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    visible: {
      description: '组件是否可见',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    zIndex: {
      description: '抽屉层级，样式默认为 1500',
      table: {
        category: 'Props',
        type: { summary: 'Number' },
        // defaultValue: { summary: '0' },
      },
    },
    onCancel: {
      description: '如果“取消”按钮存在，点击“取消”按钮时触发，同时触发关闭事件',
      table: {
        category: 'Props',
        type: { summary: 'Function', detail: 'TS 类型：(context: { e: MouseEvent }) => void' },
      },
    },
    onClose: {
      description:
        "关闭事件，取消按钮点击时、关闭按钮点击时、ESC 按下时、点击蒙层时均会触发。type DrawerEventSource = 'esc' | 'close-btn' | 'cancel' | 'overlay' interface DrawerCloseContext { trigger: DrawerEventSource; e: MouseEvent | KeyboardEvent }",
      table: {
        category: 'Props',
        type: { summary: 'Function', detail: 'TS 类型：(context: DrawerCloseContext) => void,' },
      },
    },
    onCloseBtnClick: {
      description: '如果关闭按钮存在，点击关闭按钮时触发该事件，同时触发关闭事件',
      table: {
        category: 'Props',
        type: { summary: 'Function', detail: 'TS 类型：(context: { e: MouseEvent }) => void' },
      },
    },
    onConfirm: {
      description: '如果“确认”按钮存在，则点击“确认”按钮时触发',
      table: {
        category: 'Props',
        type: { summary: 'Function', detail: 'TS 类型：(context: { e: MouseEvent }) => void' },
      },
    },
    onEscKeydown: {
      description: '按下 ESC 键时触发',
      table: {
        category: 'Props',
        type: { summary: 'Function', detail: 'TS 类型：(context: { e: KeyboardEvent }) => void' },
      },
    },
    onOverlayClick: {
      description: '如果蒙层存在，点击蒙层时触发',
      table: {
        category: 'Props',
        type: { summary: 'Function', detail: 'TS 类型：(context: { e: MouseEvent }) => void' },
      },
    },

    cancel: {
      description: `如果“取消”按钮存在，点击“取消”按钮时触发，同时触发关闭事件`,
      table: {
        category: 'Events',
        // params: '(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T> })',
        type: {
          summary: '(context: { e: MouseEvent })',
        },
      },
    },
    close: {
      description: `关闭事件，取消按钮点击时、关闭按钮点击时、ESC 按下时、点击蒙层时均会触发。`,
      table: {
        category: 'Events',
        type: {
          summary: '(context: DrawerCloseContext)',
          detail: `type DrawerEventSource = 'esc' | 'close-btn' | 'cancel' | 'overlay'
          interface DrawerCloseContext { trigger: DrawerEventSource; e: MouseEvent | KeyboardEvent }`,
        },
      },
    },
    'close-btn-click': {
      description: `如果关闭按钮存在，点击关闭按钮时触发该事件，同时触发关闭事件`,
      table: {
        category: 'Events',
        type: {
          summary: '(context: { e: MouseEvent })',
        },
      },
    },
    confirm: {
      description: `如果“确认”按钮存在，则点击“确认”按钮时触发`,
      table: {
        category: 'Events',
        type: {
          summary: '(context: { e: MouseEvent })',
        },
      },
    },
    'esc-keydown': {
      description: `按下 ESC 键时触发`,
      table: {
        category: 'Events',
        type: {
          summary: '(context: { e: KeyboardEvent })',
        },
      },
    },
    'overlay-click': {
      description: `如果蒙层存在，点击蒙层时触发`,
      table: {
        category: 'Events',
        type: {
          summary: '(context: { e: MouseEvent })',
        },
      },
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TDrawer, TButton: Button },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<t-drawer v-model:visible="visible" header="header" :on-confirm="onClickConfirm" :close-btn="true">
  <p>This is a controlled drawer</p>
</t-drawer>
<t-button variant="outline" @click="handleClick"> 打开抽屉 </t-button>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const visible = ref(false);

    const handleClick = () => {
      visible.value = true;
    };

    const onClickConfirm = () => {
      MessagePlugin.info('数据保存中...', 1000);
      const timer = setTimeout(() => {
        clearTimeout(timer);
        visible.value = false;
        MessagePlugin.info('数据保存成功!');
      }, 1000);
    };

    return {
      args,
      ...toRefs(state),
      handleClick,
      onClickConfirm,
      visible,
    };
  },
});

export const Demo = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Demo.args = {
  header: 'Drawer 标题',
  body: 'Drawer 内容',
  attach: '',
  closeBtn: true,
  confirmBtn: '主要按钮',
  cancelBtn: '次要按钮',
  closeOnOverlayClick: true,
  destroyOnClose: true,
};
Demo.storyName = '可查看的抽屉';

const Overlay = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TDrawer, TButton: Button },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div class="aw-mb-2">通过设置showOverlay，可以控制是否显示抽屉的蒙层。</div>
  <t-drawer
  v-model:visible="visible"
  :show-overlay="false"
  header="抽屉标题"
  :on-confirm="handleClose"
  @close="handleClose"
>
  <p>抽屉的内容</p>
</t-drawer>

<t-button variant="outline" @click="handleClick"> 打开抽屉 </t-button>
`,
  setup() {
    const state = reactive({
      ...args,
    });
    const visible = ref(false);

    const handleClick = () => {
      visible.value = true;
    };
    const handleClose = () => {
      visible.value = false;
    };

    return {
      args,
      ...toRefs(state),
      handleClick,
      handleClose,
      visible,
    };
  },
});

export const overlay = Overlay.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
overlay.args = {
  header: 'Drawer 标题',
  body: 'Drawer 内容',
  attach: '',
  closeBtn: true,
  confirmBtn: '主要按钮',
  cancelBtn: '次要按钮',
  closeOnOverlayClick: true,
  destroyOnClose: true,
};
overlay.storyName = '不显示蒙层的抽屉';

const Position = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TDrawer, TButton: Button, TRadioGroup, TRadio, TRadioButton },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div class="aw-mb-2">通过placement，可以让抽屉在不同的位置展示</div>
  <div class="tdesign-radio-button">
      <t-radio-group v-model="placement" :default-value="placement">
        <t-radio-button value="left"> 左侧 </t-radio-button>
        <t-radio-button value="right"> 右侧 </t-radio-button>
        <t-radio-button value="top"> 上方 </t-radio-button>
        <t-radio-button value="bottom"> 下方 </t-radio-button>
      </t-radio-group>
    </div>
    <t-button variant="outline" class="aw-mt-4" @click="visible = true"> 打开抽屉 </t-button>
  <t-drawer v-bind="args"
  v-model:visible="visible"
  header="标题名称"
  :on-click-overlay="() => (visible = false)"
  :placement="placement"
  @click-cancel="visible = false">
  <p>抽屉的内容</p>
  </t-drawer>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const visible = ref(false);
    const placement = ref('right');

    const openDrawer = () => {
      visible.value = true;
    };

    const closeDrawer = () => {
      visible.value = false;
    };

    return {
      args,
      ...toRefs(state),
      openDrawer,
      closeDrawer,
      visible,
      placement,
    };
  },
});

export const position = Position.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
position.args = {
  header: 'Drawer 标题',
  body: 'Drawer 内容',
  attach: '',
  closeBtn: true,
  confirmBtn: '主要按钮',
  cancelBtn: '次要按钮',
  closeOnOverlayClick: true,
  destroyOnClose: true,
};
position.storyName = '不同位置的抽屉';

const Size = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TDrawer, TButton: Button, TRadioGroup, TRadio, TRadioButton },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div class="aw-mb-2">通过 size 属性控制抽屉展示宽度。</div>
  <t-drawer v-model:visible="visible" :placement="placement" :size="size" header="抽屉标题">
  <p>抽屉的内容</p>
</t-drawer>

<div class="tdesign-radio-button">
  <t-radio-group v-model="size" :default-value="size" class="btn-top-margin">
    <t-radio-button value="small"> 小 </t-radio-button>
    <t-radio-button value="medium"> 中 </t-radio-button>
    <t-radio-button value="large"> 大 </t-radio-button>
    <t-radio-button value="200"> 200 </t-radio-button>
    <t-radio-button value="400px"> 400px </t-radio-button>
    <t-radio-button value="50%"> 50% </t-radio-button>
  </t-radio-group>
</div>

<t-button variant="outline" class="aw-mt-4" @click="visible = true"> 打开抽屉 </t-button>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const visible = ref(false);
    const size = ref('small');
    const placement = ref('right');

    return {
      args,
      ...toRefs(state),
      size,
      placement,
      visible,
    };
  },
});

export const size = Size.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
size.args = {
  header: 'Drawer 标题',
  body: 'Drawer 内容',
  attach: '',
  closeBtn: true,
  confirmBtn: '主要按钮',
  cancelBtn: '次要按钮',
  closeOnOverlayClick: true,
  destroyOnClose: true,
};
size.storyName = '不同尺寸的抽屉';

const Push = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TDrawer, TButton: Button, TRadioGroup, TRadio, TRadioButton },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div class="aw-mb-2">支持覆盖及推开内容区域的方式展示抽屉， 整个页面的 push 模式需设置 attach 为 body。（抽屉组件默认挂载到元素本身所在的位置）。</div>
  <t-drawer v-model:visible="visible" attach="body" :mode="mode" :placement="placement" header="抽屉标题">
  <p>抽屉的内容</p>
</t-drawer>

<div class="tdesign-radio-button">
  抽屉弹出模式：
  <t-radio-group v-model="mode">
    <t-radio-button value="overlay"> overlay </t-radio-button>
    <t-radio-button value="push"> push </t-radio-button>
  </t-radio-group>
</div>
<br /><br />
<t-button variant="outline" @click="visible = true">打开抽屉</t-button>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const visible = ref(false);
    const mode = ref('push');
    const placement = ref('right');

    return {
      args,
      ...toRefs(state),
      mode,
      placement,
      visible,
    };
  },
});

export const push = Push.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
push.args = {
  header: 'Drawer 标题',
  body: 'Drawer 内容',
  attach: '',
  closeBtn: true,
  confirmBtn: '主要按钮',
  cancelBtn: '次要按钮',
  closeOnOverlayClick: true,
  destroyOnClose: true,
};
push.storyName = '弹出模式抽屉';
