// import { action } from '@storybook/addon-actions';
import { reactive, toRefs } from 'vue';
import { Button as TButton } from 'tdesign-vue-next/esm/button';
// import { LoginIcon, CartIcon, WalletIcon, CheckCircleIcon } from 'tdesign-icons-vue-next';
import { Badge as TBadge } from '../src/components/badge/index.ts';
import '../src/assets/badge-hook.scss';
import './badge.scss';

export const actionsData = {
  // onShowDialog: action('click'),å
};

export default {
  title: '数据展示/Badge 徽标',
  component: { TBadge },
  argTypes: {
    color: {
      description: `颜色`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
      },
      control: { type: 'color', presetColors: ['red', 'green'] },
    },
    content: {
      description: `徽标内容。TS 类型：string | TNode。`,
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: 'string',
      },
    },
    count: {
      description: `徽标右上角内容。可以是数字，也可以是文字。如：'new'/3/99+。TS 类型：string | number | TNode。`,
      table: {
        category: 'Props',
        type: { summary: 'String / Number / Slot / Function' },
        defaultValue: { summary: 0 },
      },
      control: {
        type: 'number',
      },
    },
    default: {
      description: '徽标内容，默认插槽，同 content。TS 类型：string | TNode。',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: 'null',
      },
    },
    dot: {
      description: '是否为红点',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
    },
    maxCount: {
      description: '封顶的数字值',
      table: {
        category: 'Props',
        type: { summary: 'Number' },
        defaultValue: { summary: 99 },
      },
      control: {
        type: 'number',
      },
    },
    offset: {
      description: `设置状态点的位置偏移，示例：[-10, 20] 或 ['10em', '8rem']。TS 类型：Array<string | number`,
      table: {
        category: 'Props',
        type: { summary: 'Array' },
      },
      control: {
        type: 'object',
      },
    },
    shape: {
      description: '形状。可选项：circle/round',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'circle' },
      },
      control: {
        type: 'inline-radio',
        options: ['circle', 'round'],
      },
    },
    showZero: {
      description: '当数值为 0 时，是否展示徽标',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
    },
    size: {
      description: `尺寸。可选项：small/medium`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'medium' },
      },
      control: {
        type: 'inline-radio',
        options: ['medium', 'small'],
      },
    },
  },
  excludeStories: /.Data$/,
};

const aControlTemplate = (args) => ({
  components: { TBadge },
  template: `
  <t-badge
   :color="color"
   :content="content"
   :count="count"
   :dot="dot"
   :maxCount="maxCount"
   :offset="offset"
   :shape="shape"
   :showZero="showZero"
   :size="size"
   >
  <div class="badge-block" />
 </t-badge>`,
  methods: {
    actionsData,
  },
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
  color: '',
  content: '这是内容',
  count: 1,
  dot: false,
  maxCount: 10,
  offset: [0, 0],
  shape: 'circle',
  showZero: false,
  size: 'medium',
};
aControl.storyName = '控制';

// 红点样式的徽标
const Template = (args) => ({
  components: { TBadge },
  template: `<div class="demo-badge-block">
  <t-badge dot>
    <div class="badge-block" />
  </t-badge>
  <t-badge dot> 解锁新徽章 </t-badge>
  <t-badge dot>
    <svg
      class="t-icon"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style="font-size: 24px"
    >
      <path
        fill-rule="evenodd"
        d="M8,9 C9.40504021,9 10.7254812,9.36221239 11.8730402,9.99835445 L11.885,10 L12.4565011,10.2862457 C12.7901689,10.4574447 13,10.8009441 13,11.1759685 L13,13 C13,13.5522847 12.5522847,14 12,14 L4,14 C3.44771525,14 3,13.5522847 3,13 L3,11.1762791 C3,10.8012353 3.20985249,10.4577217 3.54354665,10.2865317 L4.121,10 L4.126,9.999 L4.27379497,9.91895294 C5.38659871,9.3321599 6.6545093,9 8,9 Z M8,10 C6.51283435,10 5.13398645,10.4637634 4.00018867,11.2545577 L4,13 L12,13 L12.0003287,11.2549186 C10.8664331,10.4639045 9.48739188,10 8,10 Z M8,2.49576492 C9.65685425,2.49576492 11,3.83891067 11,5.49576492 C11,7.15261916 9.65685425,8.49576492 8,8.49576492 C6.34314575,8.49576492 5,7.15261916 5,5.49576492 C5,3.83891067 6.34314575,2.49576492 8,2.49576492 Z M8,3.49576492 C6.8954305,3.49576492 6,4.39119542 6,5.49576492 C6,6.60033441 6.8954305,7.49576492 8,7.49576492 C9.1045695,7.49576492 10,6.60033441 10,5.49576492 C10,4.39119542 9.1045695,3.49576492 8,3.49576492 Z"
      />
    </svg>
  </t-badge>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const base = Template.bind({});
base.args = {};
base.storyName = '红点样式的徽标';

// 数字样式的徽标
const numberTemplate = (args) => ({
  components: { TBadge },
  template: `  <div>
  <t-badge :count="2">
    <div class="badge-block" />
  </t-badge>
  <t-badge :count="0" show-zero>
    <div class="badge-block" />
  </t-badge>
  <t-badge :count="100">
    <div class="badge-block" />
  </t-badge>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});
export const number = numberTemplate.bind({});
number.args = {};
number.storyName = '数字样式的徽标';

// 自定样式的徽标
const customTemplate = (args) => ({
  components: { TBadge },
  template: `  <div>
  <t-badge count="2" dot>
    <div class="badge-block"></div>
  </t-badge>
  <t-badge count="new">
    <div class="badge-block"></div>
  </t-badge>
  <t-badge count="99" color="#00A870">
    <div class="badge-block"></div>
  </t-badge>
  <t-badge count="100" color="#0052D9" shape="round">
    <div class="badge-block"></div>
  </t-badge>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});
export const custom = customTemplate.bind({});
custom.args = {};
custom.storyName = '自定样式的徽标';

// 不同尺寸的徽标
const sizeTemplate = (args) => ({
  components: { TBadge },
  template: `  <div>
  <h3 class="demo-t-badge-title">1.默认大小</h3>
  <t-badge count="2">
    <div class="badge-block" />
  </t-badge>
  <t-badge count="99">
    <div class="badge-block" />
  </t-badge>
  <t-badge count="999">
    <div class="badge-block" />
  </t-badge>

  <h3 class="demo-t-badge-title">2.小</h3>
  <t-badge count="2" size="small">
    <div class="badge-block" />
  </t-badge>
  <t-badge count="99" size="small">
    <div class="badge-block" />
  </t-badge>
  <t-badge count="999" size="small">
    <div class="badge-block" />
  </t-badge>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});
export const size = sizeTemplate.bind({});
size.args = {};
size.storyName = '不同尺寸的徽标';

// 不同形状的徽标
const shapeTemplate = (args) => ({
  components: { TBadge },
  template: `  <div>
  <t-badge shape="circle" count="2">
    <div class="badge-block" />
  </t-badge>
  <t-badge shape="round" count="99">
    <div class="badge-block" />
  </t-badge>
</div>`,
  setup() {
    const state = reactive({
      ...args,
      current: 0,
    });
    return {
      ...toRefs(state),
    };
  },
});
export const shape = shapeTemplate.bind({});
shape.args = {};
shape.storyName = '不同形状的徽标';

// 控制徽标显示偏移位置
const offsetTemplate = (args) => ({
  components: { TBadge },
  template: `  <div>
  <t-badge count="2">
    <div class="badge-block" />
  </t-badge>

  <t-badge count="2" :offset="[10, 10]">
    <div class="badge-block" />
  </t-badge>

  <t-badge count="2" :offset="[-10, 10]">
    <div class="badge-block" />
  </t-badge>

  <t-badge count="2" :offset="[-10, -10]">
    <div class="badge-block" />
  </t-badge>

  <t-badge count="2" :offset="[10, -10]">
    <div class="badge-block" />
  </t-badge>
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
export const offset = offsetTemplate.bind({});
offset.args = {};
offset.storyName = '控制徽标显示偏移位置';
