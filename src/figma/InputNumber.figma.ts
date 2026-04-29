import figma, { html } from '@figma/code-connect'

/**
 * 数字输入框（嵌套于 Frame 内，Figma 未暴露标准变体属性名，仅提供静态 Code Connect 示例）
 */
figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-18756',
  {
    example: () =>
      html`<t-input-number
  v-model="value"
  :min="0"
  :max="100"
  :step="1"
  size="medium"
  theme="row"
/>`,
    imports: ['import { InputNumber as TInputNumber } from "@tencent/delta-ui"'],
  }
)
