import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-15958',
  {
    props: {
      isRange: figma.enum('类型', {
        '时间选择器': undefined,
        '时间区间选择器': true,
      }),
      disabled: figma.enum('状态', {
        'Disabled': true,
        'Normal': undefined,
        '已填写': undefined,
        '已填写（带标签）': undefined,
        'Active': undefined,
      }),
      size: figma.enum('尺寸', {
        'Normal': 'medium',
        'Small': 'small',
      }),
      borderless: figma.enum('样式', {
        '无边框': true,
        '有边框': undefined,
      }),
    },
    example: ({ isRange, disabled, size, borderless }) =>
      html`<t-time-picker
  :size="${size}"
  ${disabled}
  :borderless="${borderless}"
  placeholder="请选择时间"
/>`,
    imports: ['import { TimePicker as TTimePicker } from "@tencent/delta-ui"'],
  }
)
