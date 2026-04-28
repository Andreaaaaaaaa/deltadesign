import { reactive, toRefs } from 'vue';
import dayjs from 'dayjs';
import { DatePicker as TDatePicker } from '../src/components/date-picker/index.ts';
import '../src/assets/date-picker-hook.scss';

export default {
  title: '输入/DatePicker 日期选择器',
};

const BaseTemplate = () => ({
  components: { TDatePicker },
  template: '<t-date-picker v-model="value" mode="date" />',
  setup() {
    const state = reactive({
      value: '2022-06-06',
    });

    return {
      ...toRefs(state),
    };
  },
});

export const base = BaseTemplate.bind({});

base.storyName = '基础日期选择器';

base.args = {};

base.argTypes = {
  allowInput: {
    description: '是否允许输入日期',
    table: {
      category: 'Props',
      type: { summary: 'Boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  clearable: {
    description: '是否显示清除按钮',
    table: {
      category: 'Props',
      type: { summary: 'Boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  disabled: {
    description: '是否禁用组件',
    table: {
      category: 'Props',
      type: { summary: 'Boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  disableDate: {
    description:
      "禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。{ from: 'A', to: 'B' } 表示在 A 到 B 之间的日期会被禁用。{ before: 'A', after: 'B' } 表示在 A 之前和在 B 之后的日期都会被禁用。其中 A = '2021-01-01'，B = '2021-02-01'。值类型为 Function 则表示返回值为 true 的日期会被禁用。TS 类型：DisableDate type DisableDate = Array<DateValue> | DisableDateObj | ((date: DateValue) => boolean) interface DisableDateObj { from?: string; to?: string; before?: string; after?: string }。",
    table: {
      category: 'Props',
      type: { summary: 'Object / Array / Function' },
      defaultValue: { summary: '-' },
    },
  },
  enableTimePicker: {
    description: '是否显示时间选择',
    table: {
      category: 'Props',
      type: { summary: 'Boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  firstDayOfWeek: {
    description: '第一天从星期几开始。可选项：1/2/3/4/5/6/7',
    table: {
      category: 'Props',
      type: { summary: 'Number' },
      defaultValue: { summary: '-' },
    },
  },
  format: {
    description: "用于格式化日期，全局配置默认为：'YYYY-MM-DD'",
    table: {
      category: 'Props',
      type: { summary: 'String' },
      defaultValue: { summary: 'YYYY-MM-DD' },
    },
  },
  inputProps: {
    description: "透传给输入框（Input）组件的参数。TS 类型：InputProps import { InputProps } from '@Input'",
    table: {
      category: 'Props',
      type: { summary: 'Object' },
      defaultValue: { summary: '-' },
    },
  },
  mode: {
    description: '选择器模式。可选项：year/month/date',
    table: {
      category: 'Props',
      type: { summary: 'String' },
      defaultValue: { summary: 'month' },
    },
  },
  placeholder: {
    description: '占位符。TS 类型：string | Array<string>',
    table: {
      category: 'Props',
      type: { summary: 'String / Array' },
      defaultValue: { summary: '-' },
    },
  },
  popupProps: {
    description: "透传给 popup 组件的参数。TS 类型：PopupProps import { PopupProps } from '@Popup'",
    table: {
      category: 'Props',
      type: { summary: 'Object' },
      defaultValue: { summary: '-' },
    },
  },
  prefixIcon: {
    description: '用于自定义组件前置图标。TS 类型：TNode。',
    table: {
      category: 'Props',
      type: { summary: '	Slot / Function' },
      defaultValue: { summary: '-' },
    },
  },
  presets: {
    description:
      "预设快捷日期选择，示例：{ '元旦': '2021-01-01', '昨天': dayjs().subtract(1, 'day').format('YYYY-MM-DD'), '特定日期': () => ['2021-02-01'] }。TS 类型：PresetDate interface PresetDate { [name: string]: DateValue | (() => DateValue) }。",
    table: {
      category: 'Props',
      type: { summary: 'Object' },
      defaultValue: { summary: '-' },
    },
  },
  range: {
    description: '是否呈现为日期范围选择器',
    table: {
      category: 'Props',
      type: { summary: 'Boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  size: {
    description: '尺寸。可选项：small/medium/large',
    table: {
      category: 'Props',
      type: { summary: 'String' },
      defaultValue: { summary: 'medium' },
    },
  },
  suffixIcon: {
    description: '用于自定义组件后置图标。TS 类型：TNode。',
    table: {
      category: 'Props',
      type: { summary: 'Slot / Function' },
      defaultValue: { summary: '-' },
    },
  },
  timePickerProps: {
    description: "透传 TimePicker 组件属性。TS 类型：TimePickerProps import { TimePickerProps } from '@TimePicker'。",
    table: {
      category: 'Props',
      type: { summary: 'Object' },
      defaultValue: { summary: '-' },
    },
  },
  value: {
    description:
      '选中值。支持语法糖 v-model 或 v-model:value。TS 类型：DateValue type DateValue = string | Date | Array<DateValue>。',
    table: {
      category: 'Props',
      type: { summary: 'String / Array / Date' },
      defaultValue: { summary: '-' },
    },
  },
  defaultValue: {
    description: '选中值。非受控属性。TS 类型：DateValue type DateValue = string | Date | Array<DateValue>。',
    table: {
      category: 'Props',
      type: { summary: 'String / Array / Date' },
      defaultValue: { summary: '-' },
    },
  },
  onBlur: {
    description: 'TS 类型：(context: { value: DateValue; e: FocusEvent }) => void',
    table: {
      category: 'Props',
      type: { summary: 'Function' },
      defaultValue: { summary: '-' },
    },
  },
  onChange: {
    description: 'TS 类型：(value: DateValue) => void 选中值发生变化时触发',
    table: {
      category: 'Props',
      type: { summary: 'Function' },
      defaultValue: { summary: '-' },
    },
  },
  onFocus: {
    description: 'TS 类型：(context: { value: DateValue; e: FocusEvent }) => void 输入框获得焦点时触发',
    table: {
      category: 'Props',
      type: { summary: 'Function' },
      defaultValue: { summary: '-' },
    },
  },
  onInput: {
    description:
      'TS 类型：(context: { input: string; value: DateValue; e: InputEvent }) => void 输入框数据发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值',
    table: {
      category: 'Props',
      type: { summary: 'Function' },
      defaultValue: { summary: '-' },
    },
  },
};

const modeTemplate = (args) => ({
  components: { TDatePicker },
  template: `<div>
    <div class="story-title">年份/月份/日期选择器</div>
    <div class="story-subtitle">选择器模式。可选项：year/month/date。</div>
    <t-date-picker :mode="mode" :format="format" clearable />
  </div>`,
  setup() {
    let format = 'YYYY';
    if (args.mode === 'month') {
      format = 'YYYY-MM';
    } else if (args.mode === 'date') {
      format = 'YYYY-MM-DD';
    }

    return {
      format,
      ...args,
    };
  },
});

export const mode = modeTemplate.bind({});

mode.storyName = '年份/月份/日期选择器';

mode.args = {
  mode: 'month',
};

mode.argTypes = {
  mode: {
    control: {
      type: 'select',
      options: ['year', 'month', 'date'],
    },
  },
};

const dateTimeTemplate = (args) => ({
  components: { TDatePicker },
  template: `<div>
    <div class="story-title">日期时间选择器</div>
    <div class="story-subtitle">用于日期和时间相关联的选择。用户需要输入包含时间在内的日期时使用。</div>
    <t-date-picker
      theme="primary"
      mode="date"
      format="YYYY-MM-DD HH:mm:ss"
      :enable-time-picker="enableTimePicker"
    />
  </div>`,
  setup() {
    return {
      ...args,
    };
  },
});

export const dateTime = dateTimeTemplate.bind({});

dateTime.storyName = '日期时间选择器';

dateTime.args = {
  enableTimePicker: true,
};

const dateRangeTemplate = (args) => ({
  components: { TDatePicker },
  template: `<div>
    <div class="story-title">日期区间选择器</div>
    <div class="story-subtitle">用于某一段日期的选择。用户需要输入一段日期区间时使用。</div>
    <t-date-picker
      mode="date"
      :range="range"
      clearable
      :enable-time-picker="enableTimePicker"
      style="width: 350px"
    />
  </div>`,
  setup() {
    return {
      ...args,
    };
  },
});

export const dateRange = dateRangeTemplate.bind({});

dateRange.storyName = '日期区间选择器';

dateRange.args = {
  range: true,
  enableTimePicker: false,
};

const datePresetsAltTemplate = (args) => ({
  components: { TDatePicker },
  template: `<div>
    <div class="story-title">带快捷标签的日期选择器</div>
    <div class="story-subtitle">具有可提前设置的时间标签。当日期信息具有规律性，需要点击标签快捷输入时。</div>
    <t-date-picker :presets="presets" mode="date">
      <template #default="{ trigger }">
        <t-button
          v-for="(value, key) in presets"
          :key="key"
          theme="primary"
          variant="text"
          @click="trigger('click', value, true)"
        >
          {{ key }}
        </t-button>
      </template>
    </t-date-picker>
  </div>`,
  setup() {
    return {
      // presets,
      ...args,
    };
  },
});

export const datePresetsAlt = datePresetsAltTemplate.bind({});

datePresetsAlt.storyName = '带快捷标签的日期选择器';

datePresetsAlt.args = {
  presets: {
    '7天前': dayjs().subtract(6, 'day'),
    今天: dayjs(),
  },
};

const disableDateTemplate = (args) => ({
  components: { TDatePicker },
  template: `<div>
    <div class="story-title">可禁用日期的选择器</div>
    <div class="story-subtitle">可将不支持用户选择的日期禁止点击。</div>
    <t-date-picker mode="date" :disable-date="disableDate" :range="range" />
  </div>`,
  setup() {
    return {
      ...args,
    };
  },
});

export const disableDate = disableDateTemplate.bind({});

disableDate.storyName = '可禁用日期的选择器';

disableDate.args = {
  disableDate: {
    before: dayjs().subtract(6, 'day').format('YYYY-MM-DD'),
    after: dayjs().add(3, 'day').format('YYYY-MM-DD'),
  },
  range: false,
};

disableDate.argTypes = {
  disableDate: {
    control: {
      type: 'object',
    },
  },
};

const firstDayOfWeekTemplate = (args) => ({
  components: { TDatePicker },
  template: `<div>
    <div class="story-title">指定周起始日的选择器</div>
    <div class="story-subtitle">可以通过 \`firstDayOfWeek\` 属性指定一周从星期几开始，仅在日期选择时(\`mode = date\`) 时有效，默认为 1 即从周一开始，如下可以设置为周日开始。</div>
    <t-date-picker mode="date" :first-day-of-week="firstDayOfWeek"></t-date-picker>
  </div>`,
  setup() {
    return {
      ...args,
    };
  },
});

export const firstDayOfWeek = firstDayOfWeekTemplate.bind({});

firstDayOfWeek.storyName = '指定周起始日的选择器';

firstDayOfWeek.args = {
  firstDayOfWeek: 7,
};

const customIconTemplate = (args) => ({
  components: { TDatePicker },
  template: `<div>
    <div class="story-title">自定义图标的选择器</div>
    <div class="story-subtitle">支持通过 \`prefixIcon\` 和 \`suffixIcon\` 自定义设置前缀和后缀图标。</div>
    <t-date-picker theme="primary" mode="date" clearable :disabled="disabled" >
      <template #suffixIcon>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="14" height="14" rx="1" fill="currentColor" />
          <path
            d="M6.92495 5.16592H8.21711L6.18599 10.8534H5.01093L3 5.16592H4.32851L5.62067 9.4836L6.92495 5.16592Z"
            fill="white"
          />
          <path
            d="M9.30522 9.09775C9.34291 9.35756 9.41694 9.55177 9.52731 9.68039C9.72921 9.91447 10.0751 10.0315 10.5651 10.0315C10.8585 10.0315 11.0968 10.0006 11.2798 9.93891C11.6271 9.82058 11.8007 9.60064 11.8007 9.2791C11.8007 9.09132 11.7146 8.94598 11.5423 8.84309C11.37 8.74277 11.0994 8.65402 10.7306 8.57685L10.1007 8.4418C9.48155 8.30804 9.05352 8.1627 8.81662 8.00579C8.41551 7.74341 8.21496 7.33312 8.21496 6.77492C8.21496 6.26559 8.40878 5.84244 8.79643 5.50547C9.18408 5.16849 9.75344 5 10.5045 5C11.1317 5 11.6661 5.15949 12.1076 5.47846C12.5518 5.79486 12.7846 6.25531 12.8062 6.85981H11.6109C11.5894 6.51768 11.4333 6.2746 11.1425 6.13055C10.9487 6.03537 10.7078 5.98778 10.4197 5.98778C10.0994 5.98778 9.84362 6.04952 9.65249 6.17299C9.46136 6.29646 9.36579 6.46881 9.36579 6.69003C9.36579 6.89325 9.46001 7.04502 9.64845 7.14534C9.76959 7.21222 10.028 7.29068 10.4237 7.38071L11.4494 7.61608C11.899 7.71897 12.2382 7.85659 12.467 8.02894C12.8223 8.29646 13 8.6836 13 9.19035C13 9.70997 12.7914 10.1421 12.3741 10.4868C11.9595 10.8289 11.3727 11 10.6135 11C9.83824 11 9.2285 10.8315 8.78432 10.4945C8.34014 10.155 8.11804 9.68939 8.11804 9.09775H9.30522Z"
            fill="white"
          />
        </svg>
      </template>
    </t-date-picker>
  </div>`,
  setup() {
    return {
      ...args,
    };
  },
});

export const customIcon = customIconTemplate.bind({});

customIcon.storyName = '自定义图标的选择器';

customIcon.args = {
  disabled: false,
};
