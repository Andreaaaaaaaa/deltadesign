import { ref, reactive, toRefs } from 'vue';
import { Textarea as TTextarea } from '../src/components/textarea/index';
import '../src/assets/textarea-hook.scss';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: '输入/Textarea 多行文本框',
  component: TTextarea,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    autofocus: {
      control: { type: 'boolean' },
      description: '自动聚焦',
      defaultValue: false,
      table: {
        category: 'Textarea Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: false },
      },
    },
    autosize: {
      control: { type: 'boolean' },
      description:
        '高度自动撑开。 autosize = true 表示组件高度自动撑开，同时，依旧允许手动拖高度。如果设置了 autosize.maxRows 或者 autosize.minRows 则不允许手动调整高度。',
      defaultValue: false,
      table: {
        category: 'Textarea Props',
        type: {
          summary: 'TS 类型：boolean | { minRows?: number; maxRows?: number }',
          // detail: '',
        },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用文本框',
      defaultValue: false,
      table: {
        category: 'Textarea Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: false },
      },
    },
    maxcharacter: {
      description: '用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。',
      table: {
        category: 'Textarea Props',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    maxlength: {
      description: '用户最多可以输入的字符个数',
      table: {
        category: 'Textarea Props',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    name: {
      description: '名称，HTML 元素原生属性',
      table: {
        category: 'Textarea Props',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    placeholder: {
      description: '占位符',
      table: {
        category: 'Textarea Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 'undefined' },
      },
    },
    readonly: {
      description: '文本框是否只读',
      table: {
        category: 'Textarea Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: false },
      },
    },
    status: {
      description: '文本框状态。可选项：success/warning/error',
      table: {
        category: 'Textarea Props',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    tips: {
      description: '输入框下方提示文本，会根据不同的 status 呈现不同的样式。',
      table: {
        category: 'Textarea Props',
        type: {
          summary: 'TS 类型：string | TNode。',
          // detail: '',
        },
      },
    },
    value: {
      description: '输入框的值。支持语法糖 v-model 或 v-model:value。',
      table: {
        category: 'Textarea Props',
        type: {
          summary: 'TS 类型：TextareaValue。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    defaultValue: {
      description: '文本框的值。非受控属性。',
      table: {
        category: 'Textarea Props',
        type: {
          summary: 'TS 类型：TextareaValue。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onBlur: {
      description: '失去焦点时触发。',
      table: {
        category: 'Textarea Props',
        type: {
          summary: 'TS 类型：(value: TextareaValue, context: { e: FocusEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onChange: {
      description: '输入内容发生变化时触发。',
      table: {
        category: 'Textarea Props',
        type: {
          summary: 'TS 类型：(value: TextareaValue, context?: { e?: InputEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onFocus: {
      description: '获得焦点时触发。',
      table: {
        category: 'Textarea Props',
        type: {
          summary: 'TS 类型：(value: TextareaValue, context: { e: FocusEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onKeydown: {
      description: '键盘按下时触发。',
      table: {
        category: 'Textarea Props',
        type: {
          summary: 'TS 类型：(value: TextareaValue, context: { e: KeyboardEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onKeypress: {
      description: '按下字符键时触发（keydown -> keypress -> keyup）。',
      table: {
        category: 'Textarea Props',
        type: {
          summary: 'TS 类型：(value: TextareaValue, context: { e: KeyboardEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onKeyup: {
      description: '释放键盘时触发',
      table: {
        category: 'Textarea Props',
        type: {
          summary: 'TS 类型：(value: TextareaValue, context: { e: KeyboardEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    blur: {
      description: '失去焦点时触发',
      table: {
        category: 'Textarea Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    change: {
      description: '输入内容发生变化时触发',
      table: {
        category: 'Textarea Events',
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
        category: 'Textarea Events',
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
        category: 'Textarea Events',
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
        category: 'Textarea Events',
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
        category: 'Textarea Events',
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
  components: { TTextarea },

  template: `
    <t-textarea
      :placeholder="placeholder"
      :autofocus="autofocus"
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
  placeholder: '请输入内容',
  autofocus: false,
  autosize: false,
  disabled: false,
  readonly: false,
};
aControl.storyName = '控制';

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const BasicTextareaTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  // Components used in your story `template` are defined in the `components` object
  components: { TTextarea },
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
      <t-textarea v-model="value" placeholder="请输入描述文案" name="description" @change="onChange" />
      <t-textarea
        v-model="value2"
        placeholder="请输入文案，高度可自适应；autosize=true"
        name="description"
        :autosize="true"
      />

      <t-textarea
        v-model="value3"
        placeholder="请输入文案，高度可自适应，最小3行，最大5行；autosize={minRows: 3, maxRows: 5}"
        name="description"
        :autosize="{ minRows: 3, maxRows: 5 }"
      />
    </div>
  `,
  setup() {
    const value = ref('');
    const value2 = ref('');
    const value3 = ref('');

    const onChange = (val, e) => {
      console.log('onChange：', val, e);
    };
    return { args, value, value2, value3, onChange };
  },
});

export const BasicTextarea = BasicTextareaTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
BasicTextarea.storyName = '基础多行文本框';
const LimitWordTextareaTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  // Components used in your story `template` are defined in the `components` object
  components: { TTextarea },
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
      <t-textarea v-model="value1" placeholder="请输入描述文案，文本长度最多100，maxlength=100" :maxlength="100" />
      <t-textarea
        v-model="value2"
        placeholder="请输入描述文案，最多100字符（一个汉字占两个字符长度），maxcharacter=100"
        :maxcharacter="100"
      />
    </div>
  `,
  setup() {
    const value1 = ref('');
    const value2 = ref('');

    return { args, value1, value2 };
  },
});
export const LimitWordTextarea = LimitWordTextareaTemplate.bind({});
LimitWordTextarea.storyName = '限制最大字符数';
const DifferentStateTextareaTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  // Components used in your story `template` are defined in the `components` object
  components: { TTextarea },
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
      <t-textarea disabled default-value="禁用状态" />
      <t-textarea default-value="普通状态" tips="这是普通文本提示" />
      <t-textarea status="error" default-value="错误状态" tips="校验存在严重问题文本提示" />
    </div>
  `,
  setup() {
    const value1 = ref('');
    const value2 = ref('');

    return { args, value1, value2 };
  },
});

export const DifferentStateTextarea = DifferentStateTextareaTemplate.bind({});
DifferentStateTextarea.storyName = '不同状态的多行文本框';
