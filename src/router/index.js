import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import allConstRoutes from './allConstRoutes'
export const constantRoutes = allConstRoutes

Vue.use(Router)

export const asyncRoutes = [ // 异步加载路由
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: { title: '路由嵌套', icon: '路由嵌套' },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/Nested/menu1/index'),
        name: 'Menu1',
        meta: { title: '菜单 1', icon: '路由嵌套' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/Nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '菜单 1-1', icon: '路由嵌套' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/Nested/menu1/menu1-2'),
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: '菜单 1-2', icon: '路由嵌套' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/Nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: '菜单 1-2-1', icon: '路由嵌套' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/Nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: '菜单 1-2-2', icon: '路由嵌套' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/Nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: '菜单 1-3', icon: '路由嵌套' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/Nested/menu2/index'),
        meta: { title: '菜单 2', icon: '路由嵌套' }
      }
    ]
  },
  {
    path: '/code-example',
    component: Layout,
    redirect: '/code-example',
    name: 'CodeExample',
    meta: { title: '开发示例', icon: '开发示例' },
    children: [
      {
        path: 'data-map',
        name: 'PageMap',
        component: () => import('@/views/NestedExample/PageDataMap'),
        meta: { title: '数据地图', icon: '中国地图' }
      },
      {
        path: 'query-search',
        component: () => import('@/views/NestedExample/PageQuerySearch'),
        name: 'PageQuerySearch',
        meta: { title: '多条件查询', icon: '多条件查询' }
      },
      {
        path: 'button-permission',
        component: () => import('@/views/NestedExample/PageButtonPermission'),
        name: 'PageButtonPermission',
        meta: { title: '按钮权限', icon: '按钮权限', buttonPermission: [
          { id: 'search', name: '搜索', permission: true },
          { id: 'add', name: '添加', permission: true },
          { id: 'del', name: '删除', permission: true }
        ] }
      }
    ]
  },
  {
    path: '/admin-manage',
    component: Layout,
    redirect: '/admin-manage/role-manage',
    name: 'AdminManage',
    meta: { title: '后台管理', icon: '后台管理' },
    children: [
      {
        path: 'role-manage',
        component: () => import('@/views/NestedAdminManage/PageRoleManage'),
        name: 'PageRoleManage',
        meta: { title: '角色管理', icon: '角色管理' }
      },
      {
        path: 'account-manage',
        name: 'PageAccountManage',
        component: () => import('@/views/NestedAdminManage/PageAccountManage'),
        meta: { title: '账号管理', icon: '账号管理' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  mode: 'hash'
  // mode: 'history'
})

const router = createRouter()

export function resetRouter() { // 重置路由
  router.matcher = createRouter().matcher
}

export default router
