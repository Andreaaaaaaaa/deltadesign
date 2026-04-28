/* eslint-disable no-plusplus */
import { reactive, toRefs, ref } from 'vue';
import { Transfer as TTransfer } from '../src/components/transfer/index';

export default {
  title: '输入/Transfer 穿梭框',
  component: TTransfer,
  argTypes: {
    checkboxProps: {
      description: `用于控制复选框属性。TS 类型：<code>>CheckboxProps，Checkbox API Documents</code。详细类型定义`,
      table: {
        category: 'Props',
        type: { summary: 'Object' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    checked: {
      description: `数据列表选中项。支持语法糖 .sync。TS 类型：<code>Array<TransferValue></code>`,
      table: {
        category: 'Props',
        type: { summary: 'Array' },
        defaultValue: { summary: '[]' },
      },
      control: {
        type: null,
      },
    },
    defaultChecked: {
      description: `数据列表选中项。非受控属性。TS 类型：<code>Array<TransferValue></code>`,
      table: {
        category: 'Props',
        type: { summary: 'Array' },
        defaultValue: { summary: '[]' },
      },
      control: {
        type: null,
      },
    },
    data: {
      description: `全量数据。TS 类型：<code>Array<T></code>`,
      table: {
        category: 'Props',
        type: { summary: 'Array' },
        defaultValue: { summary: '[]' },
      },
      control: {
        type: null,
      },
    },
    direction: {
      description: `穿梭框可操作方向。可选项：<code>left/right/both</code>`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'both' },
      },
      control: {
        type: null,
      },
    },
    disabled: {
      description: `禁用全部操作：搜索、选中、移动、分页等。[源列表, 目标列表]，示例：<code>[true, false]</code> 或者 <code>true</code>。TS 类型：<code>boolean | Array<boolean></code>`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean / Array' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
      },
    },
    empty: {
      description: `列表为空时呈现的内容。值类型为数组，则表示分别控制源列表和目标列表数据为空的呈现内容。TS 类型：<code>EmptyType | Array<EmptyType> | TNode type EmptyType = string | TNode</code> 。<a href="https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>。详细类型定义`,
      table: {
        category: 'Props',
        type: { summary: 'String / Array / Slot / Function' },
        defaultValue: { summary: '' },
      },
      control: {
        type: null,
      },
    },
    footer: {
      description: `穿梭框底部内容。TS 类型：<code>Array<string | TNode> | TNode<{ type: TransferListType }></code>。<a href="https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>`,
      table: {
        category: 'Props',
        type: { summary: 'Array / Slot / Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    keys: {
      description: `用来定义选项文本和选项值字段，示例：<code>{ label: 'text', value: 'id' }</code>，表示选项文本取 text 字段，选项值取 id 字段。TS 类型：<code>KeysType</code>。<a href="https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>`,
      table: {
        category: 'Props',
        type: { summary: 'Object' },
        defaultValue: { summary: '' },
      },
      control: {
        type: null,
      },
    },
    operation: {
      description: `方向操作按钮。默认显示组件内置操作图标。自定义操作图标示例：<code>['向左', '向右'] 或者 [() => <i class='left' />, () => <i class='left' />] </code>或者 <code>(h, direction) => direction === 'left' ? '《' : '》'</code>。TS 类型：Array<string | TNode> | TNode<{ direction: 'left' | 'right' }>。<a href="https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>`,
      table: {
        category: 'Props',
        type: { summary: 'Array / Slot / Function' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
      },
    },
    pagination: {
      description: `分页配置，值为空则不显示。具体 API 参考分页组件。值类型为数组，表示可分别控制源列表和目标列表分页组件。TS 类型：<code>PaginationProps | Array<PaginationProps></code>，Pagination API Documents。详细类型定义`,
      table: {
        category: 'Props',
        type: { summary: 'Object / Array' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    search: {
      description: `搜索框配置，值为 <code>false</code> 表示不显示搜索框；值为 <code>true</code> 表示显示默认搜索框；值类型为对象，用于透传 <code>Props</code> 到 <code>Input</code> 组件；值类型为数组，则分别表示控制两侧搜索框。TS 类型：<code>SearchOption | Array<SearchOption> type SearchOption = boolean | InputProps</code>，Input API Documents。详细类型定义`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean / Object / Array' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
      },
    },
    showCheckAll: {
      description: `是否显示全选，值类型为数组则表示分别控制源列表和目标列表。TS 类型：<code>boolean | Array<boolean></code>`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean / Array' },
        defaultValue: { summary: 'true' },
      },
      control: {
        type: null,
      },
    },
    targetSort: {
      description: `目标数据列表排列顺序。可选项：<code>original/push/unshift</code>`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'original' },
      },
      control: {
        type: null,
      },
    },
    title: {
      description: `穿梭框标题，示例：<code>['源列表', '目标列表'] 或者 [() => 'A', () => 'B'] 或者 ({ type }) => type === 'source' ? '源' : '目标'。TS 类型：Array<TitleType> | TNode<{ type: TransferListType }> type TitleType = string | TNode type TransferListType = 'source' | 'target'</code>。<a href="https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>。详细类型定义`,
      table: {
        category: 'Props',
        type: { summary: 'Array / Slot / Function' },
        defaultValue: { summary: '[]' },
      },
      control: {
        type: null,
      },
    },
    transferItem: {
      description: `自定义渲染节点。TS 类型：<code>TNode<TransferItem<T>> interface TransferItem<T extends DataOption = DataOption> { data: T; index: number; type: TransferListType}</code>。<a href="https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>。详细类型定义`,
      table: {
        category: 'Props',
        type: { summary: 'Slot / Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    tree: {
      description: `TS 类型：<code>(tree: TreeProps) => TNode</code>，Tree API Documents。<a href="https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>。详细类型定义`,
      table: {
        category: 'Props',
        type: { summary: 'Solt / Function' },
        defaultValue: { summary: '传入 Tree 组件定义树形结构' },
      },
      control: {
        type: null,
      },
    },
    value: {
      description: `目标数据列表数据。支持语法糖 <code>v-model</code>。TS 类型：Array<TransferValue>`,
      table: {
        category: 'Props',
        type: { summary: 'Array' },
        defaultValue: { summary: '[]' },
      },
      control: {
        type: null,
      },
    },
    defaultValue: {
      description: `目标数据列表数据。非受控属性。TS 类型：<code>Array<TransferValue></code>`,
      table: {
        category: 'Props',
        type: { summary: 'Array' },
        defaultValue: { summary: '[]' },
      },
      control: {
        type: null,
      },
    },
    onChange: {
      description: `TS 类型：<code>(targetValue: Array<TransferValue>, context: TargetParams) => void</code>
数据列表发生变化时触发，<code>type</code> 值为 <code>source</code>，表示源列表移动到目标列表，值为 <code>target</code> 表示目标列表移动到源列表，<code>movedValue</code> 则表示被移动的选项。TS 类型：<code>TNode</code>。<a href="https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>。详细类型定义。
<code>interface TargetParams { type: TransferListType; movedValue: Array<TransferValue> }</code>`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: '-',
      },
    },
    onCheckedChange: {
      description: `TS 类型：<code>(options: CheckedOptions) => void</code>源数据列表或目标数据列表的选中项发生变化时触发，<code>context.type</code> 可以区分触发来源是目标列表，还是源列表。TS 类型：<code>TNode</code>。<a href="https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>。详细类型定义。
<code>interface CheckedOptions { checked: Array<TransferValue>; sourceChecked: Array<TransferValue>; targetChecked: Array<TransferValue>; type: TransferListType }</code>`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    onPageChange: {
      description: `TS 类型：<code>(page: PageInfo, context: { type: TransferListType }) => void</code>分页发生变化时触发`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    onScroll: {
      description: `TS 类型：<code>(options: { e: Event; bottomDistance: number; type: TransferListType }) => void</code>
列表滚动时触发，<code>bottomDistance</code> 表示元素滚动到底部的距离。TS 类型：<code>TNode</code>。<a href="https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    onSearch: {
      description: `TS 类型：<code>(options: SearchContext) => void</code>搜索时触发，<code>options.query</code> 表示用户输入的内容。TS 类型：<code>TNode</code>。<a href="https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>。详细类型定义。
<code>interface SearchContext { query: string; type: TransferListType; trigger: 'input' | 'enter'; e: InputEvent | KeyboardEvent }</code>`,
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

const list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
    disabled: i % 4 < 1,
  });
}
const checkedValue = list.map((item) => item.value).filter((v) => v % 2 === 0);
const baseTemplate = (args) => ({
  components: { TTransfer },
  template: `
    <div>
    <t-transfer
      v-model="targetValue"
      :data="list"
      :checked="checked"
      @change="onChange"
      @checked-change="handleCheckedChange"
    />
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });

    const handleCheckedChange = ({ checked: checkedVal, sourceChecked, targetChecked, type }) => {
      console.log('handleCheckedChange', {
        checkedVal,
        sourceChecked,
        targetChecked,
        type,
      });
    };

    const onChange = (newTargetValue) => {
      console.log('newTargetValue', newTargetValue);
    };
    return {
      ...toRefs(state),
      handleCheckedChange,
      onChange,
    };
  },
});

export const base = baseTemplate.bind({});
base.args = {
  targetValue: '',
  list,
  checked: ['2'],
};

const checkedTemplate = (args) => ({
  components: { TTransfer },
  template: `
    <div>
    <t-transfer v-model:checked="checked" :data="list" />
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

export const checked = checkedTemplate.bind({});
checkedValue.args = {
  list,
  checked: checkedValue,
};

const customRenderTemplate = (args) => ({
  components: { TTransfer },
  template: `
    <div>
    <t-transfer
      v-model="targetValue"
      theme="primary"
      :data="list"
      :checked-value="checkedValue"
      :transfer-item="transferItem"
    />
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });

    const transferItem = (h, { data, index, type }) => {
      const sourceLabel = (
        <span class="transfer-item">
          {data.label} - {data.description}
        </span>
      );
      const targetLabel = (
        <span class="transfer-item">
          {index} - {data.label}
        </span>
      );
      return type === 'source' ? sourceLabel : targetLabel;
    };
    return {
      ...toRefs(state),
      transferItem,
    };
  },
});

export const customRender = customRenderTemplate.bind({});

const customRenderList = [];
for (let i = 0; i < 20; i++) {
  customRenderList.push({
    value: i.toString(),
    label: `内容${i + 1}`,
    description: `第${i + 1}段信息`,
  });
}
customRender.args = {
  list: customRenderList,
  targetValue: [],
  checkedValue: [],
};

const customTemplate = (args) => ({
  components: { TTransfer },
  template: `
    <div>
    <t-transfer :data="list">
      <template #title="props">
        <div>{{ props.type === 'target' ? '目标' : '来源' }}</div>
      </template>
      <template #operation="props">
        {{ props.direction === 'left' ? '移除' : '加入' }}
      </template>
      <template #footer="props">
        <div style="padding: 10px; border-top: 1px solid #e7e7e7">
          <span v-if="props.type === 'source'">选中并加入</span>
          <span v-else>选中并移除</span>
        </div>
      </template>
    </t-transfer>
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

export const custom = customTemplate.bind({});
const customList = [];
for (let i = 0; i < 20; i++) {
  customList.push({
    value: i.toString(),
    label: `内容${i + 1}`,
  });
}
custom.args = {
  list: customList,
};

const disabledTemplate = (args) => ({
  components: { TTransfer },
  template: `
    <div>
    <t-transfer :data="list" :disabled="[false, true]" :default-value="defaultValue" />
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

export const disabled = disabledTemplate.bind({});
const defaultValue = list.map((item) => item.value).filter((v) => parseInt(v, 10) % 2 === 0);
disabled.args = {
  list,
  defaultValue,
};

const emptyTemplate = (args) => ({
  components: { TTransfer },
  template: `
    <div>
      <p style="margin: 10px 0px">默认暂无数据</p>
      <t-transfer :data="list" />
      <p style="margin: 10px">自定义空状态</p>
      <t-transfer :data="list" empty="No Data" />
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

export const empty = emptyTemplate.bind({});

empty.args = {
  list: [],
};

const paginationTemplate = (args) => ({
  components: { TTransfer },
  template: `
    <div>
      <t-transfer
        v-model="targetValue"
        theme="primary"
        :data="list"
        :checked-value="checkedValue"
        :pagination="pagination"
        :on-page-change="handlePageChange"
      />
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const handlePageChange = () => {
      console.log('handlePageChange', args);
    };
    return {
      ...toRefs(state),
      handlePageChange,
    };
  },
});

export const pagination = paginationTemplate.bind({});

pagination.args = {
  list: customList,
  targetValue: [],
  checkedValue: [],
  pagination: [
    {
      pageSize: 10,
      defaultCurrent: 1,
    },
    {
      pageSize: 5,
      defaultCurrent: 1,
    },
  ],
};

const searchTemplate = (args) => ({
  components: { TTransfer },
  template: `
    <div>
       <t-transfer v-model="targetValue" theme="primary" :data="list" :search="true" />
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

export const search = searchTemplate.bind({});

search.args = {
  list: customList,
  targetValue: [],
};

const targetValueTemplate = (args) => ({
  components: { TTransfer },
  template: `
    <div>
       <t-transfer v-model="targetValue" :data="list" />
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

export const targetValue = targetValueTemplate.bind({});

targetValue.args = {
  list: customList,
  targetValue: [],
};

const treeTemplate = (args) => ({
  components: { TTransfer },
  template: `
    <div>
       <t-transfer
        v-model="targetValue"
        v-model:checked="checked"
        :data="items"
        @change="onChange"
        @checkedChange="handleCheckedChange"
      >
        <template #tree="slotProps">
          <t-tree v-bind="slotProps" checkable hover expand-all transition />
        </template>
      </t-transfer>
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const handleCheckedChange = ({ checked, sourceChecked, targetChecked, type }) => {
      console.log('handleCheckedChange', {
        checked,
        sourceChecked,
        targetChecked,
        type,
      });
    };

    const onChange = (newTargetValue) => {
      console.log('onChange', newTargetValue);
    };
    return {
      ...toRefs(state),
      handleCheckedChange,
      onChange,
    };
  },
});

export const tree = treeTemplate.bind({});

const items = [
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
tree.args = {
  items,
  targetValue: [],
  checked: [],
};
