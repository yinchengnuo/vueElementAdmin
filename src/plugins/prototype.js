export default Vue => {
  // 注册 EventBus
  Vue.prototype.$event = new Vue()
  // 注册 clone
  Vue.prototype.$clone = data => JSON.parse(JSON.stringify(data))

  // 注册全局自定义请求方法
  Vue.prototype.$request = function(api, fun, conf) {
    this._loading = this.$loading()
    if (api.length) {
      Promise.all(api).then((res) => {
        fun(res.map(e => e.data || {}))
      }).catch(() => this.$message.error((conf && conf.errorMsg) || '操作失败')).finally(() => (conf && conf.endStillLoading) || this._loading.close())
    } else {
      api.then(({ code, data }) => { // 发送网络请求
        code === 200 && fun(data || {})
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

  Vue.prototype.$compression = function(file, quality = 0.5, limit = 100) {
    if (file[0]) {
      return Promise.all(Array.from(file).map(e => Vue.prototype.$compression(e, quality)))
    } else {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = ({ target: { result: src }}) => {
          if ((file.size / 1024).toFixed(2) < limit) {
            resolve({
              file: file,
              origin: file,
              beforeSrc: src,
              afterSrc: src,
              beforeSize: file.size,
              afterSize: file.size,
              beforeKB: (file.size / 1024).toFixed(2) + 'KB',
              afterKB: (file.size / 1024).toFixed(2) + 'KB'
            })
          } else {
            const image = new Image()
            image.onload = async() => {
              const canvas = document.createElement('canvas')
              canvas.width = image.width
              canvas.height = image.height
              canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height)
              const canvasURL = canvas.toDataURL('image/jpeg', (quality || 0.01) * ((quality === 1.01) ? 1 : (await Vue.prototype.$compression(file, 1.01, limit)).scale - 0.3))
              const buffer = atob(canvasURL.split(',')[1])
              let length = buffer.length
              const bufferArray = new Uint8Array(new ArrayBuffer(length))
              while (length--) {
                bufferArray[length] = buffer.charCodeAt(length)
              }
              const miniFile = new File([bufferArray], file.name, { type: 'image/jpeg' })
              resolve({
                file: miniFile,
                origin: file,
                beforeSrc: src,
                afterSrc: canvasURL,
                beforeSize: file.size,
                afterSize: miniFile.size,
                scale: file.size / miniFile.size,
                beforeKB: (file.size / 1024).toFixed(2) + 'KB',
                afterKB: (miniFile.size / 1024).toFixed(2) + 'KB'
              })
            }
            image.src = src
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }
}
