import { reactive, toRefs, ref, onMounted, onUnmounted, computed } from 'vue';
import { Button as TButton } from 'tdesign-vue-next/esm/button';
import { Tooltip as TTooltip } from '../src/components/tooltip/index';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: '消息提醒/Tooltip 文字提示',
  component: { TTooltip },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    delay: {
      description: '【议案讨论中】延迟出现提示，用于异步加载提示信息需要延迟显示的业务场景下',
      control: { type: 'text' },
      defaultValue: '-',
      table: {
        category: 'Props',
        type: { summary: 'Number' },
        defaultValue: { summary: '-' },
      },
    },
    destroyOnClose: {
      description: '是否在关闭浮层时销毁浮层',
      control: { type: 'boolean' },
      defaultValue: true,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    duration: {
      description: '用于设置提示默认显示多长时间之后消失，初始第一次有效，单位：毫秒',
      control: { type: 'text' },
      defaultValue: '-',
      table: {
        category: 'Props',
        type: { summary: 'Number' },
        defaultValue: { summary: '-' },
      },
    },
    placement: {
      description: '浮层出现位置。',
      control: { type: 'text' },
      defaultValue: 'top',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'top' },
      },
    },
    showArrow: {
      description: '是否显示浮层箭头',
      control: { type: 'boolean' },
      defaultValue: true,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    theme: {
      description: '文字提示风格。可选项：default/primary/success/danger/warning/light',
      control: { type: 'text' },
      defaultValue: 'default',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'default' },
      },
    },
    'Omit<PopupProps, "placement">': {
      description: '继承Omit<PopupProps, "placement"> 中的全部 API',
      table: {
        category: 'Props',
        type: { summary: '' },
        defaultValue: { summary: '' },
      },
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TTooltip, TButton },

  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const count = ref(5);
    const reset = ref(true);
    let timer;

    const setTimer = () => {
      reset.value = !reset.value;
      count.value = 5;
      timer = setInterval(() => {
        count.value -= 1;
        if (count.value <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    };

    const countText = computed(() => `提示在${count.value}秒后消失`);

    onMounted(() => {
      setTimer();
    });

    onUnmounted(() => {
      clearInterval(timer);
    });
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
      countText,
      setTimer,
      reset,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div>
  <t-tooltip :key="reset" default-visible :content="countText" :duration="5000">
    <t-button variant="text" disabled> 定时消失 </t-button>
  </t-tooltip>
  <t-button v-if="!count" variant="outline" @click="setTimer"> 点击再次查看 </t-button>
</div>`,
});

export const Duration = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Duration.args = {};
Duration.storyName = '定时消失';

const BaseTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TTooltip, TButton },

  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <div class="tdesign-tooltip-placement">
    <t-tooltip
      class="placement-top"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      placement="top"
      :overlay-style="{ maxWidth: '400px' }"
      show-arrow
    >
      <t-button variant="outline"> top </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement-top-left"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      placement="top-left"
      :overlay-style="{ maxWidth: '400px' }"
      show-arrow
    >
      <t-button variant="outline"> top-left </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement-top-right"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ maxWidth: '400px' }"
      placement="top-right"
      show-arrow
    >
      <t-button variant="outline"> top-right </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement-bottom"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ maxWidth: '400px' }"
      placement="bottom"
      show-arrow
    >
      <t-button variant="outline"> bottom </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement-bottom-left"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      placement="bottom-left"
      :overlay-style="{ maxWidth: '400px' }"
      show-arrow
    >
      <t-button variant="outline"> bottom-left </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement-bottom-right"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ maxWidth: '400px' }"
      placement="bottom-right"
      show-arrow
    >
      <t-button variant="outline"> bottom-right </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement-left"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ maxWidth: '400px' }"
      placement="left"
      show-arrow
    >
      <t-button variant="outline"> left </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement-left-top"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ maxWidth: '400px' }"
      placement="left-top"
      show-arrow
    >
      <t-button variant="outline"> left-top </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement-left-bottom"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ maxWidth: '400px' }"
      placement="left-bottom"
      show-arrow
    >
      <t-button variant="outline"> left-bottom </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement-right"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ maxWidth: '400px' }"
      placement="right"
      show-arrow
    >
      <t-button variant="outline"> right </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement-right-top"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ maxWidth: '400px' }"
      placement="right-top"
      show-arrow
    >
      <t-button variant="outline"> right-top </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement-right-bottom"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ maxWidth: '400px' }"
      placement="right-bottom"
      show-arrow
    >
      <t-button variant="outline"> right-bottom </t-button>
    </t-tooltip>
  </div>
`,
});

export const Base = BaseTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Base.args = {};
Base.storyName = '基础';

const NoArrowTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TTooltip, TButton },

  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <div>
    <t-tooltip content="文字提示仅展示文本内容" :show-arrow="false">
      <t-button variant="outline"> 不带箭头的文字提示 </t-button>
    </t-tooltip>
  </div>
`,
});

export const NoArrow = NoArrowTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
NoArrow.args = {};
NoArrow.storyName = '无箭头';

const ThemeTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TTooltip, TButton },

  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <div class="tdesign-tooltip-demo">
  <t-tooltip content="文字提示仅展示文本内容">
    <t-button theme="default"> default </t-button>
  </t-tooltip>
  <t-tooltip content="文字提示仅展示文本内容" theme="primary">
    <t-button theme="primary"> primary </t-button>
  </t-tooltip>
  <t-tooltip content="文字提示仅展示文本内容" theme="success">
    <t-button theme="success"> success </t-button>
  </t-tooltip>
  <t-tooltip content="文字提示仅展示文本内容" theme="danger">
    <t-button theme="danger"> danger </t-button>
  </t-tooltip>
  <t-tooltip content="文字提示仅展示文本内容" theme="warning">
    <t-button theme="warning"> warning </t-button>
  </t-tooltip>
</div>
`,
});

export const Theme = ThemeTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Theme.args = {};
Theme.storyName = '主题色';

const TriggerTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TTooltip, TButton },

  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <div class="tdesign-tooltip-demo">
    <t-tooltip content="文字提示仅展示文本内容">
      <t-button variant="outline"> 悬浮时触发（默认） </t-button>
    </t-tooltip>
    <t-tooltip content="文字提示仅展示文本内容" trigger="focus">
      <t-input placeholder="获得焦点时触发" />
    </t-tooltip>
    <t-tooltip content="文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容文字提示仅展示文本内容" trigger="click">
      <t-button variant="outline"> 点击时触发 </t-button>
    </t-tooltip>
    <t-tooltip content="文字提示仅展示文本内容" trigger="context-menu">
      <t-button variant="outline"> 右击时触发 </t-button>
    </t-tooltip>
  </div>
`,
});

export const Trigger = TriggerTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Trigger.args = {};
Trigger.storyName = '触发方式';
