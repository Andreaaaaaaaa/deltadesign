// url=https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-20354
// source=src/components/radio/index.ts
// component=Radio
import figma from 'figma'

const instance = figma.selectedInstance

const 状态 = instance.getEnum('状态', {
  '默认': 'default',
  '悬停': 'hover',
  '选中': 'checked',
  '选中禁用': 'checked-disabled',
  '未选中禁用': 'disabled',
  '组合': 'group',
})

const size = instance.getEnum('尺寸', {
  '常规': 'medium',
  '小': 'small',
})

const disabled = 状态 === 'disabled' || 状态 === 'checked-disabled'
const checked = 状态 === 'checked' || 状态 === 'checked-disabled'

const labelNode = instance.findText('#var:label')
const labelText = labelNode && labelNode.type !== 'ERROR' ? labelNode.textContent : '选项'

export default {
  example: figma.code`
<t-radio
  value="option1"
  ${checked ? ':checked="true"' : ''}
  ${disabled ? 'disabled' : ''}
>${labelText}</t-radio>`,
  imports: ['import { Radio as TRadio } from "@tencent/delta-ui"'],
  id: 'radio',
  metadata: { nestable: true },
}
