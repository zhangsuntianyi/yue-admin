<template>
  <div>
    <!-- title -->
    <h2>首页</h2>
    <Divider />

    <Row :gutter="10">
      <Col :span="4" v-for="(item, index) in cardData"
           :key="index">
        <DataCard :title="item.title"
                  :icon="item.icon"
                  :value="item.value"
                  :background="item.background"
                  @refresh="initCardDataByIndex(index)">
        </DataCard>
      </Col>
    </Row>

    <Row :gutter="10" style="margin-top: 10px;">
      <Col :span="8">
        <ChartsCard title="饼图" @refresh="initPieData">
          <PieCharts slot="charts"
                     ref="pieCharts"
                     :title="pieData.title"
                     :sub-title="pieData.subTitle"
                     :legend="pieData.legend"
                     :series-name="pieData.seriesName"
                     height="48vh"></PieCharts>
        </ChartsCard>
      </Col>
      <Col :span="16">
        <ChartsCard title="柱状图" @refresh="initBarData">
          <BarCharts slot="charts"
                     ref="barCharts"
                     :title="barData.title"
                     :sub-title="barData.subTitle"
                     :legend="barData.legend"
                     :x-axis="barData.xAxis"
                     height="48vh"></BarCharts>
        </ChartsCard>
      </Col>
    </Row>

    <ChartsCard style="margin-top: 10px;"
                title="折线图" @refresh="initLineData">
      <LineCharts slot="charts"
                  ref="lineCharts"
                  :title="lineData.title"
                  :sub-title="lineData.subTitle"
                  :legend="lineData.legend"
                  :x-axis="lineData.xAxis"
                  height="48vh"></LineCharts>
    </ChartsCard>
  </div>
</template>

<script>
import { ChartsCard, DataCard } from '../components/dataCard';
import { BarCharts, LineCharts, PieCharts } from '../components/echarts';

export default {
  name: 'index',
  components: {
    DataCard,
    ChartsCard,
    BarCharts,
    LineCharts,
    PieCharts
  },
  data() {
    return {
      cardData: [
        {
          title: '新增用户',
          icon: 'md-person-add',
          value: 0,
          background: 'linear-gradient(to left top, #89f7fe, #66a6ff)'
        },
        {
          title: '累计点击',
          icon: 'md-locate',
          value: 0,
          background: 'linear-gradient(to left top, #38f9d7, #43e97b)'
        },
        {
          title: '新增问答',
          icon: 'md-help-circle',
          value: 0,
          background: 'linear-gradient(to left top, #f6d365, #fda085)'
        },
        {
          title: '分享统计',
          icon: 'md-share',
          value: 0,
          background: 'linear-gradient(to left top, #ffb199, #ff0844)'
        },
        {
          title: '新增互动',
          icon: 'md-chatbubbles',
          value: 0,
          background: 'linear-gradient(to left top, #ff7eb3, #ff758c)'
        },
        {
          title: '新增页面',
          icon: 'md-map',
          value: 0,
          background: 'linear-gradient(to left top, #b6cee8, #f578dc)'
        }
      ],
      pieData: {
        title: '我是饼图',
        subTitle: '啦啦啦啦',
        legend: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
        seriesName: '访问量'
      },
      barData: {
        title: '我是柱状图',
        subTitle: '啦啦啦啦',
        legend: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
        xAxis: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      },
      lineData: {
        title: '我是折线图',
        subTitle: '啦啦啦啦',
        legend: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
        xAxis: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      }
    };
  },
  created() {
    this.initCardData();
    this.initPieData();
    this.initBarData();
    this.initLineData();
  },
  methods: {
    initCardData() {
      this.$lodash.forEach(this.cardData, (item, index) => {
        this.initCardDataByIndex(index);
      });
    },
    initCardDataByIndex(index) {
      const data = this.cardData[index];
      if (data) {
        data.value = Math.floor(Math.random() * 1000);
      }
    },
    initPieData() {
      const seriesData = [];
      this.$lodash.forEach(this.pieData.legend, (name) => {
        seriesData.push({
          name,
          value: Math.floor(Math.random() * 1000)
        });
      });
      this.$nextTick(() => {
        this.$refs.pieCharts.setValue(seriesData);
      });
    },
    initBarData() {
      const seriesData = [];
      this.$lodash.forEach(this.barData.legend, (name) => {
        const data = [];
        this.$lodash.forEach(this.barData.xAxis, () => {
          data.push(Math.floor(Math.random() * 1000));
        });
        seriesData.push({
          name,
          data
        });
      });
      this.$nextTick(() => {
        this.$refs.barCharts.setValue(seriesData);
      });
    },
    initLineData() {
      const seriesData = [];
      this.$lodash.forEach(this.lineData.legend, (name) => {
        const data = [];
        this.$lodash.forEach(this.lineData.xAxis, () => {
          data.push(Math.floor(Math.random() * 5000));
        });
        seriesData.push({
          name,
          data
        });
      });
      this.$nextTick(() => {
        this.$refs.lineCharts.setValue(seriesData);
      });
    }
  }
}
</script>

<style scoped>

</style>
