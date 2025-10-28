const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
  getVendorOrders
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

// All order routes require authentication
router.use(protect);

// Customer routes
router.post('/', createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderById);
router.put('/:id/cancel', cancelOrder);

// Vendor routes
router.get('/vendor/my-orders', authorize('vendor', 'admin'), getVendorOrders);
router.put('/:id/status', authorize('vendor', 'admin'), updateOrderStatus);

module.exports = router;
