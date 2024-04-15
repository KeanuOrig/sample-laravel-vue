import Repository from '../Repository';

const resource = '/login';

export default {
	login(payload) {
		return Repository.post(`${resource}`, payload);
	},
	logout(){
		return Repository.post(`logout`);
	},
	register(){
		return Repository.post('register');
	},
};