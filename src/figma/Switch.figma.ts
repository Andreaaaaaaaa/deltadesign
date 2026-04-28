// url=https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-20250
// source=src/components/switch/index.ts
// component=Switch
import figma from 'figma'

const instance = figma.selectedInstance

const size = instance.getEnum('尺寸', {
  '常规尺寸': 'medium',
  '小尺寸': 'small',
  '大尺寸': 'large',
})

const disabled = instance.getEnum('禁用', { 'on': true, 'off': false })
const checked = instance.getEnum('开关', { 'on': true, 'off': false })
const hasLabel = instance.getBoolean('描述')

const labelNode = hasLabel ? instance.findText('描述') : null
const labelText = labelNode && labelNode.type !== 'ERROR' ? labelNode.textContent : '开关描述'

export default {
  example: figma.code`
<t-switch
  size="${size}"
  ${disabled ? 'disabled' : ''}
  ${checked ? ':default-value="true"' : ''}
>${hasLabel ? figma.code`
  <template #label>${labelText}</template>` : ''}
</t-switch>`,
  imports: ['import { Switch as TSwitch } from "@tencent/delta-ui"'],
  id: 'switch',
  metadata: { nestable: false },
}
