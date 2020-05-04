<template>
  <div :class="className" :style="{height:phone?'300px':height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import resize from '@/components/Charts/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: { type: String, default: 'chart' },
    width: { type: String, default: '100%' },
    height: { type: String, default: '540px' },
    type: { type: String, default: 'bar' },
    unit: { type: String, default: '个' },
    title: { type: String, default: '统计图' },
    data: {
      type: Object,
      default: () => ({ x: { name: '', value: [] }, y: {}})
    }
  },
  data() {
    return {
      chart: null,
      phone: document.body.offsetWidth < 521
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.initChart()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.data.x.value.length) {
        this.initChart()
      }
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
        title: { text: this.title, top: 6, left: 'center', textStyle: { color: '#000000', fontWeight: 'bold' }},
        color: ['#4C9ECD', '#D970D0', '#5AC4B6', '#7670D9', ...['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']],
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }},
        legend: { top: 28, right: 8, data: Reflect.ownKeys(this.data.y) },
        toolbox: {
          show: true,
          orient: 'vertical',
          right: 0,
          top: 'center',
          itemSize: this.phone ? 14 : 30,
          itemGap: this.phone ? 6 : 20,
          feature: {
            mark: { show: true },
            dataView: {
              show: true,
              readOnly: true,
              title: this.title,
              lang: [this.title, '关闭'],
              optionToContent: opt => {
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
                        <th>${this.data.x.name}</th>
                        <th>${series[0].name}</th>
                        <th>${series[1].name}</th>
                        <th>${series[2].name}</th>
                        <th>${this.data.x.name}合计</th>
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
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            name: this.data.x.name,
            nameTextStyle: { fontSize: 12 },
            type: 'category',
            axisTick: { show: false },
            data: this.data.x.value
          }
        ],
        yAxis: [{ type: 'value', name: this.unit }],
        series: [
          ...Reflect.ownKeys(this.data.y).map(key => ({
            name: key,
            type: this.type,
            data: this.data.y[key]
          }))
        ]
      })
    }
  }
}
</script>
