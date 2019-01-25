// 后台请求前缀
let baseUrl = 'http://localhost:8081/yueAdmin/api';

if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://www.yueAdmin.com:8081/yueAdmin/api';
}

export default {
  baseUrl,
};
