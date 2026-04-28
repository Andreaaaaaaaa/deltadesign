import { reactive, toRefs } from 'vue';
import TimePicker, {
  TimePicker as TTimePicker,
  TimeRangePicker as TTimeRangePicker,
} from '../src/components/time-picker/index.ts';
import '../src/assets/time-picker-hook.scss';

export default {
  title: '输入/TimePicker 时间选择器',
};

const Template = () => ({
  components: { TimePicker },
  template: '<TimePicker v-model="value" />',
  setup() {
    const state = reactive({
      value: '12:20:30',
    });

    return {
      ...toRefs(state),
    };
  },
});

export const base = Template.bind({});

base.storyName = '基础时间选择器';

base.args = {};

base.argTypes = {
  allowInput: {
    description: '是否允许直接输入时间',
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
  clearable: {
    description: '是否允许清除选中值',
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
  disableTime: {
    description: '禁用时间项。TS 类型：(h: number, m: number, s: number) => boolean',
    table: {
      category: 'Props',
      type: {
        summary: 'Function',
      },
      defaultValue: {
        summary: '-',
      },
    },
  },
  format: {
    description: '用于格式化时间。',
    table: {
      category: 'Props',
      type: {
        summary: 'String',
      },
      defaultValue: {
        summary: "'HH:mm:ss'",
      },
    },
  },
  hideDisabledTime: {
    description: '是否隐藏禁用状态的时间项',
    table: {
      category: 'Props',
      type: {
        summary: 'Boolean',
      },
      defaultValue: {
        summary: 'true',
      },
    },
  },
  placeholder: {
    description: '占位符',
    table: {
      category: 'Props',
      type: {
        summary: 'String',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  size: {
    description: '尺寸。可选项：small/medium/large',
    table: {
      category: 'Props',
      type: {
        summary: 'String',
      },
      defaultValue: {
        summary: 'medium',
      },
    },
  },
  steps: {
    description:
      "时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ['2', '1', '1']。TS 类型：Array<string | number>",
    table: {
      category: 'Props',
      type: {
        summary: 'Array',
      },
      defaultValue: {
        summary: '() => [1, 1, 1]',
      },
    },
  },
  value: {
    description: '选中值。支持语法糖 v-model 或 v-model:value。TS 类型：TimePickerValue。详细类型定义',
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
  defaultValue: {
    description: '选中值。非受控属性。TS 类型：TimePickerValue。详细类型定义',
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
  onBlur: {
    description:
      "TS 类型：(context: { trigger: 'hour' | 'minute' | 'second'; input: string; value: TimePickerValue; e: FocusEvent }) => void 当输入框失去焦点时触发，参数 input 表示输入框内容，value 表示组件当前有效值，trigger 表示触发源头",
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
  onChange: {
    description: 'TS 类型：(value: TimePickerValue) => void 选中值发生变化时触发',
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
  onClose: {
    description: 'TS 类型：(context: { e: MouseEvent }) => void 面板关闭时触发',
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
  onFocus: {
    description:
      "TS 类型：(context: { trigger: 'hour' | 'minute' | 'second'; input: string; value: TimePickerValue; e: FocusEvent }) => void 输入框获得焦点时触发，参数 input 表示输入框内容，value 表示组件当前有效值，trigger 表示触发源头",
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
  onInput: {
    description:
      'TS 类型：(context: { input: string; value: TimePickerValue; e: InputEvent }) => void 当输入框内容发生变化时触发，参数 input 表示输入框内容，value 表示组件当前有效值',
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
  onOpen: {
    description: 'TS 类型：(context: { e: MouseEvent }) => void 面板打开时触发',
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

const hmsTemplate = (args) => ({
  components: { TTimePicker },
  template: `<div>
      <div class="story-title">时分秒选择器</div>
      <div class="story-subtitle">由时、分、秒三部分组成的选择界面。用户需要输入精度到秒的时间时使用</div>
      <t-time-picker v-model="value" @change="timeChange" @open="open" @close="close" :format="format" />
    </div>`,
  setup() {
    const state = reactive({
      value: '12:20:30',
    });

    const timeChange = (time) => {
      console.log(time);
    };
    const open = () => {
      console.log('open');
    };
    const close = () => {
      console.log('close');
    };

    return {
      ...toRefs(state),
      ...args,
      timeChange,
      open,
      close,
    };
  },
});

export const hms = hmsTemplate.bind({});

hms.storyName = '时分秒选择器';

hms.args = {
  format: 'HH:mm:ss',
};

const showStepsTemplate = (args) => ({
  components: { TTimePicker },
  template: `<div>
      <div class="story-title">自定义步长时间选择器</div>
      <div class="story-subtitle">由时、分两部分组成的选择界面，且分钟刻度步长大于 1。用户对时间精度要求不高的场景，如数据筛选。</div>
      <t-time-picker :steps="steps" />
    </div>`,
  setup() {
    return {
      ...args,
    };
  },
});

export const showSteps = showStepsTemplate.bind({});

showSteps.storyName = '自定义步长时间选择器';

showSteps.args = {
  steps: [1, 2, 3],
};

const twelveHourMeridianTemplate = (args) => ({
  components: { TTimePicker },
  template: `<div>
      <div class="story-title">十二小时制时间选择器</div>
      <div class="story-subtitle">12 小时制式的时间格式显示。用户需要以 12 小时制式显示时间时使用。</div>
      <t-time-picker v-model="value" :format="format" placeholder="选择时间" />
    </div>`,
  setup() {
    const state = reactive({
      value: 'PM 10:20:30',
    });

    return {
      ...args,
      ...toRefs(state),
    };
  },
});

export const twelveHourMeridian = twelveHourMeridianTemplate.bind({});

twelveHourMeridian.storyName = '十二小时制时间选择器';

twelveHourMeridian.args = {
  format: 'A hh:mm:ss',
};

const rangeTemplate = (args) => ({
  components: { TTimeRangePicker },
  template: `<div>
      <div class="story-title">时间区间选择器</div>
      <div class="story-subtitle">用于某一段时间的选择。用户需要输入一段时间区间时使用。</div>
      <t-time-range-picker v-model="value" class="demos" clearable :format="format" allow-input />
    </div>`,
  setup() {
    const state = reactive({
      value: ['00:00:00', '23:59:59'],
    });

    return {
      ...args,
      ...toRefs(state),
    };
  },
});

export const range = rangeTemplate.bind({});

range.storyName = '时间区间选择器';

range.args = {
  format: 'HH:mm:ss',
};

const keyboardTemplate = (args) => ({
  components: { TTimePicker },
  template: `<div>
      <div class="story-title">可通过键盘直接输入</div>
      <div class="story-subtitle">默认开启改功能，当选中时、分、秒中的某一项时，可通过数字键盘直接输入或方向键进行时、分、秒的修改。</div>
      <t-time-picker v-model="time" :allow-input="allowInput" @blur="blur" @focus="focus" />
    </div>`,
  setup() {
    const state = reactive({
      time: '20:22:33',
    });

    const blur = (v) => {
      console.log('blur');
      console.log(v);
    };
    const focus = (v) => {
      console.log('focus');
      console.log(v);
    };

    return {
      ...toRefs(state),
      ...args,
      blur,
      focus,
    };
  },
});

export const keyboard = keyboardTemplate.bind({});

keyboard.storyName = '可通过键盘直接输入';

keyboard.args = {
  allowInput: true,
};

const hideClearButtonTemplate = (args) => ({
  components: { TTimePicker },
  template: `<div>
      <div class="story-title">不展示清空按钮</div>
      <div class="story-subtitle">限定组件不具备清空按钮。默认组件将会在具备时间值的时候展示清空按钮。</div>
      <t-time-picker v-model="time" :clearable="clearable" />
    </div>`,
  setup() {
    const state = reactive({
      time: '20:22:33',
    });

    return {
      ...toRefs(state),
      ...args,
    };
  },
});

export const hideClearButton = hideClearButtonTemplate.bind({});

hideClearButton.storyName = '不展示清空按钮';

hideClearButton.args = {
  clearable: false,
};

const disabledTemplate = (args) => ({
  components: { TTimePicker },
  template: `<div>
      <div class="story-title">禁用</div>
      <div class="story-subtitle">禁止组件的使用。</div>
      <t-time-picker v-model="time" :disabled="disabled" />
    </div>`,
  setup() {
    const state = reactive({
      time: '11:12:10',
    });

    return {
      ...toRefs(state),
      ...args,
    };
  },
});

export const disabled = disabledTemplate.bind({});

disabled.storyName = '禁用';

disabled.args = {
  disabled: true,
};
