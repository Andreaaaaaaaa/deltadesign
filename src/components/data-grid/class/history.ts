import lodash from 'lodash';
import { HISTORY_LIMIT } from '../constant';
import { IChangeProps, IHistoryResult, THistoryItem } from '../types';

/**
 * 实现 undo 和 redo 功能
 */
export class DataGridHistory {
  private baseState: THistoryItem;

  private historyStack: Array<THistoryItem> = [];

  private undoStack: Array<THistoryItem> = [];

  /**
   * 存入初始化数据
   */
  saveBaseState(value: IChangeProps) {
    if (this.baseState === undefined) {
      this.baseState = lodash.cloneDeep(value);
    }
  }

  /**
   * 插入记录
   */
  push(value: IChangeProps) {
    this.historyStack = [...this.historyStack, lodash.cloneDeep(value)];
    this.undoStack = [];
    if (this.historyStack.length > HISTORY_LIMIT) {
      this.historyStack.splice(0, 1);
    }
    return this.result();
  }

  /**
   * 撤销
   */
  undo() {
    if (this.historyStack.length > 0) {
      let cache = {} as THistoryItem;
      if (this.historyStack.length === 1 && this.baseState) {
        cache = lodash.cloneDeep({ ...this.baseState });
      } else {
        cache = this.historyStack.pop();
      }

      this.undoStack.push(lodash.cloneDeep(cache));
    }

    return this.result();
  }

  /**
   * 重做
   */
  redo() {
    if (this.undoStack.length > 0) {
      const cache = this.undoStack.pop();
      this.historyStack.push(lodash.cloneDeep(cache));
    }

    return this.result();
  }

  /**
   * 获取记录栈的长度
   */
  getHistoryStackLength() {
    return this.historyStack.length;
  }

  /**
   * 获取撤销栈的长度
   */
  getUndoStackLength() {
    return this.undoStack.length;
  }

  /**
   * 获取当前记录
   */
  getCurrentValue() {
    if (this.historyStack.length === 1) {
      return lodash.cloneDeep({ ...this.baseState });
    }
    return this.historyStack[this.historyStack.length - 1];
  }

  /**
   * 清空记录
   */
  clear() {
    this.historyStack = [];
    this.undoStack = [];
  }

  /**
   * 返回格式
   */
  result() {
    const current = this.getCurrentValue();
    return {
      baseState: this.baseState,
      undoStack: this.undoStack || [],
      historyStack: this.historyStack || [],
      current,
    } as IHistoryResult;
  }
}
