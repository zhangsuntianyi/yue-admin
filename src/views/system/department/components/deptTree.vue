<template>
  <div ref="dragWrapper"
       class="org-tree-drag-wrapper"
       @mousedown="mousedownView">
    <div class="org-tree-wrapper" :style="orgTreeStyle">
      <v-org-tree v-if="data"
                  :data="data"
                  :horizontal="horizontal"
                  :node-render="nodeRender"
                  :expand-all="expandAll"
                  collapsable></v-org-tree>
    </div>
  </div>
</template>

<script>
import OperationMenu from './operationMenu.vue';

import { on, off } from '../../../../utils/utils';

export default {
  name: 'DeptTree',
  props: {
    zoomHandled: {
      type: Number,
      default: 1
    },
    data: Object,
    horizontal: {
      type: Boolean,
      default: false
    },
    expandAll: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      orgTreeOffsetLeft: 0,
      orgTreeOffsetTop: 0,
      initPageX: 0,
      initPageY: 0,
      oldMarginLeft: 0,
      oldMarginTop: 0,
      canMove: false,
      menus: [
        {
          name: 'edit',
          label: '编辑部门'
        },
        {
          name: 'detail',
          label: '查看部门'
        },
        {
          name: 'new',
          label: '新增子部门'
        },
        {
          name: 'delete',
          label: '删除部门'
        }
      ]
    };
  },
  methods: {
    nodeRender(h, params) {
      return h('div', {
        class: [
          'custom-org-node'
        ]
      }, [
        h(OperationMenu, {
          props: {
            label: params.label,
            data: params,
            menus: this.menus
          },
          on: {
            'menu-click': this.departmentClick
          }
        })
      ]);
    },
    departmentClick(name, data) {
      console.log(name);
      console.log(JSON.stringify(data));
    },
    mousedownView(event) {
      this.canMove = true;
      this.initPageX = event.pageX;
      this.initPageY = event.pageY;
      this.oldMarginLeft = this.orgTreeOffsetLeft;
      this.oldMarginTop = this.orgTreeOffsetTop;
      on(document, 'mousemove', this.mousemoveView);
      on(document, 'mouseup', this.mouseupView);
    },
    mousemoveView(event) {
      if (!this.canMove) {
        return;
      }
      const { pageX, pageY } = event;
      this.orgTreeOffsetLeft = this.oldMarginLeft + pageX - this.initPageX;
      this.orgTreeOffsetTop = this.oldMarginTop + pageY - this.initPageY;
    },
    mouseupView() {
      this.canMove = false;
      off(document, 'mousemove', this.mousemoveView);
      off(document, 'mouseup', this.mouseupView);
    },
  },
  computed: {
    orgTreeStyle () {
      return {
        transform: `translate(-50%, -50%) scale(${this.zoomHandled}, ${
          this.zoomHandled
          })`,
        marginLeft: `${this.orgTreeOffsetLeft}px`,
        marginTop: `${this.orgTreeOffsetTop}px`
      }
    }
  },
}
</script>

<style scoped>

</style>
