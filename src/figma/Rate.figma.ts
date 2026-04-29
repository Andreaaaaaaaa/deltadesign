import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-74694',
  {
    props: {
      showText: figma.boolean('Show 文字'),
      value: figma.enum('状态', {
        '未评分': 0,
        '半星': 2.5,
        '满分': 5,
      }),
    },
    example: ({ value, showText }) =>
      html`<t-rate
  :value="${value}"
  :show-text="${showText}"
  :count="5"
  :allow-half="true"
/>`,
    imports: ['import { Rate as TRate } from "tdesign-vue-next"'],
  }
)
