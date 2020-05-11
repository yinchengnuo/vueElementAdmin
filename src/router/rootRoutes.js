import Layout from '@/layout'

export default [
  {
    path: '/tools',
    component: Layout,
    name: 'NestedTools',
    redirect: '/tools/express-query',
    meta: { title: '工具箱', icon: '工具箱' },
    children: [
      {
        path: 'download-excel',
        component: () => import('@/views/NestedTools/PageDownloadExcel'),
        name: 'PageDownloadExcel',
        meta: { title: '下载Excel', icon: '下载Excel' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/NestedTools/PageUploadExcel'),
        name: 'PageUploadExcel',
        meta: { title: '上传Excel', icon: '上传Excel' }
      },
      {
        path: 'express-query',
        component: () => import('@/views/NestedTools/PageExpressQuery'),
        name: 'PageExpressQuery',
        meta: { title: '物流查询', icon: '物流查询' }
      }
    ]
  },
  {
    path: 'https://github.com/yinchengnuo/vueElementAdmin',
    meta: { title: 'GitHub', icon: 'GitHub' }
  }
]
