<template>
  <div class="PageUnreadMessage">
    <el-table :data="list" border stripe>
      <el-table-column label="页面" prop="title" align="center" width="123" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{ $index, row: { num } }">
          <el-input-number :value="num" :min="0" size="min" @change="handleChange($event, $index)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'PageUnreadMessage',
  props: {},
  data() {
    return {}
  },
  computed: {
    list() {
      return this.$store.state.unreadMessage
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleChange(num, index) {
      this.$store.commit('unreadMessage/UNREAD_MESSAGE_NUM_CHANGE', { num, index })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/public.scss';
  .PageUnreadMessage {
    @include flex();
    padding: 8px;
    overflow: auto;
    box-sizing: border-box;
    align-items: flex-start;
    height: calc(100vh - 84px);
    .el-table {
      width: 370px;
      flex: 0 0 auto;
    }
  }
</style>
