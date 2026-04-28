import { SCALE_PARTITION } from '../../constant';

interface IRulesConfig {
  min?: number;
  max?: number;
}

/**
 * 数据条算法
 */
export const dataBarRules = (currentValue: number, rowData: Array<number>, config?: IRulesConfig) => {
  const max = config?.max ?? Math.max(...rowData);
  let min = config?.min ?? Math.min(...rowData);

  if (max - min === 0) {
    min = 0;
  }

  const isUnilateral = min >= 0 || max <= 0;

  const dataRange = max - min;

  const negativeScale = isUnilateral ? 0 : (0 - min) / dataRange;
  let origin = (max < 0 ? 1 : negativeScale) * 100;

  let width = (currentValue - min) / dataRange - negativeScale;

  if (max === 0 && min === 0) {
    origin = 50;
    width = 0;
  }

  return {
    width,
    origin,
  };
};

export const singleDataBarRules = (currentValue: number, rowData: Array<number>, config?: IRulesConfig) => {
  const max = config?.max ?? Math.max(...rowData);
  const min = config?.min ?? Math.min(...rowData);
  const dataRange = max - min;

  let percentage = (currentValue - min) / dataRange;
  if (percentage < 0) {
    percentage = 0;
  }
  if (percentage > 1) {
    percentage = 1;
  }

  return {
    width: percentage,
    origin: 0,
  };
};

export const scaleRules = (
  currentValue: number,
  rowData: Array<number>,
  config: IRulesConfig & {
    partition?: number;
  },
) => {
  const partition = config?.partition ?? SCALE_PARTITION;
  const max = config?.max ?? Math.max(...rowData);
  const min = config?.min ?? Math.min(...rowData);
  const bucketSize = (max - min) / partition;

  let index = Math.floor((currentValue - min) / bucketSize);
  if (index < 0) {
    index = 0;
  }
  if (index >= partition) {
    index = partition - 1;
  }

  // 这里要生成颜色指定个颜色

  return index;
};
