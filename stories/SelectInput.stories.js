/* eslint-disable no-plusplus */
/*
 * @Author: lushawang(王璐璐) lushawang@tencent.com
 * @Date: 2022-05-27 10:37:14
 * @LastEditors: lushawang(王璐璐) lushawang@tencent.com
 * @LastEditTime: 2022-05-27 18:29:51
 * @FilePath: /deltaverse-ui/stories/selectInput.stories.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { reactive, toRefs, computed } from 'vue';
import { SearchIcon, ChevronDownIcon, ControlPlatformIcon } from 'tdesign-icons-vue-next';
import {
  CheckboxGroup as TCheckboxGroup,
  Tag,
  Checkbox as TCheckbox,
  RadioGroup as TRadioGroup,
} from 'tdesign-vue-next';
import { SelectInput as TSelectInput } from '../src/components/select-input/index';
import { Tag as TTag } from '../src/components/tag/index';

import './SelectInput.scss';
// import { text } from 'stream/consumers';

export default {
  title: '输入/SelectInput 筛选器输入框',
  component: TSelectInput,
  argTypes: {
    allowInput: {
      description: `是否允许输入`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
      },
    },
    borderless: {
      description: `无边框模式`,
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
    clearable: {
      description: `是否可清空`,
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
      description: `标签过多的情况下，折叠项内容，默认为+N。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。value 表示所有标签值，collapsedTags 表示折叠标签值，count 表示总标签数量。TS 类型：TNode<{ value: SelectInputValue; collapsedTags: SelectInputValue; count: number }>。<a href="https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>`,
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
    inputProps: {
      description: `透传 Input 输入框组件全部属性。TS 类型：InputProps，Input API Documents。<a href="https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts" target="_blank" rel="noopener noreferrer">详细类型定义</a>`,
      table: {
        category: 'Props',
        type: { summary: 'Object' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    keys: {
      description: `定义字段别名，示例：{ label: 'text', value: 'id', children: 'list' }。TS 类型：SelectInputKeys interface SelectInputKeys { label?: string; value?: string; children?: string }。<a href="https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts" target="_blank" rel="noopener noreferrer">详细类型定义</a>`,
      table: {
        category: 'Props',
        type: { summary: 'Object' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    label: {
      description: `左侧文本。TS 类型：string | TNode。<a href="https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>`,
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    minCollapsedNum: {
      description: `最小折叠数量，用于标签数量过多的情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠`,
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
      description: `是否为多选模式，默认为单选`,
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
      description: `透传 Popup 浮层组件全部属性。TS 类型：PopupProps，Popup API Documents。<a href="https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts" target="_blank" rel="noopener noreferrer">详细类型定义</a>`,
      table: {
        category: 'Props',
        type: { summary: 'Object' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    popupVisible: {
      description: `是否显示下拉框，受控属性`,
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
    readonly: {
      description: `是否只读，值为真会隐藏输入框，且无法打开下拉框`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
      },
    },
    status: {
      description: `输入框状态。可选项：success/warning/error`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    suffix: {
      description: `后置图标前的后置内容。TS 类型：string | TNode。<a href="https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>`,
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    suffixIcon: {
      description: `组件后置图标。TS 类型：TNode。<a href="https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>`,
      table: {
        category: 'Props',
        type: { summary: 'Solt / Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    tagInputProps: {
      description: `透传 TagInput 组件全部属性。TS 类型：TagInputProps，TagInput API Documents。<a href="https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts" target="_blank" rel="noopener noreferrer">详细类型定义</a>`,
      table: {
        category: 'Props',
        type: { summary: 'Object' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    tagProps: {
      description: `透传 Tag 标签组件全部属性。TS 类型：TagProps，Tag API Documents。<a href="https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts" target="_blank" rel="noopener noreferrer">详细类型定义</a>`,
      table: {
        category: 'Props',
        type: { summary: 'Object' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    tips: {
      description: `输入框下方提示文本，会根据不同的 status 呈现不同的样式。TS 类型：string | TNode。<a href="https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>`,
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: '-',
      },
    },
    value: {
      description: `全部标签值。值为数组表示多个标签，值为非数组表示单个数值。支持语法糖 v-model。TS 类型：SelectInputValue type SelectInputValue = string | number | boolean | Date | Object | Array<any> | Array<SelectInputValue>。<a href="https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts" target="_blank" rel="noopener noreferrer">详细类型定义</a>`,
      table: {
        category: 'Props',
        type: { summary: 'String / Number / Boolean / Object / Array / Date' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    defaultValue: {
      description: `透传 Input 输入框组件全部属性。TS 类型：InputProps，Input API Documents。<a href="https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts" target="_blank" rel="noopener noreferrer">详细类型定义</a>`,
      table: {
        category: 'Props',
        type: { summary: 'Object' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    valueDisplay: {
      description: `自定义值呈现的全部内容，参数为所有标签的值。TS 类型：string | TNode<{ value: SelectInputValue }>。<a href="https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts" target="_blank" rel="noopener noreferrer">通用类型定义</a>`,
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    onBlur: {
      description: `TS 类型：(value: SelectInputValue, context: { inputValue: InputValue; e: FocusEvent }) => void
失去焦点时触发`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: '-',
      },
    },
    onClear: {
      description: `TS 类型：(context: { e: MouseEvent }) => void
清空按钮点击时触发`,
      table: {
        category: 'Props',
        type: { summary: 'Event' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    onEnter: {
      description: `TS 类型：(value: SelectInputValue, context: { e: KeyboardEvent; inputValue: InputValue }) => void
按键按下 Enter 时触发`,
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
      description: `TS 类型：(value: SelectInputValue, context: { inputValue: InputValue; e: FocusEvent }) => void
聚焦时触发`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    onInputChange: {
      description: `TS 类型：(value: InputValue, context?: { e?: InputEvent | MouseEvent }) => void
输入框值发生变化时触发`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    onMouseenter: {
      description: `TS 类型：(context: { e: MouseEvent }) => void 进入输入框时触发`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    onMouseleave: {
      description: `TS 类型：(context: { e: MouseEvent }) => void
离开输入框时触发`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
      },
    },
    onPaste: {
      description: `TS 类型：(context: { e: ClipboardEvent; pasteValue: string }) => void
粘贴事件，pasteValue 表示粘贴板的内容`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: null,
      },
    },
    onPopupVisibleChange: {
      description: `TS 类型：(visible: boolean, context: PopupVisibleChangeContext) => void
下拉框显示或隐藏时触发。<a href="https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts" target="_blank" rel="noopener noreferrer">详细类型定义</a>。
import { PopupVisibleChangeContext } from '@Popup'`,
      table: {
        category: 'Props',
        type: { summary: ' Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    onTagChange: {
      description: `TS 类型：(value: SelectInputValue, context: SelectInputChangeContext) => void
值变化时触发，参数 context.trigger 表示数据变化的触发来源；context.index 指当前变化项的下标；context.item 指当前变化项；context.e 表示事件参数。<a href="https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts" target="_blank" rel="noopener noreferrer">详细类型定义</a>。
type SelectInputChangeContext = TagInputChangeContext

import { TagInputChangeContext } from '@TagInput'`,
      table: {
        category: 'Props',
        type: { summary: ' Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
  },
};

const autoCompleteTemplate = (args) => ({
  components: { TSelectInput, SearchIcon },
  template: `<div>
    <t-select-input
      :value="selectValue"
      :popup-visible="popupVisible"
      placeholder="请输入任意关键词"
      allow-input
      clearable
      style="width: 300px"
      @input-change="onInputChange"
      @popup-visible-change="onPopupVisibleChange"
    >
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-autocomplete">
          <li v-for="item in options" :key="item" @click="() => onOptionClick(item)">
            {{ item }}
          </li>
        </ul>
      </template>
      <template #suffixIcon><search-icon /></template>
    </t-select-input>
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const onOptionClick = (item) => {
      state.selectValue = item;
      state.popupVisible = false;
    };

    const onInputChange = (keyword) => {
      state.selectValue = keyword;
      state.options = new Array(5).fill(null).map((t, index) => `${keyword} Student ${index}`);
    };

    const onPopupVisibleChange = (val) => {
      state.popupVisible = val;
    };
    return {
      ...toRefs(state),
      onOptionClick,
      onInputChange,
      onPopupVisibleChange
    };
  },
});

export const autoComplete = autoCompleteTemplate.bind({});
autoComplete.args = {
  selectValue: '',
  popupVisible: false,
  options: ['Student A', 'Student B', 'Student C', 'Student D', 'Student E', 'Student F'],
  onOptionClick(e) {
    console.log(e);
  },
};

const autoWidthMultipleTemplate = (args) => ({
  components: { TSelectInput, ChevronDownIcon, TCheckboxGroup },
  template: `
    <div class="tdesign-demo__select-input-borderless-multiple" style="width: 100%">
      <t-select-input
        :value="value"
        :min-collapsed-num="1"
        auto-width
        allow-input
        placeholder="select frameworks"
        clearable
        multiple
        @tag-change="onTagChange"
      >
        <template #panel>
          <t-checkbox-group
            :value="checkboxValue"
            :options="options"
            class="tdesign-demo__panel-options-borderless-multiple"
            @change="onCheckedChange"
          />
        </template>
        <template #suffixIcon>
          <chevron-down-icon />
        </template>
      </t-select-input>
    </div>`,
  setup() {
    console.log(args);
     const state = reactive({
      ...args,
    });
    const checkboxValue = computed(() => {
      const arr = [];
      const list = state.value;
      // 此处不使用 forEach，减少函数迭代
      for (let i = 0, len = list.length; i < len; i++) {
        // eslint-disable-next-line no-unused-expressions
        list[i].value && arr.push(list[i].value);
      }
      return arr;
    });

    // // 直接 checkboxgroup 组件渲染输出下拉选项
    const onCheckedChange = (val, { current, type }) => {
      // current 不存在，则表示操作全选
      if (!current) {
        state.value = type === 'check' ? state.options.slice(1) : [];
        return;
      }
      // 普通操作
      if (type === 'check') {
        const option =  state.options.find((t) => t.value === current);
        state.value.push(option);
      } else {
        state.value = state.value.filter((v) => v.value !== current);
      }
    };

    // // 可以根据触发来源，自由定制标签变化时的筛选器行为
    const onTagChange = (currentTags, context) => {
      console.log(currentTags, context);
      const { trigger, index, item } = context;
      if (trigger === 'clear') {
        state.value = [];
      }
      if (['tag-remove', 'backspace'].includes(trigger)) {
        state.value.splice(index, 1);
      }
      // 如果允许创建新条目
      if (trigger === 'enter') {
        const current = { label: item, value: item };
        state.value.push(current);
        state.options = state.options.concat(current);
      }
    };
    // const prop = reactive(props);
    return {
      ...toRefs(state),
      checkboxValue,
      onCheckedChange,
      onTagChange,
    };
  },
});

export const autoWidthMultiple = autoWidthMultipleTemplate.bind({});
const OPTIONS = [
  // 全选
  { label: 'all frameworks', checkAll: true },
  { label: 'tdesign-vue', value: 1 },
  { label: 'tdesign-react', value: 2 },
  { label: 'tdesign-miniprogram', value: 3 },
  { label: 'tdesign-angular', value: 4 },
  { label: 'tdesign-mobile-vue', value: 5 },
  { label: 'tdesign-mobile-react', value: 6 },
];
autoWidthMultiple.args = {
  options: OPTIONS,
  value: [
    { label: 'Vue', value: 1 },
    { label: 'React', value: 2 },
    { label: 'Miniprogram', value: 3 },
  ],
};

const autoWidthTemplate = (args) => ({
  components: { TSelectInput, ChevronDownIcon },
  template: `
   <div>
    <t-select-input
      :value="selectValue"
      :popup-visible="popupVisible"
      placeholder="Please Select"
      clearable
      auto-width
      allow-input
      @popup-visible-change="onPopupVisibleChange"
      @clear="onClear"
      @input-change="onInputChange"
    >
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-auto-width">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
            {{ item.label }}
          </li>
        </ul>
      </template>
      <template #suffixIcon>
        <chevron-down-icon />
      </template>
    </t-select-input>
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const onOptionClick = (item) => {
      state.selectValue = item;
      // 选中后立即关闭浮层
      state.popupVisible = false;
    };
    const onClear = () => {
      state.selectValue = undefined;
    };
    const onPopupVisibleChange = (val, context) => {
      console.log(context);
      state.popupVisible = val;
    };
    const onInputChange = (val, context) => {
      // 过滤功能
      console.log(val, context);
    };
    return {
      ...toRefs(state),
      onOptionClick,
      onClear,
      onPopupVisibleChange,
      onInputChange,
    };
  },
});

export const autoWidth = autoWidthTemplate.bind({});
const autoWidthOPTIONS = [
  // 全选
  { label: 'all frameworks', checkAll: true },
  { label: 'tdesign-vue', value: 1 },
  { label: 'tdesign-react', value: 2 },
  { label: 'tdesign-miniprogram', value: 3 },
  { label: 'tdesign-angular', value: 4 },
  { label: 'tdesign-mobile-vue', value: 5 },
  { label: 'tdesign-mobile-react', value: 6 },
];
autoWidth.args = {
  options: autoWidthOPTIONS,
  selectValue: { label: 'tdesign-vue', value: 1 },
  popupVisible: false,
};

const borderLessTemplate = (args) => ({
  components: { TSelectInput, ChevronDownIcon },
  template: `
    <div>
    <t-select-input
      :value="selectValue"
      :popup-visible="popupVisible"
      placeholder="Please Select"
      borderless
      style="width: 200px"
      clearable
      @popup-visible-change="onPopupVisibleChange"
      @clear="onClear"
    >
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-borderless">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
            {{ item.label }}
          </li>
        </ul>
      </template>
    </t-select-input>
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const onOptionClick = (item) => {
      state.selectValue = item;
      state.popupVisible = false;
    };

    const onClear = () => {
      state.selectValue = undefined;
    };

    const onPopupVisibleChange = (val, context) => {
      state.popupVisible = val;
    };
    return {
      ...toRefs(state),
      onOptionClick,
      onClear,
      onPopupVisibleChange,
    };
  },
});

export const borderLess = borderLessTemplate.bind({});

borderLess.args = {
  options: OPTIONS,
  selectValue: { label: 'tdesign-vue', value: 1 },
  popupVisible: false,
};

const borderLessMultipleTemplate = (args) => ({
  components: { TSelectInput, ChevronDownIcon, TCheckboxGroup },
  template: `
    <div class="tdesign-demo__select-input-borderless-multiple" style="width: 100%">
    <t-select-input
      :value="value"
      :min-collapsed-num="1"
      borderless
      allow-input
      placeholder="select frameworks"
      clearable
      multiple
      style="width: 250px"
      @tag-change="onTagChange"
    >
      <template #panel>
        <t-checkbox-group
          :value="checkboxValue"
          :options="options"
          class="tdesign-demo__panel-options-borderless-multiple"
          @change="onCheckedChange"
        />
      </template>
    </t-select-input>
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const checkboxValue = computed(() => {
      const arr = [];
      const list = state.value;
      // 此处不使用 forEach，减少函数迭代
      for (let i = 0, len = list.length; i < len; i++) {
        // eslint-disable-next-line no-unused-expressions
        list[i].value && arr.push(list[i].value);
      }
      return arr;
    });

    // 直接 checkboxgroup 组件渲染输出下拉选项
    const onCheckedChange = (val, { current, type }) => {
      // current 不存在，则表示操作全选
      if (!current) {
        state.value = type === 'check' ? state.options.slice(1) : [];
        return;
      }
      // 普通操作
      if (type === 'check') {
        const option = state.options.find((t) => t.value === current);
        state.value.push(option);
      } else {
        state.value = state.value.filter((v) => v.value !== current);
      }
    };

    // 可以根据触发来源，自由定制标签变化时的筛选器行为
    const onTagChange = (currentTags, context) => {
      console.log(currentTags, context);
      const { trigger, index, item } = context;
      if (trigger === 'clear') {
        state.value = [];
      }
      if (['tag-remove', 'backspace'].includes(trigger)) {
        state.value.splice(index, 1);
      }
      // 如果允许创建新条目
      if (trigger === 'enter') {
        const current = { label: item, value: item };
        state.value.push(current);
        state.options = state.options.concat(current);
      }
    };
    return {
      ...toRefs(state),
      checkboxValue,
      onCheckedChange,
      onTagChange,
    };
  },
});

export const borderLessMultiple = borderLessMultipleTemplate.bind({});

borderLessMultiple.args = {
  options: OPTIONS,
  value: [
    { label: 'Vue', value: 1 },
    { label: 'React', value: 2 },
    { label: 'Miniprogram', value: 3 },
  ],
};

const collapsedItemTemplate = (args) => ({
  components: { TSelectInput, ChevronDownIcon, TCheckboxGroup, TTag },
  template: `<div class="tdesign-demo__select-input-collapsed-items" style="width: 100%">
    <br />
    <t-select-input
      :value="value"
      :min-collapsed-num="1"
      placeholder="请选择"
      allow-input
      clearable
      multiple
      @tag-change="onTagChange"
    >
      <template #panel>
        <t-checkbox-group
          :value="checkboxValue"
          :options="options"
          class="tdesign-demo__panel-options-collapsed-items"
          @change="onCheckedChange"
        />
      </template>
    </t-select-input>

    <br /><br /><br />

    <!-- 第一种方式：使用渲染函数 collapsed-items 自定义折叠项 -->
    <t-select-input
      :value="value"
      :min-collapsed-num="2"
      :collapsed-items="renderCollapsedItems"
      placeholder="请选择"
      allow-input
      clearable
      multiple
      @tag-change="onTagChange"
    >
      <template #panel>
        <t-checkbox-group
          :value="checkboxValue"
          :options="options"
          class="tdesign-demo__panel-options-collapsed-items"
          @change="onCheckedChange"
        />
      </template>
    </t-select-input>

    <br /><br /><br />

    <!-- 第二种方式：使用插槽 collapsedItems 自定义折叠项 -->
    <t-select-input
      :value="value"
      :min-collapsed-num="3"
      placeholder="请选择"
      allow-input
      clearable
      multiple
      @tag-change="onTagChange"
    >
      <template #collapsedItems="{ collapsedTags }">
        <t-popup>
          <t-tag>More({{ collapsedTags.length }})</t-tag>
          <template #content>
            <t-tag v-for="item in collapsedTags" :key="item" style="margin: 4px 4px 4px 0">
              {{ item }}
            </t-tag>
          </template>
        </t-popup>
      </template>
      <template #panel>
        <t-checkbox-group
          :value="checkboxValue"
          :options="options"
          class="tdesign-demo__panel-options-collapsed-items"
          @change="onCheckedChange"
        />
      </template>
    </t-select-input>
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const checkboxValue = computed(() => {
      const arr = [];
      const list = state.value;
      // 此处不使用 forEach，减少函数迭代
      for (let i = 0, len = list.length; i < len; i++) {
        // eslint-disable-next-line no-unused-expressions
        list[i].value && arr.push(list[i].value);
      }
      return arr;
    });

    // 直接 checkboxgroup 组件渲染输出下拉选项
    const onCheckedChange = (val, { current, type }) => {
      // current 不存在，则表示操作全选
      if (!current) {
        state.value = type === 'check' ? state.options.slice(1) : [];
        return;
      }
      // 普通操作
      if (type === 'check') {
        const option = state.options.find((t) => t.value === current);
        state.value.push(option);
      } else {
        state.value = state.value.filter((v) => v.value !== current);
      }
    };

    // 可以根据触发来源，自由定制标签变化时的筛选器行为
    const onTagChange = (currentTags, context) => {
      console.log(currentTags, context);
      const { trigger, index, item } = context;
      if (trigger === 'clear') {
        state.value = [];
      }
      if (['tag-remove', 'backspace'].includes(trigger)) {
        state.value.splice(index, 1);
      }
      if (trigger === 'enter') {
        const current = { label: item, value: item };
        state.value.push(current);
        state.options = state.options.concat(current);
      }
    };

    const renderCollapsedItems = (_, { collapsedTags }) => {
      return <Tag>更多({collapsedTags.length})</Tag>;
    };
    return {
      ...toRefs(state),
      checkboxValue,
      onCheckedChange,
      onTagChange,
      renderCollapsedItems,
    };
  },
});

export const collapsedItem = collapsedItemTemplate.bind({});
collapsedItem.args = {
  options: OPTIONS,
  value: [
    { label: 'Vue', value: 1 },
    { label: 'React', value: 2 },
    { label: 'Miniprogram', value: 3 },
  ],
};

const customTagTemplate = (args) => ({
  components: { TSelectInput, ChevronDownIcon, ControlPlatformIcon, TCheckboxGroup, TTag },
  template: `<div class="tdesign-demo-select-input-custom-tag">
    <!-- 单选，使用 valueDisplay 插槽定义选中的某一项的内容，也可使用同名渲染函数 props.valueDisplay -->
    <t-select-input :value="selectValue1" placeholder="Please Select" clearable @clear="onClear">
      <template #valueDisplay>
        <span v-if="selectValue1" class="displaySpan">
          <ControlPlatformIcon class="tdesign-demo-select-input__img" />
          {{ selectValue1.label }}
        </span>
      </template>
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-single">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
            {{ item.label }}
          </li>
        </ul>
      </template>
    </t-select-input>

    <br /><br />

    <!-- 多选，第一种方式：使用 tag 插槽定义选中的某一项的内容，也可使用同名渲染函数 props.tag -->
    <t-select-input :value="selectValue2" clearable placeholder="Please Select" multiple @tag-change="onTagChange2">
      <template #tag="{ value }">
        <span class="displaySpan">
          <ControlPlatformIcon />
          {{ value }}
        </span>
      </template>
      <template #panel>
        <div class="tdesign-demo__select-empty-custom">暂无示意数据</div>
      </template>
    </t-select-input>

    <br /><br />

    <!-- 多选，第二种方式：使用 valueDisplay 插槽定义全部选中项的内容，也可使用同名渲染函数 props.valueDisplay -->
    <t-select-input :value="selectValue3" placeholder="Please Select" multiple @tag-change="onTagChange3">
      <template #valueDisplay="{ value, onClose }">
        <!-- <span><LayersIcon />{{ value }}</span> -->
        <t-tag
          v-for="(item, index) in value"
          :key="item"
          closable
          style="margin-right: 4px"
          @close="() => onClose(index)"
        >
          <span class="displaySpan">
            <ControlPlatformIcon />
            <span>{{ item }}</span>
          </span>
        </t-tag>
      </template>
      <template #panel>
        <div class="tdesign-demo__select-empty-custom">暂无示意数据</div>
      </template>
    </t-select-input>
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const onOptionClick = (item) => {
      state.selectValue1 = item;
    };

    const onClear = () => {
      state.selectValue1 = undefined;
    };

    const onTagChange2 = (val) => {
      state.selectValue2 = val;
    };

    const onTagChange3 = (val) => {
      state.selectValue3 = val;
    };
    return {
      ...toRefs(state),
      onOptionClick,
      onClear,
      onTagChange2,
      onTagChange3,
    };
  },
});

export const customTag = customTagTemplate.bind({});
customTag.args = {
  options: OPTIONS,
  selectValue1: { label: 'tdesign-vue', value: 1 },
  selectValue2: ['tdesign-vue', 'tdesign-react'],
  selectValue3: ['tdesign-vue', 'tdesign-react', 'tdesign-mobile-vue'],
};

const excessTagsDisplayTypeTemplate = (args) => ({
  components: { TSelectInput, ChevronDownIcon, TCheckboxGroup },
  template: `<div class="tdesign-demo__select-input-excess-tags-display-type" style="width: 100%">
    <!-- excessTagsDisplayType: 'scroll'，超出时，滚动显示 -->
    <p>第一种呈现方式：超出时滚动显示</p>
    <br />
    <t-select-input
      :value="value"
      :tag-input-props="{ excessTagsDisplayType: 'scroll' }"
      placeholder="请选择"
      allow-input
      clearable
      multiple
      @tag-change="onTagChange"
    >
      <template #panel>
        <t-checkbox-group
          :value="checkboxValue"
          :options="options"
          class="tdesign-demo__panel-options-excess-tags-display-type"
          @change="onCheckedChange"
        />
      </template>
    </t-select-input>

    <br /><br /><br />

    <!-- excessTagsDisplayType: 'scroll'，超出时，换行显示 -->
    <p>第二种呈现方式：超出时换行显示</p>
    <br />
    <t-select-input
      :value="value"
      :tag-input-props="{ excessTagsDisplayType: 'break-line' }"
      placeholder="请选择"
      allow-input
      clearable
      multiple
      @tag-change="onTagChange"
    >
      <template #panel>
        <t-checkbox-group
          :value="checkboxValue"
          :options="options"
          class="tdesign-demo__panel-options-excess-tags-display-type"
          @change="onCheckedChange"
        />
      </template>
    </t-select-input>
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const checkboxValue = computed(() => {
      const arr = [];
      const list = state.value;
      // 此处不使用 forEach，减少函数迭代
      for (let i = 0, len = list.length; i < len; i++) {
        // eslint-disable-next-line no-unused-expressions
        list[i].value && arr.push(list[i].value);
      }
      return arr;
    });

    // 直接 checkboxgroup 组件渲染输出下拉选项
    const onCheckedChange = (val, { current, type }) => {
      // current 不存在，则表示操作全选
      if (!current) {
        state.value = type === 'check' ? state.options.slice(1) : [];
        return;
      }
      // 普通操作
      if (type === 'check') {
        const option = state.options.find((t) => t.value === current);
        state.value.push(option);
      } else {
        state.value = state.value.filter((v) => v.value !== current);
      }
    };

    // 可以根据触发来源，自由定制标签变化时的筛选器行为
    const onTagChange = (currentTags, context) => {
      console.log(currentTags, context);
      const { trigger, index, item } = context;
      if (trigger === 'clear') {
        state.value = [];
      }
      if (['tag-remove', 'backspace'].includes(trigger)) {
        state.value.splice(index, 1);
      }
      if (trigger === 'enter') {
        const current = { label: item, value: item };
        state.value.push(current);
        state.options = state.options.concat(current);
      }
    };
    return {
      ...toRefs(state),
      checkboxValue,
      onCheckedChange,
      onTagChange,
    };
  },
});

export const excessTagsDisplayType = excessTagsDisplayTypeTemplate.bind({});
excessTagsDisplayType.args = {
  options: [...OPTIONS],
  value: OPTIONS.slice(1),
};

const multipleTemplate = (args) => ({
  components: { TSelectInput, ChevronDownIcon, TCheckboxGroup, TCheckbox, TRadioGroup },
  template: `<div class="tdesign-demo__select-input-multiple" style="width: 100%">
    <div>
      <TCheckbox v-model="allowInput">是否允许输入</TCheckbox>
      <TCheckbox v-model="creatable">允许创建新选项（Enter 创建）</TCheckbox>
    </div>
    <br />
    <div>
      <TRadioGroup
        v-model="excessTagsDisplayType"
        :options="[
          { label: '选中项过多横向滚动', value: 'scroll' },
          { label: '选中项过多换行显示', value: 'break-line' },
        ]"
      />
    </div>
    <br /><br />

    <!-- :popup-props="{ trigger: 'hover' }" -->
    <t-select-input
      v-model:inputValue="inputValue"
      :value="value"
      :allow-input="allowInput"
      :placeholder="allowInput ? '请选择或输入' : '请选择'"
      :tag-input-props="{ excessTagsDisplayType }"
      :popup-props="{ overlayStyle: { maxHeight: '280px', overflow: 'auto' } }"
      clearable
      multiple
      @tag-change="onTagChange"
      @input-change="onInputChange"
    >
      <template #panel>
        <t-checkbox-group
          v-if="options.length"
          :value="checkboxValue"
          :options="options"
          class="tdesign-demo__panel-options-multiple"
          @change="onCheckedChange"
        />
        <div v-else class="tdesign-demo__select-empty-multiple">暂无数据</div>
      </template>
      <template #suffixIcon>
        <chevron-down-icon />
      </template>
    </t-select-input>
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const checkboxValue = computed(() => {
      const arr = [];
      const list = state.value;
      // 此处不使用 forEach，减少函数迭代
      for (let i = 0, len = list.length; i < len; i++) {
        // eslint-disable-next-line no-unused-expressions
        list[i].value && arr.push(list[i].value);
      }
      return arr;
    });
    // 直接 checkboxgroup 组件渲染输出下拉选项
    const onCheckedChange = (val, { current, type }) => {
      console.log(current);
      // current 不存在，则表示操作全选
      if (!current) {
        state.value = type === 'check' ? state.options.slice(1) : [];
        return;
      }
      // 普通操作
      if (type === 'check') {
        const option = state.options.find((t) => t.value === current);
        state.value.push(option);
      } else {
        state.value = state.value.filter((v) => v.value !== current);
      }
    };
    // 可以根据触发来源，自由定制标签变化时的筛选器行为
    const onTagChange = (currentTags, context) => {
      console.log(currentTags, context);
      const { trigger, index, item } = context;
      if (trigger === 'clear') {
        state.value = [];
      }
      if (['tag-remove', 'backspace'].includes(trigger)) {
        state.value.splice(index, 1);
      }
      // 如果允许创建新条目
      if (state.creatable && trigger === 'enter') {
        const current = { label: item, value: item };
        state.value.push(current);
        const newOptions = state.options.concat(current);
        state.options = newOptions;
        state.inputValue = '';
      }
    };
    const onInputChange = (val, context) => {
      console.log(val, context);
    };
    return {
      ...toRefs(state),
      checkboxValue,
      onCheckedChange,
      onTagChange,
      onInputChange,
    };
  },
});

export const multiple = multipleTemplate.bind({});
multiple.args = {
  excessTagsDisplayType: 'break-line',
  allowInput: true,
  creatable: true,
  inputValue: '',
  options: [...OPTIONS],
  value: [
    { label: 'Vue', value: 1 },
    { label: 'React', value: 2 },
    { label: 'Miniprogram', value: 3 },
  ],
};

const labelSuffixTemplate = (args) => ({
  components: { TSelectInput, ChevronDownIcon, TCheckboxGroup },
  template: `<div>
    <!-- :popup-props="{ trigger: 'hover' }" -->
    <!-- 前置内容使用 label 自定义，支持同名插槽 label -->
    <t-select-input
      :value="selectValue"
      :popup-visible="popupVisible"
      label="前置内容："
      style="width: 300px"
      placeholder="Please Select"
      clearable
      @popup-visible-change="onPopupVisibleChange"
      @clear="onClear"
    >
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-label-suffix">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
            {{ item.label }}
          </li>
        </ul>
      </template>
      <!-- 后置图标 -->
      <template #suffixIcon>
        <chevron-down-icon />
      </template>
    </t-select-input>
    <br /><br />

    <!-- 后置内容使用 suffix 自定义，支持同名插槽 suffix -->
    <t-select-input
      :value="selectValue"
      :popup-visible="popupVisible2"
      suffix="单位：元"
      style="width: 300px"
      placeholder="Please Select"
      clearable
      @popup-visible-change="onPopupVisibleChange2"
      @clear="onClear"
    >
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-label-suffix">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
            {{ item.label }}
          </li>
        </ul>
      </template>
      <template #suffixIcon>
        <chevron-down-icon />
      </template>
    </t-select-input>
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const onOptionClick = (item) => {
      state.selectValue = item;
      // 选中后立即关闭浮层
      state.popupVisible = false;
      state.popupVisible2 = false;
    };

    const onClear = () => {
      state.selectValue = undefined;
    };

    const onPopupVisibleChange = (val, context) => {
      console.log(context);
      state.popupVisible = val;
    };

    const onPopupVisibleChange2 = (val, context) => {
      state.popupVisible2 = val;
    };
    return {
      ...toRefs(state),
      onOptionClick,
      onClear,
      onPopupVisibleChange,
      onPopupVisibleChange2,
    };
  },
});

export const labelSuffix = labelSuffixTemplate.bind({});
labelSuffix.args = {
  options:OPTIONS,
  selectValue: { label: 'tdesign-vue', value: 1 },
  popupVisible: false,
  popupVisible2: false,
};

const singleTemplate = (args) => ({
  components: { TSelectInput, ChevronDownIcon, TCheckboxGroup },
  template: `<div>
    <!-- :popup-props="{ trigger: 'hover' }" -->
    <t-select-input
      :value="selectValue"
      :popup-visible="popupVisible"
      style="width: 300px"
      placeholder="Please Select"
      clearable
      allow-input
      @popup-visible-change="onPopupVisibleChange"
      @clear="onClear"
      @input-change="onInputChange"
    >
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-single">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
            {{ item.label }}
          </li>
        </ul>
      </template>
      <template #suffixIcon>
        <chevron-down-icon />
      </template>
    </t-select-input>
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const onOptionClick = (item) => {
      state.selectValue = item;
      // 选中后立即关闭浮层
      state.popupVisible = false;
    };
    const onClear = () => {
      state.selectValue = undefined;
    };
    const onPopupVisibleChange = (val, context) => {
      console.log(context);
      state.popupVisible = val;
    };
    const onInputChange = (val, context) => {
      // 过滤功能
      console.log(val, context);
    };
    return {
      ...toRefs(state),
      onOptionClick,
      onClear,
      onPopupVisibleChange,
      onInputChange,
    };
  },
});

export const single = singleTemplate.bind({});
single.args = {
  options: [
    { label: 'tdesign-vue', value: 1 },
    { label: 'tdesign-react', value: 2 },
    { label: 'tdesign-miniprogram', value: 3 },
    { label: 'tdesign-angular', value: 4 },
    { label: 'tdesign-mobile-vue', value: 5 },
    { label: 'tdesign-mobile-react', value: 6 },
  ],
  selectValue: { label: 'tdesign-vue', value: 1 },
  popupVisible: false,
};

const statusTemplate = (args) => ({
  components: { TSelectInput, ChevronDownIcon, TCheckboxGroup },
  template: `<div class="tdesign-demo-select-input-status">
    <div>
      <span>禁用状态：</span>
      <t-select-input :value="selectValue" disabled tips="这是禁用状态文本提示" placeholder="Please Select">
        <template #panel>
          <div class="tdesign-demo__select-empty-status">暂无数据</div>
        </template>
      </t-select-input>
    </div>
    <br />

    <div>
      <span>只读状态：</span>
      <t-select-input :value="selectValue" readonly tips="这是普通状态的文本提示" placeholder="Please Select">
        <template #panel>
          <div class="tdesign-demo__select-empty-status">暂无数据</div>
        </template>
      </t-select-input>
    </div>
    <br /><br />

    <div>
      <span>成功状态：</span>
      <t-select-input :value="selectValue" status="success" tips="校验通过文本提示" placeholder="Please Select">
        <template #panel>
          <div class="tdesign-demo__select-empty-status">暂无数据</div>
        </template>
      </t-select-input>
    </div>
    <br />

    <div>
      <span>警告状态：</span>
      <t-select-input :value="selectValue" status="warning" tips="校验不通过文本提示" placeholder="Please Select">
        <template #panel>
          <div class="tdesign-demo__select-empty-status">暂无数据</div>
        </template>
      </t-select-input>
    </div>
    <br />

    <div>
      <span>错误状态：</span>
      <t-select-input :value="selectValue" status="error" tips="校验存在严重问题文本提示" placeholder="Please Select">
        <template #panel>
          <div class="tdesign-demo__select-empty-status">暂无数据</div>
        </template>
      </t-select-input>
    </div>
    <br />
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

export const status = statusTemplate.bind({});
status.args = {
  selectValue: 'TDesign',
};

const widthTemplate = (args) => ({
  components: { TSelectInput, ChevronDownIcon, TCheckboxGroup },
  template: `<div class="tdesign-demo__select-input-width">
    <div>
      <span>下拉框默认宽度：</span>
      <t-select-input :value="selectValue" placeholder="Please Select" class="t-demo-normal">
        <template #panel>
          <div class="tdesign-demo__select-empty-width">下拉框宽度和触发元素宽度保持一致（默认）</div>
        </template>
      </t-select-input>
    </div>
    <br />

    <div>
      <span>下拉框最大宽度：</span>
      <t-select-input :value="selectValue" placeholder="Please Select" class="t-demo-normal">
        <template #panel>
          <div class="tdesign-demo__select-empty-width">
            下拉框宽度和触发元素宽度保持一致，但是当下拉框内容宽度超出时，自动撑开下拉框宽度，最大不超过 1000px（默认）
          </div>
        </template>
      </t-select-input>
    </div>
    <br />

    <div>
      <span>与内容宽度一致：</span>
      <t-select-input
        :value="selectValue"
        :popup-props="{
          overlayStyle: { width: 'auto' },
        }"
        placeholder="Please Select"
        class="t-demo-normal"
      >
        <template #panel>
          <div class="tdesign-demo__select-empty-width">宽度随内容宽度自适应</div>
        </template>
      </t-select-input>
    </div>
    <br />

    <div>
      <span>下拉框固定宽度：</span>
      <t-select-input
        :value="selectValue"
        :popup-props="{
          overlayStyle: { width: '360px' },
        }"
        placeholder="Please Select"
        class="t-demo-normal"
      >
        <template #panel>
          <div class="tdesign-demo__select-empty-width">固定宽度 360px</div>
        </template>
      </t-select-input>
    </div>
    <br />
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

export const width = widthTemplate.bind({});
width.args = {
  selectValue: 'TDesign',
};
