<template>
  <div class="uploadexcel">
    <el-button type="primary" :loading="loading" @click="importExcel">选择Excel</el-button>
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="readExcel">
  </div>
</template>

<script>
import XLSX from 'xlsx'
// import request from '@/utils/request'

export default {
  name: 'UploadExcel',
  data() {
    return {
      loading: false,
      url: '',
      list: []
    }
  },
  methods: {
    importExcel() { // 选择文件
      this.$refs['excel-upload-input'].click()
    },
    readExcel(e) { // 读取 excel
      const file = e.target.files[0]
      if (!file) return
      this.$refs['excel-upload-input'].value = null
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = async e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          // const header = this.getHeaderRow(worksheet)
          const list = []
          for (let i = 0; i < 26; i++) {
            list[i] = {}
            list[i].list = []
            list[i].name = String.fromCharCode(65 + i)
          }
          XLSX.utils.sheet_to_json(worksheet).forEach(e => {
            list.forEach(listItem => {
              if (e['列1'] === listItem.name) {
                listItem.list.push({
                  name: e['中文名'],
                  code: e['国家（或地区）码']
                })
              }
            })
            // const data = {
            //   phone: e['手机号'] ? e['手机号'] : '',
            //   nickname: e['昵称'] ? e['昵称'] : '',
            //   up_name: e['上级代理昵称'] ? e['上级代理昵称'] : '',
            //   up_phone: e['上级代理帐号'] ? e['上级代理帐号'] : '',
            //   recom_phone: e['邀请人帐号'] ? e['邀请人帐号'] : '',
            //   recom_name: e['邀请人昵称'] ? e['邀请人昵称'] : '',
            //   level_name: e['角色'] ? e['角色'] : '',
            //   created_at: e['创建时间'] ? e['创建时间'] : '',
            //   updated_at: e['激活时间'] ? e['激活时间'] : '',
            //   real_name: e['真实姓名'] ? e['真实姓名'] : ''
            // }
            // this.list.push(data)
          })
          console.log(JSON.stringify(list, null, 2))
          // for (let i = 0; i <= Math.floor(this.list.length / 1000); i++) {
          //   await request({
          //     method: 'post',
          //     url: '/excel/insert_demo',
          //     data: {
          //       list: this.list.slice(i * 1000, i * 1000 + 1000)
          //     }
          //   })
          // }
          resolve()
        }
        reader.readAsArrayBuffer(file)
      })
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      for (C = range.s.c; C <= range.e.c; ++C) {
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        let hdr = 'UNKNOWN ' + C
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    }
  }
}
</script>

<style lang='scss'>
  .uploadexcel {
    width: 30px;
    margin: 345px auto;
    .excel-upload-input{
      display: none;
      z-index: -9999;
    }
  }
</style>
