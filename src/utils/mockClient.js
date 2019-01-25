import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export default {
  post(url, data, responseFn) {
    const mock = new MockAdapter(axios);
    mock.onPost(url, data).reply((config) => {
      console.log('mock-config', config);
      return responseFn();
    });
  },

  get(url, data, responseFn) {
    const mock = new MockAdapter(axios);
    mock.onGet(url, { data }).reply((config) => {
      console.log('mock-config', config);
      return responseFn();
    });
  },

  put(url, data, responseFn) {
    const mock = new MockAdapter(axios);
    mock.onPut(url, data).reply((config) => {
      console.log('mock-config', config);
      return responseFn();
    });
  }
};
