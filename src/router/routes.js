function loadView(view) {
  return () => import(`@/views/${view}.vue`);
}

export default [
  // 登录页
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: loadView('login'),
  },

  // 业务页
  {
    path: '/',
    name: 'Main',
    redirect: '/index',
    meta: {
      title: '主页'
    },
    component: loadView('Main'),
    children: [
      // 主页
      {
        path: 'index',
        component: loadView('index'),
        meta: {
          title: '首页',
          breadCrumbList: [
            { name: '首页', to: '/index' }
          ],
        },
      },

      {
        path: 'system/user',
        component: loadView('system/user/list'),
        meta: {
          title: '用户管理',
          permissions: ['system.user.menu'],
          breadCrumbList: [
            { name: '首页', to: '/index' },
            { name: '用户管理' }
          ],
        },
      }
    ]
  },

  // 错误页
  {
    path: '/401',
    name: '401',
    meta: {
      title: '无权限'
    },
    component: loadView('error/401')
  },
  {
    path: '/500',
    name: '500',
    meta: {
      title: '系统异常'
    },
    component: loadView('error/500')
  },
  {
    path: '*',
    name: '404',
    meta: {
      title: '未找到页面'
    },
    component: loadView('error/404')
  }
];
