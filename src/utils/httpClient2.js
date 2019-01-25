import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import MockClient from '../utils/mockClient';
import { LoadingBar, Message } from 'iview';

import store from '../store';
import router from '../router';

export default {
  get(opts) {
    opts = opts || {};
    const headers = opts.headers || {};
    headers.Authorization = store.state.token;
    const url = opts.url || '';
    const data = opts.data || {};

    const mock = new MockAdapter(axios);
    MockClient.get(mock, url, data);

    axios.get(url, {
      baseURL: store.state.baseUrl,
      headers,
      params: data,
    }).then(function (response) {
      console.log('get-success', response.data);
      if (opts.success) {
        opts.success(response.data)
      }
    }).catch(function (error) {
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
  },

  post(opts) {
    opts = opts || {};
    const headers = opts.headers || {};
    headers.Authorization = store.state.token;
    const url = opts.url || '';
    const data = opts.data || {};

    const mock = new MockAdapter(axios);
    MockClient.post(mock, url, data);

    axios.post(url, data, {
      baseURL: store.state.baseUrl,
      headers
    }).then(function (response) {
      console.log('get-success', response.data);
      if (opts.success) {
        opts.success(response.data)
      }
    }).catch(function (error) {
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
  },

  put(opts) {

  },
}
