<template>
  <el-dialog class="Dialog1" width="14%" title="提示" :destroy-on-close="true" :close-on-click-modal="false" :visible.sync="dialogVisible">
    <span>Dialog1</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="$emit('colseAll')">关闭所有</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog1',
  data() {
    return {
      dialogVisible: false,
      data: {}
    }
  },
  methods: {
    show(data) {
      this.data = data
      this.dialogVisible = true
    },
    hide() {
      this.data = {}
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .Dialog1{
    @include flex();
  }
</style>
