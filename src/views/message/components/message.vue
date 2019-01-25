<template>
  <Drawer title="消息中心" v-model="showDrawer"
          :styles="{padding: '16px 0'}">
    <CellGroup>
      <Cell>
        <div>消息标题</div>
        <Badge :count="10" slot="extra" />
        <div slot="label">消息内容</div>
      </Cell>
      <Cell>
        <div>消息标题</div>
        <Badge :count="10" slot="extra" />
        <div slot="label">消息内容</div>
      </Cell>
      <Cell>
        <div>消息标题</div>
        <Badge :count="10" slot="extra" />
        <div slot="label">消息内容</div>
      </Cell>
      <Cell>
        <div>消息标题</div>
        <Badge :count="10" slot="extra" />
        <div slot="label">消息内容</div>
      </Cell>
    </CellGroup>
  </Drawer>
</template>

<script>
export default {
  name: 'message',
  data() {
    return {
      showDrawer: false,
    };
  },
  methods: {
    openDrawer() {
      this.showDrawer = true;
    }
  },
};
</script>

<style scoped>

</style>
