<template>
  <div ref="lineCharts" :style="{ 'width': width, 'height': height }"></div>
</template>

<script>
import echarts from 'echarts';
import macarons from './macarons.json';

import { on, off } from '../../utils/utils';

echarts.registerTheme('macarons', macarons.theme);
export default {
  name: 'LineCharts',
  props: {
    title: {
      type: String,
      default: '折线图'
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
      lineCharts: null
    };
  },
  methods: {
    resize() {
      this.lineCharts.resize();
    },
    setValue(seriesData) {
      this.$nextTick(() => {
        this.lineCharts.setOption({
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
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
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
          boundaryGap: false,
          data: this.$props.xAxis,
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
    this.$lodash.forEach(this.$props.legend, (seriesName, index) => {
      const label = this.$props.legend.length - 1 === index ? {
        normal: {
          show: true,
          position: 'top'
        }
      } : null;
      series.push({
        name: seriesName,
        type: 'line',
        stack: '总量',
        label: label,
        areaStyle: {},
        data: [],
      });
    });
    option.series = series;

    this.$nextTick(() => {
      this.lineCharts = echarts.init(this.$refs.lineCharts, 'macarons');
      this.lineCharts.setOption(option);
      on(window, 'resize', this.resize);
    });
  },
  beforeDestroy() {
    off(window, 'resize', this.resize);
  },
};
</script>

<style scoped>
  .charts {
    height: 50vh;
    min-height: 451px;
    margin-top: 10px;
  }
</style>
