const express = require('express');
const router = express.Router();
const {
  validateCoupon,
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCouponStats
} = require('../controllers/couponController');
const { protect, authorize } = require('../middleware/auth');

// Public/User routes
router.post('/validate', protect, validateCoupon);

// Admin routes
router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(getCoupons)
  .post(createCoupon);

router.route('/:id')
  .get(getCoupon)
  .put(updateCoupon)
  .delete(deleteCoupon);

router.get('/:id/stats', getCouponStats);

module.exports = router;
