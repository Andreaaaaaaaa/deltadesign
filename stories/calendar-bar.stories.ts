import { defineComponent } from 'vue';
import {
  CalendarBar,
  CalendarDetailValueItem } from '../src/components/calendar-bar/index';
import './calendar-bar.scss';

const sourceData = [
  {
    name: '重点活动',
    key: 'activity',
    type: 'DayByDay',
    value: [{
      name: '03/26',
      key: '03/26',
      start: 1648224000,
      end: 1648310400,
      value: [{
        name: '好友组队绑定活动',
        key: 'act1',
        start: 1648224000,
        end: 1648742400,
        type: ['拉新', '拉回流'],
      }],
    },
    {
      name: '03/27',
      key: '03/27',
      start: 1648310400,
      end: 1648396800,
      value: [{
        name: '好友组队绑定活动',
        key: 'act1',
        start: 1648224000,
        end: 1648742400,
      }],
    },
    {
      name: '03/28',
      key: '03/28',
      start: 1648396800,
      end: 1648483200,
      value: [{
        name: '好友组队绑定活动',
        key: 'act1',
        start: 1648224000,
        end: 1648742400,
      }],
    },
    {
      name: '03/29',
      key: '03/29',
      start: 1648483200,
      end: 1648569600,
      value: [{
        name: '好友组队绑定活动',
        key: 'act1',
        start: 1648224000,
        end: 1648742400,
      }],
    },
    {
      name: '03/30',
      key: '03/30',
      start: 1648569600,
      end: 1648656000,
      value: [{
        name: '好友组队绑定活动',
        key: 'act1',
        start: 1648224000,
        end: 1648742400,
      }],
    },
    {
      name: '03/31',
      key: '03/31',
      start: 1648656000,
      end: 1648742400,
      value: [{
        name: '好友组队绑定活动',
        key: 'act1',
        start: 1648224000,
        end: 1648742400,
      }],
    },
    {
      name: '04/01',
      key: '04/01',
      start: 1648742400,
      end: 1648828800,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      },
      {
        name: '好友召回2',
        key: 'act22',
        start: 1648742400,
        end: 1649433600,
      }],
    },
    {
      name: '04/02',
      key: '04/02',
      start: 1648828800,
      end: 1648915200,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      },
      {
        name: '好友召回2',
        key: 'act22',
        start: 1648742400,
        end: 1649433600,
      }],
    },
    {
      name: '04/03',
      key: '04/03',
      start: 1648915200,
      end: 1649001600,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      },
      {
        name: '好友召回2',
        key: 'act22',
        start: 1648742400,
        end: 1649433600,
      }],
    },
    {
      name: '04/04',
      key: '04/04',
      start: 1649001600,
      end: 1649088000,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      },
      {
        name: '好友召回2',
        key: 'act22',
        start: 1648742400,
        end: 1649433600,
      }],
    },
    {
      name: '04/05',
      key: '04/05',
      start: 1649088000,
      end: 1649174400,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      },
      {
        name: '好友召回2',
        key: 'act22',
        start: 1648742400,
        end: 1649433600,
      }],
    },
    {
      name: '04/06',
      key: '04/06',
      start: 1649174400,
      end: 1649260800,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      },
      {
        name: '好友召回2',
        key: 'act22',
        start: 1648742400,
        end: 1649433600,
      }],
    },
    {
      name: '04/07',
      key: '04/07',
      start: 1649260800,
      end: 1649347200,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      },
      {
        name: '好友召回2',
        key: 'act22',
        start: 1648742400,
        end: 1649433600,
      }],
    },
    {
      name: '04/08',
      key: '04/08',
      start: 1649347200,
      end: 1649433600,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      },
      {
        name: '好友召回2',
        key: 'act22',
        start: 1648742400,
        end: 1649433600,
      }],
    },
    {
      name: '04/09',
      key: '04/09',
      start: 1649433600,
      end: 1649520000,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      },
      {
        name: '好友组队绑定1',
        key: 'act11',
        start: 1649433600,
        end: 1649692800,
      },
      {
        name: '好友组队绑定2',
        key: 'act12',
        start: 1649433600,
        end: 1649692800,
      },
      {
        name: '好友组队绑定3',
        key: 'act13',
        start: 1649433600,
        end: 1649692800,
      }],
    },
    {
      name: '04/10',
      key: '04/10',
      start: 1649520000,
      end: 1649606400,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      },
      {
        name: '好友组队绑定1',
        key: 'act11',
        start: 1649433600,
        end: 1649692800,
      },
      {
        name: '好友组队绑定2',
        key: 'act12',
        start: 1649433600,
        end: 1649692800,
      },
      {
        name: '好友组队绑定3',
        key: 'act13',
        start: 1649433600,
        end: 1649692800,
      }],
    },
    {
      name: '04/11',
      key: '04/11',
      start: 1649606400,
      end: 1649692800,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      },
      {
        name: '好友组队绑定1',
        key: 'act11',
        start: 1649433600,
        end: 1649692800,
      },
      {
        name: '好友组队绑定2',
        key: 'act12',
        start: 1649433600,
        end: 1649692800,
      },
      {
        name: '好友组队绑定3',
        key: 'act13',
        start: 1649433600,
        end: 1649692800,
      }],
    },
    {
      name: '04/12',
      key: '04/12',
      start: 1649692800,
      end: 1649779200,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      }],
    }, {
      name: '04/13',
      key: '04/13',
      start: 1649779200,
      end: 1649865600,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      }],
    },
    {
      name: '04/14',
      key: '04/14',
      start: 1649865600,
      end: 1649952000,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      }],
    },
    {
      name: '04/15',
      key: '04/15',
      start: 1649952000,
      end: 1650038400,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      }],
    },
    {
      name: '04/16',
      key: '04/16',
      start: 1650038400,
      end: 1650124800,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      }],
    },
    {
      name: '04/17',
      key: '04/17',
      start: 1650124800,
      end: 1650211200,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      }],
    },
    {
      name: '04/18',
      key: '04/18',
      start: 1650211200,
      end: 1650297600,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      }],
    },
    {
      name: '04/19',
      key: '04/19',
      start: 1650297600,
      end: 1650384000,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      }],
    },
    {
      name: '04/20',
      key: '04/20',
      start: 1650384000,
      end: 1650470400,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      }],
    },
    {
      name: '04/21',
      key: '04/21',
      start: 1650470400,
      end: 1650556800,
      value: [{
        name: '好友召回',
        key: 'act2',
        start: 1648742400,
        end: 1650556800,
      }],
    },
    {
      name: '04/22',
      key: '04/22',
      start: 1650556800,
      end: 1650643200,
      value: [],
    },
    {
      name: '04/23',
      key: '04/23',
      start: 1650643200,
      end: 1650729600,
      value: [
        {
          name: '好友test1',
          key: 'test1',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test2',
          key: 'test2',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test3',
          key: 'test3',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test4',
          key: 'test4',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test5',
          key: 'test5',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test6',
          key: 'test6',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test7',
          key: 'test7',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test8',
          key: 'test8',
          start: 1650643200,
          end: 1651075200,
        }],
    },
    {
      name: '04/24',
      key: '04/24',
      start: 1650729600,
      end: 1650816000,
      value: [
        {
          name: '好友test1',
          key: 'test1',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test2',
          key: 'test2',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test3',
          key: 'test3',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test4',
          key: 'test4',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test5',
          key: 'test5',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test6',
          key: 'test6',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test7',
          key: 'test7',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test8',
          key: 'test8',
          start: 1650643200,
          end: 1651075200,
        }],
    },
    {
      name: '04/25',
      key: '04/25',
      start: 1650816000,
      end: 1650902400,
      value: [
        {
          name: '好友test1好友test1好友test1好友test1好友test1',
          key: 'test1',
          start: 1648224000,
          end: 1651075200,
          type: ['拉新', '拉回流', '促活', '促新'],
        },
        {
          name: '好友test2',
          key: 'test2',
          start: 1648224000,
          end: 1651075200,
          type: ['拉新', '促新'],
        },
        {
          name: '好友test3',
          key: 'test3',
          start: 1650643200,
          end: 1651075200,
          type: ['拉新', '拉回流'],
        },
        {
          name: '好友test4',
          key: 'test4',
          start: 1650643200,
          end: 1651075200,
          type: ['拉新', '拉回流'],
        },
        {
          name: '好友test5',
          key: 'test5',
          start: 1650643200,
          end: 1651075200,
          type: ['拉新', '拉回流'],
        },
        {
          name: '好友test6',
          key: 'test6',
          start: 1650643200,
          end: 1651075200,
          type: ['拉回流'],
        },
        {
          name: '好友test7',
          key: 'test7',
          start: 1650643200,
          end: 1651075200,
          type: ['拉新', '拉回流'],
        },
        {
          name: '好友test8',
          key: 'test8',
          start: 1650643200,
          end: 1651075200,
          type: ['拉新'],
        }],
    },
    {
      name: '04/26',
      key: '04/26',
      start: 1650902400,
      end: 1650988800,
      value: [
        {
          name: '好友test1',
          key: 'test1',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test2',
          key: 'test2',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test3',
          key: 'test3',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test4',
          key: 'test4',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test5',
          key: 'test5',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test6',
          key: 'test6',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test7',
          key: 'test7',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test8',
          key: 'test8',
          start: 1650643200,
          end: 1651075200,
        }],
    },
    {
      name: '04/27',
      key: '04/27',
      start: 1650988800,
      end: 1651075200,
      value: [
        {
          name: '好友test1',
          key: 'test1',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test2',
          key: 'test2',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test3',
          key: 'test3',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test4',
          key: 'test4',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test5',
          key: 'test5',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test6',
          key: 'test6',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test7',
          key: 'test7',
          start: 1650643200,
          end: 1651075200,
        },
        {
          name: '好友test8',
          key: 'test8',
          start: 1650643200,
          end: 1651075200,
        }],
    }],
  },
  {
    name: '游戏事件',
    key: 'game',
    type: 'EventUnity',
    value: [{
      name: '开学',
      key: 'study',
      start: 1646755200,
      end: 1648828800,
      value: [],
    },
    {
      name: '幸运星',
      key: 'star',
      start: 1648224000,
      end: 1649347200,
      value: [{
        name: '幸运星活动1',
        key: 'star-act1',
        start: 1648224000,
        end: 1650384000,
      },
      {
        name: '幸运星活动2',
        key: 'star-act2',
        start: 1650902400,
        end: 1651075200,
        type: ['拉新', '促新'],
      }],
    },
    {
      name: '不知名活动',
      key: 'unknown',
      start: 1649174400,
      end: 1649692800,
      value: [{
        name: '不知名活动1',
        key: 'unknown-act1',
        start: 1649174400,
        end: 1649692800,
        type: ['拉新', '促新'],
      }],
    }],
  },
  {
    name: '节假日',
    key: 'holiday',
    type: 'EventUnity',
    value: [{
      name: '中秋节',
      key: 'holiday111',
      start: 1649520000,
      end: 1649692800,
      value: [{
        name: '中秋节活动1',
        key: 'holiday-act1',
        start: 1649520000,
        end: 1649692800,
      }],
    },
    {
      name: '中秋节2',
      key: 'holiday2',
      start: 1649520000,
      end: 1649692800,
      value: [{
        name: '中秋节活动1',
        key: 'holiday-act10',
        start: 1649520000,
        end: 1649692800,
        type: ['拉新', '拉回流', '促活', '促新'],
      }],
    },
    {
      name: '中秋节3',
      key: 'holiday3',
      start: 1649520000,
      end: 1649692800,
      value: [{
        name: '中秋节活动1',
        key: 'holiday-act11',
        start: 1649520000,
        end: 1649692800,
      }],
    },
    {
      name: '中秋节4',
      key: 'holiday4',
      start: 1649520000,
      end: 1649692800,
      value: [{
        name: '中秋节活动1',
        key: 'holiday-act12',
        start: 1649520000,
        end: 1649692800,
      }],
    },
    {
      name: '中秋节5',
      key: 'holiday5',
      start: 1649520000,
      end: 1649692800,
      value: [{
        name: '中秋节活动1',
        key: 'holiday-act15',
        start: 1649520000,
        end: 1649692800,
      }],
    },
    {
      name: '中秋节6',
      key: 'holiday6',
      start: 1649520000,
      end: 1649692800,
      value: [{
        name: '中秋节活动1',
        key: 'holiday-act16',
        start: 1649520000,
        end: 1649692800,
      }],
    },
    {
      name: '中秋节7',
      key: 'holiday7',
      start: 1649520000,
      end: 1649692800,
      value: [{
        name: '中秋节活动1',
        key: 'holiday-act18',
        start: 1649520000,
        end: 1649692800,
      }],
    },
    {
      name: '中秋节8',
      key: 'holiday8',
      start: 1649520000,
      end: 1649692800,
      value: [{
        name: '中秋节活动1',
        key: 'holiday-act20',
        start: 1649520000,
        end: 1649692800,
      }],
    },
    {
      name: '中秋节9',
      key: 'holiday9',
      start: 1649520000,
      end: 1649692800,
      value: [{
        name: '中秋节活动1',
        key: 'holiday-act1',
        start: 1649520000,
        end: 1649692800,
      }],
    },
    {
      name: '中秋节100',
      key: 'holidayw',
      start: 1649520000,
      end: 1649692800,
      value: [{
        name: '中秋节',
        key: 'holiday-act100',
        start: 1649520000,
        end: 1649692800,
      }],
    }],
  }];
export default {
  title: '独立图形/条形日历',
  component: CalendarBar,
  parameters: {
    docs: {
      description: {
        component: `
calendar-ui 条形日历图
* 主要用于按顺序显示游戏活动事件，支持点击事件下钻等功能。
* 特定的业务场景下才会使用（属于和业务逻辑耦合较深的数据可视化组件）。
`,
      },
    },
  },
  // 组件 props 默认值
  args: (() => ({
    data: sourceData,
    disabled: false,
  }))(),
  // 组件的 props 说明
  argTypes: (() => ({
    data: {
      description: '条形日历的数据',
    },
    disabled: {
      description: '禁用状态，此时不可点击',
    },
    timeFormat: {
      description: '时间格式化的格式',
    },
    onChange: {
      description: '下钻面板详情点击事件',
      table: {
        type: {
          summary: '(item: CalendarDetailValueItem) => void',
          detail: `
CalendarDetailValueItem {
  name: string;
  key: string;
  start: number;
  end: number;
  oriStart?: number;
  oriEnd?: number;
  type?: string[];
  color?: string[];
}
          `,
        },
      },
      control: { type: '-' },
    },
  }))(),
};

// 整体展示的例子，和Control可以联动（写法比较固定）
export const eventDemo = defineComponent({
  template: '<calendar-bar :data="data" :onChange="onChange"></calendar-bar>',
  setup() {
    const data = [...sourceData]; // sourceData 的值见上面属性列表的 data 属性。
    const onChange = (item: CalendarDetailValueItem) => {
      console.info(item);
    };
    return {
      data,
      onChange,
    };
  },
});
eventDemo.storyName = '事件';
eventDemo.parameters = {
  docs: {
    description: {
      story: '目前提供了 `onChange`',
    },
  },
};


export const formatDemoDemo = defineComponent({
  template: '<calendar-bar :data="data" :timeFormat="timeFormat"></calendar-bar>',
  setup() {
    const data = [...sourceData]; // sourceData 的值见上面属性列表的 data 属性。
    const timeFormat = 'MM月DD日';
    return {
      data,
      timeFormat,
    };
  },
});
formatDemoDemo.storyName = '格式化';
formatDemoDemo.parameters = {
  docs: {
    description: {
      story: '默认时间显示格式为MM/DD，可以通过 `timeFormat` 属性来修改',
    },
  },
};
