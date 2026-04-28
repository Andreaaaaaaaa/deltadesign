import { ref, reactive, toRefs } from 'vue';
import { Input as TInput } from '../src/components/input/index';
import '../src/assets/input-hook.scss';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: '输入/Input 输入框',
  component: TInput,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    align: {
      type: 'string',
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: '文本内容位置，居左/居中/居右。可选项：left/center/right',
      defaultValue: 'left',
      table: {
        category: 'Input Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 'left' },
      },
    },
    autocomplete: {
      description: '是否开启自动填充功能，HTML5 原生属性',
      defaultValue: '',
      table: {
        category: 'Input Props',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    autofocus: {
      control: { type: 'boolean' },
      description: '自动聚焦',
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
    format: {
      description: '【开发中】指定输入框展示值的格式。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：(value: InputValue) => number | string',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    inputClass: {
      description: "t-input 同级类名，示例：'name1 name2 name3' 或 ['name1', 'name2'] 或 [{ 'name1': true }]。",
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：ClassName。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    label: {
      description: '左侧文本',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：string | TNode。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    maxcharacter: {
      description: '用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。maxcharacter 和 maxlength 二选一使用',
      table: {
        category: 'Input Props',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    maxlength: {
      description:
        '用户最多可以输入的文本长度，一个中文等于一个计数长度。值小于等于 0 的时候，则表示不限制输入长度。maxcharacter 和 maxlength 二选一使用。',
      table: {
        category: 'Input Props',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    name: {
      description: '名称',
      table: {
        category: 'Input Props',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: '占位符',
      table: {
        category: 'Input Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: '请输入' },
      },
    },
    prefixIcon: {
      description: '组件前置图标。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：TNode。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
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
    showClearIconOnEmpty: {
      description: '输入框内容为空时，悬浮状态是否显示清空按钮，默认不显示',
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
    status: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error'],
      description: '输入框状态。可选项：success/warning/error',
      table: {
        category: 'Input Props',
        type: {
          // summary: 'default',
          // detail: '',
        },
        defaultValue: { summary: 'default' },
      },
    },
    suffix: {
      description: '后置图标前的后置内容。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：string | TNode。',
          // detail: '',
        },
      },
    },
    suffixIcon: {
      description: '组件后置图标。',
      table: {
        category: 'Input Props',
        type: {
          summary: 'TS 类型：TNode。',
          // detail: '',
        },
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
};

// 控制
const aControlTemplate = (args) => ({
  components: { TInput },

  template: `
    <t-input
      :autofocus="autofocus"
      :autoWidth="autoWidth"
      :clearable="clearable"
      :disabled="disabled"
      :readonly="readonly"
      :showClearIconOnEmpty="showClearIconOnEmpty"
      :align="align"
      :size="size"
      :status="status"
      :type="type"
      :placeholder="placeholder"
    />
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
  autofocus: false,
  autoWidth: false,
  clearable: false,
  disabled: false,
  readonly: false,
  showClearIconOnEmpty: false,
  align: 'left',
  size: 'medium',
  status: 'default',
  type: 'text',
  placeholder: '请输入',
};
aControl.storyName = '控制';

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const BasicInputTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  // Components used in your story `template` are defined in the `components` object
  components: { TInput },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div
      style="
        max-width: 500px;
        display: flex;
        flex-direction: column;
        row-gap: 16px;
        column-gap: 16px"
    >
      <t-input />
      <t-input v-model="input" placeholder="请输入内容（有默认值）" @enter="onEnter" @change="onChange" />
      <t-input label="价格：" suffix="元" />
      <t-input disabled default-value="禁用状态" />
      <t-input default-value="普通状态" tips="这是普通文本提示对方复活复" />
      <t-input status="error" default-value="错误状态" tips="校验存在严重问题文本提示" />
      <t-input size="small" placeholder="小尺寸" />
    </div>
  `,
  setup() {
    const input = ref('有默认值');
    const onEnter = () => {
      console.log('trigger enter');
    };
    const onChange = (val) => {
      console.log(val);
    };

    const onPaste = (context) => {
      console.log(context);
    };
    return { input, args, onEnter, onChange, onPaste };
  },
});

export const BasicInput = BasicInputTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
BasicInput.args = {};
BasicInput.storyName = '基础输入框';

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
// const AddonInputTemplate = (args) => ({
//   // Components used in your story `template` are defined in the `components` object
//   components: { Input, Addon },
//   // And then the `args` are bound to your component with `v-bind="args"`
//   template: `
//     <div
//       style="
//         max-width: 500px;
//         display: flex;
//         flex-direction: column;
//         row-gap: 16px;
//         column-gap: 16px"
//     >
//       <Addon prepend="http://">
//       <t-input placeholder="请输入内容" />
//       </Addon>

//       <Addon append=".com">
//         <t-input placeholder="请输入内容" />
//       </Addon>

//       <Addon prepend="http://" append=".com">
//         <t-input placeholder="请输入内容" />
//       </Addon>
//     </div>
//   `,
//   setup() {
//     return { args };
//   },
// });

// export const AddonInput = AddonInputTemplate.bind({});
// // More on args: https://storybook.js.org/docs/vue/writing-stories/args
// AddonInput.args = {};
