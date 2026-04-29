<template>
  <div class="showcase">

    <!-- Header -->
    <header class="showcase-header">
      <div class="header-inner">
        <div class="header-logo">Δ</div>
        <div>
          <h1>Delta UI 组件库</h1>
          <p>已与 Figma 完成 Code Connect 关联 · 36 个，展示 48 个区块</p>
        </div>
        <div class="header-badge">
          <span class="dot"></span> 已连接 Figma
        </div>
      </div>
    </header>

    <main class="showcase-main">

      <!-- ── 按钮 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Button <span>按钮</span></h2>
          <code>类型 → theme/variant · 尺寸 → size · 状态 → disabled/loading</code>
        </div>
        <div class="demo-row wrap">
          <t-button theme="primary">主要按钮</t-button>
          <t-button theme="default" variant="outline">次要按钮</t-button>
          <t-button theme="danger">告警按钮</t-button>
          <t-button theme="danger" variant="outline">次要告警</t-button>
          <t-button theme="default" variant="text">文字按钮</t-button>
          <t-button theme="primary" size="small">小尺寸</t-button>
          <t-button theme="primary" size="large">大尺寸</t-button>
          <t-button disabled>置灰</t-button>
          <t-button loading>加载中</t-button>
        </div>
      </section>

      <!-- ── 开关 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Switch <span>开关</span></h2>
          <code>尺寸 · 禁用 · 开关状态</code>
        </div>
        <div class="demo-row">
          <div class="demo-item">
            <t-switch />
            <label>默认关</label>
          </div>
          <div class="demo-item">
            <t-switch :default-value="true" />
            <label>默认开</label>
          </div>
          <div class="demo-item">
            <t-switch size="small" />
            <label>小尺寸</label>
          </div>
          <div class="demo-item">
            <t-switch size="large" />
            <label>大尺寸</label>
          </div>
          <div class="demo-item">
            <t-switch disabled />
            <label>禁用</label>
          </div>
          <div class="demo-item">
            <t-switch :default-value="true" disabled />
            <label>开启禁用</label>
          </div>
        </div>
      </section>

      <!-- ── 多选框 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Checkbox <span>多选框</span></h2>
          <code>状态 → checked/indeterminate/disabled</code>
        </div>
        <div class="demo-row wrap">
          <t-checkbox>未选中</t-checkbox>
          <t-checkbox :default-checked="true">已选中</t-checkbox>
          <t-checkbox :indeterminate="true">部分选中</t-checkbox>
          <t-checkbox disabled>未选中禁用</t-checkbox>
          <t-checkbox :default-checked="true" disabled>选中禁用</t-checkbox>
        </div>
        <div class="demo-row wrap mt8">
          <t-checkbox-group :default-value="['a', 'b']" :options="checkboxOpts" />
        </div>
      </section>

      <!-- ── 单选框 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Radio <span>单选框</span></h2>
          <code>状态 → checked/disabled</code>
        </div>
        <div class="demo-row wrap">
          <t-radio-group default-value="a">
            <t-radio value="a">选项 A</t-radio>
            <t-radio value="b">选项 B</t-radio>
            <t-radio value="c">选项 C</t-radio>
            <t-radio value="d" disabled>禁用选项</t-radio>
          </t-radio-group>
        </div>
        <div class="demo-row wrap mt8">
          <t-radio-group default-value="a">
            <t-radio-button value="a">选项一</t-radio-button>
            <t-radio-button value="b">选项二</t-radio-button>
            <t-radio-button value="c">选项三</t-radio-button>
            <t-radio-button value="d" disabled>禁用</t-radio-button>
          </t-radio-group>
        </div>
      </section>

      <!-- ── 文本输入框 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Input <span>文本输入框</span></h2>
          <code>状态 → disabled/readonly/error · 尺寸</code>
        </div>
        <div class="demo-row wrap gap16">
          <t-input placeholder="默认输入框" style="width:200px" />
          <t-input placeholder="小尺寸" size="small" style="width:160px" />
          <t-input placeholder="禁用状态" disabled style="width:160px" />
          <t-input placeholder="只读状态" readonly value="只读内容" style="width:160px" />
          <t-input placeholder="报错状态" status="error" style="width:160px" />
          <t-textarea placeholder="多行输入框" :rows="3" style="width:280px" />
        </div>
      </section>

      <!-- ── 选择器 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Select <span>选择器</span></h2>
          <code>单选 / 多选 · 尺寸 · 禁用</code>
        </div>
        <div class="demo-row wrap gap16">
          <t-select placeholder="单选选择器" :options="selectOpts" style="width:180px" />
          <t-select placeholder="多选选择器" :options="selectOpts" multiple style="width:220px" />
          <t-select placeholder="小尺寸" :options="selectOpts" size="small" style="width:160px" />
          <t-select placeholder="禁用" :options="selectOpts" disabled style="width:160px" />
        </div>
      </section>

      <!-- ── 数字输入框 ── -->
      <section class="section">
        <div class="section-title">
          <h2>InputNumber <span>数字输入框</span></h2>
          <code>尺寸 · 禁用</code>
        </div>
        <div class="demo-row wrap gap16">
          <t-input-number :default-value="0" :min="0" />
          <t-input-number :default-value="5" size="small" />
          <t-input-number :default-value="0" disabled />
        </div>
      </section>

      <!-- ── 级联选择器 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Cascader <span>级联选择器</span></h2>
          <code>单选 / 多选</code>
        </div>
        <div class="demo-row wrap gap16">
          <t-cascader placeholder="单选级联" :options="cascaderOpts" style="width:200px" />
          <t-cascader placeholder="多选级联" :options="cascaderOpts" multiple style="width:220px" />
        </div>
      </section>

      <!-- ── 文字提示 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Tooltip <span>文字提示</span></h2>
          <code>方位 → top / bottom / left / right</code>
        </div>
        <div class="demo-row wrap">
          <t-tooltip content="上方提示" placement="top">
            <t-button variant="outline">上</t-button>
          </t-tooltip>
          <t-tooltip content="下方提示" placement="bottom">
            <t-button variant="outline">下</t-button>
          </t-tooltip>
          <t-tooltip content="左侧提示" placement="left">
            <t-button variant="outline">左</t-button>
          </t-tooltip>
          <t-tooltip content="右侧提示" placement="right">
            <t-button variant="outline">右</t-button>
          </t-tooltip>
        </div>
      </section>

      <!-- ── 下拉菜单 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Dropdown <span>下拉菜单</span></h2>
          <code>options 数组配置</code>
        </div>
        <div class="demo-row wrap">
          <t-dropdown :options="dropdownOpts">
            <t-button>下拉菜单 ▾</t-button>
          </t-dropdown>
          <t-dropdown :options="dropdownOpts">
            <t-button theme="default" variant="outline">次要下拉 ▾</t-button>
          </t-dropdown>
        </div>
      </section>

      <!-- ── 步骤条 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Steps <span>步骤条</span></h2>
          <code>进度 → current · 布局 → horizontal / vertical</code>
        </div>
        <div class="demo-block">
          <t-steps :current="1" layout="horizontal">
            <t-step-item title="已完成" content="第一步" />
            <t-step-item title="进行中" content="第二步" />
            <t-step-item title="未开始" content="第三步" />
            <t-step-item title="未开始" content="第四步" />
          </t-steps>
        </div>
      </section>

      <!-- ── 分页 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Pagination <span>分页</span></h2>
          <code>total · current · page-size</code>
        </div>
        <div class="demo-block">
          <t-pagination :total="100" :default-current="3" :default-page-size="10" show-jumper show-page-size />
        </div>
        <div class="demo-block mt16">
          <t-pagination :total="200" :default-current="1" :default-page-size="20" size="small" />
        </div>
      </section>

      <!-- ── 加载 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Loading <span>加载</span></h2>
          <code>尺寸 · 文字</code>
        </div>
        <div class="demo-row wrap">
          <div class="demo-item">
            <t-loading :loading="true" size="small" />
            <label>小</label>
          </div>
          <div class="demo-item">
            <t-loading :loading="true" size="medium" />
            <label>中</label>
          </div>
          <div class="demo-item">
            <t-loading :loading="true" size="large" />
            <label>大</label>
          </div>
          <div class="demo-item">
            <t-loading :loading="true" text="加载中..." />
            <label>带文字</label>
          </div>
        </div>
      </section>

      <!-- ── 标签 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Tag <span>标签</span></h2>
          <code>颜色 → theme · 类型 → variant · 尺寸 · 可关闭</code>
        </div>
        <div class="demo-row wrap">
          <t-tag theme="default">默认</t-tag>
          <t-tag theme="primary">主要</t-tag>
          <t-tag theme="warning">警告</t-tag>
          <t-tag theme="success">成功</t-tag>
          <t-tag theme="danger">危险</t-tag>
          <t-tag theme="primary" variant="outline">线框</t-tag>
          <t-tag theme="success" variant="light-outline">浅色线框</t-tag>
          <t-tag theme="danger" closable>可关闭</t-tag>
          <t-tag theme="primary" size="large">大尺寸</t-tag>
          <t-tag theme="default" size="small">小尺寸</t-tag>
        </div>
      </section>

      <!-- ── 进度条 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Progress <span>进度条</span></h2>
          <code>属性 → theme (line/circle) · 状态 · 尺寸</code>
        </div>
        <div class="demo-row wrap" style="align-items:flex-start">
          <div style="flex:1;min-width:200px">
            <t-progress theme="line" :percentage="60" />
            <div class="mt8" />
            <t-progress theme="line" :percentage="100" status="success" />
            <div class="mt8" />
            <t-progress theme="line" :percentage="40" status="warning" />
            <div class="mt8" />
            <t-progress theme="line" :percentage="20" status="error" />
          </div>
          <div class="demo-row wrap" style="gap:20px">
            <div class="demo-item">
              <t-progress theme="circle" :percentage="60" />
              <label>进行中</label>
            </div>
            <div class="demo-item">
              <t-progress theme="circle" :percentage="100" status="success" />
              <label>完成</label>
            </div>
            <div class="demo-item">
              <t-progress theme="circle" :percentage="30" status="error" />
              <label>错误</label>
            </div>
          </div>
        </div>
      </section>

      <!-- ── 评分 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Rate <span>评分</span></h2>
          <code>状态 → value · 半星 · 文字</code>
        </div>
        <div class="demo-row wrap">
          <div class="demo-item">
            <t-rate :value="0" :count="5" />
            <label>未评分</label>
          </div>
          <div class="demo-item">
            <t-rate :value="2.5" :count="5" :allow-half="true" />
            <label>半星</label>
          </div>
          <div class="demo-item">
            <t-rate :value="5" :count="5" :show-text="true" />
            <label>满分+文字</label>
          </div>
        </div>
      </section>

      <!-- ── 选项卡 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Tabs <span>选项卡</span></h2>
          <code>方向 → placement · 样式 → theme · 尺寸</code>
        </div>
        <t-tabs placement="top" theme="default">
          <t-tab-panel label="选项一" value="1">内容一</t-tab-panel>
          <t-tab-panel label="选项二" value="2">内容二</t-tab-panel>
          <t-tab-panel label="选项三" value="3">内容三</t-tab-panel>
        </t-tabs>
        <div class="mt16" />
        <t-tabs placement="top" theme="card">
          <t-tab-panel label="卡片一" value="a">卡片内容一</t-tab-panel>
          <t-tab-panel label="卡片二" value="b">卡片内容二</t-tab-panel>
        </t-tabs>
        <div class="mt16" />
        <t-tabs placement="left" theme="default">
          <t-tab-panel label="左侧一" value="x">纵向内容一</t-tab-panel>
          <t-tab-panel label="左侧二" value="y">纵向内容二</t-tab-panel>
        </t-tabs>
      </section>

      <!-- ── 树 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Tree <span>树</span></h2>
          <code>尺寸 · 类型 → line</code>
        </div>
        <div class="demo-row gap16" style="align-items:flex-start">
          <div>
            <div style="font-size:12px;color:#8a8aaa;margin-bottom:8px">基础</div>
            <t-tree :data="treeData" expand-all />
          </div>
          <div>
            <div style="font-size:12px;color:#8a8aaa;margin-bottom:8px">带连线</div>
            <t-tree :data="treeData" :line="true" expand-all />
          </div>
          <div>
            <div style="font-size:12px;color:#8a8aaa;margin-bottom:8px">可勾选</div>
            <t-tree :data="treeData" checkable expand-all />
          </div>
        </div>
      </section>

      <!-- ── 上传 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Upload <span>上传</span></h2>
          <code>类型 → theme (file/image/file-flow)</code>
        </div>
        <div class="demo-row wrap" style="align-items:flex-start;gap:24px">
          <div>
            <div style="font-size:12px;color:#8a8aaa;margin-bottom:8px">基本上传</div>
            <t-upload :request-method="mockUpload" accept="*" />
          </div>
          <div>
            <div style="font-size:12px;color:#8a8aaa;margin-bottom:8px">图片上传</div>
            <t-upload theme="image" :request-method="mockUpload" accept="image/*" />
          </div>
        </div>
      </section>

      <!-- ── 标签输入 ── -->
      <section class="section">
        <div class="section-title">
          <h2>TagInput <span>标签输入框</span></h2>
          <code>尺寸 · 禁用</code>
        </div>
        <div class="demo-row wrap">
          <t-tag-input :value="tagInputVal" placeholder="输入后按 Enter 添加标签" style="width:320px" @change="onTagInputChange" />
          <t-tag-input :value="['已有标签', '示例']" disabled style="width:280px" />
        </div>
      </section>

      <!-- ── 日期选择器 ── -->
      <section class="section">
        <div class="section-title">
          <h2>DatePicker <span>日期选择器</span></h2>
          <code>尺寸 · 禁用 · 类型</code>
        </div>
        <div class="demo-row wrap">
          <t-date-picker placeholder="请选择日期" style="width:200px" />
          <t-date-picker placeholder="小尺寸" size="small" style="width:180px" />
          <t-date-picker placeholder="禁用" disabled style="width:180px" />
          <t-date-picker enable-time-picker placeholder="日期+时间" style="width:220px" />
        </div>
      </section>

      <!-- ── 时间选择器 ── -->
      <section class="section">
        <div class="section-title">
          <h2>TimePicker <span>时间选择器</span></h2>
          <code>类型 (时间 / 区间) · 尺寸 · 样式</code>
        </div>
        <div class="demo-row wrap">
          <t-time-picker placeholder="请选择时间" style="width:180px" />
          <t-time-picker placeholder="小尺寸" size="small" style="width:160px" />
          <t-time-picker placeholder="禁用" disabled style="width:160px" />
        </div>
      </section>

      <!-- ── 表单 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Form <span>表单</span></h2>
          <code>布局 → layout · 尺寸</code>
        </div>
        <t-form layout="vertical" style="max-width:480px">
          <t-form-item label="姓名" name="name">
            <t-input placeholder="请输入姓名" />
          </t-form-item>
          <t-form-item label="部门" name="dept">
            <t-select placeholder="请选择部门" :options="selectOpts" />
          </t-form-item>
          <t-form-item label="备注" name="note">
            <t-textarea placeholder="请输入备注" :autosize="{ minRows: 2 }" />
          </t-form-item>
          <t-form-item>
            <t-button theme="primary" type="submit">提交</t-button>
            <t-button theme="default" variant="outline" style="margin-left:8px">重置</t-button>
          </t-form-item>
        </t-form>
      </section>

      <!-- ── 表格 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Table <span>表格</span></h2>
          <code>类型 → 普通/多选/单选 · 尺寸</code>
        </div>
        <div style="overflow-x: auto;">
          <t-primary-table
            :data="tableData"
            :columns="tableColumns"
            row-key="id"
            bordered
            stripe
            hover
          />
        </div>
      </section>

      <!-- ── 描述 ── -->
      <section class="section">
        <div class="section-title">
          <h2>描述 <span>Description</span></h2>
          <code>类型 → 文本/边框 · 布局 → 左右/上下 · 尺寸</code>
        </div>
        <div class="demo-row gap16" style="align-items:flex-start;flex-wrap:wrap">
          <div style="flex:1;min-width:300px">
            <div style="font-size:12px;color:#8a8aaa;margin-bottom:10px">文本型（左右）</div>
            <div class="desc-block">
              <div class="desc-title">用户信息</div>
              <div class="desc-list">
                <div v-for="item in descItems" :key="item.label" class="desc-item">
                  <span class="desc-label">{{ item.label }}</span>
                  <span class="desc-content">{{ item.content }}</span>
                </div>
              </div>
            </div>
          </div>
          <div style="flex:1;min-width:300px">
            <div style="font-size:12px;color:#8a8aaa;margin-bottom:10px">边框型</div>
            <div class="desc-block bordered">
              <div class="desc-title">用户信息</div>
              <table class="desc-table">
                <tbody>
                  <tr v-for="item in descItems" :key="item.label">
                    <td class="desc-table-label">{{ item.label }}</td>
                    <td class="desc-table-content">{{ item.content }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- ── 员工选择器 ── -->
      <section class="section">
        <div class="section-title">
          <h2>SearchSelect <span>员工选择器</span></h2>
          <code>类型 → 单选/多选 · 尺寸</code>
        </div>
        <div class="demo-row wrap gap16">
          <search-select
            :options="memberOptions"
            placeholder="请搜索选择成员"
            style="width:240px"
          />
          <search-select
            :options="memberOptions"
            :multiple="true"
            placeholder="多选成员"
            style="width:280px"
          />
          <search-select
            :options="memberOptions"
            size="small"
            placeholder="小尺寸"
            style="width:200px"
          />
        </div>
      </section>

      <!-- ── 卡片 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Card <span>卡片</span></h2>
          <code>类型 → 单张图 / 图集</code>
        </div>
        <div class="demo-row wrap gap16" style="align-items:flex-start">
          <t-card
            cover="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
            :bordered="true"
            style="width:280px"
          >
            <template #title>山间风景</template>
            <template #description>单张图卡片 · 带封面图片</template>
          </t-card>
          <t-card :bordered="true" style="width:280px">
            <template #title>普通卡片</template>
            <template #description>无封面图 · 文字内容卡片</template>
            <div style="padding:8px 0;font-size:13px;color:#555;line-height:1.6">
              这是卡片的正文内容区域，可以放置任意内容。
            </div>
          </t-card>
          <t-card :bordered="true" style="width:280px">
            <template #title>操作卡片</template>
            <template #actions>
              <t-button size="small" variant="text">查看</t-button>
              <t-button size="small" variant="text" theme="danger">删除</t-button>
            </template>
            <div style="padding:8px 0;font-size:13px;color:#555;line-height:1.6">
              带操作按钮的卡片样式。
            </div>
          </t-card>
        </div>
      </section>

      <!-- ── 警告提示 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Alert <span>警告提示</span></h2>
          <code>类型 → theme · 关闭按钮 · 操作</code>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <t-alert theme="success" message="操作成功，数据已保存。" />
          <t-alert theme="warning" message="注意：此操作不可撤销，请谨慎操作。" :close="true" />
          <t-alert theme="error" message="提交失败，请检查必填项是否完整。" />
          <t-alert theme="info" title="系统通知" message="系统将于今晚 22:00 进行例行维护，请提前保存数据。" :close="true" />
        </div>
      </section>

      <!-- ── 头像 & 徽标 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Avatar & Badge <span>头像 & 徽标</span></h2>
          <code>尺寸 · 形状 · 徽标数量</code>
        </div>
        <div class="demo-row wrap">
          <t-badge :count="5">
            <t-avatar>张</t-avatar>
          </t-badge>
          <t-badge :count="99" :max-count="99">
            <t-avatar image="https://i.pravatar.cc/80?img=1" shape="circle" />
          </t-badge>
          <t-badge dot>
            <t-avatar shape="round">李</t-avatar>
          </t-badge>
          <t-avatar size="large" image="https://i.pravatar.cc/80?img=3" />
          <t-avatar-group :max="3">
            <t-avatar image="https://i.pravatar.cc/80?img=4" />
            <t-avatar image="https://i.pravatar.cc/80?img=5" />
            <t-avatar image="https://i.pravatar.cc/80?img=6" />
            <t-avatar image="https://i.pravatar.cc/80?img=7" />
            <t-avatar>+</t-avatar>
          </t-avatar-group>
        </div>
      </section>

      <!-- ── 面包屑 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Breadcrumb <span>面包屑</span></h2>
          <code>导航路径</code>
        </div>
        <t-breadcrumb>
          <t-breadcrumb-item>首页</t-breadcrumb-item>
          <t-breadcrumb-item>组件库</t-breadcrumb-item>
          <t-breadcrumb-item>导航组件</t-breadcrumb-item>
          <t-breadcrumb-item>面包屑</t-breadcrumb-item>
        </t-breadcrumb>
      </section>

      <!-- ── 分割线 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Divider <span>分割线</span></h2>
          <code>方向 · 文字位置</code>
        </div>
        <t-divider />
        <t-divider>居中文字</t-divider>
        <t-divider align="left">左对齐</t-divider>
        <t-divider align="right">右对齐</t-divider>
        <div class="demo-row">
          <span>左侧文字</span>
          <t-divider layout="vertical" />
          <span>右侧文字</span>
          <t-divider layout="vertical" />
          <span>更多内容</span>
        </div>
      </section>

      <!-- ── 折叠面板 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Collapse <span>折叠面板</span></h2>
          <code>手风琴 · 展开/折叠</code>
        </div>
        <t-collapse>
          <t-collapse-panel header="面板一：基础信息" value="1">
            这是面板一的内容区域，可以放置任意表单或说明文字。
          </t-collapse-panel>
          <t-collapse-panel header="面板二：详细配置" value="2">
            这是面板二的内容，支持嵌套组件。
          </t-collapse-panel>
          <t-collapse-panel header="面板三：操作记录" value="3" :disabled="true">
            此面板已禁用，不可展开。
          </t-collapse-panel>
        </t-collapse>
      </section>

      <!-- ── 列表 ── -->
      <section class="section">
        <div class="section-title">
          <h2>List <span>列表</span></h2>
          <code>样式 / 尺寸 · 条纹 · 元信息</code>
        </div>
        <div class="demo-row gap16 wrap" style="align-items:flex-start">
          <div style="flex:1; min-width:240px">
            <t-list :split="true" style="max-width:320px">
              <t-list-item v-for="item in listItems" :key="item.id">
                <t-list-item-meta :title="item.title" :description="item.desc" />
              </t-list-item>
            </t-list>
          </div>
          <div style="flex:1; min-width:240px">
            <t-list stripe style="max-width:320px">
              <t-list-item v-for="item in listItems" :key="item.id">
                {{ item.title }}
              </t-list-item>
            </t-list>
          </div>
          <div style="flex:1; min-width:240px">
            <p class="demo-label" style="margin-bottom:8px">小尺寸 + 分割</p>
            <t-list split size="small" style="max-width:320px">
              <t-list-item>工作汇报 Q1 版本</t-list-item>
              <t-list-item>设计规范 2.0</t-list-item>
              <t-list-item>开发文档草稿</t-list-item>
            </t-list>
          </div>
        </div>
      </section>

      <!-- ── 滑动条 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Slider <span>滑动条</span></h2>
          <code>单滑块 / 范围滑块 · 步长</code>
        </div>
        <div style="padding:0 8px;display:flex;flex-direction:column;gap:20px">
          <t-slider :default-value="40" />
          <t-slider :default-value="[20, 70]" range />
          <t-slider :default-value="60" :step="10" show-stops />
          <t-slider :default-value="50" disabled />
        </div>
      </section>

      <!-- ── 骨架屏 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Skeleton <span>骨架屏</span></h2>
          <code>行数 · 头像 · 动效</code>
        </div>
        <div class="demo-row gap16" style="align-items:flex-start">
          <div style="flex:1">
            <t-skeleton :row-col="[1, 1, 1, { width: '60%' }]" />
          </div>
          <div style="flex:1">
            <t-skeleton theme="avatar-text" />
          </div>
        </div>
      </section>

      <!-- ── 树形选择 ── -->
      <section class="section">
        <div class="section-title">
          <h2>TreeSelect <span>树形选择</span></h2>
          <code>单选 / 多选 · 尺寸</code>
        </div>
        <div class="demo-row wrap gap16">
          <t-tree-select :data="treeData" placeholder="请选择节点" style="width:220px" />
          <t-tree-select :data="treeData" placeholder="多选节点" multiple style="width:260px" />
          <t-tree-select :data="treeData" placeholder="小尺寸" size="small" style="width:200px" />
        </div>
      </section>

      <!-- ── 消息提示 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Message <span>消息提示</span></h2>
          <code>类型 → success / warning / error / info</code>
        </div>
        <div class="demo-row wrap">
          <t-button @click="showMessage('success')">成功提示</t-button>
          <t-button @click="showMessage('warning')" theme="warning">警告提示</t-button>
          <t-button @click="showMessage('error')" theme="danger">错误提示</t-button>
          <t-button @click="showMessage('info')" theme="default" variant="outline">普通提示</t-button>
        </div>
      </section>

      <!-- ── 通知 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Notification <span>通知</span></h2>
          <code>右上角通知弹出</code>
        </div>
        <div class="demo-row wrap">
          <t-button @click="showNotify('success')">成功通知</t-button>
          <t-button @click="showNotify('warning')" theme="warning">警告通知</t-button>
          <t-button @click="showNotify('error')" theme="danger">错误通知</t-button>
          <t-button @click="showNotify('info')" theme="default" variant="outline">普通通知</t-button>
        </div>
      </section>

      <!-- ── 对话框 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Dialog <span>对话框</span></h2>
          <code>模态框 · 确认框</code>
        </div>
        <div class="demo-row wrap">
          <t-button @click="dialogVisible = true">普通对话框</t-button>
          <t-button theme="default" variant="outline" @click="confirmVisible = true">确认对话框</t-button>
        </div>
        <t-dialog
          v-model:visible="dialogVisible"
          header="对话框标题"
          :on-confirm="() => (dialogVisible = false)"
        >
          <p>这是对话框的内容区域，可以放置表单、说明文字等任意内容。</p>
        </t-dialog>
        <t-dialog
          v-model:visible="confirmVisible"
          header="确认删除"
          theme="warning"
          :on-confirm="() => (confirmVisible = false)"
          confirm-btn="确认删除"
          cancel-btn="取消"
        >
          <p>此操作不可撤销，确认要删除该记录吗？</p>
        </t-dialog>
      </section>

      <!-- ── 抽屉 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Drawer <span>抽屉</span></h2>
          <code>方向 → right / left / bottom</code>
        </div>
        <div class="demo-row wrap">
          <t-button @click="drawerVisible = true">右侧抽屉</t-button>
          <t-button theme="default" variant="outline" @click="drawerLeftVisible = true">左侧抽屉</t-button>
        </div>
        <t-drawer
          v-model:visible="drawerVisible"
          header="抽屉标题"
          :on-confirm="() => (drawerVisible = false)"
          :on-cancel="() => (drawerVisible = false)"
        >
          <p>这是抽屉的内容区域。</p>
          <p>可以放置详情信息、编辑表单等。</p>
        </t-drawer>
        <t-drawer
          v-model:visible="drawerLeftVisible"
          header="左侧抽屉"
          placement="left"
          :on-confirm="() => (drawerLeftVisible = false)"
          :on-cancel="() => (drawerLeftVisible = false)"
        >
          <p>左侧滑出的抽屉。</p>
        </t-drawer>
      </section>

      <!-- ── 气泡确认框 ── -->
      <section class="section">
        <div class="section-title">
          <h2>Popconfirm <span>气泡确认框</span></h2>
          <code>内联确认 · 不打断流程</code>
        </div>
        <div class="demo-row wrap">
          <t-popconfirm content="确认执行此操作？">
            <t-button>气泡确认</t-button>
          </t-popconfirm>
          <t-popconfirm content="此操作不可撤销，确认删除？" theme="danger">
            <t-button theme="danger" variant="outline">危险操作</t-button>
          </t-popconfirm>
          <t-popconfirm content="确认提交？" placement="top">
            <t-button theme="primary">向上弹出</t-button>
          </t-popconfirm>
        </div>
      </section>

      <!-- ── 等级标签 ── -->
      <section class="section">
        <div class="section-title">
          <h2>GradeLabel <span>等级标签</span></h2>
          <code>等级 → 低/中/高 · 尺寸</code>
        </div>
        <div class="demo-row wrap">
          <t-tag theme="success" variant="light" size="medium">低</t-tag>
          <t-tag theme="warning" variant="light" size="medium">中</t-tag>
          <t-tag theme="danger" variant="light" size="medium">高</t-tag>
          <t-tag theme="success" variant="light" size="small">低（小）</t-tag>
          <t-tag theme="warning" variant="light" size="small">中（小）</t-tag>
          <t-tag theme="danger" variant="light" size="small">高（小）</t-tag>
        </div>
      </section>

      <!-- ── 数字输入框 ── -->
      <section class="section">
        <div class="section-title">
          <h2>InputNumber <span>数字输入框</span></h2>
          <code>布局 → 左右/上下 · 尺寸 · 状态</code>
        </div>
        <div class="demo-row wrap gap16">
          <div class="demo-item">
            <t-input-number v-model="inputNum1" :min="0" :max="100" />
            <label>常规（左右）</label>
          </div>
          <div class="demo-item">
            <t-input-number v-model="inputNum2" :min="0" :max="100" size="small" />
            <label>小尺寸（左右）</label>
          </div>
          <div class="demo-item">
            <t-input-number v-model="inputNum3" :min="0" :max="100" theme="column" />
            <label>上下布局</label>
          </div>
          <div class="demo-item">
            <t-input-number :model-value="5" :min="0" :max="100" disabled />
            <label>禁用</label>
          </div>
        </div>
      </section>

      <!-- ── 选择器选项 ── -->
      <section class="section">
        <div class="section-title">
          <h2>SelectOption <span>选择器选项</span></h2>
          <code>类型 → 单选/多选 · 尺寸 · 状态</code>
        </div>
        <div class="demo-row wrap gap16">
          <div class="demo-item" style="min-width:200px">
            <t-select v-model="selectOptVal" placeholder="单选选择器" style="width:200px">
              <t-option value="1" label="选项一" />
              <t-option value="2" label="选项二" />
              <t-option value="3" label="选项三（禁用）" disabled />
              <t-option value="4" label="选项四" />
            </t-select>
            <label>单选</label>
          </div>
          <div class="demo-item" style="min-width:200px">
            <t-select v-model="selectOptMulti" multiple placeholder="多选选择器" style="width:240px">
              <t-option value="a" label="选项 A" />
              <t-option value="b" label="选项 B" />
              <t-option value="c" label="选项 C" />
              <t-option value="d" label="选项 D" />
            </t-select>
            <label>多选</label>
          </div>
        </div>
      </section>

    </main>

    <footer class="showcase-footer">
      @tencent/delta-ui · 36 个组件已与 Figma Code Connect 关联 · 展示 48 个区块 · 在 Figma Dev Mode 中选中组件即可获取代码
    </footer>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MessagePlugin, NotifyPlugin } from 'tdesign-vue-next'
import SearchSelect from './components/search-select/sr-select.vue'

const checkboxOpts = [
  { label: '选项 A', value: 'a' },
  { label: '选项 B', value: 'b' },
  { label: '选项 C', value: 'c' },
]

const selectOpts = [
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 },
  { label: '选项四', value: 4 },
]

const cascaderOpts = [
  {
    label: '华东', value: 'east',
    children: [
      { label: '上海', value: 'sh' },
      { label: '浙江', value: 'zj' },
      { label: '江苏', value: 'js' },
    ],
  },
  {
    label: '华南', value: 'south',
    children: [
      { label: '广东', value: 'gd' },
      { label: '福建', value: 'fj' },
    ],
  },
  {
    label: '华北', value: 'north',
    children: [
      { label: '北京', value: 'bj' },
      { label: '天津', value: 'tj' },
    ],
  },
]

const dropdownOpts = [
  { content: '编辑', value: 'edit' },
  { content: '复制', value: 'copy' },
  { content: '删除', value: 'delete', theme: 'error' },
]

const tagInputVal = ref<string[]>(['Vue', 'TypeScript'])
function onTagInputChange(v: string[]) { tagInputVal.value = v }

const treeData = [
  {
    label: '一级节点', value: '1',
    children: [
      { label: '二级节点 1-1', value: '1-1' },
      {
        label: '二级节点 1-2', value: '1-2',
        children: [
          { label: '三级节点 1-2-1', value: '1-2-1' },
        ],
      },
    ],
  },
  { label: '一级节点 2', value: '2' },
]

const tableData = [
  { id: 1, name: '张三', dept: '产品设计', status: '进行中', date: '2024-01-15' },
  { id: 2, name: '李四', dept: '前端开发', status: '已完成', date: '2024-01-20' },
  { id: 3, name: '王五', dept: '后端开发', status: '待处理', date: '2024-01-25' },
  { id: 4, name: '赵六', dept: '测试', status: '进行中', date: '2024-02-01' },
]

const tableColumns = [
  { colKey: 'id', title: 'ID', width: 60 },
  { colKey: 'name', title: '姓名', width: 100 },
  { colKey: 'dept', title: '部门' },
  { colKey: 'status', title: '状态', width: 100 },
  { colKey: 'date', title: '日期', width: 120 },
]

const memberOptions = [
  { label: '张三', value: '1' },
  { label: '李四', value: '2' },
  { label: '王五', value: '3' },
  { label: '赵六', value: '4' },
  { label: '孙七', value: '5' },
]

const descItems = [
  { label: '姓名', content: '张三' },
  { label: '部门', content: '产品设计' },
  { label: '邮箱', content: 'zhangsan@example.com' },
  { label: '状态', content: '在职' },
]

const inputNum1 = ref(5)
const inputNum2 = ref(3)
const inputNum3 = ref(10)
const selectOptVal = ref('')
const selectOptMulti = ref([])

const dialogVisible = ref(false)
const confirmVisible = ref(false)
const drawerVisible = ref(false)
const drawerLeftVisible = ref(false)

const listItems = [
  { id: 1, title: '列表项目一', desc: '这是描述文字，支持多行展示' },
  { id: 2, title: '列表项目二', desc: '第二条列表描述' },
  { id: 3, title: '列表项目三', desc: '第三条列表描述内容' },
  { id: 4, title: '列表项目四', desc: '最后一条列表项' },
]

const messageMap: Record<string, string> = {
  success: '操作成功！数据已保存。',
  warning: '警告：请检查输入内容。',
  error: '操作失败，请稍后重试。',
  info: '提示：当前为演示模式。',
}
function showMessage(theme: 'success' | 'warning' | 'error' | 'info') {
  MessagePlugin[theme](messageMap[theme])
}

const notifyMap: Record<string, { title: string; content: string }> = {
  success: { title: '操作成功', content: '您的数据已成功保存到服务器。' },
  warning: { title: '注意', content: '当前操作存在风险，请确认后继续。' },
  error: { title: '请求失败', content: '网络异常，请检查连接后重试。' },
  info: { title: '系统通知', content: '系统将于 22:00 进行例行维护。' },
}
function showNotify(theme: 'success' | 'warning' | 'error' | 'info') {
  NotifyPlugin[theme](notifyMap[theme])
}

function mockUpload() {
  return new Promise<{ status: string; response: { url: string } }>((resolve) => {
    setTimeout(() => resolve({ status: 'success', response: { url: '' } }), 800)
  })
}
</script>

<style>
* { box-sizing: border-box; }

body {
  margin: 0;
  background: #f5f6fa;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
  color: #1a1a2e;
}

.showcase-header {
  background: #fff;
  border-bottom: 1px solid #e8e8f0;
  position: sticky; top: 0; z-index: 100;
}
.header-inner {
  max-width: 1100px; margin: 0 auto;
  padding: 16px 32px;
  display: flex; align-items: center; gap: 14px;
}
.header-logo {
  width: 38px; height: 38px;
  background: #5b6df8; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 800; font-size: 18px;
  flex-shrink: 0;
}
.header-inner h1 { font-size: 17px; font-weight: 700; margin: 0 0 2px; }
.header-inner p  { font-size: 12px; color: #8a8aaa; margin: 0; }
.header-badge {
  margin-left: auto;
  display: flex; align-items: center; gap: 6px;
  background: #edfaf4; color: #2da462;
  border: 1px solid #b8edce;
  border-radius: 20px; padding: 5px 12px;
  font-size: 12px; font-weight: 600; white-space: nowrap;
}
.header-badge .dot { width: 7px; height: 7px; border-radius: 50%; background: #2da462; }

.showcase-main {
  max-width: 1100px; margin: 0 auto;
  padding: 32px 32px 64px;
  display: flex; flex-direction: column; gap: 0;
}

.section {
  background: #fff;
  border: 1px solid #e8e8f0;
  border-radius: 12px;
  padding: 24px 28px;
  margin-bottom: 16px;
}
.section-title {
  display: flex; align-items: baseline; justify-content: space-between;
  margin-bottom: 20px; gap: 12px; flex-wrap: wrap;
}
.section-title h2 { font-size: 16px; font-weight: 700; margin: 0; color: #1a1a2e; }
.section-title h2 span { font-size: 13px; color: #8a8aaa; font-weight: 400; margin-left: 6px; }
.section-title code {
  font-size: 11px; color: #8a8aaa;
  background: #f5f6fa; border: 1px solid #e8e8f0;
  border-radius: 5px; padding: 3px 8px;
  font-family: 'SF Mono', 'Fira Code', monospace;
}

.demo-row { display: flex; align-items: center; gap: 12px; }
.demo-row.wrap { flex-wrap: wrap; }
.demo-row.gap16 { gap: 16px; }
.mt8  { margin-top: 8px; }
.mt16 { margin-top: 16px; }
.demo-block { width: 100%; }

.demo-item { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.demo-item label { font-size: 11px; color: #8a8aaa; }
.demo-label { font-size: 12px; color: #6a6a8a; font-weight: 500; }

.showcase-footer {
  text-align: center; padding: 24px;
  font-size: 12px; color: #aaa;
  border-top: 1px solid #e8e8f0; background: #fff;
}

/* Description 自定义样式 */
.desc-block { border-radius: 8px; overflow: hidden; }

/* 文本型（无边框） */
.desc-block:not(.bordered) .desc-title {
  font-size: 14px; font-weight: 600; color: #1a1a2e; margin-bottom: 12px;
}
.desc-list { display: flex; flex-direction: column; gap: 10px; }
.desc-item { display: flex; gap: 12px; font-size: 13px; line-height: 1.5; }
.desc-label { color: #8a8aaa; min-width: 60px; flex-shrink: 0; }
.desc-content { color: #1a1a2e; }

/* 边框型 */
.desc-block.bordered { border: 1px solid #e8e8f0; }
.desc-block.bordered .desc-title {
  font-size: 14px; font-weight: 600; color: #1a1a2e;
  padding: 10px 16px; margin: 0;
  background: #f8f8fb;
  border-bottom: 1px solid #e8e8f0;
}
.desc-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.desc-table td { padding: 9px 16px; }
.desc-table tr:not(:last-child) td { border-bottom: 1px solid #e8e8f0; }
.desc-table-label {
  background: #f8f8fb; color: #8a8aaa;
  width: 100px; font-weight: 500;
  border-right: 1px solid #e8e8f0;
}
.desc-table-content { color: #1a1a2e; }
</style>
