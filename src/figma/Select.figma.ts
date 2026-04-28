// url=https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-21983
// source=src/components/select/index.ts
// component=Select
import figma from 'figma'

const instance = figma.selectedInstance

const 状态 = instance.getEnum('状态', {
  '默认': 'default',
  '悬浮': 'hover',
  '点击': 'active',
  '禁用': 'disabled',
  '报错': 'error',
  '报错点击': 'error-active',
})

const size = instance.getEnum('尺寸', {
  '常规': 'medium',
  '小': 'small',
})

const 属性 = instance.getEnum('属性', {
  '单选': 'single',
  '多选': 'multiple',
})

const disabled = 状态 === 'disabled'
const status = 状态 === 'error' || 状态 === 'error-active' ? 'error' : ''
const multiple = 属性 === 'multiple'

export default {
  example: figma.code`
<t-select
  size="${size}"
  ${multiple ? 'multiple' : ''}
  ${disabled ? 'disabled' : ''}
  ${status ? figma.code`status="${status}"` : ''}
  placeholder="请选择"
  :options="[]"
/>`,
  imports: ['import { Select as TSelect } from "@tencent/delta-ui"'],
  id: 'select',
  metadata: { nestable: false },
}
