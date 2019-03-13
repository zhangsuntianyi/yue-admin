<template>
  <Layout class="container-fluid layout-container">
    <Sider hide-trigger collapsible :collapsed-width="74" v-model="collapsed"
           class="sider-container" width="232">
      <div class="sider-header-container">
        <div :class="[
               'header-left-container',
               'container-fluid',
               collapsed ? 'small-menu-width' : 'big-menu-width'
             ]">
          <!-- 展开logo -->
          <img v-show="!collapsed" class="big-logo" src="../../public/image/logo/big-logo.png">
          <!-- 折叠logo -->
          <img v-show="collapsed" class="small-logo" src="../../public/image/logo/small-logo.png">
        </div>
      </div>
      <div :class="['sider-menu-container', collapsed ? 'small-menu-width' : 'big-menu-width']">
        <!-- 展开菜单 -->
        <div :class="['sider-menu-children', collapsed ? 'small-menu-width-children' : 'big-menu-width-children']">
          <Menu v-show="!collapsed" :active-name="$route.path"
                theme="dark" width="232px" class="container-fluid">
            <template v-for="menu in menus">
              <SideMenuItem v-if="menu.children && menu.children.length > 0"
                            :key="`menu-${menu.id}`"
                            :menu="menu"></SideMenuItem>
              <MenuItem v-else
                        :name="menu.url" :to="menu.url"
                        :key="`menu-${menu.id}`">
                <Icon :type="menu.icon" :size="16"/>
                <span>{{ menu.name }}</span>
              </MenuItem>
            </template>
          </Menu>

          <!-- 折叠菜单 -->
          <div v-show="collapsed">
            <template v-for="(menu, index) in menus">
              <!-- 有子节点 -->
              <CollapsedMenu v-if="menu.children && menu.children.length > 0"
                             :key="index" :menu="menu" hideTitle
                             :root-icon-size="30"></CollapsedMenu>
              <!-- 没有子节点 -->
              <Tooltip v-else transfer :content="menu.name" placement="right" :key="index">
                <a @click="toUrl(menu.url)" class="drop-menu-a">
                  <Icon :type="menu.icon" size="30"/>
                </a>
              </Tooltip>
            </template>
          </div>
        </div>
      </div>
    </Sider>

    <layout class="container-fluid content-layout-container">
      <Header class="header-container">
        <div class="header-right-container container-fluid">
          <!--折叠菜单按钮-->
          <SiderTrigger :collapsed="collapsed"
                         icon="md-menu"
                         @on-change="handleCollpasedChange"></SiderTrigger>

          <!-- 导航栏 -->
          <Breadcrumb class="header-breadcrumb">
            <BreadcrumbItem v-for="(breadcrumb, index) in $route.meta.breadCrumbList"
                            :key="index"
                            :to="breadcrumb.to">{{ breadcrumb.name }}</BreadcrumbItem>
          </Breadcrumb>

          <!--用户信息-->
          <div class="header-user-container container-fluid">
            <Icon @click.native="handleFullscreen" :type="isFullscreen ? 'md-contract' : 'md-expand'"
                  size="24"/>

            <Dropdown class="action" placement="bottom-end">
              <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"
                      style="margin-right: 10px"/>
              <span style="font-size: 14px;">{{ userName }}</span>
              <Icon type="md-arrow-dropdown" :size="24"/>

              <DropdownMenu slot="list">
                <DropdownItem @click.native="$router.push('/index')">主页</DropdownItem>
                <DropdownItem @click.native="openMessageDrawer">
                  <span style="margin-right: 10px">消息中心</span>
                  <Badge :count="3"></Badge>
                </DropdownItem>
                <DropdownItem divided @click.native="resetPwd">修改密码</DropdownItem>
                <DropdownItem @click.native="logout">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </Header>

      <!--内容-->
      <Content class="content-container">
        <!-- tab -->
        <Tabs type="card" :value="$route.fullPath"
              @on-tab-remove="closeTab" @on-click="clickTab">
          <TabPane v-for="item in tabs" :key="item.fullPath"
                   :closable="!item.isIndex"
                   :label="item.title"
                   :name="item.fullPath">
          </TabPane>
          <Dropdown slot="extra" transfer @on-click="clickCloseMenu">
            <Icon type="md-close" size="24" class="cursor-pointer"></Icon>
            <DropdownMenu slot="list">
              <DropdownItem name="close-all">关闭所有</DropdownItem>
              <DropdownItem name="close-others">关闭其他</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Tabs>

        <!-- content -->
        <transition>
          <keep-alive>
            <router-view/>
          </keep-alive>
        </transition>
      </Content>
    </layout>

    <Message ref="messageDrawer"></Message>
  </Layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import SideMenuItem from '../components/sideMenuItem.vue';
import CollapsedMenu from '../components/collapsedMenu.vue';
import SiderTrigger from '../components/siderTrigger.vue';
import Message from './message/components/message.vue';

import { onOffFullscreen } from '../utils/utils';

import '../css/main.less';

export default {
  name: 'Main',
  components: {
    SideMenuItem,
    CollapsedMenu,
    SiderTrigger,
    Message
  },
  computed: {
    ...mapState({
      userId: state => state.user.userId,
      userName: state => state.user.userName,
      menus: state => state.user.menus,
      tabs: state => state.tabs,
      collapsed: state => state.collapsed
    }),
  },
  data() {
    return {
      isFullscreen: false
    };
  },
  methods: {
    ...mapMutations([
      'setToken',
      'setTabs',
      'addTab',
      'setCollapsed',
    ]),
    openMessageDrawer() {
      this.$refs.messageDrawer.openDrawer();
    },
    resetPwd() {
      this.$Message.info('这是修改密码');
    },
    logout() {
      this.setToken('');
      this.$router.replace('/login');
    },
    closeTab(tabKey) {
      const newTabs = this.$lodash.filter(
        this.tabs,
        item => item.fullPath !== tabKey
      );
      this.setTabs(newTabs);

      // 如果删除本身则跳转到最后一个tab页
      if (this.$route.fullPath === tabKey) {
        this.$router.push(newTabs[newTabs.length - 1].fullPath);
      }
    },
    clickTab(tabKey) {
      const clickTab = this.$lodash.find(
        this.tabs,
        item => item.fullPath === tabKey
      );
      if (clickTab) {
        this.$router.push(clickTab.fullPath);
      }
    },
    clickCloseMenu(name) {
      if (name === 'close-all') {
        this.closeAllTab();
      } else {
        this.closeOtherTab();
      }
    },
    closeAllTab() {
      const newTabs = this.$lodash.filter(
        this.tabs,
        item => item.fullPath === '/index'
      );
      this.setTabs(newTabs);
      this.$router.push('/index');
    },
    closeOtherTab() {
      const newTabs = this.$lodash.filter(
        this.tabs,
        item => item.fullPath === this.$route.fullPath || item.fullPath === '/index'
      );
      this.setTabs(newTabs);
    },
    handleCollpasedChange(state) {
      this.setCollapsed(state);
    },
    toUrl(url) {
      this.$router.push(url);
    },
    handleFullscreen() {
      onOffFullscreen(this.isFullscreen);
    }
  },
  mounted() {
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !this.isFullscreen;
    });
    document.addEventListener('mozfullscreenchange', () => {
      this.isFullscreen = !this.isFullscreen;
    });
    document.addEventListener('webkitfullscreenchange', () => {
      this.isFullscreen = !this.isFullscreen;
    });
    document.addEventListener('msfullscreenchange', () => {
      this.isFullscreen = !this.isFullscreen;
    });
  },
  watch: {
    $route(to) {
      const tab = this.$lodash.find(this.tabs, item => item.fullPath === to.fullPath);

      let { title } = to.meta;
      if (!tab) {
        this.addTab({
          title: title,
          fullPath: to.fullPath,
        });
      }
    },
  },
};
</script>

<style scoped lang="less">

</style>
