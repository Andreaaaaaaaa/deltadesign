import { reactive, toRefs } from 'vue';
import { Cascader as TCascader } from '../src/components/cascader/index';
import '../src/assets/cascader-hook.scss';

export default {
  title: '输入/Cascader 级联组件',
  component: TCascader,
  argTypes: {
    checkProps: {
      description: `参考 checkbox 组件 API。TS 类型：CheckboxProps，Checkbox API Documents。详细类型定义`,
      table: {
        category: 'Props',
        type: { summary: 'Object' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    checkStrictly: {
      description: `父子节点选中状态不再关联，可各自选中或取消`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
      },
    },
    clearable: {
      description: `是否支持清空选项`,
      defaultValue: 'false',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
      },
    },
    collapsedItems: {
      description: `多选情况下，用于设置折叠项内容，默认为+N。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。TS 类型：TNode<{ value: CascaderOption[]; collapsedSelectedItems: CascaderOption[]; count: number }>。通用类型定义`,
      table: {
        category: 'Props',
        type: { summary: 'Slot / Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    disabled: {
      description: `是否禁用`,
      defaultValue: 'false',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
      },
    },
    empty: {
      description: `无匹配选项时的内容，默认全局配置为 '暂无数据'。TS 类型：string | TNode。通用类型定义`,
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    filterable: {
      description: `是否可搜索`,
      defaultValue: 'false',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
      },
    },
    keys: {
      description: `用来定义 value / label / children 在 options 中对应的字段别名。TS 类型：CascaderKeysType interface CascaderKeysType { value?: string; label?: string; children?: string }。通用类型定义。详细类型定义`,
      table: {
        category: 'Props',
        type: { summary: 'Object' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    lazy: {
      description: `延迟加载 children 为 true 的子节点，即使 expandAll 被设置为 true，也同样延迟加载`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
      control: {
        type: null,
      },
    },
    load: {
      description: `加载子树数据的方法（仅当节点 children 为 true 时生效）。TS 类型：(node: TreeNodeModel<CascaderOption>) => Promise<Array<CascaderOption>>`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    loading: {
      description: `是否为加载状态`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
      },
    },
    loadingText: {
      description: `远程加载时显示的文字，支持自定义。如加上超链接。TS 类型：string | TNode。通用类型定义`,
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    max: {
      description: `用于控制多选数量，值为 0 则不限制`,
      table: {
        category: 'Props',
        type: { summary: 'Number' },
        defaultValue: { summary: '0' },
      },
      control: {
        type: null,
      },
    },
    minCollapsedNum: {
      description: `最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠`,
      table: {
        category: 'Props',
        type: { summary: 'Number' },
        defaultValue: { summary: '0' },
      },
      control: {
        type: null,
      },
    },
    multiple: {
      description: `是否允许多选`,
      defaultValue: 'false',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
      },
    },
    options: {
      description: `可选项数据源。TS 类型：Array<CascaderOption>`,
      table: {
        category: 'Props',
        type: { summary: 'Array' },
        defaultValue: { summary: '[]' },
      },
      control: {
        type: '',
      },
    },
    placeholder: {
      description: `占位符`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    popupProps: {
      description: `参考 popup 组件 API。TS 类型：PopupProps，Popup API Documents。详细类型定义`,
      table: {
        category: 'Props',
        type: { summary: 'Object' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    showAllLevels: {
      description: `选中值使用完整路径，输入框在单选时也显示完整路径`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
      control: {
        type: null,
      },
    },
    size: {
      description: `组件尺寸。可选项：large/medium/small。TS 类型：SizeEnum。通用类型定义`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'medium' },
      },
      control: {
        type: '-',
      },
    },
    trigger: {
      description: `展开下一层级的方式。可选项：click/hover`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'click' },
      },
      control: {
        type: null,
      },
    },
    value: {
      description: `选中项的值。支持语法糖v-model。TS 类型：CascaderValue<CascaderOption> type CascaderValue<T extends TreeOptionData = TreeOptionData> = string | number | T | Array<CascaderValue<T>>。通用类型定义。详细类型定义`,
      table: {
        category: 'Props',
        type: { summary: 'String / Number / Array' },
        defaultValue: { summary: '[]' },
      },
      control: {
        type: 'text',
      },
    },
    defaultValue: {
      description: `选中项的值。非受控属性。TS 类型：CascaderValue<CascaderOption> type CascaderValue<T extends TreeOptionData = TreeOptionData> = string | number | T | Array<CascaderValue<T>>。通用类型定义。详细类型定义`,
      table: {
        category: 'Props',
        type: { summary: 'String / Number / Array' },
        defaultValue: { summary: '[]' },
      },
      control: {
        type: null,
      },
    },
    valueMode: {
      description: `选中值模式。all 表示父节点和子节点全部会出现在选中值里面；parentFirst 表示当子节点全部选中时，仅父节点在选中值里面；onlyLeaf 表示无论什么情况，选中值仅呈现叶子节点。可选项：onlyLeaf/parentFirst/all`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'onlyLeaf' },
      },
      control: {
        type: null,
      },
    },
    valueType: {
      description: `用于控制选中值的类型。single 表示输入输出值为 叶子结点值，full 表示输入输出值为全路径。可选项：single/full`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'single' },
      },
      control: {
        type: null,
      },
    },
    onBlur: {
      description: `TS 类型：(value: SelectInputValue, context: { inputValue: InputValue; e: FocusEvent }) => void失去焦点时触发`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: '-',
      },
    },
    onChange: {
      description: `TS 类型：(value: CascaderValue<CascaderOption>, context: CascaderChangeContext<CascaderOption>) => void选中值发生变化时触发。TreeNodeModel 从树组件中导出。context.node 表示触发事件的节点，context.source 表示触发事件的来源。详细类型定义。
interface CascaderChangeContext<CascaderOption> { node?: TreeNodeModel<CascaderOption>; source: CascaderChangeSource }

import { TreeNodeModel } from '@Tree'

type CascaderChangeSource = 'invalid-value' | 'checked' | 'clear' | 'unchecked'`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    onFocus: {
      description: `TS 类型：(context: { value: CascaderValue<CascaderOption>; e: FocusEvent }) => void获得焦点时触发`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    onRemove: {
      description: `TS 类型：(context: RemoveContext<CascaderOption>) => void多选模式下，选中数据被移除时触发。详细类型定义。
interface RemoveContext<T> { value: CascaderValue<T>; node: TreeNodeModel<T> }`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
  },
};

const baseTemplate = (args) => ({
  components: { TCascader },
  template: `
    <t-cascader
      v-model="value"
      :options="options"
      clearable
      size="medium"
      placeholder='请选择'
      class="t-demo-cascader"
      @change="onChange"
    ></t-cascader>`,
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
  options: [
    {
      label: '选项一',
      value: '1',
      children: [
        {
          label: '子选项一',
          value: '1.1',
        },
        {
          label: '子选项二',
          value: '1.2',
        },
        {
          label: '子选项三',
          value: '1.3',
        },
      ],
    },
    {
      label: '选项二',
      value: '2',
      children: [
        {
          label: '子选项一',
          value: '2.1',
        },
        {
          label: '子选项二',
          value: '2.2',
        },
      ],
    },
  ],
  value: '1.1',
  onChange: (val, context) => {
    console.log(val, context);
    console.log('path: ', context.node.getPath());
  },
};

base.decorators = [() => ({ template: '<div style="padding: 3em;border: 1px solid #000;"><story /></div>' })];

const mulitipleTemplate = (args) => ({
  components: { TCascader },
  template: `
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" multiple clearable/>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const multiple = mulitipleTemplate.bind({});
multiple.args = {
  options: [
    {
      label: '选项一',
      value: '1',
      children: [
        {
          label: '子选项一',
          value: '1.1',
        },
        {
          label: '子选项二',
          value: '1.2',
        },
        {
          label: '子选项三',
          value: '1.3',
        },
      ],
    },
    {
      label: '选项二',
      value: '2',
      children: [
        {
          label: '子选项一',
          value: '2.1',
        },
        {
          label: '子选项二',
          value: '2.2',
        },
      ],
    },
  ],
  value: ['1.1'],
  onChange: (e) => {
    console.log(e);
  },
};

const checkStrictlyTemplate = (args) => ({
  components: { TCascader },
  template: `
    <t-cascader class="t-demo-cascader" :options="options" v-model="value1" placeholder='请选择' check-strictly></t-cascader>
    <t-cascader
      class="t-demo-cascader"
      :options="options"
      v-model="value2"
      check-strictly
      multiple
    ></t-cascader>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const checkStrictly = checkStrictlyTemplate.bind({});
checkStrictly.args = {
  options: [
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
  ],
  value1: '1.2.2',
  value2: ['1.1.2.1', '2'],
};


const collapsedTemplate = (args) => ({
  components: { TCascader },
  template: `
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" :onRemove="handleBlur" multiple :minCollapsedNum="1" />
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" :collapsedItems="collapsedItems" multiple :minCollapsedNum="1" />
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" multiple clearable :minCollapsedNum="1">
      <template #collapsedItems="{ collapsedSelectedItems, count }">
        <t-popup>
          <template #content>
            <p
              v-for="(item, index) in collapsedSelectedItems"
              :key="index"
              style="padding: 10px;"
            >
              {{item.label}}
            </p>
          </template>
          <span v-show="count > 0" style="color: #00A870;">+{{count}}</span>
        </t-popup>
      </template>
    </t-cascader>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const collapsed = collapsedTemplate.bind({});
collapsed.args = {
  options: [
    {
      label: '选项一',
      value: '1',
      children: [
        {
          label: '子选项一',
          value: '1.1',
        },
        {
          label: '子选项二',
          value: '1.2',
        },
        {
          label: '子选项三',
          value: '1.3',
        },
      ],
    },
    {
      label: '选项二',
      value: '2',
      children: [
        {
          label: '子选项一',
          value: '2.1',
        },
        {
          label: '子选项二',
          value: '2.2',
        },
      ],
    },
  ],
  value: ['1.1', '1.2', '1.3'],
  open: true,
  handleBlur(e) {
    console.log(e);
  },
  collapsedItems: (h, { value, count, collapsedSelectedItems }) => {
    if (!(value instanceof Array) || !count) return;
    console.log('collapsedItems: ', value, collapsedSelectedItems, count);
    // hover展示全部已选项
    // TODO 需添加hover事件
  },
};


const disableTemplate = (args) => ({
  components: { TCascader },
  template: `
    <t-cascader class="t-demo-cascader" :options="options" v-model="value1" disabled></t-cascader>
    <t-cascader class="t-demo-cascader" :options="options" v-model="value2" disabled multiple></t-cascader>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const disable = disableTemplate.bind({});
disable.args = {
  options: [
    {
      label: '选项一',
      value: '1',
      children: [
        {
          label: '子选项一',
          value: '1.1',
        },
        {
          label: '子选项二',
          value: '1.2',
        },
        {
          label: '子选项三',
          value: '1.3',
        },
      ],
    },
    {
      label: '选项二',
      value: '2',
      children: [
        {
          label: '子选项一',
          value: '2.1',
        },
        {
          label: '子选项二',
          value: '2.2',
        },
      ],
    },
  ],
  value1: '1.1',
  value2: ['1.1'],
};

const ellipsisTemplate = (args) => ({
  components: { TCascader },
  template: `
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" clearable placeholder='请选择'></t-cascader>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const ellipsis = ellipsisTemplate.bind({});
ellipsis.args = {
  options: [
    {
      label: '当选项一数据展示文本过长时',
      value: '1',
      children: [
        {
          label: '子选项一',
          value: '1.1',
        },
        {
          label: '子选项二',
          value: '1.2',
        },
        {
          label: '当选项数据展示文本过长时',
          value: '1.3',
        },
      ],
    },
    {
      label: '选项二',
      value: '2',
      children: [
        {
          label: '子选项一',
          value: '2.1',
        },
        {
          label: '当选项数据展示文本过长时',
          value: '2.2',
        },
      ],
    },
  ],
  value: '1.1',
};

const filterAbleTemplate = (args) => ({
  components: { TCascader },
  template: `
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" filterable clearable placeholder='请选择'></t-cascader>
    <t-cascader class="t-demo-cascader" :options="options" v-model="value2" filterable clearable multiple placeholder='请选择' :minCollapsedNum="2"></t-cascader>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const filterAble = filterAbleTemplate.bind({});
filterAble.args = {
  options: [
    {
      label: '选项一',
      value: '1',
      children: [
        {
          label: '子选项一',
          value: '1.1',
        },
        {
          label: '子选项二',
          value: '1.2',
        },
        {
          label: '子选项三',
          value: '1.3',
        },
      ],
    },
    {
      label: '选项二',
      value: '2',
      children: [
        {
          label: '子选项一',
          value: '2.1',
        },
        {
          label: '子选项二',
          value: '2.2',
        },
      ],
    },
  ],
  value: '',
  value2: ['1.1'],
};


const keysTemplate = (args) => ({
  components: { TCascader },
  template: `
    <t-cascader class="t-demo-cascader" :keys="{ label: 'name', value: 'code', children: 'items' }" :options="options" v-model="value" clearable placeholder='请选择'></t-cascader>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const keys = keysTemplate.bind({});
keys.args = {
  options: [
    {
      name: '选项一',
      code: '1',
      items: [
        {
          name: '子选项一',
          code: '1.1',
        },
        {
          name: '子选项二',
          code: '1.2',
        },
        {
          name: '子选项三',
          code: '1.3',
        },
      ],
    },
    {
      name: '选项二',
      code: '2',
      items: [
        {
          name: '子选项一',
          code: '2.1',
        },
        {
          name: '子选项二',
          code: '2.2',
        },
      ],
    },
  ],
  value: '1.1',
};

const loadTemplate = (args) => ({
  components: { TCascader },
  template: `
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" clearable :load="load" />`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const load = loadTemplate.bind({});
load.args = {
  options: [
    {
      label: '选项1',
      value: '1',
      children: true,
    },
    {
      label: '选项2',
      value: '2',
      children: true,
    },
  ],
  value: '',
  load(node) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let nodes = [];
        if (node.level < 2) {
          nodes = [
            {
              label: `${node.label}.1`,
              children: node.level < 2,
            },
            {
              label: `${node.label}.2`,
              children: node.level < 2,
            },
          ];
        }
        resolve(nodes);
      }, 1000);
    });
  },
};

const maxTemplate = (args) => ({
  components: { TCascader },
  template: `
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" multiple clearable :max="3"/>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const max = maxTemplate.bind({});
max.args = {
  options: [
    {
      label: '选项一',
      value: '1',
      children: [
        {
          label: '子选项一',
          value: '1.1',
        },
        {
          label: '子选项二',
          value: '1.2',
        },
        {
          label: '子选项三',
          value: '1.3',
        },
      ],
    },
    {
      label: '选项二',
      value: '2',
      children: [
        {
          label: '子选项一',
          value: '2.1',
        },
        {
          label: '子选项二',
          value: '2.2',
        },
      ],
    },
  ],
  value: [],
};

const showAllLevelsTemplate = (args) => ({
  components: { TCascader },
  template: `
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" :show-all-levels="false" placeholder='请选择'></t-cascader>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const showAllLevels = showAllLevelsTemplate.bind({});
showAllLevels.args = {
  options: [
    {
      label: '选项一',
      value: '1',
      children: [
        {
          label: '子选项一',
          value: '1.1',
        },
        {
          label: '子选项二',
          value: '1.2',
        },
        {
          label: '子选项三',
          value: '1.3',
        },
      ],
    },
    {
      label: '选项二',
      value: '2',
      children: [
        {
          label: '子选项一',
          value: '2.1',
        },
        {
          label: '子选项二',
          value: '2.2',
        },
      ],
    },
  ],
  value: '',
};

const sizeTemplate = (args) => ({
  components: { TCascader },
  template: `
      <div>
    <!-- 非受控用法 -->
    <t-cascader class="t-demo-cascader" :options="options" :defaultValue="value" clearable size="small" placeholder='请选择'></t-cascader>
    <!-- 受控+语法糖用法 -->
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" clearable size="medium" placeholder='请选择'></t-cascader>
    <!-- 受控用法 -->
    <t-cascader class="t-demo-cascader" :options="options" :value="value" @change="handleValueChange" clearable size="large" placeholder='请选择'></t-cascader>
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

export const size = sizeTemplate.bind({});
size.args = {
  options: [
    {
      label: '选项一',
      value: '1',
      children: [
        {
          label: '子选项一',
          value: '1.1',
        },
        {
          label: '子选项二',
          value: '1.2',
        },
        {
          label: '子选项三',
          value: '1.3',
        },
      ],
    },
    {
      label: '选项二',
      value: '2',
      children: [
        {
          label: '子选项一',
          value: '2.1',
        },
        {
          label: '子选项二',
          value: '2.2',
        },
      ],
    },
  ],
  value: '1.1',
  handleValueChange(e) {
    console.log(e);
  },
};


const triggerTemplate = (args) => ({
  components: { TCascader },
  template: `
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" trigger="click" placeholder='请选择'></t-cascader>
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" trigger="hover" placeholder='请选择'></t-cascader>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const trigger = triggerTemplate.bind({});
trigger.args = {
  options: [
    {
      label: '选项一',
      value: '1',
      children: [
        {
          label: '子选项一',
          value: '1.1',
        },
        {
          label: '子选项二',
          value: '1.2',
        },
        {
          label: '子选项三',
          value: '1.3',
        },
      ],
    },
    {
      label: '选项二',
      value: '2',
      children: [
        {
          label: '子选项一',
          value: '2.1',
        },
        {
          label: '子选项二',
          value: '2.2',
        },
      ],
    },
  ],
  value: '',
};

const valueModeTemplate = (args) => ({
  components: { TCascader },
  template: `
    <div>
    <t-cascader class="t-demo-cascader" :options="options" v-model="value1" placeholder='请选择' multiple value-mode="onlyLeaf"></t-cascader>
    <t-cascader class="t-demo-cascader" :options="options" v-model="value2" placeholder='请选择' multiple value-mode="parentFirst"></t-cascader>
    <t-cascader class="t-demo-cascader" :options="options" v-model="value3" placeholder='请选择' multiple value-mode="all" ></t-cascader>
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

export const valueMode = valueModeTemplate.bind({});
valueMode.args = {
  options: [
    {
      label: '选项一',
      value: '1',
      children: [
        {
          label: '子选项一',
          value: '1.1',
        },
        {
          label: '子选项二',
          value: '1.2',
        },
        {
          label: '子选项三',
          value: '1.3',
        },
      ],
    },
    {
      label: '选项二',
      value: '2',
      children: [
        {
          label: '子选项一',
          value: '2.1',
        },
        {
          label: '子选项二',
          value: '2.2',
        },
      ],
    },
  ],
  value1: [],
  value2: [],
  value3: [],
};

const valueTypeTemplate = (args) => ({
  components: { TCascader },
  template: `
   <div>
    <t-cascader v-model="value" class="t-demo-cascader" :options="options" value-type="full" placeholder="请选择" />

    <t-cascader
      v-model="value2"
      class="t-demo-cascader"
      multiple
      :options="options"
      value-type="full"
      placeholder="请选择"
    />
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

export const valueType = valueTypeTemplate.bind({});
valueType.args = {
  options: [
    {
      label: '选项一',
      value: '1',
      children: [
        {
          label: '子选项一',
          value: '1.1',
        },
        {
          label: '子选项二',
          value: '1.2',
        },
        {
          label: '子选项三',
          value: '1.3',
        },
      ],
    },
    {
      label: '选项二',
      value: '2',
      children: [
        {
          label: '子选项一',
          value: '2.1',
        },
        {
          label: '子选项二',
          value: '2.2',
        },
      ],
    },
  ],
  value: ['1', '1.1'],
  value2: [
    ['1', '1.1'],
    ['1', '1.2'],
  ],
};

