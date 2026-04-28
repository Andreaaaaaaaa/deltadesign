import { Skeleton as TSkeleton } from '../src/components/skeleton/index';
import { Switch as TSwitch } from '../src/components/switch/index';
import { Row as TRow, Col as TCol } from '../src/components/grid/index';

import './Skeleton.scss';

export default {
  title: '数据展示/Skeleton 骨架屏',
  component: TSkeleton,
  argTypes: {
    animation: {
      description: `动画效果，有「渐变加载动画」和「闪烁加载动画」两种。值为 'none' 则表示没有动画。可选项：gradient/flashed/none`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'none' },
      },
      control: {
        type: 'text',
      },
    },
    delay: {
      description: `延迟显示加载效果的时间，用于防止请求速度过快引起的加载闪烁，单位：毫秒`,
      table: {
        category: 'Props',
        type: { summary: 'Number' },
        defaultValue: { summary: 0 },
      },
      control: {
        type: 'number',
      },
    },
    loading: {
      description: `是否为加载状态，如果是则显示骨架图，如果不是则显示加载完成的内容`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: true },
      },
      control: {
        type: 'boolean',
      },
    },
    rowCol: {
      description: `高级设置，用于自定义行列数量、宽度高度、间距等。【示例一】，[1, 1, 2] 表示输出三行骨架图，第一行一列，第二行一列，第三行两列。【示例二】，[1, 1, { width: '100px' }] 表示自定义第三行的宽度为 100px。【示例三】，[1, 2, [{ width, height }, { width, height, marginLeft }]] 表示第三行有两列，且自定义宽度、高度、尺寸（圆形或方形使用）、间距、内容等。TS 类型：SkeletonRowCol type SkeletonRowCol = Array<Number | SkeletonRowColObj | Array<SkeletonRowColObj>> interface SkeletonRowColObj { width?: string; height?: string; size?: string; marginRight?: string; marginLeft?: string; margin?: string; content?: string | TNode; type?: 'rect' | 'circle' | 'text' }。`,
      table: {
        category: 'Props',
        type: { summary: 'Array' },
        defaultValue: { summary: [] },
      },
      control: {
        type: 'object',
      },
    },
    theme: {
      description: `快捷定义骨架图风格，有基础、头像组合等，具体参看代码示例。可选项：text/avatar/paragraph/avatar-text/tab/article`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'text' },
      },
      control: {
        type: 'text',
      },
    },
  },
};

// 1-基础骨架屏
const BaseTemplate = (args) => ({
  components: { TSkeleton, TSwitch },
  setup() {
    return {
      ...args,
    };
  },
  template: `<div>
        <t-switch v-model="loading" class="mb-20"></t-switch>
        <div>
        <t-skeleton :loading="loading">
            <div class="t-skeleton-demo-paragraph">
            <p>
                骨架屏组件，是指当网络较慢时，在页面真实数据加载之前，给用户展示出页面的大致结构。
                一方面让用户对页面有一定的心理预期，另一方面可以改善长期停留在空白屏给用户带来的枯燥和不适感。它可以为用户提供更好视觉效果和使用体验。
            </p>
            </div>
        </t-skeleton>
        </div>
    </div>`,
});
export const base = BaseTemplate.bind({});
base.storyName = '基础骨架屏';
base.args = {
  loading: true,
};

// 2-带动画效果的骨架屏
const AnimationTemplate = (args) => ({
  components: { TSkeleton, TRow, TCol },
  setup() {
    return {
      ...args,
    };
  },
  template: `<t-row class="t-skeleton-demo">
      <t-col v-for="(animation, index) in animations" :key="index">
        <section class="t-skeleton-demo-card">
          <div class="header">
            {{ animation.label }}
          </div>
          <div class="content">
            <t-skeleton :animation="animation.value"></t-skeleton>
          </div>
        </section>
      </t-col>
    </t-row>`,
});
export const animation = AnimationTemplate.bind({});
animation.storyName = '带动画效果的骨架屏';
animation.args = {
  animations: [
    { label: '渐变加载动画', value: 'gradient' },
    { label: '闪烁加载动画', value: 'flashed' },
  ],
};

// 3-带延迟效果的骨架屏
const DelayTemplate = (args) => ({
  components: { TSkeleton, TSwitch },
  setup() {
    return {
      ...args,
    };
  },
  template: `<div>
      <t-switch v-model="loading" class="mb-20"></t-switch>
      <div>
        <t-skeleton :loading="loading" :delay="delay">
          <div class="t-skeleton-demo-paragraph">
            <p>
              骨架屏组件，是指当网络较慢时，在页面真实数据加载之前，给用户展示出页面的大致结构。
              一方面让用户对页面有一定的心理预期，另一方面可以改善长期停留在空白屏给用户带来的枯燥和不适感。它可以为用户提供更好视觉效果和使用体验。
            </p>
          </div>
        </t-skeleton>
      </div>
    </div>`,
});
export const delay = DelayTemplate.bind({});
delay.storyName = '带延迟效果的骨架屏';
delay.args = {
  loading: false,
  delay: 2000,
};

// 4-不同主题的骨架屏
const ThemeTemplate = (args) => ({
  components: { TSkeleton, TRow, TCol },
  setup() {
    return {
      ...args,
    };
  },
  template: `<t-row class="t-skeleton-demo">
      <t-col v-for="(theme, index) in themes" :key="index">
        <section class="t-skeleton-demo-card">
          <div class="header">
            {{ theme.label }}
          </div>
          <div class="content">
            <t-skeleton :theme="theme.value"></t-skeleton>
          </div>
        </section>
      </t-col>
    </t-row>`,
});
export const theme = ThemeTemplate.bind({});
theme.storyName = '不同主题的骨架屏';
theme.args = {
  themes: [
    { label: '文本', value: 'text' },
    { label: '头像', value: 'avatar' },
    { label: '段落', value: 'paragraph' },
    { label: '头像描述', value: 'avatar-text' },
    { label: '选项卡', value: 'tab' },
    { label: '文章', value: 'article' },
  ],
};

// 5-组合用法
const AdvanceTemplate = (args) => ({
  components: { TSkeleton },
  setup() {
    return {
      ...args,
    };
  },
  template: `<div class="t-skeleton-demo">
      <section class="t-skeleton-demo-card">
        <div class="header">组合成网页效果</div>
        <div class="content">
          <t-skeleton :row-col="rowCol"></t-skeleton>
        </div>
      </section>

      <section class="t-skeleton-demo-card">
        <div class="header">组合成列表效果</div>
        <div class="content">
          <ul class="t-skeleton-demo-list">
            <li v-for="i in 3" :key="i">
              <t-skeleton class="avatar" theme="avatar"></t-skeleton>
              <t-skeleton class="paragraph" theme="paragraph"></t-skeleton>
            </li>
          </ul>
        </div>
      </section>
    </div>`,
});
export const advance = AdvanceTemplate.bind({});
advance.storyName = '组合用法';
advance.args = {
  rowCol: [
    [1, 1, 1].map(() => ({ type: 'rect', content: 'image', width: '33%', height: '180px' })),
    [
      { type: 'circle', size: '50px' },
      { type: 'rect', margin: '20px 0', width: '80%', height: '30px' },
      { type: 'rect', marginLeft: '20px', width: '80px', height: '30px', content: '确定' },
    ],
    1,
    1,
    { type: 'text', width: '70%', margin: '0 0 16px 0' },
    {
      type: 'rect',
      width: '100%',
      height: '300px',
      content: () => (
        <div class="row-col-content">
          <h3 class="row-col-content__header">标题</h3>
          <section class="row-col-content__content"> 内容</section>
        </div>
      ),
    },
  ],
};
