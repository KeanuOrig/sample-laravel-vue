// store/modules/loading.js

const state = {
    isLoading: false,
  };
  
  const mutations = {
    SET_LOADING(state, value) {
      state.isLoading = value;
    },
  };
  
  const actions = {
    setLoading({ commit }, value) {
      commit('SET_LOADING', value);
    },
  };
  
  const getters = {
    isLoading: (state) => state.isLoading,
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  