<template>
  <div>
    <!-- title -->
    <h2>部门管理</h2>
    <Divider />

    <Row style="margin-bottom: 5px">
      <Col :span="18">
        <a href="https://github.com/lison16/tree-table-vue" target="_blank">tree-table-vue文档</a>
      </Col>
      <Col :span="6" style="text-align: right">
        <Icon :type="expandAll ? 'md-remove' : 'md-add'"
              @click="openOrClose" :size="20"
              :title="expandAll ? '全部收起' : '全部展开'"/>
      </Col>
    </Row>
    <tree-table stripe
                show-index
                :expand-type="false"
                :selectable="false"
                :is-fold="!expandAll"
                :columns="table.columns"
                :data="table.data" >
      <template slot="icons" slot-scope="{ row }">
        <Icon :type="row.icon" :size="24"/>
      </template>
      <template slot="operation" slot-scope="{ row }">
        <Button type="primary" size="small" @click="editMenu(row.id)">编辑</Button>
        <Button type="error" size="small" @click="deleteMenu(row.id)"
                style="margin-left: 10px">删除</Button>
      </template>
    </tree-table>
  </div>
</template>

<script>
import MenuApi from '../../../apis/system/menu';

export default {
  name: 'index',
  data() {
    const columns = [
      {
        title: '菜单',
        key: 'name',
        minWidth: 300
      },
      {
        title: '权限字符串',
        key: 'permission',
        minWidth: 300
      },
      {
        title: '地址',
        key: 'url',
        minWidth: 300
      },
      {
        title: '图标',
        key: 'icon',
        type: 'template',
        template: 'icons',
        width: 200
      },
      {
        title: '操作',
        type: 'template',
        template: 'operation',
        width: 180
      }
    ];

    return {
      expandAll: false,
      table: {
        data: [],
        columns,
        loading: false
      }
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      MenuApi.getMenus((responseData) => {
        this.table.data = responseData.menu;
      })
    },
    openOrClose() {
      this.expandAll = !this.expandAll;
    },
    editMenu(id) {
      this.$Message.info(`编辑：${id}`);
    },
    deleteMenu(id) {
      this.$Message.info(`删除：${id}`);
    }
  }
}
</script>

<style scoped>

</style>
