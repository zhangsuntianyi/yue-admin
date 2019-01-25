export default {
  token: '',

  tabs: [
    { title: '首页', fullPath: '/index', isIndex: true },
  ],

  // 存储到storage的key
  storageKey: 'yue-admin',

  baseUrl: 'http://localhost:8081/yueAdmin/api',

  // 不需要token的路由地址
  unTokenRoutes: [
    '/login',
    '/401',
    '/500',
    '/*',
  ],
};
