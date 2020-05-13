<template>
  <div class="PageFastChart">
    <FashChart
      height="90%"
      :data="{
        x: { name: '天', value: list.map(e => `第${e.month}天`) },
        y: { '儿童款': list.map(e => e.c), '成人款': list.map(e => e.h), '老人款': list.map(e => e.o) }
      }"
      title="销售数量对比"
      unit="件"
    />
  </div>
</template>

<script>
import FashChart from '@/components/Charts/FashChart'
export default {
  name: 'PageFastChart',
  components: { FashChart },
  data() {
    return {
      list: []
    }
  },
  created() {},
  mounted() {
    this.getData()
    this.timer = setInterval(() => this.getData(), document.body.offsetWidth > 375 ? 123 : 333)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    getData() {
      if (this.list.length >= 30) {
        clearInterval(this.timer)
        return
      }
      const radom = () => Math.floor(Math.random() * 100)
      this.list.push({ month: this.$options.filters.numToZH(this.list.length + 1), c: radom(), h: radom(), o: radom() })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .PageFastChart {
    height: calc(100vh - 84px);
  }
</style>
