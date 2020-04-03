<template>
  <div class="zbsrepair">
    <el-time-picker
      v-model="value"
      is-range
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      placeholder="选择时间范围"
    />
    <el-button type="primary" :loading="loading" @click="set(0)">...设置维护中...</el-button>
    <el-button type="primary" :loading="loading" @click="set(1)">取消维护状态</el-button>
  </div>
</template>

<script>
import { set_repair } from '@/api/AROOT'
export default {
  name: 'ZbsRepair',
  data() {
    return {
      loading: false,
      value: [new Date(new Date(+new Date() + 86400000).getFullYear(), new Date(+new Date() + 86400000).getMonth() + 1, new Date(+new Date() + 86400000).getDate(), 2, 0), new Date(new Date(+new Date() + 86400000).getFullYear(), new Date(+new Date() + 86400000).getMonth() + 1, new Date(+new Date() + 86400000).getDate(), 6, 0)]
    }
  },
  methods: {
    set(cancel) {
      this.loading = true
      set_repair({
        start: cancel ? 0 : (+new Date(this.value[0])),
        end: cancel ? 0 : (+new Date(this.value[1]))
      }).then(res => {
        this.loading = false
        this.$message.success('设置成功')
      }).catch(e => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang='scss'>
  .zbsrepair {
    width: 80%;
    margin: 345px auto;
    text-align: center
  }
</style>
