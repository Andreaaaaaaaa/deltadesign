import { Button } from 'tdesign-vue-next/esm/button';
import { List as TList, ListItem as TListItem } from '../src/components/list/index';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: '数据展示/List 列表',
  component: TList,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    asyncLoading: {
      description:
        "自定义加载中。值为空不显示加载中，值为 'loading' 显示加载中状态，值为 'load-more' 显示加载更多状态。值类型为函数，则表示自定义加载状态呈现内容。TS 类型：string | TNode。通用类型定义",
      table: {
        category: 'TimePicker Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    footer: {
      description: '底部。TS 类型：string | TNode。通用类型定义',
      table: {
        category: 'TimePicker Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    header: {
      description: '头部。TS 类型：string | TNode。通用类型定义',
      table: {
        category: 'TimePicker Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    layout: {
      description: '排列方式（待设计稿输出）。可选项：horizontal/vertical',
      table: {
        category: 'TimePicker Props',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
    size: {
      description: '尺寸。可选项：small/medium/large',
      table: {
        category: 'TimePicker Props',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: 'medium',
        },
      },
    },
    split: {
      description: '是否展示分割线',
      table: {
        category: 'TimePicker Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    stripe: {
      description: '是否展示斑马纹',
      table: {
        category: 'TimePicker Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onLoadMore: {
      description: 'TS 类型：(options: { e: MouseEvent }) => void 点击加载更多时触发',
      table: {
        category: 'TimePicker Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onScroll: {
      description:
        'TS 类型：(options: { e: Event | WheelEvent; scrollTop: number; scrollBottom: number }) => void 列表滚动时触发，scrollTop 表示顶部滚动距离，scrollBottom 表示底部滚动距离',
      table: {
        category: 'TimePicker Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TList, TListItem, Button },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<t-list v-bind="args">
        <t-list-item>
        列表内容的描述性文字
        <template #action>
          <Button variant="text"> 操作1 </Button>
          <Button variant="text"> 操作2 </Button>
          <Button variant="text"> 操作3 </Button>
        </template>
      </t-list-item>
      <t-list-item>
        列表内容的描述性文字
        <template #action>
          <Button variant="text"> 操作1 </Button>
          <Button variant="text"> 操作2 </Button>
          <Button variant="text"> 操作3 </Button>
        </template>
      </t-list-item>
    </t-list>`,
});

export const Demo = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Demo.args = {
  layout: 'horizontal',
};
Demo.storyName = '基础';
