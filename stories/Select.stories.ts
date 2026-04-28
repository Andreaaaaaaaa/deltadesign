// import { Button } from 'tdesign-vue-next/esm/button';
import { ref } from 'vue';
import { Select as TSelect } from '../src/components/select/index';
import { SearchSelect as TSearchSelect } from '../src/components/search-select/index';
import '../src/assets/select-hook.scss';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: '输入/Select 选择器',
  component: {
    TSelect,
    TSearchSelect,
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    bordered: {
      description: '是否有边框',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    clearable: {
      description: '是否可以清空选项',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    collapsedItems: {
      description:
        '多选情况下，用于设置折叠项内容，默认为 +N。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。TS 类型：TNode<{ value: T[]; collapsedSelectedItems: T[]; count: number }>。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    creatable: {
      description: '是否允许用户创建新条目，需配合 filterable 使用',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      description: '是否禁用组件',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    empty: {
      description: '当下拉列表为空时显示的内容。TS 类型：string | TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: "''",
        },
      },
    },
    filter: {
      description:
        '自定义过滤方法，用于对现有数据进行搜索过滤，判断是否过滤某一项数据。TS 类型：(filterWords: string, option: T) => boolean | Promise<boolean>',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    filterable: {
      description: '是否可搜索',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    inputProps: {
      description: '透传 Input 组件全部属性。TS 类型：InputProps。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    keys: {
      description:
        '用来定义 value / label 在 options 中对应的字段别名。TS 类型：SelectKeysType。通用类型定义。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    loading: {
      description: '是否为加载状态',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    loadingText: {
      description: '远程加载时显示的文字，支持自定义。如加上超链接。TS 类型：string | TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: "''",
        },
      },
    },
    max: {
      description: '用于控制多选数量，值为 0 则不限制',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Number',
        },
        defaultValue: {
          summary: '0',
        },
      },
    },
    minCollapsedNum: {
      description: '最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Number',
        },
        defaultValue: {
          summary: '0',
        },
      },
    },
    multiple: {
      description: '是否允许多选',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    options: {
      description: '数据化配置选项内容。TS 类型：Array<T>',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '[]',
        },
      },
    },
    panelBottomContent: {
      description: '面板内的底部内容。TS 类型：string | TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    panelTopContent: {
      description: '面板内的顶部内容。TS 类型：string | TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    placeholder: {
      description: '占位符',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: 'undefined',
        },
      },
    },
    popupProps: {
      description: '透传给 popup 组件的参数。TS 类型：PopupProps。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    prefixIcon: {
      description: '组件前置图标。TS 类型：TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    reserveKeyword: {
      description: '多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    showArrow: {
      description: '是否显示右侧箭头，默认显示',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    size: {
      description: '组件尺寸。可选项：small / medium / large。TS 类型：SizeEnum。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: 'medium',
        },
      },
    },
    value: {
      description: '选中值。支持语法糖 v-model 或 v-model:value。TS 类型：SelectValue。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'String / Number / Object / Array',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    defaultValue: {
      description: '选中值。非受控属性。TS 类型：SelectValue。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'String / Number / Object / Array',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    valueDisplay: {
      description: '自定义选中项呈现方式。TS 类型：TNode<{ value: T[]; onClose: () => void }>。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    valueType: {
      description:
        "用于控制选中值的类型。假设数据选项为：[{ label: '姓名', value: 'name' }]，value 表示值仅返回数据选项中的 value， object 表示值返回全部数据。。可选项：value/object",
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: 'value',
        },
      },
    },
    onBlur: {
      description:
        'TS 类型：(context: { value: SelectValue; e: FocusEvent | KeyboardEvent }) => void 输入框失去焦点时触发',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onChange: {
      description: 'TS 类型：(value: SelectValue) => void 选中值变化时触发',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onClear: {
      description: 'TS 类型：(context: { e: MouseEvent }) => void 点击清除按钮时触发',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onCreate: {
      description: 'TS 类型：(value: string | number) => void 当选择新创建的条目时触发',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onEnter: {
      description:
        'TS 类型：(context: { inputValue: string; e: KeyboardEvent; value: SelectValue }) => void 回车键按下时触发。inputValue 表示输入框的值，value 表示选中值',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onFocus: {
      description:
        'TS 类型：(context: { value: SelectValue; e: FocusEvent | KeyboardEvent }) => void 输入框获得焦点时触发',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onRemove: {
      description:
        'TS 类型：(options: SelectRemoveContext<T>) => void 多选模式下，选中数据被移除时触发。详细类型定义。 interface SelectRemoveContext<T> { value: string | number; data: T; e: MouseEvent | KeyboardEvent } ',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onSearch: {
      description: 'TS 类型：(filterWords: string) => void 输入值变化时，触发搜索事件。主要用于远程搜索新数据',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onVisibleChange: {
      description: 'TS 类型：(visible: boolean) => void 下拉框隐藏/显示时触发',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
  },
};

const singleTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TSelect },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const options = [
      { label: '架构云', value: '1' },
      { label: '大数据', value: '2' },
      { label: '区块链', value: '3' },
      { label: '物联网', value: '4' },
      { label: '人工智能', value: '5' },
      { label: '架构云', value: '11' },
      { label: '大数据', value: '21' },
      { label: '区块链', value: '31' },
      { label: '物联网', value: '41' },
      { label: '人工智能', value: '51' },
      { label: '架构云', value: '111' },
      { label: '大数据', value: '211' },
      { label: '区块链', value: '311' },
      { label: '物联网', value: '411' },
      { label: '人工智能', value: '511' },
    ];
    return {
      args,
      options,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<t-select :options="options" placeholder="请选择云解决方案" clearable/>`,
});

export const single = singleTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
single.args = {};
single.storyName = '单项选择';

const multipleTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TSelect },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const options = [
      { label: '架构云', value: '1', disabled: 'true' },
      { label: '大数据', value: '2' },
      { label: '区块链', value: '3' },
      { label: '物联网', value: '4' },
      { label: '人工智能', value: '5' },
    ];
    return {
      args,
      options,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div style='width:159px;display:flex;transform:(-50%,0)'><t-select :options="options" placeholder="请选择云解决方案" multiple :min-collapsed-num="1" clearable  filterable/></div>`,
});

export const multiple = multipleTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
multiple.args = {};
multiple.storyName = '多项选择器';

const searchTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TSearchSelect },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const selectedValue = ref('');
    const options = [
      { label: '架构云', value: '1', disabled: 'true' },
      { label: '大数据', value: '2', disabled: 'true' },
      { label: '区块链', value: '3' },
      { label: '物联网', value: '4' },
      { label: '人工智能', value: '5' },
      { label: '区块链', value: '3' },
      { label: '物联网', value: '4' },
      { label: '人工智能', value: '5' },
      { label: '区块链', value: '3' },
      { label: '物联网', value: '4' },
      { label: '人工智能', value: '5' },
    ];
    return {
      selectedValue,
      args,
      options,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div style='width:159px;display:flex'><t-search-select v-model="selectedValue" :options="options" placeholder="请选择云解决方案" :multiple="true" :min-collapsed-num="1" clearable/></div>`,
});

export const search = searchTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
search.args = {};
search.storyName = '可过滤选择器';
