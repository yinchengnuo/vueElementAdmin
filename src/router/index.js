import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import allRootRoutes from './allRootRoutes'
import allConstRoutes from './allConstRoutes'
import allPublicRoutes from './allPublicRoutes'
import { publicPath as base } from '@/settings'
export const rootRoutes = allRootRoutes
export const publicRoutes = allPublicRoutes
export const constantRoutes = allConstRoutes

Vue.use(Router)

export const asyncRoutes = [ // 异步加载路由
  {
    path: '/nested',
    name: 'Nested',
    component: Layout,
    redirect: '/nested/menu1/menu1-1',
    meta: { title: '路由嵌套', icon: '路由嵌套' },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'),
        name: 'Menu1',
        meta: { title: '菜单 1', icon: '路由嵌套' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '菜单1-1', icon: '路由嵌套' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: '菜单1-2', icon: '路由嵌套' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: '菜单1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: '菜单1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: '菜单1-3', icon: '路由嵌套' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '菜单 2', icon: '路由嵌套' }
      }
    ]
  },
  {
    path: '/code-example',
    name: 'CodeExample',
    component: Layout,
    redirect: '/code-example/data-map',
    meta: { title: '开发示例', icon: '开发示例' },
    children: [
      {
        path: 'data-map',
        name: 'PageDataMap',
        meta: { title: '数据地图', icon: '中国地图' },
        component: () => import('@/views/NestedExample/PageDataMap')
      },
      {
        path: 'query-search',
        name: 'PageQuerySearch',
        meta: { title: '条件查询', icon: '条件查询' },
        component: () => import('@/views/NestedExample/PageQuerySearch')
      },
      {
        path: 'fast-chart',
        name: 'PageFastChart',
        meta: { title: '快速图表', icon: '快速图表' },
        component: () => import('@/views/NestedExample/PageFastChart')
      },
      {
        path: 'button-permission',
        name: 'PageButtonPermission',
        meta: { title: '按钮权限', icon: '按钮权限', buttonPermission: [
          { id: 'search', name: '搜索', permission: true },
          { id: 'add', name: '添加', permission: true },
          { id: 'del', name: '删除', permission: true }
        ] },
        component: () => import('@/views/NestedExample/PageButtonPermission')
      },
      {
        path: 'unread-message',
        name: 'PageUnreadMessage',
        meta: { title: '未读消息', icon: '未读消息' },
        component: () => import('@/views/NestedExample/PageUnreadMessage')
      },
      {
        path: 'dynamic-cache',
        name: 'PageDynamicCache',
        meta: { title: '动态缓存', icon: '动态缓存' },
        component: () => import('@/views/NestedExample/PageDynamicCache')
      },
      {
        path: 'multiple-dialog',
        name: 'PageMultipleDialog',
        meta: { title: '多对话框', icon: '多对话框' },
        component: () => import('@/views/NestedExample/PageMultipleDialog')
      }
    ]
  },
  {
    path: '/tools',
    component: Layout,
    name: 'NestedTools',
    redirect: '/tools/express-query',
    meta: { title: '工具箱', icon: '工具箱' },
    children: [
      {
        path: 'download-excel',
        name: 'PageDownloadExcel',
        meta: { title: '下载Excel', icon: '下载Excel' },
        component: () => import('@/views/NestedTools/PageDownloadExcel')
      },
      {
        path: 'upload-excel',
        name: 'PageUploadExcel',
        meta: { title: '上传Excel', icon: '上传Excel' },
        component: () => import('@/views/NestedTools/PageUploadExcel')
      },
      {
        path: 'express-query',
        name: 'PageExpressQuery',
        meta: { title: '物流查询', icon: '物流查询' },
        component: () => import('@/views/NestedTools/PageExpressQuery')
      },
      {
        path: 'picture-compression',
        name: 'PagePictureCompression',
        meta: { title: '图片压缩', icon: '图片压缩' },
        component: () => import('@/views/NestedTools/PagePictureCompression')
      }
    ]
  },
  {
    path: '/admin-manage',
    component: Layout,
    name: 'AdminManage',
    redirect: '/admin-manage/role-manage',
    meta: { title: '后台管理', icon: '后台管理' },
    children: [
      {
        path: 'role-manage',
        name: 'PageRoleManage',
        meta: { title: '角色管理', icon: '角色管理', noCache: true },
        component: () => import('@/views/NestedAdminManage/PageRoleManage')
      },
      {
        path: 'account-manage',
        name: 'PageAccountManage',
        meta: { title: '账号管理', icon: '账号管理', noCache: true },
        component: () => import('@/views/NestedAdminManage/PageAccountManage')
      }
    ]
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  base,
  mode: 'history',
  routes: constantRoutes.concat(publicRoutes)
})

const router = createRouter()

export function resetRouter() { // 重置路由
  router.matcher = createRouter().matcher
}

export default router
