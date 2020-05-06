<template>
  <div class="PageUploadExcel">
    <el-table v-show="list.length" max-height="666" :data="list" border stripe>
      <el-table-column v-for="(item, index) in Object.keys(list[0] ? list[0] : {})" :key="index" :prop="item" :label="item" align="center" />
    </el-table>
    <el-button v-read-excel="upload" type="primary">上传Excel</el-button>
    <div style="margin: 24px; line-height: 2; text-align: center;">
      * 本示例仅适用于将少量数据的 excel 转换为 JSON 数据。
      如果数据量很大，阻塞效果会非常明显。作者尝试过使用 Worker，但是由于 postMessage 不支持传值函数类型。
      因此无法将 xlsx 方法作为参数传入 worker。而在 worker 内重新实现 xlsx 方法又略显臃肿，因为便没有往深处尝试。
      因此在处理数据量较大的 excel 时，建议使用后端解析。
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageUploadExcel',
  data() {
    return {
      list: []
    }
  },
  methods: {
    upload(list) {
      this.list = list
    }
  }
}
</script>

<style lang="scss" scoped>
  .PageUploadExcel {
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
