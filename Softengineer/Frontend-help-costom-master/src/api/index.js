import API_CONFIG from './config';

// 创建请求实例
const createRequest = async (endpoint, options = {}) => {
  const {
    method = 'GET',
    body,
    headers = {},
    timeout = API_CONFIG.TIMEOUT
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method,
      headers: {
        ...API_CONFIG.HEADERS,
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

// API 请求方法
const api = {
  // GET 请求
  get: (endpoint, options = {}) => {
    return createRequest(endpoint, { ...options, method: 'GET' });
  },

  // POST 请求
  post: (endpoint, data, options = {}) => {
    return createRequest(endpoint, { ...options, method: 'POST', body: data });
  },

  // PUT 请求
  put: (endpoint, data, options = {}) => {
    return createRequest(endpoint, { ...options, method: 'PUT', body: data });
  },

  // DELETE 请求
  delete: (endpoint, options = {}) => {
    return createRequest(endpoint, { ...options, method: 'DELETE' });
  }
};

// 这里可以添加具体的 API 接口
// 例如：
// export const userApi = {
//   login: (credentials) => api.post('/auth/login', credentials),
//   register: (userData) => api.post('/auth/register', userData),
//   getProfile: () => api.get('/user/profile'),
//   updateProfile: (data) => api.put('/user/profile', data),
// };

export default api; 