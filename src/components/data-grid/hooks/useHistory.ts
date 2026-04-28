import { onMounted, ref, unref } from 'vue';

import { DataGridHistory } from '../class';
import { E_HEADER_EDIT_TOOLBAR_KEY } from '../enums';
import { IChangeProps, IHistoryResult } from '../types';

export const useHistory = ({ emitChange }: { emitChange: (params: IChangeProps) => void }) => {
  const history = ref<DataGridHistory | null>(null);
  const historyInfo = ref<IHistoryResult>({
    baseState: undefined,
    undoStack: [],
    historyStack: [],
    current: undefined,
  });

  const saveBaseState = (params: IChangeProps) => {
    history.value?.saveBaseState(params);
  };

  const setHistoryInfo = (result: IHistoryResult | undefined) => {
    if (result) {
      historyInfo.value = result;
      // console.log('historyInfo', historyInfo.value);
    }
  };

  const historyUndo = () => {
    const result = history.value?.undo();
    setHistoryInfo(result);
    if (result?.current) {
      emitChange(result.current);
    }
  };

  const historyRedo = () => {
    const result = history.value?.redo();
    setHistoryInfo(result);

    if (result?.current) {
      emitChange(result.current);
    }
  };

  const historyClick = (key: E_HEADER_EDIT_TOOLBAR_KEY) => {
    switch (key) {
      case E_HEADER_EDIT_TOOLBAR_KEY.UNDO:
        historyUndo();
        break;
      case E_HEADER_EDIT_TOOLBAR_KEY.REDO:
        historyRedo();
        break;
      default:
    }
  };

  const historyPush = (params: IChangeProps) => {
    const result = history.value?.push({ ...unref(params) });
    setHistoryInfo(result);
  };

  const historyClear = () => history.value?.clear();

  onMounted(() => {
    const dataGridHistory = new DataGridHistory();
    history.value = dataGridHistory;
    historyInfo.value = { ...dataGridHistory.result() };
  });

  return { saveBaseState, historyPush, historyClear, historyUndo, historyRedo, historyInfo, historyClick };
};
