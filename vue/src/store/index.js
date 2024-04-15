import { createStore } from 'vuex';
import createPersistedState  from 'vuex-persistedstate';
import modules from './modules';

const store = createStore({
  modules,
  plugins: [createPersistedState ()]
});

export default store;
