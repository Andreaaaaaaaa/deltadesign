import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-75177',
  {
    props: {
      align: figma.enum('对齐', {
        '左对齐': 'left',
        '右对齐': 'right',
      }),
      size: figma.enum('尺寸', {
        '常规': 'medium',
        '小尺寸': 'small',
      }),
      type: figma.enum('操作', {
        '普通': 'text',
        '排序': 'sorter',
        '多选': 'multiple',
        '单选': 'single',
      }),
    },
    example: ({ size, align }) =>
      html`<t-primary-table
  :size="${size}"
  :columns="[
    { colKey: 'select', type: 'multiple', width: 48 },
    {
      colKey: 'name',
      title: '姓名',
      align: '${align}',
      sorter: true,
      sortType: 'all',
    },
    { colKey: 'dept', title: '部门' },
    { colKey: 'date', title: '日期', align: 'right', sorter: true },
  ]"
  :data="tableData"
  row-key="id"
  bordered
/>`,
    imports: [
      'import { PrimaryTable as TPrimaryTable } from "@tencent/delta-ui"',
    ],
  }
)
