import Vue from "vue";
import Vuex from "vuex";

import Snackbar from "../models/Snackbar";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openDrawer: true,
    currentPage: 0,
    pageSize: 5,
    pageCount: null,
    users: [],
    handleUserOpen: false,
    selectedUser: {},
    snackbar: {},
  },
  mutations: {
    setOpenDrawer: (state, payload) => (state.openDrawer = payload),
    setCurrentPage: (state, payload) => (state.currentPage = payload),
    setPageSize: (state, payload) => (state.pageSize = payload),
    setUsers: (state, payload) => (state.users = payload),
    setHandleUserOpen: (state, payload) => (state.handleUserOpen = payload),
    setSelectedUser: (state, payload) => (state.selectedUser = payload),
    setSnackbar: (state, payload) => (state.snackbar = new Snackbar(payload)),
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
    setHandleUserOpen: ({ commit }, payload) =>
      commit("setHandleUserOpen", payload),

    setSelectedUser: ({ commit }, payload) =>
      commit("setSelectedUser", payload),

    setSnackbar: ({ commit }, payload) => commit("setSnackbar", payload),
  },
  getters: {
    getOpenDrawer: (state) => state.openDrawer,
    getCurrentPage: (state) => state.currentPage,
    getPageSize: (state) => state.pageSize,
    getPageCount: (state) => Math.ceil(state.users.length / state.pageSize),
    getUsers: (state) => state.users,
    getTotalUsers: (state) => state.users.length,
    getHandleUserOpen: (state) => state.handleUserOpen,
    getSelectedUser: (state) => state.selectedUser,
    hasSelectedUser: (state) => Object.keys(state.selectedUser).length > 0,
    getSnackbar: (state) => state.snackbar,
  },
  modules: {},
});
