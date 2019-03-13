<template>
  <Dropdown trigger="click"
            @on-click="menuClick">
    {{ label }}
    <DropdownMenu slot="list">
      <DropdownItem v-for="(item, index) in menus"
                    :name="item.name"
                    :key="index">{{ item.label }}</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
export default {
  name: 'OperationMenu',
  props: {
    label: String,
    data: Object,
    menus: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    menuClick(name) {
      this.$emit('menu-click', name, this.data);
    }
  }
}
</script>

<style scoped>

</style>
