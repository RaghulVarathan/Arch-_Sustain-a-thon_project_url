import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Transform backend/network error into user-friendly message
    const message =
      error.response?.data?.message ||
      error.message ||
      'Unable to connect to the verification intelligence backend.';
    return Promise.reject(new Error(message));
  }
);

export default api;
