import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-78230',
  {
    props: {
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小': 'small',
        '紧凑': 'small',
      }),
      line: figma.enum('类型', {
        '带连线': true,
        '基础': undefined,
      }),
    },
    example: ({ size, line }) =>
      html`<t-tree
  :size="${size}"
  :line="${line}"
  :data="[
    { label: '节点一', value: '1', children: [
      { label: '子节点一', value: '1-1' },
      { label: '子节点二', value: '1-2' },
    ]},
    { label: '节点二', value: '2' },
  ]"
/>`,
    imports: ['import { Tree as TTree } from "@tencent/delta-ui"'],
  }
)
