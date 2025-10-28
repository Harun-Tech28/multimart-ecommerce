const express = require('express');
const router = express.Router();
const {
  registerVendor,
  getVendorProfile,
  updateVendorProfile,
  createStore,
  getVendorStore,
  updateStore
} = require('../controllers/vendorController');
const {
  createProduct,
  getVendorProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

// Vendor registration (authenticated users)
router.post('/register', protect, registerVendor);

// Vendor profile routes (vendor only)
router.get('/profile', protect, authorize('vendor', 'admin'), getVendorProfile);
router.put('/profile', protect, authorize('vendor'), updateVendorProfile);

// Store routes (vendor only)
router.post('/store', protect, authorize('vendor'), createStore);
router.get('/store', protect, authorize('vendor'), getVendorStore);
router.put('/store', protect, authorize('vendor'), updateStore);

// Product routes (vendor only)
router.post('/products', protect, authorize('vendor'), createProduct);
router.get('/products', protect, authorize('vendor'), getVendorProducts);
router.get('/products/:id', protect, authorize('vendor'), getProduct);
router.put('/products/:id', protect, authorize('vendor'), updateProduct);
router.delete('/products/:id', protect, authorize('vendor'), deleteProduct);

module.exports = router;
