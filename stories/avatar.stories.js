import { computed, reactive, toRefs } from 'vue';
import { UserIcon, EllipsisIcon } from 'tdesign-icons-vue-next';
import { Avatar as TAvatar, AvatarGroup as TAvatarGroup } from '../src/components/avatar/index';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#defaulAexport
export default {
  title: '数据展示/Avatar 头像',
  component: TAvatar,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    alt: {
      control: { type: 'text' },
      description: '头像替换文本',
      table: {
        category: 'Avatar Props',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    hideOnLoadFailed: {
      control: { type: 'boolean' },
      description: '加载失败时隐藏图片',
      defaultValue: false,
      table: {
        category: 'Avatar Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: false },
      },
    },
    icon: {
      description: '图标。',
      table: {
        category: 'Avatar Props',
        type: {
          summary: 'TS 类型：TNode。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    image: {
      control: { type: 'text' },
      description: '图片地址',
      table: {
        category: 'Avatar Props',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'round'],
      description: '形状。可选项：circle/round。',
      defaultValue: 'circle',
      table: {
        category: 'Avatar Props',
        type: {
          summary: 'TS 类型：ShapeEnum。',
          // detail: '',
        },
        defaultValue: { summary: 'circle' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '尺寸，示例值：small/medium/large/24px/38px 等，默认为large',
      table: {
        category: 'Avatar Props',
        type: {
          // summary: 'lar',
          // detail: '',
        },
        defaultValue: { summary: 'large' },
      },
      // defaultValue: 'large',
    },
    onError: {
      description: '图片加载失败时触发。',
      table: {
        category: 'Avatar Props',
        type: {
          summary: 'TS 类型：() => void',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    error: {
      description: '图片加载失败时触发',
      table: {
        category: 'Avatar Events',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    cascading: {
      description: '图片之间的层叠关系，可选值：左侧图片在上和右侧图片在上。可选项：left-up/right-up。',
      table: {
        category: 'AvatarGroup Props',
        type: {
          summary: 'TS 类型：CascadingValue。',
          // detail: '',
        },
        defaultValue: { summary: 'right-up' },
      },
    },
    collapseAvatar: {
      description: '头像数量超出时，会出现一个头像折叠元素。该元素内容可自定义。默认为 +N。示例：+5，..., 更多。',
      table: {
        category: 'AvatarGroup Props',
        type: {
          summary: 'TS 类型：string | TNode。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    max: {
      description: '能够同时显示的最多头像数量',
      table: {
        category: 'AvatarGroup Props',
        type: {
          // summary: '',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    placement: {
      description: '超出的头像呈现位置。可选项：left/top/bottom/right。',
      table: {
        category: 'AvatarGroup Props',
        type: {
          summary: 'TS 类型：MaxOverPlacement。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    popupProps: {
      description: '头像右上角提示信息。',
      table: {
        category: 'AvatarGroup Props',
        type: {
          summary: 'TS 类型：PopupProps。',
          // detail: '',
        },
        // defaultValue: { summary: '' },
      },
    },
    AvatarGroupSize: {
      name: 'size',
      description: '尺寸，示例值：small/medium/large/24px/38px 等。优先级低于 Avatar.size',
      table: {
        category: 'AvatarGroup Props',
        type: {
          // summary: '',
          // detail: '',
        },
        defaultValue: { summary: 'medium' },
      },
    },
  },
};

// 控制
const aControlTemplate = (args) => ({
  components: { TAvatar },

  template: `
    <t-avatar :image="image" :shape="shape" size="size" :hide-on-load-failed="false" />
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
  alt: 'test',
  hideOnLoadFailed: false,
  image: 'https://tdesign.gtimg.com/site/avatar.jpg',
  shape: 'circle',
  size: 'large',
};
aControl.storyName = '控制';

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const DifferentTypeAvatarTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TAvatar, TAvatarGroup, UserIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const icon = computed(() => () => <UserIcon />);
    const image = 'https://tdesign.gtimg.com/site/avatar.jpg';
    return { args, icon, image };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div class="demo-avatar">
      <t-avatar :image="image" :hide-on-load-failed="false" />
      <t-avatar>W</t-avatar>
      <t-avatar :icon="icon" />
      <t-avatar>
        <template #icon>
          <UserIcon />
        </template>
      </t-avatar>
    </div>
  `,
});

export const DifferentTypeAvatar = DifferentTypeAvatarTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
DifferentTypeAvatar.args = {};
DifferentTypeAvatar.storyName = '头像类型';

const DifferentShapeAvatarTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TAvatar, TAvatarGroup, UserIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div class="demo-avatar">
      <t-avatar>W</t-avatar>
      <t-avatar shape="round"> W </t-avatar>
    </div>
  `,
});

export const DifferentShapeAvatar = DifferentShapeAvatarTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
DifferentShapeAvatar.args = {};
DifferentShapeAvatar.storyName = '头像形状';

const DifferentSizeAvatarTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TAvatar, TAvatarGroup, UserIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div class="demo-avatar">
      <div class="demo-avatar-block">
        <t-avatar size="small"> W </t-avatar>
        <t-avatar size="medium"> W </t-avatar>
        <t-avatar size="large"> W </t-avatar>
        <t-avatar size="100px"> W </t-avatar>
      </div>
      <div class="demo-avatar-block">
        <t-avatar shape="round" size="small"> W </t-avatar>
        <t-avatar shape="round" size="medium"> W </t-avatar>
        <t-avatar shape="round" size="large"> W </t-avatar>
        <t-avatar shape="round" size="100px"> W </t-avatar>
      </div>
    </div>
  `,
});

export const DifferentSizeAvatar = DifferentSizeAvatarTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
DifferentSizeAvatar.args = {};
DifferentSizeAvatar.storyName = '头像大小';

const GroupAvatarTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TAvatar, TAvatarGroup, UserIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const icon = computed(() => () => <UserIcon />);
    const image = 'https://tdesign.gtimg.com/site/avatar.jpg';
    return { args, icon, image };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div class="demo-avatar">
      <div class="demo-avatar-block">
        <t-avatarGroup>
          <t-avatar :image="image" />
          <t-avatar>W</t-avatar>
          <t-avatar :icon="icon" />
        </AvatarGroup>
      </div>
      <div class="demo-avatar-block">
        <t-avatarGroup size="large">
          <t-avatar :image="image" />
          <t-avatar>W</t-avatar>
          <t-avatar :icon="icon" />
        </AvatarGroup>
      </div>
    </div>
  `,
});

export const GroupAvatar = GroupAvatarTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
GroupAvatar.args = {};
GroupAvatar.storyName = '组合头像';

const GroupAvatarCountTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TAvatar, TAvatarGroup, UserIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const icon = () => <UserIcon />;
    const ellipsisIcon = () => <EllipsisIcon />;
    const image = 'https://tdesign.gtimg.com/site/avatar.jpg';
    return { args, icon, image, ellipsisIcon };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div class="demo-avatar">
      <div class="demo-avatar-block">
      <t-avatarGroup size="large" :max="2">
        <t-avatar :image="image" />
        <t-avatar>Avatar</t-avatar>
        <t-avatar :image="image" />
      </AvatarGroup>
      </div>
      <div class="demo-avatar-block">
        <t-avatarGroup size="large" :max="2" :collapse-avatar="ellipsisIcon">
          <t-avatar :image="image" />
          <t-avatar>Avatar</t-avatar>
          <t-avatar :icon="icon" />
        </AvatarGroup>
      </div>
      <div class="demo-avatar-block">
        <t-avatarGroup size="large" :max="2" collapse-avatar="more">
          <t-avatar :image="image" />
          <t-avatar>Avatar</t-avatar>
          <t-avatar :icon="icon" />
        </AvatarGroup>
      </div>
    </div>
  `,
});

export const GroupAvatarCount = GroupAvatarCountTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
GroupAvatarCount.args = {};
GroupAvatarCount.storyName = '组合头像个数';
