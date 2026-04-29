import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-19174',
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
      html`<t-tag-input
  :size="${size}"
  ${disabled}
  placeholder="请输入标签"
  :value="['标签一', '标签二']"
/>`,
    imports: ['import { TagInput as TTagInput } from "@tencent/delta-ui"'],
  }
)
