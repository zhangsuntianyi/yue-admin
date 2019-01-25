import _ from 'lodash';

import HttpClient from '../utils/httpClient';
import MockClient from '../utils/mockClient';
import UserData from '../data/user';
import MenuData from '../data/menus';

export default {
  // 登录
  login(data, success, error) {
    MockClient.get('/login', data, () => {
      const user = _.find(
        UserData.users,
        item => item.loginName === data.loginName && item.password === data.password
      );
      if (user) {
        user.menus = MenuData.menus;
        user.permissions = MenuData.permissions;
        return [
          200,
          {
            token: user.token,
            user: user,
          }
        ];
      }
      return [
        500,
        {
          message: '登录名或密码错误'
        }
      ];
    });

    HttpClient.request({
      url: '/login',
      data,
      success: (responseData) => {
        success(responseData);
      },
      error: () => {
        error();
      }
    });
  }
};
