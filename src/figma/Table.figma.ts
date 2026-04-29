import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-75266',
  {
    props: {
      type: figma.enum('类型', {
        '普通': undefined,
        '多选': 'multiple',
        '单选': 'single',
        '展开收起': undefined,
        '输入': undefined,
        '复合型': undefined,
      }),
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小尺寸': 'small',
      }),
    },
    example: ({ size }) =>
      html`<t-primary-table
  :size="${size}"
  :data="[
    { index: 1, name: '项目一', status: '进行中' },
    { index: 2, name: '项目二', status: '已完成' },
  ]"
  :columns="[
    { colKey: 'index', title: '序号', width: 80 },
    { colKey: 'name', title: '名称' },
    { colKey: 'status', title: '状态' },
  ]"
  row-key="index"
/>`,
    imports: ['import { PrimaryTable as TPrimaryTable } from "@tencent/delta-ui"'],
  }
)
