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
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    computedColorsNames() {
      const names = Array(this.chartData.length).fill(0)
      names.forEach((e, i) => {
        names[i] = '第' + this.chartData[i].season + '赛季'
      })
      return names
    },
    computedSeries() {
      const arr = Array(this.chartData.length).fill(0)
      arr.forEach((e, i) => {
        arr[i] = {
          name: this.computedColorsNames[i],
          type: this.type,
          barGap: 0,
          data: this.chartData[i].all
        }
      })
      return arr
    },
    computedDates() {
      const dates = Array(21).fill(0)
      dates.forEach((e, i) => {
        dates[i] = '第' + (i + 1) + '天'
      })
      return dates
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
          data: this.computedColorsNames
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          right: 30,
          top: 'center',
          itemSize: 30,
          itemGap: 20,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: false
            },
            magicType: {
              show: true,
              type: ['line', 'bar']
            },
            restore: {
              show: false
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: true,
        xAxis: [
          {
            name: '日期',
            nameTextStyle: {
              fontSize: 12
            },
            type: 'category',
            axisTick: {
              show: false
            },
            data: this.computedDates
          }],
        yAxis: [
          {
            type: 'value',
            name: '（单位:元)'
          }
        ],
        series: this.computedSeries
      })
    }
  }
}
</script>
