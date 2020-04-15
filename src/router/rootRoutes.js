import Layout from '@/layout'

export default [
  {
    path: '/root',
    component: Layout,
    redirect: '/root/index',
    name: 'root',
    alwaysShow: true,
    meta: { title: '工具箱', icon: '工具箱' },
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
      }
    ]
  },
  {
    path: 'https://github.com/yinchengnuo/vueElementAdmin',
    meta: { title: 'GitHub', icon: 'GitHub' }
  }
]
