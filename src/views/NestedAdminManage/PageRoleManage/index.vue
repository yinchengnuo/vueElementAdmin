<template>
  <div class="PageRoleManage">
    <el-button type="primary" style="margin-bottom: 8px;" @click="handleAddRole">添加角色</el-button>
    <el-table :data="list" border>
      <el-table-column align="center" width="234" prop="name" label="角色名" />
      <el-table-column align="center" label="权限">
        <template slot-scope="scope">
          <el-tag v-for="(value, index) in scope.row.title" :key="index" style="margin: 2px;">{{ value }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column wi align="center" width="234" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEditRole(scope.row)">编辑角色权限</el-button>
          <el-button type="danger" size="small" @click="handleDeleteRole(scope.row)">删除角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" :destroy-on-close="true" :title="dialogType === 'add' ? '添加角色' : '编辑角色'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="角色名">
          <el-input v-model="role.name" maxlength="12" placeholder="角色名" />
        </el-form-item>
        <div class="el-form-item-wrapper">
          <el-form-item label="页面权限">
            <el-tree
              ref="tree"
              :data="routes"
              :props="{ children: 'children', label: 'title' }"
              show-checkbox
              accordion
              :indent="48"
              icon-class="el-icon-arrow-right"
              highlight-current
              node-key="path"
              class="permission-tree"
              @node-click="clickTree"
            />
          </el-form-item>
          <el-form-item v-if="buttonPermission" label="按钮权限">
            <el-table :data="buttonPermission" size="mini" :show-header="false" stripe border>
              <el-table-column align="center" label="按钮权限">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.permission" />
                </template>
              </el-table-column>
              <el-table-column align="center" label="按钮名称">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="handleCloseDialog">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '../../../utils'
import { api_getRole, api_addRole, api_deleteRole, api_updateRole } from '@/api/role'

export default {
  name: 'PageRoleManage',
  data() {
    return {
      role: { id: '', name: '', routes: [] },
      list: [],
      dialogType: '',
      dialogVisible: false,
      buttonPermission: null,
      routes: this.generateRoutes(deepClone(this.$store.state.permission.routes))
    }
  },
  mounted() {
    this.getRole() // 获取所有角色
  },
  methods: {
    getRole() { // 获取角色方法
      this.$request(api_getRole(), ({ list }) => {
        list.forEach(e => {
          e.title = JSON.stringify(e.routes).match(/(?<=title":").+?(?=")/g)
        })
        if (this.$store.state.user.role === 'root') {
          this.list = list.filter(e => e.name !== 'root')
        } else if (JSON.stringify(this.$store.state.user.routes).match('后台管理')) {
          this.list = list.filter(e => JSON.stringify(e.routes).match('后台管理') === null && e.name !== 'root')
        } else {
          this.list = list
        }
      })
    },
    handleAddRole() { // 点击添加角色
      this.role = Object.assign({}, { id: '', name: '', routes: [] }) // 将弹出框中的用户信息置为空
      this.dialogType = 'add' // 弹出框类型为添加用户
      this.$nextTick(() => { // nextTick是为了在弹出框首次打开之后再获取权限Tree
        this.$refs.tree.setCheckedNodes([]) // 清除已选中的权限Tree
      })
      this.dialogVisible = true // 弹出框
    },
    handleEditRole(row) { // 点击编辑角色
      this.dialogType = 'edit' // 弹出框类型为编辑用户
      this.role = deepClone(row) // 弹出框中的用户信息为当前行的用户信息，deepclone 之后权限Tree和用户信息互不干扰
      const mergeMetas = (origin, target) => {
        origin.forEach(o => {
          target.forEach(t => {
            if (o.meta && t.meta && o.name === t.name) {
              o.meta = t.meta
            }
            if (o.children && t.children) {
              mergeMetas(o.children, t.children)
            }
          })
        })
      }
      mergeMetas(this.routes, this.role.routes)
      this.dialogVisible = true // 弹出框
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
    handleCloseDialog() {
      this.dialogVisible = false
      this.buttonPermission = null
      this.routes = this.generateRoutes(deepClone(this.$store.state.permission.routes))
    },
    confirmRole() { // 点击提交添加/修改角色
      if (!this.role.name) { // 检测是否填写角色名
        this.$message.info({ message: '请设置角色名' })
        return
      }
      const checkedKeys = this.$refs.tree.getCheckedKeys() // 获取权限 Tree 中已选中的部分
      this.role.routes = this.generateTree(deepClone(this.$store.state.permission.routes), '/', checkedKeys) // 根据已选中的部分格式化路由表
      this.role.routes.forEach(e => { // 删除序列化后无效的路由信息
        e.component ? e.component = '' : ''
      })
      if (this.dialogType === 'edit') { // 如果是编辑角色
        this.$request(api_updateRole(this.role), data => {
          this.$notify.success({ title: '修改成功', message: '角色名: ' + this.role.name })
          this.getRole() // 添加成功后重新获取下角色列表
          this.dialogVisible = false // 收起弹出框
        }, { endStillLoading: true })
      } else if (this.dialogType === 'add') { // 如果是添加角色
        this.$request(api_addRole(this.role), data => {
          this.$notify.success({ title: '添加成功', message: '角色名: ' + this.role.name })
          this.getRole() // 添加成功后重新获取下角色列表
          this.dialogVisible = false // 收起弹出框
        }, { endStillLoading: true })
      }
    },
    handleDeleteRole({ id }) { // 点击删除角色
      this.$confirm('确定要删除当前角色？', '确定操作', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
        .then(() => {
          this.$request(api_deleteRole({ id }), data => {
            this.$message.success('删除成功')
            this.getRole() // 删除成功后重新获取下角色列表
          }, { endStillLoading: true })
        })
        .catch(err => err)
    },
    clickTree({ meta: { buttonPermission }}, { checked }) { // 点击权限 Tree
      if (buttonPermission) {
        this.buttonPermission = buttonPermission
      } else {
        this.buttonPermission = null
      }
    },
    generateRoutes(routes, basePath = '/') { // 序列化路由
      const res = [] // 序列化后的路由表
      for (let route of routes) { // 便利路由表
        if (route.hidden) { continue } // 如果路由不存在于侧边栏就停止操作进行下次循环
        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }
        const data = {
          name: route.name,
          meta: route.meta || {},
          title: route.meta && route.meta.title,
          path: path.resolve(basePath, route.path)
        }
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
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
          route.meta = this.$refs.tree.getCheckedNodes().find(e => e.name === route.name).meta
          res.push(route)
        }
      }
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
  .PageRoleManage {
    padding: 8px;
    box-sizing: border-box;
    .el-input {
      width: 200px;
    }
    .el-form-item-wrapper {
      display: flex;
      .el-form-item {
        flex: 1;
      }
    }
  }
</style>
