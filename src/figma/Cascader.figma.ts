// url=https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-23534
// source=src/components/cascader/index.ts
// component=Cascader
import figma from 'figma'

const instance = figma.selectedInstance

const size = instance.getEnum('尺寸', {
  '常规': 'medium',
  '小': 'small',
})

const 类型 = instance.getEnum('类型', {
  '单选': 'single',
  '多选': 'multiple',
})

const multiple = 类型 === 'multiple'

export default {
  example: figma.code`
<t-cascader
  size="${size}"
  ${multiple ? 'multiple' : ''}
  placeholder="请选择"
  :options="[]"
/>`,
  imports: ['import { Cascader as TCascader } from "@tencent/delta-ui"'],
  id: 'cascader',
  metadata: { nestable: false },
}
