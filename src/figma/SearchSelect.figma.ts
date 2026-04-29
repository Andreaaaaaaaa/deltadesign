import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-20129',
  {
    props: {
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小': 'small',
      }),
      multiple: figma.enum('类型', {
        '多选': true,
        '单选': undefined,
      }),
      showTabs: figma.boolean('Tabs展示'),
    },
    example: ({ size, multiple }) =>
      html`<delta-search-select
  :size="${size}"
  ${multiple}
  :options="[
    { label: '张三', value: '1' },
    { label: '李四', value: '2' },
    { label: '王五', value: '3' },
    { label: '赵六', value: '4' },
  ]"
  placeholder="请搜索选择成员"
  style="width: 240px"
/>`,
    imports: [
      'import { SearchSelect as DeltaSearchSelect } from "@tencent/delta-ui"',
    ],
  }
)
