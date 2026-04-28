import dayjs from 'dayjs';
import { onMounted, reactive, watch, ref, onBeforeMount } from 'vue';
// import jsonData from './data-grid.data.json';
import { Input as TInput } from '../src/components/input/index';
import { DataGrid as TDataGrid, DataGridUtils, DataGridLocale, LicenseManager } from '../src';

const DATA_GRID_KEY =
  'Using_this_AG_Grid_Enterprise_key_( AG-047933 )_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_( legal@ag-grid.com )___For_help_with_changing_this_key_please_contact_( info@ag-grid.com )___( Tencent Technology(Shenzhen) Company Limited )_is_granted_a_( Single Application )_Developer_License_for_the_application_( deltaverse )_only_for_( 1 )_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_( deltaverse )_need_to_be_licensed___( deltaverse )_has_been_granted_a_Deployment_License_Add-on_for_( 3 )_Production_Environments___This_key_works_with_AG_Grid_Enterprise_versions_released_before_( 18 September 2024 )____[v2]_MTcyNjYxNDAwMDAwMA==7d2a3e4257f3f51f6ee2f1b8abdc636b';

LicenseManager.setLicenseKey(DATA_GRID_KEY);

const columnDefs = [
  { headerName: 'Athlete', field: 'athlete', sortable: true, filter: 'agMultiColumnFilter' },
  { headerName: 'Age', field: 'age', sortable: true, filter: 'agNumberColumnFilter' },
  { headerName: 'Date', field: 'date', filter: 'agDateColumnFilter' },
  { headerName: 'Sport', field: 'sport', filter: 'agTextColumnFilter' },
  { headerName: 'Gold', field: 'gold' },
  {
    headerName: 'Silver',
    field: 'silver',
    filter: 'agMultiColumnFilter',
    filterParams: {
      filters: [
        {
          filter: 'agTextColumnFilter',
          filterParams: { defaultOption: 'startsWith' },
        },
        { filter: 'agSetColumnFilter' },
        { filter: 'agDateColumnFilter' },
      ],
    },
  },
  { headerName: 'Bronze', field: 'bronze' },
  { headerName: 'Total', field: 'total' },
];

export default {
  title: '数据展示/DataGrid 数据网格',
  components: TDataGrid,
  argTypes: {
    rowData: {
      description: '展示数据',
      control: 'input',
      table: {
        category: 'Required',
        type: { summary: 'Array<{[key: string]: any}>' },
        defaultValue: { summary: '[]' },
      },
    },
    columnDefs: {
      description:
        '表格的列定义 [colDef.d.ts](https://unpkg.com/browse/ag-grid-community@30.0.5/dist/lib/entities/colDef.d.ts)',
      table: {
        category: 'Required',
        type: {
          summary: '<Array<ColDef>',
        },
        defaultValue: { summary: '[]' },
      },
    },
    'columnDefs.headerName': {
      description: '列名称',
      table: {
        category: 'Required',
        type: { summary: 'string' },
      },
    },
    'columnDefs.field': {
      description: '列标识',
      table: {
        category: 'Required',
        type: { summary: 'string' },
      },
    },
    'columnDefs.sortable': {
      description: '是否允许排序',
      table: {
        category: 'Required',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    'columnDefs.filter': {
      description: '是否允许过滤 [Filter 文档](https://ag-grid.com/vue-data-grid/filtering-overview/)',
      table: {
        category: 'Required',
        type: {
          summary: [
            'boolean',
            'agTextColumnFilter',
            'agNumberColumnFilter',
            'agDateColumnFilter',
            'agSetColumnFilter',
            'agMultiColumnFilter',
          ],
        },
        defaultValue: { summary: 'false' },
      },
    },
    'columnDefs.resizable': {
      description: '是否允许调整列宽',
      table: {
        category: 'Required',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    localeText: {
      description:
        '国际化（可以通过 [映射表](https://ag-grid.com/examples/localisation/localisation/locale.en.js) 自定义其他语言环境）',
      control: 'input',
      table: {
        category: 'Props',
        type: {
          summary:
            'DataGridLocale.AG_GRID_LOCALE_EN(英文)，DataGridLocale.AG_GRID_LOCALE_ZH(中文)，DataGridLocale.AG_GRID_LOCALE_KO(韩文)',
        },
        defaultValue: { summary: 'DataGridLocale.AG_GRID_LOCALE_EN' },
      },
    },
    width: {
      description: '表格宽度，传入数字则会自动拼接px，传入字符串直接使用',
      control: 'input',
      table: {
        category: 'Props',
        type: { summary: 'number | string' },
        defaultValue: { summary: 800 },
      },
    },
    height: {
      description: '表格高度，传入数字则会自动拼接px，传入字符串直接使用',
      control: 'input',
      table: {
        category: 'Props',
        type: { summary: 'number | string' },
        defaultValue: { summary: 500 },
      },
    },
    domLayout: {
      description: '表格的布局方式',
      control: 'input',
      table: {
        category: 'Props',
        type: { summary: 'autoHeight | normal | print' },
        defaultValue: { summary: 'normal' },
      },
    },
    othersProps: {
      description: '其余属性都参考 [ag-grid文档](https://ag-grid.com/javascript-data-grid/getting-started/)',
      table: {
        category: 'Others',
      },
    },
    'deltaConfig.multiCopy': {
      description: '开启复制功能。具备单元格复制、行复制、列复制、全部复制',
      table: {
        category: 'deltaConfig',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    'deltaConfig.suppressRowHeader': {
      description: '关闭行表头。默认开启，关闭后则无表头序号功能',
      table: {
        category: 'deltaConfig',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'deltaConfig.chart': {
      description: '图表相关参数',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `
            IDataGridChart {
              columnDefs: Array<IDataGridChartColumnDefs>;
              width?: number;
              height?: number;
              suppressNavigate?: boolean;
              palette?: Partial<AgChartThemePalette>;
            }
          `,
        },
        defaultValue: { summary: '{}' },
      },
    },
    'deltaConfig.chart.columnDefs': {
      description: '此参数是开启图表的必要参数，如果该数组为空，则无法开启表头图表展示',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `Array<IDataGridChartColumnDefs>;`,
        },
        defaultValue: {
          summary: `
          [
            {
              field: 'fieldID'
            }
          ]
        `,
        },
      },
    },
    'deltaConfig.chart.columnDefs[n].field': {
      description: '该参数必要参数，参数值需要与columnDefs.field一致',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `string`,
        },
        defaultValue: {
          summary: 'fieldID',
        },
      },
    },
    'deltaConfig.chart.columnDefs[n].type': {
      description: '图表类型',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `bar ｜ column ｜ area`,
        },
        defaultValue: {
          summary:
            '根据表格该列的第一行数据类型进行推断，bar: [string | boolean], column: [number], area: [date] 对象类型则不渲染',
        },
      },
    },
    'deltaConfig.chart.columnDefs[n].data': {
      description:
        '图表自定义数据，需要与``deltaConfig.chart.columnDefs[n].series``一起使用，否则无效，具体用法参考[文档](https://www.ag-grid.com/vue-charts/bar-series/)',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `[]`,
        },
        defaultValue: {
          summary: '该列的所有数据',
        },
      },
    },
    'deltaConfig.chart.columnDefs[n].series': {
      description:
        '图表自定义series，需要与``deltaConfig.chart.columnDefs[n].data``一起使用，否则无效，具体用法参考[文档](https://www.ag-grid.com/vue-charts/bar-series/)',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `[]`,
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    'deltaConfig.chart.columnDefs[n].width': {
      description: '自定义图表宽度，只对此列生效',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `number`,
        },
        defaultValue: {
          summary: '100%',
        },
      },
    },
    'deltaConfig.chart.columnDefs[n].height': {
      description: '自定义图表高度，只对此列生效',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `number`,
        },
        defaultValue: {
          summary: '50',
        },
      },
    },
    'deltaConfig.chart.columnDefs[n].suppressNavigate': {
      description: '导航条是否关闭，默认开启，只对此列生效',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `boolean`,
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    'deltaConfig.chart.columnDefs[n].palette.fills': {
      description: '图表数据的填充颜色，只对此列生效',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `Array<string>`,
        },
        defaultValue: {
          summary: '[]',
        },
      },
    },
    'deltaConfig.chart.columnDefs[n].palette.strokes': {
      description: '图表数据的描线，只对此列生效',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `Array<string>`,
        },
        defaultValue: {
          summary: '[]',
        },
      },
    },
    'deltaConfig.chart.columnDefs[n].max': {
      description: '为了保证渲染性能，图表数据最大渲染数据，如果超过该数据，则显示默认图表，只对此列生效',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `number`,
        },
        defaultValue: {
          summary: '1000',
        },
      },
    },
    'deltaConfig.chart.width': {
      description: '自定义图表宽度，对所有图表生效',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `number`,
        },
        defaultValue: {
          summary: '100%',
        },
      },
    },
    'deltaConfig.chart.height': {
      description: '自定义图表高度，对所有图表生效',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `number`,
        },
        defaultValue: {
          summary: '50',
        },
      },
    },
    'deltaConfig.chart.suppressNavigate': {
      description: '导航条是否关闭，默认开启，对所有图表生效',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `boolean`,
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    'deltaConfig.chart.palette.fills': {
      description: '图表数据的填充颜色，对所有图表生效',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `Array<string>`,
        },
        defaultValue: {
          summary: '[]',
        },
      },
    },
    'deltaConfig.chart.palette.strokes': {
      description: '图表数据的描线，对所有图表生效',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `Array<string>`,
        },
        defaultValue: {
          summary: [],
        },
      },
    },
    'deltaConfig.chart.max': {
      description: '为了保证渲染性能，图表数据最大渲染数据，如果超过该数据，则显示默认图表，对所有图表生效',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `number`,
        },
        defaultValue: {
          summary: '1000',
        },
      },
    },
    'deltaConfig.paging.verticalDistance': {
      description: '垂直触底行数，即剩余数据少于该数值，则会触发触底事件',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `number`,
        },
        defaultValue: {
          summary: '10',
        },
      },
    },
    'deltaConfig.paging.pageSize': {
      description:
        '每页请求数量，便于计算，只有`paging.pageSize * paging.pageIndex < paging.count`才会触发触底加载事件',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `number`,
        },
        defaultValue: {
          summary: '1000',
        },
      },
    },
    'deltaConfig.paging.pageIndex': {
      description: '当前页码，便于计算，只有`paging.pageSize * paging.pageIndex < paging.count`才会触发触底加载事件',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `number`,
        },
        defaultValue: {
          summary: '1000',
        },
      },
    },
    'deltaConfig.paging.count': {
      description: '数据总量，便于计算，只有`paging.pageSize * paging.pageIndex < paging.count`才会触发触底加载事件',
      table: {
        category: 'deltaConfig',
        type: {
          summary: `number`,
        },
        defaultValue: {
          summary: '1000',
        },
      },
    },
    'DataGridUtils.tdgSearchData': {
      description: '全局搜索功能',
      table: {
        category: 'INTERNAL-DataGridUtils',
        type: { summary: '(agGrid: GridReadyEvent, value: string) => void' },
      },
    },
    'DataGridUtils.ROW_HEADER_FIELD_NAME': {
      description: '行表头内置名称',
      table: {
        category: 'INTERNAL-DataGridUtils',
        type: { summary: '$rowHeader' },
      },
    },
    'DataGridLocale.AG_GRID_LOCALE_ZH': {
      description: '中文包，配合``localeText``属性一起使用',
      table: {
        category: 'INTERNAL-DataGridLocale',
        type: { summary: '{[key: string]: string}' },
      },
    },
    'DataGridLocale.AG_GRID_LOCALE_EN': {
      description: '英文包，配合``localeText``属性一起使用',
      table: {
        category: 'INTERNAL-DataGridLocale',
        type: { summary: '{[key: string]: string}' },
      },
    },
    'DataGridLocale.AG_GRID_LOCALE_KO': {
      description: '韩文包，配合``localeText``属性一起使用',
      table: {
        category: 'INTERNAL-DataGridLocale',
        type: { summary: '{[key: string]: string}' },
      },
    },
    horizontalVirtualColumnsChanged: {
      description:
        '横向虚拟列的变化事件，该事件在滚动结束以后才触发，如果要监听实时变化，请使用`onVirtualColumnsChanged = (event: VirtualColumnsChangedEvent<TData>) => void`',
      table: {
        category: 'EVENT',
        type: {
          summary:
            'horizontalVirtualColumnsChanged = (context: {columns: Array<Columns>, columnsKey: Array<string>}) => void',
        },
      },
    },
    verticalVirtualColumnsChanged: {
      description: '纵向虚拟行的变化事件，该事件在滚动结束以后才触发',
      table: {
        category: 'EVENT',
        type: {
          summary:
            'verticalVirtualColumnsChanged = (context: {rows: Array<Rows>, lastIndex: number, firstIndex: number}) => void',
        },
      },
    },
    bottomScroll: {
      description:
        '触底事件（目前只开启了纵向触底，横向触底尚未开启），需要配合`deltaConfig.paging`属性一起使用，否则可能没办法触发',
      table: {
        category: 'EVENT',
        type: {
          summary:
            'bottomScroll = (context: { direction: "horizontal" | "vertical", pageIndex: number, pageSize: number, count: number }, event: BodyScrollEvent) => void',
        },
      },
    },
  },
};
const delay = (ms) => {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
};
/**
 * 1、排序(搞定)
 * 2、复制（行复制、列复制）
 * 3、列隐藏与显示(搞定)
 * 4、数据搜索(搞定)
 * 5、大表格渲染（2000*300）（自动开启）
 * 6、表头固定（搞定）
 * 7、值筛选(搞定)
 */
const BaseTemplate = () => ({
  components: { TDataGrid },
  template: `
    <t-data-grid
      rowSelection="single"
      :loading="loading"
      :columnDefs="columnDefs"
      :rowData="fetchRowData"
      :deltaConfig="deltaConfig"
      :getContextMenuItems="getContextMenuItems"
      @bottomScroll="handleBottomScroll"
    >
    </t-data-grid>
  `,
  setup() {
    const fetchRowData = ref([]);
    const loading = ref(false);

    onMounted(async () => {
      loading.value = true;
      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then(async (response) => {
          await delay(2000);
          console.log('????');
          return response.json();
        })
        .then((data) => {
          fetchRowData.value = data;
          loading.value = false;
        });
    });

    const getContextMenuItems = (params) => {
      return [
        {
          name: `Alert ${params.value}`,
          action: () => alert(`Alerting about ${params.value}`),
        },
        'separator',
      ];
    };

    const handleBottomScroll = (context) => {
      console.log('context', context);
    };

    return {
      loading,
      columnDefs,
      fetchRowData,
      deltaConfig: {
        multiCopy: true,
        chart: {
          columnDefs: [
            {
              field: 'age',
            },
            {
              field: 'athlete',
            },
          ],
        },
      },
      handleBottomScroll,
      getContextMenuItems,
    };
  },
});
export const base = BaseTemplate.bind();
base.storyName = '整体功能';
base.args = {
  columnDefs,
};

/**
 * 数据搜索
 */
const SearchTemplate = () => ({
  components: { TDataGrid, TInput },
  template: `
    <t-input style="margin-bottom: 12px" size="small" v-model="search" @input="searchInput" placeholder="请输入搜索关键字" />
    <t-data-grid
      rowSelection="single"
      :columnDefs="columnDefs"
      :rowData="fetchRowData?.value"
      :deltaConfig="deltaConfig"
      @gridReady="gridReady"
    >
    </t-data-grid>
  `,
  setup() {
    const fetchRowData = reactive({
      value: [],
    });
    let gridApi = null;
    const search = ref('');

    onMounted(async () => {
      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((response) => response.json())
        .then((data) => {
          fetchRowData.value = data;
        });
    });

    const gridReady = (params) => {
      gridApi = params;
    };

    const searchInput = (event) => {
      const { value } = event.target;
      search.value = value;
      DataGridUtils.tdgSearchData(gridApi, value);
    };

    return {
      search,
      gridReady,
      columnDefs,
      searchInput,
      fetchRowData,
      deltaConfig: {
        multiCopy: true,
        suppressRowHeader: true,
      },
    };
  },
});
export const search = SearchTemplate.bind({});
search.storyName = '数据搜索';
search.args = {
  columnDefs,
  rowData: [],
};
/**
 * 图表Chart
 */
const ChartTemplate = () => ({
  components: { TDataGrid, TInput },
  template: `
    <t-data-grid
      :columnDefs="columnDefs"
      :popupParent="popupParent"
      :rowData="fetchRowData?.value"
      :deltaConfig="deltaConfig"
    >
    </t-data-grid>
  `,
  setup() {
    const fetchRowData = reactive({
      value: [],
    });
    const ChartColumnDefs = ref();
    const deltaConfig = reactive({
      multiCopy: true,
      suppressRowHeader: true,
      chart: {},
    });
    const popupParent = ref(null);
    onBeforeMount(() => {
      popupParent.value = document.body;
    });

    const randomString = (e) => {
      const ca = e || 32;
      const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      const a = t.length;
      let n = '';
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < ca; i++) n += t.charAt(Math.floor(Math.random() * a));
      return n;
    };
    const getRandomNum = (Min, Max) => {
      const Range = Max - Min;
      const Rand = Math.random();
      return Min + Math.round(Rand * Range);
    };
    const consoleRandomDate = () => {
      const maxData = new Date().getTime();
      const minDate = new Date(1970, 0, 1, 8).getTime();
      const randomDate = getRandomNum(minDate, maxData);
      const formatDate = dayjs(randomDate).format('YYYY-MM-DD');
      return formatDate;
    };
    const generateData = (list) => {
      const randomIndex = getRandomNum(0, list.length - 1);
      return list[randomIndex];
    };

    onMounted(async () => {
      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((response) => response.json())
        .then(() => {
          const cacheAthlete = [`${randomString(10)}.`, randomString(10), null, randomString(10), randomString(10)];
          const cacheData = [
            consoleRandomDate(),
            `${consoleRandomDate()}.`,
            consoleRandomDate(),
            consoleRandomDate(),
            consoleRandomDate(),
            consoleRandomDate(),
          ];
          const cache = Array(10000)
            .fill(0)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .map((_) => ({
              athlete: generateData(cacheAthlete),
              age: parseFloat(`${getRandomNum(1, 3)}.${getRandomNum(1, 4)}`),
              date: generateData(cacheData),
              obj: {
                a: 'a',
                b: 'b',
              },
            }));
          fetchRowData.value = cache;
          ChartColumnDefs.value = [
            {
              headerName: 'Athlete',
              field: 'athlete',
            },
            {
              headerName: 'Age',
              field: 'age',
              filter: 'agNumberColumnFilter',
            },
            {
              headerName: 'Date',
              field: 'date',
            },
          ];
          // fetchRowData.value = jsonData.rowData;
          // ChartColumnDefs.value = jsonData.columnDefs.map((item) => ({
          //   ...item,
          //   headerName: item.name,
          //   field: item.name,
          // }));

          deltaConfig.chart = {
            columnDefs: ChartColumnDefs.value.map((item) => ({ field: item.field })),
          };
        });
    });

    return {
      fetchRowData,
      popupParent,
      columnDefs: ChartColumnDefs,
      deltaConfig,
    };
  },
});
export const chart = ChartTemplate.bind({});
chart.storyName = '图表';

/**
 * 图表Chart
 */
const Chart2Template = () => ({
  components: { TDataGrid, TInput },
  template: `
    <t-data-grid
      :columnDefs="columnDefs"
      :popupParent="popupParent"
      :rowData="fetchRowData?.value"
      :deltaConfig="deltaConfig"
    >
    </t-data-grid>
  `,
  setup() {
    const fetchRowData = reactive({
      value: [],
    });
    const ChartColumnDefs = ref();
    const deltaConfig = reactive({
      multiCopy: true,
      suppressRowHeader: true,
      chart: {},
    });
    const popupParent = ref(null);
    onBeforeMount(() => {
      popupParent.value = document.body;
    });

    const randomString = (e) => {
      const ca = e || 32;
      const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      const a = t.length;
      let n = '';
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < ca; i++) n += t.charAt(Math.floor(Math.random() * a));
      return n;
    };
    const getRandomNum = (Min, Max) => {
      const Range = Max - Min;
      const Rand = Math.random();
      return Min + Math.round(Rand * Range);
    };
    const consoleRandomDate = () => {
      const maxData = new Date().getTime();
      const minDate = new Date(1970, 0, 1, 8).getTime();
      const randomDate = getRandomNum(minDate, maxData);
      const formatDate = dayjs(randomDate).format('YYYY-MM-DD');
      return formatDate;
    };
    const generateData = (list) => {
      const randomIndex = getRandomNum(0, list.length - 1);
      console.log('list[randomIndex]', list[randomIndex]);
      return list[randomIndex];
    };

    onMounted(async () => {
      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((response) => response.json())
        .then(() => {
          const cacheAthlete = [
            `${randomString(10)}.`,
            randomString(10),
            randomString(10),
            randomString(10),
            randomString(10),
          ];
          const cacheData = [
            consoleRandomDate(),
            consoleRandomDate(),
            consoleRandomDate(),
            consoleRandomDate(),
            consoleRandomDate(),
            consoleRandomDate(),
          ];
          const cache = Array(10000)
            .fill(0)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .map((_) => ({
              athlete: generateData(cacheAthlete),
              age: getRandomNum(1, 10),
              date: generateData(cacheData),
              obj: {
                a: 'a',
                b: 'b',
              },
            }));
          fetchRowData.value = cache;
          ChartColumnDefs.value = [
            {
              headerName: 'Athlete',
              field: 'athlete',
            },
            {
              headerName: 'Age',
              field: 'age',
              filter: 'agNumberColumnFilter',
            },
            {
              headerName: 'Date',
              field: 'date',
            },
          ];
          deltaConfig.chart = {
            columnDefs: [{ field: 'athlete' }, { field: 'age' }, { field: 'date', suppressNavigate: false }],
          };
        });
    });

    return {
      fetchRowData,
      popupParent,
      columnDefs: ChartColumnDefs,
      deltaConfig,
    };
  },
});
// export const chart2 = Chart2Template.bind({});
// chart2.storyName = '图表2';

/**
 * Edit
 * 开发调试作用，注释即可，无需删除
 */
const EditTemplate = () => ({
  components: { TDataGrid, TInput },
  template: `
    <t-data-grid
      width="1200px"
      height="300px"
      :localeText="DataGridLocale.AG_GRID_LOCALE_ZH"
      :columnDefs="columnDefs"
      :rowData="fetchRowData"
      :deltaConfig="deltaConfig"
      @edit-change="handleEditChange"
      @grid-edit-change="handleGridEditChange"
    >
    </t-data-grid>
    <t-data-grid
      width="1200px"
      height="300px"
      :localeText="DataGridLocale.AG_GRID_LOCALE_ZH"
      :columnDefs="columnDefs2"
      :rowData="fetchRowData2"
      :deltaConfig="deltaConfig2"
      @edit-change="handleEditChange2"
    >
    </t-data-grid>
  `,
  setup() {
    const fetchRowData = ref([]);
    const editColumnDefs = ref();
    const deltaConfig = reactive({
      editable: true,
      multiCopy: true,
      content: [],
      grid: {},
      gridConfig: {},
    });
    const fetchRowData2 = ref([]);
    const editColumnDefs2 = ref();
    const deltaConfig2 = reactive({
      editable: true,
      multiCopy: true,
      content: [],
      grid: {},
    });

    watch(
      () => fetchRowData.value,
      (newValue) => {
        console.log('newValue', newValue);
      },
    );

    const handleEditChange = (params) => {
      console.log('outside handleEditChange', params);
      const { columnDefs: paramsColumnDefs, content, rowData, grid } = params;
      fetchRowData.value = rowData;
      editColumnDefs.value = paramsColumnDefs;
      deltaConfig.content = content;
      deltaConfig.grid = grid;
    };

    const handleGridEditChange = (params) => {
      const { suppressColHeader, suppressRowHeader } = params;
      console.log('outside handleGridEditChange', params);
      deltaConfig.gridConfig = {
        ...deltaConfig.gridConfig,
        suppressColHeader,
        suppressRowHeader,
      };
    };

    const handleEditChange2 = (params) => {
      console.log('outside handleEditChange', params);
      const { columnDefs: paramsColumnDefs, content, rowData, grid } = params;
      fetchRowData2.value = rowData;
      editColumnDefs2.value = paramsColumnDefs;
      deltaConfig2.content = content;
      deltaConfig2.grid = grid;
    };
    const content = [
      {
        field0: {},
        field1: {},
        field2: {},
        field3: {
          spanning: {
            row: 2,
            column: 1,
          },
        },
        field4: {},
      },
      {
        field0: {},
        field1: {},
        field2: {
          spanning: {
            row: 2,
            column: 1,
          },
          cellStyle: {
            color: 'rgba(43, 83, 237, 1)',
          },
        },
        field3: {
          spanning: {
            row: 1,
            column: 1,
          },
          cellStyle: {
            color: 'rgba(43, 83, 237, 1)',
          },
        },
        field4: {},
      },
      {
        field0: {},
        field1: {},
        field2: {
          spanning: {
            row: 1,
            column: 1,
          },
          cellStyle: {
            color: 'rgba(43, 83, 237, 1)',
          },
        },
        field3: {
          cellStyle: {
            color: 'rgba(43, 83, 237, 1)',
          },
        },
        field4: {},
      },
      {
        field0: {},
        field1: {},
        field2: {
          cellStyle: {
            color: 'rgba(43, 83, 237, 1)',
          },
        },
        field3: {
          cellStyle: {
            color: 'rgba(43, 83, 237, 1)',
          },
        },
        field4: {},
      },
      {
        field0: {},
        field1: {},
        field2: {},
        field3: {},
        field4: {},
      },
    ];

    onMounted(async () => {
      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((response) => response.json())
        .then(() => {
          const {
            rowData: createRowData,
            columnDefs: createColumnDefs,
            // content: createContent,
          } = DataGridUtils.createGrid(5, 5);
          const test = {
            rowData: [
              {
                field0: '-1',
                field1: '2',
                field2: '-3',
                field3: 'sdafsdg',
                field4: '',
                field5: '',
              },
              {
                field0: '40%',
                field1: '50%',
                field2: '60%',
                field3: '很多文案很多文案很多文案很多文案很多文案很多文案很多文案很多文案很多文案',
                field4: null,
                field5: '',
              },
              {
                field0: '0.4',
                field1: '40%',
                field2: '2023-12-06',
                field3: '2023-12-06',
                field4: '2023-12-06',
                field5: '2023-12-06',
              },
              {
                field0: '2023-12-06',
                field1: '2023-12-06',
                field2: '2023-12-06',
                field3: '2023-12-06',
                field4: '2023-12-06',
                field5: '2023-12-06',
              },
              {
                field0: '数值',
                field1: '1234567',
                field2: '1234567',
                field3: '-1234567',
                field4: '-1234567',
                field5: '1234567',
              },
              {
                field0: '12345',
                field1: '12345.78',
                field2: '12345.78',
                field3: '12345.78',
                field4: '12345.78',
                field5: '12345.78',
              },
              {
                field0: '-12345.78',
                field1: '-12345.78',
                field2: '-12345.78',
                field3: '-12345.78',
                field4: '-12345.78',
                field5: '-12345.78',
              },
            ],
            content: [
              {
                field0: {},
                field1: {},
                field2: {},
                field3: {},
                field4: {},
                field5: {},
              },
              {
                field0: {},
                field1: {},
                field2: {},
                field3: {},
                field4: {},
                field5: {},
              },
              {
                field0: {
                  valueFormatter: {
                    key: 'percent',
                    decimal: 1,
                  },
                },
                field1: {
                  valueFormatter: {
                    key: 'percent',
                    decimal: 2,
                  },
                },
                field2: {
                  valueFormatter: {
                    key: 'date',
                    date: 'YYYY_MM_DD_YYYY_MM_DD',
                  },
                },
                field3: {
                  valueFormatter: {
                    key: 'date',
                    date: 'YYYY_MM_DD',
                  },
                },
                field4: {
                  valueFormatter: {
                    key: 'date',
                    date: 'MM_DD',
                  },
                },
                field5: {
                  valueFormatter: {
                    key: 'date',
                    date: 'YYYY_MM_DD_WW',
                  },
                },
              },
              {
                field0: {
                  valueFormatter: {
                    key: 'date',
                    date: 'MM_DD_WW',
                  },
                },
                field1: {
                  valueFormatter: {
                    key: 'date',
                    date: 'MM_DD_MM_DD',
                  },
                },
                field2: {
                  valueFormatter: {
                    key: 'date',
                    date: 'YYYY_WW',
                  },
                },
                field3: {
                  valueFormatter: {
                    key: 'date',
                    date: 'YYYY_MM',
                  },
                },
                field4: {
                  valueFormatter: {
                    key: 'date',
                    date: 'YYYY_Q',
                  },
                },
                field5: {
                  valueFormatter: {
                    key: 'date',
                    date: 'YYYY',
                  },
                },
              },
              {
                field0: {},
                field1: {
                  valueFormatter: {
                    key: 'number',
                    decimal: 1,
                    thousandths: false,
                    negative: 'MINUS',
                  },
                },
                field2: {
                  valueFormatter: {
                    key: 'number',
                    decimal: 2,
                    thousandths: true,
                    negative: 'MINUS',
                  },
                },
                field3: {
                  valueFormatter: {
                    key: 'number',
                    decimal: 1,
                    thousandths: false,
                    negative: 'BRACKETS',
                  },
                },
                field4: {
                  valueFormatter: {
                    key: 'number',
                    decimal: 2,
                    thousandths: true,
                    negative: 'MINUS',
                  },
                },
                field5: {
                  valueFormatter: {
                    key: 'number',
                    decimal: 1,
                    thousandths: true,
                    negative: 'BRACKETS',
                  },
                },
              },
              {
                field0: {
                  valueFormatter: {
                    key: 'currency',
                    decimal: 1,
                    sign: 'CNY',
                    negative: 'MINUS',
                  },
                },
                field1: {
                  valueFormatter: {
                    key: 'currency',
                    decimal: 2,
                    sign: 'USD',
                    negative: 'BRACKETS',
                  },
                },
                field2: {
                  valueFormatter: {
                    key: 'currency',
                    decimal: 1,
                    sign: 'HKD',
                    negative: 'MINUS',
                  },
                },
                field3: {
                  valueFormatter: {
                    key: 'currency',
                    decimal: 2,
                    sign: 'EUR',
                    negative: 'BRACKETS',
                  },
                },
                field4: {
                  valueFormatter: {
                    key: 'currency',
                    decimal: 1,
                    sign: 'EUR2',
                    negative: 'MINUS',
                  },
                },
                field5: {
                  valueFormatter: {
                    key: 'currency',
                    decimal: 2,
                    sign: 'GBP',
                    negative: 'BRACKETS',
                  },
                },
              },
              {
                field0: {
                  valueFormatter: {
                    key: 'currency',
                    decimal: 1,
                    sign: 'CNY',
                    negative: 'BRACKETS',
                  },
                },
                field1: {
                  valueFormatter: {
                    key: 'currency',
                    decimal: 2,
                    sign: 'USD',
                    negative: 'MINUS',
                  },
                },
                field2: {
                  valueFormatter: {
                    key: 'currency',
                    decimal: 1,
                    sign: 'HKD',
                    negative: 'BRACKETS',
                  },
                },
                field3: {
                  valueFormatter: {
                    key: 'currency',
                    decimal: 2,
                    sign: 'EUR',
                    negative: 'MINUS',
                  },
                },
                field4: {
                  valueFormatter: {
                    key: 'currency',
                    decimal: 1,
                    sign: 'EUR2',
                    negative: 'BRACKETS',
                  },
                },
                field5: {
                  valueFormatter: {
                    key: 'currency',
                    decimal: 2,
                    sign: 'GBP',
                    negative: 'MINUS',
                  },
                },
              },
            ],
            columnDefs: [
              {
                field: 'field0',
                headerName: 'A',
              },
              {
                field: 'field1',
                headerName: 'B',
              },
              {
                field: 'field2',
                headerName: 'C',
              },
              {
                field: 'field3',
                headerName: 'D',
              },
              {
                field: 'field4',
                headerName: 'E',
              },
              {
                field: 'field5',
                headerName: 'F',
              },
            ],
            grid: {
              column: {
                showStatisticsKey: [],
              },
              row: {},
              cell: {},

              conditionRules: [
                // {
                //   key: '7RrJroCHLf',
                //   range: 'A1:C3',
                //   type: 'dataBar',
                //   filling: 'solid',
                //   startColor: '#DDCBFF',
                //   endColor: '#8EE2C9',
                //   startMode: 'auto',
                //   startValue: '',
                //   endValue: '',
                //   endMode: 'auto',
                // },
                {
                  key: 'XuHLQNy5b4',
                  range: 'A2:C2',
                  type: 'singleDataBar',
                  filling: 'solid',
                  startColor: '#97B6FC',
                  endColor: '#97B6FC',
                  startMode: 'auto',
                  startValue: '',
                  endValue: '',
                  endMode: 'auto',
                },
                {
                  key: '6XqiOrDMPT',
                  range: 'A1:D1',
                  type: 'colorScale',
                  filling: 'solid',
                  startColor: '#CDDCFF',
                  endColor: '#234BB1',
                  startMode: 'auto',
                  startValue: 1,
                  endValue: 4,
                  endMode: 'auto',
                },
              ],
            },
          };
          fetchRowData.value = test.rowData;
          editColumnDefs.value = test.columnDefs;
          deltaConfig.content = test.content;
          deltaConfig.grid = test.grid;

          fetchRowData2.value = [...test.rowData];
          editColumnDefs2.value = [...test.columnDefs];
          deltaConfig2.content = [...test.content];
          deltaConfig2.grid = { ...test.grid };
        });
    });

    const handleEdit = () => {
      deltaConfig.editable = !deltaConfig.editable;
    };

    return {
      handleEditChange,
      handleGridEditChange,
      fetchRowData,
      handleEditChange2,
      fetchRowData2,
      handleEdit,
      DataGridLocale,
      columnDefs: editColumnDefs,
      columnDefs2: editColumnDefs2,
      deltaConfig,
      deltaConfig2,
    };
  },
});
export const edit = EditTemplate.bind({});
edit.storyName = '编辑';

/**
 * Demo
 * 开发调试作用，注释即可，无需删除
 */
const DebugTemplate = () => ({
  components: { TDataGrid, TInput },
  template: `
    <t-data-grid
      width="1200px"
      height="300px"
      :columnDefs="columnDefs"
      :rowData="fetchRowData"
      :deltaConfig="deltaConfig"
      @edit-change="handleEditChange"
    >
    </t-data-grid>
  `,
  setup() {
    const fetchRowData = ref([]);
    const editColumnDefs = ref();
    const deltaConfig = reactive({
      editable: true,
      multiCopy: true,
      content: [],
      grid: {},
    });

    const handleEditChange = (params) => {
      console.log('outside handleEditChange', params);
      const { columnDefs: paramsColumnDefs, content, rowData, grid } = params;
      fetchRowData.value = rowData;
      editColumnDefs.value = paramsColumnDefs;
      deltaConfig.content = content;
      deltaConfig.grid = grid;
    };

    onMounted(async () => {
      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((response) => response.json())
        .then(() => {
          const test = {
            rowData: [
              {
                field0: '',
                field1: '',
                field2: '',
                field3: '',
                field4: '',
                field5: '',
              },
              {
                field0: '',
                field1: '',
                field2: '',
                field3: '',
                field4: '',
                field5: '',
              },
              {
                field0: '',
                field1: '',
                field2: '',
                field3: '',
                field4: '',
                field5: '',
              },
              {
                field0: '',
                field1: '',
                field2: '',
                field3: '',
                field4: '',
                field5: '',
              },
              {
                field0: '',
                field1: '',
                field2: '',
                field3: '',
                field4: '',
                field5: '',
              },
              {
                field0: '',
                field1: '',
                field2: '',
                field3: '',
                field4: '',
                field5: '',
              },
              {
                field0: '',
                field1: '',
                field2: '',
                field3: '',
                field4: '',
                field5: '',
              },
              {
                field0: '',
                field1: '',
                field2: '',
                field3: '',
                field4: '',
                field5: '',
              },
            ],
            content: [
              {
                field0: {},
                field1: {},
                field2: {},
                field3: {},
                field4: {},
                field5: {},
              },
              {
                field0: {},
                field1: {},
                field2: {},
                field3: {},
                field4: {},
                field5: {},
              },
              {
                field0: {},
                field1: {},
                field2: {},
                field3: {},
                field4: {},
                field5: {},
              },
              {
                field0: {},
                field1: {},
                field2: {},
                field3: {},
                field4: {},
                field5: {},
              },
              {
                field0: {},
                field1: {},
                field2: {},
                field3: {},
                field4: {},
                field5: {},
              },
              {
                field0: {},
                field1: {},
                field2: {},
                field3: {},
                field4: {},
                field5: {},
              },
              {
                field0: {},
                field1: {},
                field2: {},
                field3: {},
                field4: {},
                field5: {},
              },
              {
                field0: {},
                field1: {},
                field2: {},
                field3: {},
                field4: {},
                field5: {},
              },
            ],
            columnDefs: [
              {
                field: 'field0',
                headerName: 'A',
              },
              {
                field: 'field1',
                headerName: 'B',
              },
              {
                field: 'field2',
                headerName: 'C',
              },
              {
                field: 'field3',
                headerName: 'D',
              },
              {
                field: 'field4',
                headerName: 'E',
              },
              {
                field: 'field5',
                headerName: 'F',
              },
            ],
            grid: {
              column: {
                showStatisticsKey: [],
              },
              row: {},
              cell: {},

              conditionRules: [
                // {
                //   key: '7RrJroCHLf',
                //   range: 'A1:C3',
                //   type: 'dataBar',
                //   filling: 'solid',
                //   startColor: '#DDCBFF',
                //   endColor: '#8EE2C9',
                //   startMode: 'auto',
                //   startValue: '',
                //   endValue: '',
                //   endMode: 'auto',
                // },
                {
                  key: 'I0T3J3UA71',
                  range: 'B3:B5',
                  type: 'colorScale',
                  filling: 'solid',
                  startColor: '#CDDCFF',
                  endColor: '#234BB1',
                  startMode: 'auto',
                  startValue: '',
                  endValue: '',
                  endMode: 'auto',
                },
                {
                  key: 'XuHLQNy5b4',
                  range: 'A2:C2',
                  type: 'singleDataBar',
                  filling: 'solid',
                  startColor: '#97B6FC',
                  endColor: '#97B6FC',
                  startMode: 'auto',
                  startValue: '',
                  endValue: '',
                  endMode: 'auto',
                },
                {
                  key: '6XqiOrDMPT',
                  range: 'A1:D1',
                  type: 'colorScale',
                  filling: 'solid',
                  startColor: '#CDDCFF',
                  endColor: '#234BB1',
                  startMode: 'auto',
                  startValue: 1,
                  endValue: 4,
                  endMode: 'auto',
                },
              ],
            },
          };
          fetchRowData.value = test.rowData;
          editColumnDefs.value = test.columnDefs;
          deltaConfig.content = test.content;
          deltaConfig.grid = test.grid;
        });
    });

    return {
      fetchRowData,
      handleEditChange,
      columnDefs: editColumnDefs,
      deltaConfig,
    };
  },
});
export const debug = DebugTemplate.bind({});
