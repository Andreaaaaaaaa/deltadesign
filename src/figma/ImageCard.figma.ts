import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-74730',
  {
    props: {
      type: figma.enum('类型', {
        '单张图': 'single',
        '图集': 'gallery',
      }),
    },
    example: ({ type }) =>
      html`<t-card
  cover="https://via.placeholder.com/360x200"
  :bordered="true"
  style="width: 320px"
>
  <template #title>图片标题</template>
  <template #description>图片描述内容</template>
</t-card>`,
    imports: [
      'import { Card as TCard } from "@tencent/delta-ui"',
    ],
  }
)
