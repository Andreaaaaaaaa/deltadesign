import { reactive, toRefs } from 'vue';
import {
  ColorPicker as TColorPicker,
  ColorPickerPanel as TColorPickerPanel,
} from '../src/components/color-picker/index.ts';

export default {
  title: '输入/ColorPicker 颜色选择器',
};

const BaseTemplate = () => ({
  components: { TColorPicker },
  template: '<t-color-picker />',
  setup() {
    return {};
  },
});

export const base = BaseTemplate.bind({});

base.storyName = '基础颜色选择器';

base.args = {};

base.argTypes = {
  closeBtn: {
    description:
      '关闭按钮，值为 true 显示默认关闭按钮；值为 false 或 undefined 则不显示关闭按钮；值类型为函数，则表示自定义关闭按钮。TS 类型：string | boolean | TNode。',
    table: {
      category: 'Props',
      type: {
        summary: 'String / Boolean / Slot / Function',
      },
      defaultValue: {
        summary: 'true',
      },
    },
  },
  colorModes: {
    description:
      "颜色模式选择。同时支持单色和渐变两种模式，可仅使用单色或者渐变其中一种模式，也可以同时使用。monochrome 表示单色，linear-gradient 表示渐变色。TS 类型：Array<'monochrome' | 'linear-gradient'>",
    table: {
      category: 'Props',
      type: {
        summary: 'Array',
      },
      defaultValue: {
        summary: "['monochrome', 'linear-gradient']",
      },
    },
  },
  disabled: {
    description: '是否禁用组件',
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
  enableAlpha: {
    description: '是否开启透明通道',
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
  format: {
    description:
      '格式化色值。enableAlpha 为真时，RGBA/HSLA/HSVA 等值有效。可选项：RGB/RGBA/HSL/HSLA/HSB/HSV/HSVA/HEX/CMYK/CSS',
    table: {
      category: 'Props',
      type: {
        summary: 'String',
      },
      defaultValue: {
        summary: 'RGB',
      },
    },
  },
  inputProps: {
    description: '透传 Input 输入框组件全部属性。TS 类型：InputProps。',
    table: {
      category: 'Props',
      type: {
        summary: 'Object',
      },
      defaultValue: {
        summary: '-',
      },
    },
  },
  popupProps: {
    description: '透传 Popup 组件全部属性，如 placement overlayStyle overlayClassName trigger等。TS 类型：PopupProps。',
    table: {
      category: 'Props',
      type: {
        summary: 'Object',
      },
      defaultValue: {
        summary: '-',
      },
    },
  },
  recentColors: {
    description:
      '最近使用的颜色。值为 [] 表示以组件内部的“最近使用颜色”为准，值长度大于 0 则以该值为准显示“最近使用颜色”。值为 null 则完全不显示“最近使用颜色”。支持语法糖 v-model:recentColors。TS 类型：boolean | Array<string>',
    table: {
      category: 'Props',
      type: {
        summary: 'Array',
      },
      defaultValue: {
        summary: '[]',
      },
    },
  },
  defaultRecentColors: {
    description:
      '最近使用的颜色。值为 [] 表示以组件内部的“最近使用颜色”为准，值长度大于 0 则以该值为准显示“最近使用颜色”。值为 null 则完全不显示“最近使用颜色”。非受控属性。TS 类型：boolean | Array<string>',
    table: {
      category: 'Props',
      type: {
        summary: 'Array',
      },
      defaultValue: {
        summary: '[]',
      },
    },
  },
  selectInputProps: {
    description: '透传 SelectInputProps 筛选器输入框组件全部属性。TS 类型：SelectInputProps。',
    table: {
      category: 'Props',
      type: {
        summary: 'Object',
      },
      defaultValue: {
        summary: '-',
      },
    },
  },
  swatchColors: {
    description:
      '系统预设的颜色样例，值为 null 或 [] 则不显示系统色，值为 undefined 会显示组件内置的系统默认色。TS 类型：Array<string>',
    table: {
      category: 'Props',
      type: {
        summary: 'Array',
      },
      defaultValue: {
        summary: '-',
      },
    },
  },
  value: {
    description: '色值。支持语法糖 v-model 或 v-model:value',
    table: {
      category: 'Props',
      type: {
        summary: 'String',
      },
      defaultValue: {
        summary: '-',
      },
    },
  },
  defaultValue: {
    description: '色值。非受控属性',
    table: {
      category: 'Props',
      type: {
        summary: 'String',
      },
      defaultValue: {
        summary: '-',
      },
    },
  },
  onChange: {
    description:
      "TS 类型：(value: string, context: { color: ColorObject; trigger: ColorPickerChangeTrigger }) => void 选中的色值发生变化时触发，第一个参数 value 表示新色值，context.color 表示当前调色板控制器的色值，context.trigger 表示触发颜色变化的来源。 type ColorPickerChangeTrigger = 'palette-saturation-brightness' | 'palette-saturation' | 'palette-brightness' | 'palette-hue-bar' | 'palette-alpha-bar' | 'input' ",
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
  onPaletteBarChange: {
    description:
      'TS 类型：(context: { color: ColorObject }) => void 调色板控制器的值变化时触发，context.color 指调色板控制器的值。 interface ColorObject { alpha: number; css: string; hex: string; hex8: string; hsl: string; hsla: string; hsv: string; hsva: string; rgb: string; rgba: string; saturation: number; value: number; isGradient: boolean; linearGradient?: string; } ',
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
  onRecentColorsChange: {
    description: 'TS 类型：(value: Array<string>) => void 最近使用颜色发生变化时触发',
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
};

const panelTemplate = (args) => ({
  components: { TColorPickerPanel },
  template: `<div>
    <div class="story-title">面板颜色选择器</div>
    <div class="story-subtitle">没有触发器，直接显示颜色选择器面板。</div>
    <t-color-picker-panel
      v-model="color"
      :enableAlpha="enableAlpha"
      :disabled="disabled"
      @change="handleChange"
      @palette-bar-change="handlePaletteChange"
      @recent-colors-change="handleRecentColorsChange"
    />
  </div>`,
  setup() {
    const state = reactive({
      color: '#0052d9',
    });

    const handleChange = (value, context) => {
      console.log(value, context);
    };

    const handlePaletteChange = (context) => {
      console.log('色相面板改变', context);
    };

    const handleRecentColorsChange = (value, context) => {
      console.log('最近使用颜色改变', value, context);
    };

    return {
      ...toRefs(state),
      ...args,
      handleChange,
      handlePaletteChange,
      handleRecentColorsChange,
    };
  },
});

export const panel = panelTemplate.bind({});

panel.storyName = '面板颜色选择器';

panel.args = {
  enableAlpha: false,
  disabled: false,
};

const triggerTemplate = (args) => ({
  components: { TColorPicker },
  template: `<div>
    <div class="story-title">带触发元素的颜色选择器</div>
    <div class="story-subtitle">通过触发器触发显示选择器面板，透传全部属性到面板选择器组件。</div>
    <t-color-picker
      v-model="color"
      :enableAlpha="enableAlpha"
      :disabled="disabled"
    />
  </div>`,
  setup() {
    const state = reactive({
      color: '#0052d9',
    });

    return {
      ...toRefs(state),
      ...args,
    };
  },
});

export const trigger = triggerTemplate.bind({});

trigger.storyName = '带触发元素的颜色选择器';

trigger.args = {
  enableAlpha: false,
  disabled: false,
  closeBtn: false,
};

const colorModeTemplate = (args) => ({
  components: { TColorPicker },
  template: `<div>
    <div class="story-title">不同色彩模式的颜色选择器</div>
    <div class="story-subtitle">支持单色模式、线性渐变两种颜色模式选择，可单独一种模式使用，也可同时两种模式切换。使用 colorMode 进行配置。</div>
    <t-color-picker
      v-model="color"
      :color-modes="colorModes"
    />
  </div>`,
  setup() {
    const state = reactive({
      color: '#0052d9',
    });

    return {
      ...toRefs(state),
      ...args,
    };
  },
});

export const colorMode = colorModeTemplate.bind({});

colorMode.storyName = '不同色彩模式的颜色选择器';

colorMode.args = {
  enableAlpha: false,
  colorModes: ['monochrome', 'linear-gradient'],
};

const swatchColorTemplate = (args) => ({
  components: { TColorPicker },
  template: `<div>
    <div class="story-title">可配置系统色的颜色选择器</div>
    <div class="story-subtitle">可以通过 swatchColors 配置系统预设颜色，值为 null 或 [] 则不显示系统色。</div>
    <t-color-picker
      v-model="color"
      :swatch-colors="swatchColors"
    />
  </div>`,
  setup() {
    const state = reactive({
      color: '#0052d9',
    });

    return {
      ...toRefs(state),
      ...args,
    };
  },
});

export const swatchColor = swatchColorTemplate.bind({});

swatchColor.storyName = '可配置系统色的颜色选择器';

swatchColor.args = {
  swatchColors: ['red', 'green', 'yellow', 'blue', 'purple'],
};

const recentColorTemplate = (args) => ({
  components: { TColorPickerPanel },
  template: `<div>
    <div class="story-title">可配置最近使用颜色的颜色选择器</div>
    <div class="story-subtitle">可以通过 recentColors 配置最近使用的颜色，值为 [] 表示以组件内部的“最近使用颜色”为准，值长度大于 0 则以该值为准显示“最近使用颜色”。值为 null 则完全不显示“最近使用颜色”。</div>
    <t-color-picker-panel
      v-model="color"
      :recent-colors="recentColors"
    />
  </div>`,
  setup() {
    const state = reactive({
      color: '#0052d9',
    });

    return {
      ...toRefs(state),
      ...args,
    };
  },
});

export const recentColor = recentColorTemplate.bind({});

recentColor.storyName = '可配置最近使用颜色的选择器';

recentColor.args = {
  recentColors: [
    'red',
    'green',
    'yellow',
    'blue',
    'purple',
    'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
    'linear-gradient(45deg, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)',
    'linear-gradient(120deg, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)',
  ],
};
