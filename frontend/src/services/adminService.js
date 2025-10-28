import { API_BASE_URL, apiCall } from './api';

const adminService = {
  // Get dashboard stats
  getDashboardStats: async () => {
    return apiCall(`${API_BASE_URL}/api/admin/stats`);
  },

  // User Management
  getUsers: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`${API_BASE_URL}/api/admin/users?${queryString}`);
  },

  updateUserStatus: async (userId, status) => {
    return apiCall(`${API_BASE_URL}/api/admin/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },

  // Vendor Management
  getVendors: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`${API_BASE_URL}/api/admin/vendors?${queryString}`);
  },

  updateVendorStatus: async (vendorId, status, reason = '') => {
    return apiCall(`${API_BASE_URL}/api/admin/vendors/${vendorId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, reason })
    });
  },

  approveVendor: async (vendorId) => {
    return apiCall(`${API_BASE_URL}/api/admin/vendors/${vendorId}/approve`, {
      method: 'PUT'
    });
  },

  rejectVendor: async (vendorId, reason) => {
    return apiCall(`${API_BASE_URL}/api/admin/vendors/${vendorId}/reject`, {
      method: 'PUT',
      body: JSON.stringify({ reason })
    });
  },

  // Product Management
  getAllProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`${API_BASE_URL}/api/admin/products?${queryString}`);
  },

  deleteProduct: async (productId) => {
    return apiCall(`${API_BASE_URL}/api/admin/products/${productId}`, {
      method: 'DELETE'
    });
  },

  // Analytics
  getSalesAnalytics: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`${API_BASE_URL}/api/admin/analytics/sales?${queryString}`);
  },

  getUserAnalytics: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`${API_BASE_URL}/api/admin/analytics/users?${queryString}`);
  }
};

export default adminService;
