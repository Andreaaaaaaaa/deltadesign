import { Calendar as TCalendar } from '../src/components/calendar/index';

export default {
  title: '数据展示/Calendar 日历',
  component: TCalendar,
  argTypes: {
    fillWithZero: {
      description: `小于 10 的日期，是否使用 '0' 填充。默认表现为 01 02，值为 false 表现为 1 2 9`,
      table: {
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    cell: {
      description: '单元格插槽。',
      table: {
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
  },
};

const Template = (args) => ({
  components: { TCalendar },
  setup() {
    return { args };
  },
  template: '<t-calendar v-bind="args" > <template #head> 🗓 TDesign开发计划 </template></t-calendar>',
});

export const Demo = Template.bind({});
Demo.args = {
  range: ['2018-08', '2028-04'],
};
Demo.storyName = '日历';
