import { reactive, ref, toRefs } from 'vue';
import dayjs from 'dayjs';
import { mergeObject } from '@tencent/awcharts-shared-utils';
import enConfig from 'tdesign-vue-next/es/locale/en_US';
// import enConfig from '../src/components/locale/en_us.ts';
import RangePicker, { CustomDatePicker } from '../src/components/range-picker/index.ts';
import { getPickerTime, getPickerCompareTime } from '../src/components/range-picker/utils.ts';
import { ConfigProvider, Input as TInput } from '../src/components';

export default {
  title: '输入/RangePicker 范围选择器',
  // component: RangePicker,
};

const Template = () => ({
  components: { RangePicker },
  template: '<RangePicker :value="value" @change="changeValue" />',
  setup() {
    const state = reactive({
      value: {
        time: [new Date(), new Date()],
      },
    });

    const changeValue = (val) => {
      state.value = val.value;
    };

    return {
      ...toRefs(state),
      changeValue,
    };
  },
});

export const base = Template.bind({});

base.storyName = '基础范围选择器';

base.args = {};

base.argTypes = {
  allowClear: {
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
      "禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。{ from: 'A', to: 'B' } 表示在 A 到 B 之间的日期会被禁用。{ before: 'A', after: 'B' } 表示在 A 之前和在 B 之后的日期都会被禁用。其中 A = '2021-01-01'，B = '2021-02-01'。值类型为 Function 则表示返回值为 true 的日期会被禁用。TS 类型：DisableDate type DisableDate = DateValue[] | DisableDateObj | ((date: DateValue) => boolean) interface DisableDateObj { from?: string; to?: string; before?: string; after?: string }。",
    table: {
      category: 'Props',
      type: { summary: 'Object / Array / Function' },
      defaultValue: { summary: '-' },
    },
  },
  isCompare: {
    description: '是否对比',
    table: {
      category: 'Props',
      type: { summary: 'Boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  placeholder: {
    description: '占位符。',
    table: {
      category: 'Props',
      type: { summary: 'String' },
      defaultValue: { summary: '请选择时间' },
    },
  },
  rangeTimeOptions: {
    description:
      "侧边栏额外配置按钮。TS type RangeTimeOptions = Array<{ title: string; type: string; size?: 'small' | 'medium' | 'large'; relative?: boolean; isCompare?: boolean; time: Date[]; }>",
    table: {
      category: 'Props',
      type: { summary: 'Array' },
      defaultValue: { summary: '-' },
    },
  },
  showCompare: {
    description: '是否展示对比',
    table: {
      category: 'Props',
      type: { summary: 'Boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  showShortcut: {
    description: '是否展示快捷按钮（侧边栏）',
    table: {
      category: 'Props',
      type: { summary: 'Boolean' },
      defaultValue: { summary: 'true' },
    },
  },
  showSpecificTime: {
    description: '是否展示具体时间（输入框）',
    table: {
      category: 'Props',
      type: { summary: 'Boolean' },
      defaultValue: { summary: 'true' },
    },
  },
  value: {
    description: '时间。TS 类型：interface RangeValue { type?: string; time: Date[]; }',
    table: {
      category: 'Props',
      type: { summary: 'Object' },
      defaultValue: { summary: '-' },
    },
  },
  compareValue: {
    description: '对比时间。TS 类型：interface RangeValue { type?: string; time: Date[]; }',
    table: {
      category: 'Props',
      type: { summary: 'Object' },
      defaultValue: {
        summary: JSON.stringify({
          type: 'custom',
          time: ['new Date()', 'new Date()'],
        }),
      },
    },
  },
  onChange: {
    description:
      'TS 类型：(value: { value: RangeValue; isCompare: Boolean; compareValue: RangeValue[] }) => void 选中值发生变化时触发',
    table: {
      category: 'Props',
      type: { summary: 'Function' },
      defaultValue: { summary: '-' },
    },
  },
};

const showTimeSelectTemplate = (args) => ({
  components: { RangePicker, CustomDatePicker },
  template: `<div>
      <div class="story-title">精细到时分秒选择的选择器</div>
      <div class="story-subtitle">选择器是否精确到时分秒。</div>
      <range-picker
        :show-compare="true"
        :value="value"
        :compare-value="compareValue"
        mode="Hms"
        :is-compare="isCompare"
        :allow-clear="true"
        @change="changeValue($event, 'Hms')"
      />
      <div style="margin: 10px"></div>
      <range-picker
        :show-compare="true"
        :value="value"
        :compare-value="compareValue"
        mode="Hm"
        :is-compare="isCompare"
        @change="changeValue($event, 'Hm')"
      />
      <div style="margin: 10px"></div>
      <range-picker
        :show-compare="true"
        :value="value"
        :compare-value="compareValue"
        mode="H"
        :is-compare="isCompare"
        @change="changeValue($event, 'H')"
      />
      <div style="margin: 10px"></div>
      <custom-date-picker
        :value="singleValue"
        :compare-value="singleCompareValue"
        :is-compare="isSingleCompare"
        :show-compare="true"
        :allowClear="true"
        placeholder="自定义时间选择器"
        mode="Hms"
        @change="changeSingleValue($event, 'Hms')"
      />
      <div style="margin: 10px"></div>
      <custom-date-picker
        :value="singleValue"
        :compare-value="singleCompareValue"
        :is-compare="isSingleCompare"
        :show-compare="true"
        :allowClear="true"
        placeholder="自定义时间选择器"
        mode="Hm"
        @change="changeSingleValue($event, 'Hm')"
      />
      <div style="margin: 10px"></div>
      <custom-date-picker
        :value="singleValue"
        :compare-value="singleCompareValue"
        :is-compare="isSingleCompare"
        :show-compare="true"
        :allowClear="true"
        placeholder="自定义时间选择器"
        mode="H"
        @change="changeSingleValue($event, 'H')"
      />
    </div>`,
  setup() {
    const state = reactive({
      value: {
        type: `d-6:${dayjs().format('HHmmss')}~d-0:${dayjs().format('HHmmss')}`,
        time: [dayjs().subtract(6, 'd').toDate(), new Date()],
      },
      isCompare: false,
      compareValue: [],
      singleValue: {
        type: `d-0:060100`,
        time: new Date('2024-01-03 06:01:00'),
      },
      isSingleCompare: false,
      singleCompareValue: [],
    });

    const changeValue = (val, mode) => {
      console.log('🤔 val 是 ', val);
      console.log('🤔 getPickerTime结果', getPickerTime(val.value.type, mode, false));
      console.log(
        '🤔 getPickerCompareTime结果',
        val.compareValue.map((item) => {
          return getPickerCompareTime(item.type, val.value.time, mode, false);
        }),
      );
      state.value = val.value;
      state.isCompare = val.isCompare;
      state.compareValue = val.compareValue;
    };

    const changeSingleValue = (val, mode) => {
      console.log('🤔 val 是 ', val);
      console.log('🤔 getPickerTime结果', getPickerTime(val.value.type, mode, true));
      console.log(
        '🤔 getPickerCompareTime结果',
        val.compareValue.map((item) => {
          return getPickerCompareTime(item.type, val.value.time, mode, true);
        }),
      );
      state.singleValue = val.value;
      state.isSingleCompare = val.isCompare;
      state.singleCompareValue = val.compareValue;
    };

    return {
      ...toRefs(state),
      ...args,
      changeValue,
      changeSingleValue,
    };
  },
});

export const showTimeSelect = showTimeSelectTemplate.bind({});

showTimeSelect.storyName = '精细到时分秒的选择器';

showTimeSelect.args = {};

const WeekTemplate = () => ({
  components: { RangePicker, CustomDatePicker },
  template: `
  <div>
  区间选择
  <input @input="test" />
  <RangePicker :value="value" mode="week" @change="changeValue" />
  </div>
  <div>
  单选
  <custom-date-picker :firstDayOfWeek="firstDayOfWeek" :value="value2" mode="week" @change="changeValue2" />
  </div>`,
  setup() {
    const state = reactive({
      value: {
        time: [new Date(), new Date()],
      },
      value2: {
        time: new Date(),
      },
    });

    const changeValue = (val) => {
      state.value = val.value;
    };
    const changeValue2 = (val) => {
      state.value2 = val.value;
    };

    const firstDayOfWeek = ref(5);

    const test = (e) => {
      console.log(e.target.value);
      if (+e.target.value >= 1 && +e.target.value <= 7) {
        firstDayOfWeek.value = +e.target.value;
      }
    };

    return {
      ...toRefs(state),
      changeValue,
      changeValue2,
      firstDayOfWeek,
      test
    };
  },
});

export const week = WeekTemplate.bind({});

week.storyName = 'Week 选择器';

week.args = {};

const allowClearTemplate = (args) => ({
  components: { RangePicker },
  template: `<div>
      <div class="story-title">展示清空按钮</div>
      <div class="story-subtitle">限定组件具备清空按钮。</div>
      <div>
        <RangePicker size="small" :show-compare="true" :value="value" :allow-clear="allowClear" :borderless="borderless" @change="changeValue" >
          <template #panelTip="{ date }">
            <div v-if="showTip(date)" class="aw-text-right">
              <svg-icon class="aw-text-warning-60 aw-mr-1" name="error-circle-filled" /><span class="aw-text-sm aw-mr-3"
                >该业务自起产生数据</span
              >
            </div>
          </template>
          <template #dynamicTip="{ date }">
            <div v-if="showTip(date)" class="aw-text-right">
              <svg-icon class="aw-text-warning-60 aw-mr-1" name="error-circle-filled" /><span class="aw-text-sm aw-mr-3"
                >该业务自起产生数据</span
              >
            </div>
          </template>
        </RangePicker>
      </div>
    </div>`,
  setup() {
    const state = reactive({
      value: {
        type: 'custom',
        time: [new Date(), new Date()],
      },
    });

    const showTip = (date) => {
      if (date) {
        return dayjs('2022-12-31').format('YYYYMMDD') >= dayjs(date).format('YYYYMMDD');
      }
      return false;
    };

    const changeValue = (val) => {
      state.value = val.value;
    };

    return {
      ...toRefs(state),
      ...args,
      changeValue,
      showTip,
    };
  },
});

export const clear = allowClearTemplate.bind({});

clear.storyName = '展示清空按钮';

clear.args = {
  allowClear: true,
  borderless: false,
};

const disabledTemplate = (args) => ({
  components: { RangePicker },
  template: `<div>
      <div class="story-title">禁用</div>
      <div class="story-subtitle">禁止组件的使用。</div>
      <RangePicker :value="value" :disabled="disabled" @change="changeValue" />
    </div>`,
  setup() {
    const state = reactive({
      value: {
        time: [new Date(), new Date()],
      },
    });

    const changeValue = (val) => {
      state.value = val.value;
    };

    return {
      ...toRefs(state),
      ...args,
      changeValue,
    };
  },
});

export const disabled = disabledTemplate.bind({});

disabled.storyName = '禁用';

disabled.args = {
  disabled: false,
};

const disableDateTemplate = (args) => ({
  components: { RangePicker },
  template: `<div>
      <div class="story-title">可禁用日期的选择器</div>
      <div class="story-subtitle">可将不支持用户选择的日期禁止点击。</div>
      <RangePicker :value="value" :show-shortcut="false" :disable-date="disableDate" @change="changeValue" />
    </div>`,
  setup() {
    const state = reactive({
      value: {
        time: [new Date(), new Date()],
      },
    });

    const changeValue = (val) => {
      state.value = val.value;
    };

    return {
      ...toRefs(state),
      ...args,
      changeValue,
    };
  },
});

export const disableDate = disableDateTemplate.bind({});

disableDate.storyName = '可禁用日期的选择器';

disableDate.args = {
  disableDate: {
    from: dayjs().add(3, 'day').format(),
    to: dayjs().add(6, 'day').format(),
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

const rangeTimeOptionsTemplate = (args) => ({
  components: { RangePicker },
  template: `<div>
      <div class="story-title">侧边栏配置额外按钮</div>
      <div class="story-subtitle">侧边栏支持配置额外按钮。</div>
      <RangePicker :value="value" :range-time-options="rangeTimeOptions" size="small" show-compare @change="changeValue" />
    </div>`,
  setup() {
    const state = reactive({
      value: {
        type: 'ninetyDate',
        time: [new Date(), new Date()],
      },
    });

    const changeValue = (val) => {
      state.value = val.value;
    };

    return {
      ...toRefs(state),
      ...args,
      changeValue,
    };
  },
});

export const rangeTimeOptions = rangeTimeOptionsTemplate.bind({});

rangeTimeOptions.storyName = '侧边栏配置额外按钮';

rangeTimeOptions.args = {
  rangeTimeOptions: [
    {
      title: '测试动态自定义，end今天前一天',
      type: 'thirtyDate',
      time: [new Date('2021-01-01'), new Date('2021-01-31')],
      group: 'group1group1group1group1',
    },
    {
      title: '上线60天',
      type: 'sixtyDate',
      time: [new Date('2021-01-01'), new Date('2021-02-28')],
      group: 'group1group1group1group1',
    },
    {
      title: '上线90天',
      type: 'ninetyDate',
      time: [new Date('2021-01-01'), new Date('2021-02-28')],
    },
    {
      title: '上线120天',
      type: 'oneTwoZeroDate',
      time: [new Date('2021-01-01'), new Date('2021-02-28')],
      group: 'group2',
    },
    // {
    //   title: '上线60天',
    //   type: 'sixtyDate1',
    //   time: [new Date('2021-01-01'), new Date('2021-02-28')],
    //   group: 'group1group1group1group1',
    // },
    // {
    //   title: '上线60天',
    //   type: 'sixtyDate2',
    //   time: [new Date('2021-01-01'), new Date('2021-02-28')],
    //   group: 'group1group1group1group1',
    // },
    // {
    //   title: '上线60天',
    //   type: 'sixtyDate3',
    //   time: [new Date('2021-01-01'), new Date('2021-02-28')],
    //   group: 'group1group1group1group1',
    // },
    // {
    //   title: '上线60天',
    //   type: 'sixtyDate4',
    //   time: [new Date('2021-01-01'), new Date('2021-02-28')],
    //   group: 'group1group1group1group1',
    // },
    // {
    //   title: '上线60天',
    //   type: 'sixtyDate5',
    //   time: [new Date('2021-01-01'), new Date('2021-02-28')],
    //   group: 'group1group1group1group1',
    // },
    // {
    //   title: '上线60天',
    //   type: 'sixtyDate6',
    //   time: [new Date('2021-01-01'), new Date('2021-02-28')],
    //   group: 'group1group1group1group1',
    // },
    // {
    //   title: '上线60天',
    //   type: 'sixtyDate7',
    //   time: [new Date('2021-01-01'), new Date('2021-02-28')],
    //   group: 'group1group1group1group1',
    // },
    // {
    //   title: '上线60天',
    //   type: 'sixtyDate8',
    //   time: [new Date('2021-01-01'), new Date('2021-02-28')],
    //   group: 'group1group1group1group1',
    // },
    // {
    //   title: '上线60天',
    //   type: 'sixtyDate9',
    //   time: [new Date('2021-01-01'), new Date('2021-02-28')],
    //   group: 'group1group1group1group1',
    // },
    // {
    //   title: '上线60天',
    //   type: 'sixtyDate10',
    //   time: [new Date('2021-01-01'), new Date('2021-02-28')],
    //   group: 'group1group1group1group1',
    // },
    // {
    //   title: '上线60天',
    //   type: 'sixtyDate11',
    //   time: [new Date('2021-01-01'), new Date('2021-02-28')],
    //   group: 'group1group1group1group1',
    // },
    // {
    //   title: '上线60天',
    //   type: 'sixtyDate12',
    //   time: [new Date('2021-01-01'), new Date('2021-02-28')],
    //   group: 'group1group1group1group1',
    // },
    // {
    //   title: '上线60天',
    //   type: 'sixtyDate13',
    //   time: [new Date('2021-01-01'), new Date('2021-02-28')],
    //   group: 'group1group1group1group1',
    // },
    // {
    //   title: '上线60天',
    //   type: 'sixtyDate14',
    //   time: [new Date('2021-01-01'), new Date('2021-02-28')],
    //   group: 'group1group1group1group1',
    // },
  ],
};

const showCompareTemplate = (args) => ({
  components: { RangePicker },
  template: `<div>
      <div class="story-title">可对比的选择器</div>
      <div class="story-subtitle">选择器支持对比。</div>
      <range-picker
        size="small"
        mode="date"
        :show-compare="showCompare"
        :allow-clear="true"
        :value="value"
        :compare-value="compareValue"
        :is-compare="isCompare"
        @change="changeValue"
      />
    </div>`,
  setup() {
    const state = reactive({
      value: {
        time: [new Date(), new Date()],
      },
      isCompare: false,
      // compareValue: {
      //   type: 'customCompare',
      //   time: [new Date(), new Date()],
      // },
      compareValue: [],
    });

    const changeValue = (val) => {
      console.log(val);
      state.value = val.value;
      state.isCompare = val.isCompare;
      state.compareValue = val.compareValue;
    };

    return {
      ...toRefs(state),
      ...args,
      changeValue,
    };
  },
});

export const showCompare = showCompareTemplate.bind({});

showCompare.storyName = '可对比的选择器';

showCompare.args = {
  showCompare: true,
};

const showShortcutTemplate = (args) => ({
  components: { RangePicker },
  template: `<div>
      <div class="story-title">展示侧边栏的选择器</div>
      <div class="story-subtitle">选择器是否展示侧边栏。</div>
      <range-picker
        :show-shortcut="showShortcut"
        :allow-clear="true"
        :value="value"
        @change="changeValue"
      />
    </div>`,
  setup() {
    const state = reactive({
      value: {
        time: [new Date(), new Date()],
      },
    });

    const changeValue = (val) => {
      state.value = val.value;
    };

    return {
      ...toRefs(state),
      ...args,
      changeValue,
    };
  },
});

export const showShortcut = showShortcutTemplate.bind({});

showShortcut.storyName = '展示侧边栏的选择器';

showShortcut.args = {
  showShortcut: false,
};

const showSpecificTimeTemplate = (args) => ({
  components: { RangePicker },
  template: `<div>
      <div class="story-title">展示完整时间的选择器</div>
      <div class="story-subtitle">选择器是否展示完整时间。</div>
      <range-picker
        :show-specific-time="showSpecificTime"
        :show-compare="true"
        :value="value"
        :compare-value="compareValue"
        :is-compare="isCompare"
        @change="changeValue"
      />
    </div>`,
  setup() {
    const state = reactive({
      value: {
        time: [new Date(), new Date()],
      },
      isCompare: false,
      compareValue: [],
    });

    const changeValue = (val) => {
      state.value = val.value;
      state.isCompare = val.isCompare;
      state.compareValue = val.compareValue;
    };

    return {
      ...toRefs(state),
      ...args,
      changeValue,
    };
  },
});

export const showSpecificTime = showSpecificTimeTemplate.bind({});

showSpecificTime.storyName = '展示完整时间的选择器';

showSpecificTime.args = {
  showSpecificTime: true,
};

const customTimeTemplate = (args) => ({
  components: { CustomDatePicker },
  template: `<div>
      <div class="story-title">自定义时间选择器</div>
      <div class="story-subtitle">选择器是否展示完整时间。</div>
      <custom-date-picker
        :value="value"
        :compare-value="compareValue"
        :is-compare="isCompare"
        :show-compare="true"
        :allowClear="allowClear"
        :placeholder="placeholder"
        :disable-date="disableDate"
        :disabled="disabled"
        :size="size"
        :mode="mode"
        @change="changeValue"
      />
    </div>`,
  setup() {
    const state = reactive({
      value: {
        time: new Date(),
      },
      isCompare: false,
      compareValue: [],
    });

    const changeValue = (val) => {
      console.log(val);

      state.value = val.value;
      state.isCompare = val.isCompare;
      state.compareValue = val.compareValue;
    };

    return {
      ...toRefs(state),
      ...args,
      changeValue,
    };
  },
});

export const customTime = customTimeTemplate.bind({});

customTime.storyName = '自定义时间选择器';

customTime.argTypes = {
  mode: {
    control: {
      type: 'select',
      options: ['month', 'date'],
    },
  },
  size: {
    type: 'select',
    options: ['medium', 'small'],
  },
  disableDate: {
    control: {
      type: 'object',
    },
  },
};

customTime.args = {
  mode: 'date',
  allowClear: true,
  placeholder: '请选择时间',
  disabled: false,
  // disableDate: {
  //   from: dayjs().subtract(6, 'day').format(),
  //   to: dayjs().add(3, 'day').format(),
  // },
  size: 'small',
  disableDate: {
    from: dayjs().add(3, 'day').format(),
    to: dayjs().add(6, 'day').format(),
  },
};

const showIntlemplate = (args) => ({
  components: { RangePicker, ConfigProvider, TInput },
  template: `<div class="aw-mb-60">
      <div class="story-title">国际化</div>
      <div class="story-subtitle">en config</div>
      <ConfigProvider :global-config="globalConfig">
        <range-picker
          :show-specific-time="showSpecificTime"
          :show-compare="true"
          :value="value"
          :compare-value="compareValue"
          :is-compare="isCompare"
          :range-time-options="rangeTimeOptions"
          @change="changeValue"
        />
      </ConfigProvider>
        <br /><br />
      <div class="story-subtitle">ko config (需要 Tdesign v1.0 的翻译支持)</div>
      <ConfigProvider :global-config="globalConfigKo">
        <range-picker
          :show-specific-time="showSpecificTime"
          :show-compare="true"
          :value="value"
          :compare-value="compareValue"
          :is-compare="isCompare"
          :range-time-options="rangeTimeOptions"
          @change="changeValue"
        />
      </ConfigProvider>
        <br /><br />
      <div class="story-subtitle">zh-cn config</div>
        <range-picker
          :show-specific-time="showSpecificTime"
          :show-compare="true"
          :value="value"
          :compare-value="compareValue"
          :is-compare="isCompare"
          @change="changeValue"
        />
        <br /><br />
      <div class="story-subtitle">多语言侧边栏定制宽度 {{ sideWidth }}px <t-input v-model="sideWidth" type="number" min="120"/></div>
      <ConfigProvider :global-config="globalConfig">
        <range-picker
          :key="'rp-sw-' + sideWidth"
          :show-specific-time="showSpecificTime"
          :show-compare="true"
          :value="value"
          :compare-value="compareValue"
          :is-compare="isCompare"
          :range-time-options="rangeTimeOptions"
          :side-width="sideWidth"
          @change="changeValue"
        />
      </ConfigProvider>
        <br /><br />
        <br /><br />
    </div>`,
  setup() {
    const state = reactive({
      value: {
        time: [new Date(), new Date()],
      },
      isCompare: false,
      compareValue: [],
      sideWidth: 300,
      // rangeTimeOptions: [
      //   {
      //     title: 'Online 30 days',
      //     type: 'online30Date',
      //     time: [new Date('2023-01-01'), new Date('2023-01-31')],
      //   },
      //   {
      //     title: 'Online 60 days',
      //     type: 'online60Date',
      //     time: [new Date('2023-01-01'), new Date('2023-02-28')],
      //   },
      //   {
      //     title: 'Online 90 days',
      //     type: 'online90Date',
      //     time: [new Date('2023-01-01'), new Date('2023-03-31')],
      //   },
      //   {
      //     title: 'Online 180 days',
      //     type: 'online180Date',
      //     time: [new Date('2023-01-01'), new Date('2023-06-30')],
      //   },
      // ],
    });

    // Tdesign v1.0 之后才有 dayjsLocale
    const globalConfig = mergeObject(enConfig, {
      datePicker: {
        dayjsLocale: 'en',
      },
    });
    const globalConfigKo = mergeObject(enConfig, {
      datePicker: {
        dayjsLocale: 'ko',
      },
    });

    const changeValue = (val) => {
      state.value = val.value;
      state.isCompare = val.isCompare;
      state.compareValue = val.compareValue;
    };

    return {
      ...toRefs(state),
      ...args,
      changeValue,
      globalConfig,
      globalConfigKo,
    };
  },
});

export const showIntl = showIntlemplate.bind({});

showIntl.storyName = '国际化';

showIntl.args = {
  showSpecificTime: true,
};
