<template>
  <div v-loading.body="loading" class="PageCharacterRecognition">
    <img v-if="url !== ''" :src="url" :alt="url">
    <div v-if="content !== ''" class="result" v-text="content" />
    <el-button v-img="upload" type="primary">上传图片</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PageCharacterRecognition',
  props: {},
  data() {
    return {
      url: 'https:/www.yinchengnuo.com/temp/6398015475381600.test.jpg',
      content: '4Gu‖ 7.1K/s 09:59 不 64% @ 国 0↵↵X 账 单 详 情↵↵转 账 - 来 自 十 足 女 强 人 美 玲 妹 妹↵+900.00↵↵当 前 状 态 “ 已 存 入 零 钱↵↵转 账 说 明 “ 微 信 转 账↵↵转 账 时 间 _2020-04-24 09:53:23↵收 款 时 间 “_2020-04-24 09:56:58↵↵转 账 单 号 1000050001202004241108788190↵613↵↵定 位 到 聊 天 位 置↵↵常 见 问 题↵↵0↵口↵',
      loading: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    upload(e) {
      this.loading = true
      axios.post('https://www.yinchengnuo.com/recognition', e).then(({ data: { url, content }}) => {
        this.url = url
        this.content = content || '无内容'
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .PageCharacterRecognition {
    padding: 8px;
    overflow: auto;
    @include flex(column);
    box-sizing: border-box;
    height: calc(100vh - 84px);
    justify-content: flex-start;
    img {
      width: 370px;
      margin-bottom: 8px;
      border-radius: 8px;
      border: 1px solid #cccccc;
    }
    .result {
      width: 370px;
      padding: 8px;
      line-height: 2;
      font-size: 24px;
      margin-bottom: 8px;
      border-radius: 8px;
      word-break: break-all;
      box-sizing: border-box;
      border: 1px solid #cccccc;
    }
    .result::before {
      content: "识别结果：";
      font-size: 32px;
      color: #000000;
      font-weight: bold;
    }
  }
</style>
