// url=https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=74-2757
// source=src/components/button/index.ts
// component=Button
import figma from 'figma'

const instance = figma.selectedInstance

// 类型 → theme + variant + shape
const 类型 = instance.getEnum('类型', {
  '主要按钮': 'primary',
  '次要按钮': 'secondary',
  '告警按钮': 'danger',
  '次要告警': 'danger-outline',
  '文字按钮': 'text',
  '纯Icon按钮': 'icon-circle',
  'icon操作': 'icon-action',
})

// 尺寸 → size
const size = instance.getEnum('尺寸', {
  '小尺寸': 'small',
  '常规尺寸': 'medium',
  '大尺寸': 'large',
})

// 状态 → disabled / loading
const 状态 = instance.getEnum('状态', {
  '默认': 'default',
  '悬浮': 'hover',
  '点击': 'active',
  '置灰': 'disabled',
  '加载': 'loading',
  '选中': 'selected',
})

const hasIcon = instance.getBoolean('ICON')
const hasDropdown = instance.getBoolean('下拉')

// 根据类型推导 theme / variant / shape
let theme = 'primary'
let variant = 'base'
let shape = ''

if (类型 === 'secondary') {
  theme = 'default'
  variant = 'outline'
} else if (类型 === 'danger') {
  theme = 'danger'
} else if (类型 === 'danger-outline') {
  theme = 'danger'
  variant = 'outline'
} else if (类型 === 'text') {
  variant = 'text'
} else if (类型 === 'icon-circle') {
  shape = 'circle'
} else if (类型 === 'icon-action') {
  theme = 'default'
  variant = 'text'
}

const disabled = 状态 === 'disabled'
const loading = 状态 === 'loading'

// icon slot（操作icon 用于带图标按钮）
const iconInstance = hasIcon ? instance.getInstanceSwap('操作icon') : null
let iconCode
if (iconInstance && iconInstance.type === 'INSTANCE') {
  iconCode = iconInstance.executeTemplate().example
}

// 按钮文字（来自默认 slot 文本层）
const labelNode = instance.findText('#slot:default')
const labelText = labelNode && labelNode.type !== 'ERROR' ? labelNode.textContent : '按钮文字'

export default {
  example: figma.code`
<t-button
  theme="${theme}"
  variant="${variant}"
  ${shape ? figma.code`shape="${shape}"` : ''}
  size="${size}"
  ${disabled ? 'disabled' : ''}
  ${loading ? 'loading' : ''}
  ${hasDropdown ? figma.code`suffix-icon` : ''}
>${iconCode ? figma.code`
  <template #icon>${iconCode}</template>
  ${labelText}` : figma.code`${labelText}`}
</t-button>`,
  imports: ['import { Button as TButton } from "@tencent/delta-ui"'],
  id: 'button',
  metadata: { nestable: true },
}
