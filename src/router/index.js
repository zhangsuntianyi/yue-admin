import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '../store';
import { LoadingBar } from 'iview';
import { canTurnTo } from "../utils/utils";
import _ from 'lodash';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes,
});

const turnTo = (to, next) => {
  const permissions = to.meta ? to.meta.permissions : [];
  if (canTurnTo(permissions, store.state.user.permissions)) {
    // 有权限，可访问
    next();
  } else {
    // 无权限，重定向到401页面
    LoadingBar.error();
    next({ replace: true, path: '/401' });
  }
};

router.beforeEach((to, from, next) => {
  LoadingBar.start();

  // 不需要登录的页面直接跳转
  const unTokenRoutes = store.state.unTokenRoutes;
  if (_.includes(unTokenRoutes, to.path)) {
    next();
    return;
  }

  const token = store.state.token;
  if (!token || token === '') {
    // 未登录跳转至登录页
    LoadingBar.error();
    next('/login');
    return;
  }

  turnTo(to, next);
});

router.afterEach(to => {
  window.document.title = to.meta ? to.meta.title : 'yue-admin';
  LoadingBar.finish();
});

export default router;
