import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-15541',
  {
    props: {
      disabled: figma.enum('状态', {
        '禁用': true,
        '默认': undefined,
        '点击': undefined,
        '已填': undefined,
        '悬浮': undefined,
      }),
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小': 'small',
      }),
      enableTimePicker: figma.enum('类型', {
        '带区间': undefined,
        '标签': undefined,
        '标签+图标': undefined,
        '常规': undefined,
      }),
    },
    example: ({ disabled, size }) =>
      html`<t-date-picker
  :size="${size}"
  ${disabled}
  placeholder="请选择日期"
/>`,
    imports: ['import { DatePicker as TDatePicker } from "@tencent/delta-ui"'],
  }
)
