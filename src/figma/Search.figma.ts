import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-18196',
  {
    props: {
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小': 'small',
      }),
      disabled: figma.enum('状态', {
        '置灰': true,
        '默认': undefined,
        'hover': undefined,
        '点击': undefined,
        '已填': undefined,
      }),
    },
    example: ({ size, disabled }) =>
      html`<t-input
  :size="${size}"
  ${disabled}
  placeholder="请输入搜索内容"
  clearable
>
  <template #prefix-icon>
    <t-icon name="search" />
  </template>
</t-input>`,
    imports: [
      'import { Input as TInput } from "@tencent/delta-ui"',
      'import { Icon as TIcon } from "tdesign-icons-vue-next"',
    ],
  }
)
