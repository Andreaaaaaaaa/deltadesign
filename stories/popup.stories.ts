import { reactive, toRefs, ref, onMounted, onUnmounted, computed } from 'vue';
import { Button as TButton } from 'tdesign-vue-next/esm/button';
import { Popup as TPopup } from '../src/components/popup/index';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: '消息提醒/Popup 弹出层',
  component: { TPopup },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    attach: {
      description:
        "制定挂载节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：AttachNode。通用类型定义",
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'String / Function',
        },
        defaultValue: {
          summary: "'body'",
        },
      },
    },
    content: {
      description: '浮层里面的内容。TS 类型：string | TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    default: {
      description: '触发元素，同 triggerElement。TS 类型：string | TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    destroyOnClose: {
      description: '是否在关闭浮层时销毁浮层',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      description: '是否禁用组件',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    hideEmptyPopup: {
      description: '【开发中】浮层是否隐藏空内容，默认不隐藏',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    overlayClassName: {
      description:
        "浮层类名，示例：'name1 name2 name3' 或 ['name1', 'name2'] 或 [{ 'name1': true }]。TS 类型：ClassName。通用类型定义",
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'String / Object / Array',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    overlayStyle: {
      description:
        '浮层样式，第一个参数 triggerElement 表示触发元素 DOM 节点，第二个参数 popupElement 表示浮层元素 DOM 节点。TS 类型：Styles | ((triggerElement: HTMLElement, popupElement: HTMLElement) => Styles)。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean / Object / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    placement: {
      description:
        "浮层出现位置。TS 类型：PopupPlacement type PopupPlacement = 'top'|'left'|'right'|'bottom'|'top-left'|'top-right'|'bottom-left'|'bottom-right'|'left-top'|'left-bottom'|'right-top'|'right-bottom'。详细类型定义",
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: 'top',
        },
      },
    },
    showArrow: {
      description: '是否显示浮层箭头',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    trigger: {
      description: '触发浮层出现的方式。可选项：hover/click/focus/context-menu',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: 'hover',
        },
      },
    },
    triggerElement: {
      description: '触发元素。TS 类型：string | TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    visible: {
      description: '是否显示浮层。支持语法糖 v-model 或 v-model:visible。TS 类型：boolean',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    defaultVisible: {
      description: '是否显示浮层。非受控属性。TS 类型：boolean',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    zIndex: {
      description: '组件层级，Web 侧样式默认为 5500，移动端和小程序样式默认为 1500',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Number',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    onScroll: {
      description: 'TS 类型：(context: { e: WheelEvent }) => void 下拉选项滚动事件',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onVisibleChange: {
      description:
        "TS 类型：(visible: boolean, context: PopupVisibleChangeContext) => void 当浮层隐藏或显示时触发，trigger=document 表示点击非浮层元素触发；trigger=document 表示右击触发。详细类型定义。 interface PopupVisibleChangeContext { e?: PopupTriggerEvent; trigger?: PopupTriggerSource }  type PopupTriggerEvent = MouseEvent | FocusEvent | KeyboardEvent  type PopupTriggerSource = 'document' | 'trigger-element-click' | 'trigger-element-hover' | 'trigger-element-blur' | 'trigger-element-focus' | 'context-menu' | 'keydown-esc' ",
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
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
  components: { TPopup, TButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
      args,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<t-popup v-bind="args">
    <t-button variant="outline">浮层内容</t-button>
    </t-popup>`,
});

export const Demo = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Demo.args = {
  content: '浮层内容是指浮层里面显示的全部内容，这里的浮层内容使用渲染函数定义',
};

Demo.storyName = '基础';

const BaseTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TPopup, TButton },

  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
      args,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div>
  <!-- 共三种方式自定义浮层内容 -->

  <!-- 使用 content 属性渲染浮层内容 -->
  <div class="t-popup-demo-base-item">
    <t-popup content="可以在浮层内容中描述禁用原因">
      <t-button variant="outline" disabled>禁用状态</t-button>
    </t-popup>
  </div>

  <!-- 使用 content 插槽渲染浮层内容 -->
  <!-- slot="content" 写法不建议使用，请使用 #content 写法 -->
  <div class="t-popup-demo-base-item">
    <t-popup>
      <t-button variant="outline">触发元素</t-button>
      <!-- <div slot="content">触发元素是指触发浮层内容显示的元素</div> -->
      <template #content>
        <div>触发元素是指触发浮层内容显示的元素</div>
      </template>
    </t-popup>
  </div>
</div>`,
});

export const Base = BaseTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Base.args = {};
Base.storyName = '禁用';

const ContainerTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TPopup, TButton },

  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
      getAttach: () => document.querySelector('#second-popup'),
      args,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div>
  <div class="t-popup-demo-block" style="margin-right: 30px; display: inline-block;">
    <t-popup content="触发元素的父元素是组件根元素，通过 CSSSelector 定义" attach="#myPopup">
      <div id="myPopup">
        <t-button variant="outline">父元素为组件本身</t-button>
      </div>
    </t-popup>
  </div>
  <div id="second-popup" class="t-popup-demo-block" style="margin-right: 30px; display: inline-block;">
    <t-popup content="触发元素的父元素是组件跟元素，通过 Funnction 定义" :attach="getAttach">
      <t-button variant="outline">父元素为其他元素</t-button>
    </t-popup>
  </div>
</div>`,
});

export const Container = ContainerTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Container.args = {};
Container.storyName = '挂载元素';

const PositionTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TPopup, TButton },

  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
      getAttach: () => document.querySelector('#second-popup'),
      args,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div class="container">
  <t-popup class="placement top center" content="这是popup内容" placement="top" show-arrow destroy-on-close>
    <t-button variant="outline"> top </t-button>
  </t-popup>
  <t-popup class="placement top left" content="这是popup内容" placement="top-left" show-arrow destroy-on-close>
    <t-button variant="outline"> top-left </t-button>
  </t-popup>
  <t-popup class="placement top right" content="这是popup内容" placement="top-right" show-arrow destroy-on-close>
    <t-button variant="outline"> top-right </t-button>
  </t-popup>
  <t-popup class="placement bottom center" content="这是popup内容" placement="bottom" show-arrow destroy-on-close>
    <t-button variant="outline"> bottom </t-button>
  </t-popup>
  <t-popup class="placement bottom left" content="这是popup内容" placement="bottom-left" show-arrow destroy-on-close>
    <t-button variant="outline"> bottom-left </t-button>
  </t-popup>
  <t-popup
    class="placement bottom right"
    content="这是popup内容"
    placement="bottom-right"
    show-arrow
    destroy-on-close
  >
    <t-button variant="outline"> bottom-right </t-button>
  </t-popup>
  <t-popup class="placement align" content="这是popup内容" placement="left" show-arrow destroy-on-close>
    <t-button variant="outline"> left </t-button>
  </t-popup>
  <t-popup class="placement top-align" content="这是popup内容" placement="left-top" show-arrow destroy-on-close>
    <t-button variant="outline"> left-top </t-button>
  </t-popup>
  <t-popup class="placement bottom-align" content="这是popup内容" placement="left-bottom" show-arrow destroy-on-close>
    <t-button variant="outline"> left-bottom </t-button>
  </t-popup>
  <t-popup class="placement right-full align" content="这是popup内容" placement="right" show-arrow destroy-on-close>
    <t-button variant="outline"> right </t-button>
  </t-popup>
  <t-popup
    class="placement right-full top-align"
    content="这是popup内容"
    placement="right-top"
    show-arrow
    destroy-on-hide
  >
    <t-button variant="outline"> right-top </t-button>
  </t-popup>
  <t-popup
    class="placement right-full bottom-align"
    content="这是popup内容"
    placement="right-bottom"
    show-arrow
    destroy-on-hide
  >
    <t-button variant="outline"> right-bottom </t-button>
  </t-popup>
</div>`,
});

export const Position = PositionTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Position.args = {};
Position.storyName = '位置';

const DisplayTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TPopup, TButton },

  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
      getAttach: () => document.querySelector('#second-popup'),
      args,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div>
  <div class="t-popup-demo-base-item" style="display: inline-block;">
    <t-popup
      content="浮层拥有自定义类名，可以自定义浮层样式"
      overlay-class-name="tdesign-demo__custom-popup"
      placement="bottom"
    >
      <t-button variant="outline">自定义浮层类名</t-button>
    </t-popup>
  </div>

  <div class="t-popup-demo-base-item">
    <t-popup content="浮层宽度是固定的，不会随内容变化而变化" :overlay-style="{ width: '300px' }" placement="bottom">
      <t-button variant="outline">固定浮层宽度</t-button>
    </t-popup>
  </div>

  <div class="t-popup-demo-base-item">
    <t-popup
      content="可以设置浮层最大宽度，当内容超出最大宽度时，文本内容才会换行"
      :overlay-style="{ maxWidth: '250px' }"
      placement="bottom"
    >
      <t-button variant="outline">浮层最大宽度</t-button>
    </t-popup>
  </div>

  <div class="t-popup-demo-base-item">
    <t-popup
      content="overlayStyle 作为函数使用，可以让浮层内容和触发元素同宽"
      :overlay-style="(triggerElem) => ({ width: triggerElem.offsetWidth + 'px' })"
      placement="bottom"
    >
      <t-button variant="outline">浮层和触发元素同宽</t-button>
    </t-popup>
  </div>
</div>`,
});

export const Display = DisplayTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Display.args = {};
Display.storyName = '浮层样式';

const DestroyTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TPopup, TButton },

  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
      args,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div>
  <t-popup content="这是popup内容" destroy-on-close>
    <t-button variant="outline">隐藏即销毁</t-button>
  </t-popup>
</div>`,
});

export const Destroy = DestroyTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Destroy.args = {};
Destroy.storyName = '隐藏时销毁';
