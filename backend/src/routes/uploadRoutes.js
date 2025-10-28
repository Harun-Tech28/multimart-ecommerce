const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const { uploadProductMedia, deleteProductMedia } = require('../controllers/uploadController');
const { protect, authorize } = require('../middleware/auth');

// Upload product media (images/videos)
router.post(
  '/product',
  protect,
  authorize('vendor', 'admin'),
  upload.array('files', 10), // Allow up to 10 files
  uploadProductMedia
);

// Delete product media
router.delete(
  '/product',
  protect,
  authorize('vendor', 'admin'),
  deleteProductMedia
);

module.exports = router;
