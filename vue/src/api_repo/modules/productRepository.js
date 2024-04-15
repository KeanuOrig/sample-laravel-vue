import Repository from '../Repository';

const resource = '/maintenance/product';
const headers = {
    'Content-Type': 'multipart/form-data'
};

export default {
	getAll (payload) {
		return Repository.get(`${resource}`+ '?page='+ payload.page);
	},
	getById (payload) {
		return Repository.get(`${resource}`+ '/' + payload.id);
	},
	create (payload) {
		return Repository.post(`${resource}`, payload);
	},
	update (payload) {
		const { id } = payload;
		console.log(payload)
		return Repository.put(`${resource}` + '/' + id, payload);
	},
	delete (payload) {
		return Repository.delete(`${resource}` + '/' + payload);
	},
};