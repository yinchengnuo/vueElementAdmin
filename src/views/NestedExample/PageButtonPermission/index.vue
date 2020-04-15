<template>
  <div class="page-button-permission">
    <span>* 按钮为蓝色即为有权限，灰色即无权限。在实际项目中，大部分情况下，无权限的按钮应该被移出 Dom 树</span>
    <div>
      <el-button v-button-permission:search type="primary">搜索</el-button>
      <el-button v-button-permission:add type="primary">添加</el-button>
      <el-button v-button-permission:del type="primary">删除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageButtonPermission'
}
</script>

<style lang="scss" scoped>
  .page-button-permission {
    padding: 8px;
    display: flex;
    height: 567px;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: center;
    >span {
      line-height: 66px;
    }
  }
</style>
