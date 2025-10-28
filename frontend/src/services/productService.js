import { API_BASE_URL, apiCall } from './api';

const productService = {
  // Get all products with filters
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`${API_BASE_URL}/api/products?${queryString}`);
  },

  // Get single product by ID
  getProductById: async (id) => {
    return apiCall(`${API_BASE_URL}/api/products/${id}`);
  },

  // Search products
  searchProducts: async (query, limit = 10) => {
    return apiCall(`${API_BASE_URL}/api/products/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  },

  // Get featured products
  getFeaturedProducts: async (limit = 8) => {
    return apiCall(`${API_BASE_URL}/api/products?featured=true&limit=${limit}`);
  },

  // Get trending products
  getTrendingProducts: async (limit = 8) => {
    return apiCall(`${API_BASE_URL}/api/products?sort=popular&limit=${limit}`);
  },

  // Get products by category
  getProductsByCategory: async (categoryId, params = {}) => {
    const queryString = new URLSearchParams({ ...params, category: categoryId }).toString();
    return apiCall(`${API_BASE_URL}/api/products?${queryString}`);
  },

  // Get products by store
  getProductsByStore: async (storeId, params = {}) => {
    const queryString = new URLSearchParams({ ...params, store: storeId }).toString();
    return apiCall(`${API_BASE_URL}/api/products?${queryString}`);
  },

  // Create product (vendor only)
  createProduct: async (productData) => {
    return apiCall(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  },

  // Update product (vendor only)
  updateProduct: async (id, productData) => {
    return apiCall(`${API_BASE_URL}/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  },

  // Delete product (vendor only)
  deleteProduct: async (id) => {
    return apiCall(`${API_BASE_URL}/api/products/${id}`, {
      method: 'DELETE'
    });
  }
};

export default productService;
