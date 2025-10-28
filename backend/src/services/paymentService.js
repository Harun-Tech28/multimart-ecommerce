// Payment service supporting multiple gateways
// Supports: Stripe, Paystack, Flutterwave

class PaymentService {
  constructor() {
    this.gateway = process.env.PAYMENT_GATEWAY || 'stripe';
    this.initializeGateways();
  }

  initializeGateways() {
    // Initialize Stripe if configured
    if (process.env.STRIPE_SECRET_KEY) {
      try {
        this.stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      } catch (error) {
        console.warn('Stripe not initialized:', error.message);
      }
    }
  }

  // Initialize payment
  async initializePayment(orderData) {
    switch (this.gateway) {
      case 'stripe':
        return this.initializeStripe(orderData);
      case 'paystack':
        return this.initializePaystack(orderData);
      case 'flutterwave':
        return this.initializeFlutterwave(orderData);
      case 'coingate':
      case 'crypto':
        return this.initializeCrypto(orderData);
      case 'coinbase':
        return this.initializeCoinbase(orderData);
      case 'nowpayments':
        return this.initializeNOWPayments(orderData);
      default:
        throw new Error('Invalid payment gateway');
    }
  }

  // Verify payment
  async verifyPayment(reference) {
    switch (this.gateway) {
      case 'stripe':
        return this.verifyStripe(reference);
      case 'paystack':
        return this.verifyPaystack(reference);
      case 'flutterwave':
        return this.verifyFlutterwave(reference);
      case 'coingate':
      case 'crypto':
        return this.verifyCrypto(reference);
      case 'coinbase':
        return this.verifyCoinbase(reference);
      case 'nowpayments':
        return this.verifyNOWPayments(reference);
      default:
        throw new Error('Invalid payment gateway');
    }
  }

  // ============ STRIPE IMPLEMENTATION ============
  async initializeStripe(orderData) {
    try {
      if (!this.stripe) {
        // Mock mode for development
        return this.mockStripePayment(orderData);
      }

      // Create Stripe Payment Intent
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(orderData.total * 100), // Convert to cents
        currency: orderData.currency || 'usd',
        metadata: {
          orderId: orderData.orderId,
          customerEmail: orderData.email,
          customerName: orderData.customerName
        },
        description: `Order #${orderData.orderId}`,
        receipt_email: orderData.email
      });

      return {
        success: true,
        paymentReference: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        amount: orderData.total,
        currency: (orderData.currency || 'usd').toUpperCase(),
        gateway: 'stripe'
      };
    } catch (error) {
      console.error('Stripe initialization error:', error);
      throw new Error(`Payment initialization failed: ${error.message}`);
    }
  }

  async verifyStripe(paymentIntentId) {
    try {
      if (!this.stripe) {
        // Mock verification for development
        return {
          success: true,
          status: 'succeeded',
          amount: 0,
          reference: paymentIntentId,
          gateway: 'stripe'
        };
      }

      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

      return {
        success: paymentIntent.status === 'succeeded',
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100, // Convert from cents
        currency: paymentIntent.currency.toUpperCase(),
        reference: paymentIntent.id,
        gateway: 'stripe',
        metadata: paymentIntent.metadata
      };
    } catch (error) {
      console.error('Stripe verification error:', error);
      throw new Error(`Payment verification failed: ${error.message}`);
    }
  }

  mockStripePayment(orderData) {
    // Mock payment for development/testing
    const paymentIntent = {
      id: `pi_mock_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      client_secret: `pi_secret_mock_${Math.random().toString(36).substring(7)}`,
      amount: Math.round(orderData.total * 100),
      currency: 'usd',
      status: 'requires_payment_method'
    };

    return {
      success: true,
      paymentReference: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      amount: orderData.total,
      currency: 'USD',
      gateway: 'stripe',
      mode: 'mock'
    };
  }

  // Paystack implementation (placeholder)
  async initializePaystack(orderData) {
    // Implement Paystack initialization
    // const axios = require('axios');
    // const response = await axios.post('https://api.paystack.co/transaction/initialize', {
    //   email: orderData.email,
    //   amount: orderData.total * 100,
    //   currency: 'NGN'
    // }, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
    //   }
    // });
    
    return {
      success: true,
      paymentReference: `ref_${Date.now()}`,
      authorizationUrl: 'https://checkout.paystack.com/mock',
      amount: orderData.total,
      currency: 'NGN'
    };
  }

  async verifyPaystack(reference) {
    // Verify with Paystack API
    return {
      success: true,
      status: 'success',
      amount: 0,
      reference
    };
  }

  // Flutterwave implementation (placeholder)
  async initializeFlutterwave(orderData) {
    // Implement Flutterwave initialization
    return {
      success: true,
      paymentReference: `flw_${Date.now()}`,
      paymentLink: 'https://checkout.flutterwave.com/mock',
      amount: orderData.total,
      currency: 'USD'
    };
  }

  async verifyFlutterwave(reference) {
    // Verify with Flutterwave API
    return {
      success: true,
      status: 'successful',
      amount: 0,
      reference
    };
  }

  // ============ CRYPTOCURRENCY IMPLEMENTATIONS ============

  // CoinGate - Supports BTC, ETH, LTC, and 70+ cryptocurrencies
  async initializeCrypto(orderData) {
    try {
      const axios = require('axios');
      
      if (!process.env.COINGATE_API_KEY) {
        // Mock mode for development
        return this.mockCryptoPayment(orderData);
      }

      const response = await axios.post(
        'https://api.coingate.com/v2/orders',
        {
          order_id: orderData.orderId,
          price_amount: orderData.total,
          price_currency: orderData.currency || 'USD',
          receive_currency: orderData.currency || 'USD',
          title: `Order #${orderData.orderNumber}`,
          description: `Payment for order ${orderData.orderNumber}`,
          callback_url: `${process.env.API_URL}/api/payments/webhook/crypto`,
          cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
          success_url: `${process.env.FRONTEND_URL}/checkout/success`,
          token: orderData.orderId
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.COINGATE_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        paymentReference: response.data.id.toString(),
        paymentUrl: response.data.payment_url,
        amount: orderData.total,
        currency: orderData.currency || 'USD',
        gateway: 'crypto',
        supportedCoins: ['BTC', 'ETH', 'LTC', 'USDT', 'USDC', 'BCH', 'DOGE', 'XRP'],
        expiresAt: response.data.expire_at
      };
    } catch (error) {
      console.error('CoinGate initialization error:', error);
      throw new Error(`Crypto payment initialization failed: ${error.message}`);
    }
  }

  async verifyCrypto(reference) {
    try {
      const axios = require('axios');
      
      if (!process.env.COINGATE_API_KEY) {
        // Mock verification
        return {
          success: true,
          status: 'paid',
          amount: 0,
          reference,
          gateway: 'crypto'
        };
      }

      const response = await axios.get(
        `https://api.coingate.com/v2/orders/${reference}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.COINGATE_API_KEY}`
          }
        }
      );

      const order = response.data;

      return {
        success: order.status === 'paid',
        status: order.status,
        amount: parseFloat(order.price_amount),
        currency: order.price_currency,
        reference: order.id.toString(),
        gateway: 'crypto',
        paymentCurrency: order.pay_currency,
        paymentAmount: order.pay_amount,
        transactionHash: order.payment_address
      };
    } catch (error) {
      console.error('CoinGate verification error:', error);
      throw new Error(`Crypto payment verification failed: ${error.message}`);
    }
  }

  mockCryptoPayment(orderData) {
    return {
      success: true,
      paymentReference: `crypto_mock_${Date.now()}`,
      paymentUrl: `http://localhost:3000/crypto-payment-mock/${orderData.orderId}`,
      amount: orderData.total,
      currency: 'USD',
      gateway: 'crypto',
      supportedCoins: ['BTC', 'ETH', 'LTC', 'USDT', 'USDC'],
      mode: 'mock'
    };
  }

  // Coinbase Commerce - Official Coinbase payment processor
  async initializeCoinbase(orderData) {
    try {
      const axios = require('axios');
      
      if (!process.env.COINBASE_COMMERCE_API_KEY) {
        return this.mockCryptoPayment(orderData);
      }

      const response = await axios.post(
        'https://api.commerce.coinbase.com/charges',
        {
          name: `Order #${orderData.orderNumber}`,
          description: `Payment for order ${orderData.orderNumber}`,
          pricing_type: 'fixed_price',
          local_price: {
            amount: orderData.total.toString(),
            currency: orderData.currency || 'USD'
          },
          metadata: {
            order_id: orderData.orderId,
            customer_email: orderData.email
          },
          redirect_url: `${process.env.FRONTEND_URL}/checkout/success`,
          cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`
        },
        {
          headers: {
            'X-CC-Api-Key': process.env.COINBASE_COMMERCE_API_KEY,
            'X-CC-Version': '2018-03-22',
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        paymentReference: response.data.data.code,
        paymentUrl: response.data.data.hosted_url,
        amount: orderData.total,
        currency: orderData.currency || 'USD',
        gateway: 'coinbase',
        supportedCoins: ['BTC', 'ETH', 'USDC', 'DAI', 'LTC', 'BCH'],
        expiresAt: response.data.data.expires_at
      };
    } catch (error) {
      console.error('Coinbase Commerce error:', error);
      throw new Error(`Coinbase payment initialization failed: ${error.message}`);
    }
  }

  async verifyCoinbase(reference) {
    try {
      const axios = require('axios');
      
      if (!process.env.COINBASE_COMMERCE_API_KEY) {
        return {
          success: true,
          status: 'COMPLETED',
          amount: 0,
          reference,
          gateway: 'coinbase'
        };
      }

      const response = await axios.get(
        `https://api.commerce.coinbase.com/charges/${reference}`,
        {
          headers: {
            'X-CC-Api-Key': process.env.COINBASE_COMMERCE_API_KEY,
            'X-CC-Version': '2018-03-22'
          }
        }
      );

      const charge = response.data.data;
      const timeline = charge.timeline;
      const lastStatus = timeline[timeline.length - 1].status;

      return {
        success: lastStatus === 'COMPLETED',
        status: lastStatus,
        amount: parseFloat(charge.pricing.local.amount),
        currency: charge.pricing.local.currency,
        reference: charge.code,
        gateway: 'coinbase',
        payments: charge.payments
      };
    } catch (error) {
      console.error('Coinbase verification error:', error);
      throw new Error(`Coinbase payment verification failed: ${error.message}`);
    }
  }

  // NOWPayments - Supports 200+ cryptocurrencies
  async initializeNOWPayments(orderData) {
    try {
      const axios = require('axios');
      
      if (!process.env.NOWPAYMENTS_API_KEY) {
        return this.mockCryptoPayment(orderData);
      }

      // Create payment
      const response = await axios.post(
        'https://api.nowpayments.io/v1/payment',
        {
          price_amount: orderData.total,
          price_currency: orderData.currency || 'usd',
          pay_currency: orderData.cryptoCurrency || 'btc',
          order_id: orderData.orderId,
          order_description: `Order #${orderData.orderNumber}`,
          ipn_callback_url: `${process.env.API_URL}/api/payments/webhook/nowpayments`,
          success_url: `${process.env.FRONTEND_URL}/checkout/success`,
          cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`
        },
        {
          headers: {
            'x-api-key': process.env.NOWPAYMENTS_API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        paymentReference: response.data.payment_id,
        paymentAddress: response.data.pay_address,
        paymentAmount: response.data.pay_amount,
        payCurrency: response.data.pay_currency,
        amount: orderData.total,
        currency: orderData.currency || 'USD',
        gateway: 'nowpayments',
        supportedCoins: ['BTC', 'ETH', 'LTC', 'XRP', 'TRX', 'BNB', 'USDT', 'USDC', 'DOGE'],
        expiresAt: response.data.expiration_estimate_date
      };
    } catch (error) {
      console.error('NOWPayments error:', error);
      throw new Error(`NOWPayments initialization failed: ${error.message}`);
    }
  }

  async verifyNOWPayments(reference) {
    try {
      const axios = require('axios');
      
      if (!process.env.NOWPAYMENTS_API_KEY) {
        return {
          success: true,
          status: 'finished',
          amount: 0,
          reference,
          gateway: 'nowpayments'
        };
      }

      const response = await axios.get(
        `https://api.nowpayments.io/v1/payment/${reference}`,
        {
          headers: {
            'x-api-key': process.env.NOWPAYMENTS_API_KEY
          }
        }
      );

      const payment = response.data;

      return {
        success: payment.payment_status === 'finished',
        status: payment.payment_status,
        amount: parseFloat(payment.price_amount),
        currency: payment.price_currency.toUpperCase(),
        reference: payment.payment_id,
        gateway: 'nowpayments',
        paymentCurrency: payment.pay_currency,
        paymentAmount: payment.pay_amount,
        transactionHash: payment.outcome_amount
      };
    } catch (error) {
      console.error('NOWPayments verification error:', error);
      throw new Error(`NOWPayments verification failed: ${error.message}`);
    }
  }
}

module.exports = new PaymentService();
