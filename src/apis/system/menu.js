import HttpClient from '../../utils/httpClient';
import MockClient from '../../utils/mockClient';
import MenuData from '../../data/menus';

export default {
  // 获取菜单
  getMenus(success, error) {
    MockClient.get('/system/menu', {}, () => {
      return [
        200,
        {
          menu: MenuData.menus,
        }
      ];
    });

    HttpClient.request({
      url: '/system/menu',
      success: (responseData) => {
        success(responseData);
      },
      error: () => {
        error();
      }
    });
  }
};
