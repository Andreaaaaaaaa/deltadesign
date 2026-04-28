import { reactive, toRefs } from 'vue';
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
import { Button } from 'tdesign-vue-next/es/button';
import { MessagePlugin } from 'tdesign-vue-next/es/message';
import {
  Dropdown as TDropdown,
  DropdownItem as TDropdownItem,
  DropdownMenu as TDropdownMenu,
} from '../src/components/dropdown/index.ts';
// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: '导航/Dropdown 下拉菜单',
  component: TDropdown,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    direction: {
      description: '多层级操作时，子层级展开方向。可选项：left/right',
      table: {
        category: 'Dropdown Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 'right' },
      },
      control: {
        type: null,
      },
      defaultValue: 'right',
    },
    disabled: {
      description: '是否禁用组件',
      table: {
        category: 'Dropdown Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    hideAfterItemClick: {
      description: '点击选项后是否自动隐藏弹窗',
      table: {
        category: 'Dropdown Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: true },
      },
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    maxColumnWidth: {
      description: '选项最大宽度，内容超出时，显示为省略号。值为字符串时，值就是最大宽度；值为数字时，单位：px',
      table: {
        category: 'Dropdown Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 100 },
      },
      control: {
        type: 'number',
      },
      defaultValue: 100,
    },
    maxHeight: {
      description: '弹窗最大高度，单位：px 。统一控制每一列的高度',
      table: {
        category: 'Dropdown Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 300 },
      },
      control: {
        // type: null,
      },
    },
    minColumnWidth: {
      description: '选项最小宽度。值为字符串时，值就是最小宽度；值为数字时，单位：px',
      table: {
        category: 'Dropdown Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 10 },
      },
      control: {
        // type: null,
      },
    },
    options: {
      description: '下拉操作项。',
      table: {
        category: 'Dropdown Props',
        type: {
          category: 'Dropdown Props',
          summary: 'TS 类型：Array<t-dropdownOption>',
          // detail: '',
        },
        defaultValue: { summary: '[]' },
      },
    },
    placement: {
      description:
        '弹窗定位方式，可选值同 Popup 组件。可选项：top/left/right/bottom/top-left/top-right/bottom-left/bottom-right/left-top/left-bottom/right-top/right-bottom',
      table: {
        category: 'Dropdown Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 'bottom-left' },
      },
      control: {
        // type: null,
        // null text radio select/option
      },
    },
    popupProps: {
      description: '透传 Popup 组件属性，方便更加自由地控制。比如使用 popupProps.overlayStyle 设置浮层样式。',
      table: {
        category: 'Dropdown Props',
        type: {
          summary: 'TS 类型：PopupProps',
          // detail: '',
        },
        // defaultValue: { summary: '-' },
      },
      control: {
        type: null,
        // null text radio select/option
      },
    },
    trigger: {
      category: 'Dropdown Props',
      description: '触发下拉显示的方式。可选项：hover/click/focus/context-menu',
      table: {
        category: 'Dropdown Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 'hover' },
      },
      control: {
        // type: null,
        // null text radio select/option
      },
    },
    onClick: {
      description: '下拉操作项点击时触发',
      table: {
        category: 'Dropdown Props',
        type: {
          summary: 'TS 类型：(dropdownItem: DropdownOption, context: { e: MouseEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
      control: {
        type: null,
        // null text radio select/option
      },
    },
    click: {
      description: '下拉操作项点击时触发',
      table: {
        category: 'Dropdown Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
      control: {
        type: null,
        // null text radio select/option
      },
    },
    active: {
      description: '是否高亮当前操作项',
      table: {
        category: 'DropdownItem Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
        // null text radio select/option
      },
    },
    content: {
      description: '下拉操作项内容。',
      table: {
        category: 'DropdownItem Props',
        type: {
          summary: 'TS 类型：string | TNode',
          // detail: '',
        },
        defaultValue: { summary: '' },
      },
      control: {
        type: null,
        // null text radio select/option
      },
    },
    DropdownItemDisabled: {
      name: 'disabled',
      description: '是否禁用操作项',
      table: {
        category: 'DropdownItem Props',
        type: {
          // summary: 'TS 类型：string | TNode',
          // detail: '',
        },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
        // null text radio select/option
      },
    },
    divider: {
      description: '是否显示操作项之间的分隔线（分隔线默认在下方）',
      table: {
        category: 'DropdownItem Props',
        type: {
          // summary: 'TS 类型：string | TNode',
          // detail: '',
        },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
        // null text radio select/option
      },
    },
    value: {
      description: '下拉操作项唯一标识',
      table: {
        category: 'DropdownItem Props',
        type: {
          summary: 'TS 类型：string | number | { [key: string]: any }',
          // detail: '',
        },
        // defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
        // null text radio select/option
      },
    },
    DropdownItemOnClick: {
      name: 'onClick',
      description: '点击时触发',
      table: {
        category: 'DropdownItem Props',
        type: {
          summary: 'TS 类型：(dropdownItem: DropdownOption, context: { e: MouseEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
        // null text radio select/option
      },
    },
    DropdownItemClick: {
      name: 'click',
      description: '点击时触发',
      table: {
        category: 'DropdownItem Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
        // null text radio select/option
      },
    },
  },
};

// 控制
const aControlTemplate = (args) => ({
  components: { TDropdown, TButton: Button },

  template: `
    <t-dropdown
      :options="options"
      :disabled="disabled"
      :hideAfterItemClick="hideAfterItemClick"
      :maxColumnWidth="maxColumnWidth"
      :maxHeight="maxHeight"
      :minColumnWidth="minColumnWidth"
      :placement="placement"
      :trigger="trigger"
    >
      <t-button> 下拉菜单 </t-button>
    </t-dropdown>
  `,
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
    {
      content: '操作一',
      value: 1,
    },
    {
      content: '操作二',
      value: 2,
    },
    {
      content: '操作三',
      value: 3,
    },
    {
      content: '操作四',
      value: 4,
    },
  ],
  disabled: false,
  hideAfterItemClick: true,
  maxColumnWidth: 100,
  maxHeight: 300,
  minColumnWidth: 10,
  placement: 'bottom-left',
  trigger: 'hover',
  onClick: (dropdownItem, context) => {
    console.log(dropdownItem, context);
  },
};
aControl.storyName = '控制';

const TextDropdownTemplate = (args) => ({
  components: { TDropdown, TDropdownItem, MessagePlugin, ChevronDownIcon, TButton: Button },
  setup() {
    return { ...args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<t-dropdown v-bind="args">
      <t-button variant="text">
        <span class="tdesign-demo-dropdown__text"> 下拉菜单 <ChevronDownIcon size="16" /> </span>
      </t-button>
  </t-dropdown>`,
});

const ButtonDropdownTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TDropdown, ChevronDownIcon, TButton: Button },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { ...args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<t-dropdown v-bind="args">
    <t-button theme="default" variant="outline"> 下拉菜单 </t-button>
  </t-dropdown>`,
});

const CustomSlotDropdownTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TDropdown, TDropdownItem, TDropdownMenu },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { ...args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<t-dropdown v-bind="args">
      <t-button variant="text"> 下拉菜单 </t-button>
      <template #dropdown>
        <t-dropdown-menu>
          <t-dropdown-item :value="1"> 操作一 </t-dropdown-item>
          <t-dropdown-item :value="2"> 操作二 </t-dropdown-item>
        </t-dropdown-menu>
      </template>
  </t-dropdown>`,
});

export const textDropdown = TextDropdownTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
textDropdown.args = {
  options: [
    {
      content: '操作一',
      value: 1,
    },
    {
      content: '操作二',
      value: 2,
    },
    {
      content: '操作三',
      value: 3,
    },
    {
      content: '操作四',
      value: 4,
    },
  ],
};
textDropdown.storyName = '文字下拉菜单';

export const buttonDropdown = ButtonDropdownTemplate.bind({});
buttonDropdown.args = {
  options: [
    {
      content: '操作一',
      value: 1,
    },
    {
      content: '操作二',
      value: 2,
    },
    {
      content: '操作三',
      value: 3,
    },
    {
      content: '操作四',
      value: 4,
    },
  ],
  direction: 'right',
  disabled: false,
  hideAfterItemClick: true,
  maxColumnWidth: 100,
  maxHeight: 300,
  minColumnWidth: 10,
  placement: 'bottom-left',
  trigger: 'hover',
  onClick: (dropdownItem, context) => {
    console.log(dropdownItem, context);
  },
};
buttonDropdown.storyName = '按钮下拉菜单';
export const dividerDropdown = ButtonDropdownTemplate.bind({});

dividerDropdown.args = {
  options: [
    {
      content: '操作一',
      value: 1,
    },
    {
      content: '操作二',
      value: 2,
    },
    {
      content: '操作三',
      value: 3,
      divider: true,
    },
    {
      content: '操作四',
      value: 4,
    },
  ],
};
dividerDropdown.storyName = '带分割线下拉菜单';
export const disabledDropdown = TextDropdownTemplate.bind({});
disabledDropdown.args = {
  options: [
    {
      content: '选项一',
      value: 1,
    },
    {
      content: '选项二',
      value: 2,
    },
    {
      content: '选项三',
      value: 3,
      disabled: true,
    },
    {
      content: '选项四',
      value: 4,
      disabled: true,
    },
  ],
};
disabledDropdown.storyName = '带禁用操作项的下拉菜单';
export const customDropdown = TextDropdownTemplate.bind({});
customDropdown.args = {
  options: [
    {
      content: '选项一',
      value: 1,
    },
    {
      content: '选项二',
      value: 2,
      children: [
        {
          content: '选项五',
          value: 5,
        },
        {
          content: '选项六',
          value: 6,
        },
      ],
    },
    {
      content: '选项三',
      value: 3,
    },
    {
      content: '选项四',
      value: 4,
    },
  ],
  placement: 'top-left',
  trigger: 'click',
};
customDropdown.storyName = '自定义其他属性的下拉菜单';
export const bindClickEventDropdown = TextDropdownTemplate.bind({});

bindClickEventDropdown.args = {
  options: [
    {
      content: '选项一',
      value: 1,
      onClick: () => MessagePlugin.success('选项一'),
    },
    {
      content: '选项二',
      value: 2,
      onClick: () => MessagePlugin.success('选项二'),
    },
    {
      content: '选项三',
      value: 3,
      onClick: () => MessagePlugin.success('选项三'),
    },
    {
      content: '选项四',
      value: 4,
      onClick: () => MessagePlugin.success('选项四'),
    },
  ],
};
bindClickEventDropdown.storyName = '绑定点击事件的下拉菜单';
export const CustomSlotDropdown = CustomSlotDropdownTemplate.bind({});
CustomSlotDropdown.args = {
  minColumnWidth: 88,
  trigger: 'click',
};
CustomSlotDropdown.storyName = '通过插槽方式使用下拉菜单';
