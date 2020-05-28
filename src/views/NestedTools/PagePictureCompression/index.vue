<template>
  <div class="PagePictureCompression">
    <img v-if="imgInfo.beforeSrc" :src="imgInfo.beforeSrc" :alt="imgInfo.beforeSrc">
    <h6>压缩前：{{ imgInfo.beforeKB }}</h6>
    <el-slider v-model="quality" :min="1" :max="99" @change="renderImg()" />
    <img v-if="imgInfo.afterSrc" :src="imgInfo.afterSrc" :alt="imgInfo.afterSrc">
    <h6>压缩后：{{ imgInfo.afterKB }}</h6>
    <div>
      <el-button v-img="renderImg" type="primary">上传图片</el-button>
      <el-button type="primary" @click="$download(imgInfo.afterSrc)">下载图片</el-button>
    </div>
    <div v-if="detalList.length">
      <el-tag type="success">期望压缩结果：{{ size }}KB</el-tag>
      <el-tag type="success">实际压缩结果：{{ detalList[detalList.length - 1].kb }}KB</el-tag>
      <el-tag type="success">总计耗费时长：{{ detalList[detalList.length - 1].kb }}ms</el-tag>
    </div>
    <el-table v-if="detalList.length" :data="detalList" border stripe>
      <el-table-column label="质量" prop="quality" align="center" />
      <el-table-column label="byte" prop="size" align="center" />
      <el-table-column label="kb" prop="kb" align="center" />
      <el-table-column label="耗时" prop="time" align="center" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'PagePictureCompression',
  props: {},
  data() {
    return {
      quality: 30,
      imgInfo: {},
      detalList: [],
      size: 0,
      time: 0
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
      this._loading = this.$loading()
      const start = Date.now()
      this.size = Number((this.file.size * (this.quality / 100) / 1024).toFixed(2))
      this.$compression(this.file, this.size).then(res => { // 压缩图片
        this.imgInfo = res
        this.detalList = res.detail
        this._loading.close()
        this.time = Date.now - start
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
    .el-slider, img, .el-table {
      width: 370px;
      flex: 0 0 auto;
    }
    .el-tag {
      margin: 8px;
      display: block;
    }
  }
</style>
