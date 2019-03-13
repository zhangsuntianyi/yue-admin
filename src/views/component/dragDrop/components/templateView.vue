<template>
  <Draggable :class="[templateBodyClass]"
             :list="templates"
             :options="templateOptions"
             @add="handleAdd($event)"
             @update="handleUpdate($event)">
    <Card name="templateItem"
          v-for="(item, index) in templates"
          :class="[
            dragClass,
            templateClass,
            item.rightIcon ? templateIconClass : '',
            item.key === 'dateRange' ? templateRangeClass : '',
            item.key === 'detail' && hasDetail ? templateDetailClass : '',
          ]"
          :bordered="false" dis-hover
          :key="`${hasDetail ? 'template_' : 'detail_'}${item.key}_${index}`"
          @click.native="handleClick($event, item)">
      <!--删除按钮-->
      <template v-if="hasDetail && item.key === 'detail'">
        <div class="close-icon"
             @click="handleDelete($event, index)"
             @mouseover="handleMouseover($event)"
             @mouseout="handleMouseout($event)">
          <Icon type="md-close" size="16"/>
        </div>
      </template>
      <template v-else>
        <div class="close-icon"
             @click="handleDelete($event, index)">
          <Icon type="md-close" size="16"/>
        </div>
      </template>

      <!--时间区间-->
      <template v-if="item.key === 'dateRange'">
        <div class="rang-field">
          <label class="field-label">{{ item.label1 }}</label>
          <span class="field-placeholder">{{ `${item.placeholder}${item.required ? '（必填）' : ''}` }}</span>
          <span v-if="item.rightIcon" class="field-icon">
            <Icon :type="item.rightIcon" size="20"/>
          </span>
        </div>
        <Divider class="range-divider"/>
        <div class="rang-field">
          <label class="field-label">{{ item.label2 }}</label>
          <span class="field-placeholder">{{ `${item.placeholder}${item.required ? '（必填）' : ''}` }}</span>
          <span v-if="item.rightIcon" class="field-icon">
            <Icon :type="item.rightIcon" size="20"/>
          </span>
        </div>
        <template v-if="item.autoCalc">
          <Divider class="range-divider"/>
          <div class="rang-field">
            <label class="field-label">{{ `${item.autoLabel}（${item.format === 'yyyy-MM-dd HH:mm' ? '小时' : '天'}）` }}</label>
          </div>
        </template>
      </template>

      <!--说明文字-->
      <template v-else-if="item.key === 'comment'">
        <p class="break-word">{{ item.comment }}</p>
      </template>

      <!--明细-->
      <template v-else-if="hasDetail && item.key === 'detail'">
        <div class="detail-title"
             @mouseover="handleMouseover($event)"
             @mouseout="handleMouseout($event)">{{ item.label }}</div>
        <TemplateView :detail-index="index"
                      :templates="item.details"
                      :template-options="detailOptions"
                      :template-body-class="detailBodyClass"
                      :drag-class="dragClass"
                      :template-class="detailClass"
                      :template-icon-class="detailIconClass"
                      :template-range-class="detailRangeClass"
                      @click-item="handleClickItem"
                      @add-item="handleAddItem"
                      @update-item="handleUpdateItem"
                      @delete-item="handleDeleteItem"></TemplateView>
        <div class="detail-bottom"
             @mouseover="handleMouseover"
             @mouseout="handleMouseout">
          <Icon type="md-add" :size="20"></Icon>
          <span>{{ item.addName }}</span>
        </div>
      </template>

      <!--输入框或选择框-->
      <template v-else>
        <div class="field">
          <label class="field-label">{{ item.label }}</label>
          <span class="field-placeholder">{{ `${item.placeholder}${item.required ? '（必填）' : ''}` }}</span>
          <span v-if="item.rightIcon" class="field-icon">
            <Icon :type="item.rightIcon" size="20"/>
          </span>
        </div>
        <div v-if="item.cnFormat" class="cn-format">大写：壹万元整（示例）</div>
      </template>
    </Card>
  </Draggable>
</template>

<script>
import Draggable from 'vuedraggable';

export default {
  name: 'TemplateView',
  components: {
    Draggable
  },
  props: {
    templates: {
      type: Array,
      default: () => []
    },
    hasDetail: {
      type: Boolean,
      default: false
    },
    dragClass: String,
    // 父级
    templateOptions: Object,
    templateBodyClass: String,
    templateClass: String,
    templateIconClass: String,
    templateRangeClass: String,
    templateDetailClass: String,
    // 明细
    detailOptions: Object,
    detailBodyClass: String,
    detailClass: String,
    detailIconClass: String,
    detailRangeClass: String,
  },
  methods: {
    handleClick(event, widget) {
      event.stopPropagation();
      this.$emit('click-item', event.currentTarget, widget);
    },
    handleClickItem(target, widget) {
      this.$emit('click-item', target, widget);
    },
    handleAdd(event) {
      this.$emit('add-item', event);
    },
    handleAddItem(event) {
      this.$emit('add-item', event);
    },
    handleUpdate(event) {
      this.$emit('update-item', event);
    },
    handleUpdateItem(event) {
      this.$emit('update-item', event);
    },
    handleDelete(event, index) {
      event.stopPropagation();
      this.$emit('delete-item', event.currentTarget.parentNode.parentNode, index);
    },
    handleDeleteItem(target, index) {
      this.$emit('delete-item', target, index);
    },
    handleMouseover(event) {
      const parent = event.currentTarget.parentNode.parentNode;
      parent.classList.add('hover');
    },
    handleMouseout(event) {
      const parent = event.currentTarget.parentNode.parentNode;
      parent.classList.remove('hover');
    }
  }
}
</script>

<style scoped>

</style>
