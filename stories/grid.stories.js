import { reactive, toRefs, ref } from 'vue';
import { Row as TRow, Col as TCol } from '../src/components/grid/index';
// import '../src/components/grid/style';

import './grid.scss';

export default {
  title: '布局/Grid 栅格',
  component: { TRow, TCol },
  argTypes: {},
};

// 基础Grid
const baseTemplate = (args) => ({
  components: { TRow, TCol },
  template: `  <div class="tdesign-demo-item--grid">
  <t-row v-for="(i, idx) in demoCols" :key="idx">
    <t-col v-for="(j, jdx) in i" :key="jdx" :span="j">
      <div>{{ j }}</div>
    </t-col>
  </t-row>
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

export const base = baseTemplate.bind({});
// base.storyName = '基本使用';
base.args = {
  demoCols: [
    Array(12).fill(1),
    Array(6).fill(2),
    Array(4).fill(3),
    Array(3).fill(4),
    Array(2).fill(6),
    Array(1).fill(12),
  ],
};

// gutter Grid
const gutterTemplate = (args) => ({
  components: { TRow, TCol },
  template: `<div class="tdesign-demo-item--grid tdesign-demo-block-column">
  <!-- 只指定水平 gutter，垂直默认为0 -->
  <span>水平 gutter 为固定值</span>
  <t-row :gutter="16">
    <t-col :span="3">
      <div>col-3</div>
    </t-col>
    <t-col :span="3">
      <div>col-3</div>
    </t-col>
    <t-col :span="3">
      <div>col-3</div>
    </t-col>
    <t-col :span="3">
      <div>col-3</div>
    </t-col>
  </t-row>

  <!-- 水平 gutter 为响应式 -->
  <span>水平 gutter 为响应式</span>
  <t-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 40 }">
    <t-col :span="3">
      <div>col-3</div>
    </t-col>
    <t-col :span="3">
      <div>col-3</div>
    </t-col>
    <t-col :span="3">
      <div>col-3</div>
    </t-col>
    <t-col :span="3">
      <div>col-3</div>
    </t-col>
  </t-row>

  <!-- 指定水平和垂直 gutter，注：垂直 gutter 只在同一个row组件下面的col组件之间生效 -->
  <span>水平和垂直 gutter 均为固定值</span>
  <t-row :gutter="[16, 24]">
    <t-col v-for="i in 8" :key="i" :span="3">
      <div>col-3</div>
    </t-col>
  </t-row>

  <!-- 水平 gutter 响应式，垂直 gutter 固定值-->
  <span>水平 gutter 响应式，垂直 gutter 固定值</span>
  <t-row :gutter="[{ xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 40 }, 24]">
    <t-col v-for="i in 8" :key="i" :span="3">
      <div>col-3</div>
    </t-col>
  </t-row>

  <!-- 水平和垂直 gutter 均为响应式 -->
  <span>水平和垂直 gutter 均为响应式</span>
  <t-row
    :gutter="[
      { xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 40 },
      { xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 40 },
    ]"
  >
    <t-col v-for="i in 8" :key="i" :span="3">
      <div>col-3</div>
    </t-col>
  </t-row>
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

export const gutter = gutterTemplate.bind({});
gutter.args = {};

// offset grid
const offsetTemplate = (args) => ({
  components: { TRow, TCol },
  template: `<div class="tdesign-demo-item--grid tdesign-demo-block-column">
  <t-row>
    <t-col :span="4">
      <div>col-4</div>
    </t-col>
    <t-col :span="4" :offset="4">
      <div>col-4 col-offset-4</div>
    </t-col>
  </t-row>

  <t-row>
    <t-col :span="3" :offset="3">
      <div>col-3 col-offset-3</div>
    </t-col>
    <t-col :span="3" :offset="3">
      <div>col-3 col-offset-3</div>
    </t-col>
  </t-row>

  <t-row>
    <t-col :span="6" :offset="3">
      <div>col-6 col-offset-3</div>
    </t-col>
  </t-row>
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

// sort grid
const sortTemplate = (args) => ({
  components: { TRow, TCol },
  template: `<div class="tdesign-demo-item--grid tdesign-demo-block-column">
  <t-row>
    <t-col :span="9" :push="3">
      <div>col-9 col-pull-3</div>
    </t-col>
    <t-col :span="3" :pull="9">
      <div>col-3 col-pull-9</div>
    </t-col>
  </t-row>
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

export const sort = sortTemplate.bind({});
sort.args = {};

// order grid
const orderTemplate = (args) => ({
  components: { TRow, TCol },
  template: `<div class="tdesign-demo-item--grid tdesign-demo-block-column">
  <t-row>
      <t-col :span="3" :order="4">
        <div>1 col-3-order-4</div>
      </t-col>
      <t-col :span="3" :order="3">
        <div>2 col-3-order-3</div>
      </t-col>
      <t-col :span="3" :order="2">
        <div>3 col-3-order-2</div>
      </t-col>
      <t-col :span="3" :order="1">
        <div>4 col-3-order-1</div>
      </t-col>
    </t-row>
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

export const order = orderTemplate.bind({});
order.args = {};

// halign grid
const halignTemplate = (args) => ({
  components: { TRow, TCol },
  template: `<div class="tdesign-demo-item--grid tdesign-demo-block-column">
  <span class="aw-text-lg">align left</span>
  <t-row justify="start">
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
  </t-row>

  <span>align center</span>
  <t-row justify="center">
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
  </t-row>

  <span>align right</span>
  <t-row justify="end">
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
  </t-row>

  <span>space-between</span>
  <t-row justify="space-between">
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
  </t-row>

  <span>space-around</span>
  <t-row justify="space-around">
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
    <t-col :span="2">
      <div>col-2</div>
    </t-col>
  </t-row>
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

export const halign = halignTemplate.bind({});
halign.args = {};

// valign grid
const valignTemplate = (args) => ({
  components: { TRow, TCol },
  template: `<div class="tdesign-demo-item--grid tdesign-demo-block-column">
  <t-row>
      <t-col :span="3" :order="4">
        <div>1 col-3-order-4</div>
      </t-col>
      <t-col :span="3" :order="3">
        <div>2 col-3-order-3</div>
      </t-col>
      <t-col :span="3" :order="2">
        <div>3 col-3-order-2</div>
      </t-col>
      <t-col :span="3" :order="1">
        <div>4 col-3-order-1</div>
      </t-col>
    </t-row>
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

export const valign = valignTemplate.bind({});
valign.args = {};

// flex grid
const flexTemplate = (args) => ({
  components: { TRow, TCol },
  template: `<div class="tdesign-demo-item--grid tdesign-demo-block-column">
  <t-row>
      <t-col :flex="2">
        <div>2 / 5</div>
      </t-col>
      <t-col :flex="3">
        <div>3 / 5</div>
      </t-col>
    </t-row>

    <t-row>
      <t-col flex="100px">
        <div>100px</div>
      </t-col>
      <t-col flex="auto">
        <div>auto</div>
      </t-col>
    </t-row>

    <t-row>
      <t-col flex="1 1 200px">
        <div>1 1 200px</div>
      </t-col>
      <t-col flex="0 1 300px">
        <div>0 1 300px</div>
      </t-col>
    </t-row>

    <t-row>
      <t-col flex="none">
        <div style="padding: 0 16px">none</div>
      </t-col>
      <t-col flex="auto">
        <div>auto with no-wrap</div>
      </t-col>
    </t-row>
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

export const flex = flexTemplate.bind({});
flex.args = {};

// responsive grid
const responsiveTemplate = (args) => ({
  components: { TRow, TCol },
  template: `<div class="tdesign-demo-item--grid tdesign-demo-block-column">
  <span>宽度响应式</span>
  <t-row>
    <t-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">
      <div>Col</div>
    </t-col>
    <t-col :xs="10" :sm="8" :md="6" :lg="4" :xl="2">
      <div>Col</div>
    </t-col>
  </t-row>

  <span>其他属性响应式（支持span，offset，order，pull，push）</span>
  <t-row>
    <t-col
      :xs="{ offset: 0, span: 3 }"
      :sm="{ offset: 2, span: 3 }"
      :md="{ offset: 4, span: 3 }"
      :lg="{ offset: 6, span: 3 }"
      :xl="{ offset: 8, span: 3 }"
    >
      <div>Col</div>
    </t-col>
  </t-row>
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

export const responsive = responsiveTemplate.bind({});
responsive.args = {};
