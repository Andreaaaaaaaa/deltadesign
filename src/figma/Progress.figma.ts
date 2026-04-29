import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-74602',
  {
    props: {
      theme: figma.enum('属性', {
        '条形': 'line',
        '环形': 'circle',
      }),
      status: figma.enum('状态', {
        '进行中': 'active',
        '完成': 'success',
        '中断': 'warning',
        '报错': 'error',
      }),
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '大': 'large',
        '小': 'small',
      }),
    },
    example: ({ theme, status, size }) =>
      html`<t-progress
  :theme="${theme}"
  :status="${status}"
  :size="${size}"
  :percentage="60"
/>`,
    imports: ['import { Progress as TProgress } from "@tencent/delta-ui"'],
  }
)
