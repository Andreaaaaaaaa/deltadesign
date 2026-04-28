import { reactive, toRefs } from 'vue';
import { Slider as TSlider } from '../src/components/slider/index.ts';

export default {
  title: '输入/Slider 滑块',
};

const BaseTemplate = () => ({
  components: { TSlider },
  template: '<t-slider />',
  setup() {
    return {};
  },
});

export const base = BaseTemplate.bind({});

base.storyName = '基础滑块';

base.args = {};

base.argTypes = {
  disabled: {
    description: '是否禁用组件',
    table: {
      category: 'Props',
      type: {
        summary: 'Boolean',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  inputNumberProps: {
    description:
      '用于控制数字输入框组件，值为 false 表示不显示数字输入框；值为 true 表示呈现默认数字输入框；值类型为 Object 表示透传属性到数字输入框组件。TS 类型：InputNumberProps。',
    table: {
      category: 'Props',
      type: {
        summary: 'Boolean / Object',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  label: {
    description:
      '滑块当前值文本。值为 true 显示默认文案，值为 false 不显示滑块当前值文本，值为 value 则表示组件会根据占位符渲染文案。TS 类型：string | boolean | TNode。',
    table: {
      category: 'Props',
      type: {
        summary: 'String / Boolean / Slot / Function',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  layout: {
    description: '滑块布局方向。可选项：vertical/horizontal',
    table: {
      category: 'Props',
      type: {
        summary: 'String',
      },
      defaultValue: {
        summary: 'horizontal',
      },
    },
  },
  marks: {
    description:
      "刻度标记，示例：[0, 10, 40, 200] 或者 { 10: (val) => val + '%', 50: (h, val) => <button>{val}</button> }。TS 类型：Array<number> | SliderMarks。通用类型定义。",
    table: {
      category: 'Props',
      type: {
        summary: 'Object / Array',
      },
      defaultValue: {
        summary: '-',
      },
    },
  },
  max: {
    description: '滑块范围最大值',
    table: {
      category: 'Props',
      type: {
        summary: 'Number',
      },
      defaultValue: {
        summary: '100',
      },
    },
  },
  min: {
    description: '滑块范围最小值',
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
  range: {
    description: '双游标滑块',
    table: {
      category: 'Props',
      type: {
        summary: 'Boolean',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  step: {
    description: '步长',
    table: {
      category: 'Props',
      type: {
        summary: 'Number',
      },
      defaultValue: {
        summary: '1',
      },
    },
  },
  tooltipProps: {
    description: '透传提示组件属性。TS 类型：TooltipProps。',
    table: {
      category: 'Props',
      type: {
        summary: 'Object',
      },
      defaultValue: {
        summary: '-',
      },
    },
  },
  value: {
    description: '滑块值。支持语法糖 v-model 或 v-model:value。TS 类型：SliderValue。',
    table: {
      category: 'Props',
      type: {
        summary: 'Number / Array',
      },
      defaultValue: {
        summary: '-',
      },
    },
  },
  defaultValue: {
    description: '滑块值。非受控属性。TS 类型：SliderValue。',
    table: {
      category: 'Props',
      type: {
        summary: 'Number / Array',
      },
      defaultValue: {
        summary: '-',
      },
    },
  },
  onChange: {
    description: 'TS 类型：(value: SliderValue) => void 滑块值变化时触发',
    table: {
      category: 'Props',
      type: {
        summary: 'Function',
      },
      defaultValue: {
        summary: '',
      },
    },
  },
};

const verticalTemplate = (args) => ({
  components: { TSlider },
  template: `<div>
      <div class="story-title">纵向滑块</div>
      <div class="story-subtitle">滑块，有单游标滑块和双游标两种类型。布局方向可分为横向滑块和纵向滑块。</div>
      <div style="height: 80px">
        <t-slider v-model="value" :range="range" :layout="layout" :min="min" :max="max" :disabled="disabled" />
      </div>
    </div>`,
  setup() {
    const state = reactive({
      value: args.range ? [0, 12] : 12,
    });

    return {
      ...toRefs(state),
      ...args,
    };
  },
});

export const vertical = verticalTemplate.bind({});

vertical.storyName = '横向/纵向滑块';

vertical.args = {
  layout: 'vertical',
  range: false,
  disabled: false,
  min: 0,
  max: 100,
};

vertical.argTypes = {
  layout: {
    control: {
      type: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
};

const marksTemplate = (args) => ({
  components: { TSlider },
  template: `<div>
      <div class="story-title">带刻度值的滑块</div>
      <div class="story-subtitle">可对滑块进行刻度值的配置，对滑块有更清晰的描述。</div>
      <div style="height: 80px">
        <t-slider v-model="value" :marks="marks" />
      </div>
    </div>`,
  setup() {
    const state = reactive({
      value: 12,
    });

    return {
      ...toRefs(state),
      ...args,
    };
  },
});

export const marks = marksTemplate.bind({});

marks.storyName = '带刻度值的滑块';

marks.args = {
  marks: [10, 20, 40, 80],
};

const inputNumberTemplate = (args) => ({
  components: { TSlider },
  template: `<div>
      <div class="story-title">数字输入框</div>
      <div class="story-subtitle">组件内提供数字输入框，可进行搭配使用，帮用户对数值进行精确输入、快速的调整。</div>
      <div style="height: 180px">
        <t-slider v-model="value" :range="range" :layout="layout" :disabled="disabled" :input-number-props="inputNumberProps" />
      </div>
    </div>`,
  setup() {
    const state = reactive({
      value: args.range ? [0, 12] : 12,
    });

    return {
      ...toRefs(state),
      ...args,
    };
  },
});

export const inputNumber = inputNumberTemplate.bind({});

inputNumber.storyName = '数字输入框';

inputNumber.args = {
  layout: 'vertical',
  range: false,
  disabled: false,
  inputNumberProps: { theme: 'column' },
};

inputNumber.argTypes = {
  layout: {
    control: {
      type: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
};

const stepTemplate = (args) => ({
  components: { TSlider },
  template: `<div>
      <div class="story-title">设置步长</div>
      <div class="story-subtitle">可对滑块进行步长的设置。</div>
      <div style="height: 80px">
        <t-slider v-model="value" :step="step" />
      </div>
    </div>`,
  setup() {
    const state = reactive({
      value: 10,
    });

    return {
      ...toRefs(state),
      ...args,
    };
  },
});

export const step = stepTemplate.bind({});

step.storyName = '设置步长';

step.args = {
  step: 10,
};
