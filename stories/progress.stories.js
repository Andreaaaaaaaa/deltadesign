import { Progress as TProgress } from '../src/components/progress/index.ts';

export default {
  title: '数据展示/Progress 进度条',
};

const BaseTemplate = () => ({
  components: { TProgress },
  template: '<t-progress percentage="50" />',
  setup() {
    return {};
  },
});

export const base = BaseTemplate.bind({});

base.storyName = '基础进度条';

base.args = {};

base.argTypes = {
  color: {
    description:
      "进度条颜色。示例：'#ED7B2F' 或 'orange' 或 ['#f00', '#0ff', '#f0f'] 或 { '0%': '#f00', '100%': '#0ff' } 或 { from: '#000', to: '#000' } 等。TS 类型：string | Array<string> | Record<string, string>",
    table: {
      category: 'Props',
      type: {
        summary: 'String / Object / Array',
      },
      defaultValue: {
        summary: "''",
      },
    },
  },
  label: {
    description: '进度百分比，可自定义。TS 类型：string | boolean | TNode。',
    table: {
      category: 'Props',
      type: {
        summary: 'String / Boolean / Slot / Function',
      },
      defaultValue: {
        summary: 'true',
      },
    },
  },
  percentage: {
    description: '进度条百分比',
    table: {
      category: 'Props',
      type: {
        summary: 'Number',
      },
      defaultValue: {
        summary: '0',
      },
    },
  },
  size: {
    description: '进度条尺寸，示例：small/medium/large/240。small 值为 72； medium 值为 112；large 值为 160',
    table: {
      category: 'Props',
      type: {
        summary: 'String / Number',
      },
      defaultValue: {
        summary: "'medium'",
      },
    },
  },
  status: {
    description: '进度条状态。可选项：success/error/warning/active。TS 类型：StatusEnum。',
    table: {
      category: 'Props',
      type: {
        summary: 'String',
      },
      defaultValue: {
        summary: '-',
      },
    },
  },
  strokeWidth: {
    description: '进度条线宽。宽度数值不能超过 size 的一半，否则不能输出环形进度',
    table: {
      category: 'Props',
      type: {
        summary: 'String / Number',
      },
      defaultValue: {
        summary: '-',
      },
    },
  },
  theme: {
    description:
      '进度条风格。值为 line，标签（label）显示在进度条右侧；值为 plump，标签（label）显示在进度条里面；值为 circle，标签（label）显示在进度条正中间。可选项：line/plump/circle。TS 类型：ThemeEnum。',
    table: {
      category: 'Props',
      type: {
        summary: 'String',
      },
      defaultValue: {
        summary: 'line',
      },
    },
  },
  trackColor: {
    description: '进度条未完成部分颜色',
    table: {
      category: 'Props',
      type: {
        summary: 'String',
      },
      defaultValue: {
        summary: "''",
      },
    },
  },
};

const lineTemplate = (args) => ({
  components: { TProgress },
  template: `<div>
      <div class="story-title">线形/环形进度条</div>
      <div class="story-subtitle">以线形表示进度的组件，可以选择性地配有文字或图标补充显示进度和状态。多用于信息量较为丰富的情况。</div>
      <div class="story-subtitle">以环形表示进度的组件，环内可选择性地配有文字或图标补充显示进度和状态。多用于需要强调进度百分比的情况。</div>
      <div style="height: 80px">
        <t-progress :percentage="percentage" :status="status" :theme="theme" :label="label" :size="size" />
      </div>
    </div>`,
  setup() {
    return {
      ...args,
    };
  },
});

export const line = lineTemplate.bind({});

line.storyName = '线形/环形进度条';

line.args = {
  percentage: 10,
  status: '',
  theme: 'line',
  label: true,
  size: 'medium',
};

line.argTypes = {
  status: {
    control: {
      type: 'select',
      options: ['success', 'error', 'warning', 'active'],
    },
  },
  theme: {
    control: {
      type: 'select',
      options: ['line', 'plump', 'circle'],
    },
  },
  size: {
    control: {
      type: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

const colorTemplate = (args) => ({
  components: { TProgress },
  template: `<div>
      <div class="story-title">进度条颜色</div>
      <div class="story-subtitle">进度条的颜色及未完成部分颜色。</div>
      <div style="height: 80px">
        <t-progress :percentage="percentage" :color="color" :track-color="trackColor" />
      </div>
    </div>`,
  setup() {
    return {
      ...args,
    };
  },
});

export const color = colorTemplate.bind({});

color.storyName = '进度条颜色';

color.args = {
  percentage: 50,
  color: '#0052D9',
  trackColor: '#911140',
};
