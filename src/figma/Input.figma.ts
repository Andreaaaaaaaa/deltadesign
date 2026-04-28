import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-20809',
  {
    props: {
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小尺寸': 'small',
      }),
      disabled: figma.enum('状态', {
        '禁用': 'disabled',
        '默认': undefined,
        '点击': undefined,
        '已填': undefined,
        '报错': undefined,
        '只读': undefined,
        '已填+点击': undefined,
      }),
      readonly: figma.enum('状态', {
        '只读': 'readonly',
        '默认': undefined,
        '点击': undefined,
        '已填': undefined,
        '禁用': undefined,
        '报错': undefined,
        '已填+点击': undefined,
      }),
      status: figma.enum('状态', {
        '报错': 'status="error"',
        '默认': undefined,
        '点击': undefined,
        '已填': undefined,
        '禁用': undefined,
        '只读': undefined,
        '已填+点击': undefined,
      }),
    },
    example: ({ size, disabled, readonly, status }) =>
      html`<t-input
  placeholder="请输入内容"
  size="${size}"
  ${disabled}
  ${readonly}
  ${status}
/>`,
    imports: ['import { Input as TInput } from "@tencent/delta-ui"'],
  }
)
