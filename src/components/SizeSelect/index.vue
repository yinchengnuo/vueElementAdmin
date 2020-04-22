<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="字号" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size===item.value" :command="item.value">
        {{
          item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      sizeOptions: [
        { label: '默认字号', value: 'default' },
        { label: '中号', value: 'medium' },
        { label: '小号', value: 'small' },
        { label: '超小号', value: 'mini' }
      ]
    }
  },
  computed: {
    size() {
      return this.$store.getters.size
    }
  },
  methods: {
    handleSetSize(size) {
      this.$ELEMENT.size = size
      this.$store.dispatch('app/setSize', size)
      this.refreshView()
      this.$message.success(`字号切换为${this.sizeOptions.find(e => e.value === size).label}`)
    },
    refreshView() {
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route)
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + this.$route.fullPath
        })
      })
    }
  }

}
</script>
