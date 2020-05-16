<template>
  <div class="TestSlot">
    <slot name="header" :num="num">具名slot header 默认值</slot>
    <slot>无名 slot 默认值</slot>
    <slot name="footer">具名slot footer 默认值</slot>
    <br>
    <div @click="add">子组件数据：{{ num }}</div>
  </div>
</template>
<script>
export default {
  name: 'TestSlot',
  props: {},
  data() {
    return {
      num: 123
    }
  },
  created() {},
  mounted() {},
  methods: {
    add() {
      this.num++
      console.log(this.num)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .TestSlot{
    @include flex(column);
  }
</style>
