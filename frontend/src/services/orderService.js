import { API_BASE_URL, apiCall } from './api';

const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    return apiCall(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  // Get user's orders
  getOrders: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`${API_BASE_URL}/api/orders?${queryString}`);
  },

  // Get single order by ID
  getOrderById: async (id) => {
    return apiCall(`${API_BASE_URL}/api/orders/${id}`);
  },

  // Cancel order
  cancelOrder: async (id) => {
    return apiCall(`${API_BASE_URL}/api/orders/${id}/cancel`, {
      method: 'PUT'
    });
  },

  // Update order status (vendor/admin)
  updateOrderStatus: async (id, status) => {
    return apiCall(`${API_BASE_URL}/api/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },

  // Get vendor orders
  getVendorOrders: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`${API_BASE_URL}/api/vendor/orders?${queryString}`);
  }
};

export default orderService;
