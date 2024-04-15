import { RepositoryFactory } from '../../api_repo/RepositoryFactory';

const userRepository = RepositoryFactory.get('user');

const state = {
};

const mutations = {
};

const actions = {
    async doGetAll({ commit }, payload) {
        try {
            
            const response = await userRepository.getAll(payload);
            const data = response.data.data;

            return data;
        } catch (error) {
            throw error;
        }
    },
    async doGetById({ commit }, payload) {
        try {
          
            const response = await userRepository.getById(payload);
            const data = response.data.data;

            return data;
        } catch (error) {
            throw error;
        }
    },
    async doUpdate({ commit }, payload) {
        try {
            const response = await userRepository.update(payload);

            await new Promise((resolve) => setTimeout(resolve, 1000));

            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
    async doDeleteUser({ commit }, payload) {
        try {
            const response = await userRepository.delete(payload);
            const user = response.data.data;

            await new Promise((resolve) => setTimeout(resolve, 1000));
            return response;

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
};

const getters = {

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
