# 设计文档

[TOC]

## 一. 项目背景

在部门设计风格统一的情况下，本项目用于横向拉通全部门的前端 UI 组件库的共建。

1. 避免部门前端重复造 UI 组件轮子；
2. 提高组件通用性；
3. 基于 TDesign，增强定制化功能；

创建和开发面向全部门的定制 UI 组件库——**delta-ui**项目。

需要注意：
由于 0.8.0 版本的 TDesign 问题较多，本项目目前是基于[TDesign@0.15.2](https://tdesign.woa.com/vue-next/getting-started)封装。需要特别注意样式文件的修改。

带来问题：

TDesign 升级时，delta-ui 的同步升级问题？

解决方案（待讨论）

1. 关注 TDesign 的大版本更新内容；
2. 充分单元测试，定期更新，并查看覆盖率情况；

# 二. Feature

- 支持按需引入
- Full TypeScript support.
- Full test (UI 测试，单元测试)

<!-- | 组件类型    | 组件名称          | 负责人      | 组件类型        | 组件名称                               | 负责人      | 组件类型        | 组件名称              | 负责人      |
| ----------- | ----------------- | ----------- | --------------- | -------------------------------------- | ----------- | --------------- | --------------------- | ----------- |
| **基础(4)** | Button 按钮       | ahwazchen   | **输入(11)**    | Checkbox 多选框                        | caitlinzhao | **消息提醒(6)** | Alert 警告            | xiakeyzhu   |
|             | Divider 分割线    | caitlinzhao |                 | DatePicker 日期选择器(和 range-picker) | yesendong   |                 | Popup 弹出层          | shuxiaoliu  |
|             | Icon 图标         | caitlinzhao |                 | Form 表单                              | caitlinzhao |                 | Message 全局提示      | xiakeyzhu   |
|             | Loading 加载中    | xiakeyzhu   |                 | Input 输入框                           | minminzhi   |                 | Dialog 对话框         | yiningzhang |
| **布局(2)** | Grid 栅格         | ahwazchen   |                 | Radio 单选框                           | caitlinzhao |                 | Popconfirm 气泡确认框 | shuxiaoliu  |
|             | Layout 布局       | ahwazchen   |                 | Select 选择器                          | shuxiaoliu  |                 | Drawer 抽屉           | yiningzhang |
| **导航(7)** | Tabs 选项卡       | yiningzhang |                 | Upload 上传                            | caitlinzhao | **其他(6)**     | Tooltip 提示          | shuxiaoliu  |
|             | Dropdown 下拉     | minminzhi   |                 | Textarea 多行文本框                    | minminzhi   |                 | Tag 标签              | minminzhi   |
|             | Sidebar 侧边导航  | ahwazchen   |                 | TimePicker 时间选择器                  | yesendong   |                 | Avatar 头像           | minminzhi   |
|             | Head 顶部导航     | ahwazchen   |                 | TreeSelect 树选择                      | caitlinzhao |                 | Calendar 日历         | caitlinzhao |
|             | Pagination 分页   | shuxiaoliu  |                 | Switch 开关                            | xiakeyzhu   |                 | Swiper 轮播           | yiningzhang |
|             | Breadcrumb 面包屑 | minminzhi   | **数据展示(2)** | Table 表格                             | shuxiaoliu  |                 | Tree 树               | xiakeyzhu   |
|             | Steps 步骤条      | xiakeyzhu   |                 | List 列表                              | shuxiaoliu  |                 |                       |             | -->

## 三. 使用

### 安装

```sh
npm i @tencent/delta-ui
```

### 使用

```js
import { createApp } from 'vue';
import Delta from '@tencent/delta-ui';
import App from './app.vue';

// 引入组件库全局样式资源
import '@tencent/delta-ui/dist/delta-ui.css';

const app = createApp(App);
app.use(Delta);
```

# 四. Roadmap

#### 支持按需加载

```sh
npm install -D unplugin-vue-components unplugin-auto-import
```

(待补充代码细节。预计和 TDesign 保持一致，借助 unplugin-vue-components 实现。)

# 五. 技术栈归类

### Storybook

考虑到方便文档生成和在线测试，选取 [storybook](https://storybook.js.org/docs/vue/get-started/install) 进行 UI 组件封装。

1. 可以避免公司前端重复造轮子
   统一放在 storybook 上，其他前端可以在这里看到其他成员是否实现过自己将要实现的组件。
2. 提升组件通用性，storybook 内的组件可以与业务解耦。
3. 可以自动生成使用文档和示例
4. 轻松实现结构化组件文档
5. 方便手动在线测试

### Vue/cli

由于最初 vite 构建的时候，在 storybook 里配置 tailwindCSS 不生效有冲突，改为 vue/cli 构建项目。不影响项目开发和构建。

### Tailwind

经过 iDataX 项目的实践，本次封装组件继续使用 tailwindcss 定制开发覆盖样式。

### TSlint

维持 TDesign 的开发规范。

### ESlint

遵循公司 [JavaScript 编码规范](https://git.code.oa.com/standards/javascript)的基础上，采取了更严格的 aribnb 规范以及 vue 官方推荐的 lint。

```json
'eslint:recommended',
'eslint-config-airbnb-base',
'plugin:@typescript-eslint/recommended',
'plugin:vue/vue3-recommended',
'prettier',
```

### Jest(测试框架)

### Husky

创建修改 githook，便于 git 校验。

## 六. 开发规范与发布部署流程
参见[开发者指南](./CONTRIBUTING.md)
