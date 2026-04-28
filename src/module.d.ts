/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'vue-virtual-scroller' {
  import type { Component } from 'vue';

  // eslint-disable-next-line
  export const RecycleScroller: Component<any, any, any, any>;
  // eslint-disable-next-line
  export const DynamicScroller: Component<any, any, any, any>;
  // eslint-disable-next-line
  export const DynamicScrollerItem: Component<any, any, any, any>;
}
