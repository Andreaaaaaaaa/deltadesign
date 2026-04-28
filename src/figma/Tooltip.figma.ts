// url=https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-78344
// source=src/components/tooltip/index.ts
// component=Tooltip
import figma from 'figma'

const instance = figma.selectedInstance

const placement = instance.getEnum('方位', {
  '上': 'top',
  '下': 'bottom',
  '左': 'left',
  '右': 'right',
})

const textNode = instance.findText('文本')
const content = textNode && textNode.type !== 'ERROR' ? textNode.textContent : '提示内容'

export default {
  example: figma.code`
<t-tooltip
  content="${content}"
  placement="${placement}"
>
  <t-button>悬停查看提示</t-button>
</t-tooltip>`,
  imports: ['import { Tooltip as TTooltip } from "@tencent/delta-ui"'],
  id: 'tooltip',
  metadata: { nestable: true },
}
