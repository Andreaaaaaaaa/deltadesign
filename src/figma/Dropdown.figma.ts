// url=https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=74-2287
// source=src/components/dropdown/index.ts
// component=Dropdown
import figma from 'figma'

export default {
  example: figma.code`
<t-dropdown
  :options="[
    { content: '选项一', value: 1 },
    { content: '选项二', value: 2 },
    { content: '选项三', value: 3 },
  ]"
>
  <t-button suffix-icon>
    下拉菜单
    <template #suffix-icon><chevron-down-icon /></template>
  </t-button>
</t-dropdown>`,
  imports: [
    'import { Dropdown as TDropdown } from "@tencent/delta-ui"',
    'import { Button as TButton } from "@tencent/delta-ui"',
  ],
  id: 'dropdown',
  metadata: { nestable: true },
}
