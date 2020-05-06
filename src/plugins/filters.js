import * as filters from '@/utils/filters'

export default Vue => Reflect.ownKeys(filters).forEach(key => Vue.filter(key, filters[key]))
