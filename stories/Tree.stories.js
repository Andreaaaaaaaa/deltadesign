// import { action } from '@storybook/addon-actions';
import { reactive, toRefs, ref, computed } from 'vue';
import { Form as TForm, FormItem as TFormItem } from 'tdesign-vue-next/esm/form';
import { Switch as TSwitch } from 'tdesign-vue-next/esm/switch';
import { RadioGroup as TRadioGroup, RadioButton as TRadioButton } from 'tdesign-vue-next/esm/radio';
import { Input as TInput, Addon as TAddon } from 'tdesign-vue-next/esm/input';
// import { Button as TButton } from 'tdesign-vue-next/esm/button';
import { Icon as TIcon } from 'tdesign-vue-next/esm/icon';
import { Tree as TTree } from '../src/components/tree/index.ts';
import './tree.scss';
import '../src/assets/tree-hook.scss';

// import CustomMDXDocumentation from './Custom-MDX-Documentation.mdx';

export const actionsData = {
  // onShowDialog: action('click'),
};

export default {
  title: '数据展示/Tree 树',
  component: TTree,
  parameters: {
    // docs: {
    //   page: CustomMDXDocumentation,
    // },
  },
  argTypes: {
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
        type: 'object',
        // null text radio select/option
      },
    },
    activable: {
      description: '节点是否可高亮',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
      },
    },
    actived: {
      description: '高亮的节点值。支持语法糖 v-model:actived.',
      table: {
        category: 'Props',
        type: {
          summary: 'Array',
          detail: '高亮的节点值。支持语法糖 v-model:actived。TS 类型：Array<t-treeNodeValue>',
        },
        // // defaultValue: { summary: '-' },
      },
      control: {
        type: 'object',
      },
    },
    defaultActived: {
      description: '高亮的节点值。非受控属性。',
      table: {
        category: 'Props',
        type: { summary: 'Array', detail: 'TS 类型：Array<t-treeNodeValue>' },
        // // defaultValue: { summary: '-' },
      },
      control: {
        type: 'object',
      },
    },
    activeMultiple: {
      description: '是否允许多个节点同时高亮',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
      },
    },
    checkable: {
      description: '隐藏节点复选框',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
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
      control: {
        type: 'boolean',
      },
    },

    disableCheck: {
      description: '禁用复选框，可支持禁用不同的行。',
      table: {
        category: 'Props',
        type: { summary: 'Boolean / Function', detail: 'TS 类型：boolean | ((node: TreeNodeModel) => boolean)' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      description: '是否禁用树操作',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        // defaultValue: { summary: '-' },
      },
      control: {
        type: 'boolean',
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
      control: {
        type: 'boolean',
      },
    },
    expanded: {
      description: '展开的节点值。支持语法糖 v-model:expanded。',
      table: {
        category: 'Props',
        type: { summary: 'Array', detail: 'TS 类型：Array<t-treeNodeValue>' },
        defaultValue: { summary: '[]' },
      },
    },
    defaultExpanded: {
      description: '展开的节点值。非受控属性。',
      table: {
        category: 'Props',
        type: { summary: 'Array', detail: 'TS 类型：Array<t-treeNodeValue>' },
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
      control: {
        type: 'number',
      },
    },
    expandMutex: {
      description: '同级别展开互斥，手风琴效果',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
      },
    },
    expandOnClickNode: {
      description: '是否支持点击节点也能展开收起',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
      },
    },
    expandParent: {
      description: '展开子节点时是否自动展开父节点',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
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
      control: {
        type: 'boolean',
      },
    },
    icon: {
      description: '节点图标，可自定义。',
      table: {
        category: 'Props',
        type: { summary: 'Boolean / Slot / Function', detail: 'TS 类型：boolean | TNode<t-treeNodeModel>' },
        defaultValue: { summary: 'true' },
      },
      control: {
        type: 'boolean',
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
          detail: '泛型 T 表示树节点 TS 类型。TS 类型：string | boolean | TNode<t-treeNodeModel<T>>',
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
      control: {
        type: 'boolean',
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
      control: {
        type: 'boolean',
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
          detail: '泛型 T 表示树节点 TS 类型。TS 类型：TNode<t-treeNodeModel<T>>',
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
      control: {
        type: 'boolean',
      },
    },
    value: {
      description: '选中值（组件为可选状态时）。支持语法糖 v-model 或 v-model:value。',
      table: {
        category: 'Props',
        type: {
          summary: 'Array',
          detail: 'TS 类型：Array<t-treeNodeValue>。',
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
          detail: 'TS 类型：Array<t-treeNodeValue>。',
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
      control: {
        type: 'select',
        options: ['onlyLeaf', 'parentFirst', 'all'],
      },
    },
    onActive: {
      description:
        'TS 类型：(value: Array<t-treeNodeValue>, context: { node: TreeNodeModel<T> }) => void节点激活时触发，泛型 T 表示树节点 TS 类型',
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
          // detail: 'TS 类型：Array<t-treeNodeValue>。',
        },
        // defaultValue: { summary: '' },
      },
    },
    onChange: {
      description:
        'TS 类型：(value: Array<t-treeNodeValue>, context: { node: TreeNodeModel<T> }) => void节点选中状态变化时触发，context.node 表示当前变化的选项，泛型 T 表示树节点 TS 类型',
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
      description: `TS 类型：(value: Array<t-treeNodeValue>, context: { node: TreeNodeModel<T>; e: MouseEvent }) => void
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
        // params: '(value: Array<t-treeNodeValue>, context: { node: TreeNodeModel<T> })',
        type: {
          summary: '(value: Array<t-treeNodeValue>, context: { node: TreeNodeModel<T> })',
        },
      },
    },
    change: {
      description: `节点选中状态变化时触发，context.node 表示当前变化的选项，泛型 T 表示树节点 TS 类型`,
      table: {
        category: 'Events',
        type: {
          summary: '(value: Array<t-treeNodeValue>, context: { node: TreeNodeModel<T> })',
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
          summary: '(value: Array<t-treeNodeValue>, context: { node: TreeNodeModel<T>; e: MouseEvent })',
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
  //
  excludeStories: /.Data$/,
};

const aControlTemplate = (args) => ({
  components: { TTree },
  template: `<t-tree v-bind="args"
  :data="data"
  :activable="activable"
  :activeMultiple="activeMultiple"
  :allowFoldNodeOnFilter="allowFoldNodeOnFilter"
  :checkable="checkable"
  :checkStrictly="checkStrictly"
  :disableCheck="disableCheck"
  :disabled="disabled"
  :expandAll="expandAll"
  :expandMutex="expandMutex"
  :expandOnClickNode="expandOnClickNode"
  :expandParent="expandParent"
  :hover="hover"
  :icon="icon"
  :label="label"
  :lazy="lazy"
  :line="line"
  :transition="transition"
  :valueMode="valueMode"
  :expandLevel="expandLevel"
  />`,
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

// 控制
export const aControl = aControlTemplate.bind({});
aControl.args = {
  activable: false,
  activeMultiple: false,
  allowFoldNodeOnFilter: false,
  checkable: false,
  checkStrictly: false,
  disableCheck: false,
  disabled: false,
  expandAll: true,
  expandMutex: false,
  expandOnClickNode: false,
  expandParent: false,
  hover: false,
  icon: true,
  label: true,
  lazy: true,
  line: false,
  transition: true,
  valueMode: 'onlyLeaf',
  expandLevel: 0,
  data: [
    {
      label: '第一段',
      children: [{ label: '第二段' }, { label: '第二段', children: [{ label: '第三段' }, { label: '第三段' }] }],
    },
    {
      label: '第一段',
      children: [{ label: '第二段' }, { label: '第二段' }],
    },
    {
      label: '第一段',
      children: [{ label: '第二段' }, { label: '第二段' }],
    },
  ],
};
aControl.storyName = '控制';

const baseTemplate = (args) => ({
  components: { TTree },
  template: '<t-tree v-bind="args" :data="data" :activable="activable" hover transition/>',
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
export const base = baseTemplate.bind({});
base.args = {
  data: [
    {
      label: '第一段',
      children: [
        {
          label: '第二段',
        },
        {
          label: '第二段',
        },
      ],
    },
    {
      label: '第一段',
      children: [
        {
          label: '第二段',
        },
        {
          label: '第二段',
        },
      ],
    },
    {
      label: '第一段',
      children: [
        {
          label: '第二段',
        },
        {
          label: '第二段',
        },
      ],
    },
    {
      label: '第一段',
      children: [
        {
          label: '第二段',
        },
        {
          label: '第二段',
        },
      ],
    },
  ],
};
base.storyName = '基础树';

// 可选择
const checkableTemplate = (args) => ({
  components: { TTree, TForm, TFormItem, TSwitch, TRadioGroup, TRadioButton },
  template: `  <div class="tdesign-tree-base">
    <div class="operations">
      <t-form>
        <t-form-item label="可选" style="margin-bottom: 16px">
          <t-switch v-model="checkable" />
        </t-form-item>
        <t-form-item label="严格模式" style="margin-bottom: 16px">
          <t-switch v-model="checkStrictly" />
        </t-form-item>
        <t-form-item label="选中值模式" style="margin-bottom: 16px">
          <radio-group v-model="valueMode" name="value-mode" variant="defaulfilled">
            <radio-button v-for="item in valueOptions" :key="item.value" :value="item.value">
              {{ item.label }}
            </radio-button>
          </radio-group>
        </t-form-item>
      </t-form>
    </div>
    <t-tree
      :data="items"
      hover
      expand-all
      :checkable="checkable"
      :check-strictly="checkStrictly"
      :value-mode="valueMode"
      @change="onChange"
      @click="onClick"
    />
  </div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });

    const valueOptions = [
      {
        value: 'onlyLeaf',
        label: 'onlyLeaf',
      },
      {
        value: 'parentFirst',
        label: 'parentFirst',
      },
      {
        value: 'all',
        label: 'all',
      },
    ];

    const items = [
      {
        value: '1',
        label: '1',
        children: [
          {
            value: '1.1',
            label: '1.1',
            children: [
              {
                value: '1.1.1',
                label: '1.1.1',
                children: [
                  {
                    value: '1.1.1.1',
                    label: '1.1.1.1',
                  },
                  {
                    value: '1.1.1.2',
                    label: '1.1.1.2',
                  },
                ],
              },
              {
                value: '1.1.2',
                label: '1.1.2',
                children: [
                  {
                    value: '1.1.2.1',
                    label: '1.1.2.1',
                  },
                  {
                    value: '1.1.2.2',
                    label: '1.1.2.2',
                  },
                ],
              },
            ],
          },
          {
            value: '1.2',
            label: '1.2',
            children: [
              {
                value: '1.2.1',
                label: '1.2.1',
                children: [
                  {
                    value: '1.2.1.1',
                    label: '1.2.1.1',
                  },
                  {
                    value: '1.2.1.2',
                    label: '1.2.1.2',
                  },
                ],
              },
              {
                value: '1.2.2',
                label: '1.2.2',
                children: [
                  {
                    value: '1.2.2.1',
                    label: '1.2.2.1',
                  },
                  {
                    value: '1.2.2.2',
                    label: '1.2.2.2',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        value: '2',
        label: '2',
        children: [
          {
            value: '2.1',
            label: '2.1',
          },
          {
            value: '2.2',
            label: '2.2',
          },
        ],
      },
    ];

    const valueMode = ref('onlyLeaf');
    const checkable = ref(true);
    const checkStrictly = ref(false);

    const onClick = (context) => {
      console.info('onClick:', context);
    };
    const onChange = (checked, context) => {
      console.info('onChange:', checked, context);
    };
    return {
      ...toRefs(state),
      items,
      valueOptions,
      valueMode,
      checkable,
      checkStrictly,
      onClick,
      onChange,
    };
  },
});

export const checkable = checkableTemplate.bind({});
checkable.args = {};
checkable.storyName = '带多选框的树';

// 可高亮

const activableTemplate = (args) => ({
  components: { TTree, TForm, TFormItem, TSwitch, TRadioGroup, TRadioButton },
  template: ` <div class="tdesign-tree-base">
  <div class="operations">
    <t-form label-width="120">
      <t-form-item label="节点可高亮">
        <t-switch v-model="activable" />
      </t-form-item>
      <t-form-item label="节点可多选高亮">
        <t-switch v-model="activeMultiple" />
      </t-form-item>
      <t-form-item label="整个节点可点击">
        <t-switch v-model="expandOnClickNode" />
      </t-form-item>
    </t-form>
  </div>
  <t-tree
    :data="items"
    expand-all
    :activable="activable"
    :active-multiple="activeMultiple"
    :expand-on-click-node="expandOnClickNode"
    hover
    @click="onClick"
    @active="onActive"
  />
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const items = [
      {
        label: '1',
        children: [
          {
            label: '1.1',
          },
          {
            label: '1.2',
          },
        ],
      },
      {
        label: '2',
        children: [
          {
            label: '2.1',
          },
          {
            label: '2.2',
          },
        ],
      },
    ];

    const activable = ref(true);
    const activeMultiple = ref(false);
    const expandOnClickNode = ref(false);

    const onClick = (context) => {
      console.info('onClick', context);
    };

    const onActive = (value, context) => {
      console.info('onActive', value, context);
    };
    return {
      ...toRefs(state),
      items,
      activable,
      activeMultiple,
      expandOnClickNode,
      onClick,
      onActive,
    };
  },
});

export const activable = activableTemplate.bind({});
activable.args = {};
activable.storyName = '可高亮';

// 可过滤的树
const filterTemplate = (args) => ({
  components: { TTree, TInput, TAddon },
  template: ` <div class="tdesign-tree-base">
  <t-addon prepend="filter:">
    <t-input v-model="filterText" @change="onInput" />
  </t-addon>
  <t-tree :data="items" expand-on-click-node :default-expanded="expanded" :filter="filterByText" hover line />
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const items = [
      {
        value: '1',
        label: '1',
        children: [
          {
            value: '1.1',
            label: '1.1',
            children: [
              {
                value: '1.1.1',
                label: '1.1.1',
                children: [
                  {
                    value: '1.1.1.1',
                    label: '1.1.1.1',
                  },
                  {
                    value: '1.1.1.2',
                    label: '1.1.1.2',
                  },
                ],
              },
              {
                value: '1.1.2',
                label: '1.1.2',
                children: [
                  {
                    value: '1.1.2.1',
                    label: '1.1.2.1',
                  },
                  {
                    value: '1.1.2.2',
                    label: '1.1.2.2',
                  },
                ],
              },
            ],
          },
          {
            value: '1.2',
            label: '1.2',
            children: [
              {
                value: '1.2.1',
                label: '1.2.1',
                children: [
                  {
                    value: '1.2.1.1',
                    label: '1.2.1.1',
                  },
                  {
                    value: '1.2.1.2',
                    label: '1.2.1.2',
                  },
                ],
              },
              {
                value: '1.2.2',
                label: '1.2.2',
                children: [
                  {
                    value: '1.2.2.1',
                    label: '1.2.2.1',
                  },
                  {
                    value: '1.2.2.2',
                    label: '1.2.2.2',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        value: '2',
        label: '2',
        children: [
          {
            value: '2.1',
            label: '2.1',
          },
          {
            value: '2.2',
            label: '2.2',
          },
        ],
      },
    ];

    const filterText = ref('');
    const filterByText = ref(null);
    const expanded = ref(['1.1.1']);

    const onInput = (outputState) => {
      console.info('onInput:', outputState);
      filterByText.value = (node) => {
        const rs = node.data.label.indexOf(filterText.value) >= 0;
        return rs;
      };
    };
    return {
      ...toRefs(state),
      items,
      filterText,
      filterByText,
      expanded,
      onInput,
    };
  },
});

export const filter = filterTemplate.bind({});
filter.args = {};
filter.storyName = '可过滤的树';

// // 带操作功能的树
// const operationsTemplate = (args) => ({
//
//   components: { TTree, TInput, TAddon, TForm, TFormItem, TSwitch, TButton },
//   template: `  <div class="tdesign-tree-demo">
//     <h3 class="title">Render:</h3>
//     <t-tree :data="items" hover expand-all :label="getLabel" :operations="renderOperations" />
//     <h3 class="title">Scope Slot:</h3>
//     <div class="operations">
//       <t-form label-width="200">
//         <t-form-item label="插入节点使用高亮节点">
//           <t-switch v-model="useActived" />
//         </t-form-item>
//         <t-form-item label="子节点展开触发父节点展开">
//           <t-switch v-model="expandParent" />
//         </t-form-item>
//       </t-form>
//     </div>
//     <div class="operations">
//       <t-addon prepend="filter:">
//         <t-input v-model="filterText" @change="onInputChange" />
//       </t-addon>
//     </div>
//     <t-tree
//       ref="treeRef"
//       :data="items"
//       hover
//       expand-all
//       activable
//       checkable
//       :expand-on-click-node="false"
//       :label="getLabel"
//       :expand-parent="expandParent"
//       :filter="filterByText"
//       line
//       @expand="onExpand"
//       @change="onChange"
//       @active="onActive"
//     >
//       <template #operations="{ node }">
//         <t-button size="small" variant="base" @click="append(node)"> 添加子节点 </t-button>
//         <t-button size="small" variant="outline" @click="insertBefore(node)"> 前插节点 </t-button>
//         <t-button size="small" variant="outline" @click="insertAfter(node)"> 后插节点 </t-button>
//         <t-button size="small" variant="base" theme="danger" @click="remove(node)"> 删除 </t-button>
//       </template>
//     </t-tree>
//     <h3 class="title">API:</h3>
//     <div class="operations">
//       <t-button theme="primary" @click="getItem"> 获取 value 为 'node1' 的单个节点 </t-button>
//       <t-button theme="primary" @click="getAllItems"> 获取所有节点 </t-button>
//       <t-button theme="primary" @click="getActiveChildren"> 获取高亮节点的所有子节点 </t-button>
//       <t-button theme="primary" @click="getAllActived"> 获取所有高亮节点 </t-button>
//       <t-button theme="primary" @click="getActiveChecked"> 获取高亮节点下的选中节点 </t-button>
//       <t-button theme="primary" @click="append()"> 插入一个根节点 </t-button>
//       <t-button theme="primary" @click="getActiveParent"> 获取高亮节点的父节点 </t-button>
//       <t-button theme="primary" @click="getActiveParents"> 获取高亮节点的所有父节点 </t-button>
//       <t-button theme="primary" @click="getActiveIndex"> 获取高亮节点在子节点中的位置 </t-button>
//       <t-button theme="primary" @click="setActiveChecked"> 选中高亮节点 </t-button>
//       <t-button theme="primary" @click="setActiveExpanded"> 展开高亮节点 </t-button>
//       <t-button theme="primary" @click="getActivePlainData"> 获取高亮节点与其子节点的数据 </t-button>
//     </div>
//     <p class="tips">* 相关信息通过控制台输出</p>
//   </div`,
//   methods: {
//     actionsData,
//   },
//   setup() {
//     const state = reactive({
//       ...args,
//     });
//     const items = [
//       {
//         value: 'node1',
//       },
//       {
//         value: 'node2',
//       },
//     ];

//     const getLabelContent = (node) => {
//       const pathNodes = node.getPath();
//       let label = pathNodes.map((itemNode) => itemNode.getIndex() + 1).join('.');
//       label = `${label} | value: ${node.value}`;
//       return label;
//     };

//     const index = ref(2);
//     const activeId = ref('');
//     const activeIds = ref([]);
//     const expandIds = ref([]);
//     const checkedIds = ref([]);
//     const useActived = ref(false);
//     const expandParent = ref(true);
//     const filterText = ref('');
//     const filterByText = ref(null);

//     const renderOperations = (createElement, node) => `value: ${node.value}`;

//     const getLabel = (createElement, node) => {
//       const label = getLabelContent(node);
//       const { data } = node;
//       data.label = label;
//       return label;
//     };
//     const treeRef = ref(null);
//     const getActivedNode = () => {
//       // console.log('tree', tree);
//       const activeNode = treeRef.value.getItem(activeId.value);
//       return activeNode;
//     };

//     const setLabel = (value) => {
//       const node = treeRef.value.getItem(value);
//       const label = getLabelContent(node);
//       const { data } = node;
//       data.label = label;
//     };

//     const getItem = () => {
//       const node = treeRef.value.getItem('node1');
//       console.info('getItem:', node.label);
//     };

//     const getAllItems = () => {
//       const nodes = treeRef.value.getItems();
//       console.info(
//         'getAllItems:',
//         nodes.map((node) => node.value),
//       );
//     };

//     const getAllActived = () => {
//       console.info('getActived value:', activeIds.value.slice(0));
//     };

//     const getActiveChildren = () => {
//       const node = getActivedNode();
//       if (!node) return;
//       let nodes = [];
//       if (node) {
//         nodes = node.getChildren(true) || [];
//       }
//       console.info(
//         'getActiveChildren:',
//         nodes.map((n) => n.value),
//       );
//     };

//     const getActiveChecked = () => {
//       const node = getActivedNode();
//       if (!node) return;
//       const nodes = treeRef.value.getItems(node.value);
//       console.info(
//         'getChecked:',
//         nodes.filter(() => node.checked).map(() => node.value),
//       );
//     };

//     const getInsertItem = () => {
//       let item = null;
//       if (useActived.value) {
//         item = getActivedNode();
//       } else {
//         index.value += 1;
//         const value = `t${index.value}`;
//         item = {
//           value,
//         };
//       }
//       return item;
//     };

//     const getPlainData = (item) => {
//       const root = item;
//       if (!root) return null;
//       const children = item.getChildren(true) || [];
//       const list = [root].concat(children);
//       const nodeMap = {};
//       const nodeList = list.map((nodeItem) => {
//         const node = {
//           walkData() {
//             const data = {
//               ...this.data,
//             };
//             const itemChildren = this.getChildren();
//             if (Array.isArray(itemChildren)) {
//               data.children = [];
//               itemChildren.forEach((childItem) => {
//                 const childNode = nodeMap[childItem.value];
//                 const childData = childNode.walkData();
//                 data.children.push(childData);
//               });
//             }
//             return data;
//           },
//           ...nodeItem,
//         };
//         nodeMap[item.value] = node;
//         return node;
//       });
//       const [rootNode] = nodeList;
//       const data = rootNode.walkData();
//       return data;
//     };

//     const append = (node) => {
//       const item = getInsertItem();
//       if (item) {
//         if (!node) {
//           treeRef.value.appendTo('', item);
//         } else {
//           treeRef.value.appendTo(node.value, item);
//         }
//         setLabel(item.value);
//       }
//     };

//     const insertBefore = (node) => {
//       const item = getInsertItem();
//       if (item) {
//         treeRef.value.insertBefore(node.value, item);
//         setLabel(item.value);
//       }
//     };

//     const insertAfter = (node) => {
//       const item = getInsertItem();
//       if (item) {
//         treeRef.value.insertAfter(node.value, item);
//         setLabel(item.value);
//       }
//     };

//     const getActiveParent = () => {
//       const node = getActivedNode();
//       if (!node) return;
//       const parent = treeRef.value.getParent(node.value);
//       console.info('getParent', parent?.value);
//     };

//     const getActiveParents = () => {
//       const node = getActivedNode();
//       if (!node) return;
//       const parents = treeRef.value.getParents(node.value);
//       console.info(
//         'getParents',
//         parents.map((n) => n.value),
//       );
//     };

//     const setActiveChecked = () => {
//       const node = getActivedNode();
//       if (!node) return;
//       treeRef.value.setItem(node?.value, {
//         checked: true,
//       });
//     };

//     const setActiveExpanded = () => {
//       const node = getActivedNode();
//       if (!node) return;
//       treeRef.value.setItem(node?.value, {
//         expanded: true,
//       });
//     };

//     const getActiveIndex = () => {
//       const node = getActivedNode();
//       if (!node) return;
//       const ind = treeRef.value.getIndex(node.value);
//       console.info('getIndex', ind);
//     };

//     const getActivePlainData = () => {
//       const node = getActivedNode();
//       if (!node) return '';
//       const data = getPlainData(node);
//       return data;
//     };

//     const remove = (node) => {
//       treeRef.value.remove(node.value);
//     };

//     const onChange = (vals, curState) => {
//       console.info('on change:', vals, curState);
//       checkedIds.value = vals;
//     };

//     const onExpand = (vals, curState) => {
//       console.info('on expand:', vals, curState);
//       expandIds.value = vals;
//     };

//     const onActive = (vals, curState) => {
//       console.info('on active:', vals, curState);
//       activeIds.value = vals;
//       activeId.value = vals[0] || '';
//     };

//     const onInputChange = (curState) => {
//       console.info('on input:', curState);
//       filterByText.value = (node) => {
//         const label = node?.data?.label || '';
//         const rs = label.indexOf(filterText.value) >= 0;
//         return rs;
//       };
//     };
//     return {
//       ...toRefs(state),
//       items,
//       getLabelContent,
//       index,
//       activeId,
//       activeIds,
//       expandIds,
//       checkedIds,
//       useActived,
//       expandParent,
//       filterText,
//       filterByText,
//       renderOperations,
//       getLabel,
//       getActivedNode,
//       treeRef,
//       setLabel,
//       getItem,
//       getAllItems,
//       getAllActived,
//       getActiveChildren,
//       getActiveChecked,
//       getInsertItem,
//       getPlainData,
//       append,
//       insertBefore,
//       insertAfter,
//       getActiveParent,
//       getActiveParents,
//       setActiveChecked,
//       setActiveExpanded,
//       getActiveIndex,
//       getActivePlainData,
//       remove,
//       onChange,
//       onExpand,
//       onActive,
//       onInputChange,
//     };
//   },
// });

// export const operations = operationsTemplate.bind({});
// operations.args = {};

// 自定义icon
const iconTemplate = (args) => ({
  components: { TTree, TIcon },
  template: ` <div class="tdesign-tree-base">
  <h3>render:</h3>
  <t-tree :data="items" hover expand-all :load="load" :icon="icon" />
  <h3>scope slot:</h3>
  <t-tree :data="items" hover lazy :load="load">
    <template #icon="{ node }">
      <Icon v-if="node.getChildren() && !node.expanded" name="caret-right" />
      <Icon v-else-if="node.getChildren() && node.expanded" name="caret-down" />
      <Icon v-else name="attach" />
    </template>
  </t-tree>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const items = ref([
      {
        label: '1',
        children: true,
      },
      {
        label: '2',
        children: true,
      },
    ]);

    const icon = (createElement, node) => {
      let name = 'file';
      if (node.getChildren()) {
        if (node.expanded) {
          name = 'folder-open';
        } else {
          name = 'folder';
        }
      }

      return createElement(TIcon, {
        name,
      });
    };

    const load = (node) => {
      const maxLevel = 2;
      return new Promise((resolve) => {
        setTimeout(() => {
          let nodes = [];
          if (node.level < maxLevel) {
            nodes = [
              {
                label: `${node.label}.1`,
                children: node.level < maxLevel - 1,
              },
              {
                label: `${node.label}.2`,
                children: node.level < maxLevel - 1,
              },
            ];
          }
          resolve(nodes);
        }, 100);
      });
    };
    return {
      ...toRefs(state),
      icon,
      items,
      load,
    };
  },
});

export const icon = iconTemplate.bind({});
icon.args = {};
icon.storyName = '基础警告';

// 空数据
const emptyTemplate = (args) => ({
  components: { TTree },
  template: `  <div class="tdesign-tree-base">
  <t-tree :data="[]" /><br />
  <t-tree :data="[]" empty="😊 空数据（string）" /><br />
  <t-tree :data="[]" :empty="empty" /><br />
  <t-tree :data="[]">
    <br />
    <template #empty>
      <div>😊 空数据（slot）</div>
    </template>
  </t-tree>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const empty = () => {
      return <div>😊 空数据（ empty props ）</div>;
    };
    return {
      ...toRefs(state),
      empty,
    };
  },
});

export const empty = emptyTemplate.bind({});
empty.args = {};
empty.storyName = '空数据';

// 自定义标签
const labelTemplate = (args) => ({
  components: { TTree },
  template: ` <div class="tdesign-tree-demo">
  <h3>render:</h3>
  <t-tree :data="items" expand-all :label="label" />
  <h3>scope slot:</h3>
  <t-tree :data="items" expand-all checkable>
    <template #label="{ node }">
      <span style="color: blue">label: {{ node.label }}, value: {{ node.value }}</span>
    </template>
  </t-tree>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const items = [
      {
        label: '1',
        children: [
          {
            label: '1.1',
          },
          {
            label: '1.2',
          },
        ],
      },
      {
        label: '2',
        children: [
          {
            label: '2.1',
          },
          {
            label: '2.2',
          },
        ],
      },
    ];

    const label = (h, node) => {
      return h('strong', {
        innerHTML: `value: ${node.value}, label: ${node.label}`,
      });
    };
    return {
      ...toRefs(state),
      items,
      label,
    };
  },
});

export const label = labelTemplate.bind({});
label.args = {};
label.storyName = '自定义标签';

// 带连接线的树
const lineTemplate = (args) => ({
  components: { TTree, TForm, TFormItem, TSwitch, TIcon },
  template: `  <div class="tdesign-demo-block-column-large tdesign-tree-demo tdesign-tree-line">
  <t-form>
    <t-form-item label="显示连线" style="margin-bottom: 16px">
      <t-switch v-model="showLine" />
    </t-form-item>
    <t-form-item label="显示图标" style="margin-bottom: 16px">
      <t-switch v-model="showIcon" />
    </t-form-item>
  </t-form>

  <div class="tdesign-demo-block-column">
    <t-tree :data="items" :line="showLine" :icon="showIcon" expand-all />
    <h3>render</h3>
    <t-tree :data="items" :icon="showIcon" expand-all :line="renderLine" />
    <h3>scope slot</h3>
    <t-tree :data="items" :icon="showIcon" line expand-all>
      <template #line="{ node }">
        <div v-if="showLine" :class="lineClass(node)">
          <div class="custom-line-box">
            <span
              v-for="(item, index) in getLineNodes(node)"
              :key="index"
              :class="{ 'custom-line-cross': item.cross }"
            />
          </div>
          <i v-if="node.isLeaf()" class="custom-line-icon">
            <Icon name="hearfilled" />
          </i>
        </div>
      </template>
    </t-tree>
  </div>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      items: [
        {
          value: '1',
          label: '1',
          children: [
            {
              value: '1.1',
              label: '1.1',
            },
            {
              value: '1.2',
              label: '1.2',
            },
          ],
        },
        {
          value: '2',
          label: '2',
          children: [
            {
              value: '2.1',
              label: '2.1',
              children: [
                {
                  value: '2.1.1',
                  label: '2.1.1',
                  children: [
                    {
                      value: '2.1.1.1',
                      label: '2.1.1.1',
                      children: [
                        {
                          value: '2.1.1.1.1',
                          label: '2.1.1.1.1',
                        },
                        {
                          value: '2.1.1.1.2',
                          label: '2.1.1.1.2',
                        },
                      ],
                    },
                  ],
                },
                {
                  value: '2.1.2',
                  label: '2.1.2',
                },
              ],
            },
            {
              value: '2.2',
              label: '2.2',
            },
          ],
        },
        {
          value: '3',
          label: '3',
          children: [
            {
              value: '3.1',
              label: '3.1',
            },
            {
              value: '3.2',
              label: '3.2',
            },
          ],
        },
        {
          value: '4',
          label: '4',
        },
      ],
    });

    const showLine = ref(true);
    const showIcon = ref(true);

    const getLineNodes = (node) => {
      const nodes = node.getParents().reverse();
      const lineNodes = [];
      nodes.forEach((item, index) => {
        const line = {};
        const nextItem = nodes[index + 1];
        if (index < nodes.length - 1 && nextItem) {
          line.cross = !nextItem.isLast();
        }
        lineNodes.push(line);
      });
      return lineNodes;
    };

    const lineClass = (node) => {
      const list = ['custom-line'];
      if (node.isFirst()) {
        list.push('custom-line-first');
      }
      if (node.isLeaf()) {
        list.push('custom-line-leaf');
      }
      if (node.isLast()) {
        list.push('custom-line-last');
      }
      return list;
    };

    const renderLine = (createElement, node) => {
      if (!showLine.value) return null;

      const lineChildren = [];

      const lines = getLineNodes(node).map((item) =>
        createElement('span', {
          class: {
            'custom-line-cross': item.cross,
          },
        }),
      );

      lineChildren.push(
        createElement(
          'div',
          {
            class: 'custom-line-box',
          },
          lines,
        ),
      );

      if (node.isLeaf()) {
        const iconNode = createElement(
          'i',
          {
            class: 'custom-line-icon',
          },
          [<Icon name="hearfilled" />],
        );
        lineChildren.push(iconNode);
      }

      return createElement(
        'div',
        {
          class: lineClass(node),
        },
        lineChildren,
      );
    };
    return {
      ...toRefs(state),
      showLine,
      showIcon,
      getLineNodes,
      lineClass,
      renderLine,
    };
  },
});

export const line = lineTemplate.bind({});
line.args = {};
line.storyName = '带连接线的树';

// 初始化展开全部
const expandAllTemplate = (args) => ({
  components: { TTree, TForm, TFormItem, TSwitch },
  template: ` <div class="tdesign-tree-demo">
  <div class="operations">
    <t-form label-width="150">
      <t-form-item label="切换数据">
        <t-switch @change="toggleData" />
      </t-form-item>
      <t-form-item label="展开动画">
        <t-switch v-model="transition" />
      </t-form-item>
    </t-form>
  </div>
  <t-tree :data="items" expand-all :transition="transition" />
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      data1: [
        {
          label: '1',
          children: [
            {
              label: '1.1',
              children: [
                {
                  label: '1.1.1',
                },
                {
                  label: '1.1.2',
                },
              ],
            },
            {
              label: '1.2',
              children: [
                {
                  label: '1.2.1',
                },
                {
                  label: '1.2.2',
                },
              ],
            },
          ],
        },
        {
          label: '2',
          children: [
            {
              label: '2.1',
            },
            {
              label: '2.2',
            },
          ],
        },
      ],
      data2: [
        {
          label: '1',
        },
        {
          label: '2',
        },
        {
          label: '3',
          children: [
            {
              label: '3.1',
            },
            {
              label: '3.2',
            },
          ],
        },
      ],
    });
    const items = ref(state.data1);
    const transition = ref(true);

    const toggleData = () => {
      items.value = items.value === state.data1 ? state.data2 : state.data1;
    };
    return {
      ...toRefs(state),
      items,
      transition,
      toggleData,
    };
  },
});

export const expandAll = expandAllTemplate.bind({});
expandAll.args = {};
expandAll.storyName = '初始化展开全部';

// 展开第一级
const expandLevelTemplate = (args) => ({
  components: { TTree },
  template: ` <div class="tdesign-tree-base">
  <t-tree :data="items" hover :expand-level="1" />
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      items: [
        {
          label: '1',
          children: [
            {
              label: '1.1',
              children: [
                {
                  label: '1.1.1',
                },
                {
                  label: '1.1.2',
                },
              ],
            },
            {
              label: '1.2',
              children: [
                {
                  label: '1.2.1',
                },
                {
                  label: '1.2.2',
                },
              ],
            },
          ],
        },
        {
          label: '2',
          children: [
            {
              label: '2.1',
            },
            {
              label: '2.2',
            },
          ],
        },
      ],
    });
    return {
      ...toRefs(state),
    };
  },
});

export const expandLevel = expandLevelTemplate.bind({});
expandLevel.args = {};
expandLevel.storyName = '初始化展开第一级';

// // 互斥展开
// const expandMutexTemplate = (args) => ({
//
//   components: { Tree, Form, FormItem, Switch },
//   template: `  <div class="tdesign-tree-base">
//   <div class="operations">
//     <t-form label-width="120">
//       <t-form-item label="互斥展开">
//         <t-switch v-model="mutex" />
//       </t-form-item>
//       <t-form-item label="整个节点可点击">
//         <t-switch v-model="expandOnClickNode" />
//       </t-form-item>
//     </t-form>
//   </div>
//   <t-tree
//     :data="items"
//     hover
//     :expand-mutex="mutex"
//     :expand-on-click-node="expandOnClickNode"
//     @click="onClick"
//     @expand="handleExpand"
//   />
// </div`,
//   methods: {
//     actionsData,
//   },
//   setup() {
//     const state = reactive({
//       ...args,
//       items: [
//         {
//           label: '1',
//           children: [
//             {
//               label: '1.1',
//               children: [
//                 {
//                   label: '1.1.1',
//                 },
//                 {
//                   label: '1.1.2',
//                 },
//               ],
//             },
//             {
//               label: '1.2',
//               children: [
//                 {
//                   label: '1.2.1',
//                 },
//                 {
//                   label: '1.2.2',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           label: '2',
//           children: [
//             {
//               label: '2.1',
//               children: [
//                 {
//                   label: '2.1.1',
//                 },
//                 {
//                   label: '2.1.2',
//                 },
//               ],
//             },
//             {
//               label: '2.2',
//               children: [
//                 {
//                   label: '2.2.1',
//                 },
//                 {
//                   label: '2.2.2',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     });
//     const mutex = ref(true);
//     const expandOnClickNode = ref(true);

//     const onClick = (context) => {
//       console.info('onClick', context);
//     };

//     const handleExpand = (value, context) => {
//       console.info('onExpand', value, context);
//     };
//     return {
//       ...toRefs(state),
//       mutex,
//       expandOnClickNode,
//       onClick,
//       handleExpand,
//     };
//   },
// });

// export const expandMutex = expandMutexTemplate.bind({});
// expandMutex.args = {};
// controlled.storyName = '基础警告';

// 异步加载节点
const syncTemplate = (args) => ({
  components: { TTree },
  template: ` <div class="tdesign-tree-base">
  <t-tree :data="items" hover expand-all :load="load" :lazy="false" />
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      items: [
        {
          label: '1',
          children: true,
        },
        {
          label: '2',
          children: true,
        },
      ],
    });
    const load = (node) =>
      new Promise((resolve) => {
        setTimeout(() => {
          let nodes = [];
          if (node.level < 2) {
            nodes = [
              {
                label: `${node.label}.1`,
                children: true,
              },
              {
                label: `${node.label}.2`,
                children: true,
              },
            ];
          }
          resolve(nodes);
        }, 1000);
      });

    return {
      ...toRefs(state),
      load,
    };
  },
});

export const sync = syncTemplate.bind({});
sync.args = {};
sync.storyName = '异步加载节点';

// 展开时加载节点
const lazyTemplate = (args) => ({
  components: { TTree, TForm, TFormItem, TSwitch },
  template: `  <div class="tdesign-tree-demo">
  <h3 class="title">数据延迟加载</h3>
  <p class="tips">默认为点击加载数据。</p>
  <p class="tips">
    valueMode 默认为 'onlyLeaf'。选中父节点时，子节点由于未加载，无法更新和获取选中状态，导致无法更新父节点的状态。
  </p>
  <p class="tips">所以使用延迟加载时，推荐 valueMode 设置为 'all' 或者 'parentFirst'。</p>
  <div class="operations">
    <t-form label-width="150">
      <t-form-item label="可选">
        <t-switch v-model="checkable" />
      </t-form-item>
      <t-form-item label="严格模式">
        <t-switch v-model="checkStrictly" />
      </t-form-item>
    </t-form>
  </div>
  <t-tree
    ref="tree"
    :data="items"
    hover
    expand-all
    :checkable="checkable1"
    :check-strictly="checkStrictly"
    :load="load"
    value-mode="all"
    @load="onLoad"
  />
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      items: [
        {
          label: '1',
          value: '1',
          children: true,
        },
        {
          label: '2',
          value: '2',
          children: true,
        },
      ],
    });
    const checkable1 = ref(true);
    const checkStrictly = ref(false);

    const onLoad = (curState) => {
      console.log('on load:', curState);
    };

    const load = (node) =>
      new Promise((resolve) => {
        setTimeout(() => {
          let nodes = [];
          if (node.level < 2) {
            nodes = [
              {
                label: `${node.label}.1`,
                value: `${node.value}.1`,
                children: true,
              },
              {
                label: `${node.label}.2`,
                value: `${node.value}.2`,
                children: true,
              },
            ];
          }
          resolve(nodes);
        }, 1000);
      });

    return {
      ...toRefs(state),
      checkable1,
      checkStrictly,
      onLoad,
      load,
    };
  },
});

export const lazy = lazyTemplate.bind({});
lazy.args = {};
lazy.storyName = '展开时加载节点';

// 受控用法
const controlledTemplate = (args) => ({
  components: { TTree, TInput, TAddon },
  template: `  <div class="tdesign-tree-base">
  <t-addon prepend="checked:">
    <t-input :value="allChecked" />
  </t-addon>
  <t-addon prepend="expanded:">
    <t-input :value="allExpanded" />
  </t-addon>
  <t-addon prepend="actived:">
    <t-input :value="allActived" />
  </t-addon>
  <t-tree
    :data="items"
    checkable
    activable
    :expand-on-click-node="false"
    :active-multiple="false"
    :expanded="expanded"
    :actived="actived"
    :value="checked"
    :value-mode="valueMode"
    @expand="handleExpand"
    @change="onChange"
    @active="onActive"
    @click="onClick"
  />
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const items = [
      {
        value: '1',
        label: '1',
        children: [
          {
            value: '1.1',
            label: '1.1',
            children: [
              {
                value: '1.1.1',
                label: '1.1.1',
                children: [
                  {
                    value: '1.1.1.1',
                    label: '1.1.1.1',
                  },
                  {
                    value: '1.1.1.2',
                    label: '1.1.1.2',
                  },
                ],
              },
              {
                value: '1.1.2',
                label: '1.1.2',
                children: [
                  {
                    value: '1.1.2.1',
                    label: '1.1.2.1',
                  },
                  {
                    value: '1.1.2.2',
                    label: '1.1.2.2',
                  },
                ],
              },
            ],
          },
          {
            value: '1.2',
            label: '1.2',
            children: [
              {
                value: '1.2.1',
                label: '1.2.1',
                children: [
                  {
                    value: '1.2.1.1',
                    label: '1.2.1.1',
                  },
                  {
                    value: '1.2.1.2',
                    label: '1.2.1.2',
                  },
                ],
              },
              {
                value: '1.2.2',
                label: '1.2.2',
                children: [
                  {
                    value: '1.2.2.1',
                    label: '1.2.2.1',
                  },
                  {
                    value: '1.2.2.2',
                    label: '1.2.2.2',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        value: '2',
        label: '2 这个节点不允许展开, 不允许激活',
        checkable: false,
        children: [
          {
            value: '2.1',
            label: '2.1 这个节点不允许选中',
            checkable: false,
          },
          {
            value: '2.2',
            label: '2.2',
            checkable: false,
          },
        ],
      },
    ];
    const checked = ref(['1.1.1.1', '1.1.1.2']);
    const expanded = ref(['1', '1.1', '1.1.1', '2']);
    const actived = ref(['2']);

    const allChecked = computed(() => {
      let arr = [];
      if (Array.isArray(checked.value)) {
        arr = checked.value;
      }
      return arr.join(', ');
    });

    const allExpanded = computed(() => {
      let arr = [];
      if (Array.isArray(expanded.value)) {
        arr = expanded.value;
      }
      return arr.join(', ');
    });

    const allActived = computed(() => {
      let arr = [];
      if (Array.isArray(actived.value)) {
        arr = actived.value;
      }
      return arr.join(', ');
    });

    const onClick = (context) => {
      console.info('onClick:', context);
    };

    const onChange = (vals, context) => {
      console.info('onChange:', vals, context);
      const curChecked = vals.filter((val) => val !== '2.1');
      console.info('节点 2.1 不允许选中');
      checked.value = curChecked;
    };

    const handleExpand = (vals, context) => {
      console.info('onExpand:', vals, context);
      const curExpanded = vals.filter((val) => val !== '2');
      console.info('节点 2 不允许展开');
      expanded.value = curExpanded;
    };

    const onActive = (vals, context) => {
      console.info('onActive:', vals, context);
      const curActived = vals.filter((val) => val !== '2');
      console.info('节点 2 不允许激活');
      actived.value = curActived;
    };

    const valueMode = 'onlyLeaf';
    return {
      ...toRefs(state),
      items,
      checked,
      expanded,
      actived,
      allChecked,
      allExpanded,
      allActived,
      onClick,
      onChange,
      handleExpand,
      onActive,
      valueMode,
    };
  },
});

export const controlled = controlledTemplate.bind({});
controlled.args = {};
controlled.storyName = '受控用法';
