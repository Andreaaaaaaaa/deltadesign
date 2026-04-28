import { reactive, toRefs, ref, onMounted, computed, createApp } from 'vue';
import { InputNumber as TInputNumber } from '../src/components/input-number/index';
import { Form as TForm, FormItem as TFormItem } from '../src/components/form';

import './input-number.scss';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: '输入/InputNumber 数字输入框',
  component: { TInputNumber },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    autoWidth: {
      control: { type: 'boolean' },
      description: '宽度随内容自适应',
      defaultValue: false,
      table: {
        category: 'Input Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: false },
      },
    },
    clearable: {
      control: { type: 'boolean' },
      description: '是否可清空',
      defaultValue: false,
      table: {
        category: 'Input Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用输入框',
      defaultValue: false,
      table: {
        category: 'Input Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: false },
      },
    },

    readonly: {
      description: '只读状态',
      table: {
        category: 'Input Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: false },
      },
    },

    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '输入框尺寸。可选项：small/medium/large。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：SizeEnum。',
          // detail: '',
        },
        defaultValue: { summary: 'medium' },
      },
    },

    tips: {
      description: '输入框下方提示文本，会根据不同的 status 呈现不同的样式。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：string | TNode。',
          // detail: '',
        },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'number', 'url', 'tel', 'password', 'search', 'submit', 'hidden'],
      description: '输入框类型。可选项：text/number/url/tel/password/search/submit/hidden',
      table: {
        category: 'Input Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 'text' },
      },
    },
    value: {
      description: '输入框的值。支持语法糖 v-model 或 v-model:value。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：InputValue type InputValue = string | number。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    defaultValue: {
      description: '输入框的值。非受控属性。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：InputValue type InputValue = string | number。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onBlur: {
      description: '失去焦点时触发。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：(value: InputValue, context: { e: FocusEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onChange: {
      description: '输入框值发生变化时触发。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：(value: InputValue, context?: { e?: InputEvent | MouseEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onClear: {
      description: '清空按钮点击时触发。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：(context: { e: MouseEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onCompositionend: {
      description: '中文输入结束时触发。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：(value: InputValue, context: { e: CompositionEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onCompositionstart: {
      description: '中文输入开始时触发。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：(value: InputValue, context: { e: CompositionEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onEnter: {
      description: '回车键按下时触发。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：(value: InputValue, context: { e: KeyboardEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onFocus: {
      description: '获得焦点时触发。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：(value: InputValue, context: { e: FocusEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onKeydown: {
      description: '键盘按下时触发。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：(value: InputValue, context: { e: KeyboardEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onKeypress: {
      description: '按下字符键时触发（keydown -> keypress -> keyup）。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：(value: InputValue, context: { e: KeyboardEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onKeyup: {
      description: '释放键盘时触发',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：(value: InputValue, context: { e: KeyboardEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onMouseenter: {
      description: '离开输入框时触发',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：(context: { e: MouseEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onPaste: {
      description: '粘贴事件，pasteValue 表示粘贴板的内容',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：(context: { e: ClipboardEvent; pasteValue: string }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onWheel: {
      description: '输入框中滚动鼠标时触发',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：(context: { e: WheelEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    blur: {
      description: '失去焦点时触发',
      table: {
        category: 'Input Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    change: {
      description: '输入框值发生变化时触发',
      table: {
        category: 'Input Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    clear: {
      description: '清空按钮点击时触发',
      table: {
        category: 'Input Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    compositionend: {
      description: '中文输入结束时触发',
      table: {
        category: 'Input Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    compositionstart: {
      description: '中文输入开始时触发',
      table: {
        category: 'Input Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    enter: {
      description: '回车键按下时触发',
      table: {
        category: 'Input Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    focus: {
      description: '获得焦点时触发',
      table: {
        category: 'Input Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    keydown: {
      description: '键盘按下时触发',
      table: {
        category: 'Input Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    keypress: {
      description: '按下字符键时触发（keydown -> keypress -> keyup）',
      table: {
        category: 'Input Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    keyup: {
      description: '释放键盘时触发',
      table: {
        category: 'Input Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    mouseenter: {
      description: '进入输入框时触发',
      table: {
        category: 'Input Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    mouseleave: {
      description: '离开输入框时触发',
      table: {
        category: 'Input Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    paste: {
      description: '粘贴事件，pasteValue 表示粘贴板的内容',
      table: {
        category: 'Input Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    wheel: {
      description: '输入框中滚动鼠标时触发',
      table: {
        category: 'Input Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
  },
  excludeStories: /.Data$/,
};

// 控制
const aControlTemplate = (args) => ({
  components: { TInputNumber },

  template: ` <t-input-number :bind="args"/>

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
  readonly: false,
  autoWidth: false,
  disabled: false,
  align: 'left',
  theme: 'row',
};
aControl.storyName = '控制';

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const BasicInputTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  // Components used in your story `template` are defined in the `components` object
  components: { TInputNumber },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <div>
  <t-input-number
    v-model="value"
    theme="row"
    size="medium"
    :max="15"
    :min="-2"
    :disabled="false"
    :on-change="onChange"
    :on-focus="onFocus"
    :on-blur="onBlur"
    :on-enter="onKeydownEnter"
    :on-keydown="onKeydown"
    :on-keyup="onKeyup"
    :on-keypress="onKeypress"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
    @enter="handleKeydownEnter"
    @keydown="handleKeydown"
    @keyup="handleKeyup"
    @keypress="handleKeypress"
  ></t-input-number>
</div>
  `,
  setup() {
    const value = ref(3);

    const handleChange = (v, ctx) => {
      console.info('change', v, ctx);
    };
    const handleFocus = (v, ctx) => {
      console.info('focus', v, ctx);
    };
    const handleBlur = (v, ctx) => {
      console.info('blur', v, ctx);
    };
    const handleKeydownEnter = (v, ctx) => {
      console.info('keydown-enter', v, ctx);
    };
    const handleKeydown = (v, ctx) => {
      console.info('keydown', v, ctx);
    };
    const handleKeyup = (v, ctx) => {
      console.info('keyup', v, ctx);
    };
    const handleKeypress = (v, ctx) => {
      console.info('keypress', v, ctx);
    };
    return {
      value,
      args,
      handleChange,
      handleFocus,
      handleBlur,
      handleKeydownEnter,
      handleKeydown,
      handleKeyup,
      handleKeypress,
    };
  },
});

export const BasicInput = BasicInputTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
BasicInput.args = {};
BasicInput.storyName = '双侧调整的数字输入框';

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const RightInputTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  // Components used in your story `template` are defined in the `components` object
  components: { TInputNumber },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <div>
  <t-input-number v-model="value" theme="column" :max="15" :min="-2" />
</div>
  `,
  setup() {
    const value = ref(3);

    return {
      value,
      args,
    };
  },
});

export const RightInput = RightInputTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
RightInput.args = {};
RightInput.storyName = '右侧调整数值的数字输入框';

const DigitInputTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  // Components used in your story `template` are defined in the `components` object
  components: { TInputNumber },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <div>
  <t-input-number v-model="value" :max="15" :min="-5" :step="1.2" :decimal-places="2" @change="onChange" />
</div>
  `,
  setup() {
    const value = ref(3.2);
    const onChange = (ev) => {
      console.info(ev);
    };

    return {
      value,
      args,
      onChange,
    };
  },
});

export const DigitInput = DigitInputTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
DigitInput.args = {};
DigitInput.storyName = '小数输入框';

// 格式化展示输入框
const FormatInputTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  // Components used in your story `template` are defined in the `components` object
  components: { TInputNumber },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <div>
  <t-input-number v-model="value" :max="15" :min="-2" :format="(value) => value+'%'" @change="onChange" />
  </div>
  `,
  setup() {
    const value = ref(3);
    const onChange = (ev) => {
      console.info(ev);
    };

    return {
      value,
      args,
      onChange,
    };
  },
});

export const FormatInput = FormatInputTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
FormatInput.args = {};
FormatInput.storyName = '格式化展示输入框';

const SizeInputTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  // Components used in your story `template` are defined in the `components` object
  components: { TInputNumber },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <div>
  <t-input-number v-model="value1" size="small" :max="15" :min="-2" />

  <t-input-number v-model="value2" style="margin: 0 50px" :max="15" :min="-2" />

  <t-input-number v-model="value3" size="large" :max="15" :min="-2" />
</div>
  `,
  setup() {
    const value1 = ref(3);
    const value2 = ref(3);
    const value3 = ref(3);

    return {
      value1,
      value2,
      value3,
      args,
    };
  },
});

export const SizeInput = SizeInputTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
SizeInput.args = {};
SizeInput.storyName = '不同尺寸的输入框';

const StatusInputTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  // Components used in your story `template` are defined in the `components` object
  components: { TInputNumber, TForm, TFormItem },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <div class="aw-status-input-container">
    <t-form>
      <t-form-item label="禁用">
        <t-input-number v-model="value0" disabled></t-input-number>
      </t-form-item>
      <t-form-item label="只读">
        <t-input-number v-model="value1" readonly></t-input-number>
      </t-form-item>
      <t-form-item label="正常">
        <t-input-number v-model="value2"></t-input-number>
      </t-form-item>
      <t-form-item label="成功">
        <t-input-number v-model="value3" status="success"></t-input-number>
      </t-form-item>
      <t-form-item label="警告">
        <t-input-number v-model="value4" status="warning"></t-input-number>
      </t-form-item>
      <t-form-item label="错误">
        <t-input-number v-model="value5" status="error"></t-input-number>
      </t-form-item>
      <t-form-item label="正常提示">
        <t-input-number v-model="value6" tips="这是普通文本提示"></t-input-number>
      </t-form-item>
      <t-form-item label="成功提示">
        <t-input-number v-model="value7" status="success" tips="校验通过文本提示"></t-input-number>
      </t-form-item>
      <t-form-item label="警告提示">
        <t-input-number v-model="value8" status="warning" tips="校验不通过文本提示"></t-input-number>
      </t-form-item>
      <t-form-item label="错误提示">
        <t-input-number v-model="value9" status="error" tips="校验存在严重问题文本提示"></t-input-number>
      </t-form-item>
    </t-form>
  </div>
  `,
  setup() {
    const value0 = ref(3);
    const value1 = ref(3);
    const value2 = ref(3);
    const value3 = ref(3);
    const value4 = ref(3);
    const value5 = ref(3);
    const value6 = ref(3);
    const value7 = ref(3);
    const value8 = ref(3);
    const value9 = ref(3);

    return {
      value0,
      value1,
      value2,
      value3,
      value4,
      value5,
      value6,
      value7,
      value8,
      value9,
      args,
    };
  },
});

export const StatusInput = StatusInputTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
StatusInput.args = {};
StatusInput.storyName = '不同状态的输入框';
