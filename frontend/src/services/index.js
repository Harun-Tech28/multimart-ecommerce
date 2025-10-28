// Export all services from a single entry point
export { default as authService } from './authService';
export { default as productService } from './productService';
export { default as cartService } from './cartService';
export { default as orderService } from './orderService';
export { default as reviewService } from './reviewService';
export { default as wishlistService } from './wishlistService';
export { default as categoryService } from './categoryService';
export { default as adminService } from './adminService';
export { default as vendorService } from './vendorService';
export { default as storeService } from './storeService';

// Export API utilities
export { API_BASE_URL, apiCall, getAuthHeaders } from './api';
