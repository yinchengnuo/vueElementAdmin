// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

// 数字千位打点
export function toThousandFilter(str) {
  return str.toString().replace(str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g, '$1,')
}

// 格式化时间戳
export function getTimeString(time) {
  const date = new Date(time)
  const addzero = num => (num + '').length === 1 ? '0' + num : num
  return `${date.getFullYear()}-${addzero(date.getMonth() + 1)}-${addzero(date.getDate())}  ${addzero(date.getHours())} : ${addzero(date.getMinutes())}`
}

export const numToZH = num => {
  // 数字转汉字方法
  const chnNumChar = [
    '零',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九'
  ]
  const chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
  const chnUnitChar = ['', '十', '百', '千']
  const numToChn = num => {
    const index = num.toString().indexOf('.')
    if (index !== -1) {
      const str = num.toString().slice(index)
      let a = '点'
      for (let i = 1; i < str.length; i++) {
        a += chnNumChar[parseInt(str[i])]
      }
      return a
    } else {
      return ''
    }
  }
  // 定义在每个小节的内部进行转化的方法，其他部分则与小节内部转化方法相同
  const sectionToChinese = section => {
    let str = ''
    let chnstr = ''
    let zero = false
    let count = 0 // zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
    while (section > 0) {
      var v = section % 10 // 对数字取余10，得到的数即为个位数
      if (v === 0) {
        // 如果数字为零，则对字符串进行补零
        if (zero) {
          zero = false // 如果遇到连续多次取余都是0，那么只需补一个零即可
          chnstr = chnNumChar[v] + chnstr
        }
      } else {
        zero = true // 第一次取余之后，如果再次取余为零，则需要补零
        str = chnNumChar[v]
        str += chnUnitChar[count]
        chnstr = str + chnstr
      }
      count++
      section = Math.floor(section / 10)
    }
    return chnstr
  }
  const a = numToChn(num)
  num = Math.floor(num)
  let unitPos = 0
  let strIns = ''
  let chnStr = ''
  let needZero = false
  if (num === 0) {
    return chnNumChar[0]
  }
  while (num > 0) {
    const section = num % 10000
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr
    }
    strIns = sectionToChinese(section)
    strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0]
    chnStr = strIns + chnStr
    needZero = section < 1000 && section > 0
    num = Math.floor(num / 10000)
    unitPos++
  }
  let result = chnStr + a
  const temp = result.split('')
  if (temp[0] === '一' && temp[1] === '十') {
    temp.splice(0, 1)
    result = temp.join('')
  }
  return result
}
