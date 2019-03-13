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
        component: loadView('system/user/index'),
        meta: {
          title: '用户管理',
          permissions: ['system.user.menu'],
          breadCrumbList: [
            { name: '首页', to: '/index' },
            { name: '用户管理' }
          ],
        },
      },

      {
        path: 'system/department',
        component: loadView('system/department/index'),
        meta: {
          title: '部门管理',
          permissions: ['system.department.menu'],
          breadCrumbList: [
            { name: '首页', to: '/index' },
            { name: '部门管理' }
          ],
        },
      },

      {
        path: 'system/menu',
        component: loadView('system/menu/index'),
        meta: {
          title: '菜单管理',
          permissions: ['system.menu.menu'],
          breadCrumbList: [
            { name: '首页', to: '/index' },
            { name: '菜单管理' }
          ],
        },
      },

      {
        path: 'component/editor',
        component: loadView('component/editor/index'),
        meta: {
          title: '富文本',
          permissions: ['component.editor.menu'],
          breadCrumbList: [
            { name: '首页', to: '/index' },
            { name: '富文本' }
          ],
        },
      },

      {
        path: 'component/dragDrop',
        component: loadView('component/dragDrop/index'),
        meta: {
          title: '拖拽',
          permissions: ['component.dragDrop.menu'],
          breadCrumbList: [
            { name: '首页', to: '/index' },
            { name: '拖拽' }
          ],
        },
      },

      {
        path: 'component/excel',
        component: loadView('component/excel/index'),
        meta: {
          title: '导入导出',
          permissions: ['component.excel.menu'],
          breadCrumbList: [
            { name: '首页', to: '/index' },
            { name: '导入导出' }
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
