<template>
  <div class="PageExpressQuery">
    <div class="search">
      <el-input v-model="input" placeholder="请输入物流单号" clearable autofocus />
      <el-button type="primary" icon="el-icon-search" @click="query" />
    </div>
    <el-timeline>
      <el-timeline-item v-for="(activity, index) in list" :key="index" :type="activity.type" :size="activity.size" :timestamp="activity.time">{{ activity.context }}</el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PageExpressQuery',
  props: {},
  data() {
    return {
      input: '557006432812950',
      list: []
    }
  },
  created() {},
  mounted() {
    this.query()
  },
  methods: {
    query() {
      if (this.input.trim()) {
        this._loading = this.$loading()
        axios.get(`https://www.yinchengnuo.com/express?num=${this.input.trim()}`).then(({ data: { data }}) => {
          if (data.lenth) {
            this.list = data
            this.list[0].size = 'large'
            this.list[0].type = 'primary'
          } else {
            this.$message.ino('系统繁忙，请重试')
          }
        }).finally(() => this._loading.close())
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .PageExpressQuery {
    padding: 8px;
    overflow: auto;
    @include flex(column);
    box-sizing: border-box;
    height: calc(100vh - 84px);
    justify-content: flex-start;
    .search {
      @include flex();
      margin-top: 120px;
      .el-input {
        width: 240px;
      }
      .el-button {
        margin-left: 8px;
      }
    }
    .el-timeline {
      width: 359px;
      margin-top: 24px;
      padding: 8px;
    }
  }
</style>
