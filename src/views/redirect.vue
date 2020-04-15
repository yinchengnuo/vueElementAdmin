<script>
export default {
  created() {
    this.$router.replace({ path: '/' + this.$route.params.path, query: this.$route.query })
  },
  render: h => h()
}
</script>
