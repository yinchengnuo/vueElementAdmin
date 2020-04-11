<template>
  <div class="page-account-manage">
    <el-button type="primary" style="margin-bottom: 8px;" @click="handleAddAccount">添加账号</el-button>

    <el-table :data="list" border>
      <el-table-column align="center" label="工号">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="账号">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEditAccount(scope)">修改账号信息</el-button>
          <el-button type="danger" size="small" @click="handleDeleteAccount(scope)">删除账号</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog width="300px" :visible.sync="dialogVisible" :close-on-click-modal="false" :destroy-on-close="true" :title="dialogType === 'add' ? '添加账号' : '编辑账号'">
      <el-form :model="user" label-width="80px" label-position="left">
        <el-form-item label="账号名">
          <el-input v-model="user.name" maxlength="12" placeholder="账号名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="user.role" placeholder="请选择角色">
            <el-option v-for="(item, index) in roleNameList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisibleUser=false">取消</el-button>
        <el-button type="primary" @click="confirmUser">确定</el-button>
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
      user: {
        id: '',
        name: '',
        role: ''
      },
      list: [],
      dialogType: '',
      dialogVisible: false,
      roleNameList: []
    }
  },
  mounted() {
    this._loading = this.$loading() // 显示 loading
    this.getAccountRole() // 获取所有账号
  },
  methods: {
    getAccountRole() { // 获取所有账户和角色
      Promise.all([api_getAccount(), api_getRole()]).then(([res1, res2]) => {
        this._loading.close()
        this.list = res1.data.list
        this.roleNameList = res2.data.list
      }).catch(e => this._loading.close())
    },
    handleAddAccount() { // 点击添加账号
      this.role = Object.assign({}, {
        id: '',
        name: '',
        routes: []
      }) // 将弹出框中的用户信息置为空
      this.dialogType = 'addRole' // 弹出框类型为添加用户
      this.$nextTick(() => { // nextTick是为了在弹出框首次打开之后再获取权限Tree
        this.$refs.tree.setCheckedNodes([]) // 清除已选中的权限Tree
      })
      this.dialogVisible = true // 弹出框
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
