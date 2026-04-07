import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const apiBaseURL = import.meta.env.VITE_API_URL || 'https://sportshub-backend-mzth.onrender.com/api';

const api = axios.create({
  baseURL: apiBaseURL
});

// Intercept requests to add token
api.interceptors.request.use(
  (config) => {
    // Check both possible token keys for smooth transition, or just generic 'token'
    const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept responses to handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('user');
      window.location.href = '/login'; // force login
    }
    return Promise.reject(error);
  }
);

export default api;
