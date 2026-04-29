import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-76038',
  {
    props: {
      theme: figma.enum('颜色', {
        '默认': 'default',
        '主色': 'primary',
        '警告': 'warning',
        '成功': 'success',
        '危险': 'danger',
      }),
      variant: figma.enum('类型', {
        '深色': 'dark',
        '浅色': 'light',
        '线形': 'outline',
        '浅色线形': 'light-outline',
      }),
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小': 'small',
        '大': 'large',
      }),
      closable: figma.enum('状态', {
        '可关闭': true,
        '默认': undefined,
        '禁用': undefined,
      }),
      disabled: figma.enum('状态', {
        '禁用': true,
        '默认': undefined,
        '可关闭': undefined,
      }),
    },
    example: ({ theme, variant, size, closable, disabled }) =>
      html`<t-tag
  theme="${theme}"
  variant="${variant}"
  size="${size}"
  ${closable}
  ${disabled}
>标签文字</t-tag>`,
    imports: ['import { Tag as TTag } from "@tencent/delta-ui"'],
  }
)
