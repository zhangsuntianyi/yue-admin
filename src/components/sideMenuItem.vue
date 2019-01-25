<template>
  <Submenu :name="menu.url">
    <template slot="title">
      <Icon :type="menu.icon" :size="16"/>
      <span>{{ menu.name }}</span>
    </template>
    <template v-for="child in menu.children">
      <SideMenuItem v-if="child.children && child.children.length > 0"
                    :key="`menu-${child.id}`"
                    :menu="child"></SideMenuItem>
      <MenuItem v-else
                :name="child.url" :to="child.url"
                :key="`menu-${child.id}`">
        <Icon :type="child.icon" :size="16"/>
        <span>{{ child.name }}</span>
      </MenuItem>
    </template>
  </Submenu>
</template>
<script>

export default {
  name: 'SideMenuItem',
  props: {
    // 菜单数据
    menu: {
      type: Object,
    }
  }
};
</script>
