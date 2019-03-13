import HttpClient from '../../utils/httpClient';
import MockClient from '../../utils/mockClient';
import DepartmentData from '../../data/department';

export default {
  // 获取部门树
  getDeptTree(success, error) {
    MockClient.get('/system/department', {}, () => {
      return [
        200,
        {
          department: DepartmentData,
        }
      ];
    });

    HttpClient.request({
      url: '/system/department',
      success: (responseData) => {
        success(responseData);
      },
      error: () => {
        error();
      }
    });
  }
};
