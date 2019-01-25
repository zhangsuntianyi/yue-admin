import axios from 'axios';
import { LoadingBar, Message } from 'iview';

import store from '../store';
import router from '../router';
import Constant from '../data/constant';

export default {
  request(opts) {
    opts = opts || {};
    const headers = opts.headers || {};
    headers.Authorization = store.state.token;

    this.execute({
      url: opts.url || '',
      method: opts.method || 'get',
      headers,
      data: opts.data || {},
      success: (response) => {
        if (opts.success) {
          opts.success(response.data);
        }
      },
      error: (response) => {
        if (response.code === 'time_out') {
          store.commit('setToken', '');
          router.replace('/login');
          return;
        }

        const errorMessage = response.message;
        // 弹出错误消息
        Message.error(errorMessage);
        if (opts.error) {
          opts.error(errorMessage);
        }
      }
    });
  },

  execute(opts) {
    // eslint-disable-next-line
    opts = opts || {};

    const method = opts.method || 'get';
    const url = opts.url || '';
    const config = {
      url,
      baseURL: Constant.baseUrl,
      headers: opts.headers || {},
      method,
    };

    if (method === 'get') {
      config.params = opts.data || {};
    } else {
      config.data = opts.data || {};
    }

    LoadingBar.start();
    axios(config).then((response) => {
      LoadingBar.finish();
      if (opts.success) {
        opts.success(response);
      }
    }).catch((error) => {
      LoadingBar.error();

      console.log('axios', error.config);
      console.log('axios', error.response);
      if (opts.error) {
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          console.log('axios', error.response.data);
          console.log('axios', error.response.status);
          if (error.response.data) {
            opts.error(error.response.data);
          } else {
            opts.error({
              'message': error.message
            });
          }
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('axios', error.message);
          opts.error({
            'message': error.message
          });
        }
      }
    });
  }
}
