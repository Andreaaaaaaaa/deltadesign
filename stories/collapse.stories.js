// import { action } from '@storybook/addon-actions';
import { reactive, toRefs, ref } from 'vue';
import { Button as TButton } from 'tdesign-vue-next/esm/button';
import { TagInput as TTagInput } from 'tdesign-vue-next/esm/tag-input';
import { Radio as TRadio, RadioGroup as TRadioGroup } from 'tdesign-vue-next/esm/radio';
import { Checkbox as TCheckbox } from 'tdesign-vue-next/esm/checkbox';
import { Collapse as TCollapse, CollapsePanel as TCollapsePanel } from '../src/components/collapse/index.ts';

import '../src/assets/collapse-hook.scss';
import './collapse.scss';

export const actionsData = {
  // onShowDialog: action('click'),å
};

export default {
  title: '数据展示/Collapse 折叠面板',
  component: { TCollapse, TCollapsePanel },
  argTypes: {
    borderless: {
      description: `是否为无边框模式`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
    },
    defaultExpandAll: {
      description: `默认是否展开全部`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      description: '是否禁用面板展开/收起操作',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
      },
      control: {
        type: 'boolean',
      },
    },
    expandIcon: {
      description:
        '展开图标。值为 undefined 或 false 则不显示展开图标；值为 true 显示默认图标；值类型为函数，则表示完全自定义展开图标。TS 类型：boolean | TNode。',
      table: {
        category: 'Props',
        type: { summary: 'Boolean / Slot / Function' },
        defaultValue: { summary: true },
      },
      control: {
        type: 'boolean',
      },
    },
    expandIconPlacement: {
      description: '展开图标的位置，左侧或右侧。可选项：left/right',
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'left' },
      },
      control: {
        type: 'inline-radio',
        options: ['left', 'right'],
      },
    },
    expandMutex: {
      description: '每个面板互斥展开，每次只展开一个面板',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
    },
    expandOnRowClick: {
      description: '是否允许点击整行标题展开面板',
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: true },
      },
      control: {
        type: 'boolean',
      },
    },
    value: {
      description:
        '展开的面板集合。支持语法糖 v-model 或 v-model:value。TS 类型：CollapseValue type CollapseValue = Array<string | number>。',
      table: {
        category: 'Props',
        type: { summary: 'Array' },
      },
      control: {
        type: 'object',
      },
    },
    defaultValue: {
      description: `展开的面板集合。非受控属性。TS 类型：CollapseValue type CollapseValue = Array<string | number>。`,
      table: {
        category: 'Props',
        type: { summary: 'Array' },
      },
      control: {
        type: 'object',
      },
    },
    onChange: {
      description: `TS 类型：(value: CollapseValue) => void
      切换面板时触发，返回变化的值`,
      table: {
        category: 'Props',
        type: { summary: 'Function' },
      },
      control: {
        type: null,
      },
    },
    change: {
      description: `切换面板时触发，返回变化的值`,
      table: {
        category: 'Events',
        type: { summary: '(value: CollapseValue)' },
      },
      control: {
        type: null,
      },
    },

    // CollapsePanel Props

    content: {
      description: `折叠面板内容。TS 类型：string | TNode。`,
      table: {
        category: 'CollapsePanel Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: null,
      },
    },
    default: {
      description: `折叠面板内容，同 content。TS 类型：string | TNode。`,
      table: {
        category: 'CollapsePanel Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: null,
      },
    },
    destroyOnCollapse: {
      description: `当前面板处理折叠状态时，是否销毁面板内容`,
      table: {
        category: 'CollapsePanel Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
    },
    panelDisabled: {
      name: 'disabled',
      description: `禁止当前面板展开，优先级大于 Collapse 的同名属性	`,
      table: {
        category: 'CollapsePanel Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: undefined },
      },
      control: {
        type: 'boolean',
      },
    },
    panelExpandIcon: {
      name: 'expandIcon',
      description: `当前折叠面板展开图标，优先级大于 Collapse 的同名属性。TS 类型：boolean | TNode。`,
      table: {
        category: 'CollapsePanel Props',
        type: { summary: 'Boolean / Slot / Function' },
        defaultValue: { summary: undefined },
      },
      control: {
        type: null,
      },
    },
    header: {
      description: `面板头内容。TS 类型：string | TNode。`,
      table: {
        category: 'CollapsePanel Props',
        type: { summary: 'String / Slot / Function' },
        defaultValue: { summary: '' },
      },
      control: {
        type: null,
      },
    },
    headerRightContent: {
      description: `当前步骤标识`,
      table: {
        category: 'CollapsePanel Props',
        type: { summary: '面板头的右侧区域，一般用于呈现面板操作。TS 类型：string | TNode。' },
      },
      control: {
        type: null,
      },
    },
    panelValue: {
      description: `当前面板唯一标识，如果值为空则取当前面下标兜底作为唯一标识`,
      table: {
        category: 'CollapsePanel Props',
        type: { summary: 'String / Number' },
      },
      control: {
        type: null,
      },
    },
  },
  excludeStories: /.Data$/,
};

const aControlTemplate = (args) => ({
  components: { TCollapse, TCollapsePanel, TTagInput },
  template: `  <div class="tdesign-collapse">
  <t-collapse
  :disabled="disabled"
  :borderless="borderless"
  @Change="handlePanelChange"
  :defaultExpandAll="defaultExpandAll"
  :expandIcon="expandIcon"
  :expandIconPlacement="expandIconPlacement"
  :expandMutex="expandMutex"
  :expandOnRowClick="expandOnRowClick"
  >
  <t-collapse-panel value="0" header="这是一个折叠标题">
    这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
  </t-collapse-panel>
  <t-collapse-panel value="1">
    <template #header>这是一个折叠标题</template>
    <template #default
      >这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。</template
    >
  </t-collapse-panel>
  <t-collapse-panel value="2">
    <template #header>这是一个折叠标题</template>
    这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
  </t-collapse-panel>
</t-collapse>
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
  disabled: false,
  borderless: false,
  defaultExpandAll: false,
  expandIcon: true,
  expandIconPlacement: 'left',
  expandMutex: false,
  expandOnRowClick: true,
};
aControl.storyName = '控制';

// 基础折叠面板
const Template = (args) => ({
  components: { TCollapse, TCollapsePanel, TTagInput },
  template: `  <div class="tdesign-collapse">
  <t-collapse :default-value="[1]" @change="handlePanelChange">
    <t-collapse-panel header="这是一个折叠标题">
      这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
    </t-collapse-panel>
    <t-collapse-panel destroy-on-collapse header="设置默认展开项">
      这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
    </t-collapse-panel>
    <t-collapse-panel header="自定义折叠面板内容">
      <div class="tdesign-demo-block-column" style="width: 80%">
        <t-tag-input v-model="tags1" clearable @paste="onPaste" @enter="onTagInputEnter" />
        <t-tag-input :value="tags2" label="Controlled: " clearable @change="onChange" />
        <t-tag-input :default-value="tags3" label="UnControlled: " clearable />
      </div>
    </t-collapse-panel>
    <t-collapse-panel header="嵌套折叠面板">
      <t-collapse default-expand-all>
        <t-collapse-panel header="子面板1"> 这是子面板1 </t-collapse-panel>
        <t-collapse-panel header="子面板2"> 这是子面板2 </t-collapse-panel>
        <t-collapse-panel header="子面板3"> 这是子面板3 </t-collapse-panel>
        <t-collapse-panel header="子面板4"> 这是子面板4 </t-collapse-panel>
      </t-collapse>
    </t-collapse-panel>
  </t-collapse>
  <div style="margin-top: 10px">当前展开项:{{ currentItem }}</div>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const currentItem = ref([1]);
    const tags1 = ref(['Vue', 'React']);
    const tags2 = ref(['Vue', 'React']);
    const tags3 = ref(['Vue', 'React']);
    const handlePanelChange = (val) => {
      console.log('val>>>>>>', val);
      currentItem.value = val;
    };

    const onTagInputEnter = (val, context) => {
      console.log(val, context);
    };
    const onChange = (val, context) => {
      console.log(val, context);
      tags2.value = val;
    };
    const onPaste = (context) => {
      console.log(context);
    };
    return {
      tags1,
      tags2,
      tags3,
      handlePanelChange,
      onTagInputEnter,
      onChange,
      onPaste,
      ...toRefs(state),
    };
  },
});

export const base = Template.bind({});
base.args = {};
base.storyName = '基础折叠面板';

// 手风琴模式折叠面板
const mutexTemplate = (args) => ({
  components: { TCollapse, TCollapsePanel },
  template: `  <div class="tdesign-collapse">
  <t-collapse v-model="currentItem" expand-mutex @Change="handlePanelChange">
    <t-collapse-panel value="0" header="这是一个折叠标题">
      这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
    </t-collapse-panel>
    <t-collapse-panel value="1">
      <template #header>这是一个折叠标题</template>
      <template #default
        >这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。</template
      >
    </t-collapse-panel>
    <t-collapse-panel value="2">
      <template #header>这是一个折叠标题</template>
      这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
    </t-collapse-panel>
    <t-collapse-panel value="3" header="这是一个折叠标题">
      这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
    </t-collapse-panel>
  </t-collapse>
  <div style="margin-top: 10px">当前展开项：{{ currentItem }}</div>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      currentItem: [],
    });
    const handlePanelChange = (val) => {
      console.log(val);
    };
    return {
      ...toRefs(state),
      handlePanelChange,
    };
  },
});
export const mutex = mutexTemplate.bind({});
mutex.args = {};
mutex.storyName = '手风琴模式折叠面板';

// 可设置图标的折叠面板
const iconsTemplate = (args) => ({
  components: { TCollapse, TCollapsePanel, TRadioGroup, TCheckbox, TRadio },
  template: `  <div class="tdesign-collapse">
  <t-collapse :expand-icon="showArrow" :expand-icon-placement="direction" :expand-on-row-click="!onlyIcon">
    <t-collapse-panel value="0" header="这是一个折叠标题">
      这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
    </t-collapse-panel>
    <t-collapse-panel value="1">
      <template #header>这是一个折叠标题</template>
      <template #default
        >这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。</template
      >
    </t-collapse-panel>
    <t-collapse-panel value="2">
      <template #header>这是一个折叠标题</template>
      这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
    </t-collapse-panel>
    <t-collapse-panel value="3" header="这是一个折叠标题">
      这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
    </t-collapse-panel>
  </t-collapse>
  <div class="button-area">
    <t-checkbox v-model="showArrow">显示箭头</t-checkbox>
    <t-radio-group v-model="direction">
      <t-radio value="left">左边</t-radio>
      <t-radio value="right">右边</t-radio>
    </t-radio-group>
  </div>
  <div >
    <t-checkbox v-model="onlyIcon">仅图标响应点击</t-checkbox>
  </div>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      showArrow: true,
      direction: 'left',
      disable: false,
      onlyIcon: false,
    });
    return {
      ...toRefs(state),
    };
  },
});
export const icons = iconsTemplate.bind({});
icons.args = {};
icons.storyName = '可设置图标的折叠面板';

// 可设置右侧操作的折叠面板
const rightSlotTemplate = (args) => ({
  components: { TCollapse, TCollapsePanel, TCheckbox, TButton },
  template: `  <div class="tdesign-collapse">
  <t-collapse>
    <t-collapse-panel value="0" header="这是一个折叠标题可以设置右侧操作区域" :disabled="disable0">
      <template #headerRightContent>
        <t-checkbox v-model="disable0">禁用</t-checkbox>
        <t-button size="small">操作</t-button>
      </template>
      这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
    </t-collapse-panel>
    <t-collapse-panel value="1" header="这是一个折叠标题可以设置右侧操作区域" :disabled="disable1">
      <template #headerRightContent>
        <t-checkbox v-model="disable1">禁用</t-checkbox>
        <t-button size="small">操作</t-button>
      </template>
      这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
    </t-collapse-panel>
    <t-collapse-panel value="2" header="这是一个折叠标题可以设置右侧操作区域" :disabled="disable2">
      <template #headerRightContent>
        <t-checkbox v-model="disable2">禁用</t-checkbox>
        <t-button size="small">操作</t-button>
      </template>
      这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
    </t-collapse-panel>
    <t-collapse-panel value="3" header="这是一个折叠标题可以设置右侧操作区域" :disabled="disable3">
      <template #headerRightContent>
        <t-checkbox v-model="disable3">禁用</t-checkbox>
        <t-button size="small">操作</t-button>
      </template>
      这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
    </t-collapse-panel>
  </t-collapse>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      disable0: false,
      disable1: true,
      disable2: false,
      disable3: true,
    });
    return {
      ...toRefs(state),
    };
  },
});
export const rightSlot = rightSlotTemplate.bind({});
rightSlot.args = {};
rightSlot.storyName = '可设置右侧操作的折叠面板';

// 不同模式的折叠面板
const otherTemplate = (args) => ({
  components: { TCollapse, TCollapsePanel, TCheckbox },
  template: `  <div class="tdesign-collapse">
  <t-collapse :disabled="disabled" :borderless="borderless" @Change="handlePanelChange">
    <t-collapse-panel value="0" header="这是一个折叠标题">
      这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
    </t-collapse-panel>
    <t-collapse-panel value="1">
      <template #header>这是一个折叠标题</template>
      <template #default
        >这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。</template
      >
    </t-collapse-panel>
    <t-collapse-panel value="2">
      <template #header>这是一个折叠标题</template>
      这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
    </t-collapse-panel>
    <t-collapse-panel value="3" header="这是一个折叠标题">
      这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
    </t-collapse-panel>
  </t-collapse>
  <div class="button-area">
    <t-checkbox v-model="disabled">全部禁用</t-checkbox>
    <t-checkbox v-model="borderless">无边框模式</t-checkbox>
  </div>
</div>`,
  setup() {
    const state = reactive({
      ...args,
      disabled: false,
      borderless: false,
    });
    const handlePanelChange = (val) => {
      console.log('panel>>>>>>', val);
    };
    return {
      handlePanelChange,
      ...toRefs(state),
    };
  },
});
export const other = otherTemplate.bind({});
other.args = {};
other.storyName = '不同模式的折叠面板';
