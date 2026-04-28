import { reactive, toRefs, ref, computed } from 'vue';

import {
  Menu as TMenu,
  HeadMenu as THeadMenu,
  Submenu as TSubmenu,
  MenuItem as TMenuItem,
  MenuGroup as TMenuGroup,
} from '../src/components/menu/index';

import TIcon from '../src/components/icon';

import '../src/components/menu/style';

export default {
  title: '导航/Menu 导航菜单',
  component: { TMenu, THeadMenu, TSubmenu, TMenuItem, TMenuGroup, TIcon },
  argTypes: {},
};

// singleHeader
const singleHeaderTemplate = (args) => ({
  components: { TMenu, THeadMenu, TSubmenu, TMenuItem, TMenuGroup, TIcon },
  template: `<div>
  <t-head-menu v-model="menu1Value" theme="light" @change="changeHandler">
    <template #logo>
      <img width="136" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo" />
    </template>
    <t-menu-item value="item1"> 菜单1 </t-menu-item>
    <t-menu-item value="item2"> 菜单2 </t-menu-item>
    <t-menu-item value="item4" :disabled="true"> 禁用菜单 </t-menu-item>
    <template #operations>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="mail" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="user" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="ellipsis" /></a>
    </template>
  </t-head-menu>

  <br />

  <t-head-menu v-model="menu2Value" theme="dark" height="120px">
    <template #logo>
      <img width="136" src="https://www.tencent.com/img/index/menu_logo.png" alt="logo" />
    </template>
    <t-menu-item value="item1"> 菜单1 </t-menu-item>
    <t-menu-item value="item2"> 菜单2 </t-menu-item>
    <t-menu-item value="item4" :disabled="true"> 禁用菜单 </t-menu-item>
    <template #operations>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="mail" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="user" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="ellipsis" /></a>
    </template>
  </t-head-menu>
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

export const singleHeader = singleHeaderTemplate.bind({});
// singleHeader.storyName = '基本使用';
singleHeader.args = {
  menu1Value: 'item2',
  menu2Value: 'item1',

  changeHandler: (active) => {
    console.log('change', active);
  },
};

// doubleHeader
const doubleHeaderTemplate = (args) => ({
  components: { TMenu, THeadMenu, TSubmenu, TMenuItem, TMenuGroup, TIcon },
  template: `<div class="box">
  <t-head-menu default-value="1-1" :default-expanded="expanded">
    <template #logo>
      <img width="136" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo" />
    </template>
    <t-submenu value="1">
      <template #title>
        <span>菜单1</span>
      </template>
      <t-menu-item value="1-1">子菜单1-1</t-menu-item>
      <t-menu-item value="1-2">子菜单1-2</t-menu-item>
      <t-menu-item value="1-3">子菜单1-3</t-menu-item>
    </t-submenu>
    <t-submenu value="2">
      <template #title>
        <span>菜单2</span>
      </template>
      <t-menu-item value="2-1">子菜单2-1</t-menu-item>
      <t-menu-item value="2-2">子菜单2-2</t-menu-item>
      <t-menu-item value="2-3">子菜单2-3</t-menu-item>
    </t-submenu>
    <template #operations>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="mail" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="user" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="ellipsis" /></a>
    </template>
  </t-head-menu>
  <t-head-menu default-value="1-1" theme="dark" :expanded="expanded2" style="margin-top: 24px">
    <template #logo>
      <img width="136" src="https://www.tencent.com/img/index/menu_logo.png" alt="logo" />
    </template>
    <t-submenu value="1">
      <template #title>
        <span>菜单1</span>
      </template>
      <t-menu-item value="1-1">子菜单1-1</t-menu-item>
      <t-menu-item value="1-2">子菜单1-2</t-menu-item>
      <t-menu-item value="1-3">子菜单1-3</t-menu-item>
    </t-submenu>
    <t-submenu value="2">
      <template #title>
        <span>菜单2</span>
      </template>
      <t-menu-item value="2-1">子菜单2-1</t-menu-item>
      <t-menu-item value="2-2">子菜单2-2</t-menu-item>
      <t-menu-item value="2-3">子菜单2-3</t-menu-item>
    </t-submenu>
    <template #operations>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="mail" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="user" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="ellipsis" /></a>
    </template>
  </t-head-menu>
</div>`,
  setup() {
    const state = reactive({
      ...args,
      expanded: ['1'],
      expanded2: ['1'],
    });
    return {
      ...toRefs(state),
    };
  },
});

export const doubleHeader = doubleHeaderTemplate.bind({});
// doubleHeader.storyName = '基本使用';
doubleHeader.args = {};

// multipleHeader
const multipleHeaderTemplate = (args) => ({
  components: { TMenu, THeadMenu, TSubmenu, TMenuItem, TMenuGroup, TIcon },
  template: `<div class="box">
  <t-head-menu default-value="2-1" expand-type="popup">
    <template #logo>
      <img width="136" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo" />
    </template>
    <t-submenu value="1">
      <template #title>
        <span>菜单1</span>
      </template>
      <t-submenu value="1-0" title="子菜单1-1">
        <t-menu-item value="1-1-1"> 子菜单1-1-1 </t-menu-item>
        <t-menu-item value="1-1-2"> 子菜单1-1-2 </t-menu-item>
        <t-menu-item value="1-1-3"> 子菜单1-1-3 </t-menu-item>
      </t-submenu>
      <t-menu-item value="1-2"> 子菜单1-2 </t-menu-item>
      <t-menu-item value="1-3"> 子菜单1-3 </t-menu-item>
      <t-menu-item value="1-4"> 子菜单1-4 </t-menu-item>
      <t-submenu value="1-5" title="子菜单1-5">
        <t-menu-item value="1-5-1"> 子菜单1-5-1 </t-menu-item>
        <t-menu-item value="1-5-2"> 子菜单1-5-2 </t-menu-item>
        <t-menu-item value="1-5-3"> 子菜单1-5-3 </t-menu-item>
      </t-submenu>
    </t-submenu>
    <t-submenu value="2" title="菜单2">
      <t-menu-item value="2-1"> 子菜单2-1 </t-menu-item>
      <t-menu-item value="2-2"> 子菜单2-2 </t-menu-item>
      <t-menu-item value="2-3"> 子菜单2-3 </t-menu-item>
    </t-submenu>
    <template #operations>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="mail" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="user" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="ellipsis" /></a>
    </template>
  </t-head-menu>

  <t-head-menu default-value="2-1" theme="dark" expand-type="popup" style="margin-top: 24px">
    <template #logo>
      <img width="136" src="https://www.tencent.com/img/index/menu_logo.png" alt="logo" />
    </template>
    <t-submenu value="1">
      <template #title>
        <span>菜单1</span>
      </template>
      <t-menu-item value="1-1"> 子菜单1-1 </t-menu-item>
      <t-menu-item value="1-2"> 子菜单1-2 </t-menu-item>
      <t-menu-item value="1-3"> 子菜单1-3 </t-menu-item>
    </t-submenu>
    <t-submenu value="2">
      <template #title>
        <span>菜单2</span>
      </template>
      <t-menu-item value="2-1"> 子菜单2-1 </t-menu-item>
      <t-menu-item value="2-2"> 子菜单2-2 </t-menu-item>
      <t-menu-item value="2-3"> 子菜单2-3 </t-menu-item>
    </t-submenu>
    <template #operations>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="mail" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="user" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="ellipsis" /></a>
    </template>
  </t-head-menu>
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

export const multipleHeader = multipleHeaderTemplate.bind({});
// multipleHeader.storyName = '基本使用';
multipleHeader.args = {};

// customHeader
const customHeaderTemplate = (args) => ({
  components: { TMenu, THeadMenu, TSubmenu, TMenuItem, TMenuGroup, TIcon },
  template: `<div class="box">
  <t-head-menu theme="dark" default-value="item2">
    <t-menu-item value="item1"> 菜单内容一 </t-menu-item>
    <t-menu-item value="item2"> 已选内容 </t-menu-item>
    <t-menu-item value="item3"> 菜单内容二 </t-menu-item>
    <t-menu-item value="item4" :disabled="true"> 菜单内容三 </t-menu-item>
    <template #operations>
      <div class="demo-box">自定义内容区域</div>
    </template>
  </t-head-menu>
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

export const customHeader = customHeaderTemplate.bind({});
// customHeader.storyName = '基本使用';
customHeader.args = {};

// singleSide
const singleSideTemplate = (args) => ({
  components: { TMenu, THeadMenu, TSubmenu, TMenuItem, TMenuGroup, TIcon },
  template: `<div class="box">
  <t-menu theme="light" value="item1" style="margin-right: 40px" height="550px" @change="changeHandler">
    <template #logo>
      <img
        width="136"
        class="t-menu__logo--center"
        src="https://www.tencent.com/img/index/menu_logo_hover.png"
        alt="logo"
      />
    </template>
    <t-menu-item value="item1"> 仪表盘 </t-menu-item>
    <t-menu-item value="item2"> 资源列表 </t-menu-item>
    <t-menu-item value="item3"> 根目录 </t-menu-item>
    <t-menu-item value="item4" :disabled="true"> 调度平台 </t-menu-item>
    <t-menu-item value="item5"> 精准监控 </t-menu-item>
    <t-menu-item value="item6"> 消息区 </t-menu-item>
    <t-menu-item value="item7"> 个人中心 </t-menu-item>
    <t-menu-item value="item8"> 视频区 </t-menu-item>
    <t-menu-item value="item9"> 资源编辑 </t-menu-item>
  </t-menu>

  <t-menu theme="light" default-value="dashboard" style="margin-right: 40px" height="550px">
    <template #logo>
      <img
        width="136"
        class="t-menu__logo--center"
        src="https://www.tencent.com/img/index/menu_logo_hover.png"
        alt="logo"
      />
    </template>
    <t-menu-item value="dashboard">
      <template #icon>
        <t-icon name="dashboard" />
      </template>
      仪表盘
    </t-menu-item>
    <t-menu-item value="resource">
      <template #icon>
        <t-icon name="server" />
      </template>
      资源列表
    </t-menu-item>
    <t-menu-item value="root">
      <template #icon>
        <t-icon name="root-list" />
      </template>
      根目录
    </t-menu-item>
    <t-menu-item value="control-platform">
      <template #icon>
        <t-icon name="control-platform" />
      </template>
      调度平台
    </t-menu-item>
    <t-menu-item value="precise-monitor">
      <template #icon>
        <t-icon name="precise-monitor" />
      </template>
      精准监控
    </t-menu-item>
    <t-menu-item value="mail">
      <template #icon>
        <t-icon name="mail" />
      </template>
      消息区
    </t-menu-item>
    <t-menu-item value="user-circle">
      <template #icon>
        <t-icon name="user-circle" />
      </template>
      个人中心
    </t-menu-item>
    <t-menu-item value="play-circle">
      <template #icon>
        <t-icon name="play-circle" />
      </template>
      视频区
    </t-menu-item>
    <t-menu-item value="edit1">
      <template #icon>
        <t-icon name="edit-1" />
      </template>
      资源编辑
    </t-menu-item>
  </t-menu>

  <t-menu theme="dark" value="dashboard" height="550px">
    <template #logo>
      <img
        width="136"
        class="t-menu__logo--center"
        src="https://www.tencent.com/img/index/menu_logo.png"
        alt="logo"
      />
    </template>
    <t-menu-item value="dashboard">
      <template #icon>
        <t-icon name="dashboard" />
      </template>
      仪表盘
    </t-menu-item>
    <t-menu-item value="resource">
      <template #icon>
        <t-icon name="server" />
      </template>
      资源列表
    </t-menu-item>
    <t-menu-item value="root">
      <template #icon>
        <t-icon name="root-list" />
      </template>
      根目录
    </t-menu-item>
    <t-menu-item value="control-platform">
      <template #icon>
        <t-icon name="control-platform" />
      </template>
      调度平台
    </t-menu-item>
    <t-menu-item value="precise-monitor">
      <template #icon>
        <t-icon name="precise-monitor" />
      </template>
      精准监控
    </t-menu-item>
    <t-menu-item value="mail">
      <template #icon>
        <t-icon name="mail" />
      </template>
      消息区
    </t-menu-item>
    <t-menu-item value="user-circle">
      <template #icon>
        <t-icon name="user-circle" />
      </template>
      个人中心
    </t-menu-item>
    <t-menu-item value="play-circle">
      <template #icon>
        <t-icon name="play-circle" />
      </template>
      视频区
    </t-menu-item>
    <t-menu-item value="edit1">
      <template #icon>
        <t-icon name="edit-1" />
      </template>
      资源编辑
    </t-menu-item>
  </t-menu>
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

export const singleSide = singleSideTemplate.bind({});
// singleSide.storyName = '基本使用';
singleSide.args = {};

// multiSide
const multiSideTemplate = (args) => ({
  components: { TMenu, THeadMenu, TSubmenu, TMenuItem, TMenuGroup, TIcon },
  template: `<div class="box">
  <t-menu theme="light" default-value="3-2" expand-mutex :expanded="expanded" height="550px" :collapsed="collapsed">
    <t-submenu value="3">
      <template #icon>
        <t-icon name="mail" />
      </template>
      <template #title>
        <span>消息区</span>
      </template>
      <t-submenu value="3-1" title="二级菜单">
        <t-menu-item value="3-1-1"> 三级菜单内容 </t-menu-item>
        <t-menu-item value="3-1-2"> 三级菜单内容 </t-menu-item>
        <t-menu-item value="3-1-3"> 三级菜单内容 </t-menu-item>
      </t-submenu>
      <t-submenu value="3-5" title="二级菜单">
        <t-menu-item value="3-5-1"> 三级菜单内容 </t-menu-item>
        <t-menu-item value="3-5-2"> 三级菜单内容 </t-menu-item>
        <t-menu-item value="3-5-3"> 三级菜单内容 </t-menu-item>
      </t-submenu>
      <t-menu-item value="3-2"> 二级菜单内容 </t-menu-item>
      <t-menu-item value="3-3"> 二级菜单内容 </t-menu-item>
      <t-menu-item value="3-4"> 二级菜单内容 </t-menu-item>
    </t-submenu>
    <t-menu-item value="user-circle">
      <template #icon>
        <t-icon name="user-circle" />
      </template>
      个人中心
    </t-menu-item>
    <t-submenu value="4">
      <template #icon>
        <t-icon name="play-circle" />
      </template>
      <template #title>
        <span>视频区</span>
      </template>
      <t-menu-item value="4-1"> 二级菜单内容 </t-menu-item>
      <t-menu-item value="4-2"> 二级菜单内容 </t-menu-item>
      <t-menu-item value="4-3"> 二级菜单内容 </t-menu-item>
    </t-submenu>
    <t-menu-item value="edit1">
      <template #icon>
        <t-icon name="edit-1" />
      </template>
      资源编辑
    </t-menu-item>
    <template #operations>
      <t-icon class="t-menu__operations-icon" name="view-list" @click="changeCollapsed" />
    </template>
  </t-menu>

  <t-menu
    theme="dark"
    default-value="2-1"
    style="margin-left: 50px"
    :expanded="expanded2"
    height="550px"
    :collapsed="collapsed2"
  >
    <t-menu-item value="item1">
      <template #icon>
        <t-icon name="dashboard" />
      </template>
      仪表盘
    </t-menu-item>
    <t-menu-item value="resource">
      <template #icon>
        <t-icon name="server" />
      </template>
      资源列表
    </t-menu-item>
    <t-menu-item value="root">
      <template #icon>
        <t-icon name="root-list" />
      </template>
      根目录
    </t-menu-item>
    <t-submenu value="2">
      <template #icon>
        <t-icon name="control-platform" />
      </template>
      <template #title>
        <span>调度平台</span>
      </template>
      <t-menu-item value="2-1"> 二级菜单内容 </t-menu-item>
      <t-menu-item value="2-2"> 二级菜单内容 </t-menu-item>
      <t-menu-item value="2-3"> 二级菜单内容 </t-menu-item>
    </t-submenu>
    <t-menu-item value="precise-monitor">
      <template #icon>
        <t-icon name="precise-monitor" />
      </template>
      精准监控
    </t-menu-item>
    <t-submenu title="消息区" value="3" disabled>
      <template #icon>
        <t-icon name="mail" />
      </template>
      <template #title>
        <span>消息区</span>
      </template>
      <t-menu-item value="3-1"> 二级菜单内容 </t-menu-item>
      <t-menu-item value="3-2"> 二级菜单内容 </t-menu-item>
      <t-menu-item value="3-3"> 二级菜单内容 </t-menu-item>
    </t-submenu>
    <t-menu-item value="user-circle">
      <template #icon>
        <t-icon name="user-circle" />
      </template>
      个人中心
    </t-menu-item>
    <t-submenu value="4">
      <template #icon>
        <t-icon name="play-circle" />
      </template>
      <template #title>
        <span>视频区</span>
      </template>
      <t-menu-item value="4-1"> 二级菜单内容 </t-menu-item>
      <t-menu-item value="4-2"> 二级菜单内容 </t-menu-item>
      <t-menu-item value="4-3"> 二级菜单内容 </t-menu-item>
    </t-submenu>
    <t-menu-item value="edit1">
      <template #icon>
        <t-icon name="edit-1" />
      </template>
      资源编辑
    </t-menu-item>
    <template #operations>
      <t-icon class="t-menu__operations-icon" name="view-list" @click="changeCollapsed2" />
    </template>
  </t-menu>
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

export const multiSide = multiSideTemplate.bind({});
// multiSide.storyName = '基本使用';
multiSide.args = {};

// groupSide
const groupSideTemplate = (args) => ({
  components: { TMenu, THeadMenu, TSubmenu, TMenuItem, TMenuGroup, TIcon },
  template: `<div class="box">
  <t-menu theme="light" default-value="item2" :collapsed="collapsed" height="550px" @change="changeHandler">
    <template #logo>
      <img :width="collapsed ? 35 : 136" :src="iconUrl" alt="logo" />
    </template>
    <t-menu-group title="Classification A">
      <t-menu-item value="item1">
        <template #icon>
          <t-icon name="dashboard" />
        </template>
        仪表盘
      </t-menu-item>
    </t-menu-group>
    <t-menu-group title="Classification B">
      <t-menu-item value="item2">
      <template #icon>
        <t-icon name="dashboard" />
      </template>
      调度平台 </t-menu-item>
      <t-menu-item value="item3">
      <template #icon>
        <t-icon name="dashboard" />
      </template>
      菜单内容二很长很长很长很长很长很长很长很长 </t-menu-item>
    </t-menu-group>
    <t-menu-group title="Classification C">
      <t-menu-item value="item4" :disabled="true">
      <template #icon>
        <t-icon name="dashboard" />
      </template>
      精准监控 </t-menu-item>
    </t-menu-group>
    <template #operations>
      <t-icon class="t-menu__operations-icon" name="view-list" @click="changeCollapsed" />
    </template>
  </t-menu>
</div>`,
  setup() {
    const state = reactive({
      ...args,
    });

    const collapsed = ref(true);

    const iconName = computed(() => (collapsed.value ? 'chevron-right' : 'chevron-left'));

    const changeCollapsed = () => {
      collapsed.value = !collapsed.value;
      state.iconUrl = collapsed.value
        ? 'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/logo%402x.png'
        : 'https://www.tencent.com/img/index/menu_logo_hover.png';
    };

    const changeHandler = (active) => {
      console.log('change', active);
    };

    return {
      ...toRefs(state),
      iconName,
      collapsed,
      changeCollapsed,
      changeHandler,
    };
  },
});

export const groupSide = groupSideTemplate.bind({});
// groupSide.storyName = '基本使用';
groupSide.args = {
  iconUrl: 'https://www.tencent.com/img/index/menu_logo_hover.png',
};

// closableSide
const closableSideTemplate = (args) => ({
  components: { TMenu, THeadMenu, TSubmenu, TMenuItem, TMenuGroup, TIcon },
  template: `<div class="box">
  <t-menu theme="light" default-value="2-1" :collapsed="collapsed" height="550px">
    <template #logo>
      <span>LOGO</span>
    </template>
    <t-menu-item value="item1">
      <template #icon>
        <t-icon name="dashboard" />
      </template>
      仪表盘1
    </t-menu-item>
    <t-submenu value="2" mode="popup">
      <template #icon>
        <t-icon name="mail" />
      </template>
      <template #title>
        <span>信息区</span>
      </template>
      <t-menu-item value="2-1"> 菜单内容一 </t-menu-item>
      <t-menu-item value="2-2"> 菜单内容二 </t-menu-item>
      <t-menu-item value="2-3"> 菜单内容三 </t-menu-item>
    </t-submenu>
    <t-menu-item value="item3">
      <template #icon>
        <t-icon name="play-circle" />
      </template>
      视频区
    </t-menu-item>
    <t-menu-item value="item4" :disabled="true">
      <template #icon>
        <t-icon name="edit-1" />
      </template>
      资源编辑
    </t-menu-item>
    <template #operations>
      <t-icon class="t-menu__operations-icon" :name="iconName" @click="changeCollapsed" />
    </template>
  </t-menu>
  <t-menu theme="dark" default-value="2-1" :collapsed="collapsed" height="550px" class="aw-ml-8 ml-8">
    <template #logo>
      <span>LOGO</span>
    </template>
    <t-menu-item value="item1">
      <template #icon>
        <t-icon name="dashboard" />
      </template>
      仪表盘1
    </t-menu-item>
    <t-submenu value="2" mode="popup">
      <template #icon>
        <t-icon name="mail" />
      </template>
      <template #title>
        <span>信息区</span>
      </template>
      <t-menu-item value="2-1"> 菜单内容一 </t-menu-item>
      <t-menu-item value="2-2"> 菜单内容二 </t-menu-item>
      <t-menu-item value="2-3"> 菜单内容三 </t-menu-item>
    </t-submenu>
    <t-menu-item value="item3">
      <template #icon>
        <t-icon name="play-circle" />
      </template>
      视频区
    </t-menu-item>
    <t-menu-item value="item4" :disabled="true">
      <template #icon>
        <t-icon name="edit-1" />
      </template>
      资源编辑
    </t-menu-item>
    <template #operations>
      <t-icon class="t-menu__operations-icon" :name="iconName" @click="changeCollapsed" />
    </template>
  </t-menu>
</div>`,
  setup() {
    const state = reactive({
      ...args,
    });

    const collapsed = ref(true);

    const iconName = computed(() => (collapsed.value ? 'chevron-right' : 'chevron-left'));

    const changeCollapsed = () => {
      collapsed.value = !collapsed.value;
      state.iconUrl = collapsed.value
        ? 'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/logo%402x.png'
        : 'https://www.tencent.com/img/index/menu_logo_hover.png';
    };

    return {
      ...toRefs(state),
      iconName,
      collapsed,
      changeCollapsed,
    };
  },
});

export const closableSide = closableSideTemplate.bind({});
// closableSide.storyName = '基本使用';
closableSide.args = {};
