import { API_BASE_URL, apiCall } from './api';

const categoryService = {
  // Get all categories
  getCategories: async () => {
    return apiCall(`${API_BASE_URL}/api/categories`);
  },

  // Get single category
  getCategoryById: async (id) => {
    return apiCall(`${API_BASE_URL}/api/categories/${id}`);
  },

  // Create category (admin only)
  createCategory: async (categoryData) => {
    return apiCall(`${API_BASE_URL}/api/admin/categories`, {
      method: 'POST',
      body: JSON.stringify(categoryData)
    });
  },

  // Update category (admin only)
  updateCategory: async (id, categoryData) => {
    return apiCall(`${API_BASE_URL}/api/admin/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData)
    });
  },

  // Delete category (admin only)
  deleteCategory: async (id) => {
    return apiCall(`${API_BASE_URL}/api/admin/categories/${id}`, {
      method: 'DELETE'
    });
  }
};

export default categoryService;
