// import { action } from '@storybook/addon-actions';
import { reactive, toRefs, ref, onMounted, watch, createApp } from 'vue';
import { Button as TButton } from 'tdesign-vue-next/es/button';
import { Switch as TSwitch } from 'tdesign-vue-next/es/switch';

import { Loading as TLoading, LoadingPlugin } from '../src/components/loading/index.ts';
import '../src/assets/loading-hook.scss';
import './loading.scss';

export const actionsData = {
  // onShowDialog: action('click'),å
};

export default {
  title: '数据展示/Loading 加载',
  component: { TLoading },
  argTypes: {
    attach: {
      description: `挂载元素，默认挂载到组件本身所在的位置。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：AttachNode。`,
      table: {
        category: 'Props',
        type: { summary: 'String / Function' },
        defaultValue: { summary: '' },
      },
      control: {
        type: null,
      },
    },
    content: {
      description: `子元素。TS 类型：string | TNode。`,
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: null,
      },
    },
    default: {
      description: `子元素，同 content。TS 类型：string | TNode。`,
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: null,
      },
    },
    delay: {
      description: `延迟显示加载效果的时间，用于防止请求速度过快引起的加载闪烁，单位：毫秒`,
      table: {
        category: 'Props',
        type: { summary: 'Number' },
        defaultValue: { summary: 0 },
      },
      control: {
        type: null,
      },
    },
    fullscreen: {
      description: `是否显示为全屏加载`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
    },
    indicator: {
      description: `加载指示符，值为 true 显示默认指示符，值为 false 则不显示，也可以自定义指示符。TS 类型：boolean | TNode`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean / Slot / Function' },
        defaultValue: { summary: true },
      },
      control: {
        type: 'boolean',
      },
    },
    inheritColor: {
      description: `是否继承父元素颜色`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
    },
    loading: {
      description: `是否处于加载状态`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: true },
      },
      control: {
        type: 'boolean',
      },
    },
    preventScrollThrough: {
      description: `防止滚动穿透，全屏加载模式有效`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: true },
      },
      control: {
        type: 'boolean',
      },
    },
    showOverlay: {
      description: `是否需要遮罩层，遮罩层对包裹元素才有效`,
      table: {
        category: 'Props',
        type: { summary: 'Boolean' },
        defaultValue: { summary: true },
      },
      control: {
        type: 'boolean',
      },
    },
    size: {
      description: `尺寸，示例：small/medium/large/12px/56px/0.3em`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'medium' },
      },
      control: {
        type: 'select',
        options: ['small', 'medium', 'large', '12px', '56px', '0.3em'],
      },
    },
    text: {
      description: `加载提示文案。TS 类型：string | TNode。`,
      table: {
        category: 'Props',
        type: { summary: 'String / Slot / Function' },
      },
      control: {
        type: null,
      },
    },
    zIndex: {
      description: `消息通知层级，样式默认为 3500`,
      table: {
        category: 'Props',
        type: { summary: 'Number' },
      },
      control: {
        type: null,
      },
    },
    direction: {
      description: `排布方向`,
      table: {
        category: 'Props',
        type: { summary: 'String' },
        defaultValue: { summary: 'horizontal' },
      },
      control: {
        type: 'select',
        options: ['horizontal', 'vertical'],
      },
    },
    options: {
      description: `必需。TS 类型：boolean | TdLoadingProps`,
      table: {
        category: 'LoadingPlugin',
        type: { summary: 'Function' },
      },
      control: {
        type: null,
      },
    },
  },
  excludeStories: /.Data$/,
};

// 基础
const aControlTemplate = (args) => ({
  components: { TLoading },
  template: ` <div style="width:200px;height:200px">

  <t-loading
  :indicator="indicator"
  :inherit-color="inheritColor"
  :loading="loading"
  :prevent-scroll-through="preventScrollThrough"
  :show-overlay="showOverlay"
  :size="size"
  :fullscreen="fullscreen"
  :attach="attach"
  >

  </t-loading>
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
  indicator: true,
  inheritColor: false,
  loading: true,
  preventScrollThrough: true,
  showOverlay: true,
  size: 'medium',
  attach: '',
  fullscreen: false,
};
aControl.storyName = '控制';
// 基础
const Template = (args) => ({
  components: { TLoading },
  template: ` <div style="width:400px;height:200px">
  <t-loading ></t-loading>
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

export const base = Template.bind({});
base.args = {};
base.storyName = '基础加载';

// 文字
const textTemplate = (args) => ({
  components: { TLoading },
  template: `  <div class="loading-demo" >
  <t-loading text="静态文字加载中..." :indicator="false" style="margin-right:20px"></t-loading>
  <t-loading :text="renderText" :indicator="false" style="margin-right:20px"></t-loading>
  <t-loading :indicator="false" style="margin-right:20px">
    <template #text>插槽文字加载中...</template>
  </t-loading>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const renderText = () => {
      return <span>变量文字加载中...</span>;
    };
    return {
      ...toRefs(state),
      renderText,
    };
  },
});

export const text = textTemplate.bind({});
text.args = {};
text.storyName = '文字加载';

// 文字图表共同加载
const iconAndTextTemplate = (args) => ({
  components: { TLoading },
  template: `  <div class="loading-demo" >
  <div>
    <t-loading text="加载中..."></t-loading>
  </div>
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

export const iconAndText = iconAndTextTemplate.bind({});
iconAndText.args = {};
iconAndText.storyName = '文字和图标共同显示加载';

// 不同尺寸
const sizeTemplate = (args) => ({
  components: { TLoading },
  template: ` <div class="tdesign-demo-block-column-large">
  <div style="margin-bottom:12px">
    <t-loading size="small" text="加载中(小)..."></t-loading>
  </div>
  <div style="margin-bottom:12px">
  <t-loading size="medium" text="加载中(中)..."></t-loading>
  </div>
  <div style="margin-bottom:12px">
  <t-loading size="large" text="加载中(大)..."></t-loading>
  </div>
   <div style="margin-bottom:12px">
  <t-loading style="font-size: 46px" text="加载中(样式定义)..."></t-loading>
  </div>
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

export const size = sizeTemplate.bind({});
size.args = {};
size.storyName = '不同尺寸的加载';

// 有包裹
const wrapTemplate = (args) => ({
  components: { TLoading, TButton },
  template: `<div class="loading-wrap-demo" style="width: 250px;background-color:#F6F8FA;padding:40px">
  <t-loading  :loading="loading" show-overlay>
    <div style="width:170px;height:100px;">
    </div>
  </t-loading>
  <br />
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

export const wrap = wrapTemplate.bind({});
wrap.args = {};
wrap.storyName = '有包裹的加载';

// 有包裹
const delayTemplate = (args) => ({
  components: { TLoading, TButton },
  template: `  <div class="tdesign-demo-block-column">
  <div>
    <t-loading v-if="loading" :delay="delay" size="small"></t-loading>
    <div v-if="data">loading 作为独立元素：{{ data }}</div>
  </div>

  <div class="wrap">
    <t-loading :loading="loading" :delay="delay" size="small">
      <div class="wrap">{{ data ? 'loading作为包裹元素'+ data : '' }}</div>
    </t-loading>
  </div>

  <div class="tdesign-demo-block-row">
    <t-button size="small" @click="loadingData">快速重新加载数据（无loading）</t-button>
    <t-button size="small" @click="() => loadingData(1000)">慢速重新加载数据</t-button>
  </div>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const loading = ref(true);
    const data = ref('');
    const delay = ref(500);
    const loadingData = (time) => {
      loading.value = true;
      data.value = '';
      const timer = setTimeout(() => {
        loading.value = false;
        data.value = '数据加载完成，短时间的数据加载并未出现 loading';
        clearTimeout(timer);
      }, time || 100);
    };
    onMounted(() => {
      loadingData();
    });
    return {
      ...toRefs(state),
      loadingData,
      delay,
      data,
      loading,
    };
  },
});

export const delay = delayTemplate.bind({});
delay.args = {};
delay.storyName = '有延时的加载';

// 全屏
const fullscreenTemplate = (args) => ({
  components: { TLoading, TSwitch },
  template: ` <t-loading :loading="loading" text="加载中..." fullscreen />
  <div>
    全局加载开关（开启加载1秒后自动归位）：
    <t-switch v-model="loading"></t-switch>
  </div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const loading = ref(false);
    watch(
      () => loading.value,
      (v) => {
        if (!v) return;
        const timer = setTimeout(() => {
          loading.value = false;
          clearTimeout(timer);
        }, 1000);
      },
    );
    return {
      ...toRefs(state),
      loading,
    };
  },
});

export const fullscreen = fullscreenTemplate.bind({});
fullscreen.args = {};
fullscreen.storyName = '全屏加载';

// 函数方式调用
const serviceTemplate = (args) => ({
  components: { TLoading, TButton },
  template: ` <div class="tdesign-demo-block-column">
  <div id="loading-service-demo" style="position: relative;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px var(--component-border, #eee) solid;"
  ref="contentRef" class="loading-service-demo">Loading 挂载容器</div>



  <p>LoadingPlugin(true)</p>
  <p>LoadingPlugin({ attach: '#loading-service-demo', showOverlay: true })</p>

  <div class="tdesign-demo-block-row">
    <t-button class="t-loading__btn" size="small" :disabled="attachLoading" @click="showAttach2"
      >函数方式加载（局部）</t-button
    >
    <t-button size="small" @click="showFullScreen2">函数方式加载（全屏）</t-button>
    <t-button size="small" @click="showFullScrollScreen2">函数方式加载（全屏-滚动穿透）</t-button>
  </div>
</div>`,

  // <p>$loading(true)</p>
  // <p>$loading({ attach: '#loading-service-demo', showOverlay: true })</p>

  // <div class="tdesign-demo-block-row">
  //   <t-button class="t-loading__btn" size="small" :disabled="attachLoading" @click="showAttach1">
  //     插件方式加载（局部）
  //   </t-button>
  //   <t-button size="small" @click="showFullScreen1">插件方式加载（全屏）</t-button>
  //   <t-button size="small" @click="showFullScrollScreen1">插件方式加载（全屏-滚动穿透）</t-button>
  // </div>
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
      attachLoading: false,
    });

    const app = createApp({});
    const $loading = app.config.globalProperties.$loading;
    console.log('loading', $loading);
    const contentRef = ref(null);
    const showAttach1 = () => {
      const loadingAttachInstance = $loading({
        attach: '#loading-service-demo',
        showOverlay: true,
        size: '20px',
      });
      state.attachLoading = true;
      const timer = setTimeout(() => {
        loadingAttachInstance.hide();
        state.attachLoading = false;
        clearTimeout(timer);
      }, 1000);
    };
    // 插件式：全屏加载，默认防止滚动穿透
    const showFullScreen1 = () => {
      $loading(true);
      const timer = setTimeout(() => {
        $loading(false);
        clearTimeout(timer);
      }, 10000);
    };
    // 插件式：全屏加载，允许滚动穿透
    const showFullScrollScreen1 = () => {
      const instance = $loading({
        fullscreen: true,
        attach: 'body',
        preventScrollThrough: false,
      });
      const timer = setTimeout(() => {
        instance.hide();
        clearTimeout(timer);
      }, 1000);
    };

    // 函数式：局部加载
    const showAttach2 = () => {
      // console.log('contentRef', contentRef, contentRef.value);
      const loadingAttachInstance = LoadingPlugin({
        attach: () => contentRef.value,
        showOverlay: true,
        size: '20px',
      });
      state.attachLoading = true;
      const timer = setTimeout(() => {
        loadingAttachInstance.hide();
        state.attachLoading = false;
        clearTimeout(timer);
      }, 1000);
    };
    // 函数式：全屏加载，防止滚动穿透
    const showFullScreen2 = () => {
      LoadingPlugin(true);
      const timer = setTimeout(() => {
        LoadingPlugin(false);
        clearTimeout(timer);
      }, 1000);
    };
    // 函数式：全屏加载，允许滚动穿透
    const showFullScrollScreen2 = () => {
      const instance = LoadingPlugin({
        fullscreen: true,
        attach: 'body',
        preventScrollThrough: false,
      });
      const timer = setTimeout(() => {
        instance.hide();
        clearTimeout(timer);
      }, 1000);
    };
    return {
      ...toRefs(state),
      $loading,
      contentRef,
      showAttach1,
      showFullScreen1,
      showFullScrollScreen1,
      showAttach2,
      showFullScreen2,
      showFullScrollScreen2,
    };
  },
});

export const service = serviceTemplate.bind({});
service.args = {};
service.storyName = '函数方式调用';

// 挂载到指定元素
const attachTemplate = (args) => ({
  components: { TLoading, TSwitch },
  template: ` <div class="tdesign-demo-block-column">
  <div id="alice" class="loading-attach-demo__title" style=" position: relative;
  width: 360px;
  height: 48px;
  line-height: 48px;
  text-align: center;"
  >Hello, I'm Alice. I'm going to be a front-end developer.</div>
  <t-loading attach="#alice" size="small" :loading="loading"></t-loading>

  <div>
    <t-switch v-model="loading" :custom-value="[true, false]" :label="['显示', '隐藏']" />
  </div>
</div>`,
  methods: {
    actionsData,
  },
  setup() {
    const state = reactive({
      ...args,
    });
    const loading = ref(false);
    return {
      ...toRefs(state),
      loading,
    };
  },
});

export const attach = attachTemplate.bind({});
attach.args = {};
attach.storyName = '挂载到指定元素';

// 排布方向
const directionTemplate = (args) => ({
  components: { TLoading },
  template: ` <div class="tdesign-demo-block-column-large">
  <div style="margin-bottom:12px">
  <t-loading size="medium" text="加载中(中)..."></t-loading>
  </div>
  <div style="margin-bottom:12px">
  <t-loading size="medium" text="加载中(中)..." direction="vertical"></t-loading>
  </div>
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

export const direction = directionTemplate.bind({});
direction.args = {};
direction.storyName = '排布方向';
