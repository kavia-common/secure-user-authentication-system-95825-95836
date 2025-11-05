import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

/**
 * PUBLIC_INTERFACE
 * apiClient is a pre-configured Axios instance for the backend API.
 */
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Interceptor to normalize errors
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status || 0;
    let message =
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      error?.message ||
      'Request failed';

    // Provide clearer guidance for opaque network errors (e.g., CORS or server down)
    if (message.toLowerCase().includes('network error') || status === 0) {
      message =
        'Network error: Unable to reach the API. Ensure the backend is running at ' +
        (BASE_URL || 'http://localhost:3001') +
        ' and CORS is configured. You can set REACT_APP_API_BASE_URL in your environment.';
    }

    return Promise.reject({ message, status });
  }
);

/**
 * PUBLIC_INTERFACE
 * login sends user credentials to POST /login
 */
export async function login(payload) {
  try {
    const res = await apiClient.post('/login', payload);
    return res.data;
  } catch (err) {
    throw err;
  }
}

/**
 * PUBLIC_INTERFACE
 * register sends user details to POST /register
 */
export async function register(payload) {
  try {
    const res = await apiClient.post('/register', payload);
    return res.data;
  } catch (err) {
    throw err;
  }
}
