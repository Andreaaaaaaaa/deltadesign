import { reactive } from 'vue';
import { IDataGridChart } from '../types';

// 如果有多个不同业务的内部状态共享
// 使用具名导出更容易维护
export const chartState = reactive({
  // 设置一个属性并赋予初始值
  chart: {
    field: '',
    data: [],
    series: [],
    type: '',
    theme: {},
  },

  chartConfig: {} as IDataGridChart,

  // 添加一个更新数据的方法
  updateValue(key: string, value: any) {
    this.chart = { ...this.chart, [key]: value };
  },

  setChartConfig(params: IDataGridChart) {
    this.chartConfig = params;
  },

  setChart(params: any) {
    console.log('params', params);
    this.chart = params;
  },
});
