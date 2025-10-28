const express = require('express');
const router = express.Router();
const {
  getStoreBySlug,
  getAllStores
} = require('../controllers/vendorController');

// Public store routes
router.get('/', getAllStores);
router.get('/:slug', getStoreBySlug);

module.exports = router;
