<template>
  <div class="app-container">
    <div class="left">
      <el-button type="primary" @click="handleAddUser">添加用户</el-button>
      <el-table :data="userList" style="width: 100%;margin-top:30px;" border>
        <el-table-column align="center" label="用户ID">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户名">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="角色">
          <template slot-scope="scope">
            {{ scope.row.role }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="240">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEditUser(scope)">修改用户信息</el-button>
            <el-button type="danger" size="small" @click="handleDeleteUser(scope)">删除用户</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="width: 1px; border-right: 1px solid #cccccc;" />
    <div class="right">
      <el-button type="primary" @click="handleAddRole">添加角色</el-button>
      <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
        <el-table-column align="center" label="角色ID">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="角色名">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEditRole(scope)">编辑角色权限</el-button>
            <el-button type="danger" size="small" @click="handleDeleteRole(scope)">删除角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :visible.sync="dialogVisibleUser" :title="dialogType === 'editUser' ? '编辑用户' : '添加用户'">
      <el-form :model="user" label-width="80px" label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="user.name" placeholder="用户名" />
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

    <el-dialog :visible.sync="dialogVisibleRole" :title="dialogType === 'editRole' ? '编辑角色' : '添加角色'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="角色名">
          <el-input v-model="role.name" placeholder="角色名" />
        </el-form-item>
        <el-form-item label="页面权限">
          <el-tree
            ref="tree"
            :data="routes"
            :props="defaultProps"
            show-checkbox
            accordion
            indent="48"
            icon-class＝“icon-class”
            highlight-current
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
        <!-- <el-form-item label="按钮权限">
          <el-checkbox v-model="BP1">/上传管理[上传成功] / 调整数据 按钮</el-checkbox>
          <el-checkbox v-model="BP2">/报名管理 / 退款 按钮</el-checkbox>
          <el-checkbox v-model="BP3">/报名管理 / 取消比赛资格 按钮</el-checkbox>
          <el-checkbox v-model="BP4">/兑换管理 / 清除兑换记录 按钮</el-checkbox>
        </el-form-item> -->
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisibleRole=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getRole, addRole, deleteRole, updateRole, getUser, addUser, deleteUser, updateUser } from '@/api/role'

const defaultRole = { // 角色默认字段
  id: '',
  name: '',
  routes: []
}

const defaultUser = { // 用户默认字段
  id: '',
  name: '',
  role: ''
}

export default {
  data() {
    return {
      BP1: false, // 按钮权限
      BP2: false, // 按钮权限
      BP3: false, // 按钮权限
      BP4: false, // 按钮权限
      role: Object.assign({}, defaultRole),
      user: Object.assign({}, defaultUser),
      routes: [],
      userList: [],
      rolesList: [],
      roleNameList: [],
      dialogVisibleRole: false,
      dialogVisibleUser: false,
      dialogType: '',
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
    this.getRoutes() // 获取所有路由
    this.getRole() // 获取所有角色
    this.getUser() // 获取所有用户
  },
  methods: {
    handleAddUser() { // 点击添加用户
      this.user = Object.assign({}, defaultUser) // 弹出框中的用户信息为空
      this.dialogType = 'addUser' // 弹出框类型为添加用户
      this.dialogVisibleUser = true // 弹出框
    },
    handleEditUser(scope) { // 点击编辑用户
      this.user = deepClone(scope.row) // 弹出框中的用户信息为当前行的用户信息
      this.dialogType = 'editUser' // 弹出框类型为编辑用户
      this.dialogVisibleUser = true // 弹出框
    },
    handleDeleteUser({ $index, row }) { // 点击删除用户
      this.$confirm('确定要删除当前用户？', '确定操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteUser({ // 发送网络请求
            id: row.id
          })
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.userList.splice($index, 1)
        })
        .catch(err => err)
    },
    async confirmUser() { // 点击提交添加/修改用户
      if (this.dialogType === 'editUser') { // 如果是编辑用户
        const res = await updateUser(this.user)
        if (res.code === 200) {
          this.$notify({
            title: '修改成功',
            dangerouslyUseHTMLString: true,
            message: `
                <div>用户名: ${this.user.name}</div>
              `,
            type: 'success'
          })
          this.dialogVisibleUser = false // 收起弹出框
          this.getUser() // 修改成功后重新获取下角色列表
        } else if (res.code === 300) {
          this.$message.error({ message: '用户名与已有用户名重复' })
        }
      } else if (this.dialogType === 'addUser') { // 如果是添加用户
        if (!this.user.name.trim()) { // 检测是否填写用户名
          this.$message.error({ message: '请设置用户名用于用户登录' })
          return
        }
        if (!this.user.role) { // 检测是否填写用户角色
          this.$message.error({ message: '请设置用户角色' })
          return
        }
        this.user.password = '123456' // 新增用户默认密码
        this.user.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' // 新增用户默认头像
        const res = await addUser(this.user) // 发送网络请求
        if (res.code === 200) {
          this.$alert(`
              <div>用户名: ${this.user.name}</div>
              <div>角色: ${this.user.role}</div>
              <div>默认密码: 123456</div>
              <div>请新增用户立即登录并修改密码，防止后台信息泄露！</div>
            `, '添加成功', {
            dangerouslyUseHTMLString: true
          })
          this.getUser() // 添加成功后重新获取下角色列表
          this.dialogVisibleUser = false // 收起弹出框
        } else if (res.code === 300) {
          this.$message.error({ message: '用户名与已有用户名重复' })
        }
      }
    },
    handleAddRole() { // 点击添加角色
      this.role = Object.assign({}, defaultRole) // 弹出框中的用户信息为空
      this.dialogType = 'addRole' // 弹出框类型为添加用户
      this.dialogVisibleRole = true // 弹出框
      this.$nextTick(() => { // nextTick是为了在弹出框首次打开之后再获取权限Tree
        this.$refs.tree.setCheckedNodes([]) // 清除已选中的权限Tree
      })
    },
    handleEditRole(scope) { // 点击编辑角色
      this.dialogType = 'editRole' // 弹出框类型为编辑用户
      this.role = deepClone(scope.row) // 弹出框中的用户信息为当前行的用户信息，deepclone 之后权限Tree和用户信息互不干扰
      const BPs = this.role.routes.pop() // 获取按钮权限列表
      this.BP1 = BPs.includes('BP1') // 选中已有的按钮权限
      this.BP2 = BPs.includes('BP2') // 选中已有的按钮权限
      this.BP3 = BPs.includes('BP3') // 选中已有的按钮权限
      this.BP4 = BPs.includes('BP4') // 选中已有的按钮权限
      this.dialogType = 'editRole' // 弹出框类型为编辑用户
      this.dialogVisibleRole = true // 弹出框
      this.$nextTick(() => { // nextTick是为了在弹出框首次打开之后再获取权限Tree
        const treeChecked = this.generateArr(this.generateRoutes(this.role.routes))
        for (let i = treeChecked.length - 1; i >= 0; i--) {
          if (treeChecked[i].children) {
            treeChecked.splice(i, 1)
          }
        }
        this.$refs.tree.setCheckedNodes(treeChecked) // 将权限Tree的选中项设置为角色的路由项
      })
    },
    async confirmRole() { // 点击提交添加/修改角色
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)
      const { name } = this.role
      if (this.dialogType === 'editRole') { // 如果是编辑角色
        const add = this.role
        add.routes.forEach(e => {
          if (e.component) {
            e.component = ''
          }
        })
        add.routes.push([this.BP1 ? 'BP1' : '', this.BP2 ? 'BP2' : '', this.BP3 ? 'BP3' : '', this.BP4 ? 'BP4' : '']) // 添加按钮权限列表
        add.routes = JSON.stringify(add.routes) // 将修改的用户的路由表转化为字符串传递给后台
        const res = await updateRole(add)
        if (res.code === 200) {
          this.$notify({
            title: '修改成功',
            dangerouslyUseHTMLString: true,
            message: `
                <div>角色名: ${name}</div>
              `,
            type: 'success'
          })
          this.dialogVisibleRole = false // 收起弹出框
          this.getRole() // 修改成功后重新获取下角色列表
        }
      } else if (this.dialogType === 'addRole') { // 如果是添加角色
        if (!this.role.name) { // 检测是否填写角色名
          this.$message.error({ message: '请设置角色名用于角色登录' })
          return
        }
        const add = this.role
        add.routes.forEach(e => {
          if (e.component) {
            e.component = ''
          }
        })
        add.routes.push([this.BP1 ? 'BP1' : '', this.BP2 ? 'BP2' : '', this.BP3 ? 'BP3' : '', this.BP4 ? 'BP4' : '']) // 添加按钮权限列表
        add.routes = JSON.stringify(add.routes) // 将新增用户的路由表转化为字符串传递给后台
        const res = await addRole(add) // 发送网络请求
        if (res.code === 200) {
          this.$notify({
            title: '添加成功',
            dangerouslyUseHTMLString: true,
            message: `<div>角色名: ${name}</div>`,
            type: 'success'
          })
          this.getRole() // 添加成功后重新获取下角色列表
          this.dialogVisibleRole = false // 收起弹出框
        } else if (res.code === 300) {
          this.$message.error({ message: '用户名与已有用户名重复' })
        }
      }
    },
    handleDeleteRole({ $index, row }) { // 点击删除角色
      this.$confirm('确定要删除当前角色？', '确定操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole({ // 发送网络请求
            id: row.id
          })
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.rolesList.splice($index, 1)
        })
        .catch(err => err)
    },
    async getRoutes() { // 获取所有路由
      const routes = []
      this.$store.state.permission.routes.forEach(e => { // 将vuex中除了角色管理以外的所有路由放在 routes 中
        if (e.name !== 'Permission' && e.name !== 'Index') {
          routes.push(e)
        }
      })
      this.serviceRoutes = routes // 备份一份路由
      this.routes = this.generateRoutes(routes) // 序列化路由
    },
    async getRole() { // 获取所有角色
      const res = await getRole() // 发送网络请求
      res.data.list.forEach(e => { // 将角色的路由表由字符串变为对象
        e.routes = JSON.parse(e.routes)
      })
      this.rolesList = res.data.list
      this.roleNameList = []
      this.rolesList.forEach(e => {
        this.roleNameList.push(e.name)
      })
    },
    async getUser() { // 获取所有用户
      const res = await getUser()
      this.userList = res.data.list
    },
    generateRoutes(routes, basePath = '/') { // 序列化管理员路由  //////// 下面的代码暂时还没研究 ////////
      const res = []
      for (let route of routes) {
        if (route.hidden) { continue }
        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }
        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title
        }
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) { // 序列化角色路由
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []
      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }
        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }
      return false
    }
  }
}
</script>

<style lang="scss">
.app-container {
  display: flex;
  .icon-class {
    color: red;
  }
  .left {
    flex: 1;
    padding-right: 20px;
  }
  .right {
    padding-left: 20px;
    flex: 1;
  }
  .el-dialog {
    width: 456px;
  }
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
