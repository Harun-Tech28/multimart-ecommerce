const express = require('express');
const router = express.Router();
const {
  initializePayment,
  verifyPayment,
  handleWebhook
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

// Webhook route (public but verified)
router.post('/webhook', handleWebhook);

// Protected routes
router.post('/initialize', protect, initializePayment);
router.post('/verify', protect, verifyPayment);

module.exports = router;
