import { reactive, toRefs, ref, onMounted, computed, createApp } from 'vue';
import { Button } from '../src/components/button/index';
import TDialog from '../src/components/dialog/index';
import TIcon from '../src/components/icon/index';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: '消息提醒/Dialog 对话框',
  component: TDialog,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    activable: {
      description: '节点是否可高亮',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    actived: {
      description: '高亮的节点值。支持语法糖 v-model:actived.',
      table: {
        category: 'Props',
        type: { summary: 'Boolean', detail: '高亮的节点值。支持语法糖 v-model:actived。TS 类型：Array<TreeNodeValue>' },
        // // defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    defaultActived: {
      description: '高亮的节点值。非受控属性。',
      table: {
        category: 'Props',
        type: { summary: 'Boolean', detail: 'TS 类型：Array<TreeNodeValue>' },
        // // defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    activeMultiple: {
      description: '是否允许多个节点同时高亮',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    checkable: {
      description: '隐藏节点复选框',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    checkProps: {
      description: '透传属性到 checkbox 组件。',
      table: {
        category: 'Props',
        type: { summary: 'Object', detail: '参考 checkbox 组件 API。TS 类型：CheckboxProps' },
        // // defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    checkStrictly: {
      description: '父子节点选中状态不再关联，可各自选中或取消',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    data: {
      // name: 'data',
      // type: { name: 'Array', required: false },
      // defaultValue: [],
      description: '树数据，泛型 T 表示树节点 TS 类型.',
      table: {
        category: 'Props',
        type: { summary: 'Array', detail: 'TS 类型：Array<T>' },
        defaultValue: { summary: '[]' },
      },
      control: {
        type: null,
        // null text radio select/option
      },
    },
    disableCheck: {
      description: '禁用复选框，可支持禁用不同的行。',
      table: {
        category: 'Props',
        type: { summary: 'Boolean / Function', detail: 'TS 类型：boolean | ((node: TreeNodeModel) => boolean)' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: '是否禁用树操作',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        // defaultValue: { summary: '-' },
      },
    },
    empty: {
      description: '数据为空时展示的文本.',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function', detail: 'TS 类型：string | TNode' },
        defaultValue: { summary: '' },
      },
    },
    expandAll: {
      description: '是否展开全部节点',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    expanded: {
      description: '展开的节点值。支持语法糖 v-model:expanded。',
      table: {
        category: 'Props',
        type: { summary: 'Array', detail: 'TS 类型：Array<TreeNodeValue>' },
        defaultValue: { summary: '[]' },
      },
    },
    defaultExpanded: {
      description: '展开的节点值。非受控属性。',
      table: {
        category: 'Props',
        type: { summary: 'Array', detail: 'TS 类型：Array<TreeNodeValue>' },
        defaultValue: { summary: '[]' },
      },
    },
    expandLevel: {
      description: '默认展开的级别，第一层为 0',
      table: {
        category: 'Props',
        type: { summary: 'Number' },
        defaultValue: { summary: '0' },
      },
    },
    expandMutex: {
      description: '同级别展开互斥，手风琴效果',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    expandOnClickNode: {
      description: '是否支持点击节点也能展开收起',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    expandParent: {
      description: '展开子节点时是否自动展开父节点',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    filter: {
      description: '节点过滤方法，只呈现返回值为 true 的节点，泛型 T 表示树节点 TS 类型。',
      table: {
        category: 'Props',
        type: { summary: 'Function', detail: 'TS 类型：(node: TreeNodeModel<T>) => boolean' },
        // defaultValue: { summary: '-' },
      },
    },
    hover: {
      description: '节点是否有悬浮状态',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        // defaultValue: { summary: '-' },
      },
    },
    icon: {
      description: '节点图标，可自定义。',
      table: {
        category: 'Props',
        type: { summary: 'Boolean / Slot / Function', detail: 'TS 类型：boolean | TNode<TreeNodeModel>' },
        defaultValue: { summary: 'true' },
      },
    },
    keys: {
      description: '用来定义 value / label / children 在 options 中对应的字段别名。',
      table: {
        category: 'Props',
        type: { summary: 'Object', detail: 'TS 类型：TreeKeysType。通用类型定义。' },
        // defaultValue: { summary: '-' },
      },
    },
    label: {
      description: '自定义节点内容，值为 false 不显示，值为 true 显示默认 label，值为字符串直接输出该字符串。',
      table: {
        category: 'Props',
        type: {
          summary: 'String / Boolean / Slot / Function',
          detail: '泛型 T 表示树节点 TS 类型。TS 类型：string | boolean | TNode<TreeNodeModel<T>>',
        },
        defaultValue: { summary: 'true' },
      },
    },
    lazy: {
      description: '延迟加载 children 为 true 的节点的子节点数据，即使 expandAll 被设置为 true，也同样延迟加载',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    line: {
      description: '连接线。值为 false 不显示连接线；值为 true 显示默认连接线；值类型为 Function 表示自定义连接线。',
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean / Slot / Function',
          detail: 'TS 类型：boolean | TNode',
        },
        defaultValue: { summary: 'false' },
      },
    },
    load: {
      description: '加载子数据的方法，在展开节点时调用（仅当节点 children 为 true 时生效）',
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
          detail: '泛型 T 表示树节点 TS 类型。TS 类型：(node: TreeNodeModel<T>) => Promise<Array<T>>',
        },
        // defaultValue: { summary: '-' },
      },
    },
    operations: {
      description: '自定义节点操作项',
      table: {
        category: 'Props',
        type: {
          summary: 'Slot / Function	',
          detail: '泛型 T 表示树节点 TS 类型。TS 类型：TNode<TreeNodeModel<T>>',
        },
        // defaultValue: { summary: '-' },
      },
    },
    transition: {
      description: '节点展开折叠时是否使用过渡动画',
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: { summary: 'true' },
      },
    },
    value: {
      description: '选中值（组件为可选状态时）。支持语法糖 v-model 或 v-model:value。',
      table: {
        category: 'Props',
        type: {
          summary: 'Array',
          detail: 'TS 类型：Array<TreeNodeValue>。',
        },
        defaultValue: { summary: '[]' },
      },
    },
    defaultValue: {
      description: '选中值（组件为可选状态时）。非受控属性。',
      table: {
        category: 'Props',
        type: {
          summary: 'Array',
          detail: 'TS 类型：Array<TreeNodeValue>。',
        },
        defaultValue: { summary: '[]' },
      },
    },
    valueMode: {
      description:
        '选中值模式。all 表示父节点和子节点全部会出现在选中值里面；parentFirst 表示当子节点全部选中时，仅父节点在选中值里面；onlyLeaft 表示无论什么情况，选中值仅呈现叶子节点。可选项：onlyLeaf/parentFirst/all',
      table: {
        category: 'Props',
        type: {
          summary: 'String',
        },
        defaultValue: { summary: 'onlyLeaf' },
      },
    },
    onActive: {
      description:
        'TS 类型：(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T> }) => void节点激活时触发，泛型 T 表示树节点 TS 类型',
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
          // detail: 'TS 类型：Array<TreeNodeValue>。',
        },
        // defaultValue: { summary: '' },
      },
    },
    onChange: {
      description:
        'TS 类型：(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T> }) => void节点选中状态变化时触发，context.node 表示当前变化的选项，泛型 T 表示树节点 TS 类型',
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
        },
      },
    },
    onClick: {
      description: `TS 类型：(context: { node: TreeNodeModel<T>; e: MouseEvent }) => void
        节点点击时触发，泛型 T 表示树节点 TS 类型`,
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
        },
      },
    },
    onExpand: {
      description: `TS 类型：(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e: MouseEvent }) => void
       节点展开或收起时触发，泛型 T 表示树节点 TS 类型`,
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
        },
      },
    },
    onLoad: {
      description: `TS 类型：(context: { node: TreeNodeModel<T> }) => void
        异步加载后触发，泛型 T 表示树节点 TS 类型`,
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
        },
      },
    },
    active: {
      description: `节点激活时触发，泛型 T 表示树节点 TS 类型`,
      table: {
        category: 'Events',
        // params: '(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T> })',
        type: {
          summary: '(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T> })',
        },
      },
    },
    change: {
      description: `节点选中状态变化时触发，context.node 表示当前变化的选项，泛型 T 表示树节点 TS 类型`,
      table: {
        category: 'Events',
        type: {
          summary: '(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T> })',
        },
      },
    },
    click: {
      description: `节点点击时触发，泛型 T 表示树节点 TS 类型`,
      table: {
        category: 'Events',
        type: {
          summary: '(context: { node: TreeNodeModel<T>; e: MouseEvent })',
        },
      },
    },
    expand: {
      description: `节点展开或收起时触发，泛型 T 表示树节点 TS 类型`,
      table: {
        category: 'Events',
        type: {
          summary: '(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e: MouseEvent })',
        },
      },
    },
    loadEvent: {
      name: 'load',
      description: `异步加载后触发，泛型 T 表示树节点 TS 类型`,
      table: {
        category: 'Events',
        type: {
          summary: '(context: { node: TreeNodeModel<T> })',
        },
      },
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object

  components: { TDialog, TButton: Button },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: ` <t-button theme="primary" @click="openDialog"> 基础确认对话框 </t-button>
  <t-dialog  v-bind="args"  :visible="visible" @close="closeDialog" @confirm="closeDialog"></t-dialog>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const visible = ref(false);

    const openDialog = () => {
      visible.value = true;
    };

    const closeDialog = () => {
      visible.value = false;
    };

    return {
      args,
      ...toRefs(state),
      openDialog,
      closeDialog,
      visible,
    };
  },
});
export const Demo = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Demo.args = {
  header: '对话框标题',
  body: '对话框内容',
  theme: 'info',
  closeOnOverlayClick: true,
  destroyOnClose: true,
};
Demo.storyName = '确认类对话框';

const InfoDialog = (args) => ({
  // Components used in your story `template` are defined in the `components` object

  components: { TDialog, TButton: Button, TIcon },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `  <t-utton theme="primary" @click="visible1 = true" style="margin-right:16px"> 提示反馈 </t-utton>

  <t-dialog
    v-model:visible="visible1"
    theme="info"
    header="提示"
    body="对话框内容"
    :on-close="close1"
    @confirm="onClickConfirm"
  />

  <Button theme="primary" @click="visible2 = true"  style="margin-right:16px"> 成功反馈 </Button>
  <t-dialog
    v-model:visible="visible2"
    theme="success"
    header="恭喜"
    body="对话框内容"
    :on-close="close2"
    @confirm="onClickConfirm"
  />

  <Button theme="primary" @click="visible3 = true"  style="margin-right:16px"> 警示反馈 </Button>
  <t-dialog
    v-model:visible="visible3"
    theme="warning"
    header="警示"
    body="对话框内容"
    :on-close="close3"
    :cancel-btn="null"
    @confirm="onClickConfirm"
  />

  <Button theme="primary" @click="visible4 = true"  style="margin-right:16px"> 错误反馈 </Button>
  <t-dialog
    v-model:visible="visible4"
    theme="danger"
    header="错误"
    body="对话框内容"
    :on-close="close4"
    :cancel-btn="null"
    @confirm="onClickConfirm"
  />

  <Button theme="primary" @click="visible5 = true"  style="margin-right:16px"> 自定义icon </Button>
  <t-dialog
    v-model:visible="visible5"
    body="对话框内容"
    :close-btn="false"
    :on-close="close5"
    @confirm="onClickConfirm"
  >
    <template #header>
      <div>
        <t-icon name="check-circle-filled" color="orange" />
        <span style="vertical-align: middle">对话框标题</span>
      </div>
    </template>
  </t-dialog>`,
  setup() {
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible3 = ref(false);
    const visible4 = ref(false);
    const visible5 = ref(false);

    const onClickConfirm = (context) => {
      const { e } = context;
      visible1.value = false;
      visible2.value = false;
      visible3.value = false;
      visible4.value = false;
      visible5.value = false;
      e.stopPropagation();
    };

    const close1 = () => {
      visible1.value = false;
    };
    const close2 = () => {
      visible2.value = false;
    };
    const close3 = () => {
      visible3.value = false;
    };
    const close4 = () => {
      visible4.value = false;
    };
    const close5 = () => {
      visible5.value = false;
    };

    return {
      args,
      // ...toRefs(state),
      visible1,
      visible2,
      visible3,
      visible4,
      visible5,
      onClickConfirm,
      close1,
      close2,
      close3,
      close4,
      close5,
    };
  },
});
export const info = InfoDialog.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
info.args = {
  header: '对话框标题',
  body: '对话框内容',
  theme: 'info',
  closeOnOverlayClick: true,
  destroyOnClose: true,
};
info.storyName = '反馈类对话框';

const CustomizeDialog = (args) => ({
  // Components used in your story `template` are defined in the `components` object

  components: { TDialog, TButton: Button },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `  <t-button theme="primary" @click="visible1 = true" style="margin-right:16px"> 自定义底部按钮（文字） </t-button>

  <t-dialog
  v-model:visible="visible1"
  header="提示"
  body="自定义底部按钮，直接传入文字"
  confirm-btn="前往支付"
  cancel-btn="关闭"
  :on-confirm="onConfirm"
  :on-close="close1"
/>

  <Button theme="primary" @click="visible2 = true"  style="margin-right:16px"> 自定义底部按钮（任何按钮属性） </Button>
  <t-dialog
  :visible="visible2"
  header="提示"
  body="自定义底部按钮，传入 ButtonProps"
  :confirm-btn="{
    content: '前往购物车',
    variant: 'base',
  }"
  :cancel-btn="{
    content: '我知道了',
    variant: 'outline',
  }"
  :on-close="close2"
/>

  <Button theme="primary" @click="visible3 = true"  style="margin-right:16px"> 自定义底部按钮（自定义组件） </Button>
  <t-dialog
  :visible="visible3"
  :close-btn="true"
  header="提示"
  body="自定义底部按钮，传入自定义组件"
  :confirm-btn="getConfirmBtn"
  cancel-btn="取消"
  :on-close="close3"
/>



`,
  setup() {
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible3 = ref(false);
    const visible4 = ref(false);
    const visible5 = ref(false);

    const onClickConfirm = (context) => {
      const { e } = context;
      visible1.value = false;
      visible2.value = false;
      visible3.value = false;
      visible4.value = false;
      visible5.value = false;
      e.stopPropagation();
    };

    const close1 = () => {
      visible1.value = false;
    };
    const close2 = () => {
      visible2.value = false;
    };
    const close3 = () => {
      visible3.value = false;
    };
    const close4 = () => {
      visible4.value = false;
    };
    const close5 = () => {
      visible5.value = false;
    };

    return {
      args,
      // ...toRefs(state),
      visible1,
      visible2,
      visible3,
      visible4,
      visible5,
      onClickConfirm,
      close1,
      close2,
      close3,
      close4,
      close5,
    };
  },
});
export const custom = CustomizeDialog.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
custom.args = {
  header: '对话框标题',
  body: '对话框内容',
  theme: 'info',
  closeOnOverlayClick: true,
  destroyOnClose: true,
};
custom.storyName = '自定义类对话框';
