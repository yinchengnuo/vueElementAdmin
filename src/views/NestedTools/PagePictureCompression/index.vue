<template>
  <div class="PagePictureCompression">
    <img v-if="imgInfo.beforeSrc" :src="imgInfo.beforeSrc" :alt="imgInfo.beforeSrc">
    <h6>压缩前：{{ imgInfo.beforeKB }}</h6>
    <el-slider v-model="quality" @change="renderImg()" />
    <img v-if="imgInfo.afterSrc" :src="imgInfo.afterSrc" :alt="imgInfo.afterSrc">
    <h6>压缩后：{{ imgInfo.afterKB }}</h6>
    <div>
      <el-button v-img="renderImg" type="primary">上传图片</el-button>
      <el-button type="primary" @click="$download(imgInfo.afterSrc)">下载图片</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagePictureCompression',
  props: {},
  data() {
    return {
      quality: 92,
      imgInfo: {}
    }
  },
  created() {},
  mounted() {},
  methods: {
    renderImg(files) { // 获取文件
      if (files) {
        this.file = files[0]
      }
      if (!this.file) return
      this.$compression(this.file, this.quality / 100, 50).then(res => { // 压缩图片
        this.imgInfo = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .PagePictureCompression {
    padding: 8px;
    @include flex(column);
    box-sizing: border-box;
    min-height: calc(100vh - 84px);
    .el-slider, img {
      width: 370px;
    }
  }
</style>
