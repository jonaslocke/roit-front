import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openDrawer: true,
    currentPage: 0,
    pageSize: 2,
    pageCount: null,
  },
  mutations: {
    setOpenDrawer: (state, payload) => (state.openDrawer = payload),
    setCurrentPage: (state, payload) => (state.currentPage = payload),
    setPageSize: (state, payload) => (state.pageSize = payload),
    setPageCount: (state, payload) => (state.pageCount = payload),
  },
  actions: {
    setOpenDrawer: ({ commit }, payload) => commit("setOpenDrawer", payload),
    setCurrentPage: ({ commit }, payload) => commit("setCurrentPage", payload),
    setPageSize: ({ commit }, payload) => commit("setPageSize", payload),
    setPageCount: ({ commit }, payload) => commit("setPageCount", payload),
  },
  getters: {
    getOpenDrawer: (state) => state.openDrawer,
    getCurrentPage: (state) => state.currentPage,
    getPageSize: (state) => state.pageSize,
    getPageCount: (state) => state.pageCount,
  },
  modules: {},
});
