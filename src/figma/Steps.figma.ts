// url=https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-4993
// source=src/components/steps/index.ts
// component=Steps
import figma from 'figma'

const instance = figma.selectedInstance

const 进度 = instance.getEnum('进度', {
  '进行1': 0,
  '进行2': 1,
  '运行中': 2,
  '运行3': 3,
  '完成': 4,
})

const layout = instance.getEnum('布局', {
  '上下': 'vertical',
  '左右': 'horizontal',
})

const size = instance.getEnum('尺寸', {
  '中尺寸': 'medium',
  '小尺寸': 'small',
})

export default {
  example: figma.code`
<t-steps
  :current="${进度}"
  layout="${layout}"
  size="${size}"
>
  <t-step-item title="步骤一" />
  <t-step-item title="步骤二" />
  <t-step-item title="步骤三" />
</t-steps>`,
  imports: [
    'import { Steps as TSteps, StepItem as TStepItem } from "@tencent/delta-ui"',
  ],
  id: 'steps',
  metadata: { nestable: false },
}
