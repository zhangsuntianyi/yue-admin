<template>
  <span :class="[countClass]" :id="counterId">{{ init }}</span>
</template>

<script>
import CountUp from 'countup';

export default {
  name: 'CountTo',
  props: {
    init: {
      type: Number,
      default: 0,
    },
    /**
     * @description 起始值，即动画开始前显示的数值
     */
    startVal: {
      type: Number,
      default: 0,
    },
    /**
     * @description 结束值，即动画结束后显示的数值
     */
    end: {
      type: Number,
      default: 0,
    },
    /**
     * @description 保留几位小数
     */
    decimals: {
      type: Number,
      default: 0,
    },
    /**
     * @description 分隔整数和小数的符号，默认是小数点
     */
    decimal: {
      type: String,
      default: '.',
    },
    /**
     * @description 动画持续的时间，单位是秒
     */
    duration: {
      type: Number,
      default: 1,
    },
    /**
     * @description 动画延迟开始的时间，单位是秒
     */
    delay: {
      type: Number,
      default: 0,
    },
    /**
     * @description 是否禁用easing动画效果
     */
    unEasing: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 是否使用分组，分组后每三位会用一个符号分隔
     */
    useGroup: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 用于分组(usegroup)的符号
     */
    separator: {
      type: String,
      default: ',',
    },
    countClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      counter: null,
    };
  },
  computed: {
    counterId() {
      // eslint-disable-next-line
      return `count_to_${this._uid}`;
    },
  },
  mounted() {
    this.$nextTick(() => {
      const endVal = this.end || 0;
      this.counter = new CountUp(
        this.counterId,
        this.startVal,
        endVal,
        this.decimals,
        this.duration,
        {
          useEasing: !this.unEasing,
          useGrouping: this.useGroup,
          separator: this.separator,
          decimal: this.decimal,
        },
      );
      setTimeout(() => {
        if (!this.counter.error) {
          this.counter.start();
        }
      }, this.delay);
    });
  },
  watch: {
    end(newVal) {
      const endVal = newVal || 0;
      this.counter.update(endVal);
    },
  },
};
</script>
