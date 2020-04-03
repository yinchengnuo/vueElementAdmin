<template>
  <div class="downexcel">
    <el-input v-model="url" placeholder="请输入URL(必须以http/https开头)" @keyup.enter.native="download" />
    <el-button type="primary" :loading="loading" @click="download">下载Excel</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DownExcel',
  data() {
    return {
      loading: false,
      url: ''
    }
  },
  methods: {
    download() {
      this.loading = true
      axios.get(this.url.trim()).then(res => {
        import('@/vendor/Export2Excel').then(excel => {
          const header = []
          const filterVal = []
          Object.keys(res.data.data.list[0]).forEach(e => {
            header.push(e)
            filterVal.push(e)
          })
          const data = res.data.data.list.map(v => filterVal.map(j => v[j]))
          excel.export_json_to_excel({ header, data, filename: `导出数据`, autoWidth: true, bookType: 'xlsx' })
          this.loading = false
        })
      }).catch(e => {
        this.loading = false
        this.$message.error({ message: e.message })
      })
    }
  }
}
</script>

<style lang='scss'>
  .downexcel {
    width: 80%;
    margin: 345px auto;
    .el-input {
      width: 80%;
    }
  }
</style>
