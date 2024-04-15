import axios from 'axios'
import Swal from 'sweetalert2';
import { useCookies } from 'vue3-cookies';
import router from '../router';
import store from '../store';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api'
});


// Request interceptor
axiosClient.interceptors.request.use(
  config => {
	store.dispatch('loading/setLoading', true);
	const { cookies } = useCookies();
	let token = cookies.get('token');
    
    config.headers['Accept'] = 'application/json';

    if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	if (config.data instanceof FormData) {
		config.headers['Content-Type'] = 'multipart/form-data';
	  } else {
		config.headers['Content-Type'] = 'application/json';
	  }

    // console.log('Request Interceptor:', config);
    return config;
  },
  error => {
	store.dispatch('loading/setLoading', false);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  response => {
    // console.log('Response Interceptor:', response);
	store.dispatch('loading/setLoading', false);
    return response;
  },
  error => {
    // console.error('Response Error Interceptor:', error);`

	store.dispatch('loading/setLoading', false);

	if (error.response && error.response.status === 401) {
		// Redirect to homepage or login page
		store.dispatch('auth/setLogout', false);
		Swal.fire({
			icon: 'error',
			title: 'Token Expired!',
			text: 'Please Login Again',
		});

		router.push('/login');
		return Promise.reject(error); // Reject the promise to prevent further execution
	}

	let error_message = 'An error occurred.';

    if (error.response && error.response.data) {
		if (error.response.data.data && error.response.data.data.message) {
		  error_message = error.response.data.data.message;
		} else if (error.response.data.message) {
		  error_message = error.response.data.message;
		}
	}

	Swal.fire({
		icon: 'error',
		title: 'Error!',
		text: error_message,
	  });
	  return Promise.reject(error);
  }
);
export default axiosClient;