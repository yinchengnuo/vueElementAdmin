<template>
  <div class="page-button-permission">
    <el-button v-button-permission:search type="primary">搜索</el-button>
    <el-button v-button-permission:add type="primary">添加</el-button>
    <el-button v-button-permission:del type="primary">删除</el-button>
  </div>
</template>

<script>
export default {
  name: 'PageButtonPermission',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
  .page-button-permission {
    padding: 8px;
    box-sizing: border-box;
  }
</style>
