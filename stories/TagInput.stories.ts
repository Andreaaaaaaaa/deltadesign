import { reactive, toRefs, ref, onMounted, computed, createApp } from 'vue';
import { Button as TButton } from 'tdesign-vue-next/esm/button';
import { Icon as TIcon } from 'tdesign-icons-vue-next';
import { TagInput as TTagInput } from '../src/components/tag-input/index';
import { RadioGroup as TRadioGroup, Radio as TRadio, RadioButton as TRadioButton } from '../src/components/radio';
import { MessagePlugin } from '../src/components/message/index.ts';

import './tabs.scss';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#defaulexport
export default {
  title: '输入/TagInput 标签输入框',
  component: { TTagInput },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    addable: {
      description: '选项卡是否可增加',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: '是否禁用选项卡',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
      },
    },
    dragSort: {
      description: '是否开启拖拽调整顺序',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: null,
      },
    },
    list: {
      description: '选项卡列表。TS 类型：Array<TdTabPanelProps>',
      table: {
        category: 'Props',
        type: { summary: 'Array' },
      },
    },
    placement: {
      description: '选项卡位置。可选项：left/top/bottom/right',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'top' },
      },
    },
    size: {
      description: '组件尺寸。可选项：medium/large。',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'medium' },
      },
      control: {
        type: null,
      },
    },
    theme: {
      description: '选项卡风格，包含 默认风格 和 卡片风格两种。可选项：normal/card',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'normal' },
      },
    },
    value: {
      // name: 'data',
      // type: { name: 'Array', required: false },
      // defaultValue: [],
      description:
        '激活的选项卡值。支持语法糖 v-model 或 v-model:value。TS 类型：TabValue type TabValue = string | number.',
      table: {
        category: 'Props',
        type: { summary: 'String / Number' },
        defaultValue: { summary: '[]' },
      },
      control: {
        type: null,
        // null text radio select/option
      },
    },
    defaultValue: {
      description: '激活的选项卡值。非受控属性。TS 类型：TabValue type TabValue = string | number。',
      table: {
        category: 'Props',
        type: { summary: 'String / Number' },
        defaultValue: { summary: 'false' },
      },
    },
    onAdd: {
      description: 'TS 类型：(context: { e: MouseEvent }) => void 添加选项卡时触发',
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        // defaultValue: { summary: '-' },
      },
    },
    onChange: {
      description: 'TS 类型：(value: TabValue) => void 激活的选项卡发生变化时触发.',
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        // defaultValue: { summary: '' },
      },
    },
    onDragSort: {
      description:
        'TS 类型：(context: TabsDragSortContext) => void 拖拽排序时触发。详细类型定义。 interface TabsDragSortContext { currentIndex: number; current: TabValue; targetIndex: number; target: TabValue }',
      table: {
        category: 'Props',
        type: { summary: 'Function' },
      },
    },
    onRemove: {
      description: 'TS 类型：(options: { value: TabValue; index: number; e: MouseEvent }) => void 删除选项卡时触发',
      table: {
        category: 'Props',
        type: { summary: 'Function' },
        // defaultValue: { summary: '[]' },
      },
    },
    add: {
      description: '展开的节点值',
      table: {
        category: '(context: { e: MouseEvent })',
        type: { summary: 'Array' },
      },
    },
    change: {
      description: '	添加选项卡时触发',
      table: {
        category: '(value: TabValue)',
        type: { summary: 'Array' },
      },
    },
    dragSort1: {
      description: '拖拽排序时触发',
      table: {
        category: '(context: TabsDragSortContext)',
        type: { summary: 'Array' },
      },
    },
    remove: {
      description: '删除选项卡时触发',
      table: {
        category: '(options: { value: TabValue; index: number; e: MouseEvent })',
        type: { summary: 'Array' },
      },
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TTagInput, TButton },
  // The story's `args` need to be mapped into the template through the `setup()` method

  // And then the `args` are bound to your component with `v-bind="args"`
  template: ` <div class="tdesign-demo-block-column" style="width: 80%">
  <t-tag-input v-model="tags1" clearable @paste="onPaste" @enter="onTagInputEnter"/>

  <t-tag-input :value="tags2" label="Controlled: "  class="aw-mt-4" clearable @change="onChange" />

  <t-tag-input :default-value="tags3" label="UnControlled: "  class="aw-mt-4" clearable />
</div>`,

  setup() {
    const state = reactive({
      ...args,
    });

    const tags1 = ref(['Vue', 'React']);
    const tags2 = ref(['Vue', 'React']);
    const tags3 = ref(['Vue', 'React']);

    const onTagInputEnter = (val, context) => {
      console.log(val, context);
    };
    const onChange = (val, context) => {
      console.log(val, context);
      tags2.value = val;
    };
    const onPaste = (context) => {
      console.log(context);
    };

    return {
      args,
      ...toRefs(state),

      tags1,
      tags2,
      tags3,
      onTagInputEnter,
      onChange,
      onPaste,
    };
  },
});

export const Demo = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Demo.args = {};
Demo.storyName = '基础标签输入框';

const IconTab = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TTagInput, TButton, TRadioGroup, TRadioButton, TIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method

  // And then the `args` are bound to your component with `v-bind="args"`
  template: ` <div class="tdesign-demo-block-column" style="width: 80%">
  <!-- 标签数量超出时，滚动显示 -->
  <t-tag-input v-model="tags" label="Scroll: " clearable />

  <!-- 标签数量超出时，换行显示 -->
  <t-tag-input v-model="tags" label="BreakLine: " class="aw-mt-4" excess-tags-display-type="break-line" clearable />
</div>`,
  setup() {
    const tags = ref(['Vue', 'React']);

    return {
      tags
    };
  },
});

export const icon = IconTab.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
icon.args = {

};

icon.storyName = '标签数量超出的输入框';

const positionTab = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TTagInput, TButton, TRadioGroup, TRadioButton, TIcon,MessagePlugin },
  // The story's `args` need to be mapped into the template through the `setup()` method

  // And then the `args` are bound to your component with `v-bind="args"`
  template: ` <div style="width: 100%">
  <t-tag-input v-model="tags" placeholder="最多只能输入 3 个标签" :max="3" @enter="onEnter" />
</div>`,
  setup() {
    const tags = ref([]);
    const onEnter = (value, { inputValue }) => {
      if (value.length >= 3 && inputValue) {
        MessagePlugin.warning('最多只能输入 3 个标签!');
      }
    };

    return {
      tags,
      onEnter,

    };
  },
});

export const position = positionTab.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
position.args = {

};

position.storyName = '有数量限制的标签输入框';

const sizeTab = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TTagInput, TButton, TRadioGroup, TRadioButton, TIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div class="tdesign-demo-block-column" style="width: 80%">
  <t-tag-input v-model="tags1" size="small" clearable />

  <t-tag-input v-model="tags2"  class="aw-mt-4" clearable />

  <t-tag-input v-model="tags3"  class="aw-mt-4" size="large" clearable />
</div>`,
  setup() {
    const tags1 = ref(['Vue', 'React']);
    const tags2 = ref(['Vue', 'React']);
    const tags3 = ref(['Vue', 'React']);

    return {
      tags1,
      tags2,
      tags3,
    };
  },
});

export const size = sizeTab.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args


size.storyName = '不同尺寸的标签输入框';
