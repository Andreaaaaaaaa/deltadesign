import { App } from 'vue';

// 防止 @charset "UTF-8"; 在中间
// import './assets/normal.scss';
// 引入组件库全局样式资源
// import 'tdesign-npm-name/esm/style/index.js';

// import components from './components';
import * as components from './components';
import './assets/index.scss';

export function install(app: App, config?: Record<string, unknown>): void {
  Object.keys(components).forEach((key) => {
    if (/plugin/i.test(key)) {
      // @ts-ignore
      app.use(components[key]);
    } else {
      // @ts-ignore
      app.use(components[key], config);
    }
  });
}

export * from './components';

export default {
  install,
  // ...components,
  // 此处会导致打包半小时
  // version: typeof process.env.DEPLOYMENT_VERSION === 'undefined' ? '' : process.env.DEPLOYMENT_VERSION, // eslint-disable-line
  version: import.meta.DEPLOYMENT_VERSION || ''
};
