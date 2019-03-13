<template>
  <div ref="barCharts" :style="{ 'width': width, 'height': height }"></div>
</template>

<script>
import echarts from 'echarts';
import macarons from './macarons.json';

import { on, off } from '../../utils/utils';

echarts.registerTheme('macarons', macarons.theme);
export default {
  name: 'BarCharts',
  props: {
    title: {
      type: String,
      default: '柱状图'
    },
    subTitle: String,
    legend: Array,
    xAxis: Array,
    height: {
      type: String,
      default: '480px'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      barCharts: null
    };
  },
  methods: {
    resize() {
      this.barCharts.resize();
    },
    setValue(seriesData) {
      this.$nextTick(() => {
        this.barCharts.setOption({
          series: seriesData,
        });
      });
    },
  },
  mounted() {
    const option = {
      title: {
        text: this.$props.title,
        x: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: this.$props.legend,
        top: '30',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '70',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: this.$props.xAxis,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [],
    };
    // 设置副标题
    if (this.$props.subTitle && this.$props.subTitle !== '') {
      option.title.subtext = this.$props.subTitle;
      option.legend.top = '48';
      option.grid.top = '88';
    }
    // 系列列表
    const series = [];
    this.$lodash.forEach(this.$props.legend, (seriesName) => {
      series.push({
        name: seriesName,
        type: 'bar',
        data: [],
      });
    });
    option.series = series;

    this.$nextTick(() => {
      this.barCharts = echarts.init(this.$refs.barCharts, 'macarons');
      this.barCharts.setOption(option);
      on(window, 'resize', this.resize);
    });
  },
  beforeDestroy() {
    off(window, 'resize', this.resize);
  },
};
</script>

<style scoped>

</style>
