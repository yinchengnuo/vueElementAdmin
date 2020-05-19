<template>
  <div class="PagePublicChart">
    <el-button icon="el-icon-back" @click="$router.replace({ path: '/' })">回到首页</el-button>
  </div>
</template>

<script>
export default {
  name: 'PagePublicChart',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {
    const random = () => Math.floor(Math.random() * 100)
    new window.roughViz.BarH(
      {
        element: '.PagePublicChart',
        title: 'rough-viz',
        data: {
          values: Array(12).fill(0).map(e => random()),
          labels: Array(12).fill(0).map((e, i) => `${this.$options.filters.numToZH(i + 1)}月`)
        },
        fillStyle: 'zigzag-line',
        highlight: 'gold'
      }
    )
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .PagePublicChart {
    @include flex();
    padding: 8px;
    box-sizing: border-box;
    min-height: calc(100vh - 84px);
    .el-button {
      top: 8px;
      left: 8px;
      position: fixed;
    }
  }
</style>
