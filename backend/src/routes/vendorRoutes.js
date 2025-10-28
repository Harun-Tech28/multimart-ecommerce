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

module.exports = router;
