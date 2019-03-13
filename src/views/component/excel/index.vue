<template>
  <div>
    <!-- title -->
    <h2>导入导出</h2>

    <Divider />

    <Row>
      <Col :span="24">
        <Upload action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx"
                class="upload-button">
          <Button type="primary" icon="md-cloud-upload" :loading="uploadLoading"
                  @click="handleUploadFile">导入excel</Button>
        </Upload>
        <Button type="success" icon="md-cloud-download" style="margin-left: 10px"
                :loading="exportLoading"
                @click="handleExportExcel">导出excel</Button>
      </Col>
      <Col :span="24">
        <div class="ivu-upload-list-file" v-if="file !== null">
          <Icon type="ios-stats"></Icon>
          {{ file.name }}
          <Icon v-show="showRemoveFile" type="ios-close" class="ivu-upload-list-remove"
                @click.native="handleRemove()"></Icon>
        </div>

        <transition name="fade">
          <Progress v-if="showProgress" :percent="progressPercent" :stroke-width="2">
            <div v-if="progressPercent === 100">
              <Icon type="ios-checkmark-circle"></Icon>
              <span>成功</span>
            </div>
          </Progress>
        </transition>
      </Col>
    </Row>

    <Table v-if="file !== null" stripe :columns="table.columns"
           :data="table.data" :loading="table.loading"
           class="margin-top-10"></Table>
  </div>
</template>

<script>
import { readExcel, exportExcel } from '../../../utils/excel';

export default {
  name: 'index',
  data() {
    return {
      uploadLoading: false,
      exportLoading: false,
      showRemoveFile: false,
      showProgress: false,
      progressPercent: 0,
      file: null,
      table: {
        data: [],
        columns: [],
        loading: false,
      },
    };
  },
  methods: {
    initUpload() {
      this.file = null;
      this.showProgress = false;
      this.progressPercent = 0;
      this.table.data = [];
      this.table.columns = [];
    },
    handleUploadFile() {
      this.initUpload();
    },
    handleBeforeUpload(file) {
      const fileExt = file.name.split('.').pop().toLocaleLowerCase();
      if (fileExt === 'xlsx' || fileExt === 'xls') {
        this.readFile(file);
        this.file = file;
      } else {
        this.$Notice.warning({
          title: '文件类型错误',
          desc: `文件：${file.name}不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。`,
        });
      }
      return false;
    },
    // 读取文件
    readFile(file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadstart = () => {
        this.uploadLoading = true;
        this.table.loading = true;
        this.showProgress = true;
      };
      reader.onprogress = (e) => {
        this.progressPercent = Math.round((e.loaded / e.total) * 100);
      };
      reader.onerror = () => {
        this.$Message.error('文件读取出错');
      };
      reader.onload = (e) => {
        this.$Message.info('文件读取成功');
        const data = e.target.result;
        const { header, results } = readExcel(data);
        const columns = [
          {
            title: '编号',
            type: 'index',
            width: 60,
            align: 'center',
          },
        ];
        this.$lodash.forEach(header, (item) => {
          columns.push({
            title: item,
            key: item
          });
        });
        this.table.data = results;
        this.table.columns = columns;
        this.uploadLoading = false;
        this.table.loading = false;
        this.showRemoveFile = true;
      };
    },
    handleRemove() {
      this.initUpload();
      this.$Message.info('上传的文件已删除！');
    },
    handleExportExcel() {
      if (this.table.data.length === 0) {
        this.$Notice.error({
          title: '错误',
          desc: '没有可导出的数据',
        });
        return;
      }

      this.exportLoading = true;

      const exportData = [];
      // 写入标题
      const titles = [];
      this.$lodash.forEach(this.table.columns, (column) => {
        titles.push(column.title);
      });
      exportData.push(titles);

      // 写入数据
      this.$lodash.forEach(this.table.data, (item, index) => {
        const data = [
          this.$lodash.toString(index + 1)
        ];
        this.$lodash.forEach(titles, (title) => {
          if (title !== '编号') {
            data.push(item[title] || '');
          }
        });
        exportData.push(data);
      });
      exportExcel(exportData, '导出demo');

      this.exportLoading = false;
    }
  }
};
</script>

<style scoped>
  .upload-button {
    display: inline-block;
  }

  .margin-top-10 {
    margin-top: 10px;
  }
</style>
