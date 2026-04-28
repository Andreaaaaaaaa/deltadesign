import { reactive, toRefs, ref } from 'vue';
import StatsCard from '../src/components/stats-card/index';
import '../src/assets/font-hook.scss';
import './stats-card.scss';

const dataExample = [
  {
    lp: -0.7027933463884575,
    sply: -0.6834817961281414,
    compare: '对比项1',
    value: 66020,
    date: '2022-06-28',
  },
];

export default {
  title: '独立图形/指标卡',
  component: { StatsCard },
  parameters: {
    docs: {
      description: {
        component: `
stats-card 指标卡
* 在页面内的重要位置，展示重要信息。
`,
      },
    },
  },
  // args: {
  //   data: dataExample,
  //   isCompare: false,
  //   title: '',
  //   numAreaHeight: 124,
  //   showDate: true,
  //   showBorder: true,
  // },
  // 组件的 props 说明
  argTypes: {
    data: {
      description: '基础数据',
      table: {
        category: 'Props',
        type: {
          summary: 'StatsItem[]',
          detail: `
StatsItem {
  lp?: number | string; // 环比值 (isCompare:false时需要)
  lpName?: string; // 环比自定义名称
  lpShowNum?: boolean, // 环比是否只显示数值 不做百分数处理
  lpHideTip?: boolean, // 环比隐藏tooltip
  sply?: number | string; // 同比值(isCompare:false时需要)
  splyName?: string, // 同比自定义名称
  splyShowNum?: boolean, // 同比是否只显示数值 不做百分数处理
  splyHideTip?: boolean, // 同比隐藏tooltip
  compare: string; // 对比项名称
  value: number | string; // 指标值
  date: string; // 时间
  cpValue?: number | string; // 对比时间的指标值(isCompare:true时需要)
  cp?: number | string;  // 指标和对比时间指标值 的比率(isCompare:true时需要)
  cpDate?: string; // 对比时间(isCompare:true时需要)
}`,
        },
      },
      control: {
        type: 'object',
      },
    },
    isCompare: {
      description: '是否为时间对比',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
      },
      control: {
        type: 'boolean',
      },
    },
    title: {
      description: '标题',
      table: {
        category: 'Props',
        type: { summary: 'Number' },
      },
      control: {
        type: 'text',
      },
    },
    numAreaHeight: {
      description: '指标卡数据部分高度',
      table: {
        category: 'Props',
        type: { summary: 'Number' },
        defaultValue: { summary: 124 },
      },
      control: {
        type: 'number',
      },
    },
    showDate: {
      description: '展示时间',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: true },
      },
      control: {
        type: 'boolean',
      },
    },
    showBorder: {
      description: '展示外框',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: true },
      },
      control: {
        type: 'boolean',
      },
    },
  },
  excludeStories: /.Data$/,
};

// 整体展示的例子，和Control可以联动（写法比较固定）
// export const Default = template('<stats-card v-bind="args"></stats-card>');

// 基础示例
const baseTemplate = (args) => ({
  components: { StatsCard },
  template:
    '<stats-card :data="data" :title="title" :num-area-height="numAreaHeight" :show-date="showDate" :show-border="showBorder"></stats-card>',
  setup() {
    const state = reactive({
      ...args,
    });
    const data = [
      {
        lp: -0.33463884575,
        sply: 0.7961281414,
        value: 10086,
        date: '2022-06-28',
      },
    ];
    const title = '指标标题';
    return {
      ...toRefs(state),
      data,
      title,
    };
  },
});
export const base = baseTemplate.bind({});
base.storyName = '基础示例';
base.args = {
  data: dataExample,
  isCompare: false,
  title: '',
  numAreaHeight: 124,
  showDate: true,
  showBorder: true,
};
base.parameters = {
  docs: {
    description: {
      story: '用来显示某个指标的数据值以及同比环比升降幅度；注意 `data` 是个数组！！！',
    },
  },
};

// 显示多个（带标题）
const withTitleTemplate = (args) => ({
  components: { StatsCard },
  template: `
  <div style="display: flex;">
    <div v-for="item in dataSet" style="flex: 1; padding:10px">
      <stats-card :data="[item.data]" :title="item.title" :num-area-height="item.numAreaHeight" :show-date="item.showDate"></stats-card>
    </div>
  </div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const dataSet = [
      {
        title: '总消耗',
        data: {
          lp: -0.33463884575,
          sply: 0.7961281414,
          value: 10086,
        },
        showDate: false,
        numAreaHeight: 76,
      },
      {
        title: '总付费',
        data: {
          lp: 0.884575,
          sply: -0.68961281414,
          value: 65535,
        },
        numAreaHeight: 76,
        showDate: false,
      },
      {
        title: '总注册',
        data: {
          lp: 0.223884575,
          sply: -0.18968114,
          value: 102400,
        },
        numAreaHeight: 76,
        showDate: false,
      },
    ];
    return {
      ...toRefs(state),
      dataSet,
    };
  },
});
export const withTitle = withTitleTemplate.bind({});
withTitle.storyName = '基础（带标题）';
withTitle.args = {};
withTitle.parameters = {
  docs: {
    description: {
      story: '一般来说多个展示的时候建议带上标题，并且值得注意的是 `data` 是个数组！！！（看下面的代码）',
    },
  },
};

// 基础（多对比项）
const multiCpNoTimeTemplate = (args) => ({
  components: { StatsCard },
  template: '<stats-card :data="data" ></stats-card>',
  setup() {
    const state = reactive({
      ...args,
    });
    const data = [
      {
        lp: 0.2985153764581124, // 环比值
        sply: 48.97959183673469, // 同比值
        compare: '对比项1', // 对比项名称值
        value: 2449, // 指标值 （对应对比项）
        date: '2022-06-28', // 时间
      },
      {
        lp: 0.2733964248159832, // 环比值
        sply: 23.714285714285715, // 同比值
        compare: '对比项2', // 对比项名称值
        value: 1211, // 指标值 （对应对比项）
        date: '2022-06-28', // 时间
      },
    ];

    return {
      ...toRefs(state),
      data,
    };
  },
});
export const multiCpNoTime = multiCpNoTimeTemplate.bind({});
multiCpNoTime.storyName = '基础（多对比项）';
multiCpNoTime.args = {};

// 时间对比（单对比项）
const singleCpHasTimeTemplate = (args) => ({
  components: { StatsCard },
  template: '<stats-card :data="data" :isCompare="isCompare"></stats-card>',
  setup() {
    const state = reactive({
      ...args,
    });
    const data = [
      {
        compare: '对比项1', // 对比项名称值（单个对比项时不显示）
        value: 1, // 指标值 （对应对比项）
        date: '2022-06-29', // 基础时间
        cpValue: 2449, // 对比时间指标值
        cp: -0.9995916700694161, // 对比时间 基础时间指标值的比率关系 cpValue-value/cpValue
        cpDate: '2022-06-28', // 对比时间
      },
    ];
    const isCompare = true;
    return {
      ...toRefs(state),
      isCompare,
      data,
    };
  },
});
export const singleCpHasTime = singleCpHasTimeTemplate.bind({});
singleCpHasTime.storyName = '时间对比（单对比项）';
singleCpHasTime.args = {};

// 时间对比（多对比项
const multiCpHasTimeTemplate = (args) => ({
  components: { StatsCard },
  template: '<stats-card :data="data" :isCompare="isCompare"></stats-card>',
  setup() {
    const state = reactive({
      ...args,
    });
    const data = [
      {
        compare: '对比项1', // 对比项名称值
        value: 1, // 指标值 （对应对比项）
        date: '2022-06-29', // 基础时间
        cpValue: 2449, // 对比时间指标值
        cp: -0.9995916700694161, // 对比时间 基础时间指标值的比率关系 cpValue-value/cpValue
        cpDate: '2022-06-28', // 对比时间
      },
      {
        compare: '对比项2', // 对比项名称值
        value: 1, // 指标值 （对应对比项）
        date: '2022-06-29', // 基础时间
        cpValue: 1211, // 对比时间指标值
        cp: -0.9991742361684558, // 对比时间 基础时间指标值的比率关系 cpValue-value/cpValue
        cpDate: '2022-06-28', // 对比时间
      },
    ];
    const isCompare = true;
    return {
      ...toRefs(state),
      data,
      isCompare,
    };
  },
});
export const multiCpHasTime = multiCpHasTimeTemplate.bind({});
multiCpHasTime.storyName = '时间对比（多对比项）';
multiCpHasTime.args = {};

// 无时间显示指标卡 设置高度72
const customTemplate = (args) => ({
  components: { StatsCard },
  template: `
  <div class="data" >
  <div> 数据 </div>
  <div> numAreaHeight = 76; showBorder = false; showDate = false; title = '声量' </div>
  <div>data = {{data}}</div>
  </div>


  <stats-card
   :data="data"
   :num-area-height="numAreaHeight"
   :show-date="showDate"
   :title="title"
   :show-border="showBorder"
   ></stats-card>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const data = [
      {
        // 环比数值
        lp: -0.7027933463884575,
        // 环比自定义名称
        lpName: '末日环比首日',
        // 环比显示是否初始数值 不转化为百分比
        lpShowNum: false,
        // 环比隐藏tooltip
        lpHideTip: true,
        // 同比数值
        sply: 21225499,
        // 同比自定义名称
        splyName: '日均声量',
        // 同比隐藏tooltip
        splyHideTip: true,
        // 环比是否显示初始数值 不转化为百分比
        splyShowNum: true,
        // 主要数值
        value: 66020,
        // 当前数据时间
        date: '2022-06-28',
      },
    ];
    // 不展示时间 数字区域设置为76（设计规范）
    const numAreaHeight = 76;
    // 标题
    const title = '声量';
    // 显示边框
    const showBorder = false;
    // 显示时间
    const showDate = false;

    return {
      ...toRefs(state),
      data,
      numAreaHeight,
      showDate,
      title,
      showBorder,
    };
  },
});
export const custom = customTemplate.bind({});
custom.storyName = '自定义配置';
custom.args = {};
custom.parameters = {
  docs: {
    description: {
      story: '不显示时间、外框，名称自定义配置的指标卡，具体配置参数看代码。',
    },
  },
};
