export default {
  token: '',

  tabs: [
    { title: '首页', fullPath: '/index', isIndex: true },
  ],

  // 存储到storage的key
  storageKey: 'yue-admin',

  // 不需要token的路由地址
  unTokenRoutes: [
    '/login',
    '/401',
    '/500',
    '/*',
  ],

  // 菜单是否收起
  collapsed: false
};
