import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-23534',
  {
    props: {
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小': 'small',
      }),
      multiple: figma.enum('类型', {
        '多选': 'multiple',
        '单选': undefined,
      }),
    },
    example: ({ size, multiple }) =>
      html`<t-cascader
  placeholder="请选择"
  size="${size}"
  ${multiple}
  :options="[]"
/>`,
    imports: ['import { Cascader as TCascader } from "@tencent/delta-ui"'],
  }
)
