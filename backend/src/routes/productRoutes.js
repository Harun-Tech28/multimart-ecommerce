const express = require('express');
const router = express.Router();
const {
  createProduct,
  getVendorProducts,
  updateProduct,
  deleteProduct,
  getAllProducts,
  searchProducts,
  getProduct,
  getSearchSuggestions
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/search/suggestions', getSearchSuggestions);
router.get('/:identifier', getProduct);

// Vendor routes
router.post('/', protect, authorize('vendor'), createProduct);
router.get('/vendor/my-products', protect, authorize('vendor'), getVendorProducts);
router.put('/:id', protect, authorize('vendor'), updateProduct);
router.delete('/:id', protect, authorize('vendor'), deleteProduct);

module.exports = router;
