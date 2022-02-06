import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openDrawer: true,
    currentPage: 0,
    pageSize: 5,
    pageCount: null,
    users: [],
  },
  mutations: {
    setOpenDrawer: (state, payload) => (state.openDrawer = payload),
    setCurrentPage: (state, payload) => (state.currentPage = payload),
    setPageSize: (state, payload) => (state.pageSize = payload),
    setUsers: (state, payload) => (state.users = payload),
  },
  actions: {
    setOpenDrawer: ({ commit }, payload) => commit("setOpenDrawer", payload),
    setCurrentPage: ({ commit }, payload) => commit("setCurrentPage", payload),
    setPageSize: ({ commit }, payload) => commit("setPageSize", payload),
    setUsers: ({ commit }, payload) => commit("setUsers", payload),
    fetchUsers: async ({ commit }) => {
      const api = `${process.env.VUE_APP_API}`;
      const response = await fetch(api);
      const data = await response.json();
      commit("setUsers", data);
    },
  },
  getters: {
    getOpenDrawer: (state) => state.openDrawer,
    getCurrentPage: (state) => state.currentPage,
    getPageSize: (state) => state.pageSize,
    getPageCount: (state) => Math.ceil(state.users.length / state.pageSize),
    getUsers: (state) => state.users,
    getTotalUsers: (state) => state.users.length,
  },
  modules: {},
});
