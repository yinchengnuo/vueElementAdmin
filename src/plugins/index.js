import filters from './filters'
import prototype from './prototype'
import directive from './directive'

export default {
  install(Vue) {
    filters(Vue)
    prototype(Vue)
    directive(Vue)
  }
}
