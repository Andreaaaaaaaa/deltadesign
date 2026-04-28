[TOC]
## 一. 开发规范

## 1. API 规范

因为是基于 TDesign 的二次封装，所以 API 规范尽量维持 TDesign 规范：

> - 所有属性和事件使用小驼峰表示；
> - 命名避开 HTML 原生属性；
> - 原生 HTML 属性在组件实现时支持透传，所以 API 定义里不需要再次定义；
> - 可定制内容实用`TNode`表示。 TS 类型为`type TNode<T = any> = (h: Vue.CreateElement, props?: T) => TNodeReturnValue;`
> - 事件名称使用连接线命名，如：`visible-change`；

### 前缀

为了保持和 TDesign 一致，保证用户使用的无侵入感，组件和 css 前缀依旧以 t- 开头。请注意，无论 js 还是 css 都使用变量定义前缀，方便后续替换。

### js

遵循公司 [JavaScript 编码规范](https://git.code.oa.com/standards/javascript) ，且在提交之前会按照此规范进行 pre-commit 校验。

### css

尽量使用变量定义前缀，如果需要部门定制样式覆盖，请在`src/assets`目录下添加或修改对应的`hook`文件。

### git

#### 分支

遵循使用 git flow 规范，新组件分支从 master checkout。

如果类似`range-picker`使用 TDesign 源码定制开发部门所需组件，则从 master checkout 分支如：feat/range-picker。

#### 提交说明

提交暂存区：

```sh
git add .
```

项目使用基于 [angular 提交规范](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)的调整。

```sh
npm run commit
or
git cz
```

选择提交的类型：

```txt
  feat: 新增功能
  fix: 修复 bug
  docs: 文档变更
  style: 代码格式（不影响功能，例如空格、分号等格式修正）
  refactor: 代码重构（不包括 bug 修复、功能新增）
  perf: 性能优化
  test: 添加、修改测试用例
  build: 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
  ci: 修改 CI 配置、脚本
  chore: 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
  revert: 回滚 commit
```

选择具体的 scope 类型

```txt
  components                     (组件相关)
  hooks                          (hook 相关)
  utils                          (utils 相关)
  engineering                    (工程化相关)
  styles                         (样式相关)
  deps                           (项目依赖)
  auth                           (对 auth 修改)
  other                          (其他修改)
  custom                         (以上都不是？我要自定义)
```

每次提交会自动触发提交验证

- 使用工具 commitizen 协助规范 git commit 信息

- 提交会触发 git pre-commit 检查，修复提示的 eslint 错误，

具体可见https://iwiki.woa.com/pages/viewpage.action?pageId=1705610653

## 2. 开发

### 安装依赖

```sh
npm i
```

### 本地开发

```sh
npm run dev

or

npm run storybook
```

浏览器自动打开 <http://localhost:6006>

### 目录结构

```sh
├── .storybook // storybook配置
├── public // 公共文件
├── src // 组件代码
	 ｜ assets // 样式文件
	 ｜ components // 二次封装UI文件
├── stories  // 对应的storybook
├── test // 测试文件
```

### demo 调试

因为使用 storybook 测试和开发组件，如果想对某个组件进行调试，请在`stories`目录下按照 storybook 语法编写组件代码进行调试。

## 二. 测试规范

（待细化）

### 1.概览

#### script 脚本命令

```sh
# 运行全部测试
npm run test

# 运行单元测试
npm run test:unit

# 运行服务端渲染测试
npm run test:node

# 运行监视模式
npm run test:watch

# 生成测试覆盖率报告
npm run test:coverage
```

### 2. storybook 测试

```sh
npm run test:generate-output
```

生成 `.jest-test-results.json`文件。

原则上，测试覆盖率需要达到 90%；

## 三. 发布流程

```sh
npm run release

❯ patch (2.4.1) # 修订号
minor (2.5.0) # 次版号
major (3.0.0) # 主版号
prerelease (2.4.1-0) # 预发布版号
premajor (3.0.0-0) # 预发布版号
custom # 自定义发布版号(最好不用)
archive # 只重新打包当前版本
```

## 四. 部署流程

1. 版号 tag 成功后，打开 GDP delta-web 项目
2. 打开 [构建集成/构建计划](https://gdp.woa.com/project/idata-x/paas/deltaverse-ui/index)
3. 找到 DEV，点击启动
4. 选择分支发布，一般选择master分支
5. 选择 TAG 对应的版号，如：v1.0.0
6. 输入镜像 tag: v1.0.0 不再使用同 tag 更新，使用同 tag 更新方式更新镜像，无法进行版本回退
7. 输入备注：dev v1.0.0 2021-12-30 18:02 也可以是其它说明
8. 确定
9. 等待 构建集成/构建任务 完成，此过程约 3~5 分钟
10. 打开 服务部署/部署列表/详情 点击【更新容器镜像】按钮，选择 v1.0.0 镜像
11. 打开 [delta-ui](https://deltaverse-ui.woa.com) 验证发布是否成功
