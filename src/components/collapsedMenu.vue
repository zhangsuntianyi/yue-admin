<template>
  <Dropdown ref="dropdown"
            @on-click="handleClick"
            :transfer="hideTitle"
            placement="right-end">
    <!-- 递归的上级菜单 -->
    <!-- 顶级菜单通过hideTitle控制只显示图标 -->
    <a v-if="hideTitle" class="drop-menu-a" type="text">
      <Icon :type="menu.icon" :size="rootIconSize"/>
    </a>
    <!-- 不是顶级菜单的submenu显示图标+标题 -->
    <DropdownItem v-else>
      <Icon :type="menu.icon" :size="16"/>
      <span class="menu-title">{{ menu.name }}</span>
      <Icon type="ios-arrow-forward" :size="16"
            style="margin-left: 6px"></Icon>
    </DropdownItem>

    <!-- 子级菜单 -->
    <DropdownMenu ref="dropdown" slot="list">
      <template v-for="child in menu.children">
        <CollapsedMenu v-if="child.children && child.children.length > 0"
                       :menu="child"
                       :key="`drop-${child.id}`"
                       :root-icon-size="16"></CollapsedMenu>
        <DropdownItem v-else :key="`drop-${child.id}`" :name="child.url">
          <Icon :type="child.icon" :size="16"/>
          <span class="menu-title">{{ child.name }}</span>
        </DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
import { findNodeUpperByClasses } from '../utils/utils';

export default {
  name: 'CollapsedMenu',
  props: {
    // 菜单数据
    menu: {
      type: Object,
    },
    // 菜单是否显示标题
    hideTitle: {
      type: Boolean,
      default: false,
    },
    // 根节点图标大小
    rootIconSize: {
      type: Number,
      default: 30,
    },
  },
  methods: {
    handleClick(name) {
      this.$router.push(name);
    },
  },
  mounted () {
    let dropdown = findNodeUpperByClasses(this.$refs.dropdown.$el, ['ivu-select-dropdown', 'ivu-dropdown-transfer']);
    if (dropdown) {
      dropdown.style.overflow = 'visible';
    }
  }
};
</script>

<style scoped lang="less">

</style>
