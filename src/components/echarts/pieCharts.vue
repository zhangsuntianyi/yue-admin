<template>
  <div ref="pieCharts" :style="{ 'width': width, 'height': height }"></div>
</template>

<script>
import echarts from 'echarts';
import macarons from './macarons.json';

import { on, off } from '../../utils/utils';

echarts.registerTheme('macarons', macarons.theme);
export default {
  name: 'PieCharts',
  props: {
    title: {
      type: String,
      default: '饼图'
    },
    subTitle: String,
    legend: Array,
    seriesName: {
      type: String,
      default: '数据'
    },
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
      pieCharts: null
    };
  },
  methods: {
    resize() {
      this.pieCharts.resize();
    },
    setValue(seriesData) {
      this.$nextTick(() => {
        this.pieCharts.setOption({
          series: [
            {
              name: this.$props.seriesName,
              data: seriesData
            }
          ]
        });
      });
    },
  },
  mounted() {
    const option = {
      title: {
        text: this.$props.title,
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: this.$props.legend
      },
      series: [
        {
          name: this.$props.seriesName,
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    // 设置副标题
    if (this.$props.subTitle && this.$props.subTitle !== '') {
      option.title.subtext = this.$props.subTitle;
    }

    this.$nextTick(() => {
      this.pieCharts = echarts.init(this.$refs.pieCharts, 'macarons');
      this.pieCharts.setOption(option);
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
