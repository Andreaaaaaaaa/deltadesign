import figma, { html } from '@figma/code-connect'

figma.connect(
  'https://www.figma.com/design/zPcMTh43LEKj0Qu6EUbNLs/DP%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=75-74806',
  {
    props: {
      type: figma.enum('操作', {
        '普通': 'text',
        '状态标签': 'tag',
        'button': 'button',
        '数值': 'number',
        '时间': 'datetime',
        '多个标签': 'multi-tag',
        '单选': 'radio',
        '多选': 'checkbox',
      }),
      stripe: figma.enum('斑马线', {
        '有斑马': true,
        '无斑马': undefined,
      }),
    },
    example: ({ stripe }) =>
      html`<t-primary-table
  :data="tableData"
  :columns="[
    { colKey: 'name', title: '姓名', width: 120 },
    {
      colKey: 'status',
      title: '状态',
      width: 100,
      cell: (h, { row }) =>
        h('t-tag', { theme: row.status === '进行中' ? 'primary' : 'success' }, row.status),
    },
    { colKey: 'date', title: '日期', width: 120 },
    { colKey: 'action', title: '操作', width: 100 },
  ]"
  row-key="id"
  bordered
  ${stripe}
/>`,
    imports: [
      'import { PrimaryTable as TPrimaryTable } from "@tencent/delta-ui"',
    ],
  }
)
