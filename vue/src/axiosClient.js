import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api'
});

// Request interceptor
axiosClient.interceptors.request.use(
  config => {

    let authData = JSON.parse(localStorage.getItem('auth-data'));
    
    config.headers['Accept'] = 'application/json';
		config.headers['Content-Type'] = 'application/json'

    if (authData) {

			config.headers['Authorization'] = `Bearer ${authData.token}`;

		}
    console.log('Request Interceptor:', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  response => {
    // You can modify the response data here before returning
    console.log('Response Interceptor:', response);
    return response;
  },
  error => {
    // Handle error responses here
    console.error('Response Error Interceptor:', error);
    return Promise.reject(error);
  }
);
export default axiosClient;