<template>
  <div class="page-account-manage">
    <el-button type="primary" style="margin-bottom: 8px;" @click="handleAddAccount">添加账号</el-button>

    <el-table :data="list" border>
      <el-table-column align="center" prop="id" label="工号" />
      <el-table-column align="center" prop="name" label="账号" />
      <el-table-column align="center" prop="role" label="角色" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEditAccount(scope.row)">修改账号信息</el-button>
          <el-button v-if="$store.state.user.role === 'root'" type="danger" :disabled="scope.row.role === 'root'" @click="handleDeleteAccount(scope.row)">删除账号</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog width="300px" :visible.sync="dialogVisible" :close-on-click-modal="false" :destroy-on-close="true" :title="dialogType === 'add' ? '添加账号' : '编辑账号'">
      <el-form :model="account" label-width="80px" label-position="left">
        <el-form-item label="账号名">
          <el-input v-model="account.name" maxlength="12" placeholder="账号名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="account.role" :disabled="account.role === 'root'" placeholder="请选择角色">
            <el-option v-for="(item, index) in roleNameList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmAccount">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { api_getRole, api_getAccount, api_deleteAccount, api_addAccount, api_updateAccount } from '@/api/role'
export default {
  name: 'PageAccountManage',
  props: {},
  data() {
    return {
      account: { id: '', name: '', role: '' },
      list: [],
      dialogType: '',
      dialogVisible: false,
      roleList: []
    }
  },
  computed: {
    roleNameList() {
      return this.roleList.map(e => e.name).filter(e => e !== 'root')
    }
  },
  mounted() {
    this.getAccountRole() // 获取所有账号
  },
  methods: {
    getAccountRole() { // 获取所有账户和角色
      this.$request([api_getAccount(), api_getRole()], ([data1, data2]) => {
        this.list = data1.list
        this.roleList = data2.list
      })
    },
    handleAddAccount() { // 点击添加账号
      this.account = Object.assign({}, { id: '', name: '', role: '' }) // 将弹出框中的用户信息置为空
      this.dialogType = 'add' // 弹出框类型为添加账号
      this.dialogVisible = true // 弹出框
    },
    handleEditAccount({ id, name, role }) { // 点击编辑账号
      this.account = Object.assign({}, { id, name, role }) // 将弹出框中的用户信息置为空
      this.dialogType = 'edit' // 弹出框类型为编辑账号
      this.dialogVisible = true // 弹出框
    },
    confirmAccount() { // 点击提交添加/修改账号
      if (!this.account.name) {
        this.$message.info({ message: '请设置账户名' })
        return
      }
      if (this.dialogType === 'add') {
        this.$request(api_addAccount(this.account), data => {
          this.$notify.success({ title: '添加成功', message: '账号名: ' + this.account.name })
          this.getAccountRole() // 添加成功后重新
          this.dialogVisible = false // 收起弹出框
        }, { endStillLoading: true })
      } else {
        this.$request(api_updateAccount(this.account), data => {
          this.$notify.success({ title: '添加成功', message: '账号名: ' + this.account.name })
          this.getAccountRole() // 添加成功后重新
          this.dialogVisible = false // 收起弹出框
        }, { endStillLoading: true })
      }
    },
    handleDeleteAccount({ id }) { // 点击删除
      this.$confirm('确定要删除当前账号？', '确定操作', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
        .then(async() => {
          this.$request(api_deleteAccount({ id }), data => {
            this.getAccountRole() // 删除成功后重新获取下角色列表
          }, { endStillLoading: true })
        })
        .catch(err => err)
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-account-manage {
    padding: 8px;
    box-sizing: border-box;
    .el-input {
      width: 180px;
    }
  }
</style>
