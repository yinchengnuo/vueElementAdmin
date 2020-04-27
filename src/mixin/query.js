export default {
  watch: {
    mixin_query: {
      deep: true,
      handler() {
        this.mixin_request()
      }
    }
  },
  mounted() {
    this.mixin_request()
  },
  methods: {
    mixin_request() {
      this.$request(this.mixin_func(this.mixin_query), ({ total, list }) => {
        this.list = list
        this.total = total
      })
    }
  }
}
