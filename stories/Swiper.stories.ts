import { reactive, toRefs, ref, onMounted, computed, createApp } from 'vue';
// import { SwiperItem } from 'tdesign-vue-next/esm/swiper';
import { Swiper as TSwiper, SwiperItem as TSwiperItem } from '../src/components/swiper/index';

import './swiper.scss';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: '数据展示/Swiper 轮播框',
  component: TSwiper,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    animation: {
      description: ' 轮播切换动画效果类型：滑动、淡入淡出等',
      table: {
        category: 'Props',
        type: { summary: 'String', detail: "'slide' | 'fade'" },
        defaultValue: { summary: 'slide' },
      },
    },
    autoplay: {
      description: '是否自动播放',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        // // defaultValue: { summary: '-' },
      },
    },
    current: {
      description: '当前轮播在哪一项（下标）',
      table: {
        category: 'Props',
        type: { summary: 'Number' },
        defaultValue: { summary: 0 },
      },
      control: {
        type: null,
      },
    },
    defaultCurrent: {
      description: '当前轮播在哪一项（下标），非受控属性',
      table: {
        category: 'Props',
        type: { summary: 'Number' },
        defaultValue: { summary: 0 },
      },
    },
    direction: {
      description: '轮播滑动方向，包括横向滑动和纵向滑动两个方向',
      table: {
        category: 'Props',
        type: { summary: 'String', detail: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
      },
    },
    duration: {
      description: '滑动动画时长',
      table: {
        category: 'Props',
        type: { summary: 'Number' },
        defaultValue: { summary: 300 },
      },
      control: {
        type: null,
      },
    },
    height: {
      description: '当使用垂直方向滚动时的高度',
      table: {
        category: 'Props',
        type: { summary: 'Number' },
        defaultValue: { summary: 'false' },
      },
    },
    interval: {
      description: '轮播间隔时间',
      table: {
        category: 'Props',
        type: { summary: 'Number' },
        defaultValue: { summary: 5000 },
      },
      control: {
        type: null,
      },
    },
    loop: {
      description: '是否循环播放',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: true },
      },
    },
    navigation: {
      description: '导航器全部配置',
      table: {
        category: 'Props',
        type: { summary: 'Slot', detail: 'SwiperNavigation | TNode' },
        // defaultValue: { summary: '[]' },
      },
      control: {
        type: null,
        // null text radio select/option
      },
    },
    stopOnHover: {
      description: '是否悬浮时停止轮播',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: true },
      },
    },
    theme: {
      description: '深色模式和浅色模式',
      table: {
        category: 'Props',
        type: { summary: 'String', detail: "'light' | 'dark'" },
        defaultValue: { summary: 'light' },
      },
    },
    trigger: {
      description: '触发切换的方式：悬浮、点击等',
      table: {
        category: 'Props',
        type: { summary: 'String', detail: "'hover' | 'click'" },
        defaultValue: { summary: 'hover' },
      },
    },
    type: {
      description: '样式类型：默认样式、卡片样式',
      table: {
        category: 'Props',
        type: { summary: 'String', detail: "'default' | 'card'" },
        defaultValue: { summary: 'default' },
      },
    },
    onChange: {
      description: '轮播切换时触发',
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
          detail:
            "TS 类型：(current: number, context: { source: SwiperChangeSource }) => void 轮播切换时触发。type SwiperChangeSource = 'autoplay' | 'click'",
        },
        // defaultValue: { summary: 'false' },
      },
    },

    change: {
      description: `轮播切换时触发。type SwiperChangeSource = 'autoplay' | 'click'`,
      table: {
        category: 'Events',
        type: {
          summary: '(current: number, context: { source: SwiperChangeSource })',
        },
      },
    },

    placement: {
      description: '导航器位置，位于主体的内侧或是外侧。可选项：inside/outside',
      table: {
        category: 'SwiperNavigation Props',
        type: { summary: 'String', detail: "'inside' | 'outside'" },
        defaultValue: { summary: 'inside' },
      },
    },
    showSlideBtn: {
      description: '何时显示导航器的翻页按钮：始终显示、悬浮显示、永不显示。可选项：always/hover/never',
      table: {
        category: 'SwiperNavigation Props',
        type: { summary: 'String', detail: "'always' | 'hover' | 'never'" },
        defaultValue: { summary: 'always' },
      },
    },
    size: {
      description: '导航器尺寸。可选项：small/medium/large',
      table: {
        category: 'SwiperNavigation Props',
        type: { summary: 'String', detail: "'small' | 'medium' | 'large'" },
        defaultValue: { summary: 'medium' },
      },
    },
    type1: {
      name: 'type',
      description:
        '导航器类型，点状(dots)、点条状(dots-bar)、条状(bars)、分式(fraction)等。TS 类型：SwiperNavigationType',
      table: {
        category: 'SwiperNavigation Props',
        type: { summary: 'String' },
        // defaultValue: { summary: 'inside' },
      },
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TSwiper, TSwiperItem },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div class="aw-text-lg aw-font-medium aw-mb-4">轮播框组件最基本的使用</div>
  <div class="tdesign-demo-block--swiper-new">
  <t-swiper v-bind="args" >
    <t-swiper-item>
      <div class="demo-item">1</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">2</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">3</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">4</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">5</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">6</div>
    </t-swiper-item>
  </t-swiper>
</div>`,
  setup() {
    const state = reactive({
      ...args,
    });

    return {
      args,
      ...toRefs(state),
    };
  },
});

export const Demo = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Demo.args = {
  animation: 'slide',
  autoplay: true,
  direction: 'horizontal',
  duration: 300,
  interval: 2000,
  loop: true,
};
Demo.storyName = '基本使用';

const verticalSwiper = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TSwiper, TSwiperItem },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div class="aw-text-lg aw-font-medium aw-mb-4">通过设置direction为vertical使轮播框在垂直方向上轮播，默认为horizontal。</div>
  <div class="tdesign-demo-block--swiper-new">
    <t-swiper direction="vertical" :navigation="{ showSlideBtn: 'never' }" :height="280" :autoplay="false">
      <t-swiper-item>
        <div class="demo-item">1</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item">2</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item">3</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item">4</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item">5</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item">6</div>
      </t-swiper-item>
    </t-swiper>
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });

    return {
      args,
      ...toRefs(state),
    };
  },
});

export const vertical = verticalSwiper.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
vertical.args = {};
vertical.storyName = '垂直布局';

const navigationPosition = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TSwiper, TSwiperItem },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div class="aw-text-lg aw-font-medium aw-mb-4">
  通过设置<code>navigation</code>中的<code>placement</code>属性值来控制导航器位置，可设置位于主体的内侧或是外侧。
  </div>
  <div class="tdesign-demo-block--swiper-new">
  <t-swiper :navigation="{ placement: 'outside' }">
    <t-swiper-item>
      <div class="demo-item">1</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">2</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">3</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">4</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">5</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">6</div>
    </t-swiper-item>
  </t-swiper>
</div>`,
  setup() {
    const state = reactive({
      ...args,
    });

    return {
      args,
      ...toRefs(state),
    };
  },
});

export const navPosition = navigationPosition.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
navPosition.args = {
  animation: 'slide',
  autoplay: true,
  direction: 'horizontal',
  duration: 300,
  interval: 2000,
  loop: true,
};
navPosition.storyName = '导航器位置';

const navigationType = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TSwiper, TSwiperItem },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div class="tdesign-demo-block--swiper-new">
  <t-swiper :navigation="{ type: 'fraction' }">
    <t-swiper-item>
      <div class="demo-item">1</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">2</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">3</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">4</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">5</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">6</div>
    </t-swiper-item>
  </t-swiper>
</div>`,
  setup() {
    const state = reactive({
      ...args,
    });

    return {
      args,
      ...toRefs(state),
    };
  },
});

export const navType = navigationType.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
navType.args = {};
navType.storyName = '分式导航器';

const hideSwiper = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TSwiper, TSwiperItem },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: ` <div class="tdesign-demo-block--swiper-new">
  <t-swiper animation="fade" :height="280">
    <t-swiper-item>
      <div class="demo-item">1</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">2</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">3</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">4</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">5</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">6</div>
    </t-swiper-item>
  </t-swiper>
</div>`,
  setup() {
    const state = reactive({
      ...args,
    });

    return {
      args,
      ...toRefs(state),
    };
  },
});

export const hide = hideSwiper.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
hide.args = {};
hide.storyName = '渐隐模式';

const cardSwiper = (args) => ({
  components: { TSwiper, TSwiperItem },

  template: ` <div class="tdesign-demo-block--swiper-new">
  <t-swiper type="card" :height="280">
    <t-swiper-item>
      <div class="demo-item">1</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">2</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">3</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">4</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">5</div>
    </t-swiper-item>
    <t-swiper-item>
      <div class="demo-item">6</div>
    </t-swiper-item>
  </t-swiper>
</div>`,
  setup() {
    const state = reactive({
      ...args,
    });

    return {
      args,
      ...toRefs(state),
    };
  },
});

export const card = cardSwiper.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
card.args = {};
card.storyName = '卡片模式';

const sizeSwiper = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TSwiper, TSwiperItem },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div>
  <div class="tdesign-demo-block--swiper-new" :style="{ width: '1000px' }">
    <h3>large</h3>
    <t-swiper :navigation="{ size: 'large' }">
      <t-swiper-item>
        <div class="demo-item demo-large">1</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item demo-large">2</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item demo-large">3</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item demo-large">4</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item demo-large">5</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item demo-large">6</div>
      </t-swiper-item>
    </t-swiper>
  </div>
  <div class="tdesign-demo-block--swiper-new" :style="{ width: '500px', marginTop: '20px' }">
    <h3>small</h3>
    <t-swiper :navigation="{ size: 'small' }">
      <t-swiper-item>
        <div class="demo-item demo-small">1</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item demo-small">2</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item demo-small">3</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item demo-small">4</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item demo-small">5</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item demo-small">6</div>
      </t-swiper-item>
    </t-swiper>
  </div>
</div>`,
  setup() {
    const state = reactive({
      ...args,
    });

    return {
      args,
      ...toRefs(state),
    };
  },
});

export const size = sizeSwiper.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
size.args = {};
size.storyName = '导航器位置';
