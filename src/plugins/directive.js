export default Vue => {
  // 注册全局自定义按钮权控指令 `v-button-permission`
  Vue.directive('button-permission', {
    bind: (el, { arg }, { context: { $route: { meta }}}) => {
      if (meta.buttonPermission && arg && meta.buttonPermission.find(e => e.id === arg)) {
        if (!meta.buttonPermission.find(e => e.id === arg).permission) {
          el.disabled = true
          el.style.background = '#cccccc'
          el.style.borderColor = '#cccccc'
          el.style.cursor = 'not-allowed'
          // el.style.display = 'none'
          // Vue.nextTick(() => el.remove())
        }
      }
    }
  })

  // 注册全局自定义快速读取 excel `v-excel`
  Vue.directive('excel', {
    inserted: (el, { value }) => {
      const id = String(Date.now() + Math.floor(Math.random() * (10 ** 16)))
      const input = document.createElement('input')
      el['excel-id'] = id
      el['excel-event'] = () => document.getElementById(id).click()
      input.id = id
      input.type = 'file'
      input.accept = '.xlsx, .xls'
      input.style.display = 'none'
      input.onchange = ({ target: { files: [excel] }}) => {
        if (!excel) return
        const XLSX = require('xlsx')
        const reader = new FileReader()
        reader.onload = async({ target: { result }}) => {
          const workbook = XLSX.read(result, { type: 'array' })
          value && value(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]))
          input.value = ''
        }
        reader.readAsArrayBuffer(excel)
      }
      document.body.appendChild(input)
      el.addEventListener('click', el['excel-event'])
    },
    unbind: el => {
      el = document.getElementById(el['excel-id'])
      el.removeEventListener(el['excel-event'])
      el.remove()
    }
  })

  // 注册全局自定义快速读取 excel `v-img`
  Vue.directive('img', {
    inserted: (el, { value }) => {
      const id = String(Date.now() + Math.floor(Math.random() * (10 ** 16)))
      const input = document.createElement('input')
      el['excel-id'] = id
      el['excel-event'] = () => document.getElementById(id).click()
      input.id = id
      input.type = 'file'
      input.accept = '.jpg, .jpeg, .gif, .png'
      input.style.display = 'none'
      el.addEventListener('click', el['excel-event'])
      input.onchange = ({ target: { files: [img] }}) => {
        console.log(img)
        if (!img) return
        const formDate = new FormData()
        formDate.append('img', img)
        value(formDate)
        input.value = ''
      }
      document.body.appendChild(input)
    },
    unbind: el => {
      el = document.getElementById(el['excel-id'])
      el.removeEventListener(el['excel-event'])
      el.remove()
    }
  })
}
