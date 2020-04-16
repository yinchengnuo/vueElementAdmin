<template>
  <div class="PageDownloadExcel">
    <el-table :data="list" border stripe>
      <el-table-column v-for="(item, index) in Object.keys(list[0] ? list[0] : {})" :key="index" :prop="item" :label="item" align="center" />
    </el-table>
    <el-button type="primary" @click="download">下载Excel</el-button>
  </div>
</template>

<script>
export default {
  name: 'PageDownloadExcel',
  data() {
    return {
      list: [
        { '姓名': '张三', '年龄': 18, '爱好': '旅游' },
        { '姓名': '李四', '年龄': 19, '爱好': '游泳' },
        { '姓名': '王五', '年龄': 20, '爱好': '吃鸡' }
      ]
    }
  },
  methods: {
    download() {
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: Object.keys(this.list[0]),
          data: this.list.map(listItem => Object.keys(this.list[0]).map(j => listItem[j])),
          filename: '下载Excel',
          bookType: 'xlsx'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .PageDownloadExcel {
    padding: 8px;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: center;
    height: calc(100vh - 84px);
    .el-table {
      flex: 0 1 auto;
      margin-bottom: 24px;
    }
  }
</style>
