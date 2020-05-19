<template>
  <div class="PagePublicPage">
    <h1><span style="color: red;">*</span> 部分后台可能会用到一些不需要登陆就可以访问的页面，比如活动实时数据追踪大屏展示等。</h1>
    <el-button type="primary" @click="toPublic">前往</el-button>
  </div>
</template>

<script>
export default {
  name: 'PagePublicPage',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    async toPublic() {
      await this.$store.dispatch('user/logout')
      this.$router.push({ path: '/public-chart' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .PagePublicPage {
    padding: 8px;
    @include flex(column);
    box-sizing: border-box;
    justify-content: space-evenly;
    min-height: calc(100vh - 84px);
  }
</style>
