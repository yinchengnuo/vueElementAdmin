import Layout from '@/layout'

export default [
  {
    path: '/root',
    component: Layout,
    redirect: '/root/index',
    name: 'root',
    alwaysShow: true,
    meta: { title: 'ROOT', icon: 'root' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/root/DownExcel'),
        name: 'DownExcel',
        meta: { title: '下载Excel', icon: '下载Excel' }
      },
      {
        path: 'upload',
        component: () => import('@/views/root/UploadExcel'),
        name: 'UploadExcel',
        meta: { title: '上传Excel', icon: '上传Excel' }
      },
      {
        path: 'repair',
        component: () => import('@/views/root/ZbsRepair'),
        name: 'ZbsRepair',
        meta: { title: '争霸赛维护', icon: '争霸赛维护' }
      }
    ]
  }
]
