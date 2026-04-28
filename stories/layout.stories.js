import { reactive, toRefs, ref } from 'vue';

import {
  Layout as TLayout,
  Header as THeader,
  Aside as TAside,
  Content as TContent,
  Footer as TFooter,
} from '../src/components/layout/index';
// import '../src/components/grid/style';

import './layout.scss';

export default {
  title: '布局/Layout 布局',
  component: { TLayout, THeader, TAside, TContent, TFooter },
  argTypes: {},
};

// 基础Layout
const baseTemplate = (args) => ({
  components: { TLayout, THeader, TAside, TContent, TFooter },
  template: `<div class="tdesign-demo-item--layout">
  <div>
    <t-layout>
      <t-header>Header</t-header>
      <t-content>Content</t-content>
      <t-footer>Footer</t-footer>
    </t-layout>
  </div>

  <div class="aw-mt-5">
    <t-layout>
      <t-header>Header</t-header>
      <t-layout>
        <t-aside>Aside</t-aside>
        <t-content>Content</t-content>
      </t-layout>
      <t-footer>Footer</t-footer>
    </t-layout>
  </div>

  <div class="aw-mt-5">
    <t-layout>
      <t-header>Header</t-header>
      <t-layout>
        <t-content>Content</t-content>
        <t-aside>Aside</t-aside>
      </t-layout>
      <t-footer>Footer</t-footer>
    </t-layout>
  </div>

  <div class="aw-mt-5">
    <t-layout>
      <t-aside>Aside</t-aside>
      <t-layout>
        <t-header>Header</t-header>
        <t-content>Content</t-content>
        <t-footer>Footer</t-footer>
      </t-layout>
    </t-layout>
  </div>
</div>`,
  setup() {
    const state = reactive({
      ...args,
    });
    return {
      ...toRefs(state),
    };
  },
});

export const base = baseTemplate.bind({});
// base.storyName = '基本使用';
base.args = {};
