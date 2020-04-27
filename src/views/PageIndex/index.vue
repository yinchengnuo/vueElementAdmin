<template>
  <div class="page-index">
    <swiper ref="swiper" class="swiper" :options="swiperOptions">
      <swiper-slide v-for="item in imgs" :key="item">
        <el-image fit="cover" :src="item" :alt="item" style="width: 100%; height: 100%;" @load="loading = false">
          <div slot="placeholder" v-loading="loading" style="height: 100%;" />
        </el-image>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'PageIndex',
  components: { Swiper, SwiperSlide },
  directives: {
    swiper: directive
  },
  data() {
    return {
      height: 0,
      loading: true,
      swiperOptions: {
        speed: 1234,
        effect: 'fade',
        autoplay: { delay: 5678, disableOnInteraction: false }
      },
      imgs: [
        require('@/assets/index/1.jpg'),
        require('@/assets/index/2.jpg'),
        require('@/assets/index/3.jpg'),
        require('@/assets/index/4.jpg'),
        require('@/assets/index/5.jpg'),
        require('@/assets/index/6.jpg')
      ]
    }
  },
  computed: {
    swiper() {
      return this.$refs.swiper.$swiper
    }
  },
  mounted() {
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
        this.requestID = requestAnimationFrame(animate)
      }
      this.requestID = requestAnimationFrame(() => {
        this.swiper.update()
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
    height: calc(100vh - 84px);
    .swiper {
      width: 100%;
      height: 100%;
    }
  }
</style>
