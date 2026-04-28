import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-21983',
  {
    props: {
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小': 'small',
      }),
      multiple: figma.enum('属性', {
        '多选': 'multiple',
        '单选': undefined,
      }),
      disabled: figma.enum('状态', {
        '禁用': 'disabled',
        '默认': undefined,
        '悬浮': undefined,
        '点击': undefined,
        '报错': undefined,
        '报错点击': undefined,
      }),
      status: figma.enum('状态', {
        '报错': 'status="error"',
        '报错点击': 'status="error"',
        '默认': undefined,
        '悬浮': undefined,
        '点击': undefined,
        '禁用': undefined,
      }),
    },
    example: ({ size, multiple, disabled, status }) =>
      html`<t-select
  placeholder="请选择"
  size="${size}"
  ${multiple}
  ${disabled}
  ${status}
  :options="[]"
/>`,
    imports: ['import { Select as TSelect } from "@tencent/delta-ui"'],
  }
)
