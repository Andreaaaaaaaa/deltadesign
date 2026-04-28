import { E_EVENT_BUS_KEY } from '../enums';

type TCallBack = (...params: Array<any>) => any;

class EventBus {
  events: Record<E_EVENT_BUS_KEY, Array<TCallBack>>;

  constructor() {
    this.events = {} as Record<E_EVENT_BUS_KEY, Array<TCallBack>>;
  }

  // 订阅事件
  on(event: E_EVENT_BUS_KEY, callback: TCallBack) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  // 发布事件
  emit(event: E_EVENT_BUS_KEY, ...args: Array<any>) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(...(args || [])));
    }
  }

  // 取消订阅事件
  off(event: E_EVENT_BUS_KEY, callback: TCallBack) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }
}

export const eventBus = new EventBus();
