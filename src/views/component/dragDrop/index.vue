<template>
  <div>
    <!-- title -->
    <h2>拖拽</h2>

    <Divider />

    <a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue.Draggable文档</a>
    <Row>
      <Col :span="6">
        <h3>控件库</h3>
        <Divider />
        <Draggable :clone="cloneData" :list="widgets" :options="widgetOptions">
          <transition-group type="transition" :name="'flip-list'" tag="div">
            <Card v-for="item in widgets" class="drag-item" :key="`widget_${item.key}`">
              <label>{{ item.label }}</label>
              <img :src="require(`../../../../public/image/template/icons/${item.icon}.png`)"/>
            </Card>
          </transition-group>
        </Draggable>
      </Col>
      <Col :span="12" style="background: #f6f6f6">
        <div class="form-canvas">
          <div :class="['form-canvas-inner', templates.length > 0 ? '' : 'empty']">
            <TemplateView :templates="templates"
                          :has-detail="true"
                          :drag-class="'drag-item'"
                          :template-options="templateOptions"
                          :template-body-class="templateCanvasClass"
                          :template-class="'template-item'"
                          :template-icon-class="'template-icon'"
                          :template-range-class="'template-range'"
                          :template-detail-class="'template-detail'"
                          :detail-options="detailOptions"
                          :detail-body-class="detailCanvasClass"
                          :detail-class="'detail-item'"
                          :detail-icon-class="'template-icon'"
                          :detail-range-class="'detail-range'"
                          @click-item="handleClickItem"
                          @add-item="handleAddItem"
                          @update-item="handleUpdateItem"
                          @delete-item="handleDeleteItem"></TemplateView>
          </div>
        </div>
      </Col>
      <Col :span="6">
        <h3 style="margin: 0 16px">{{ widgetOption ? widgetOption.label : '设置' }}</h3>
        <Divider />
        <Form v-if="widgetOption"
              :model="widgetOption" label-position="top"
              style="margin: 0 16px">
          <FormItem v-if="widgetOption.key !== 'comment' && widgetOption.key !== 'dateRange'">
            <label slot="label" class="field-label-setting">标题</label>
            <Input v-model="widgetOption.label"></Input>
          </FormItem>

          <template v-if="widgetOption.key === 'dateRange'">
            <FormItem>
              <label slot="label" class="field-label-setting">标题1</label>
              <Input v-model="widgetOption.label1"></Input>
            </FormItem>
            <FormItem>
              <label slot="label" class="field-label-setting">标题2</label>
              <Input v-model="widgetOption.label2"></Input>
            </FormItem>
          </template>

          <FormItem v-if="widgetOption.key === 'date' || widgetOption.key === 'dateRange'">
            <label slot="label" class="field-label-setting">日期类型</label>
            <RadioGroup v-model="widgetOption.format">
              <Radio label="yyyy-MM-dd HH:mm">年-月-日 时:分</Radio>
              <br/>
              <Radio label="yyyy-MM-dd">年-月-日</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem v-if="widgetOption.key !== 'comment' && widgetOption.key !== 'detail'
                      && widgetOption.key !== 'image' && widgetOption.key !== 'attachment'">
            <label slot="label" class="field-label-setting">提示文字</label>
            <Input v-model="widgetOption.placeholder"></Input>
          </FormItem>

          <FormItem v-if="widgetOption.key === 'radio' || widgetOption.key === 'checkbox'">
            <label slot="label" class="field-label-setting">选项</label>
            <div v-for="(item, index) in widgetOption.options"
                 :key="`option_${item.value}`"
                 style="margin-bottom: 5px">
              <Input v-model="item.label" style="width: 50%"></Input>
              <Icon type="md-remove-circle" class="option-icon" size="22"
                    @click.native="deleteOption(index)"/>
              <Icon type="md-add-circle" class="option-icon" size="22"
                    @click.native="addOption(index)"/>
            </div>
          </FormItem>

          <FormItem v-if="widgetOption.key !== 'comment' && widgetOption.key !== 'detail'">
            <label slot="label" class="field-label-setting">验证</label>
            <Checkbox v-model="widgetOption.required">必填</Checkbox>
          </FormItem>

          <FormItem v-if="widgetOption.key === 'amount' || widgetOption.key === 'formula'">
            <label slot="label" class="field-label-setting">大写</label>
            <Checkbox v-model="widgetOption.cnFormat">显示大写</Checkbox>
          </FormItem>

          <template v-if="widgetOption.key === 'dateRange'">
            <FormItem>
              <label slot="label" class="field-label-setting">自动计算时长</label>
              <Checkbox v-model="widgetOption.autoCalc">开启</Checkbox>
            </FormItem>
            <FormItem v-if="widgetOption.autoCalc">
              <label slot="label" class="field-label-setting">标题</label>
              <Input v-model="widgetOption.autoLabel"></Input>
            </FormItem>
          </template>

          <FormItem v-if="widgetOption.key === 'detail'">
            <label slot="label" class="field-label-setting">动作名称</label>
            <Input v-model="widgetOption.addName"></Input>
          </FormItem>

          <template v-if="widgetOption.key === 'comment'">
            <FormItem>
              <label slot="label" class="field-label-setting">说明文字</label>
              <Input v-model="widgetOption.comment" type="textarea" :rows="4"/>
            </FormItem>
            <FormItem>
              <label slot="label" class="field-label-setting">可以输入链接跳转地址</label>
              <Input v-model="widgetOption.link" type="textarea" :rows="2"/>
            </FormItem>
          </template>
        </Form>
      </Col>
    </Row>
    <Row style="margin-top: 20px">
      <Col :spna="24" style="text-align: center">
        <Button @click="saveTemplate">提交</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import TemplateView from './components/templateView.vue';

import './index.less';

export default {
  name: 'index',
  components: {
    Draggable,
    TemplateView
  },
  data() {
    return {
      widgets: [
        {
          key: 'input',
          label: '单行输入框',
          icon: 'input',
          placeholder: '请输入',
          required: true
        },
        {
          key: 'textarea',
          label: '多行输入框',
          icon: 'textarea',
          placeholder: '请输入',
          required: true
        },
        {
          key: 'number',
          label: '数字输入框',
          icon: 'number',
          placeholder: '请输入',
          required: true
        },
        {
          key: 'amount',
          label: '金额',
          icon: 'amount',
          placeholder: '请输入',
          cnFormat: true,
          required: true
        },
        {
          key: 'radio',
          label: '单选框',
          icon: 'radio',
          placeholder: '请选择',
          rightIcon: 'ios-arrow-forward',
          required: true,
          options: [
            {
              value: '1',
              label: '选项1'
            },
            {
              value: '2',
              label: '选项2'
            },
            {
              value: '3',
              label: '选项3'
            }
          ]
        },
        {
          key: 'checkbox',
          label: '多选框',
          icon: 'checkbox',
          placeholder: '请选择',
          rightIcon: 'ios-arrow-forward',
          required: true,
          options: [
            {
              value: '1',
              label: '选项1'
            },
            {
              value: '2',
              label: '选项2'
            },
            {
              value: '3',
              label: '选项3'
            }
          ]
        },
        {
          key: 'date',
          label: '日期',
          icon: 'date',
          placeholder: '请选择',
          rightIcon: 'ios-arrow-forward',
          format: 'yyyy-MM-dd',
          required: true
        },
        {
          key: 'dateRange',
          label: '日期区间',
          icon: 'dateRange',
          label1: '开始时间',
          label2:  '结束时间',
          placeholder: '请选择',
          rightIcon: 'ios-arrow-forward',
          format: 'yyyy-MM-dd',
          required: true,
          autoCalc: false,
          autoLabel: '时长'
        },
        {
          key: 'image',
          label: '图片',
          icon: 'image',
          placeholder: '',
          rightIcon: 'ios-camera',
          required: true
        },
        {
          key: 'attachment',
          label: '附件',
          icon: 'attachment',
          placeholder: '',
          rightIcon: 'md-attach',
          required: true
        },
        {
          key: 'formula',
          label: '计算公式',
          icon: 'formula',
          placeholder: '自动计算数值',
          cnFormat: true,
          required: true
        },
        {
          key: 'comment',
          label: '说明文字',
          icon: 'comment',
          comment: '请输入说明文字',
          link: '',
        },
        {
          key: 'detail',
          label: '明细',
          icon: 'detail',
          addName: '新增明细',
          details: []
        },
      ],
      templateCanvasClass: 'form-canvas-body',
      detailCanvasClass: 'detail-body',
      cloneWidget: {},
      widgetOption: null,
      templates: []
    }
  },
  computed: {
    // 模板项配置
    widgetOptions() {
      return {
        animation: 0,
        ghostClass: 'ghost',
        // 分组
        group: {
          name: 'shared',
          pull: 'clone',
          revertClone: false
        },
        // 禁止拖动排序
        sort: false
      };
    },
    templateOptions() {
      return {
        animation: 0,
        ghostClass: 'ghost',
        group: {
          // 只允许放置shared的控件,禁止pull
          put: 'shared'
        }
      };
    },
    detailOptions() {
      return {
        animation: 0,
        ghostClass: 'ghost',
        group: {
          // 只允许放置shared的控件,禁止pull
          put: () => {
            if (this.cloneWidget && this.cloneWidget.key === 'detail') {
              return false;
            }
            return 'shared';
          }
        }
      };
    }
  },
  methods: {
    // 克隆,深拷贝对象
    cloneData(original) {
      this.cloneWidget = JSON.parse(JSON.stringify(original));
      // 深拷贝对象，防止默认空对象被更改
      return this.cloneWidget;
    },
    handleAddItem(event) {
      const widgetItem = this.widgets[event.oldIndex];
      if (event.to.className === this.templateCanvasClass) {
        this.templateCount(this.templates, widgetItem);
      } else if (event.to.className === this.detailCanvasClass) {
        const detailIndex = event.to.attributes['detail-index'].nodeValue;
        const detailItem = this.templates[this.$lodash.toInteger(detailIndex)];
        if (detailItem) {
          this.templateCount(detailItem.details, widgetItem);
        }
      }

      // 添加选中样式
      if (event.to.className === this.templateCanvasClass
        || event.to.className === this.detailCanvasClass) {
        this.handleClickItem(event.to.children[event.newIndex], this.cloneWidget);
      }
    },
    templateCount(templates, widgetItem) {
      const widgetKey = widgetItem ? widgetItem.key : '';
      const templateItems = this.$lodash.filter(templates, o => o.key === widgetKey);
      if (templateItems && templateItems.length > 1) {
        if (this.cloneWidget.key === 'dateRange') {
          this.cloneWidget.label1 = `${widgetItem ? widgetItem.label1 : ''}(${templateItems.length - 1})`;
          this.cloneWidget.label2 = `${widgetItem ? widgetItem.label2 : ''}(${templateItems.length - 1})`;
        } else {
          this.cloneWidget.label = `${widgetItem ? widgetItem.label : ''}(${templateItems.length - 1})`;
        }
      }
    },
    handleClickItem(target, widget) {
      // 添加选中样式
      this.$lodash.forEach(document.getElementsByName('templateItem'), (element) => {
        element.classList.remove('active');
      });
      target.classList.add('active');
      this.widgetOption = widget;
    },
    handleUpdateItem(event) {
      let selectWidget;
      if (event.to.className === this.templateCanvasClass) {
        selectWidget = this.templates[event.newIndex];
      } else if (event.to.className === this.detailCanvasClass) {
        const detailIndex = event.to.attributes['detail-index'].nodeValue;
        const detailItem = this.templates[this.$lodash.toInteger(detailIndex)];
        if (detailItem) {
          selectWidget = detailItem.details[event.newIndex];
        }
      }

      // 添加选中样式
      if (event.to.className === this.templateCanvasClass
        || event.to.className === this.detailCanvasClass) {
        this.handleClickItem(event.to.children[event.newIndex], selectWidget);
      }
    },
    handleDeleteItem(target, index) {
      if (this.$lodash.includes(target.classList, 'detail-item')) {
        const detailIndex = target.parentNode.attributes['detail-index'].nodeValue;
        const detailItem = this.templates[this.$lodash.toInteger(detailIndex)];
        if (detailItem) {
          detailItem.details = this.deleteItem(detailItem.details, index);
        }
      } else {
        this.templates = this.deleteItem(this.templates, index);
      }
      this.widgetOption = null;
    },
    deleteOption(index) {
      if (this.widgetOption.options.length === 1) {
        this.$Notice.error({
          title: '错误',
          desc: '请至少保留一个选项'
        });
        return;
      }

      this.widgetOption.options = this.deleteItem(this.widgetOption.options, index);
    },
    deleteItem(options, index) {
      const newOptions = [];
      this.$lodash.forEach(options, (n, i) => {
        if (i !== index) {
          newOptions.push(n);
        }
      });
      return newOptions;
    },
    addOption(index) {
      const maxOption = this.$lodash.maxBy(
        this.widgetOption.options,
        (o) => this.$lodash.toInteger(o.value)
      );
      const maxValue = maxOption ? this.$lodash.add(this.$lodash.toInteger(maxOption.value), 1) : 1;
      this.widgetOption.options.splice(index + 1, 0, {
        value: this.$lodash.toString(maxValue),
        label: `选项${maxValue}`
      });
    },
    saveTemplate() {
      console.log(this.templates);
    }
  }
}
</script>

<style scoped>

</style>
