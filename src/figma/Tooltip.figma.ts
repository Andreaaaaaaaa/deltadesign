import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-78344',
  {
    props: {
      placement: figma.enum('方位', {
        '上': 'top',
        '下': 'bottom',
        '左': 'left',
        '右': 'right',
      }),
    },
    example: ({ placement }) =>
      html`<t-tooltip
  content="提示内容"
  placement="${placement}"
>
  <t-button>悬停查看提示</t-button>
</t-tooltip>`,
    imports: ['import { Tooltip as TTooltip } from "@tencent/delta-ui"'],
  }
)
