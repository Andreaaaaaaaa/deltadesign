// url=https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-20433
// source=src/components/checkbox/index.ts
// component=Checkbox
import figma from 'figma'

const instance = figma.selectedInstance

const 状态 = instance.getEnum('状态', {
  '默认': 'default',
  '悬停': 'hover',
  '选中': 'checked',
  '部分选中': 'indeterminate',
  '选中禁用': 'checked-disabled',
  '部分选中禁用': 'indeterminate-disabled',
  '未选中禁用': 'disabled',
  '组合': 'group',
})

const size = instance.getEnum('尺寸', {
  '常规': 'medium',
  '小': 'small',
})

const disabled = 状态 === 'disabled' || 状态 === 'checked-disabled' || 状态 === 'indeterminate-disabled'
const checked = 状态 === 'checked' || 状态 === 'checked-disabled'
const indeterminate = 状态 === 'indeterminate' || 状态 === 'indeterminate-disabled'

const labelNode = instance.findText('#var:label')
const labelText = labelNode && labelNode.type !== 'ERROR' ? labelNode.textContent : '选项'

export default {
  example: figma.code`
<t-checkbox
  ${checked ? ':default-checked="true"' : ''}
  ${indeterminate ? ':indeterminate="true"' : ''}
  ${disabled ? 'disabled' : ''}
>${labelText}</t-checkbox>`,
  imports: ['import { Checkbox as TCheckbox } from "@tencent/delta-ui"'],
  id: 'checkbox',
  metadata: { nestable: true },
}
