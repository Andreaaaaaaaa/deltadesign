import { ref, nextTick, reactive, toRefs } from 'vue';
import { DiscountIcon, AddIcon } from 'tdesign-icons-vue-next';
import { Tag as TTag } from '../src/components/tag/index';
import { Input as TInput } from '../src/components/input/index';
import '../src/assets/tag-hook.scss';
// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: '数据展示/Tag 标签',
  component: TTag,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    closable: {
      control: { type: 'boolean' },
      description: '标签是否可关闭',
      defaultValue: false,
      table: {
        category: 'Tag Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: false },
      },
    },
    content: {
      description: '组件子元素。',
      table: {
        category: 'Tag Props',
        type: {
          summary: 'TS 类型：string | number | TNode。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    default: {
      description: '组件子元素（默认插槽），同 content。',
      table: {
        category: 'Tag Props',
        type: {
          summary: 'TS 类型：string | number | TNode。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '标签禁用态，失效标签不能触发事件。默认风格（theme=default）才有禁用态',
      defaultValue: false,
      table: {
        category: 'Tag Props',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    icon: {
      description: '标签中的图标，可自定义图标呈现。',
      table: {
        category: 'Tag Props',
        type: {
          summary: 'TS 类型：TNode。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    maxWidth: {
      description: "标签最大宽度，宽度超出后会出现省略号。示例：'50px' / 80。",
      table: {
        category: 'Tag Props',
        type: {
          summary: "TS 类型：CSSProperties['maxWidth'] | number",
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    shape: {
      control: { type: 'select' },
      options: ['square', 'round', 'mark'],
      description: '标签类型，有三种：方形、圆角方形、标记型。可选项：square/round/mark',
      defaultValue: 'square',
      table: {
        category: 'Tag Props',
        type: {
          summary: "TS 类型：CSSProperties['maxWidth'] | number",
          // detail: '',
        },
        defaultValue: { summary: 'square' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '标签尺寸。可选项：small/medium/large。TS 类型：SizeEnum',
      defaultValue: 'medium',
      table: {
        category: 'Tag Props',
        type: {
          summary: 'TS 类型：SizeEnum。',
          // detail: '',
        },
        defaultValue: { summary: 'medium' },
      },
    },
    theme: {
      control: { type: 'select' },
      options: ['default', 'primary', 'warning', 'danger', 'success'],
      description: '组件风格，用于描述组件不同的应用场景。可选项：default/primary/warning/danger/success',
      defaultValue: 'default',
      table: {
        category: 'Tag Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 'default' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['dark', 'light', 'outline', 'light-outline'],
      description: '标签风格变体。可选项：dark/light/outline/light-outline',
      defaultValue: 'dark',
      table: {
        category: 'Tag Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 'dark' },
      },
    },
    onClick: {
      description: '点击时触发',
      table: {
        category: 'Tag Props',
        type: {
          summary: 'TS 类型：(context: { e: MouseEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    onClose: {
      description: '如果关闭按钮存在，点击关闭按钮时触发',
      table: {
        category: 'Tag Props',
        type: {
          summary: 'TS 类型：(context: { e: MouseEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    click: {
      description: '点击时触发',
      table: {
        category: 'Tag Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    close: {
      description: '如果关闭按钮存在，点击关闭按钮时触发',
      table: {
        category: 'Tag Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    checked: {
      description: '标签选中的状态，默认风格（theme=default）才有选中态。支持语法糖 v-model 或 v-model:checked',
      table: {
        category: 'CheckTag Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 'false' },
      },
    },
    defaultChecked: {
      description: '标签选中的状态，默认风格（theme=default）才有选中态。支持语法糖 v-model 或 v-model:checked',
      table: {
        category: 'CheckTag Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 'false' },
      },
    },
    CheckTagContent: {
      name: 'content',
      description: '组件子元素。',
      table: {
        category: 'CheckTag Props',
        type: {
          summary: 'TS 类型：string | number | TNode。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    CheckTagDefault: {
      name: 'default',
      description: '组件子元素，同 content。',
      table: {
        category: 'CheckTag Props',
        type: {
          summary: 'TS 类型：string | number | TNode。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    CheckTagDisabled: {
      name: 'disabled',
      description: '标签禁用态，失效标签不能触发事件。默认风格（theme=default）才有禁用态',
      table: {
        category: 'CheckTag Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 'false' },
      },
    },
    CheckTagSize: {
      name: 'size',
      description: '标签尺寸。可选项：small/medium/large。',
      table: {
        category: 'CheckTag Props',
        type: {
          summary: 'TS 类型：SizeEnum',
          // detail: '',
        },
        defaultValue: { summary: 'medium' },
      },
    },
    onChange: {
      description: '组件子元素',
      table: {
        category: 'CheckTag Props',
        type: {
          summary: 'TS 类型：(checked: boolean) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    CheckTagOnClick: {
      name: 'onClick',
      description: '点击标签时触发',
      table: {
        category: 'CheckTag Props',
        type: {
          summary: 'TS 类型：(context: { e: MouseEvent }) => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    change: {
      description: '组件子元素',
      table: {
        category: 'CheckTag Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    CheckTagClick: {
      name: 'click',
      description: '点击标签时触发',
      table: {
        category: 'CheckTag Events',
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
  components: { TTag },

  template: `
  <t-tag
    :shape="shape"
    :size="size"
    :variant="variant"
    :theme="theme"
    :closable="closable"
    :disabled="disabled"
  >
  标签
  </t-tag>`,
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
  shape: 'square',
  size: 'medium',
  theme: 'default',
  variant: 'dark',
  closable: false,
  disabled: false,
};
aControl.storyName = '控制';

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const BasicTagTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  // Components used in your story `template` are defined in the `components` object
  components: { TTag, DiscountIcon, AddIcon, TInput },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div
      style="
        width: 500px;
        display: flex;
        margin-bottom: 15px
      "
    >
      <t-tag @click="onClick" style="margin-right: 30px">标签一</t-tag>
      <t-tag closable style="margin-right: 30px">标签一</t-tag>
      <t-tag style="margin-right: 30px">
        <template #icon>
          <DiscountIcon />
        </template>
        Icon插槽
      </t-tag>
      <t-tag closable style="margin-right: 30px">
        <template #icon>
          <DiscountIcon />
        </template>
        Icon插槽
      </t-tag>
      <t-tag style="margin-right: 30px">
        <AddIcon />
        添加标签
      </t-tag>
      <div class="tag-block editable" style="margin-right: 30px">
        <t-tag variant="dashed" v-if="!inputVisible" @click="handleClickAdd">
          <add-icon />
          添加标签
        </t-tag>
        <t-input v-else ref="input" size="small" style="width: 78px" @blur="handleInputEnter" @enter="handleInputEnter" />
      </div>
      <t-tag max-width="120" title="默认超八个字超长文本标签超长省略文本标签">默认超八个字超长文本标签超长省略文本标签</t-tag>
    </div>
    <div
      style="
        width: 500px;
        display: flex;
        margin-bottom: 15px
      "
    >
      <t-tag disabled @click="onClick" style="margin-right: 30px">标签一</t-tag>
      <t-tag disabled closable style="margin-right: 30px">标签一</t-tag>
      <t-tag disabled style="margin-right: 30px">
        <template #icon>
          <DiscountIcon />
        </template>
        Icon插槽
      </t-tag>
      <t-tag disabled closable style="margin-right: 30px">
        <template #icon>
          <DiscountIcon />
        </template>
        Icon插槽
      </t-tag>
      <t-tag disabled style="margin-right: 30px">
        <AddIcon />
        添加标签
      </t-tag>
      <t-tag disabled variant="dashed" style="margin-right: 30px">
        <AddIcon />
        添加标签
      </t-tag>
      <t-tag disabled max-width="120" title="默认超八个字超长文本标签超长省略文本标签">默认超八个字超长文本标签超长省略文本标签</t-tag>
    </div>
  `,
  setup() {
    const onClick = ({ e }) => {
      e.stopPropagation();
    };
    const inputVisible = ref(false);
    const input = ref('');
    const handleClickAdd = () => {
      inputVisible.value = true;
      console.log(inputVisible.value);
      nextTick(() => {
        input.value.focus();
      });
    };

    return { args, onClick, inputVisible, handleClickAdd };
  },
});

export const BasicTag = BasicTagTemplate.bind({});
BasicTag.storyName = '基础标签';
const DifferentStateTagTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  // Components used in your story `template` are defined in the `components` object
  components: { TTag, DiscountIcon, AddIcon, TInput },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div
      style="
        width: 500px;
        display: flex;
        margin-bottom: 15px
      "
    >
      <t-tag theme="primary" variant="light" style="margin-right: 30px">标签一</t-tag>
      <t-tag theme="warning" variant="light" style="margin-right: 30px">标签二</t-tag>
      <t-tag theme="danger" variant="light" style="margin-right: 30px">标签三</t-tag>
      <t-tag theme="success" variant="light" style="margin-right: 30px">标签三</t-tag>
    </div>
    <div
      style="
        width: 500px;
        display: flex;
        margin-bottom: 15px
      "
    >
      <t-tag theme="primary" variant="light" style="margin-right: 30px">
        <AddIcon />
        标签一
      </t-tag>
      <t-tag theme="warning" variant="light" style="margin-right: 30px">
        <AddIcon />
        标签二
      </t-tag>
      <t-tag theme="danger" variant="light" style="margin-right: 30px">
        <AddIcon />
        标签三
      </t-tag>
      <t-tag theme="success" variant="light" style="margin-right: 30px">
        <AddIcon />
        标签三
      </t-tag>
    </div>
    <div
      style="
        width: 500px;
        display: flex;
        margin-bottom: 15px
      "
    >
      <t-tag theme="primary" variant="light"  style="margin-right: 30px">
        <template #icon>
          <DiscountIcon />
        </template>
        Icon插槽
      </t-tag>
      <t-tag theme="warning" variant="light"  style="margin-right: 30px">
        <template #icon>
          <DiscountIcon />
        </template>
        Icon插槽
      </t-tag>
      <t-tag theme="danger" variant="light"  style="margin-right: 30px">
        <template #icon>
          <DiscountIcon />
        </template>
        Icon插槽
      </t-tag>
      <t-tag theme="success" variant="light"  style="margin-right: 30px">
        <template #icon>
          <DiscountIcon />
        </template>
        Icon插槽
      </t-tag>
    </div>
  `,
  setup() {
    const onClick = ({ e }) => {
      e.stopPropagation();
    };
    const inputVisible = ref(false);
    const input = ref('');

    const handleClickAdd = () => {
      inputVisible.value = true;
      nextTick(() => {
        input.value.focus();
      });
    };

    return { args, inputVisible, input, onClick, handleClickAdd };
  },
});

export const DifferentStateTag = DifferentStateTagTemplate.bind({});
DifferentStateTag.storyName = '不同状态的标签';
