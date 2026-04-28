// import { action } from '@storybook/addon-actions';
import { reactive, toRefs, ref } from 'vue';
import { Button as TButton } from 'tdesign-vue-next/esm/button';
import { Textarea as TTextarea } from 'tdesign-vue-next/esm/textarea';
import { Icon as TIcon } from 'tdesign-vue-next/esm/icon';
import { list as TList, listItem as TListItem } from 'tdesign-vue-next/esm/list';
import { Comment as TComment } from '../src/components/comment/index.ts';
import { MessagePlugin } from '../src/components/message/index.ts';

import '../src/assets/comment-hook.scss';
import './comment.scss';

export const actionsData = {};

export default {
  title: '数据展示/Comment 评论',
  component: { TComment },
  argTypes: {
    actions: {
      description: `操作。TS 类型：Array<TNode>。`,
      table: {
        category: 'Props',
        type: { summary: 'Array' },
      },
      control: {
        type: 'object',
      },
    },
    author: {
      description: `作者。TS 类型：string | TNode。`,
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: 'text',
      },
    },
    avatar: {
      description: '已头像。TS 类型：string | AvatarProps | TNode。',
      table: {
        category: 'Props',
        type: { summary: 'String / Object / Slot / Function' },
      },
      control: {
        type: null,
      },
    },
    content: {
      description: '内容。TS 类型：string | TNode。',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: 'text',
      },
    },
    datetime: {
      description: '时间。TS 类型：string | TNode。',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: 'text',
      },
    },
    quote: {
      description: '引用。TS 类型：',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: 'text',
      },
    },
    reply: {
      description: '回复。TS 类型：string | TNode。',
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: 'text',
      },
    },
  },
  excludeStories: /.Data$/,
};
const aControlTemplate = (args) => ({
  components: { TComment },
  template: ` <div>
  <t-comment
    avatar="https://tdesign.gtimg.com/site/avatar.jpg"
    :author="author"
    :datetime="datetime"
    :content="content"
    :quote="quote"
    :reply="reply"
  />
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

export const aControl = aControlTemplate.bind({});
aControl.args = {
  author: '评论作者名',
  content: '这里是评论者写的评论内容。',
  datetime: '今天16:38',
  quote: '这里是引用的内容',
  reply: '这里是回复的内容',
};
aControl.storyName = '控制';

// 基础评论
const baseTemplate = (args) => ({
  components: { TComment },
  template: ` <div>
  <t-comment
    avatar="https://tdesign.gtimg.com/site/avatar.jpg"
    author="评论作者名"
    datetime="今天16:38"
    content="这里是评论者写的评论内容。"

  />
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

export const base = baseTemplate.bind({});
base.args = {};
base.storyName = '基础评论';

// 带操作评论
const operationTemplate = (args) => ({
  components: { TComment, TIcon },
  template: ` <div>
  <t-comment
  avatar="https://tdesign.gtimg.com/site/avatar.jpg"
  author="评论作者名"
  datetime="今天16:38"
  content="这里是评论者写的评论内容。"
>
  <template #actions>
    <span key="thumbUp">
      <t-icon name="thumb-up" />
      <span class="action-text">6</span>
    </span>
    <span key="chat">
      <t-icon name="chat" />
      <span class="action-text">回复</span>
    </span>
  </template>
</t-comment>
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
export const operation = operationTemplate.bind({});
operation.args = {};
operation.storyName = '带操作评论';

// 列表评论
const listTemplate = (args) => ({
  components: { TComment, TList, TListItem, TIcon },
  template: `<t-list :split="true">
  <t-list-item v-for="(item, index) in commentsData" :key="index">
      <t-comment :avatar="item.avatar" :author="item.author" :datetime="item.datetime" :content="item.content">
        <template #actions>
          <span key="thumbUp">
            <t-icon name="thumb-up" />
            <span class="action-text">6</span>
          </span>
          <span key="chat">
            <t-icon name="chat" />
            <span class="action-text">回复</span>
          </span>
        </template>
      </t-comment>
  </t-list-item>
</t-list>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      commentsData: [
        {
          id: 'A',
          avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
          author: '评论作者名A',
          datetime: '今天16:38',
          content: '评论作者名A写的评论内容。',
        },
        {
          id: 'B',
          avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
          author: '评论作者名B',
          datetime: '今天16:38',
          content: '评论作者名B写的评论内容。',
        },
        {
          id: 'C',
          avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
          author: '评论作者名C',
          datetime: '今天16:38',
          content: '评论作者名C写的评论内容。',
        },
      ],
    });
    return {
      ...toRefs(state),
    };
  },
});
export const list = listTemplate.bind({});
list.args = {};
list.storyName = '列表评论';

// 带引用评论
const quoteTemplate = (args) => ({
  components: { TComment, TIcon },
  template: `  <t-comment
  avatar="https://tdesign.gtimg.com/site/avatar.jpg"
  author="评论作者名"
  datetime="今天16:38"
  content="这里是评论者写的评论内容。"
>
  <template #actions>
    <span key="thumbUp">
      <t-icon name="thumb-up" />
      <span class="action-text">6</span>
    </span>
    <span key="chat">
      <t-icon name="chat" />
      <span class="action-text">回复</span>
    </span>
  </template>
  <template #quote>
    <t-comment author="引用内容标题" content="引用评论内容。" />
  </template>
</t-comment>`,
  setup() {
    const state = reactive({
      ...args,
      current: 0,
    });
    return {
      ...toRefs(state),
    };
  },
});
export const quote = quoteTemplate.bind({});
quote.args = {};
quote.storyName = '带引用评论';

// 带回复评论
const replyTemplate = (args) => ({
  components: { TComment, TIcon },
  template: `  <t-comment
  avatar="https://tdesign.gtimg.com/site/avatar.jpg"
  author="评论作者名"
  datetime="今天16:38"
  content="这里是评论者写的评论内容。"
>
  <template #actions>
    <span key="thumbUp">
      <t-icon name="thumb-up" />
      <span class="action-text">6</span>
    </span>
    <span key="chat">
      <t-icon name="chat" />
      <span class="action-text">回复</span>
    </span>
  </template>

  <template #reply>
    <t-comment
      avatar="https://tdesign.gtimg.com/site/avatar.jpg"
      datetime="今天16:38"
      content="这里是评论者写的评论内容。"
    >
      <template #author>
        <span>评论作者名B</span>
        <t-icon name="caret-right-small" size="small" class="author-icon" />
        <span>评论作者名A</span>
      </template>

      <template #actions>
        <span key="thumbUp">
          <t-icon name="thumb-up" />
          <span class="action-text">6</span>
        </span>
        <span key="chat">
          <t-icon name="chat" />
          <span class="action-text">回复</span>
        </span>
      </template>
    </t-comment>
  </template>
</t-comment>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      current: 1,
    });
    return {
      ...toRefs(state),
    };
  },
});
export const reply = replyTemplate.bind({});
reply.args = {};
reply.storyName = '带回复评论';

// 带回复框评论
const replyFormTemplate = (args) => ({
  components: { TComment, TButton, TTextarea, MessagePlugin },
  template: `  <t-comment avatar="https://tdesign.gtimg.com/site/avatar.jpg">
  <template #content>
    <div class="form-container">
      <t-textarea v-model="replyData" placeholder="请输入内容" />
      <t-button class="form-submit" @click="submitReply">回复</t-button>
    </div>
  </template>
</t-comment>`,
  setup() {
    const state = reactive({
      ...args,
    });
    const replyData = ref('');

    const submitReply = () => {
      console.log('sdsds');
      MessagePlugin.info(replyData.value);
    };
    return {
      submitReply,
      replyData,
      ...toRefs(state),
    };
  },
});
export const replyForm = replyFormTemplate.bind({});
replyForm.args = {};
replyForm.storyName = '带回复框评论';
