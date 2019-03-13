<template>
  <div>
    <!-- title -->
    <h2>富文本</h2>
    <Divider />

    <a href="http://www.wangeditor.com/" target="_blank">wangEditor文档</a>
    <Editor ref="editor" :cache="false" @on-change="handleEdit"/>
    <div v-html="editHtml" style="margin-top: 10px;"></div>
  </div>
</template>

<script>
import { Editor } from '../../../components/editor';

export default {
  name: 'editor',
  components: {
    Editor
  },
  data() {
    return {
      editHtml: ''
    };
  },
  methods: {
    handleEdit(html) {
      this.editHtml = html;
    }
  }
}
</script>

<style scoped>

</style>
