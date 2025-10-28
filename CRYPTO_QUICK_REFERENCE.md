# 🚀 Crypto Payments - Quick Reference Card

## ⚡ 30-Second Setup

```bash
# 1. Install
cd backend && npm install axios

# 2. Configure .env
PAYMENT_GATEWAY=coingate
COINGATE_API_KEY=your_key_here
API_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

# 3. Start
npm start
```

---

## 🎯 Gateway Comparison

| Gateway | Coins | Fee | Setup |
|---------|-------|-----|-------|
| **CoinGate** | 70+ | 1% | ⭐⭐⭐ Easy |
| **Coinbase** | 6 | 1% | ⭐⭐⭐ Easy |
| **NOWPayments** | 200+ | 0.5% | ⭐⭐ Medium |

---

## 💰 Top Cryptocurrencies

```
₿ Bitcoin (BTC)      - Most popular
Ξ Ethereum (ETH)     - Smart contracts
₮ USDT               - Stable coin
$ USDC               - USD-backed
Ł Litecoin (LTC)     - Fast
Ð Dogecoin (DOGE)    - Community
✕ Ripple (XRP)       - Cross-border
B Binance (BNB)      - Exchange
```

---

## 📝 Environment Variables

### CoinGate:
```env
PAYMENT_GATEWAY=coingate
COINGATE_API_KEY=your_key
```

### Coinbase:
```env
PAYMENT_GATEWAY=coinbase
COINBASE_COMMERCE_API_KEY=your_key
```

### NOWPayments:
```env
PAYMENT_GATEWAY=nowpayments
NOWPAYMENTS_API_KEY=your_key
```

---

## 🔗 API Endpoints

### Initialize:
```http
POST /api/payments/initialize
Body: { "orderId": "id" }
```

### Verify:
```http
POST /api/payments/verify
Body: { "reference": "ref" }
```

---

## 📱 Files Modified

```
✅ backend/src/services/paymentService.js
✅ frontend/src/components/payment/CryptoPayment.jsx
✅ frontend/src/components/payment/CryptoSupport.jsx
✅ frontend/src/pages/Checkout.jsx
✅ frontend/src/pages/Home.jsx
```

---

## 🧪 Test Mode

```env
PAYMENT_GATEWAY=crypto
# No API key needed - mock mode!
```

---

## 🆘 Quick Troubleshooting

**Not initializing?**
- Check API key
- Verify PAYMENT_GATEWAY
- Install axios

**Not showing?**
- Clear cache
- Restart server
- Check imports

**Not confirming?**
- Wait 10-30 min
- Check blockchain
- Review webhooks

---

## 📚 Documentation

1. **README_CRYPTO_PAYMENTS.md** - Start here
2. **SETUP_CRYPTO_PAYMENTS.md** - 5-min setup
3. **CRYPTO_SETUP_CHECKLIST.md** - Checklist
4. **CRYPTO_PAYMENT_COMPLETE.md** - Full guide

---

## 🔗 Quick Links

**CoinGate:**
- Signup: https://coingate.com
- Docs: https://developer.coingate.com
- Support: support@coingate.com

**Coinbase:**
- Signup: https://commerce.coinbase.com
- Docs: https://commerce.coinbase.com/docs
- Support: https://help.coinbase.com

**NOWPayments:**
- Signup: https://nowpayments.io
- Docs: https://nowpayments.io/doc
- Support: support@nowpayments.io

---

## ✅ Checklist

- [ ] Choose gateway
- [ ] Get API key
- [ ] Configure .env
- [ ] Install axios
- [ ] Test locally
- [ ] Go live!

---

## 💡 Pro Tips

1. **Start with CoinGate** - Easiest setup
2. **Test in sandbox** - Before going live
3. **Monitor first payments** - Watch closely
4. **Set up webhooks** - For automation
5. **Keep API keys safe** - Use .env

---

## 🎉 You're Ready!

**Accept 200+ cryptocurrencies in 5 minutes!**

₿ Ξ Ł ₮ $ Ð ✕ B

---

**Print this card for quick reference!** 📋
