<template>
  <div class="page-index">
    <swiper ref="swiper" class="swiper" :options="swiperOptions">
      <swiper-slide v-for="item in imgs" :key="item">
        <el-image fit="cover" :src="item" :alt="item" style="width: 100%; height: 100%;" />
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
  props: {},
  data() {
    return {
      height: 0,
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
