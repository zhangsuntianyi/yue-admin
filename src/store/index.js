import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import state from './state';
import * as mutations from './mutations';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    user,
  },
  plugins: [
    createPersistedState({
      key: state.storageKey,
    }),
  ],
})
