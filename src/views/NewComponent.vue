<template>
  <div class="NewComponent">NewComponent</div>
</template>

<script>
export default {
  name: 'NewComponent',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .NewComponent{
    @include flex();
  }
</style>
