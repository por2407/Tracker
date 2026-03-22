import axios from 'axios';

/**
 * Axios instance — all requests go through /api which is proxied to the
 * backend in development (vite.config.js) and in production (nginx.conf).
 */
const client = axios.create({
  baseURL: '/api',
  withCredentials: true, // send the HttpOnly auth cookie on every request
  headers: { 'Content-Type': 'application/json' },
});

// Intercept 401 globally and redirect to login
client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);

export default client;
