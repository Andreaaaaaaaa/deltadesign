// url=https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-77220
// source=src/components/loading/index.ts
// component=Loading
import figma from 'figma'

const instance = figma.selectedInstance

const size = instance.getEnum('尺寸', {
  '小': 'small',
  '中': 'medium',
  '大': 'large',
})

const layout = instance.getEnum('布局', {
  '左右': 'horizontal',
  '上下': 'vertical',
})

export default {
  example: figma.code`
<t-loading
  size="${size}"
  loading
  text="加载中"
/>`,
  imports: ['import { Loading as TLoading } from "@tencent/delta-ui"'],
  id: 'loading',
  metadata: { nestable: false },
}
