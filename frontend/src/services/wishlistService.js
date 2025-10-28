import { API_BASE_URL, apiCall } from './api';

const wishlistService = {
  // Get user's wishlist
  getWishlist: async () => {
    return apiCall(`${API_BASE_URL}/api/wishlist`);
  },

  // Add product to wishlist
  addToWishlist: async (productId) => {
    return apiCall(`${API_BASE_URL}/api/wishlist/add`, {
      method: 'POST',
      body: JSON.stringify({ productId })
    });
  },

  // Remove product from wishlist
  removeFromWishlist: async (productId) => {
    return apiCall(`${API_BASE_URL}/api/wishlist/remove`, {
      method: 'DELETE',
      body: JSON.stringify({ productId })
    });
  },

  // Check if product is in wishlist
  isInWishlist: async (productId) => {
    return apiCall(`${API_BASE_URL}/api/wishlist/check/${productId}`);
  },

  // Clear wishlist
  clearWishlist: async () => {
    return apiCall(`${API_BASE_URL}/api/wishlist/clear`, {
      method: 'DELETE'
    });
  }
};

export default wishlistService;
