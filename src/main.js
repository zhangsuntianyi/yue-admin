import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import iView from 'iview';
import OrgTree from 'v-org-tree';
import TreeTable from 'tree-table-vue';
import _ from 'lodash';
import 'iview/dist/styles/iview.css';
import 'v-org-tree/dist/v-org-tree.css'

Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(OrgTree);
Vue.use(TreeTable);
Vue.prototype.$lodash = _;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
