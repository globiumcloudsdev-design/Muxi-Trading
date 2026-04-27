export const API = {
  base: '',
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
    assignDiscount: (id) => `/api/categories/${id}/assign-discount`,
  },
  items: {
    getAll: '/api/items',
    getById: (id) => `/api/items/${id}`,
    create: '/api/items',
    update: (id) => `/api/items/${id}`,
    delete: (id) => `/api/items/${id}`,
  },
  discountOffers: {
    getAll: '/api/admin/discount-offers',
    getById: (id) => `/api/admin/discount-offers/${id}`,
    create: '/api/admin/discount-offers',
    update: (id) => `/api/admin/discount-offers/${id}`,
    delete: (id) => `/api/admin/discount-offers/${id}`,
    getBySlug: (slug) => `/api/discount-offers/${slug}`,
    getProductsBySlug: (slug) => `/api/discount-offers/${slug}/products`,
  },
};


