import { API_BASE_URL, apiCall } from './api';

const reviewService = {
  // Get product reviews
  getProductReviews: async (productId) => {
    return apiCall(`${API_BASE_URL}/api/products/${productId}/reviews`);
  },

  // Create review
  createReview: async (reviewData) => {
    return apiCall(`${API_BASE_URL}/api/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  },

  // Update review
  updateReview: async (id, reviewData) => {
    return apiCall(`${API_BASE_URL}/api/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData)
    });
  },

  // Delete review
  deleteReview: async (id) => {
    return apiCall(`${API_BASE_URL}/api/reviews/${id}`, {
      method: 'DELETE'
    });
  },

  // Get user's reviews
  getUserReviews: async () => {
    return apiCall(`${API_BASE_URL}/api/reviews/user`);
  }
};

export default reviewService;
