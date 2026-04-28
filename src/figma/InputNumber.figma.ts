// url=https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-57600
// source=src/components/input-number/index.ts
// component=InputNumber
import figma from 'figma'

const instance = figma.selectedInstance

const 状态 = instance.getEnum('状态', {
  '默认': 'default',
  '悬浮': 'hover',
  '点击': 'active',
  '置灰': 'disabled',
})

const size = instance.getEnum('尺寸', {
  '常规': 'medium',
  '小尺寸': 'small',
})

const disabled = 状态 === 'disabled'

export default {
  example: figma.code`
<t-input-number
  size="${size}"
  ${disabled ? 'disabled' : ''}
  :default-value="0"
  :min="0"
/>`,
  imports: ['import { InputNumber as TInputNumber } from "@tencent/delta-ui"'],
  id: 'input-number',
  metadata: { nestable: false },
}
