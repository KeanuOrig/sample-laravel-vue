import { RepositoryFactory } from '../../api_repo/RepositoryFactory';

const productRepository = RepositoryFactory.get('product');

const state = {

};

const mutations = {

};

const actions = {
    async doGetAll({ commit }, payload) {
        try {
            
            const response = await productRepository.getAll(payload);
            const data = response.data.data;

            return data;
        } catch (error) {
            throw error;
        }
    },
    async doGetById({ commit }, payload) {
        try {
          
            const response = await productRepository.getById(payload);
            const data = response.data.data;

            return data;
        } catch (error) {
            throw error;
        }
    },
    async doCreate({ commit }, payload) {
        try {
            const response = await productRepository.create(payload);

            await new Promise((resolve) => setTimeout(resolve, 1000));

            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
    async doUpdate({ commit }, payload) {
        try {
            const response = await productRepository.update(payload);

            await new Promise((resolve) => setTimeout(resolve, 1000));

            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
    async doDeleteProduct({ commit }, payload) {
        try {
            const response = await productRepository.delete(payload);
            const product = response.data.data;

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
