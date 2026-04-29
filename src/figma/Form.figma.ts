import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-21353',
  {
    props: {
      layout: figma.enum('布局', {
        '左右': 'inline',
        '上下': 'vertical',
        '横向左右布局': 'inline',
        '横向上下布局': 'vertical',
      }),
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小尺寸': 'small',
      }),
    },
    example: ({ layout, size }) =>
      html`<t-form :layout="${layout}" :size="${size}">
  <t-form-item label="姓名" name="name">
    <t-input placeholder="请输入姓名" />
  </t-form-item>
  <t-form-item label="性别" name="gender">
    <t-select placeholder="请选择性别">
      <t-option value="male" label="男" />
      <t-option value="female" label="女" />
    </t-select>
  </t-form-item>
  <t-form-item>
    <t-button theme="primary" type="submit">提交</t-button>
  </t-form-item>
</t-form>`,
    imports: [
      'import { Form as TForm, FormItem as TFormItem } from "@tencent/delta-ui"',
      'import { Input as TInput } from "@tencent/delta-ui"',
      'import { Select as TSelect, Option as TOption } from "@tencent/delta-ui"',
      'import { Button as TButton } from "@tencent/delta-ui"',
    ],
  }
)
