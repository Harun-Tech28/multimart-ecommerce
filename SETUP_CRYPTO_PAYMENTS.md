# 🚀 Quick Setup: Cryptocurrency Payments

## ⚡ 5-Minute Setup Guide

### **Step 1: Install Dependencies**

```bash
# Install axios for API calls
cd backend
npm install axios
```

### **Step 2: Choose Your Gateway & Get API Key**

Pick ONE option:

#### **Option A: CoinGate** (Easiest - Recommended)
1. Go to https://coingate.com
2. Click "Sign Up" → Create account
3. Go to Settings → API
4. Click "Generate API Key"
5. Copy your API key

#### **Option B: Coinbase Commerce** (Most Trusted)
1. Go to https://commerce.coinbase.com
2. Sign up with Coinbase account
3. Go to Settings → API Keys
4. Click "Create an API key"
5. Copy your API key

#### **Option C: NOWPayments** (Most Cryptocurrencies)
1. Go to https://nowpayments.io
2. Click "Sign Up" → Create account
3. Go to Settings → API
4. Generate API key
5. Copy your API key

### **Step 3: Configure Backend**

Open `backend/.env` and add these lines:

```env
# For CoinGate:
PAYMENT_GATEWAY=coingate
COINGATE_API_KEY=your_api_key_here

# OR for Coinbase Commerce:
PAYMENT_GATEWAY=coinbase
COINBASE_COMMERCE_API_KEY=your_api_key_here

# OR for NOWPayments:
PAYMENT_GATEWAY=nowpayments
NOWPAYMENTS_API_KEY=your_api_key_here

# Required URLs (update for production):
API_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```

### **Step 4: Test It!**

```bash
# Terminal 1 - Start Backend
cd backend
npm start

# Terminal 2 - Start Frontend
cd frontend
npm start
```

### **Step 5: Try a Payment**

1. Open http://localhost:3000
2. Add products to cart
3. Go to checkout
4. Select "Cryptocurrency" payment
5. Fill shipping address
6. Click "Continue to Crypto Payment"
7. See the crypto payment interface! 🎉

---

## 🧪 Test Without API Keys (Mock Mode)

Want to test without signing up? Just set:

```env
PAYMENT_GATEWAY=crypto
# Don't add any API keys
```

The system will work in mock mode for testing!

---

## 🎯 What You Get

### **Supported Cryptocurrencies:**
- ₿ Bitcoin (BTC)
- Ξ Ethereum (ETH)
- Ł Litecoin (LTC)
- ₮ USDT (Tether)
- $ USDC
- Ð Dogecoin (DOGE)
- ✕ Ripple (XRP)
- B Binance Coin (BNB)
- **And 200+ more!**

### **Features:**
- ✅ Beautiful payment UI
- ✅ Real-time countdown timer
- ✅ Multiple cryptocurrency options
- ✅ Payment status checking
- ✅ Automatic order updates
- ✅ Webhook support
- ✅ Mobile responsive
- ✅ Secure & encrypted

---

## 💰 Pricing Comparison

| Gateway | Fee | Cryptocurrencies | Best For |
|---------|-----|------------------|----------|
| **CoinGate** | 1% | 70+ | Beginners |
| **Coinbase** | 1% | 6 major | Trust & Brand |
| **NOWPayments** | 0.5% | 200+ | Variety |

---

## 🆘 Need Help?

### **Common Issues:**

**"Payment not initializing"**
- Check your API key is correct
- Verify `PAYMENT_GATEWAY` matches your provider
- Check backend console for errors

**"Can't see crypto option"**
- Clear browser cache
- Restart frontend server
- Check Checkout.jsx is updated

**"Webhook not working"**
- For local testing, webhooks won't work
- Use "Check Payment Status" button instead
- For production, set up ngrok or public URL

---

## 📚 Full Documentation

See `CRYPTO_PAYMENT_COMPLETE.md` for:
- Detailed setup instructions
- API documentation
- Webhook configuration
- Production deployment
- Troubleshooting guide

---

## 🎉 That's It!

You now have cryptocurrency payments integrated! 

**Test it out and start accepting Bitcoin, Ethereum, and 200+ other cryptocurrencies!** 🚀

---

**Questions?** Check the full guide or the provider's documentation:
- CoinGate: https://developer.coingate.com
- Coinbase: https://commerce.coinbase.com/docs
- NOWPayments: https://nowpayments.io/doc
