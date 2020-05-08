export default Vue => {
  // 注册 EventBus
  Vue.prototype.$event = new Vue()

  // 注册全局自定义请求方法
  Vue.prototype.$request = function(api, fun, conf) {
    this._loading = this.$loading()
    if (api.length) {
      Promise.all(api).then((res) => {
        fun(res.map(e => e.data || {}))
      }).catch(() => this.$message.error((conf && conf.errorMsg) || '操作失败')).finally(() => (conf && conf.endStillLoading) || this._loading.close())
    } else {
      api.then(({ code, message, data }) => { // 发送网络请求
        code === 200 ? fun(data || {}) : this.$message.error(message)
      }).catch(() => {
        this.$message.error((conf && conf.errorMsg) || '操作失败')
        this._loading.close()
      }).finally(() => (conf && conf.endStillLoading) || this._loading.close())
    }
  }

  Vue.prototype.$excel = function(list, name) {
    !list.length ? list = [{ '暂无数据': '' }] : ''
    import('@/utils/Export2Excel').then(excel => {
      excel.export_json_to_excel({
        header: Object.keys(list[0]),
        data: list.map(listItem => Object.keys(list[0]).map(j => listItem[j])),
        filename: name || '下载Excel',
        bookType: 'xlsx'
      })
    })
  }
}
