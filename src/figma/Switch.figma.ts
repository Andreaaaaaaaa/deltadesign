import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-20250',
  {
    props: {
      size: figma.enum('尺寸', {
        '常规尺寸': 'medium',
        '小尺寸': 'small',
        '大尺寸': 'large',
      }),
      disabled: figma.enum('禁用', {
        'on': 'disabled',
        'off': undefined,
      }),
      defaultValue: figma.enum('开关', {
        'on': ':default-value="true"',
        'off': undefined,
      }),
    },
    example: ({ size, disabled, defaultValue }) =>
      html`<t-switch size="${size}" ${defaultValue} ${disabled} />`,
    imports: ['import { Switch as TSwitch } from "@tencent/delta-ui"'],
  }
)
