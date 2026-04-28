import { renderChartStack } from '../class';
import { chartState } from '../store';

// eslint-disable-next-line no-promise-executor-return
const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time * 1000));
export const renderChartTask = () =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve) => {
    /**
     * 触发渲染任务
     * 触发后等待0.5秒才进行下一个任务,防止一下子全部都去更新，造成卡顿（这么做主要是图表没有渲染结束事件，无法感知什么时候渲染完）
     */
    const currentTask = renderChartStack.popStack();
    if (currentTask) {
      // 触发事件
      chartState.setChart(currentTask);
    }
    await sleep(0.2);
    resolve('');
  });

export const runRenderChartTask = () =>
  renderChartTask().then(() => {
    const stackTaskList = renderChartStack.getData();
    if (stackTaskList.length > 0) {
      runRenderChartTask();
    }
  });
