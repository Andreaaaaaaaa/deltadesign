import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-23153',
  {
    props: {
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小': 'small',
      }),
      grouped: figma.enum('展示方式', {
        '分组': true,
        '普通': undefined,
      }),
      multiple: figma.enum('类型', {
        '多选': true,
        '单选': undefined,
      }),
      hasCreateOption: figma.boolean('新建选项'),
    },
    example: ({ size }) =>
      html`<t-dropdown
  :size="${size}"
  :options="[
    {
      content: '分组一',
      type: 'group',
      children: [
        { content: '选项 1', value: 1 },
        { content: '选项 2', value: 2 },
      ],
    },
    {
      content: '分组二',
      type: 'group',
      children: [
        { content: '选项 3', value: 3 },
        { content: '选项 4', value: 4 },
      ],
    },
  ]"
>
  <t-button>
    下拉选择
    <template #suffix-icon><chevron-down-icon /></template>
  </t-button>
</t-dropdown>`,
    imports: [
      'import { Dropdown as TDropdown } from "@tencent/delta-ui"',
      'import { Button as TButton } from "@tencent/delta-ui"',
    ],
  }
)
