import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=74-2757',
  {
    props: {
      theme: figma.enum('类型', {
        '主要按钮': 'primary',
        '次要按钮': 'default',
        '告警按钮': 'danger',
        '次要告警': 'danger',
        '文字按钮': 'default',
        '纯Icon按钮': 'primary',
        'icon操作': 'default',
      }),
      variant: figma.enum('类型', {
        '主要按钮': 'base',
        '次要按钮': 'outline',
        '告警按钮': 'base',
        '次要告警': 'outline',
        '文字按钮': 'text',
        '纯Icon按钮': 'base',
        'icon操作': 'text',
      }),
      size: figma.enum('尺寸', {
        '小尺寸': 'small',
        '常规尺寸': 'medium',
        '大尺寸': 'large',
      }),
      disabled: figma.enum('状态', {
        '置灰': 'disabled',
        '默认': undefined,
        '悬浮': undefined,
        '点击': undefined,
        '加载': undefined,
        '选中': undefined,
      }),
      loading: figma.enum('状态', {
        '加载': 'loading',
        '默认': undefined,
        '悬浮': undefined,
        '点击': undefined,
        '置灰': undefined,
        '选中': undefined,
      }),
    },
    example: ({ theme, variant, size, disabled, loading }) =>
      html`<t-button
  theme="${theme}"
  variant="${variant}"
  size="${size}"
  ${disabled}
  ${loading}
>按钮文字</t-button>`,
    imports: ['import { Button as TButton } from "@tencent/delta-ui"'],
  }
)
