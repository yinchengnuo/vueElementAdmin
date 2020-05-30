<template>
  <div class="PageLiveStreaming">
    <div class="liveItem">
      <video id="live" class="video-js" controls muted autoplay preload="auto" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLiveStreaming',
  props: {},
  data() {
    return {
      list: []
    }
  },
  created() {},
  mounted() {
    this.play()
  },
  methods: {
    play() {
      window.videojs('live', {}, function onPlayerReady() {
        this.src({ src: 'https://livedoc.cgtn.com/500d/prog_index.m3u8', type: 'application/x-mpegURL' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .PageLiveStreaming {
    box-sizing: border-box;
    height: calc(100vh - 84px);
    .liveItem {
      height: 100%;
      .video-js{
        width:100%;
        height:100%
      }
      .vjs-control-bar{
        bottom:27%!important
      }
      .vjs-big-play-button{
        display:none!important
      }
    }
  }
</style>
