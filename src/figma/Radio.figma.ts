import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-20354',
  {
    props: {
      checked: figma.enum('状态', {
        '选中': ':checked="true"',
        '选中禁用': ':checked="true"',
        '默认': undefined,
        '悬停': undefined,
        '未选中禁用': undefined,
        '组合': undefined,
      }),
      disabled: figma.enum('状态', {
        '未选中禁用': 'disabled',
        '选中禁用': 'disabled',
        '默认': undefined,
        '悬停': undefined,
        '选中': undefined,
        '组合': undefined,
      }),
    },
    example: ({ checked, disabled }) =>
      html`<t-radio value="option1" ${checked} ${disabled}>选项</t-radio>`,
    imports: ['import { Radio as TRadio } from "@tencent/delta-ui"'],
  }
)
