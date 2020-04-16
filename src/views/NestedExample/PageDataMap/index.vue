<template>
  <div class="PageDataMap">
    <div id="china" style="width:100%;height:100%;" />
  </div>
</template>

<script>
export default {
  name: 'PageDataMap',
  mounted() {
    this.$nextTick(() => this.renderMap())
    this.timer = setInterval(() => {
      this.renderMap()
    }, 3333)
  },
  beforeDestroy() {
    setInterval(this.timer)
  },
  methods: {
    renderMap() {
      const randomValue = () => Math.round(Math.random() * 1000)
      const mockData = [
        { name: '南海诸岛', value: 0 },
        { name: '北京', value: randomValue() },
        { name: '天津', value: randomValue() },
        { name: '上海', value: randomValue() },
        { name: '重庆', value: randomValue() },
        { name: '河北', value: randomValue() },
        { name: '河南', value: randomValue() },
        { name: '云南', value: randomValue() },
        { name: '辽宁', value: randomValue() },
        { name: '黑龙江', value: randomValue() },
        { name: '湖南', value: randomValue() },
        { name: '安徽', value: randomValue() },
        { name: '山东', value: randomValue() },
        { name: '新疆', value: randomValue() },
        { name: '江苏', value: randomValue() },
        { name: '浙江', value: randomValue() },
        { name: '江西', value: randomValue() },
        { name: '湖北', value: randomValue() },
        { name: '广西', value: randomValue() },
        { name: '甘肃', value: randomValue() },
        { name: '山西', value: randomValue() },
        { name: '内蒙古', value: randomValue() },
        { name: '陕西', value: randomValue() },
        { name: '吉林', value: randomValue() },
        { name: '福建', value: randomValue() },
        { name: '贵州', value: randomValue() },
        { name: '广东', value: randomValue() },
        { name: '青海', value: randomValue() },
        { name: '西藏', value: randomValue() },
        { name: '四川', value: randomValue() },
        { name: '宁夏', value: randomValue() },
        { name: '海南', value: randomValue() },
        { name: '台湾', value: randomValue() },
        { name: '香港', value: randomValue() },
        { name: '澳门', value: randomValue() }
      ]
      let max = 0
      let maxIndex = 0
      mockData.forEach((e, i) => {
        if (e.value > max) {
          max = e.value
          maxIndex = i
        }
      })
      const step = Math.floor(max / 6)
      const echarts = window.echarts.init(document.getElementById('china'))
      echarts.setOption({
        backgroundColor: '#FFFFFF',
        tooltip: {
          trigger: 'item',
          alwaysShowContent: true,
          formatter: params => {
            return `
              省份：${params.name} <br />
              排名：${params.seriesIndex + 1} <br />
              数量：${params.value} <br />
            `
          }
        },
        visualMap: {
          show: true,
          x: 'left',
          y: 'bottom',
          splitList: [
            { start: step * 6, end: step * 7, label: `${step * 6} - ${step * 7} 人` },
            { start: step * 5, end: step * 6, label: `${step * 5} - ${step * 6} 人` },
            { start: step * 4, end: step * 5, label: `${step * 4} - ${step * 5} 人` },
            { start: step * 3, end: step * 4, label: `${step * 3} - ${step * 4} 人` },
            { start: step * 2, end: step * 3, label: `${step * 2} - ${step * 3} 人` },
            { start: step * 1, end: step * 2, label: `${step * 1} - ${step * 2} 人` },
            { start: 1, end: step * 1, label: `${1} - ${step * 1} 人` },
            { start: 0, end: 0, label: '0 人' }
          ],
          color: ['#30A6FE', '#44AFFE', '#5CB9FE', '#71C2FE', '#89CDFF', '#A5D8FE', '#C5E5FD', '#EFEFEF']
        },
        series: [{
          name: '人数',
          type: 'map',
          mapType: 'china',
          aspectScale: 1,
          zoom: 1.23,
          label: {
            normal: { show: true },
            emphasis: { show: true }
          },
          data: mockData
        }]
      })
      echarts.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: maxIndex
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .PageDataMap {
    padding: 8px;
    box-sizing: border-box;
    height: calc(100vh - 84px);
  }
</style>
