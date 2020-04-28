export default {
  watch: {
    mixin_query: {
      deep: true,
      handler() {
        this.page = 1
        this.mixin_request()
      }
    },
    page() {
      this.mixin_request()
    }
  },
  mounted() {
    this.mixin_request()
  },
  methods: {
    mixin_request() {
      this.$request(this.mixin_func({ ...this.mixin_query, page: this.page }), ({ total, list }) => {
        this.list = list
        this.total = total
      })
    }
  }
}
