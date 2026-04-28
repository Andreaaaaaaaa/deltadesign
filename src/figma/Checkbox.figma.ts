import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-20433',
  {
    props: {
      checked: figma.enum('状态', {
        '选中': ':default-checked="true"',
        '选中禁用': ':default-checked="true"',
        '默认': undefined,
        '悬停': undefined,
        '未选中禁用': undefined,
        '部分选中': undefined,
        '部分选中禁用': undefined,
        '组合': undefined,
      }),
      indeterminate: figma.enum('状态', {
        '部分选中': ':indeterminate="true"',
        '部分选中禁用': ':indeterminate="true"',
        '默认': undefined,
        '悬停': undefined,
        '选中': undefined,
        '选中禁用': undefined,
        '未选中禁用': undefined,
        '组合': undefined,
      }),
      disabled: figma.enum('状态', {
        '未选中禁用': 'disabled',
        '选中禁用': 'disabled',
        '部分选中禁用': 'disabled',
        '默认': undefined,
        '悬停': undefined,
        '选中': undefined,
        '部分选中': undefined,
        '组合': undefined,
      }),
    },
    example: ({ checked, indeterminate, disabled }) =>
      html`<t-checkbox ${checked} ${indeterminate} ${disabled}>选项</t-checkbox>`,
    imports: ['import { Checkbox as TCheckbox } from "@tencent/delta-ui"'],
  }
)
