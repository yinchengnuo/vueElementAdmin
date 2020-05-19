export default [
  {
    path: '/public-chart',
    hidden: true,
    meta: { title: '公共页面' },
    component: () => import('@/views/PublicPages/PagePublicChart')
  }
]
