import axios from 'axios';

// Resolve base URL robustly:
// 1) Prefer REACT_APP_API_BASE_URL
// 2) If not set, try to infer from window.location replacing port with 3001
// 3) Fallback to http://localhost:3001
function resolveBaseUrl() {
  const envUrl = process.env.REACT_APP_API_BASE_URL && process.env.REACT_APP_API_BASE_URL.trim();
  if (envUrl) return envUrl;

  if (typeof window !== 'undefined' && window.location) {
    try {
      const loc = new URL(window.location.href);
      const protocol = loc.protocol || 'http:';
      const host = loc.hostname || 'localhost';
      // If running on 3000, target 3001 by convention. If another port, still prefer 3001.
      const basePort = 3001;
      return `${protocol}//${host}:${basePort}`;
    } catch {
      // no-op; fallback below
    }
  }
  return 'http://localhost:3001';
}

const BASE_URL = resolveBaseUrl();

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
  timeout: 10000, // 10s timeout to avoid hanging network errors
});

// Attach Authorization header if token exists in localStorage
apiClient.interceptors.request.use((config) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore storage issues
  }
  // eslint-disable-next-line no-console
  console.debug(
    '[API] Request:',
    JSON.stringify(
      {
        method: config.method,
        url: (config.baseURL || '') + (config.url || ''),
        headers: { 'Content-Type': config.headers?.['Content-Type'] || 'application/json', Authorization: !!config.headers?.Authorization },
      },
      null,
      2
    )
  );
  return config;
});

// Interceptor to normalize errors
apiClient.interceptors.response.use(
  (res) => {
    // eslint-disable-next-line no-console
    console.debug('[API] Response:', JSON.stringify({ status: res.status, url: res.config?.url }, null, 2));
    return res;
  },
  (error) => {
    const status = error?.response?.status || 0;
    let message =
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      error?.message ||
      'Request failed';

    // Provide clearer guidance for opaque network errors (e.g., CORS, server down, timeout)
    if ((typeof message === 'string' && message.toLowerCase().includes('network error')) || status === 0) {
      message =
        'Network error: Unable to reach the API. Ensure the backend is running at ' +
        (BASE_URL || 'http://localhost:3001') +
        ' and CORS is configured. Set REACT_APP_API_BASE_URL if using a different URL.';
    }
    if (error.code === 'ECONNABORTED') {
      message = `Request timeout: API did not respond within ${apiClient.defaults.timeout / 1000}s at ${BASE_URL}.`;
    }

    // eslint-disable-next-line no-console
    console.error('[API] Error:', {
      status,
      message,
      url: error?.config ? (error.config.baseURL || '') + (error.config.url || '') : 'unknown',
    });

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
