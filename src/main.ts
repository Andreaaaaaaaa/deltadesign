import { createApp, h } from 'vue';
import TDesign, { ConfigProvider } from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';
import 'tailwindcss/tailwind.css';
import './assets/index.scss';
import App from './App.vue';

/** 树展开箭头：右向三角，与 TDesign 一致由 .t-icon 在展开时 rotate(90°) 朝下 */
function treeFolderIcon(hFn: typeof h) {
  return hFn('svg', {
    class: 't-icon',
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  }, [
    hFn('path', {
      d:
        'M5.5 10.9594V5.04C5.5 4.62075 5.98497 4.38766 6.31235 4.64957L10.012 7.60925C10.2622 7.80942 10.2622 8.18996 10.012 8.39012L6.31235 11.3498C5.98497 11.6117 5.5 11.3786 5.5 10.9594Z',
      fill: 'currentColor',
      'fill-opacity': 0.6,
    }),
  ])
}

const app = createApp({
  name: 'Root',
  render: () =>
    h(
      ConfigProvider,
      { globalConfig: { tree: { folderIcon: (hFn: typeof h) => treeFolderIcon(hFn) } } },
      { default: () => h(App) },
    ),
});
app.use(TDesign);
app.mount('#app');
