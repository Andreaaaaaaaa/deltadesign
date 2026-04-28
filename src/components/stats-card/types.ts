export interface StatsItem {
  lp?: number | string; // 环比值 (isCompare:false时需要)
  lpName: string; // 环比自定义名称
  lpShowNum: boolean; // 环比是否只显示数值 不做百分数处理
  lpHideTip?: boolean; // 环比隐藏tooltip
  sply?: number | string; // 同比值(isCompare:false时需要)
  splyName: string; // 同比自定义名称
  splyShowNum: boolean; // 同比是否只显示数值 不做百分数处理
  splyHideTip?: boolean; // 同比隐藏tooltip
  compare: string; // 对比项名称
  value: number | string; // 指标值
  date: string; // 时间
  cpValue?: number | string; // 对比时间的指标值(isCompare:true时需要)
  cp?: number | string; // 指标和对比时间指标值 的比率(isCompare:true时需要)
  cpDate?: string; // 对比时间(isCompare:true时需要)
}
export interface NumItemState {
  isPositive: boolean;
  isNegative: boolean;
  isZero: boolean;
  isNaN: boolean;
  num: string | number;
}
