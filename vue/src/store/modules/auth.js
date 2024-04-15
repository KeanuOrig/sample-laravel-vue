import { RepositoryFactory } from '../../api_repo/RepositoryFactory';
import { useCookies } from "vue3-cookies";
    
const { cookies } = useCookies();
const authRepository = RepositoryFactory.get('auth');

const state = {
    isLoggedIn: false,
    user: null,
    token: null,
};
  
const mutations = {
    SET_LOGIN(state, user) {
        state.isLoggedIn = true;
        state.user = user.user;
        state.token = user.token;
    },
    SET_LOGOUT(state) {
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
    },
};
  
const actions = {
    async doLogin({ commit }, credentials) {
        try {
            const response = await authRepository.login(credentials);
            const user = response.data.data;

            await new Promise((resolve) => setTimeout(resolve, 1000));
    
            commit('SET_LOGIN', user);
            cookies.set("token", user.token);
            cookies.set("user", user.user);
            cookies.set("isLoggedIn", true);

            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
    async doLogout({ commit }) {

        try {
            const response = await authRepository.logout();
            console.log(response)
            await new Promise((resolve) => setTimeout(resolve, 1000));

            commit('SET_LOGOUT');
            cookies.remove("token");
            cookies.remove("user");
            cookies.set("isLoggedIn", false);

            return response;
        } catch (error) {
            throw error;
        }

    },
    setLogout({ commit }) {
            commit('SET_LOGOUT');
            cookies.remove("token");
            cookies.remove("user");
            cookies.set("isLoggedIn", false);
    },
};
  
const getters = {
    isLoggedIn: (state) => state.isLoggedIn,
    currentUser: (state) => state.user,
    token: (state) => state.token,
};
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  