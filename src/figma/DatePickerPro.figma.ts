import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-13348',
  {
    props: {
      mode: figma.enum('场景', {
        '日期': 'date',
        '日期区间': 'date',
        '月份': 'month',
        '星期': 'week',
      }),
      isRange: figma.enum('场景', {
        '日期区间': true,
        '日期': undefined,
        '月份': undefined,
        '星期': undefined,
      }),
      enableCompare: figma.enum('支持对比', {
        'on': true,
        'off': undefined,
      }),
      withLabel: figma.enum('类型', {
        '带标签': true,
        '基础': undefined,
      }),
    },
    example: ({ mode, isRange, enableCompare }) =>
      html`<t-range-picker
  :mode="${mode}"
  :enable-time-picker="false"
  placeholder="['开始日期', '结束日期']"
/>`,
    imports: ['import { RangePicker as TRangePicker } from "@tencent/delta-ui"'],
  }
)
