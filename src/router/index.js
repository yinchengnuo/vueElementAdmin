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
    meta: {
      title: '路由嵌套',
      icon: '路由嵌套'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu 1', icon: '路由嵌套' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu 1-1', icon: '路由嵌套' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'Menu 1-2', icon: '路由嵌套' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu 1-2-1', icon: '路由嵌套' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu 1-2-2', icon: '路由嵌套' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu 1-3', icon: '路由嵌套' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'Menu 2', icon: '路由嵌套' }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    name: 'Permission',
    children: [
      {
        path: 'index',
        component: () => import('@/views/role'),
        name: 'RolePermission',
        meta: { title: '角色管理', icon: 'peoples' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() { // 重置路由
  router.matcher = createRouter().matcher
}

export default router
