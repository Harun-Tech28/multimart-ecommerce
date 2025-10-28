# Payment Gateway Integration Guide

## 🎯 Overview

Your MultiMart platform supports multiple payment gateways:
- ✅ **Stripe** (Fully Implemented)
- 🔄 **Paystack** (Structure Ready)
- 🔄 **Flutterwave** (Structure Ready)

---

## 🚀 Quick Start

### 1. Install Stripe SDK

```bash
cd backend
npm install stripe
```

### 2. Configure Environment Variables

Add to your `backend/.env` file:

```env
# Payment Gateway Configuration
PAYMENT_GATEWAY=stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# For Paystack (optional)
# PAYMENT_GATEWAY=paystack
# PAYSTACK_SECRET_KEY=sk_test_your_paystack_key
# PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_key

# For Flutterwave (optional)
# PAYMENT_GATEWAY=flutterwave
# FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret
# FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public
```

### 3. Get Stripe API Keys

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Create an account
3. Navigate to **Developers → API Keys**
4. Copy your **Secret Key** and **Publishable Key**
5. Use **Test Mode** keys for development

---

## 📋 API Endpoints

### **1. Initialize Payment**

```http
POST /api/payments/initialize
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "orderId": "order_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment initialized successfully",
  "data": {
    "paymentReference": "pi_1234567890",
    "clientSecret": "pi_secret_abc123",
    "amount": 99.99,
    "currency": "USD",
    "gateway": "stripe"
  }
}
```

### **2. Verify Payment**

```http
POST /api/payments/verify
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "reference": "pi_1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "data": {
    "order": {
      "id": "order_id",
      "orderNumber": "ORD-12345",
      "paymentStatus": "paid",
      "status": "processing"
    }
  }
}
```

### **3. Webhook Handler**

```http
POST /api/payments/webhook
Stripe-Signature: signature_here
Content-Type: application/json

{
  "type": "payment_intent.succeeded",
  "data": { ... }
}
```

---

## 💻 Frontend Integration

### **1. Install Stripe.js**

```bash
cd frontend
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### **2. Create Payment Component**

```javascript
// frontend/src/components/payment/StripeCheckout.jsx
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

// Load Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ orderId, amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Initialize payment
    initializePayment();
  }, [orderId]);

  const initializePayment = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/payments/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ orderId })
      });

      const data = await response.json();
      if (data.success) {
        setClientSecret(data.data.clientSecret);
      }
    } catch (error) {
      onError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (error) {
        onError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        // Verify payment with backend
        const response = await fetch('http://localhost:8000/api/payments/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ reference: paymentIntent.id })
        });

        const data = await response.json();
        if (data.success) {
          onSuccess(data.data.order);
        }
      }
    } catch (error) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Pay $${amount}`}
      </button>
    </form>
  );
};

const StripeCheckout = ({ orderId, amount, onSuccess, onError }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        orderId={orderId}
        amount={amount}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
};

export default StripeCheckout;
```

### **3. Use in Checkout Page**

```javascript
// frontend/src/pages/Checkout.jsx
import StripeCheckout from '../components/payment/StripeCheckout';

const Checkout = () => {
  const [orderId, setOrderId] = useState(null);
  const [amount, setAmount] = useState(0);

  const handlePaymentSuccess = (order) => {
    alert('Payment successful!');
    navigate(`/orders/${order.id}`);
  };

  const handlePaymentError = (error) => {
    alert(`Payment failed: ${error}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Complete Payment</h1>
      
      <StripeCheckout
        orderId={orderId}
        amount={amount}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </div>
  );
};
```

---

## 🔐 Webhook Setup

### **1. Configure Stripe Webhook**

1. Go to **Stripe Dashboard → Developers → Webhooks**
2. Click **Add endpoint**
3. Enter your webhook URL: `https://your-domain.com/api/payments/webhook`
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing Secret** to your `.env` file

### **2. Test Webhooks Locally**

Install Stripe CLI:
```bash
# Install Stripe CLI
# Windows: scoop install stripe
# Mac: brew install stripe/stripe-cli/stripe
# Linux: Download from https://github.com/stripe/stripe-cli/releases

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:8000/api/payments/webhook
```

---

## 🧪 Testing

### **Test Card Numbers (Stripe)**

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
Insufficient Funds: 4000 0000 0000 9995
3D Secure: 4000 0025 0000 3155

Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

### **Test Payment Flow**

```bash
# 1. Create an order
curl -X POST http://localhost:8000/api/orders \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"items":[...],"shippingAddress":{...}}'

# 2. Initialize payment
curl -X POST http://localhost:8000/api/payments/initialize \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"orderId":"ORDER_ID"}'

# 3. Complete payment in frontend with test card

# 4. Verify payment
curl -X POST http://localhost:8000/api/payments/verify \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"reference":"PAYMENT_REFERENCE"}'
```

---

## 🌍 Multi-Currency Support

### Configure Currency

```javascript
// In payment initialization
const paymentData = await paymentService.initializePayment({
  orderId: order._id,
  total: order.total,
  currency: 'usd', // or 'eur', 'gbp', 'ngn', etc.
  email: req.user.email
});
```

### Supported Currencies

- **Stripe:** USD, EUR, GBP, CAD, AUD, and 135+ more
- **Paystack:** NGN, GHS, ZAR, USD
- **Flutterwave:** NGN, USD, GBP, EUR, and 150+ more

---

## 🔄 Adding Other Payment Gateways

### **Paystack Integration**

```bash
npm install paystack
```

```javascript
// In paymentService.js
async initializePaystack(orderData) {
  const axios = require('axios');
  
  const response = await axios.post(
    'https://api.paystack.co/transaction/initialize',
    {
      email: orderData.email,
      amount: orderData.total * 100, // Convert to kobo
      currency: 'NGN',
      metadata: {
        orderId: orderData.orderId
      }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    }
  );

  return {
    success: true,
    paymentReference: response.data.data.reference,
    authorizationUrl: response.data.data.authorization_url,
    amount: orderData.total,
    currency: 'NGN'
  };
}
```

### **Flutterwave Integration**

```bash
npm install flutterwave-node-v3
```

```javascript
// In paymentService.js
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

async initializeFlutterwave(orderData) {
  const payload = {
    tx_ref: `txn_${Date.now()}`,
    amount: orderData.total,
    currency: 'USD',
    redirect_url: 'https://your-domain.com/payment/callback',
    customer: {
      email: orderData.email,
      name: orderData.customerName
    },
    customizations: {
      title: 'MultiMart',
      description: `Order #${orderData.orderNumber}`
    }
  };

  const response = await flw.Charge.card(payload);
  
  return {
    success: true,
    paymentReference: response.data.tx_ref,
    paymentLink: response.data.link,
    amount: orderData.total,
    currency: 'USD'
  };
}
```

---

## 📊 Payment Status Flow

```
Order Created → Payment Initialized → Payment Processing → Payment Succeeded
                                                         ↓
                                                   Order Processing
                                                         ↓
                                                      Shipped
                                                         ↓
                                                     Delivered
```

---

## 🔒 Security Best Practices

1. ✅ **Never expose secret keys** in frontend code
2. ✅ **Always verify payments** on the backend
3. ✅ **Use HTTPS** in production
4. ✅ **Validate webhook signatures**
5. ✅ **Store payment references**, not card details
6. ✅ **Implement rate limiting** on payment endpoints
7. ✅ **Log all payment transactions**
8. ✅ **Handle failed payments** gracefully

---

## 📝 Environment Variables Summary

```env
# Required for Stripe
PAYMENT_GATEWAY=stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Frontend (.env)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 🎉 You're All Set!

Your payment gateway is now configured and ready to process payments! 

**Next Steps:**
1. Get your Stripe API keys
2. Add them to `.env` files
3. Install Stripe packages
4. Test with test cards
5. Deploy and go live!

For production, remember to:
- Switch to live API keys
- Set up production webhooks
- Enable 3D Secure authentication
- Configure proper error handling
- Set up payment monitoring

---

**Need Help?**
- Stripe Docs: https://stripe.com/docs
- Paystack Docs: https://paystack.com/docs
- Flutterwave Docs: https://developer.flutterwave.com
