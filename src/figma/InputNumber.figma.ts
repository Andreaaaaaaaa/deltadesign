import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-57600',
  {
    props: {
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小尺寸': 'small',
      }),
      disabled: figma.enum('状态', {
        '置灰': 'disabled',
        '默认': undefined,
        '悬浮': undefined,
        '点击': undefined,
      }),
    },
    example: ({ size, disabled }) =>
      html`<t-input-number
  :default-value="0"
  :min="0"
  size="${size}"
  ${disabled}
/>`,
    imports: ['import { InputNumber as TInputNumber } from "@tencent/delta-ui"'],
  }
)
