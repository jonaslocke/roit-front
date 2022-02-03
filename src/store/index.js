import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openDrawer: true,
  },
  mutations: {
    setOpenDrawer: (state, payload) => (state.openDrawer = payload),
  },
  actions: {
    setOpenDrawer: ({ commit }, payload) => commit("setOpenDrawer", payload),
  },
  getters: {
    getOpenDrawer: (state) => state.openDrawer,
  },
  modules: {},
});
