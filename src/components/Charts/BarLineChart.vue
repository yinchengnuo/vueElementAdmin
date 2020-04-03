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
    unit: {
      type: String,
      default: ''
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
        color: ['#4C9ECD', '#D970D0', '#5AC4B6'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['精装版', '简约版', '老人版']
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
              show: true,
              readOnly: true,
              title: '销售数据详情',
              lang: ['销售数据详情', '关闭'],
              optionToContent(opt) {
                const axisData = opt.xAxis[0].data
                const series = opt.series
                const rander = () => {
                  let str = ''
                  for (var i = 0, len = axisData.length; i < len; i++) {
                    str += `
                      <tr style="height:30px;">
                        <td>${axisData[i]}</td>
                        <td>${series[0].data[i]}</td>
                        <td>${series[1].data[i]}</td>
                        <td>${series[2].data[i]}</td>
                        <td>${+series[0].data[i] + series[1].data[i] + series[2].data[i]}</td>
                      </tr>
                    `
                  }
                  return str
                }
                const getTypeTotal = i => {
                  return series[i].data.reduce((t, e) => t + e, 0)
                }
                return `
                  <table class="chartTable" border cellpadding="0" cellspacing="0" style="user-select:text;width:100%;text-align:center;border-color:#dfe6ec;">
                    <tbody>
                      <tr style="height:40px;">
                        <th>日期</th>
                        <th>${series[0].name}</th>
                        <th>${series[1].name}</th>
                        <th>${series[2].name}</th>
                        <th>当天合计</th>
                      </tr>
                      ${rander()}
                      <tr style="height:40px;">
                        <th>类型合计</th>
                        <th>${getTypeTotal(0)}</th>
                        <th>${getTypeTotal(1)}</th>
                        <th>${getTypeTotal(2)}</th>
                        <th>${getTypeTotal(0) + getTypeTotal(1) + getTypeTotal(2)}</th>
                      </tr>
                `
              }
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
            data: this.chartData.date
          }],
        yAxis: [
          {
            type: 'value',
            name: this.unit ? `（单位: ${this.unit})` : this.type === 'bar' ? '（单位:套)' : '（单位:元)'
          }
        ],
        series: [
          {
            name: '精装版',
            type: this.type,
            barGap: 0,
            data: this.chartData.hard
          },
          {
            name: '简约版',
            type: this.type,
            data: this.chartData.simple
          },
          {
            name: '老人版',
            type: this.type,
            data: this.chartData.old
          }
        ]
      })
    }
  }
}
</script>
