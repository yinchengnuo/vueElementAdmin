<template>
  <div class="page-index">
    <swiper ref="swiper" class="swiper" :options="swiperOptions">
      <swiper-slide v-for="(item, index) in imgs" :key="index">
        <el-image fit="cover" :src="item" :alt="item" style="width: 100%; height: 100%;" />
      </swiper-slide>
    </swiper>
    <dv-border-box-11 ref="border" title="数据大屏">
      <template v-if="PC">
        <h1 style="color: #FFFFFF; margin-top: 36vh; text-align: center;">开发中...</h1>
      </template>
      <template v-else>
        <dv-flyline-chart-enhanced :config="config1" style="100%; height: calc((100vw - 36px) * 0.8);" />
        <dv-capsule-chart :config="config2" style="width: 100%; height: calc((100vw - 36px) / 2);" />
        <dv-conical-column-chart :config="config3" style="width: 100%; height: calc((100vw - 36px) / 2);" />
      </template>
    </dv-border-box-11>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'

import config1 from './config1'
import config2 from './config2'
import config3 from './config3'
export default {
  name: 'PageIndex',
  components: { Swiper, SwiperSlide },
  directives: { swiper: directive },
  data() {
    return {
      PC: document.body.offsetWidth > 1280,
      swiperOptions: {
        speed: 1234,
        effect: 'fade',
        autoplay: { delay: 5678, disableOnInteraction: false }
      },
      imgs: [require('@/assets/index/1.png'), require('@/assets/index/2.png')],
      config1,
      config2,
      config3
    }
  },
  computed: {
    swiper() {
      return this.$refs.swiper.$swiper
    }
  },
  mounted() {
    this.toggleSideBar()
    this.$event.$on('toggleSideBar', this.toggleSideBar)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
    this.$event.$off('toggleSideBar')
    cancelAnimationFrame(this.requestID)
  },
  methods: {
    toggleSideBar() {
      const animate = () => {
        this.swiper.update()
        this.$refs.border.initWH()
        this.requestID = requestAnimationFrame(animate)
      }
      this.requestID = requestAnimationFrame(() => {
        this.swiper.update()
        this.$refs.border.initWH()
        this.requestID = requestAnimationFrame(animate)
      })
      this.timer = setTimeout(() => {
        cancelAnimationFrame(this.requestID)
      }, 345)
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-index {
    position: relative;
    height: calc(100vh - 84px);
    .swiper {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      position: absolute;
    }
    .dv-border-box-11 >>> .border-box-content {
      top: 54px;
      left: 18px;
      overflow: auto;
      width: calc(100% - 36px);
      height: calc(100% - 66px);
    }
  }
</style>
