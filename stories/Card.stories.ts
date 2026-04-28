// import { action } from '@storybook/addon-actions';
import { reactive, toRefs } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { ThumbUpIcon, ChatIcon, ShareIcon, UserIcon } from 'tdesign-icons-vue-next';
import { Button as TButton } from 'tdesign-vue-next/esm/button';
import { Tag as TTag } from 'tdesign-vue-next/esm/tag';
import { Row as TRow, Col as TCol } from '../src/components/grid/index';
import { Card as TCard } from '../src/components/card/index';
import '../src/assets/card-hook.scss';
// import '../src/assets/card-hook.scss';

export const actionsData = {};

export default {
  title: '数据展示/Card 卡片',
  component: {},
  argTypes: {
    actions: {
      description: `卡片操作区`,
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: {
          summary: '-',
        },
      },
      control: {
        type: 'text',
      },
    },
    avatar: {
      description: `卡片中的用户头像，仅在海报风格的卡片中有效。TS 类型：'string | TNode'。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)`,
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: {
          summary: '-',
        },
      },
      control: {
        type: 'text',
      },
    },
    bordered: {
      description: '是否有边框',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
      control: {
        type: 'boolean',
      },
    },
    content: {
      description:
        '卡片内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    cover: {
      description:
        '卡片封面图。值类型为字符串，会自动使用 `img` 标签输出封面图；也可以完全最定义封面图。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: {
          summary: '-',
        },
      },
      control: {
        type: 'text',
      },
    },
    default: {
      description:
        '卡片内容，同 content。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    description: {
      description:
        '卡片描述文案。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    footer: {
      description:
        '卡片底部内容，可完全自定义。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    header: {
      description:
        ' 卡片顶部内容，优先级高于其他所有元素。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    headerBordered: {
      description: `头部是否带分割线，仅在有header时有效`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: {
          summary: 'false',
        },
      },
      control: {
        type: 'boolean',
      },
    },
    hoverShadow: {
      description: `hover时是否有阴影`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
      },
      control: {
        type: 'boolean',
      },
    },
    loading: {
      description:
        '加载状态，值为 true 会根据不同的布局显示不同的加载状态，值为 false 则表示非加载状态。也可以使用 Sketon 组件完全自定义加载态呈现内容。TS 类型：`boolean | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)',
      table: {
        category: 'Props',
        type: { summary: 'Boolean / Slot / Function' },
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
      },
    },
    shadow: {
      description: `是否显示卡片阴影，默认不显示`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: {
          summary: 'false',
        },
      },
      control: {
        type: 'boolean',
      },
    },
    size: {
      description: `尺寸。可选项：medium/small`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: {
          summary: 'medium',
        },
      },
      control: {
        type: 'select',
        options: ['medium', 'small'],
        default: 'medium',
      },
    },
    status: {
      description: '卡片状态内容，仅在操作区域不在顶部时有效（即 `theme=poster2` ）',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    subtitle: {
      description:
        '卡片副标题。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: { summary: '-' },
      },
      control: {
        type: 'text',
      },
    },
    theme: {
      description: `卡片风格：普通风格、海报风格1（操作区域在顶部）、海报风格2（操作区域在底部）。可选项：normal/poster1/poster2`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'normal' },
      },
      control: {
        type: 'select',
        options: ['normal', 'poster1', 'poster2'],
      },
    },
    title: {
      description:
        '卡片标题。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: 'text',
      },
    },
    varient: {
      description: '背景卡片场景,可选项：interface/card',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: {
          summary: 'card',
        },
      },
      control: {
        type: 'select',
        options: ['interface', 'card'],
      },
    },
    category: {
      description:
        'DA页面的大小卡片场景，大卡片：padding为[20px,20px,16px,20px];小卡片：padding为[16px,20px,16px,20px]',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: {
          summary: '',
        },
      },
      control: {
        type: 'select',
        options: ['small', 'large'],
      },
    },
  },
  excludeStories: /.Data$/,
};

const aControlTemplate = (args) => ({
  components: { TCard },
  template: `
  <t-card v-bind="args">
  仅有内容区域的卡片形式。卡片内容区域可以是文字、图片、表单、表格等形式信息内容。可使用大中小不同的卡片尺寸，按业务需求进行呈现。
</t-card>`,
  methods: {
    actionsData,
  },
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
  varient: 'interface',
};
aControl.storyName = '控制';

// 有边框
const Template = (args) => ({
  components: { TCard },
  template: ` <div>
  <t-card :title="title" :style="{ width: '400px' }" @actions="clickHandler">
    {{ infoMessage }}
  </t-card>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const bordered = Template.bind({});
bordered.args = {
  title: '标题',
  actions: '操作',
  infoMessage:
    '仅有内容区域的卡片形式。卡片内容区域可以是文字、图片、表单、表格等形式信息内容。可使用大中小不同的卡片尺寸，按业务需求进行呈现。',
};
bordered.storyName = '有边框';

// 无边框
const borderedNoneTemplate = (args) => ({
  components: { TCard, MessagePlugin },
  template: `<div class="tdesign-demo-block demo-card" style="background-color: gray;height:500px;display:flex;justify-content:center;align-items:center;">
  <t-card :title="title" :bordered="false" hover-shadow :style="{ width: '400px',height:'300px' }">
    {{ infoMessage }}
    <template #actions>
      <a href="javascript:void(0)" @click="clickHandler">操作</a>
    </template>
  </t-card>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const infoMessage = `仅有内容区域的卡片形式。卡片内容区域可以是文字、图片、表单、表格等形式信息内容。可使用大中小不同的卡片尺寸，按业务需求进行呈现。`;
    const clickHandler = () => {
      MessagePlugin.success('操作');
    };

    return {
      ...toRefs(state),
      infoMessage,
      clickHandler,
    };
  },
});
export const borderedNone = borderedNoneTemplate.bind({});
borderedNone.args = {
  title: '标题',
};
borderedNone.storyName = '无边框';

// 带 header 的卡片 不带分割线
const headerBorderedNoneTemplate = (args) => ({
  components: { TCard, MessagePlugin },
  template: ` <div class="tdesign-demo-block">
  <t-card :title="title" hover-shadow :style="{ width: '400px' }">
    {{ infoMessage }}
    <template #actions>
      <a href="javascript:void(0)" @click="clickHandler">操作</a>
    </template>
  </t-card>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const clickHandler = () => {
      MessagePlugin.success('操作');
    };
    const infoMessage = `卡片内容，以描述性为主，可以是文字、图片或图文组合的形式。按业务需求进行自定义组合。`;
    return {
      ...toRefs(state),
      MessagePlugin,
      infoMessage,
      clickHandler,
    };
  },
});
export const headerBorderedNone = headerBorderedNoneTemplate.bind({});
headerBorderedNone.args = {
  title: '标题',
  actions: '操作',
};
headerBorderedNone.storyName = 'header不带分割线';

// 带 header 的卡片 带分割线
const headerBorderedTemplate = (args) => ({
  components: { TCard, MessagePlugin },
  template: `<div class="tdesign-demo-block demo-card">
  <t-card :title="title" header-bordered :style="{ width: '400px' }">
    {{ infoMessage }}
    <template #actions>
      <a href="javascript:void(0)" @click="clickHandler">操作</a>
    </template>
  </t-card>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const clickHandler = () => {
      MessagePlugin.success('操作');
    };

    const infoMessage = `卡片内容，以描述性为主，可以是文字、图片或图文组合的形式。按业务需求进行自定义组合。`;
    return {
      ...toRefs(state),
      clickHandler,
      infoMessage,
    };
  },
});
export const headerBordered = headerBorderedTemplate.bind({});
headerBordered.args = {
  title: '标题',
};
headerBordered.storyName = 'header带分割线';

// 带 footer 的卡片
const footerTemplate = (args) => ({
  components: { TCard, TButton, TRow, TCol, ThumbUpIcon, ChatIcon, ShareIcon, UserIcon, TTag },
  template: `  <t-card :cover="cover" bordered :style="{ width: '400px' }" hover-shadow>
  <template #avatar>
    <t-avatar size="56px" />
  </template>
  <template #actions>
    <t-tag theme="success">{{ actions }}</t-tag>
  </template>
  <template #footer>
    <t-row :align="'middle'" justify="center">
      <t-col flex="auto">
        <t-button block variant="text">
          <thumb-up-icon size="24" />
        </t-button>
      </t-col>
      <t-col flex="none">
        <t-divider theme="vertical" />
      </t-col>
      <t-col flex="auto">
        <t-button block variant="text">
          <chat-icon size="24" />
        </t-button>
      </t-col>
      <t-col flex="none">
        <t-divider theme="vertical" />
      </t-col>
      <t-col flex="auto">
        <t-button block variant="text">
          <share-icon size="24" />
        </t-button>
      </t-col>
    </t-row>
  </template>
</t-card>`,
  setup() {
    const state = reactive({
      ...args,
    });
    // const icon = computed(() => () => <UserIcon />);

    return {
      ...toRefs(state),
    };
  },
});
export const footer = footerTemplate.bind({});
footer.args = {
  actions: '默认标签',
  cover: 'https://tdesign.gtimg.com/site/source/card-demo.png',
};
footer.storyName = '带footer的卡片';

// 同时带主副标题与标题描述的卡片
const headerAllProsTemplate = (args) => ({
  components: { TCard, MessagePlugin },
  template: `<t-card
  :title="title"
  :subtitle="subtitle"
  :description="description"
  :actions="actions"
  hover-shadow
  :style="{ width: '400px' }"
  @actions="clickHandler"
>
  {{ infoMessage }}
</t-card>`,
  setup() {
    const state = reactive({
      ...args,
    });

    const infoMessage = `卡片内容，以描述性为主，可以是文字、图片或图文组合的形式。按业务需求进行自定义组合。`;

    const clickHandler = () => {
      MessagePlugin.success('操作');
    };

    return {
      ...toRefs(state),
      infoMessage,
      clickHandler,
    };
  },
});
export const headerAllPros = headerAllProsTemplate.bind({});
headerAllPros.args = {
  title: '标题',
  subtitle: '副标题',
  description: '描述',
  actions: '操作',
};
headerAllPros.storyName = '同时带主副标题与标题描述的卡片';

// 同时带主副标题与标题描述的卡片
const interfaceTemplate = (args) => ({
  components: { TCard, MessagePlugin },
  template: `<t-card
  :style="{ width: '400px', height: '400px' }"
  :varient="varient"
>
  {{ infoMessage }}
</t-card>`,
  setup() {
    const state = reactive({
      ...args,
    });

    const infoMessage = `卡片内容，以描述性为主，可以是文字、图片或图文组合的形式。按业务需求进行自定义组合。`;

    return {
      ...toRefs(state),
      infoMessage,
    };
  },
});
export const interfaceTemplateProps = interfaceTemplate.bind({});
interfaceTemplateProps.args = {
  varient: 'interface',
};
interfaceTemplateProps.storyName = '界面背景卡片';

const largeTemplate = (args) => ({
  components: { TCard, MessagePlugin },
  template: `<t-card
  :title="title"
  :category="category"
  hover-shadow
  :style="{ width: '400px' }"
>
  {{ infoMessage }}
  <template #filter>筛选区</template>
  <template #content> 我是内容区域</template>
</t-card>`,
  setup() {
    const state = reactive({
      ...args,
    });

    const infoMessage = `卡片内容，以描述性为主，可以是文字、图片或图文组合的形式。按业务需求进行自定义组合。`;

    return {
      ...toRefs(state),
      infoMessage,
    };
  },
});
export const largeTemplateProps = largeTemplate.bind({});
largeTemplateProps.args = {
  category: 'large',
  title: '标题',
};
largeTemplateProps.storyName = '大尺寸卡片';

const smallTemplate = (args) => ({
  components: { TCard, MessagePlugin },
  template: `<t-card
  :category="category"
  hover-shadow
  :style="{ width: '657px' }"
>
  {{ infoMessage }}
</t-card>`,
  setup() {
    const state = reactive({
      ...args,
    });

    const infoMessage = `图表内容各区域`;

    return {
      ...toRefs(state),
      infoMessage,
    };
  },
});
export const smallTemplateProps = smallTemplate.bind({});
smallTemplateProps.args = {
  category: 'small',
};
smallTemplateProps.storyName = '小尺寸卡片';

const smallWithTitleTemplate = (args) => ({
  components: { TCard, MessagePlugin },
  template: `<t-card
  :title="title"
  :category="category"
  hover-shadow
  :style="{ width: '657px' }"
>
  {{ infoMessage }}
</t-card>`,
  setup() {
    const state = reactive({
      ...args,
    });

    const infoMessage = `图表内容各区域`;

    return {
      ...toRefs(state),
      infoMessage,
    };
  },
});
export const smallWithTitleTemplateProps = smallWithTitleTemplate.bind({});
smallWithTitleTemplateProps.args = {
  category: 'small',
  title: '标题',
  actions: '操作',
};
smallWithTitleTemplateProps.storyName = '小尺寸卡片-带标题';

const smallWithFilterTemplate = (args) => ({
  components: { TCard, MessagePlugin },
  template: `<t-card
  :title="title"
  :category="category"
  hover-shadow
  :style="{ width: '657px' }"
>
  {{ infoMessage }}
  <template #filter>筛选区</template>
</t-card>`,
  setup() {
    const state = reactive({
      ...args,
    });

    const infoMessage = `图表内容各区域`;

    return {
      ...toRefs(state),
      infoMessage,
    };
  },
});
export const smallWithFilterTemplateProps = smallWithFilterTemplate.bind({});
smallWithFilterTemplateProps.args = {
  category: 'small',
  title: '标题',
};
smallWithFilterTemplateProps.storyName = '小尺寸卡片-带筛选区域';

const smallWithIndexTemplate = (args) => ({
  components: { TCard, MessagePlugin },
  template: `<t-card
  :title="title"
  :category="category"
  hover-shadow
  :style="{ width: '657px' }"
>
  {{ infoMessage }}
  <template #filter>筛选区</template>
  <template #date>日期展示区域</template>
</t-card>`,
  setup() {
    const state = reactive({
      ...args,
    });

    const infoMessage = `图表内容各区域`;

    return {
      ...toRefs(state),
      infoMessage,
    };
  },
});
export const smallWithIndexTemplateProps = smallWithIndexTemplate.bind({});
smallWithIndexTemplateProps.args = {
  category: 'small',
  title: '我是标题',
};
smallWithIndexTemplateProps.storyName = '小尺寸卡片-带指标区域';
