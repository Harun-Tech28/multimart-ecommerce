import { API_BASE_URL, apiCall } from './api';

const vendorService = {
  // Vendor Registration
  registerVendor: async (vendorData) => {
    return apiCall(`${API_BASE_URL}/api/vendor/register`, {
      method: 'POST',
      body: JSON.stringify(vendorData)
    });
  },

  // Get vendor profile
  getVendorProfile: async () => {
    return apiCall(`${API_BASE_URL}/api/vendor/profile`);
  },

  // Update vendor profile
  updateVendorProfile: async (profileData) => {
    return apiCall(`${API_BASE_URL}/api/vendor/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },

  // Store Management
  getStore: async () => {
    return apiCall(`${API_BASE_URL}/api/vendor/store`);
  },

  createStore: async (storeData) => {
    return apiCall(`${API_BASE_URL}/api/vendor/store`, {
      method: 'POST',
      body: JSON.stringify(storeData)
    });
  },

  updateStore: async (storeData) => {
    return apiCall(`${API_BASE_URL}/api/vendor/store`, {
      method: 'PUT',
      body: JSON.stringify(storeData)
    });
  },

  // Product Management
  getVendorProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`${API_BASE_URL}/api/vendor/products?${queryString}`);
  },

  createProduct: async (productData) => {
    return apiCall(`${API_BASE_URL}/api/vendor/products`, {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  },

  updateProduct: async (productId, productData) => {
    return apiCall(`${API_BASE_URL}/api/vendor/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  },

  deleteProduct: async (productId) => {
    return apiCall(`${API_BASE_URL}/api/vendor/products/${productId}`, {
      method: 'DELETE'
    });
  },

  // Order Management
  getVendorOrders: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`${API_BASE_URL}/api/vendor/orders?${queryString}`);
  },

  updateOrderStatus: async (orderId, status) => {
    return apiCall(`${API_BASE_URL}/api/vendor/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },

  // Analytics
  getDashboardStats: async () => {
    return apiCall(`${API_BASE_URL}/api/vendor/stats`);
  },

  getSalesAnalytics: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`${API_BASE_URL}/api/vendor/analytics?${queryString}`);
  }
};

export default vendorService;
