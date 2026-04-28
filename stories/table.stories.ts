import { reactive, toRefs, ref } from 'vue';
import {
  Table as TTable,
  PrimaryTable as TPrimaryTable,
  EnhancedTable as TEnhancedTable,
} from '../src/components/table';
import { Tooltip as TTooltip } from '../src/components/tooltip';
import { GradationTable as TGradationTable } from '../src/components/gradation-table';

import '../src/assets/index.scss';

export default {
  title: '数据展示/Table 表格',
  component: {
    TTable,
    TPrimaryTable,
    TEnhancedTable,
    TGradationTable,
  },
  argTypes: {
    allowResizeColumnWidth: {
      description: '是否允许调整列宽',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    bordered: {
      description: '是否显示表格边框',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    bottomContent: {
      description: '表格底部内容，可以用于自定义列设置等。TS 类型：string | TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    columns: {
      description: '列配置，泛型 T 指表格数据类型。TS 类型：Array<BaseTableCol<T>>',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '[]',
        },
      },
    },
    data: {
      description: '数据源，泛型 T 指表格数据类型。TS 类型：Array<T>',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '[]',
        },
      },
    },
    disableDataPage: {
      description:
        '是否禁用本地数据分页。当 data 数据长度超过分页大小时，会自动进行本地数据分页。如果 disableDataPage 设置为 true，则无论何时，都不会进行本地数据分页',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    empty: {
      description: '空表格呈现样式，支持全局配置 GlobalConfigProvider。TS 类型：string | TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: "''",
        },
      },
    },
    firstFullRow: {
      description: '首行内容。TS 类型：string | TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    fixedRows: {
      description:
        '固定行（冻结行），示例：[M, N]，表示冻结表头 M 行和表尾 N 行。M 和 N 值为 0 时，表示不冻结行。TS 类型：Array<number>',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    footData: {
      description: '表尾数据源，泛型 T 指表格数据类型。TS 类型：Array<T>',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '[]',
        },
      },
    },
    footerAffixedBottom: {
      description: '表尾吸底',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    footerAffixProps: {
      description: '表尾吸底基于 Affix 组件开发，透传全部 Affix 组件属性。TS 类型：AffixProps',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    headerAffixedTop: {
      description: '表头吸顶',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    headerAffixProps: {
      description:
        '表头吸顶基于 Affix 组件开发，透传全部 Affix 组件属性。TS 类型：AffixProps，Affix API Documents。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    height: {
      description:
        "表格高度，超出后会出现滚动条。示例：100, '30%', '300'。值为数字类型，会自动加上单位 px。如果不是绝对固定表格高度，建议使用 maxHeight",
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'String / Number',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    hover: {
      description: '是否显示鼠标悬浮状态',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    lastFullRow: {
      description: '尾行内容。TS 类型：string | TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    loading: {
      description:
        '加载中状态。值为 true 会显示默认加载中样式，可以通过 Function 和 插槽 自定义加载状态呈现内容和样式。值为 false 则会取消加载状态。TS 类型：boolean | TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Boolean / Slot / Function',
        },
        defaultValue: {
          summary: 'undefined',
        },
      },
    },
    loadingProps: {
      description: '透传加载组件全部属性。TS 类型：LoadingProps，Loading API Documents。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    maxHeight: {
      description: "表格最大高度，超出后会出现滚动条。示例：100, '30%', '300'。值为数字类型，会自动加上单位 px",
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'String / Number',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    pagination: {
      description:
        '分页配置，值为空则不显示。具体 API 参考分页组件。当 data 数据长度超过分页大小时，会自动对本地数据 data 进行排序，如果不希望对于 data 进行排序，可以设置 disableDataPage = true。TS 类型：PaginationProps，Pagination API Documents。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    rowAttributes: {
      description:
        "HTML 标签 tr 的属性。类型为 Function 时，参数说明：params.row 表示行数据；params.rowIndex 表示行下标；params.type=body 表示属性作用于 tbody 中的元素；params.type=foot 表示属性作用于 tfoot 中的元素。 示例一：{ draggable: true }， 示例二：[{ draggable: true }, { title: '超出省略显示' }]。 示例三：() => [{ draggable: true }]。TS 类型：TableRowAttributes<T> type TableRowAttributes<T> = HTMLElementAttributes | ((params: { row: T; rowIndex: number; type: 'body' | 'foot' }) => HTMLElementAttributes) | Array<TableRowAttributes<T>>。详细类型定义",
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Object / Array / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    rowClassName: {
      description:
        "行类名，泛型 T 指表格数据类型。params.row 表示行数据；params.rowIndex 表示行下标；params.type=body 表示类名作用于 tbody 中的元素；params.type=body 表示类名作用于 tfoot 中的元素。TS 类型：ClassName | ((params: RowClassNameParams<T>) => ClassName) interface RowClassNameParams<T> { row: T; rowIndex: number; type?: 'body' | 'foot' }。通用类型定义。详细类型定义",
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'String / Object / Array / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    rowKey: {
      description: '必需。使用 rowKey 唯一标识一行数据',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    rowspanAndColspan: {
      description:
        '用于自定义合并单元格，泛型 T 指表格数据类型。示例：({ row, col, rowIndex, colIndex }) => { rowspan: 2, colspan: 3 }。TS 类型：TableRowspanAndColspanFunc<T> type TableRowspanAndColspanFunc<T> = (params: BaseTableCellParams<T>) => RowspanColspan interface RowspanColspan { colspan?: number; rowspan?: number }。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    scroll: {
      description:
        '懒加载和虚拟滚动。为保证组件收益最大化，当数据量小于阈值 scroll.threshold 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动，scroll.threshold 默认为 100。TS 类型：TableScroll',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    size: {
      description: '表格尺寸。可选项：small/medium/large。TS 类型：SizeEnum。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: 'medium',
        },
      },
    },
    stripe: {
      description: '是否显示斑马纹',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    tableContentWidth: {
      description:
        '表格内容的总宽度，注意不是表格可见宽度。主要应用于 table-layout: auto 模式下的固定列显示。tableContentWidth 内容宽度的值必须大于表格可见宽度',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    tableLayout: {
      description: '表格布局方式。可选项：auto/fixed',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: 'fixed',
        },
      },
    },
    topContent: {
      description: '表格顶部内容，可以用于自定义列设置、顶部查询条件等。TS 类型：string | TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    verticalAlign: {
      description: '行内容上下方向对齐。可选项：top/middle/bottom',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: 'middle',
        },
      },
    },
    onCellClick: {
      description:
        'TS 类型：(context: BaseTableCellEventContext<T>) => void 单元格点击时触发。详细类型定义。 interface BaseTableCellEventContext<T> { row: T; col: BaseTableCol; rowIndex: number; colIndex: number; e: MouseEvent } ',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onPageChange: {
      description:
        'TS 类型：(pageInfo: PageInfo, newDataSource: Array<T>) => void 分页发生变化时触发。参数 newDataSource 表示分页后的数据。本地数据进行分页时，newDataSource 和源数据 data 会不一样。泛型 T 指表格数据类型',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onRowClick: {
      description:
        'TS 类型：(context: RowEventContext<T>) => void 行点击时触发，泛型 T 指表格数据类型。详细类型定义。 interface RowEventContext<T> { row: T; index: number; e: MouseEvent } ',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onRowDblclick: {
      description: 'TS 类型：(context: RowEventContext<T>) => void 行双击时触发，泛型 T 指表格数据类型',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onRowMousedown: {
      description: 'TS 类型：(context: RowEventContext<T>) => void 鼠标在表格行按下时触发，泛型 T 指表格数据类型',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onRowMouseenter: {
      description: 'TS 类型：(context: RowEventContext<T>) => void 鼠标在表格行进入时触发，泛型 T 指表格数据类型',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onRowMouseleave: {
      description: 'TS 类型：(context: RowEventContext<T>) => void 鼠标在表格行离开时触发，泛型 T 指表格数据类型',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onRowMouseover: {
      description: 'TS 类型：(context: RowEventContext<T>) => void 鼠标悬浮到行时触发，泛型 T 指表格数据类型',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onRowMouseup: {
      description: 'TS 类型：(context: RowEventContext<T>) => void 鼠标在表格行按下又弹起时触发，泛型 T 指表格数据类型',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onScroll: {
      description: 'TS 类型：(params: { e: WheelEvent }) => void 表格内容滚动时触发',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onScrollX: {
      description:
        'TS 类型：(params: { e: WheelEvent }) => void 已废弃。表格内容横向滚动时触发。请更为使用 onScroll 事件',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onScrollY: {
      description:
        'TS 类型：(params: { e: WheelEvent }) => void 已废弃。表格内容纵向滚动时触发。当内容超出高度(height)或最大高度(max-height)时，会出现纵向滚动条。请更为使用 onScroll 事件',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    'cell-click': {
      description:
        '单元格点击时触发。详细类型定义。 interface BaseTableCellEventContext<T> { row: T; col: BaseTableCol; rowIndex: number; colIndex: number; e: MouseEvent } ',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Events',
        type: {
          summary: '(context: BaseTableCellEventContext<T>)',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    'page-change': {
      description:
        '分页发生变化时触发。参数 newDataSource 表示分页后的数据。本地数据进行分页时，newDataSource 和源数据 data 会不一样。泛型 T 指表格数据类型',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Events',
        type: {
          summary: '(pageInfo: PageInfo, newDataSource: Array<T>)',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    'row-click': {
      description:
        '行点击时触发，泛型 T 指表格数据类型。详细类型定义。 interface RowEventContext<T> { row: T; index: number; e: MouseEvent } ',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Events',
        type: {
          summary: '(context: RowEventContext<T>)',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    'row-dblclick': {
      description: '行双击时触发，泛型 T 指表格数据类型',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Events',
        type: {
          summary: '(context: RowEventContext<T>)',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    'row-mousedown': {
      description: '鼠标在表格行按下时触发，泛型 T 指表格数据类型',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Events',
        type: {
          summary: '(context: RowEventContext<T>)',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    'row-mouseenter': {
      description: '鼠标在表格行进入时触发，泛型 T 指表格数据类型',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Events',
        type: {
          summary: '(context: RowEventContext<T>)',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    'row-mouseleave': {
      description: '鼠标在表格行离开时触发，泛型 T 指表格数据类型',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Events',
        type: {
          summary: '(context: RowEventContext<T>)',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    'row-mouseover': {
      description: '鼠标悬浮到行时触发，泛型 T 指表格数据类型',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Events',
        type: {
          summary: '(context: RowEventContext<T>)',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    'row-mouseup': {
      description: '鼠标在表格行按下又弹起时触发，泛型 T 指表格数据类型',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Events',
        type: {
          summary: '(context: RowEventContext<T>)',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    scroll: {
      description: '表格内容滚动时触发',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Events',
        type: {
          summary: '(params: { e: WheelEvent })',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    'scroll-x': {
      description: '已废弃。表格内容横向滚动时触发。请更为使用 onScroll 事件',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Events',
        type: {
          summary: '(params: { e: WheelEvent })',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    'scroll-y': {
      description:
        '已废弃。表格内容纵向滚动时触发。当内容超出高度(height)或最大高度(max-height)时，会出现纵向滚动条。请更为使用 onScroll 事件',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTable Events',
        type: {
          summary: '(params: { e: WheelEvent })',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    align: {
      description: '列横向对齐方式。可选项：left/right/center',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTableCol',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: 'left',
        },
      },
    },
    attrs: {
      description: '透传 HTML 属性到列元素',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTableCol',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    cell: {
      description:
        '自定义单元格渲染。值类型为 Function 表示以函数形式渲染单元格。值类型为 string 表示使用插槽渲染，插槽名称为 cell 的值。默认使用 colKey 作为插槽名称。优先级高于 render。泛型 T 指表格数据类型。TS 类型：string | TNode<BaseTableCellParams<T>> interface BaseTableCellParams<T> { row: T; rowIndex: number; col: BaseTableCol<T>; colIndex: number }。通用类型定义。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTableCol',
        type: {
          summary: 'String / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    children: {
      description: '用于多级表头，泛型 T 指表格数据类型。TS 类型：Array<BaseTableCol<T>>',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTableCol',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    className: {
      description:
        "列类名，值类型是 Function 使用返回值作为列类名；值类型不为 Function 时，值用于整列类名（含表头）。泛型 T 指表格数据类型。TS 类型：ClassName | ((context: CellData<T>) => ClassName) interface CellData<T> extends BaseTableCellParams<T> { type: 'th' | 'td' }。通用类型定义。详细类型定义",
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTableCol',
        type: {
          summary: 'String / Object / Array / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    colKey: {
      description: '渲染列所需字段',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTableCol',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    ellipsis: {
      description:
        '单元格和表头内容超出时，是否显示省略号。如果仅希望单元格超出省略，可设置 ellipsisTitle = false。 值为 true，则浮层默认显示单元格内容； 值类型为 Function 则自定义浮层显示内容； 值类型为 Object，则自动透传属性到 Popup 组件，可用于调整浮层方向等特性。TS 类型：boolean | TNode<BaseTableCellParams<T>> | PopupProps，Popup API Documents。通用类型定义。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTableCol',
        type: {
          summary: 'Boolean / Object / Slot / Function',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    ellipsisTitle: {
      description:
        '表头内容超出时，是否显示省略号。优先级高于 ellipsis。 值为 true，则浮层默认显示表头全部内容； 值类型为 Function 则自定义浮层显示表头内容； 值类型为 Object，则自动透传属性到 Popup 组件，可用于调整浮层方向等特性。TS 类型：boolean | TNode<BaseTableColParams<T>> | PopupProps interface BaseTableColParams<T> { col: BaseTableCol<T>; colIndex: number }。通用类型定义。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTableCol',
        type: {
          summary: 'Boolean / Object / Slot / Function',
        },
        defaultValue: {
          summary: 'undefined',
        },
      },
    },
    fixed: {
      description: '固定列显示位置。可选项：left/right',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTableCol',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: 'left',
        },
      },
    },
    foot: {
      description:
        '自定义表尾表尾。值类型为 Function 表示以函数形式渲染表尾内容。值类型为 string 表示使用插槽渲染，插槽名称为 foot 值。TS 类型：string | TNode<{ col: BaseTableCol; colIndex: number }>。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTableCol',
        type: {
          summary: 'String / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    render: {
      description:
        "自定义表头或单元格，泛型 T 指表格数据类型。TS 类型：TNode<BaseTableRenderParams<T>> interface BaseTableRenderParams<T> extends BaseTableCellParams<T> { type: RenderType } type RenderType = 'cell' | 'title'。通用类型定义。详细类型定义",
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTableCol',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    title: {
      description:
        '自定义表头渲染。值类型为 Function 表示以函数形式渲染表头。值类型为 string 表示使用插槽渲染，插槽名称为 title 的值。优先级高于 render。TS 类型：string | TNode<{ col: BaseTableCol; colIndex: number }>。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTableCol',
        type: {
          summary: 'String / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    width: {
      description:
        '列宽，可以作为最小宽度使用。当列宽总和小于 table 元素时，浏览器根据宽度设置情况自动分配宽度；当列宽总和大于 table 元素，表现为定宽。可以同时调整 table 元素的宽度来达到自己想要的效果',
      control: {
        type: 'text',
      },
      table: {
        category: 'BaseTableCol',
        type: {
          summary: 'String / Number',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    asyncLoading: {
      description:
        "异步加载状态。值为 loading 显示默认文字 “正在加载中，请稍后”，值为 loading-more 显示“点击加载更多”，值为其他，表示完全自定义异步加载区域内容。TS 类型：'loading' | 'load-more' | TNode。通用类型定义",
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    columnController: {
      description:
        '自定义显示列控制器，值为空不会显示。具体属性请看下方 TableColumnController 文档。TS 类型：TableColumnController',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    columnControllerVisible: {
      description:
        '是否显示列配置弹框控制器，只要该属性值不为 undefined，弹框的显示/隐藏完全由该属性控制。支持语法糖 v-model:columnControllerVisible',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'undefined',
        },
      },
    },
    defaultColumnControllerVisible: {
      description: '是否显示列配置弹框控制器，只要该属性值不为 undefined，弹框的显示/隐藏完全由该属性控制。非受控属性',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'undefined',
        },
      },
    },
    columns: {
      description: '列配置，泛型 T 指表格数据类型。TS 类型：Array<PrimaryTableCol<T>>',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '[]',
        },
      },
    },
    displayColumns: {
      description: '列配置功能中，当前显示的列。支持语法糖 v-model:displayColumns。TS 类型：CheckboxGroupValue',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    defaultDisplayColumns: {
      description: '列配置功能中，当前显示的列。非受控属性。TS 类型：CheckboxGroupValue',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    dragSort: {
      description:
        '拖拽排序方式，值为 row 表示行拖拽排序，这种方式无法进行文本复制，慎用。值为row-handler 表示通过专门的 拖拽手柄 进行 行拖拽排序。值为 col 表示列顺序拖拽。drag-col 已废弃，请勿使用。可选项：row/row-handler/col/drag-col',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    dragSortOptions: {
      description: '拖拽排序扩展参数，具体参数见 Sortable。TS 类型：SortableOptions',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    expandedRow: {
      description:
        '展开行内容，泛型 T 指表格数据类型。TS 类型：TNode<TableExpandedRowParams<T>> interface TableExpandedRowParams<T> { row: T; index: number; columns: PrimaryTableCol<T>[] | BaseTableCol<T>[] }。通用类型定义。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    expandedRowKeys: {
      description: '展开行。支持语法糖 v-model:expandedRowKeys。TS 类型：Array<string | number>',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '[]',
        },
      },
    },
    defaultExpandedRowKeys: {
      description: '展开行。非受控属性。TS 类型：Array<string | number>',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '[]',
        },
      },
    },
    expandIcon: {
      description:
        '用于控制是否显示「展开图标列」，值为 false 则不会显示。可以精确到某一行是否显示，还可以自定义展开图标内容。expandedRow 存在时，该参数有效。支持全局配置 GlobalConfigProvider。TS 类型：boolean | TNode<ExpandArrowRenderParams<T>> interface ExpandArrowRenderParams<T> { row: T; index: number }。通用类型定义。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Boolean / Slot / Function',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    expandOnRowClick: {
      description: '是否允许点击行展开',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    filterIcon: {
      description: '自定义过滤图标，支持全局配置 GlobalConfigProvider。TS 类型：TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    filterRow: {
      description: '自定义过滤状态行及清空筛选等。TS 类型：string | TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'String / Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    filterValue: {
      description:
        '过滤数据的值。支持语法糖 v-model:filterValue。TS 类型：FilterValue type FilterValue = { [key: string]: any }。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    defaultFilterValue: {
      description:
        '过滤数据的值。非受控属性。TS 类型：FilterValue type FilterValue = { [key: string]: any }。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    hideSortTips: {
      description: '隐藏排序文本提示，支持全局配置 GlobalConfigProvider，默认全局配置值为 false',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    multipleSort: {
      description: '是否支持多列排序',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    selectedRowKeys: {
      description: '选中的行，控制属性。支持语法糖 v-model:selectedRowKeys。TS 类型：Array<string | number>',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    defaultSelectedRowKeys: {
      description: '选中的行，控制属性。非受控属性。TS 类型：Array<string | number>',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    sort: {
      description:
        '排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序。支持语法糖 v-model:sort。TS 类型：TableSort type TableSort = SortInfo | Array<SortInfo> interface SortInfo { sortBy: string; descending: boolean }。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Object / Array',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    defaultSort: {
      description:
        '排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序。非受控属性。TS 类型：TableSort type TableSort = SortInfo | Array<SortInfo> interface SortInfo { sortBy: string; descending: boolean }。详细类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Object / Array',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    sortIcon: {
      description: '自定义排序图标，支持全局配置 GlobalConfigProvider。TS 类型：TNode。通用类型定义',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    sortOnRowDraggable: {
      description: '已废弃。允许表格行拖拽时排序。请更为使用 dragSort="row"',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    "Omit<BaseTableProps<T>, 'columns' | 'onCellClick'>": {
      description: "继承 Omit<BaseTableProps<T>, 'columns' | 'onCellClick'> 中的全部 API",
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: '-',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    onAsyncLoadingClick: {
      description: "TS 类型：(context: { status: 'loading' | 'load-more' }) => void 异步加载区域被点击时触发",
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onCellClick: {
      description:
        'TS 类型：(context: PrimaryTableCellEventContext<T>) => void 单元格点击时触发。详细类型定义。 interface PrimaryTableCellEventContext<T> { row: T; col: PrimaryTableCol; rowIndex: number; colIndex: number; e: MouseEvent } ',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onChange: {
      description:
        "TS 类型：(data: TableChangeData, context: TableChangeContext<T>) => void 分页、排序、过滤等内容变化时触发，泛型 T 指表格数据类型，currentData 表示变化后的数据。详细类型定义。 interface TableChangeData { sorter?: TableSort; filter?: FilterValue; pagination?: PaginationProps }  interface TableChangeContext<T> { trigger: TableChangeTrigger; currentData?: T[] }  type TableChangeTrigger = 'filter' | 'sorter' | 'pagination' ",
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onColumnChange: {
      description:
        "TS 类型：(context: PrimaryTableColumnChange<T>) => void 确认操作之前列配置发生变化时触发。context.columns 表示已选中的列；context.currentColumn 表示本次变化操作的列，值不存在表示全选操作；context.type 表示当前操作属于选中列或是取消列。详细类型定义。 interface PrimaryTableColumnChange<T> { columns?: CheckboxGroupValue; currentColumn?: PrimaryTableCol<T>; type?: 'check' | 'uncheck'; e?: Event } ",
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onColumnControllerVisibleChange: {
      description:
        "TS 类型：(visible: boolean, context: { trigger: 'cancel' | 'confirm' }) => void 列配置弹窗显示或隐藏变化时触发",
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onDataChange: {
      description:
        "TS 类型：(data: Array<T>, context: TableDataChangeContext) => void 本地数据排序导致 data 变化时触发，第一个参数指变化后的数据，第二个参数 context.trigger 表示触发本次变化的来源。详细类型定义。 interface TableDataChangeContext { trigger: 'sort' } ",
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onDisplayColumnsChange: {
      description:
        "TS 类型：(value: CheckboxGroupValue) => void 确认列配置时触发。详细类型定义。 import { CheckboxGroupValue } from '@Checkbox' ",
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onDragSort: {
      description:
        "TS 类型：(context: DragSortContext<T>) => void 拖拽排序时触发，currentData 表示拖拽排序结束后的新数据，sort=row 表示行拖拽事件触发，sort=col 表示列拖拽事件触发。详细类型定义。 interface DragSortContext<T> { currentIndex: number; current: T; targetIndex: number; target: T; currentData: T[]; e: SortableEvent; sort: 'row' | 'col' }  import { SortableEvent, SortableOptions } from 'sortablejs' ",
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onExpandChange: {
      description:
        'TS 类型：(expandedRowKeys: Array<string | number>, options: ExpandOptions<T>) => void 展开行发生变化时触发，泛型 T 指表格数据类型。详细类型定义。 interface ExpandOptions<T> { expandedRowData: Array<T> } ',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onFilterChange: {
      description:
        'TS 类型：(filterValue: FilterValue, context: { col?: PrimaryTableCol<T> }) => void 过滤参数发生变化时触发，泛型 T 指表格数据类型',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onSelectChange: {
      description:
        "TS 类型：(selectedRowKeys: Array<string | number>, options: SelectOptions<T>) => void 选中行发生变化时触发，泛型 T 指表格数据类型。两个参数，第一个参数为选中行 keys，第二个参数为更多参数，具体如下：type = uncheck 表示当前行操作为「取消行选中」；type = check 表示当前行操作为「行选中」； currentRowKey 表示当前操作行的 rowKey 值； currentRowData 表示当前操作行的行数据。详细类型定义。 interface SelectOptions<T> { selectedRowData: Array<T>; type: 'uncheck' | 'check'; currentRowKey?: string; currentRowData?: T } ",
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onSortChange: {
      description:
        'TS 类型：(sort: TableSort, options: SortOptions<T>) => void 排序发生变化时触发。其中 sortBy 表示当前排序的字段，sortType 表示排序的方式，currentDataSource 表示 sorter 排序后的结果，col 表示列配置。sort 值类型为数组时表示多字段排序。详细类型定义。 interface SortOptions<T> { currentDataSource?: Array<T>; col: PrimaryTableCol } ',
      control: {
        type: 'text',
      },
      table: {
        category: 'PrimaryTable Props',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    tree: {
      description:
        "树形结构相关配置。tree.indent 表示树结点缩进距离，单位：px，默认为 24px。tree.treeNodeColumnIndex 表示树结点在第几列渲染，默认为 0 ，第一列。tree.childrenKey 表示树形结构子节点字段，默认为 children。tree.checkStrictly 表示树形结构的行选中（多选），父子行选中是否独立，默认独立，值为 true。TS 类型：TableTreeConfig interface TableTreeConfig { indent?: number; treeNodeColumnIndex?: number; childrenKey?: 'children'; checkStrictly?: boolean }。详细类型定义",
      control: {
        type: 'text',
      },
      table: {
        category: 'EnhancedTable Prop',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    treeExpandAndFoldIcon: {
      description:
        "自定义树形结构展开图标，支持全局配置 GlobalConfigProvider。TS 类型：TNode<{ type: 'expand' | 'fold' }>。通用类型定义",
      control: {
        type: 'text',
      },
      table: {
        category: 'EnhancedTable Prop',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    'PrimaryTableProps<T>': {
      description: '继承 PrimaryTableProps<T> 中的全部 API',
      control: {
        type: 'text',
      },
      table: {
        category: 'EnhancedTable Prop',
        type: {
          summary: '-',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    onTreeExpandChange: {
      description:
        'TS 类型：(context: TableTreeExpandChangeContext<T>) => void 树形结构，用户操作引起节点展开或收起时触发，代码操作不会触发。详细类型定义。 interface TableTreeExpandChangeContext<T> { row: T; rowIndex: number; rowState: TableRowState<T> } ',
      control: {
        type: 'text',
      },
      table: {
        category: 'EnhancedTable Prop',
        type: {
          summary: 'Function',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    'tree-expand-change': {
      description:
        '树形结构，用户操作引起节点展开或收起时触发，代码操作不会触发。详细类型定义。 interface TableTreeExpandChangeContext<T> { row: T; rowIndex: number; rowState: TableRowState<T> } ',
      control: {
        type: 'text',
      },
      table: {
        category: 'EnhancedTable Events',
        type: {
          summary: '(context: TableTreeExpandChangeContext<T>)',
        },
        defaultValue: {
          summary: '',
        },
      },
    },

    getData: {
      description:
        '必需。树形结构中，用于获取行数据所有信息。泛型 T 表示行数据类型。详细类型定义。 type TableRowValue = string | number ',
      control: {
        type: 'text',
      },
      table: {
        category: 'EnhancedTable Prop',
        type: {
          summary: '(key: TableRowValue)',
        },
        defaultValue: {
          summary: 'TableRowState<T>',
        },
      },
    },
    remove: {
      description: '必需。树形结构中，移除指定节点',
      control: {
        type: 'text',
      },
      table: {
        category: 'EnhancedTable Prop',
        type: {
          summary: '(key: TableRowValue)',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    setData: {
      description: '必需。树形结构中，用于更新行数据。泛型 T 表示行数据类型',
      control: {
        type: 'text',
      },
      table: {
        category: 'EnhancedTable Prop',
        type: {
          summary: '(key: TableRowValue, newRowData: T)',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    toggleExpandData: {
      description: '必需。展开或收起树形行',
      control: {
        type: 'text',
      },
      table: {
        category: 'EnhancedTable Prop',
        type: {
          summary: '(p: { row: T, rowIndex: number})',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    disabled: {
      description: 'false',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableRowState',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    expandChildrenLength: {
      description: '-',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableRowState',
        type: {
          summary: 'Number',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    expanded: {
      description: 'false',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableRowState',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    level: {
      description: '-',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableRowState',
        type: {
          summary: 'Number',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    parent: {
      description: '-',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableRowState',
        type: {
          summary: '-',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    path: {
      description: '-',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableRowState',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    row: {
      description: '-',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableRowState',
        type: {
          summary: '-',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    rowIndex: {
      description: '-',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableRowState',
        type: {
          summary: 'Number',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    component: {
      description: '-',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableColumnFilter',
        type: {
          summary: 'Slot / Function',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    list: {
      description: '-',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableColumnFilter',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    props: {
      description: '-',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableColumnFilter',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    resetValue: {
      description: '-',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableColumnFilter',
        type: {
          summary: '-',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    showConfirmAndReset: {
      description: 'false',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableColumnFilter',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    type: {
      description: '-',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableColumnFilter',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },

    bufferSize: {
      description: '20',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableScroll',
        type: {
          summary: 'Number',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    isFixedRowHeight: {
      description: 'false',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableScroll',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    rowHeight: {
      description: '-',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableScroll',
        type: {
          summary: 'Number',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    threshold: {
      description: '100',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableScroll',
        type: {
          summary: 'Number',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    buttonProps: {
      description: '-',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableColumnController',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    checkboxProps: {
      description: '-',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableColumnController',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    dialogProps: {
      description: '-',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableColumnController',
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    displayType: {
      description: 'auto-width',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableColumnController',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    fields: {
      description: '-',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableColumnController',
        type: {
          summary: 'Array',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    hideTriggerButton: {
      description: 'false',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableColumnController',
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    placement: {
      description: 'top-right',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableColumnController',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    baseValue: {
      description: '作为色阶基准值，大于baseValue使用leftColor, 小于baseValue使用rightColor',
      control: {
        type: 'number',
      },
      table: {
        category: 'TableColumnController',
        type: {
          summary: 'Number',
        },
        defaultValue: {
          summary: '0',
        },
      },
    },
    leftColor: {
      description: '色阶表格小于基准值的色系',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableColumnController',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: '#DC143C',
        },
      },
    },
    rightColor: {
      description: '色阶表格大于基准值的色系',
      control: {
        type: 'text',
      },
      table: {
        category: 'TableColumnController',
        type: {
          summary: 'String',
        },
        defaultValue: {
          summary: '#3CB371',
        },
      },
    },
  },
};
const Template = (args) => ({
  components: {
    TTable,
  },
  template: `
  <div style="width: 1200px">
    <t-table
      row-key="index"
      :data="data"
      height="200"
      :columns="columns"
      @sort-change="sortChange"
      bordered
    />
  </div>

`,
  setup() {
    const data = [];
    const sort = ref({
      sortBy: 'status',
      descending: true,
    });
    for (let i = 0; i < 20; i += 1) {
      data.push({
        index: i,
        platform: i % 2 === 0 ? '共有' : '私有',
        type: ['String', 'Number', 'Array', 'Object'][i % 4],
        default: ['-', '0', '[]', '{}'][i % 4],
        detail: {
          postion: `读取 ${i} 个数据的嵌套信息值`,
        },
        needed: i % 4 === 0 ? '是' : '否',
        description: '数据源',
      });
    }

    const sortChange = (val) => {
      sort.value = val;
    };

    const columns = [
      {
        align: 'left',
        width: '250',
        className: 'row',
        colKey: 'index',
        title: '序号',
      },
      {
        width: 250,
        align: 'left',
        colKey: 'platform',
        title: '平台',
        sorter: true,
        className: 'center2'
      },
      {
        width: 250,
        align: 'left',
        colKey: 'type',
        title: '类型',
        sorter: true,
        className: 'center3'
      },
      {
        width: 250,
        align: 'right',
        colKey: 'default',
        title: '默认值',
        sorter: true,
        className: 'center4'
      },
      {
        width: 250,
        colKey: 'needed',
        title: '是否必传',
        sorter: true,
        className: 'center5'
      },
      {
        width: 250,
        colKey: 'detail.postion',
        title: '详情信息',
        ellipsis: true,
        sorter: true,
        className: 'center6'
      },
    ];

    const state = reactive({
      ...args,
    });

    return {
      ...toRefs(state),
      data,
      columns,
    };
  },
});

export const Base = Template.bind({});
Base.args = {};
Base.storyName = '单极表头';

const PrimaryTemplate = (args) => ({
  components: {
    TTable,
  },
  template: `
  <t-table row-key="index" :data="data" :columns="columns" height="200" bordered>
  </t-table>
`,
  setup() {
    const data = [
      {
        "对比项": "所有用户",
        "微信_确定验证的总人数": 2995,
        "手Q_确定验证的总人数": 2958,
        "日期": "2022-08-10"
      },
      {
        "对比项": "所有用户",
        "微信_确定验证的总人数": 3503,
        "手Q_确定验证的总人数": 2938,
        "日期": "2022-08-11"
      },
      {
        "对比项": "所有用户",
        "微信_确定验证的总人数": 3113,
        "手Q_确定验证的总人数": 2943,
        "日期": "2022-08-12"
      },
      {
        "对比项": "所有用户",
        "微信_确定验证的总人数": 8762,
        "手Q_确定验证的总人数": 2877,
        "日期": "2022-08-13"
      },
      {
        "对比项": "所有用户",
        "微信_确定验证的总人数": 5454,
        "手Q_确定验证的总人数": 2841,
        "日期": "2022-08-14"
      },
      {
        "对比项": "所有用户",
        "微信_确定验证的总人数": 4632,
        "手Q_确定验证的总人数": 2929,
        "日期": "2022-08-15"
      },
      {
        "对比项": "所有用户",
        "微信_确定验证的总人数": 3415,
        "手Q_确定验证的总人数": 2819,
        "日期": "2022-08-16"
      }
    ];

    const columns = [
      {
        "title": "日期",
        "colKey": "日期"
      },
      {
        "title": "对比项",
        "colKey": "对比项",
        "hideCompare": true
      },
      {
        "title": "微信",
        "children": [
          {
            "title": "确定验证的总人数",
            "colKey": "微信_确定验证的总人数",
            "align": "right",
            "format": {
              "show_type": "decimal",
              "precision": 0,
              "unit": ""
            }
          }
        ],
        "key": "微信"
      },
      {
        "title": "手Q",
        "children": [
          {
            "title": "确定验证的总人数",
            "colKey": "手Q_确定验证的总人数",
            "align": "right",
            "format": {
              "show_type": "decimal",
              "precision": 0,
              "unit": ""
            }
          }
        ],
        "key": "手Q"
      }
    ];

    const state = reactive({
      ...args,
    });

    return {
      ...toRefs(state),
      data,
      columns,
    };
  },
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {};
Primary.storyName = '多级表头';

const ListTemplate = (args) => ({
  components: {
    TTable,
  },
  template: `
  <t-table
        row-key="index"
        :data="data"
        height="200"
        :columns="columns"
        size="large"
        @sort-change="sortChange"
        bordered
      />
`,
  setup() {
    const data = [];
    const sort = ref({
      sortBy: 'status',
      descending: true,
    });
    for (let i = 0; i < 20; i += 1) {
      data.push({
        index: i,
        platform: i % 2 === 0 ? '共有' : '私有',
        type: ['String', 'Number', 'Array', 'Object'][i % 4],
        default: ['-', '0', '[]', '{}'][i % 4],
        detail: {
          postion: `读取 ${i} 个数据的嵌套信息值`,
        },
        needed: i % 4 === 0 ? '是' : '否',
        description: '数据源',
      });
    }

    const sortChange = (val) => {
      sort.value = val;
    };

    const columns = [
      {
        align: 'left',
        width: '250',
        className: 'row',
        colKey: 'index',
        title: '序号',
      },
      {
        width: 250,
        align: 'left',
        colKey: 'platform',
        title: '平台',
        sorter: true,
        className: 'center2'
      },
      {
        width: 250,
        align: 'left',
        colKey: 'type',
        title: '类型',
        sorter: true,
        className: 'center3'
      },
      {
        width: 250,
        align: 'right',
        colKey: 'default',
        title: '默认值',
        sorter: true,
        className: 'center4'
      },
      {
        width: 250,
        colKey: 'needed',
        title: '是否必传',
        sorter: true,
        className: 'center5'
      },
      {
        width: 250,
        colKey: 'detail.postion',
        title: '详情信息',
        ellipsis: true,
        sorter: true,
        className: 'center6'
      },
    ];

    const state = reactive({
      ...args,
    });

    return {
      ...toRefs(state),
      data,
      columns,
    };
  },
});

export const List = ListTemplate.bind({});
List.args = {};
List.storyName = '无斑马纹列表';

const SListTemplate = (args) => ({
  components: {
    TTable,
  },
  template: `
  <t-table
        row-key="index"
        :data="data"
        height="200"
        :columns="columns"
        size="large"
        @sort-change="sortChange"
        bordered
        stripe
      />
`,
  setup() {
    const data = [];
    const sort = ref({
      sortBy: 'status',
      descending: true,
    });
    for (let i = 0; i <= 20; i += 1) {
      data.push({
        index: i,
        platform: i % 2 === 0 ? '共有' : '私有',
        type: ['String', 'Number', 'Array', 'Object'][i % 4],
        default: ['-', '0', '[]', '{}'][i % 4],
        detail: {
          postion: `读取 ${i} 个数据的嵌套信息值`,
        },
        needed: i % 4 === 0 ? '是' : '否',
        description: '数据源',
      });
    }

    const sortChange = (val) => {
      sort.value = val;
    };

    const columns = [
      {
        align: 'left',
        width: '250',
        className: 'row',
        colKey: 'index',
        title: '序号',
      },
      {
        width: 250,
        align: 'left',
        colKey: 'platform',
        title: '平台',
        sorter: true,
        className: 'center2'
      },
      {
        width: 250,
        align: 'left',
        colKey: 'type',
        title: '类型',
        sorter: true,
        className: 'center3'
      },
      {
        width: 250,
        align: 'right',
        colKey: 'default',
        title: '默认值',
        sorter: true,
        className: 'center4'
      },
      {
        width: 250,
        colKey: 'needed',
        title: '是否必传',
        sorter: true,
        className: 'center5'
      },
      {
        width: 250,
        colKey: 'detail.postion',
        title: '详情信息',
        ellipsis: true,
        sorter: true,
        className: 'center6'
      },
    ];

    const state = reactive({
      ...args,
    });

    return {
      ...toRefs(state),
      data,
      columns,
    };
  },
});

export const SList = SListTemplate.bind({});
SList.args = {};
SList.storyName = '斑马纹列表';

// const EnhancedTemplate = (args) => ({
//   components: {
//     TEnhancedTable,
//   },
//   template: `
//   <t-enhancedTable row-key="key" :tree="{ childrenKey: 'list', checkStrictly: false }" :data="data" :columns="columns" stripe />
// `,
//   setup() {
//     const data = [];
//     for (let i = 0; i < 5; i += 1) {
//       const obj = {
//         key: `我是 ${i} 号`,
//         platform: i % 2 === 0 ? '共有' : '私有',
//         type: ['String', 'Number', 'Array', 'Object'][i % 4],
//         default: ['-', '0', '[]', '{}'][i % 4],
//         detail: {
//           postion: `读取 ${i} 个数据的嵌套信息值`,
//         },
//         needed: i % 4 === 0 ? '是' : '否',
//         description: '数据源',
//       };
//       obj.list = new Array(10).fill(null).map((t, j) => {
//         const secondIndex = 100 * j + (i + 1) * 10;
//         const secondObj = {
//           ...obj,
//           key: `我是 ${secondIndex} 号`,
//         };
//         secondObj.list = new Array(30).fill(null).map((m, n) => ({
//           ...obj,
//           key: `我是 ${secondIndex * 1000 + 100 * m + (n + 1) * 10} 号`,
//         }));
//         return secondObj;
//       });
//       data.push(obj);
//     }

//     const columns = [
//       {
//         width: '200',
//         className: 'row',
//         colKey: 'key',
//         title: '编号',
//       },
//       {
//         width: 200,
//         colKey: 'platform',
//         title: '平台',
//       },
//       {
//         colKey: 'type',
//         title: '类型',
//       },
//       {
//         colKey: 'default',
//         title: '默认值',
//       },
//       {
//         colKey: 'needed',
//         title: '是否必传',
//       },
//     ];

//     const state = reactive({
//       ...args,
//     });

//     return {
//       ...toRefs(state),
//       data,
//       columns,
//     };
//   },
// });

// export const Enhanced = EnhancedTemplate.bind({});
// Enhanced.args = {};

const GradationTemplate = (args) => ({
  components: {
    TGradationTable,
    TTooltip,
  },
  template: `
  <div class="aw-mt-2"><strong>col.cell = "gradation"</strong>默认使用色阶</div>
  <div>使用<strong>baseVal</strong>控制颜色类型</div>
  <div>大于<strong>baseVal</strong>使用<strong>leftColor</strong>色系</div>
  <div class="aw-mb-2">小于<strong>baseVal</strong>使用<strong>rightColor</strong>色系，颜色越深，表示与<strong>baseVal</strong>差值越大</div>
  <t-gradationTable
    v-bind="args"
    row-key="index"
    :data="data"
    :columns="columns"
    :baseValue="50"
    leftColor="#DC143C"
    rightColor="#3CB371"
    height="100%"
    bordered
    stripe
  >
    <template #gradation="{ col, row }">
      <t-tooltip :content="'customized tooltip:' + row[col.colKey]">
      {{ row[col.colKey] }}
      </t-tooltip>
    </template>
  </t-gradationTable>
`,
  setup() {
    const data = [
      {
        label: 'label 1',
        CTR: 11,
        CVR: 22,
        CPA: 33,
        ROI: 44,
      },
      {
        label: 'label 2',
        CTR: 55,
        CVR: 66,
        CPA: 77,
        ROI: 88,
      },
      {
        label: 'label 3',
        CTR: 99,
        CVR: 88,
        CPA: 77,
        ROI: 66,
      },
      {
        label: 'label 4',
        CTR: 11,
        CVR: 22,
        CPA: 33,
        ROI: 44,
      },
      {
        label: 'label 5',
        CTR: 55,
        CVR: 66,
        CPA: 77,
        ROI: 88,
      },
      {
        label: 'label 6',
        CTR: 99,
        CVR: 88,
        CPA: 77,
        ROI: 66,
      },
    ];

    const columns = [
      {
        colKey: 'label',
        title: '标签',
      },
      {
        colKey: 'CTR',
        title: 'CTR',
        cell: 'gradation',
      },
      {
        colKey: 'CVR',
        title: 'CVR',
        cell: 'gradation',
      },
      {
        colKey: 'CPA',
        title: 'CPA',
        cell: 'gradation',
      },
      {
        colKey: 'ROI',
        title: 'ROI',
        cell: 'gradation',
      },
    ];

    const state = reactive({
      ...args,
    });

    return {
      ...toRefs(state),
      data,
      columns,
    };
  },
});

export const Gradation = GradationTemplate.bind({});
Gradation.args = {};
Gradation.storyName = '热力图表格';
