<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '540px'
    },
    type: {
      type: String,
      default: 'bar'
    },
    chartData: {
      type: Object,
      default() {
        return {
          date: [],
          hard: [],
          simple: [],
          old: []
        }
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      handler() {
        this.initChart()
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['参赛人员人均销售量', '卖货人员人均销售量', '战区参赛人数', '精装版销售量', '简约版销售量', '老人版销售量']
        },
        toolbox: {
          show: false
        },
        calculable: true,
        xAxis: [
          {
            name: '战区',
            nameTextStyle: {
              fontSize: 12
            },
            type: 'category',
            axisTick: {
              show: false
            },
            data: this.chartData.war_name
          }],
        yAxis: [
          {
            type: 'value',
            name: '（单位:人/套)'
          }
        ],
        series: [
          {
            name: '参赛人员人均销售量',
            type: this.type,
            barGap: 0,
            data: this.chartData.joinAverage
          },
          {
            name: '卖货人员人均销售量',
            type: this.type,
            barGap: 0,
            data: this.chartData.soldAverage
          },
          {
            name: '战区参赛人数',
            type: this.type,
            barGap: 0,
            data: this.chartData.num
          },
          {
            name: '精装版销售量',
            type: this.type,
            barGap: 0,
            data: this.chartData.hard
          },
          {
            name: '简约版销售量',
            type: this.type,
            data: this.chartData.simple
          },
          {
            name: '老人版销售量',
            type: this.type,
            data: this.chartData.old
          }
        ]
      })
    }
  }
}
</script>
