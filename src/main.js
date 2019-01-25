import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import iView from 'iview';
import _ from 'lodash';
import 'iview/dist/styles/iview.css';
import './css/global.css';

Vue.config.productionTip = false;

Vue.use(iView);
Vue.prototype.$lodash = _;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
