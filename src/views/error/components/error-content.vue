<template>
  <div class="error-page">
    <div class="content-con">
      <img :src="src" :alt="code">
      <div class="text-con">
        <h4>{{ code }}</h4>
        <h5>{{ desc }}</h5>
      </div>
      <div class="back-btn-group">
        <Button size="large" type="text" @click="backHome">返回首页</Button>
        <Button size="large" type="text" @click="backPrev">返回上一页</Button>
      </div>
    </div>
  </div>
</template>

<script>
import './error.less'

export default {
  name: 'error_content',
  props: {
    code: String,
    desc: String,
    src: String
  },
  methods: {
    backHome () {
      this.$router.replace('/index');
    },
    backPrev () {
      this.$router.go(-1);
    }
  },
}
</script>
