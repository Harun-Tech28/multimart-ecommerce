// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  
  // Products
  PRODUCTS: `${API_BASE_URL}/api/products`,
  PRODUCT_SEARCH: `${API_BASE_URL}/api/products/search`,
  
  // Categories
  CATEGORIES: `${API_BASE_URL}/api/categories`,
  
  // Cart
  CART_ADD: `${API_BASE_URL}/api/cart/add`,
  
  // Wishlist
  WISHLIST_ADD: `${API_BASE_URL}/api/wishlist/add`,
};

export default API_BASE_URL;
