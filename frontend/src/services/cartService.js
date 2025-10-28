import { API_BASE_URL, apiCall } from './api';

const cartService = {
  // Get user's cart
  getCart: async () => {
    return apiCall(`${API_BASE_URL}/api/cart`);
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    return apiCall(`${API_BASE_URL}/api/cart/add`, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity })
    });
  },

  // Update cart item quantity
  updateCartItem: async (productId, quantity) => {
    return apiCall(`${API_BASE_URL}/api/cart/update`, {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity })
    });
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    return apiCall(`${API_BASE_URL}/api/cart/remove`, {
      method: 'DELETE',
      body: JSON.stringify({ productId })
    });
  },

  // Clear entire cart
  clearCart: async () => {
    return apiCall(`${API_BASE_URL}/api/cart/clear`, {
      method: 'DELETE'
    });
  }
};

export default cartService;
