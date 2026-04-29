import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-20529',
  {
    props: {
      bordered: figma.enum('类型', {
        '文本': undefined,
        '边框': true,
      }),
      layout: figma.enum('布局', {
        '左右': 'horizontal',
        '上下': 'vertical',
      }),
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小': 'small',
      }),
    },
    example: ({ bordered, layout, size }) =>
      html`<t-descriptions
  title="标题"
  :bordered="${bordered}"
  :layout="${layout}"
  :size="${size}"
>
  <t-descriptions-item label="姓名">张三</t-descriptions-item>
  <t-descriptions-item label="年龄">28</t-descriptions-item>
  <t-descriptions-item label="状态">正常</t-descriptions-item>
</t-descriptions>`,
    imports: [
      'import { Descriptions as TDescriptions, DescriptionsItem as TDescriptionsItem } from "tdesign-vue-next"',
    ],
  }
)
