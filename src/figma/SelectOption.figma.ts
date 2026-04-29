import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-23306',
  {
    props: {
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小': 'small',
      }),
      multiple: figma.enum('类型', {
        '多选': 'multiple',
        '单选': undefined,
      }),
      disabled: figma.enum('状态', {
        '置灰': 'disabled',
        '置灰-部分选中': 'disabled',
        '选中置灰': 'disabled',
        '默认': undefined,
        '悬浮': undefined,
        '选中': undefined,
        '部分选中': undefined,
        '部分选中置灰': undefined,
      }),
    },
    example: ({ size, multiple, disabled }) =>
      html`<t-select
  placeholder="请选择"
  size="${size}"
  ${multiple}
>
  <t-option value="1" label="选项一" />
  <t-option value="2" label="选项二" ${disabled} />
  <t-option value="3" label="选项三" />
</t-select>`,
    imports: ['import { Select as TSelect, Option as TOption } from "@tencent/delta-ui"'],
  }
)
