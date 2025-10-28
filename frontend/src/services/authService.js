import { API_BASE_URL, apiCall } from './api';

const authService = {
  // Register new user
  register: async (userData) => {
    return apiCall(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  // Login user
  login: async (credentials) => {
    return apiCall(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get user profile
  getProfile: async () => {
    return apiCall(`${API_BASE_URL}/api/auth/profile`);
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return apiCall(`${API_BASE_URL}/api/auth/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },

  // Change password
  changePassword: async (passwordData) => {
    return apiCall(`${API_BASE_URL}/api/auth/change-password`, {
      method: 'PUT',
      body: JSON.stringify(passwordData)
    });
  },

  // Forgot password
  forgotPassword: async (email) => {
    return apiCall(`${API_BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    return apiCall(`${API_BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      body: JSON.stringify({ token, newPassword })
    });
  }
};

export default authService;
