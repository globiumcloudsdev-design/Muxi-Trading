export const API = {
  auth: {
    login: '/api/auth/login', 
    register: '/api/auth/signup',
    forgetPassword: '/api/auth/reset-password',
    refresh: '/api/auth/refresh',
    logout: '/api/auth/logout',
    verify: '/api/auth/verify',
  },
  categories: {
    getAll: '/api/categories',
    getById: (id) => `/api/categories/${id}`,
    create: '/api/categories',
    update: (id) => `/api/categories/${id}`,
    delete: (id) => `/api/categories/${id}`,
  },
  items: {
    getAll: '/api/items',
    getById: (id) => `/api/items/${id}`,
    create: '/api/items',
    update: (id) => `/api/items/${id}`,
    delete: (id) => `/api/items/${id}`,
  },
};


