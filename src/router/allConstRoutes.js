import Layout from '@/layout'

export default [ // 所有的默认公有路由
  {
    path: '/',
    redirect: '/',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/',
        component: () => import('@/views/PageIndex'),
        name: 'PageIndex',
        meta: { title: '首页', icon: '首页' }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/PageRedirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/PageLogin'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/Page404'),
    hidden: true,
    meta: { title: '404' }
  },
  {
    path: '/change-password',
    component: Layout,
    redirect: '/change-password/',
    hidden: true,
    children: [
      {
        path: '/',
        component: () => import('@/views/PageChangePassword'),
        name: 'PageChangePassword',
        meta: { title: '修改密码', noCache: true }
      }
    ]
  }
]
