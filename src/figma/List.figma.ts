import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-76000',
  {
    props: {
      size: figma.enum('尺寸', {
        '默认（标准尺寸）': 'medium',
        '小尺寸': 'small',
      }),
    },
    example: ({ size }) =>
      html`<t-list size="${size}" split>
  <t-list-item>列表项一</t-list-item>
  <t-list-item>列表项二</t-list-item>
  <t-list-item>列表项三</t-list-item>
</t-list>`,
    imports: ['import { List as TList, ListItem as TListItem } from "@tencent/delta-ui"'],
  }
)
