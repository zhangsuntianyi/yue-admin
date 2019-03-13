<template>
  <div style="height: calc(100% - 128px);">
    <!-- title -->
    <h2>部门管理</h2>
    <Divider />

    <Card style="height: 100%;width: 100%;overflow:hidden">
      <div class="department-outer">
        <div class="api-box">
          <a href="https://github.com/lison16/v-org-tree" target="_blank">v-org-tree文档</a>
        </div>
        <div class="revolve-box">
          <Icon :type="expandAll ? 'md-remove' : 'md-add'"
                @click="openOrClose" :size="20"
                :title="expandAll ? '全部收起' : '全部展开'"
                style="margin-right: 10px"/>
          <Icon type="md-refresh" @click="revolve" :size="20"
                :title="horizontal ? '水平展示' : '垂直展示'"/>
        </div>
        <div class="zoom-box">
          <ZoomController v-model="zoom" :min="20" :max="200"></ZoomController>
        </div>
        <div class="view-box">
          <DeptTree v-if="deptTree"
                    ref="deptTree"
                    :data="deptTree"
                    :horizontal="horizontal"
                    :expand-all="expandAll"
                    :zoom-handled="zoomHandled"></DeptTree>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import DeptTree from './components/deptTree.vue';
import ZoomController from './components/zoomController.vue';
import DepartmentApi from '../../../apis/system/department';

import './index.less';

export default {
  name: 'index',
  components: {
    DeptTree,
    ZoomController
  },
  data() {
    return {
      deptTree: null,
      zoom: 100,
      horizontal: false,
      expandAll: true
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      DepartmentApi.getDeptTree((responseData) => {
        this.deptTree = responseData.department;
      })
    },
    openOrClose() {
      this.expandAll = !this.expandAll;
    },
    revolve() {
      this.horizontal = !this.horizontal;
    }
  },
  computed: {
    zoomHandled() {
      return this.zoom / 100;
    }
  }
}
</script>

<style scoped>

</style>
