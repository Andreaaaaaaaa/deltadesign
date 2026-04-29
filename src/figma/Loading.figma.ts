import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-77225',
  {
    props: {
      size: figma.enum('尺寸', {
        '小': 'small',
        '中': 'medium',
        '大': 'large',
      }),
    },
    example: ({ size }) =>
      html`<t-loading
  loading
  size="${size}"
  text="加载中"
/>`,
    imports: ['import { Loading as TLoading } from "@tencent/delta-ui"'],
  }
)
