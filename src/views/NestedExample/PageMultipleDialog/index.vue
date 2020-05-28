<template>
  <div class="PageMultipleDialog">
    <Dialog9 ref="d9" />
    <Dialog8 ref="d8" />
    <Dialog7 ref="d7" />
    <Dialog6 ref="d6" />
    <Dialog5 ref="d5" />
    <Dialog4 ref="d4" />
    <Dialog3 ref="d3" />
    <Dialog2 ref="d2" />
    <Dialog1 ref="d1" @colseAll="show = false" />

    <el-button @click="show = true">打开所有对话框</el-button>
  </div>
</template>

<script>
import Dialog1 from './components/Dialog1'
import Dialog2 from './components/Dialog2'
import Dialog3 from './components/Dialog3'
import Dialog4 from './components/Dialog4'
import Dialog5 from './components/Dialog5'
import Dialog6 from './components/Dialog6'
import Dialog7 from './components/Dialog7'
import Dialog8 from './components/Dialog8'
import Dialog9 from './components/Dialog9'
export default {
  name: 'PageMultipleDialog',
  components: { Dialog1, Dialog2, Dialog3, Dialog4, Dialog5, Dialog6, Dialog7, Dialog8, Dialog9 },
  props: {},
  data() {
    return {
      show: false
    }
  },
  watch: {
    show(show) {
      show ? Object.values(this.$refs).forEach(e => e.show && e.show()) : Object.values(this.$refs).forEach(e => e.hide && e.hide())
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .PageMultipleDialog {
    padding: 8px;
    @include flex();
    box-sizing: border-box;
    min-height: calc(100vh - 84px);
  }
</style>
