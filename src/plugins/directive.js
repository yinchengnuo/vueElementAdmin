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

  // 注册全局自定义快速读取 excel `v-read-excel`
  Vue.directive('read-excel', {
    inserted: (el, { value }) => {
      const id = Date.now()
      const input = document.createElement('input')
      el['read-excel-id'] = id
      input.id = id
      input.type = 'file'
      input.accept = '.xlsx, .xls'
      input.onchange = ({ target: { files: [excel] }}) => {
        if (!excel) return
        const XLSX = require('xlsx')
        const reader = new FileReader()
        reader.onload = async({ target: { result }}) => {
          const workbook = XLSX.read(result, { type: 'array' })
          value && value(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]))
        }
        reader.readAsArrayBuffer(excel)
      }
      input.style.display = 'none'
      document.body.appendChild(input)
      el.addEventListener('click', () => document.getElementById(id).click())
    },
    unbind: el => document.getElementById(el['read-excel-id']).remove()
  })
}
