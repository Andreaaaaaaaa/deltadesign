import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-77175',
  {
    props: {
      theme: figma.enum('等级', {
        '低等级': 'success',
        '中等级': 'warning',
        '高等级': 'danger',
      }),
      label: figma.enum('等级', {
        '低等级': '低',
        '中等级': '中',
        '高等级': '高',
      }),
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小尺寸': 'small',
      }),
    },
    example: ({ theme, label, size }) =>
      html`<t-tag
  theme="${theme}"
  variant="light"
  size="${size}"
>${label}</t-tag>`,
    imports: ['import { Tag as TTag } from "@tencent/delta-ui"'],
  }
)
