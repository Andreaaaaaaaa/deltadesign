// 引入组件库全局样式资源
// import 'tailwindcss/tailwind.css';
import 'tdesign-vue-next/es/style/index.css';
// import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css';
import 'tailwindcss/tailwind.css';
import { withSource } from './withSource'
// preview.js

// The default value of the theme arg to all stories
// export const args = { theme: 'light' };
// import { withRunScript } from 'storybook-addon-run-script/html';
// import TDesign from 'tdesign-vue-next/es';
// import { app } from '@storybook/vue3';

import '../src/assets/index.scss';
// app.use(TDesign);

import './index.css';

const parentDoc = window.parent.document;
if (parentDoc) {
  const sidebarHeaderDom = parentDoc.querySelector('.sidebar-header');
  if (sidebarHeaderDom) {
    sidebarHeaderDom.style.display = 'none';
  }
  const osContentDom = parentDoc.querySelector('.os-content');
  if (osContentDom) {
    osContentDom.style.paddingTop = '0';
  }
}

export const parameters = {
  layout: 'centered',
  options: {
    storySort: {
      order: ['Intro', '基础', '布局', '导航', '输入', '数据展示', '消息提醒'],
    },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// const runScript = `console.log('Hello World');`;
export const decorators = [
  withSource,
  // withRunScript(runScript)
]
