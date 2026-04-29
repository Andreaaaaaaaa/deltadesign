import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-4170',
  {
    props: {
      placement: figma.enum('方向', {
        '横向': 'top',
        '纵向': 'left',
      }),
      theme: figma.enum('样式', {
        '卡片型': 'card',
        '文本型': 'default',
      }),
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小': 'small',
        '迷你': 'small',
      }),
    },
    example: ({ placement, theme, size }) =>
      html`<t-tabs
  :placement="${placement}"
  :theme="${theme}"
  :size="${size}"
>
  <t-tab-panel label="选项一" value="1">内容一</t-tab-panel>
  <t-tab-panel label="选项二" value="2">内容二</t-tab-panel>
  <t-tab-panel label="选项三" value="3">内容三</t-tab-panel>
</t-tabs>`,
    imports: ['import { Tabs as TTabs, TabPanel as TTabPanel } from "@tencent/delta-ui"'],
  }
)
