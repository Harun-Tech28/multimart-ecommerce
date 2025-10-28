# API Services Guide

## Overview

All backend API calls are centralized in the `/frontend/src/services/` directory. This provides a clean, maintainable way to interact with your backend.

## Installation & Setup

### 1. Environment Variables

Create a `.env` file in your frontend directory:

```env
REACT_APP_API_URL=http://localhost:8000
```

For production:
```env
REACT_APP_API_URL=https://your-backend-domain.com
```

### 2. Import Services

```javascript
import { authService, productService, cartService } from '../services';
```

---

## Available Services

### 🔐 **Authentication Service** (`authService`)

```javascript
// Register new user
const result = await authService.register({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password123',
  role: 'customer' // or 'vendor', 'admin'
});

// Login
const result = await authService.login({
  email: 'john@example.com',
  password: 'password123'
});

// Get current user
const user = authService.getCurrentUser();

// Check if authenticated
const isAuth = authService.isAuthenticated();

// Get profile
const profile = await authService.getProfile();

// Update profile
await authService.updateProfile({ name: 'John Updated' });

// Change password
await authService.changePassword({
  currentPassword: 'old',
  newPassword: 'new'
});

// Forgot password
await authService.forgotPassword('john@example.com');

// Logout
authService.logout();
```

---

### 📦 **Product Service** (`productService`)

```javascript
// Get all products with filters
const products = await productService.getProducts({
  page: 1,
  limit: 12,
  category: 'categoryId',
  minPrice: 10,
  maxPrice: 100,
  sort: 'price_asc', // or 'price_desc', 'rating', 'newest'
  search: 'laptop'
});

// Get single product
const product = await productService.getProductById('productId');

// Search products
const results = await productService.searchProducts('laptop', 10);

// Get featured products
const featured = await productService.getFeaturedProducts(8);

// Get trending products
const trending = await productService.getTrendingProducts(8);

// Get products by category
const categoryProducts = await productService.getProductsByCategory('categoryId');

// Get products by store
const storeProducts = await productService.getProductsByStore('storeId');

// Create product (vendor only)
await productService.createProduct({
  name: 'Product Name',
  description: 'Description',
  price: 99.99,
  category: 'categoryId',
  stock: 100
});

// Update product
await productService.updateProduct('productId', { price: 89.99 });

// Delete product
await productService.deleteProduct('productId');
```

---

### 🛒 **Cart Service** (`cartService`)

```javascript
// Get cart
const cart = await cartService.getCart();

// Add to cart
await cartService.addToCart('productId', 2);

// Update quantity
await cartService.updateCartItem('productId', 5);

// Remove from cart
await cartService.removeFromCart('productId');

// Clear cart
await cartService.clearCart();
```

---

### 📋 **Order Service** (`orderService`)

```javascript
// Create order
const order = await orderService.createOrder({
  items: [{ product: 'productId', quantity: 2 }],
  shippingAddress: {
    street: '123 Main St',
    city: 'City',
    state: 'State',
    zipCode: '12345',
    country: 'Country'
  },
  paymentMethod: 'card'
});

// Get user orders
const orders = await orderService.getOrders({ page: 1, limit: 10 });

// Get single order
const order = await orderService.getOrderById('orderId');

// Cancel order
await orderService.cancelOrder('orderId');

// Update order status (vendor/admin)
await orderService.updateOrderStatus('orderId', 'shipped');

// Get vendor orders
const vendorOrders = await orderService.getVendorOrders();
```

---

### ⭐ **Review Service** (`reviewService`)

```javascript
// Get product reviews
const reviews = await reviewService.getProductReviews('productId');

// Create review
await reviewService.createReview({
  productId: 'productId',
  rating: 5,
  comment: 'Great product!'
});

// Update review
await reviewService.updateReview('reviewId', {
  rating: 4,
  comment: 'Updated review'
});

// Delete review
await reviewService.deleteReview('reviewId');

// Get user's reviews
const myReviews = await reviewService.getUserReviews();
```

---

### ❤️ **Wishlist Service** (`wishlistService`)

```javascript
// Get wishlist
const wishlist = await wishlistService.getWishlist();

// Add to wishlist
await wishlistService.addToWishlist('productId');

// Remove from wishlist
await wishlistService.removeFromWishlist('productId');

// Check if in wishlist
const isInWishlist = await wishlistService.isInWishlist('productId');

// Clear wishlist
await wishlistService.clearWishlist();
```

---

### 🏷️ **Category Service** (`categoryService`)

```javascript
// Get all categories
const categories = await categoryService.getCategories();

// Get single category
const category = await categoryService.getCategoryById('categoryId');

// Create category (admin only)
await categoryService.createCategory({
  name: 'Electronics',
  description: 'Electronic items'
});

// Update category (admin only)
await categoryService.updateCategory('categoryId', { name: 'Updated' });

// Delete category (admin only)
await categoryService.deleteCategory('categoryId');
```

---

### 👨‍💼 **Admin Service** (`adminService`)

```javascript
// Get dashboard stats
const stats = await adminService.getDashboardStats();

// User Management
const users = await adminService.getUsers({ page: 1, limit: 20 });
await adminService.updateUserStatus('userId', 'suspended');

// Vendor Management
const vendors = await adminService.getVendors({ status: 'pending' });
await adminService.approveVendor('vendorId');
await adminService.rejectVendor('vendorId', 'Reason');
await adminService.updateVendorStatus('vendorId', 'suspended');

// Product Management
const allProducts = await adminService.getAllProducts();
await adminService.deleteProduct('productId');

// Analytics
const salesData = await adminService.getSalesAnalytics({ 
  startDate: '2024-01-01',
  endDate: '2024-12-31'
});
const userData = await adminService.getUserAnalytics();
```

---

### 🏪 **Vendor Service** (`vendorService`)

```javascript
// Register as vendor
await vendorService.registerVendor({
  businessName: 'My Store',
  businessEmail: 'store@example.com',
  taxId: '123456789'
});

// Get vendor profile
const profile = await vendorService.getVendorProfile();

// Update profile
await vendorService.updateVendorProfile({ businessName: 'Updated' });

// Store Management
const store = await vendorService.getStore();
await vendorService.createStore({ name: 'My Store', description: '...' });
await vendorService.updateStore({ name: 'Updated Store' });

// Product Management
const products = await vendorService.getVendorProducts();
await vendorService.createProduct({ name: 'Product', price: 99.99 });
await vendorService.updateProduct('productId', { price: 89.99 });
await vendorService.deleteProduct('productId');

// Order Management
const orders = await vendorService.getVendorOrders();
await vendorService.updateOrderStatus('orderId', 'shipped');

// Analytics
const stats = await vendorService.getDashboardStats();
const analytics = await vendorService.getSalesAnalytics();
```

---

### 🏬 **Store Service** (`storeService`)

```javascript
// Get all stores
const stores = await storeService.getStores({ page: 1, limit: 12 });

// Get single store
const store = await storeService.getStoreById('storeId');

// Get store products
const products = await storeService.getStoreProducts('storeId', { page: 1 });

// Search stores
const results = await storeService.searchStores('electronics');
```

---

## Error Handling

All services use a centralized error handler. Wrap calls in try-catch:

```javascript
try {
  const products = await productService.getProducts();
  // Handle success
} catch (error) {
  console.error('Error:', error.message);
  // Show error to user
}
```

---

## Usage Examples

### Example 1: Login Flow

```javascript
import { authService } from '../services';

const handleLogin = async (email, password) => {
  try {
    const result = await authService.login({ email, password });
    
    if (result.success) {
      // Save token and user
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
      
      // Redirect to dashboard
      navigate('/');
    }
  } catch (error) {
    setError(error.message);
  }
};
```

### Example 2: Fetch Products with Filters

```javascript
import { productService } from '../services';

const fetchProducts = async () => {
  try {
    const result = await productService.getProducts({
      page: currentPage,
      limit: 12,
      category: selectedCategory,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      sort: sortBy
    });
    
    if (result.success) {
      setProducts(result.data.products);
      setTotalPages(result.data.totalPages);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
```

### Example 3: Add to Cart

```javascript
import { cartService } from '../services';

const handleAddToCart = async (productId) => {
  try {
    const result = await cartService.addToCart(productId, 1);
    
    if (result.success) {
      showToast('Added to cart!', 'success');
      updateCartCount();
    }
  } catch (error) {
    if (error.message.includes('authentication')) {
      navigate('/login');
    } else {
      showToast(error.message, 'error');
    }
  }
};
```

---

## Best Practices

1. **Always use try-catch** for error handling
2. **Check authentication** before making protected API calls
3. **Show loading states** while API calls are in progress
4. **Display user-friendly error messages**
5. **Use the centralized services** instead of direct fetch calls
6. **Keep tokens secure** in localStorage
7. **Clear tokens on logout**

---

## API Response Format

All APIs return data in this format:

```javascript
{
  success: true,
  data: {
    // Response data here
  },
  message: 'Success message'
}
```

Error format:
```javascript
{
  success: false,
  error: {
    message: 'Error message',
    code: 'ERROR_CODE'
  }
}
```

---

## Testing

Test your API services:

```javascript
// Test in browser console
import { productService } from './services';

productService.getProducts().then(console.log);
```

---

Your API services are now fully integrated and ready to use! 🎉
