import { countBy, orderBy } from 'lodash';
import { TTypeValue, IDataGridChart, TDeepRequired } from '../types';
import { runRenderChartTask, chartThemeOverrides } from '../plugin';

const utils = {
  statisticalData: (list: Array<string | number>) =>
    list.reduce((accumulator, currentValue) => {
      const curVal = typeof currentValue === 'number' ? `${currentValue} ` : currentValue;
      if (accumulator?.[curVal]) {
        accumulator[curVal] += 1;
      } else {
        accumulator[curVal] = 1;
      }
      return accumulator;
    }, {} as { [key: string]: number }),
};

export const chartTypeAssembled: {
  [key in TTypeValue]: (
    data: Array<string | number>,
    fieldId: string,
  ) => { data: Array<any>; series: Array<{ xKey: string; yKey: string }> };
} = {
  /**
   * 将所有的数据都展示出来
   */
  column: (list: Array<string | number>) => {
    const cacheData = countBy(list, (item) => item);
    const resData = Object.entries(cacheData || {}).map(([key, value]) => ({
      // field加个空格，防止chart自动排序
      field: key,
      value,
    }));
    const data = orderBy(resData, [(item) => Number(item.field), 'value']);
    return {
      data,
      series: [
        {
          xKey: 'field',
          yKey: 'value',
        },
      ],
    };
  },
  /**
   * 进行统计出现次数
   */
  bar: (list: Array<string | number>, fieldId: string) => {
    const innerList = list.map((item) => item?.toString()?.replace(/\./g, '&middot;') || item);
    const cacheData = utils.statisticalData(innerList);
    const renderer = (params: any) => ({ title: params.yKey, content: `value: ${params.yValue}` });
    const series = Object.entries(cacheData || {}).map(([key]) => ({
      type: 'bar',
      xKey: 'field',
      yKey: key,
      tooltip: {
        renderer,
      },
      normalizedTo: 1,
      stacked: true,
    }));

    const data =
      Object.keys(cacheData).length > 0
        ? [
            {
              ...cacheData,
              field: fieldId,
            },
          ]
        : [];

    return {
      data,
      series,
    };
  },
  area: (list: Array<string | number>, fieldId: string) => {
    // const innerList = list.map((item) => item.toString().replace('.', ''));
    const cacheData = utils.statisticalData(list);
    const data = Object.entries(cacheData)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([key, value]) => ({
        value: key,
        [fieldId]: value,
      }));

    return {
      data,
      series: [
        {
          type: 'area',
          xKey: 'value',
          yKey: fieldId,
        },
      ],
    };
  },
  nothing: () => ({
    data: [],
    series: [],
  }),
};
/**
 * 缓存栈，采用先进先出
 * 按顺序出栈
 */
class RenderChartStack {
  data: Array<{ [key: string]: any }> = [];

  timer: null | NodeJS.Timeout = null;

  constructor() {
    this.data = [];
  }

  pushStack(field: string, value: Array<number | string>, config: TDeepRequired<IDataGridChart>) {
    const {
      max,
      type: configType,
      width,
      height,
      palette,
      suppressNavigate,
      data: configData = [],
      series: configSeries = [],
    } = config;
    const isCustomize = configData?.length > 0 && configSeries?.length > 0;
    let targetData: Array<any> = configData;
    let targetSeries: Array<any> = configSeries;
    const inferTtype = typeof value[0] === 'number' ? 'column' : '';
    const type = configType || inferTtype || 'bar';
    if (!isCustomize) {
      const typeAssembled = chartTypeAssembled[type](value, field);
      targetData = typeAssembled.data;
      targetSeries = typeAssembled.series;
    }
    let options = {};
    const maxDataOrSeries = Math.max(targetData.length, targetSeries.length);
    if (isNaN(max) || maxDataOrSeries > max) {
      const innerData = new Array(30).fill(0).map((_, index) => ({
        field: `内置数据${index}`,
        value: Math.random(),
      }));
      options = {
        width,
        field,
        height,
        data: innerData,
        series: [
          {
            xKey: 'field',
            yKey: 'value',
            tooltip: {
              enabled: false,
            },
            highlightStyle: {
              item: {
                fills: '#ccc',
                fillOpacity: 0,
              },
              series: {
                enabled: false,
              },
            },
          },
        ],
        type: 'column',
        theme: {
          overrides: chartThemeOverrides({
            suppressNavigate: true,
          }),
          palette: {
            fills: ['#ccc'],
            strokes: ['#ccc'],
          },
        },
      };
    } else {
      options = {
        width,
        height,
        data: targetData,
        series: targetSeries,
        type,
        field,
        theme: {
          overrides: chartThemeOverrides({ suppressNavigate }),
          palette,
        },
      };
    }

    const currentIndex = this.data.findIndex((item) => item.field === field);
    if (currentIndex >= 0) {
      // 存在一样的任务，替换
      this.data.splice(currentIndex, 1, options);
    } else {
      this.data.push(options);
    }

    /**
     * 暂时没找到触发好的触发条件，先用定时器触发
     * 如果添加数据n秒后，自动触发，无数据再添加的话，则自动触发
     */
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(runRenderChartTask, 1 * 1000);
  }

  popStack() {
    return this.data.shift();
  }

  getData() {
    return this.data;
  }
}

export const renderChartStack = new RenderChartStack();
