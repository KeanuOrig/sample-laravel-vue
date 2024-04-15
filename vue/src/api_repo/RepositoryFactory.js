import AuthRepository from './modules/authRepository';
import ProductRepository from './modules/productRepository';
import UserRepository from './modules/usersRepository';

const repositories = {
	auth: AuthRepository,
	user: UserRepository,
	product: ProductRepository,
};


export const RepositoryFactory = {
	get: name => repositories[name]
};