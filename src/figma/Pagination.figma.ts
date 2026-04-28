import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-4472',
  {
    props: {},
    example: () =>
      html`<t-pagination
  :total="100"
  :default-current="1"
  :default-page-size="10"
  show-jumper
  show-page-size
/>`,
    imports: ['import { Pagination as TPagination } from "@tencent/delta-ui"'],
  }
)
