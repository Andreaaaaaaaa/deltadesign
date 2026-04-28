// url=https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-4472
// source=src/components/pagination/index.ts
// component=Pagination
import figma from 'figma'

export default {
  example: figma.code`
<t-pagination
  :total="100"
  :default-current="1"
  :default-page-size="10"
  :show-jumper="true"
  :show-page-size="true"
/>`,
  imports: ['import { Pagination as TPagination } from "@tencent/delta-ui"'],
  id: 'pagination',
  metadata: { nestable: false },
}
