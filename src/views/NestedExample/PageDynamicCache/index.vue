<template>
  <div class="PageDynamicCache">
    <el-table :data="visitedViews" border stripe>
      <el-table-column label="已开页面" prop="title" align="center" width="123" />
      <el-table-column label="是否缓存" align="center">
        <template slot-scope="{ row: { name } }">
          <el-switch :value="cachedViews.includes(name)" @change="switchCache($event, name)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'PageDynamicCache',
  props: {},
  data() {
    return {}
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  mounted() {
    this._loading = this.$loading()
    setTimeout(() => this._loading.close(), 567)
  },
  methods: {
    switchCache(val, name) {
      val ? this.$store.commit('tagsView/ADD_CACHED_VIEW', { name }) : this.$store.commit('tagsView/DEL_CACHED_VIEW', { name })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .PageDynamicCache {
    padding: 8px;
    overflow: auto;
    @include flex();
    box-sizing: border-box;
    align-items: flex-start;
    height: calc(100vh - 84px);
    .el-table {
      width: 370px;
      flex: 0 0 auto;
      .el-switch {
        margin: 6px 0;
      }
    }
  }
</style>
