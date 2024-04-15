import Repository from '../Repository';


const resource = '/maintenance/user';

export default {
	getAll (payload) {
		return  Repository.get(`${resource}`+ '?page='+ payload.page);
	},
	getById (payload) {
		return  Repository.get(`${resource}`+ '/' + payload.id);
	},
	update (payload) {
		const { id, name, email } = payload;
		console.log(`${resource}` + '/' + id)
		return  Repository.put(`${resource}` + '/' + id, payload);
	},
	delete (payload) {
		return  Repository.delete(`${resource}` + '/' + payload);
	},
};