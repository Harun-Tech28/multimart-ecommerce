import { API_BASE_URL, apiCall } from './api';

const storeService = {
  // Get all stores
  getStores: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`${API_BASE_URL}/api/stores?${queryString}`);
  },

  // Get single store
  getStoreById: async (id) => {
    return apiCall(`${API_BASE_URL}/api/stores/${id}`);
  },

  // Get store products
  getStoreProducts: async (id, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`${API_BASE_URL}/api/stores/${id}/products?${queryString}`);
  },

  // Search stores
  searchStores: async (query) => {
    return apiCall(`${API_BASE_URL}/api/stores/search?q=${encodeURIComponent(query)}`);
  }
};

export default storeService;
