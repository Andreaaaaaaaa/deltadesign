import { reactive, toRefs, ref } from 'vue';
import Icon from '../src/components/icon';
import { Button as TButton } from '../src/components/button/index';
import '../src/components/button/style';

export default {
  title: '基础/Button 按钮',
  component: { TButton },
  argTypes: {},
};

// 基础按钮
const baseTemplate = (args) => ({
  components: { TButton },
  template: `<div class="aw-grid aw-grid-cols-5 aw-gap-2 aw-grid-rows-2">
  <t-button theme="primary" variant="base"> 主要按钮 </t-button>
  <t-button theme="default" variant="outline"> 次要按钮 </t-button>
  <t-button theme="danger" variant="outline"> 次要告警 </t-button>
  <t-button theme="danger"> 告警按钮 </t-button>
  <span>
  <t-button theme="primary" variant="text"> 文字按钮 </t-button>
  </span>

  <t-button disabled theme="primary" variant="base"> 主要按钮 </t-button>
  <t-button disabled theme="default" variant="outline"> 次要按钮 </t-button>
  <t-button disabled theme="danger" variant="outline"> 次要告警 </t-button>
  <t-button disabled theme="danger"> 告警按钮 </t-button>
  <span>
  <t-button disabled theme="primary" variant="text"> 文字按钮 </t-button>
  </span>
</div>
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

export const base = baseTemplate.bind({});
base.args = {};
base.storyName = 'Base 基础类型';

// 图标按钮
const iconTemplate = (args) => ({
  components: { TButton, Icon },
  template: `<div class="demo-button-icon">
  <div class="aw-grid aw-grid-rows-4 aw-grid-flow-col aw-gap-2">
    <div class="aw-grid aw-grid-cols-2 aw-gap-2">
      <div>
        <t-button theme="primary">
          <template #icon>
            <icon name="add" />
          </template>
          新建
        </t-button>
      </div>
      <div>
      <t-button variant="outline">
        <template #icon>
          <icon name="cloud-upload" />
        </template>
        上传文件
      </t-button>
      </div>
    </div>
    <div class="aw-grid aw-grid-cols-2 aw-gap-2">
      <div>
        <t-button shape="circle" theme="primary">
          <template #icon>
            <icon name="discount" />
          </template>
        </t-button>
      </div>
      <div>
        <t-button shape="circle" theme="primary">
          <template #icon>
            <icon name="cloud-download" />
          </template>
        </t-button>
      </div>
    </div>
    <!-- 使用 function 的形式定义 icon -->
    <div class="aw-grid aw-grid-cols-2 aw-gap-2">
      <div>
        <t-button variant="outline" :icon="renderIcon"> Function Icon </t-button>
      </div>
    </div>
  </div>
</div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const icon = iconTemplate.bind({});
icon.args = {
  renderIcon: () => {
    return <Icon name="search" />;
  },
};
icon.storyName = 'Icon 图标按钮';

// ghost按钮
const TemplateGhost = (args) => ({
  components: { TButton, Icon },
  template: `  <div class="aw-grid aw-grid-rows-4 aw-grid-cols-3 aw-gap-2">

    <t-button variant="outline" ghost> 幽灵按钮 </t-button>
    <t-button variant="dashed" ghost> 幽灵按钮 </t-button>
    <span>
    <t-button variant="text" ghost> 幽灵按钮 </t-button>
    </span>

    <t-button variant="outline" theme="primary" ghost> 幽灵按钮 </t-button>
    <t-button variant="dashed" theme="primary" ghost> 幽灵按钮 </t-button>
    <span>
    <t-button variant="text" theme="primary" ghost> 幽灵按钮 </t-button>
    </span>

    <t-button variant="outline" theme="success" ghost> 幽灵按钮 </t-button>
    <t-button variant="dashed" theme="success" ghost> 幽灵按钮 </t-button>
    <span>
    <t-button variant="text" theme="success" ghost> 幽灵按钮 </t-button>
    </span>

    <t-button variant="outline" theme="warning" ghost> 幽灵按钮 </t-button>
    <t-button variant="dashed" theme="warning" ghost> 幽灵按钮 </t-button>
    <span>
    <t-button variant="text" theme="warning" ghost> 幽灵按钮 </t-button>
    </span>

    <t-button variant="outline" theme="danger" ghost> 幽灵按钮 </t-button>
    <t-button variant="dashed" theme="danger" ghost> 幽灵按钮 </t-button>
    <span>
    <t-button variant="text" theme="danger" ghost> 幽灵按钮 </t-button>
    </span>

</div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const ghost = TemplateGhost.bind({});
ghost.args = {
  renderIcon: () => {
    return <Icon name="search" />;
  },
};
ghost.storyName = 'Ghost 幽灵按钮';

// theme按钮
const themeTemplate = (args) => ({
  components: { TButton, Icon },
  template: ` <div class="aw-grid aw-grid-rows-5 aw-grid-cols-4 aw-gap-2">

    <t-button theme="default"> 填充按钮 </t-button>
    <t-button variant="outline" theme="default"> 描边按钮 </t-button>
    <t-button variant="dashed" theme="default"> 虚框按钮 </t-button>
    <span>
    <t-button variant="text" theme="default"> 文字按钮 </t-button>
    </span>

    <t-button theme="primary"> 填充按钮 </t-button>
    <t-button variant="outline" theme="primary"> 描边按钮 </t-button>
    <t-button variant="dashed" theme="primary"> 虚框按钮 </t-button>
    <span>
    <t-button variant="text" theme="primary"> 文字按钮 </t-button>
    </span>

    <t-button theme="danger"> 填充按钮 </t-button>
    <t-button variant="outline" theme="danger"> 描边按钮 </t-button>
    <t-button variant="dashed" theme="danger"> 虚框按钮 </t-button>
    <span>
    <t-button variant="text" theme="danger"> 文字按钮 </t-button>
    </span>

    <t-button theme="warning"> 填充按钮 </t-button>
    <t-button variant="outline" theme="warning"> 描边按钮 </t-button>
    <t-button variant="dashed" theme="warning"> 虚框按钮 </t-button>
    <span>
    <t-button variant="text" theme="warning"> 文字按钮 </t-button>
    </span>

    <t-button theme="success"> 填充按钮 </t-button>
    <t-button variant="outline" theme="success"> 描边按钮 </t-button>
    <t-button variant="dashed" theme="success"> 虚框按钮 </t-button>
    <span>
    <t-button variant="text" theme="success"> 文字按钮 </t-button>
    </span>

</div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const theme = themeTemplate.bind({});
theme.args = {};
theme.storyName = '按钮样式';

// status按钮
const statusTemplate = (args) => ({
  components: { TButton },
  template: ` <div class="aw-grid aw-grid-cols-2 aw-gap-2">
  <t-button :disabled="disabled"> 填充按钮 </t-button>
  <t-button loading> 加载中 </t-button>
</div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const status = statusTemplate.bind({});
status.argTypes = {
  disabled: {
    control: { type: 'boolean', defaultValue: true },
  },
};
status.storyName = 'Status 按钮状态';

// size按钮
const sizeTemplate = (args) => ({
  components: { TButton },
  template: `<div class="aw-grid aw-grid-rows-3 aw-gap-2">
  <div class="aw-grid aw-grid-cols-4 aw-gap-2">
    <div class="item">
      <t-button theme="primary" size="small" variant="base"> 填充按钮 </t-button>
    </div>
    <div class="item">
      <t-button size="small" variant="outline"> 描边按钮 </t-button>
    </div>
    <div class="item">
      <t-button size="small" variant="dashed"> 虚框按钮 </t-button>
    </div>
    <div class="item">
      <t-button size="small" variant="text"> 文字按钮 </t-button>
    </div>
  </div>
  <div class="aw-grid aw-grid-cols-4 aw-gap-2">
    <div class="item">
      <t-button theme="primary" size="medium" variant="base"> 填充按钮 </t-button>
    </div>
    <div class="item">
      <t-button size="medium" variant="outline"> 描边按钮 </t-button>
    </div>
    <div class="item">
      <t-button size="medium" variant="dashed"> 虚框按钮 </t-button>
    </div>
    <div class="item">
      <t-button size="medium" variant="text"> 文字按钮 </t-button>
    </div>
  </div>
  <div class="aw-grid aw-grid-cols-4 aw-gap-2">
    <div class="item">
      <t-button theme="primary" size="large" variant="base"> 填充按钮 </t-button>
    </div>
    <div class="item">
      <t-button size="large" variant="outline"> 描边按钮 </t-button>
    </div>
    <div class="item">
      <t-button size="large" variant="dashed"> 虚框按钮 </t-button>
    </div>
    <div class="item">
      <t-button size="large" variant="text"> 文字按钮 </t-button>
    </div>
  </div>
</div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const size = sizeTemplate.bind({});
size.argTypes = {};
size.storyName = 'Size 按钮大小';
