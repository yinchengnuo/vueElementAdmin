import Layout from '@/layout'

export default [
  {
    path: '/root',
    component: Layout,
    alwaysShow: true,
    name: 'Root',
    redirect: '/root/root-md',
    meta: { title: 'root权限', icon: 'root权限' },
    children: [
      // {
      //   path: 'api-test',
      //   name: 'PageAPITest',
      //   meta: { title: 'API测试', icon: 'API测试' },
      //   component: () => import('@/views/NestedRootFunction/PageAPITest')
      // },
      {
        path: 'root-md',
        name: 'PageRootMd',
        meta: { title: '使用场景', icon: 'root_md' },
        component: () => import('@/views/NestedRootFunction/PageRootMd')
      },
      {
        path: 'ip-whitelist',
        name: 'PageIpWhitelist',
        meta: { title: 'IP白名单', icon: 'IP白名单' },
        component: () => import('@/views/NestedRootFunction/PageIpWhitelist')
      }
    ]
  }
]
