<template>
  <error-content code="500" desc="Oh~~鬼知道服务器经历了什么~" :src="src"/>
</template>

<script>
import error500 from '../../../public/image/error/error-500.svg';
import errorContent from './components/error-content.vue';

export default {
  name: 'error_500',
  components: {
    errorContent
  },
  data () {
    return {
      src: error500
    }
  }
}
</script>
