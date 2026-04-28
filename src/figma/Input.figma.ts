// url=https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-20809
// source=src/components/input/index.ts
// component=Input
import figma from 'figma'

const instance = figma.selectedInstance

const 类型 = instance.getEnum('类型', {
  '基础输入框': 'text',
  '多行输入框': 'textarea',
})

const 状态 = instance.getEnum('状态', {
  '默认': 'default',
  '点击': 'active',
  '已填': 'filled',
  '禁用': 'disabled',
  '报错': 'error',
  '只读': 'readonly',
  '已填+点击': 'filled-active',
})

const size = instance.getEnum('尺寸', {
  '常规': 'medium',
  '小尺寸': 'small',
})

const disabled = 状态 === 'disabled'
const readonly = 状态 === 'readonly'
const status = 状态 === 'error' ? 'error' : ''

const placeholderNode = instance.findText('Text')
const placeholder = placeholderNode && placeholderNode.type !== 'ERROR' ? placeholderNode.textContent : '请输入内容'

export default {
  example: 类型 === 'textarea'
    ? figma.code`
<t-textarea
  placeholder="${placeholder}"
  size="${size}"
  ${disabled ? 'disabled' : ''}
  ${readonly ? 'readonly' : ''}
  ${status ? figma.code`status="${status}"` : ''}
/>`
    : figma.code`
<t-input
  placeholder="${placeholder}"
  size="${size}"
  ${disabled ? 'disabled' : ''}
  ${readonly ? 'readonly' : ''}
  ${status ? figma.code`status="${status}"` : ''}
/>`,
  imports: [
    'import { Input as TInput } from "@tencent/delta-ui"',
    'import { Textarea as TTextarea } from "@tencent/delta-ui"',
  ],
  id: 'input',
  metadata: { nestable: false },
}
