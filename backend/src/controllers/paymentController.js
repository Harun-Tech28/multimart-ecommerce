const Order = require('../models/Order');
const paymentService = require('../services/paymentService');

// @desc    Initialize payment for order
// @route   POST /api/payments/initialize
// @access  Private
exports.initializePayment = async (req, res, next) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'ORDER_ID_REQUIRED',
          message: 'Order ID is required'
        }
      });
    }

    // Get order
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ORDER_NOT_FOUND',
          message: 'Order not found'
        }
      });
    }

    // Verify ownership
    if (order.customerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'You can only pay for your own orders'
        }
      });
    }

    // Check if already paid
    if (order.paymentStatus === 'paid') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'ALREADY_PAID',
          message: 'Order has already been paid'
        }
      });
    }

    // Initialize payment
    const paymentData = await paymentService.initializePayment({
      orderId: order._id,
      orderNumber: order.orderNumber,
      total: order.total,
      email: req.user.email,
      customerName: `${req.user.firstName} ${req.user.lastName}`
    });

    // Update order with payment reference
    order.paymentReference = paymentData.paymentReference;
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Payment initialized successfully',
      data: paymentData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify payment
// @route   POST /api/payments/verify
// @access  Private
exports.verifyPayment = async (req, res, next) => {
  try {
    const { reference } = req.body;

    if (!reference) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'REFERENCE_REQUIRED',
          message: 'Payment reference is required'
        }
      });
    }

    // Find order by payment reference
    const order = await Order.findOne({ paymentReference: reference });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ORDER_NOT_FOUND',
          message: 'Order not found for this payment reference'
        }
      });
    }

    // Verify ownership
    if (order.customerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Unauthorized access'
        }
      });
    }

    // Verify payment with gateway
    const verification = await paymentService.verifyPayment(reference);

    if (verification.success && verification.status === 'succeeded') {
      // Update order payment status
      order.paymentStatus = 'paid';
      order.status = 'processing';
      order.statusHistory.push({
        status: 'processing',
        updatedBy: req.user._id,
        note: 'Payment confirmed'
      });
      await order.save();

      // TODO: Send confirmation email to customer and vendor

      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        data: {
          order: {
            id: order._id,
            orderNumber: order.orderNumber,
            paymentStatus: order.paymentStatus,
            status: order.status
          }
        }
      });
    } else {
      // Payment failed
      order.paymentStatus = 'failed';
      await order.save();

      res.status(400).json({
        success: false,
        error: {
          code: 'PAYMENT_FAILED',
          message: 'Payment verification failed'
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Handle payment webhook
// @route   POST /api/payments/webhook
// @access  Public (but verified)
exports.handleWebhook = async (req, res, next) => {
  try {
    // Verify webhook signature (implementation depends on gateway)
    const signature = req.headers['x-webhook-signature'] || req.headers['stripe-signature'];
    
    // TODO: Verify signature based on payment gateway
    // For Stripe: stripe.webhooks.constructEvent(req.body, signature, webhookSecret)
    
    const event = req.body;

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
      case 'charge.success':
        await handleSuccessfulPayment(event.data);
        break;
      
      case 'payment_intent.payment_failed':
      case 'charge.failed':
        await handleFailedPayment(event.data);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({
      success: false,
      error: {
        code: 'WEBHOOK_ERROR',
        message: 'Webhook processing failed'
      }
    });
  }
};

// Helper function to handle successful payment
async function handleSuccessfulPayment(paymentData) {
  const reference = paymentData.reference || paymentData.id;
  
  const order = await Order.findOne({ paymentReference: reference });
  
  if (order && order.paymentStatus !== 'paid') {
    order.paymentStatus = 'paid';
    order.status = 'processing';
    order.statusHistory.push({
      status: 'processing',
      note: 'Payment confirmed via webhook'
    });
    await order.save();
    
    // TODO: Send confirmation emails
    console.log(`Payment confirmed for order: ${order.orderNumber}`);
  }
}

// Helper function to handle failed payment
async function handleFailedPayment(paymentData) {
  const reference = paymentData.reference || paymentData.id;
  
  const order = await Order.findOne({ paymentReference: reference });
  
  if (order) {
    order.paymentStatus = 'failed';
    await order.save();
    
    // TODO: Send failure notification
    console.log(`Payment failed for order: ${order.orderNumber}`);
  }
}
