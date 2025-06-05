// API 基础配置
const API_CONFIG = {
  // API 基础 URL，根据环境变量切换
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost/sale/public/api',
  
  // 请求超时时间（毫秒）
  TIMEOUT: 10000,
  
  // 请求头
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export default API_CONFIG; 