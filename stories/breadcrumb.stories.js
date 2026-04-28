import { reactive, toRefs } from 'vue';
import { HomeIcon } from 'tdesign-icons-vue-next';
import { Breadcrumb as TBreadcrumb, BreadcrumbItem as TBreadcrumbItem } from '../src/components/breadcrumb/index';
import '../src/assets/breadcrumb-hook.scss';

export default {
  title: '导航/Breadcrumb 面包屑',
  component: TBreadcrumb,
  argTypes: {
    maxItemWidth: {
      description: '单项最大宽度，超出后会以省略号形式呈现',
      table: {
        category: 'Breadcrumb Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: undefined },
      },
    },
    options: {
      control: { type: 'array' },
      defaultValue: [],
      description: '面包屑项，功能同 BreadcrumbItem。',
      table: {
        category: 'Breadcrumb Props',
        type: {
          summary: 'TS 类型：Array<TdBreadcrumbItemProps>',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    separator: {
      description: '自定义分隔符。',
      table: {
        category: 'Breadcrumb Props',
        type: {
          summary: 'TS 类型：string | TNode。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    theme: {
      description: '组件风格。可选项：light。',
      table: {
        category: 'Breadcrumb Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 'light' },
      },
    },
    content: {
      description: '子元素。',
      table: {
        category: 'BreadcrumbItem Props',
        type: {
          summary: 'TS 类型：string | TNode。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    default: {
      description: '子元素，同 content。',
      table: {
        category: 'BreadcrumbItem Props',
        type: {
          summary: 'TS 类型：string | TNode。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    disabled: {
      description: '是否禁用当前项点击',
      table: {
        category: 'BreadcrumbItem Props',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    href: {
      description: '跳转链接',
      table: {
        category: 'BreadcrumbItem Props',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    maxWidth: {
      description: '最大宽度，超出后会以省略号形式呈现。优先级高于 Breadcrumb 中的 maxItemWidth',
      table: {
        category: 'BreadcrumbItem Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: undefined },
      },
    },
    replace: {
      description: '路由跳转是否采用覆盖的方式（覆盖后将没有浏览器历史记录）',
      table: {
        category: 'BreadcrumbItem Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: false },
      },
    },
    router: {
      description: '路由对象。如果项目存在 Router，则默认使用 Router',
      table: {
        category: 'BreadcrumbItem Props',
        type: {
          summary: 'TS 类型：any',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    target: {
      description: '链接或路由跳转方式。可选项：_blank/_self/_parent/_top',
      table: {
        category: 'BreadcrumbItem Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: '_self' },
      },
    },
    to: {
      description: '路由跳转目标，当且仅当 Router 存在时，该 API 有效。',
      table: {
        category: 'BreadcrumbItem Props',
        type: {
          summary: 'TS 类型：Route。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
  },
};

// 控制
const aControlTemplate = (args) => ({
  components: { TBreadcrumb, TBreadcrumbItem },

  template: `
   <t-breadcrumb
    :max-item-width=maxItemWidth
    :options="options"
    :separator="separator"
   >
    </t-breadcrumb>
  `,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});
export const aControl = aControlTemplate.bind({});
aControl.args = {
  maxItemWidth: '150',
  options: [{ content: '页面1' }, { content: '页面2' }, { content: '页面3', href: 'https://www.tencent.com' }],
  separator: '/',
  theme: 'light',
};
aControl.storyName = '控制';

const BasicBreadcrumbTemplate = (args) => ({
  components: { TBreadcrumb, TBreadcrumbItem },
  setup() {
    return { args };
  },
  template: `
   <t-breadcrumb :max-item-width="'150'" separator="/">
     <t-breadcrumbItem to="/vue-next/demos/breadcrumb/custom"> 页面1 </t-breadcrumbItem>
     <t-breadcrumbItem>页面2面包屑文案超长时悬浮显示文案全部信息</t-breadcrumbItem>
     <t-breadcrumbItem :max-width="'160'"> 面包屑中文案过长时可缩略显示，鼠标hover时显示全部 </t-breadcrumbItem>
    </t-breadcrumb>
  `,
});

export const BasicBreadcrumb = BasicBreadcrumbTemplate.bind({});
BasicBreadcrumb.args = {};
BasicBreadcrumb.storyName = '基础面包屑';
const IconBeadcrumbTemplate = (args) => ({
  components: { TBreadcrumb, TBreadcrumbItem, HomeIcon },
  setup() {
    return { args };
  },
  template: `
   <t-breadcrumb separator="/">
     <t-breadcrumbItem><HomeIcon />页面1</t-breadcrumbItem>
     <t-breadcrumbItem>页面2</t-breadcrumbItem>
     <t-breadcrumbItem>页面3</t-breadcrumbItem>
    </t-breadcrumb>
  `,
});

export const IconBeadcrumb = IconBeadcrumbTemplate.bind({});
IconBeadcrumb.storyName = '带图标的面包屑';

const OptionsBeadcrumbTemplate = (args) => ({
  components: { TBreadcrumb, TBreadcrumbItem, HomeIcon },
  setup() {
    return { args };
  },
  template: `
   <t-breadcrumb v-bind="args">
    </t-breadcrumb>
  `,
});
export const OptionsBeadcrumb = OptionsBeadcrumbTemplate.bind({});
OptionsBeadcrumb.args = {
  options: [{ content: '页面5' }, { content: '页面6' }, { content: '页面7', href: 'https://www.tencent.com' }],
  separator: '/',
};
OptionsBeadcrumb.storyName = '使用 options 配置面包屑';
