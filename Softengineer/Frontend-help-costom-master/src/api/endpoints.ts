import api from './index';

// 类型定义
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface DictionaryType {
  type: string;
  name: string;
  description: string;
  enabled: boolean;
  sort: number;
  createdAt: string;
  updatedAt: string;
}

export interface Dictionary {
  type: string;
  code: string;
  name: string;
  value: string;
  parentCode?: string;
  sort: number;
  enabled: boolean;
  description: string;
  extras?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface DictionaryBatchUpdate {
  type: string;
  items: Dictionary[];
}

// 请求参数类型
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends Omit<User, 'id' | 'createdAt'> {
  password: string;
}

export interface ProductQueryParams {
  category?: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface OrderQueryParams {
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}

// API 接口定义
export const userApi = {
  // 用户登录
  login: (credentials: LoginCredentials): Promise<{ token: string; user: User }> => 
    api.post('/auth/login', credentials),
  
  // 用户注册
  register: (userData: RegisterData): Promise<User> => 
    api.post('/auth/register', userData),
  
  // 获取用户信息
  getProfile: (): Promise<User> => 
    api.get('/user/profile'),
  
  // 更新用户信息
  updateProfile: (data: Partial<User>): Promise<User> => 
    api.put('/user/profile', data),
};

export const productApi = {
  // 获取商品列表
  getProducts: (params?: ProductQueryParams): Promise<{ items: Product[]; total: number }> => 
    api.get('/products', { params }),
  
  // 获取商品详情
  getProductDetail: (id: string): Promise<Product> => 
    api.get(`/products/${id}`),
  
  // 创建商品
  createProduct: (data: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => 
    api.post('/products', data),
  
  // 更新商品
  updateProduct: (id: string, data: Partial<Product>): Promise<Product> => 
    api.put(`/products/${id}`, data),
  
  // 删除商品
  deleteProduct: (id: string): Promise<void> => 
    api.delete(`/products/${id}`),
};

export const orderApi = {
  // 获取订单列表
  getOrders: (params?: OrderQueryParams): Promise<{ items: Order[]; total: number }> => 
    api.get('/orders', { params }),
  
  // 获取订单详情
  getOrderDetail: (id: string): Promise<Order> => 
    api.get(`/orders/${id}`),
  
  // 创建订单
  createOrder: (data: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => 
    api.post('/orders', data),
  
  // 更新订单状态
  updateOrderStatus: (id: string, status: string): Promise<Order> => 
    api.put(`/orders/${id}/status`, { status }),
};

export const dictionaryApi = {
  // 获取所有字典类型
  getDictionaryTypes: (): Promise<DictionaryType[]> => 
    api.get('/dictionary/types'),
  
  // 根据类型获取字典数据
  getDictionaryByType: (type: string): Promise<Dictionary[]> => 
    api.get(`/dictionary/${type}`),
  
  // 批量获取多个类型的字典数据
  getDictionariesByTypes: (types: string[]): Promise<Record<string, Dictionary[]>> => 
    api.post('/dictionary/batch', { types }),
  
  // 创建字典类型
  createDictionaryType: (data: Omit<DictionaryType, 'createdAt' | 'updatedAt'>): Promise<DictionaryType> => 
    api.post('/dictionary/type', data),
  
  // 更新字典类型
  updateDictionaryType: (type: string, data: Partial<DictionaryType>): Promise<DictionaryType> => 
    api.put(`/dictionary/type/${type}`, data),
  
  // 删除字典类型
  deleteDictionaryType: (type: string): Promise<void> => 
    api.delete(`/dictionary/type/${type}`),
  
  // 创建字典项
  createDictionaryItem: (type: string, data: Omit<Dictionary, 'type' | 'createdAt' | 'updatedAt'>): Promise<Dictionary> => 
    api.post(`/dictionary/${type}/item`, data),
  
  // 更新字典项
  updateDictionaryItem: (type: string, code: string, data: Partial<Dictionary>): Promise<Dictionary> => 
    api.put(`/dictionary/${type}/item/${code}`, data),
  
  // 删除字典项
  deleteDictionaryItem: (type: string, code: string): Promise<void> => 
    api.delete(`/dictionary/${type}/item/${code}`),
  
  // 批量更新字典项
  batchUpdateDictionaryItems: (type: string, items: Dictionary[]): Promise<Dictionary[]> => 
    api.put(`/dictionary/${type}/items/batch`, { items }),
};

// 导出所有接口
const apiEndpoints = {
  user: userApi,
  product: productApi,
  order: orderApi,
  dictionary: dictionaryApi,
} as const;

export default apiEndpoints; 