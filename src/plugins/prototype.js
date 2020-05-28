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

  Vue.prototype.$comp = function(file, quality) {
    if (file[0]) {
      return Promise.all(Array.from(file).map(e => Vue.prototype.$compression(e, quality))) // 如果是 file 数组返回 Promise 数组
    } else {
      return new Promise((resolve) => {
        const reader = new FileReader() // 创建 FileReader
        reader.onload = ({ target: { result: src }}) => {
          const image = new Image() // 创建 img 元素
          image.onload = async() => {
            const canvas = document.createElement('canvas') // 创建 canvas 元素
            canvas.width = image.width
            canvas.height = image.height
            canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height) // 绘制 canvas
            const canvasURL = canvas.toDataURL('image/jpeg', quality)
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
              beforeKB: Number((file.size / 1024).toFixed(2)),
              afterKB: Number((miniFile.size / 1024).toFixed(2))
            })
          }
          image.src = src
        }
        reader.readAsDataURL(file)
      })
    }
  }

  Vue.prototype.$compression = function(file, size = 20, device = 4) {
    if (file[0]) {
      return Promise.all(Array.from(file).map(e => Vue.prototype.$compression(e, size))) // 如果是 file 数组返回 Promise 数组
    } else {
      return new Promise((resolve) => {
        const reader = new FileReader() // 创建 FileReader
        reader.onload = ({ target: { result: src }}) => {
          const fileSize = Number((file.size / 1024).toFixed(2))
          if (fileSize <= size) {
            resolve({ file: file, origin: file, beforeSrc: src, afterSrc: src, beforeKB: fileSize + 'KB', afterKB: fileSize + 'KB', detail: [], quality: null })
          } else {
            const image = new Image() // 创建 img 元素
            image.onload = async() => {
              const canvas = document.createElement('canvas') // 创建 canvas 元素
              canvas.width = image.width
              canvas.height = image.height
              canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height) // 绘制 canvas
              let canvasURL, miniFile
              let L = true
              let quality = 0
              const detail = []
              let start = Date.now()
              for (let i = 1; i <= device; i++) {
                canvasURL = canvas.toDataURL('image/jpeg', L ? (quality += 1 / (2 ** i)) : (quality -= 1 / (2 ** i)))
                const buffer = atob(canvasURL.split(',')[1])
                let length = buffer.length
                const bufferArray = new Uint8Array(new ArrayBuffer(length))
                while (length--) {
                  bufferArray[length] = buffer.charCodeAt(length)
                }
                miniFile = new File([bufferArray], file.name, { type: 'image/jpeg' });
                (miniFile.size / 1024) > size ? L = false : L = true
                detail.push({
                  quality,
                  size: miniFile.size,
                  kb: Number((miniFile.size / 1024).toFixed(2)),
                  time: Date.now() - start
                })
                start = Date.now()
              }
              resolve({
                detail,
                quality,
                file: miniFile,
                origin: file,
                beforeSrc: src,
                afterSrc: canvasURL,
                beforeKB: Number((file.size / 1024).toFixed(2)),
                afterKB: Number((miniFile.size / 1024).toFixed(2))
              })
            }
            image.src = src
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  Vue.prototype.$download = function(href) {
    if (href) {
      let a = document.createElement('a')
      a.href = href
      a.download = 'download'
      document.body.appendChild(a)
      a.click()
      a.remove()
      a = null
    }
  }
}
