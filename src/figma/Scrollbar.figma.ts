import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-74757',
  {
    props: {
      direction: figma.enum('滑动条', {
        '横向': 'horizontal',
        '纵向': 'vertical',
      }),
    },
    example: ({ direction }) =>
      html`<t-scrollbar>
  <div style="width: 300px; height: 200px; overflow: auto;">
    <div style="width: 600px; height: 400px;">可滚动内容区域</div>
  </div>
</t-scrollbar>`,
    imports: ['import { Scrollbar as TScrollbar } from "tdesign-vue-next"'],
  }
)
