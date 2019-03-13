<template>
  <Card class="data-card" :bordered="false"
        :style="{ 'border-radius': 0, 'background': background }">
    <p slot="title">
      <Icon :type="icon"></Icon>
      {{ title }}
    </p>
    <div slot="extra">
      <Icon type="md-refresh" :size="18" @click="refresh"
            style="margin-left: 6px;color:#ffffff;"/>
    </div>
    <div class="data-number">
      <CountTo :end="value" :useGroup="true" :decimals="decimals"></CountTo>
    </div>
  </Card>
</template>

<script>
import { CountTo } from '../countTo';

export default {
  name: 'DataCard',
  props: {
    title: String,
    icon: String,
    value: {
      type: Number,
      default: 0
    },
    decimals: {
      type: Number,
      default: 0,
    },
    background: {
      type: String,
      default: 'linear-gradient(to left top, #19ebb7, #37ebcd, #56ebdf, #67eaef, #78eaf7)'
    }
  },
  components: {
    CountTo,
  },
  methods: {
    refresh() {
      this.$emit('refresh');
    }
  }
};
</script>

<style scoped lang="less">
  .ivu-card /deep/ .ivu-card-body {
    height: calc(100% - 50px)
  }

  .data-card {
    height: 148px;

    p {
      color: #ffffff;
    }
  }

  .data-number {
    height: 100%;
    position: relative;

    span {
      color: #ffffff;
      font-size: 24px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
