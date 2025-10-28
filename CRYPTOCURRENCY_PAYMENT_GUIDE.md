# Cryptocurrency Payment Integration Guide 🚀

## 🎯 Overview

Your MultiMart platform now supports **cryptocurrency payments** with multiple providers:

- ✅ **CoinGate** - 70+ cryptocurrencies (BTC, ETH, LTC, USDT, etc.)
- ✅ **Coinbase Commerce** - Official Coinbase processor (BTC, ETH, USDC, DAI, LTC, BCH)
- ✅ **NOWPayments** - 200+ cryptocurrencies (BTC, ETH, XRP, TRX, BNB, etc.)

---

## 💰 Supported Cryptocurrencies

### **Major Coins:**
- Bitcoin (BTC)
- Ethereum (ETH)
- Litecoin (LTC)
- Bitcoin Cash (BCH)
- Ripple (XRP)
- Dogecoin (DOGE)

### **Stablecoins:**
- USDT (Tether)
- USDC (USD Coin)
- DAI
- BUSD

### **DeFi & Others:**
- BNB (Binance Coin)
- TRX (Tron)
- MATIC (Polygon)
- SOL (Solana)
- And 200+ more!

---

## 🚀 Quick Setup

### **Option 1: CoinGate (Recommended for Beginners)**

#### 1. Create Account
- Go to [https://coingate.com](https://coingate.com)
- Sign up for free
- Complete KYC verification

#### 2. Get API Keys
- Navigate to **Settings → API**
- Generate API Key
- Copy your API key

#### 3. Configure Backend

Add to `backend/.env`:
```env
PAYMENT_GATEWAY=coingate
COINGATE_API_KEY=your_api_key_here
API_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```

#### 4. Install Dependencies
```bash
cd backend
npm install axios
```

---

### **Option 2: Coinbase Commerce (Most Trusted)**

#### 1. Create Account
- Go to [https://commerce.coinbase.com](https://commerce.coinbase.com)
- Sign up with Coinbase account
- Complete verification

#### 2. Get API Key
- Go to **Settings → API Keys**
- Create new API key
- Copy the key

#### 3. Configure Backend

Add to `backend/.env`:
```env
PAYMENT_GATEWAY=coinbase
COINBASE_COMMERCE_API_KEY=your_api_key_here
API_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```

---

### **Option 3: NOWPayments (Most Cryptocurrencies)**

#### 1. Create Account
- Go to [https://nowpayments.io](https://nowpayments.io)
- Sign up for account
- Complete KYC

#### 2. Get API Key
- Navigate to **Settings → API**
- Generate API key
- Copy your key

#### 3. Configure Backend

Add to `backend/.env`:
```env
PAYMENT_GATEWAY=nowpayments
NOWPAYMENTS_API_KEY=your_api_key_here
API_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```

---

## 📋 API Usage

### **Initialize Crypto Payment**

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
    "paymentReference": "crypto_12345",
    "paymentUrl": "https://payment-gateway.com/pay/12345",
    "amount": 99.99,
    "currency": "USD",
    "gateway": "crypto",
    "supportedCoins": ["BTC", "ETH", "LTC", "USDT", "USDC"],
    "expiresAt": "2024-01-01T12:00:00Z"
  }
}
```

### **Verify Crypto Payment**

```http
POST /api/payments/verify
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "reference": "crypto_12345"
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

---

## 💻 Frontend Integration

### **1. Create Crypto Payment Component**

```javascript
// frontend/src/components/payment/CryptoPayment.jsx
import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const CryptoPayment = ({ orderId, amount, onSuccess, onError }) => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState('BTC');

  useEffect(() => {
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
        setPaymentData(data.data);
      }
    } catch (error) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ reference: paymentData.paymentReference })
      });

      const data = await response.json();
      if (data.success) {
        onSuccess(data.data.order);
      }
    } catch (error) {
      console.error('Payment check error:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading payment...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Pay with Cryptocurrency</h2>

      {/* Coin Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Cryptocurrency</label>
        <div className="grid grid-cols-3 gap-3">
          {paymentData?.supportedCoins?.map((coin) => (
            <button
              key={coin}
              onClick={() => setSelectedCoin(coin)}
              className={`p-3 border-2 rounded-lg font-semibold ${
                selectedCoin === coin
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              {coin}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600 mb-2">Amount to Pay</p>
          <p className="text-3xl font-bold text-gray-900">
            ${paymentData?.amount} {paymentData?.currency}
          </p>
        </div>

        {/* QR Code */}
        {paymentData?.paymentAddress && (
          <div className="flex justify-center mb-4">
            <QRCodeSVG value={paymentData.paymentAddress} size={200} />
          </div>
        )}

        {/* Payment URL Button */}
        {paymentData?.paymentUrl && (
          <div className="text-center">
            <a
              href={paymentData.paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Complete Payment
            </a>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-yellow-800 mb-2">Payment Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-700">
          <li>Click "Complete Payment" button above</li>
          <li>Select your preferred cryptocurrency</li>
          <li>Send the exact amount shown</li>
          <li>Wait for blockchain confirmation</li>
          <li>Your order will be processed automatically</li>
        </ol>
      </div>

      {/* Check Status Button */}
      <button
        onClick={checkPaymentStatus}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Check Payment Status
      </button>

      {/* Expiry Notice */}
      {paymentData?.expiresAt && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Payment expires at: {new Date(paymentData.expiresAt).toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default CryptoPayment;
```

### **2. Install QR Code Package**

```bash
cd frontend
npm install qrcode.react
```

### **3. Use in Checkout**

```javascript
// frontend/src/pages/Checkout.jsx
import CryptoPayment from '../components/payment/CryptoPayment';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Payment Method</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`p-4 border-2 rounded-lg ${
              paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
            }`}
          >
            💳 Credit/Debit Card
          </button>
          <button
            onClick={() => setPaymentMethod('crypto')}
            className={`p-4 border-2 rounded-lg ${
              paymentMethod === 'crypto' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
            }`}
          >
            ₿ Cryptocurrency
          </button>
        </div>
      </div>

      {/* Payment Component */}
      {paymentMethod === 'crypto' && (
        <CryptoPayment
          orderId={orderId}
          amount={totalAmount}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      )}
    </div>
  );
};
```

---

## 🔐 Webhook Configuration

### **CoinGate Webhook**

```javascript
// backend/src/controllers/paymentController.js
exports.handleCryptoWebhook = async (req, res) => {
  try {
    const { order_id, status, price_amount, pay_currency } = req.body;

    if (status === 'paid') {
      const order = await Order.findById(order_id);
      if (order) {
        order.paymentStatus = 'paid';
        order.status = 'processing';
        await order.save();
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

---

## 💡 Benefits of Crypto Payments

### **For Customers:**
- ✅ **Privacy** - No personal financial information shared
- ✅ **Security** - Blockchain-secured transactions
- ✅ **Global** - Pay from anywhere in the world
- ✅ **Low Fees** - Often cheaper than credit cards
- ✅ **Fast** - Instant payment initiation

### **For Merchants:**
- ✅ **Lower Fees** - 1% vs 3-5% for cards
- ✅ **No Chargebacks** - Irreversible transactions
- ✅ **Global Reach** - Accept payments worldwide
- ✅ **Instant Settlement** - Faster than traditional banking
- ✅ **Modern Appeal** - Attract crypto-savvy customers

---

## 🧪 Testing

### **Test Mode**

All crypto payment providers offer test/sandbox modes:

**CoinGate Sandbox:**
- Use sandbox API key
- Test with fake transactions
- No real crypto needed

**Coinbase Commerce:**
- Use testnet
- Test with test cryptocurrencies
- Full simulation

**NOWPayments:**
- Sandbox environment available
- Test all features without real funds

---

## 📊 Supported Cryptocurrencies by Provider

| Cryptocurrency | CoinGate | Coinbase | NOWPayments |
|---------------|----------|----------|-------------|
| Bitcoin (BTC) | ✅ | ✅ | ✅ |
| Ethereum (ETH) | ✅ | ✅ | ✅ |
| Litecoin (LTC) | ✅ | ✅ | ✅ |
| USDT | ✅ | ❌ | ✅ |
| USDC | ✅ | ✅ | ✅ |
| Dogecoin | ✅ | ❌ | ✅ |
| XRP | ✅ | ❌ | ✅ |
| BNB | ✅ | ❌ | ✅ |
| Total Coins | 70+ | 6 | 200+ |

---

## 🔧 Environment Variables Summary

```env
# Choose one payment gateway
PAYMENT_GATEWAY=coingate  # or coinbase, nowpayments

# CoinGate
COINGATE_API_KEY=your_key_here

# Coinbase Commerce
COINBASE_COMMERCE_API_KEY=your_key_here

# NOWPayments
NOWPAYMENTS_API_KEY=your_key_here

# Required URLs
API_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```

---

## 🎉 You're Ready!

Your MultiMart platform now accepts cryptocurrency payments! Customers can pay with:
- Bitcoin
- Ethereum
- Litecoin
- USDT/USDC
- And 200+ more cryptocurrencies!

**Next Steps:**
1. Choose a crypto payment provider
2. Sign up and get API keys
3. Add keys to `.env`
4. Install dependencies
5. Test with sandbox mode
6. Go live!

---

**Resources:**
- CoinGate: https://coingate.com/docs
- Coinbase Commerce: https://commerce.coinbase.com/docs
- NOWPayments: https://nowpayments.io/doc

Welcome to the future of payments! 🚀
