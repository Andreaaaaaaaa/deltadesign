import { reactive, toRefs, ref, onMounted, computed, createApp } from 'vue';
import { Button as TButton } from 'tdesign-vue-next/esm/button';
import { Icon as TIcon } from 'tdesign-icons-vue-next';
import { TabPanel as TTabPanel, Tabs as TTabs } from '../src/components/tabs/index';
import { RadioGroup as TRadioGroup, Radio as TRadio, RadioButton as TRadioButton } from '../src/components/radio';
import '../src/assets/tabs-hook.scss';
import './tabs.scss';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#defaulexport
export default {
  title: '导航/Tabs 选项卡',
  component: { TTabPanel, TTabs },
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

// 基础选项卡
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TTabPanel, TTabs, TButton },
  // The story's `args` need to be mapped into the template through the `setup()` method

  // And then the `args` are bound to your component with `v-bind="args"`
  template: ` <div class="tdesign-demo-block-column-large">
  <t-tabs v-model="value">
    <t-tab-panel :value="1" label="选项卡1" :destroy-on-hide="false">
      <p style="padding: 25px">选项卡1的内容，使用 t-tab-panel 渲染</p>
    </t-tab-panel>
    <t-tab-panel :value="2" label="选项卡2" :destroy-on-hide="false">
      <template #panel>
        <p style="padding: 25px">选项卡2的内容，使用 t-tab-panel 渲染</p>
      </template>
    </t-tab-panel>
    <t-tab-panel :value="3" label="选项卡3" :panel="panelRender" />
  </t-tabs>
</div>`,

  setup() {
    const state = reactive({
      ...args,
    });

    const value = ref(1);
    const tab = ref(1);
    const panelRender = (h) => {
      return h('p', { style: 'padding: 25px; color: green' }, '选项卡3的内容，使用 t-tab-panel 渲染');
    };

    return {
      args,
      ...toRefs(state),
      panelRender,
      value,
      tab,
    };
  },
});

export const Demo = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Demo.args = {
  placement: 'top',
  size: 'medium',
  theme: 'normal',
};
Demo.storyName = '基础选项卡';

// 带图标的选项卡
const IconTab = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TTabPanel, TTabs, TButton, TRadioGroup, TRadioButton, TIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div class="t-demo-tabs">
  <div class="t-demo-tabs__desc">
    <t-radio-group v-model="theme" variant="default-filled">
      <t-radio-button value="normal"> 常规型 </t-radio-button>
      <t-radio-button value="card"> 卡片型 </t-radio-button>
    </t-radio-group>
  </div>
  <t-tabs :value="value" :theme="theme" @change="handlerChange">
    <t-tab-panel value="first">
      <template #label> <t-icon name="home" class="tabs-icon-margin" /> 首页 </template>
      <p style="padding: 25px">
        {{theme}}选项卡1内容
      </p>
    </t-tab-panel>
    <t-tab-panel value="second">
      <template #label> <t-icon name="calendar" class="tabs-icon-margin" /> 日程 </template>
      <p style="padding: 25px">
      {{theme}}选项卡2内容
      </p>
    </t-tab-panel>
    <t-tab-panel value="third">
      <template #label> <t-icon name="layers" class="tabs-icon-margin" /> 事项 </template>
      <p style="padding: 25px">
      {{theme}}选项卡3内容
      </p>
    </t-tab-panel>
  </t-tabs>
</div>`,
  setup() {
    const value = ref('first');
    const theme = ref('normal');

    const handlerChange = (newValue) => {
      value.value = newValue;
    };

    return {
      args,
      value,
      theme,
      handlerChange,
    };
  },
});

export const icon = IconTab.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
icon.args = {
  placement: 'top',
  size: 'medium',
  theme: 'normal',
};

icon.storyName = '带图标的选项卡';

// 不同位置的选项卡
const positionTab = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TTabPanel, TTabs, TButton, TRadioGroup, TRadioButton, TIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method

  // And then the `args` are bound to your component with `v-bind="args"`
  template: ` <div class="t-demo-tabs">
  <div class="t-demo-tabs__desc">
    <t-radio-group v-model="placement" variant="default-filled">
      <t-radio-button value="top"> top </t-radio-button>
      <t-radio-button value="right"> right </t-radio-button>
      <t-radio-button value="bottom"> bottom </t-radio-button>
      <t-radio-button value="left"> left </t-radio-button>
    </t-radio-group>
  </div>
  <t-tabs :value="value" :placement="placement" @change="handlerChange">
    <t-tab-panel value="first" label="选项卡1">
      <p style="padding: 25px">选项卡1</p>
    </t-tab-panel>
    <t-tab-panel value="second" label="选项卡2">
      <p style="padding: 25px">选项卡2</p>
    </t-tab-panel>
    <t-tab-panel value="third" label="选项卡3">
      <p style="padding: 25px">选项卡3</p>
    </t-tab-panel>
  </t-tabs>
</div>`,
  setup() {
    const value = ref('first');
    const placement = ref('top');

    const handlerChange = (newValue) => {
      value.value = newValue;
    };

    return {
      args,
      value,
      placement,
      handlerChange,
    };
  },
});

export const position = positionTab.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
position.args = {
  placement: 'top',
  size: 'medium',
  theme: 'normal',
};

position.storyName = '不同位置的选项卡';

// 不同尺寸的选项卡
const sizeTab = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TTabPanel, TTabs, TButton, TRadioGroup, TRadioButton, TIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method

  // And then the `args` are bound to your component with `v-bind="args"`
  template: ` <div class="tdesign-demo-block-column-large">
  <div class="tdesign-demo-block-column">

  <div class="aw-mb-4">常规尺寸</div>
    <t-tabs :value="value1" size="medium" @change="(newValue) => (value1 = newValue)">
      <t-tab-panel value="first" label="选项卡1">
        <p style="padding: 25px">选项卡1</p>
      </t-tab-panel>
      <t-tab-panel value="second" label="选项卡2">
        <p style="padding: 25px">选项卡2</p>
      </t-tab-panel>
      <t-tab-panel value="third" label="选项卡3">
        <p style="padding: 25px">选项卡3</p>
      </t-tab-panel>
    </t-tabs>


    <div class="aw-mt-4">小尺寸</div>
    <t-tabs :value="value2" size="small" @change="(newValue) => (value2 = newValue)">
      <t-tab-panel value="first" label="选项卡1">
        <p style="padding: 6px; font-size: 12px;">选项卡1</p>
      </t-tab-panel>
      <t-tab-panel value="second" label="选项卡2">
        <p style="padding: 6px; font-size: 12px;">选项卡2</p>
      </t-tab-panel>
      <t-tab-panel value="third" label="选项卡3">
        <p style="padding: 6px; font-size: 12px;">选项卡3</p>
      </t-tab-panel>
    </t-tabs>
   
  </div>
</div>`,
  setup() {
    const value1 = ref('first');
    const value2 = ref('first');

    return {
      args,
      value1,
      value2,
    };
  },
});

export const size = sizeTab.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
size.args = {
  placement: 'top',
  size: 'medium',
  theme: 'normal',
};

size.storyName = '不同尺寸的选项卡';
