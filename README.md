# 后台管理系统

本项目是在 [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/) 的基础上，结合本人工作中的实际需求，对其再次封装以达到多次快速复用的结果。在原有基础上，使用后端存储路由表&前端生成动态路由的形式进行权限控制，以角色管理和账号管理的形式呈现，另实现了每个页面都可进行单独的按钮级别权限控制。

## [线上预览](https://yinchengnuo.com/adminVueElement/) (用户名：椒麻鸡 密码：123456)

## 权限控制

权限控制是一个后台管理系统的核心。本项目通过角色管理和账号管理实现权限控制。root 角色为超级管理管，其实例账号只能有一个（也可以有多个），默认拥有全部路由，可以访问后台管理系统的任意页面，在 [线上预览](https://yinchengnuo.com/adminVueElement/) 中即用户名为 “椒麻鸡” 的账号。其余角色都是根据 root 角色的路由表，由 root 角色根据实际情况分配给下级角色。同时 root 可以通过角色管理修改任意角色的权限，同时作为角色的实例账号的权限也会发生改变。

## 按钮权限

本项目在 [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/) 中路由表的基础上，通过在需要的按钮鉴权的页面的路由对象的 mate 上挂载对象，同时结合 vue 的自定义指令实现按钮权控。

```javascript
// 路由对象
{
    path: 'button-permission',
    component: () => import('@/views/NestedExample/PageButtonPermission'),
    name: 'PageButtonPermission',
    meta: { title: '按钮权限', icon: '按钮权限', buttonPermission: [
        { id: 'search', name: '搜索', permission: true },
        { id: 'add', name: '添加', permission: false },
        { id: 'del', name: '删除', permission: true }
    ] }
}
```

```html
<!-- 通过自定义指令决定按钮是否显示 -->
<el-button v-button-permission:search type="primary">搜索</el-button>
<el-button v-button-permission:add type="primary">添加</el-button>
<el-button v-button-permission:del type="primary">删除</el-button>
```

```javascript
// 自定义指令
Vue.directive('button-permission', {
  bind: (el, { arg }, { context: { $route: { meta }}}) => {
    if (meta.buttonPermission && arg && meta.buttonPermission.find(e => e.id === arg)) {
      if (!meta.buttonPermission.find(e => e.id === arg).permission) {
        el.style.display = 'none'
        Vue.nextTick(() => el.remove())
      }
    }
  }
})
```

## 接口处理

本项目的权控体现为通过角色管理添加角色并赋予角色一定的权限，通过账号管理添加账号并赋予账号角色，这样下来，不用角色的账号就有了不用的权限，就实现了一个简单权控。由于本项目使用的前端路由，因此使用的也是前端鉴权。这大大减轻了后台同事的工作负担，实现权控只需要简单的CRUD即可。在本项目中，实现所有的权控逻辑，需要 13 个接口，听起来很多，但是其实只有 5 个。它们分别是：角色的增删改查（4个）、账号的增删改查（4个）、登陆接口、获取用户信息接口、修改密码接口。我们从后往前说：

修改密码：因为本项目采用的是添加而非注册的形式，因此所有新添加的账号默认密码都是 123456。当然，这个你可以根据业务不同进行修改，比如默认密码为一个 hash 字符串会更安全一些或者新增一个注册页面。

获取用户信息接口：获取用户昵称、头像、角色、路由表等基本信息

登陆接口：校验密码&获取 token

角色的增删和账号的增删改查都可以根据需求进行调整，比如本项目中：只有 root 角色可以删除账号、用户角色管理权限的用户只能看到和删除没有角色管理权限的角色等等

本项目的接口处理使用的 Node.js 模拟的，相关的逻辑在 [role.js](https://github.com/yinchengnuo/mockApiNode/blob/master/admin/apis/role.js) 和 [user.js](https://github.com/yinchengnuo/mockApiNode/blob/master/admin/apis/user.js)

## 预览图

![1](https://github.com/yinchengnuo/vueElementAdmin/blob/master/md/1.png)
![2](https://github.com/yinchengnuo/vueElementAdmin/blob/master/md/2.png)
