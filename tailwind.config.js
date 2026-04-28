// module.exports = {
//   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         "custom-color": "#92CFEE",
//       },
//     },
//   },
//   plugins: [],
// };

/* eslint-disable @typescript-eslint/no-require-imports */
// tailwind.config.js

/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { range, hexToRgba } = require('@tencent/awcharts-shared-utils');
// import { range } from '@tencent/awcharts-shared-utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const plugin = require('tailwindcss/plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const colors = require('tailwindcss/colors');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const themeColors = require('./build/theme-colors-config.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const cssVariables = require('tailwind-css-variables');
// const chartColors = require('./src/components/charts/colors.json');

/**
 * 生成透明度色阶方案
 * @param {String} value Hex
 * @param defaultLabel
 * @example
 console.log(opacityRangeColor('black', '#202020'));
 {
  '10': 'rgba(32,32,32,0.1)',
  '20': 'rgba(32,32,32,0.2)',
  '30': 'rgba(32,32,32,0.3)',
  '40': 'rgba(32,32,32,0.4)',
  '50': 'rgba(32,32,32,0.5)',
  '60': 'rgba(32,32,32,0.6)',
  '70': 'rgba(32,32,32,0.7)',
  '80': 'rgba(32,32,32,0.8)',
  '90': 'rgba(32,32,32,0.9)',
  '100': 'rgba(32,32,32,1)'
}
 */
function opacityRangeColor(value, defaultLabel = 'DEFAULT') {
  const opacityColors = {};

  opacityColors[defaultLabel] = hexToRgba(value, 1).toString();

  range(10, 100, 10).forEach((h) => {
    opacityColors[`${h}`] = hexToRgba(value, h / 100).toString();
  });

  return opacityColors;
}
// console.log(opacityRangeColor('#202020'));
// console.log(opacityRangeColor('#FFFFFF'));

// 设计稿对应颜色说明

// G2 其中 G 代表 gray 后面数字 2 代表色阶 2
// W2 其中 W 代表 white 后面数字 2 代表色阶 2
// B2 其中 B 代表 black 后面数字 2 代表色阶 2
// DVR 2 代表 delta red 品牌红，后面数字 2 代表色阶 2

// By default,
// these values are inherited by the padding, margin, width, height, maxHeight,
// gap, inset, space, and translate core plugins.
const spacing = {};
// 宽度 1 ～ 12，后面就是4的倍数往上跳，最大 64，其它要定制
[...range(0, 12), ...range(16, 64, 4), 14, 15, 18, 25, 30, 31, 35, 50, 72, 80, 96].forEach((h) => {
  // height[`${h}x`] = `${h * 40}px`;
  // let key = `${h}`
  spacing[`${h}`] = `${h * 4}px`;
});
// 定制固定宽度配置
[400, 440, 480, 540].forEach((h) => {
  // height[`${h}x`] = `${h * 40}px`;
  spacing[`${h}`] = `${h}px`;
});

// console.log('spancing', spacing);
// 间隔示例：
// spancing = {
//   '0': '0px',
//   '1': '4px',
//   '2': '8px',
//   '3': '12px',
//   '4': '16px',
//   '5': '20px',
//   '6': '24px',
//   '7': '28px',
//   '8': '32px',
//   '9': '36px',
//   '10': '40px',
//   '11': '44px',
//   '12': '48px',
//   '14': '56px',
//   '16': '64px',
//   '20': '80px',
//   '24': '96px',
//   '28': '112px',
//   '32': '128px',
//   '36': '144px',
//   '40': '160px',
//   '44': '176px',
//   '48': '192px',
//   '52': '208px',
//   '56': '224px',
//   '60': '240px',
//   '64': '256px',
//   '72': '288px',
//   '80': '320px',
//   '96': '384px',
//   '400': '400px',
//   '480': '480px',
//   '540': '540px'
// }

module.exports = {
  prefix: 'aw-',
  // mode: 'jit',
  content: [
    './index.html',
    './src/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.{vue,js,ts,jsx,tsx,html}',
    './stories/*.stories.mdx',
    './stories/*.stories.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  // important: true,
  theme: {
    colors: {
      // 透明
      transparent: 'transparent',
      // 使用当前颜色，一般在 SVG Icon 里面使用
      current: 'currentColor',
      // X 项目组件的颜色都是以这几个颜色为基础，加透明度变化而成的
      // 字体的颜色是以黑色加透明度变化为基础产生的颜色
      // 浅色背景下 #202020 10~100的10x倍数色阶
      // 文字颜色（白底）
      // B3 置灰信息 aw-text-black-30
      // B6 次要信息 aw-text-black-60
      // B10 强调/正文标题 aw-text-black
      // black: '#202020',
      // {
      //   '10': 'rgba(32,32,32,0.1)',
      //   '20': 'rgba(32,32,32,0.2)',
      //   '30': 'rgba(32,32,32,0.3)',
      //   '40': 'rgba(32,32,32,0.4)',
      //   '50': 'rgba(32,32,32,0.5)',
      //   '60': 'rgba(32,32,32,0.6)',
      //   '70': 'rgba(32,32,32,0.7)',
      //   '80': 'rgba(32,32,32,0.8)',
      //   '90': 'rgba(32,32,32,0.9)',
      //   '100': 'rgba(32,32,32,1)',
      //   DEFAULT: 'rgba(32,32,32,1)' // = aw-text-black
      // }
      black: opacityRangeColor('#202020'),
      // 深色背景下 #FFFFFF 10~100的10x倍数色阶
      // 文字颜色（深底）
      // B3 置灰信息 aw-text-white-30
      // B6 次要信息 aw-text-white-60
      // B10 强调/正文标题 aw-text-white
      // {
      //   '10': 'rgba(255,255,255,0.1)',
      //   '20': 'rgba(255,255,255,0.2)',
      //   '30': 'rgba(255,255,255,0.3)',
      //   '40': 'rgba(255,255,255,0.4)',
      //   '50': 'rgba(255,255,255,0.5)',
      //   '60': 'rgba(255,255,255,0.6)',
      //   '70': 'rgba(255,255,255,0.7)',
      //   '80': 'rgba(255,255,255,0.8)',
      //   '90': 'rgba(255,255,255,0.9)',
      //   '100': 'rgba(255,255,255,1)',
      //   DEFAULT: 'rgba(255,255,255,1)' // = aw-text-white
      // }
      white: opacityRangeColor('#FFFFFF'),
      // 冷灰色
      // 线条（深底：顶部导航、左侧导航、业务下拉框）
      // W2 分割线（深底） aw-border-white/20
      // W6 输入框边框（深底） aw-border-white/60
      // G3 线条（白底）aw-border-gray-30
      // G4 卡片描边 / 输入框、线框button正常态描边（白底）aw-border-gray-40
      gray: {
        // 背景底色
        10: '#F6F8FA',
        // 斑马纹
        12: '#FAFBFC',
        // 表头
        15: '#F1F2F7',
        // 表头、分页、标签填充色，禁用态填充色
        20: '#E8EAF1',
        // 分割线、禁用态描边
        30: '#DBDEEB',
        // 卡片边框、正常态描边
        40: '#D1D5E6',
        50: '#BCC2DC',
        60: '#A7AFD2',
        70: '#929CC9',
        80: '#7B88C1',
        90: '#5D6DB6',
        100: '#4D5DB2',
      },
      // 图表库：紫罗兰色
      violet: {
        // 100: '#E7E7FA',
        // 200: '#D1D1F5',
        // 300: '#B0B0E2',
        // 400: '#9090C6',
        // 500: '#6666A1',
        // 600: '#4A4A8A',
        // 700: '#333373',
        // 800: '#20205D',
        // 900: '#13134D',
        // ...chartColors.violet,
      },
      // 图表库：红
      red: {
        // 100: '#FEEBDC',
        // 200: '#FDD2B9',
        // 300: '#FAB296',
        // 400: '#F6947B',
        // 500: '#F16450',
        // 600: '#CF413A',
        // 700: '#AD282C',
        // 800: '#8B1926',
        // 900: '#730F22',
        // ...chartColors.red,
      },
      // 图表库：黄
      yellow: {
        // 100: '#FFF7DC',
        // 200: '#FFECB9',
        // 300: '#FFDF96',
        // 400: '#FFD27C',
        // 500: '#FFBD51',
        // 600: '#DB983B',
        // 700: '#B77628',
        // 800: '#935719',
        // 900: '#7A410F',
        // ...chartColors.yellow,
      },
      // 图表库：紫红
      fuchsia: {
        // 100: '#FBE6EA',
        // 200: '#F7CED9',
        // 300: '#E8AFC4',
        // 400: '#D291AF',
        // 500: '#B46A94',
        // 600: '#9A4D81',
        // 700: '#81356F',
        // 800: '#68215E',
        // 900: '#561454',
        // ...chartColors.fuchsia,
      },
      // 图表库：绿
      green: {
        // 100: '#E2FCE3',
        // 200: '#C5F9CD',
        // 300: '#A3EDB6',
        // 400: '#86DBA4',
        // 500: '#5FC48D',
        // 600: '#45A87C',
        // 700: '#2F8D6C',
        // 800: '#1E715D',
        // 900: '#125E53',
        // ...chartColors.green,
      },
      // 图表库：蓝灰
      blueGray: {
        // 100: '#E2FCE3',
        // 200: '#C5F9CD',
        // 300: '#A3EDB6',
        // 400: '#86DBA4',
        // 500: '#5FC48D',
        // 600: '#45A87C',
        // 700: '#2F8D6C',
        // 800: '#1E715D',
        // 900: '#125E53',
        // ...chartColors.blueGray,
      },
      // 图表库：橙
      orange: {
        // 100: '#FEF1D9',
        // 200: '#FEE0B4',
        // 300: '#FECB8F',
        // 400: '#FDB573',
        // 500: '#FC9345',
        // 600: '#D86F32',
        // 700: '#B55022',
        // 800: '#923516',
        // 900: '#78220D',
        // ...chartColors.orange,
      },
      // 图表库：蓝
      blue: {
        // 100: '#D2F7FF',
        // 200: '#A6EBFF',
        // 300: '#79D9FF',
        // 400: '#58C6FF',
        // 500: '#21A6FF',
        // 600: '#1881DB',
        // 700: '#1061B7',
        // 800: '#0A4493',
        // 900: '#06307A',
        // ...chartColors.blue,
      },

      // 品牌红折成10个色阶，默认说的品牌红色阶指 DVR5 #D52B2D aw-bg-brand-50
      brand: {
        10: '#FCD4D5',
        20: '#FAAAAB',
        30: '#F27E80',
        40: '#E45356',
        // 品牌红色阶 aw-text-brand-50
        50: '#D52B2D',
        60: '#B71F22',
        70: '#991517',
        80: '#7B0D0F',
        90: '#66080A',
        100: '#500608',
        DEFAULT: '#D52B2D',
      },
      // 主题色 aw-text-primary
      primary: '#202020',
      // secondary 暂时不用了
      // secondary: '#C53C36',
      // 功能色
      success: {
        // 反馈提示背景值
        10: '#E1F4E0',
        20: '#CEEBCB',
        30: '#ABDBA4',
        40: '#81CF7A',
        // hover
        50: '#53C84D',
        // normal
        60: '#34b531',
        // click
        70: '#2C9B2E',
        80: '#19851D',
        90: '#136D17',
        100: '#0B5B12',
        DEFAULT: '#34b531',
      },
      info: {
        // 反馈提示背景值
        10: '#E3EFFE',
        20: '#BAD8FD',
        30: '#92C2FC',
        40: '#6FB0FB',
        // hover
        50: '#509FFB',
        // normal
        60: '#2E8CFA',
        // click
        70: '#066CE5',
        80: '#065ABC',
        90: '#054794',
        100: '#053976',
        DEFAULT: '#2E8CFA',
      },
      warning: {
        // 反馈提示背景值
        10: '#FFF0D9',
        20: '#FFDAA3',
        30: '#FFCA7A',
        40: '#FFBA52',
        // hover
        50: '#FFA929',
        // normal
        60: '#FD9800',
        // click
        70: '#E08700',
        80: '#BD7100',
        90: '#A35C00',
        100: '#834D07',
        DEFAULT: '#FD9800',
      },
      error: {
        // 反馈提示背景值
        10: '#FFE4E3',
        20: '#FFCECC',
        30: '#FEADA9',
        40: '#FD837C',
        // hover
        50: '#FD695E',
        // normal
        60: '#FC4D42',
        // click
        70: '#E13933',
        80: '#C31D1D',
        90: '#A0181C',
        100: '#7F1017',
        DEFAULT: '#FC4D42',
      },
    },
    extend: {
      // 参考上面 spacing 示例
      spacing,
      // 圆角
      borderRadius: {
        none: '0',
        // 其余组件圆角为4px aw-rounded
        DEFAULT: '4px',
        // 所有卡片圆角12PX aw-rounded-md
        md: '12px',
        // 背景圆角16PX aw-rounded-lg
        lg: '16px',
        full: '9999px',
      },
      // 阴影
      boxShadow: {
        // 第0层 无层级
        none: 'none',
        // 【浅色卡片】第1层 低层级
        // 物体位于低层级，此时物体被操作(悬停、点击等)触发为悬浮状态，
        // 当操作完成或取消时，悬停状态反馈也跟随消失，物体回归到原有的层级中，如：卡片hover 等； aw-shadow
        DEFAULT: '0px 2px 8px rgba(32, 32, 32, 0.1)',
        // 【浅色卡片】第2层 中层级
        // 物体位于中层级，此时物体与基准面的关系是展开并跟随，物体由地面上的元素展开产生，会跟随元素所在层级的移动而移动，
        // 如：下拉框、全局提示、气泡弹窗等；aw-shadow-md
        md: '0px 4px 20px rgba(32, 32, 32, 0.1)',
        // 【深色卡片】中层级, 应用于顶部导航和侧边导航的的二级下拉筛选 aw-shadow-md-inverse
        'md-inverse': '4px 4px 8px rgba(32, 32, 32, 0.2)',
      },
      // 透明只会有10x倍数
      opacity: {
        0: '0',
        10: '0.1',
        20: '0.2',
        30: '0.3',
        40: '0.4',
        50: '0.5',
        60: '0.6',
        70: '0.7',
        80: '0.8',
        90: '0.9',
        100: '1',
      },
      fontSize: {
        xs: [
          '10px',
          {
            lineHeight: '16px',
          },
        ],

        sm: [
          '12px',
          {
            lineHeight: '18px',
          },
        ],
        base: [
          '14px',
          {
            lineHeight: '20px',
          },
        ],
        lg: [
          '16px',
          {
            lineHeight: '22px',
          },
        ],
        xl: [
          '20px',
          {
            lineHeight: '28px',
          },
        ],
        '2xl': [
          '32px',
          {
            lineHeight: '32px',
          },
        ],
      },
      fontFamily: {
        // 优秀的字体系统首先是要选择合适的字体家族，我们将优先使用系统默认的界面字体。
        // 另外，在中后台系统中，数字经常需要进行纵向对比展示，我们单独将数字的字体 font-variant-numeric 设置为 tabular-nums，使其为等宽字体。
        // aw-font-sans
        // aw-tabular-nums
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Noto Sans',
          'Microsoft YaHei',
          '微软雅黑',
          'Arial',
          'sans-serif',
        ],
        stats: ['Helvetica Neue', 'Helvetica', 'PingFang SC', 'Microsoft Yahei', 'Microsoft Yahei UI'],
        // 指标卡字体
        psm: 'Product Sans Medium',
      },
      zIndex: {
        navbar: 1000,
        sticky: 1020,
        fixed: 1030,
        'modal-backdrop': 1040,
        modal: 1050,
        'popover-backdrop': 1060,
        popover: 1065,
        'dropdown-backdrop': 1070,
        dropdown: 1075,
        tooltip: 1080,
      },
      // 宽度高度参考 space 配置宽度
      minWidth: {
        btn: '88px',
        page: '1280px',
      },
      // 宽度高度参考 space 配置宽度
      // width: {
      //
      //   // 设计要求 6px 的柱子宽度
      //   // 1.5: '6px',
      //   // 50: '200px',
      // },
    },
  },
};
