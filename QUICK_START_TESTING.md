# 🚀 MultiMart - Quick Start & Testing Guide

## ⚡ Get Your Platform Running in 5 Minutes!

---

## 📋 Pre-Launch Checklist

### 1. **Install Dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. **Configure Environment**
```bash
# backend/.env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/multimart
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development

# Optional - Payment Gateways
STRIPE_SECRET_KEY=sk_test_your_stripe_key
PAYMENT_GATEWAY=stripe

# Optional - Crypto Payments
COINGATE_API_KEY=your_coingate_key

# URLs
API_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
CLIENT_URL=http://localhost:3000
```

### 3. **Start MongoDB**
```bash
# If using local MongoDB
mongod

# OR use MongoDB Atlas (cloud)
# Just update MONGODB_URI in .env
```

### 4. **Start Servers**
```bash
# Terminal 1 - Backend
cd backend
npm start
# Should see: "Server running on port 8000" and "MongoDB connected"

# Terminal 2 - Frontend  
cd frontend
npm start
# Should open http://localhost:3000 automatically
```

---

## ✅ Testing Checklist

### Phase 1: Basic Functionality (5 min)

#### 1. **Homepage** ✓
- [ ] Open http://localhost:3000
- [ ] See featured products
- [ ] See categories
- [ ] See crypto payment button
- [ ] Navigation works

#### 2. **User Registration** ✓
```
1. Click "Register" in navbar
2. Fill form:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Password: Test123!
   - Role: Customer
3. Click Register
4. Should redirect to home with user logged in
```

#### 3. **Browse Products** ✓
```
1. Click "Products" in navbar
2. See product list
3. Use filters (category, price)
4. Use search bar
5. Click on a product
6. See product details
```

---

### Phase 2: Shopping Flow (10 min)

#### 4. **Add to Cart** ✓
```
1. On product details page
2. Select quantity
3. Click "Add to Cart"
4. See success message
5. Cart icon shows count
6. Click cart icon
7. See product in cart
```

#### 5. **Add to Wishlist** ✓
```
1. On product details page
2. Click heart icon
3. See success message
4. Go to Wishlist page
5. See product listed
```

#### 6. **Product Comparison** ✓
```
1. On product details page
2. Click ⚖️ compare button
3. Add 2-3 more products
4. Click floating "Compare" button
5. See side-by-side comparison
```

#### 7. **Checkout Process** ✓
```
1. Go to Cart
2. Click "Proceed to Checkout"
3. Fill shipping address
4. Select payment method (Card or Crypto)
5. Apply coupon code (if you created one)
6. See discount applied
7. Click "Place Order"
8. Order created successfully
```

---

### Phase 3: Advanced Features (10 min)

#### 8. **Search with Autocomplete** ✓
```
1. Type in search bar (min 2 characters)
2. See suggestions appear
3. See product images in suggestions
4. Use arrow keys to navigate
5. Press Enter to search
```

#### 9. **Notifications** ✓
```
1. Click bell icon in navbar
2. See notifications dropdown
3. Click a notification
4. Mark as read
5. Click "Mark all as read"
```

#### 10. **Recently Viewed** ✓
```
1. View 3-4 different products
2. Go to homepage
3. Scroll down
4. See "Recently Viewed" section
5. See products you just viewed
```

#### 11. **Crypto Payment** ✓
```
1. Add product to cart
2. Go to checkout
3. Select "Cryptocurrency" payment
4. Fill shipping address
5. Click "Continue to Crypto Payment"
6. See crypto payment interface
7. See supported cryptocurrencies
8. Click "Complete Payment" button
```

#### 12. **Reviews & Ratings** ✓
```
1. Go to product details
2. Scroll to reviews section
3. Click "Write a Review"
4. Rate product (1-5 stars)
5. Write review text
6. Submit review
7. See review in list
```

---

### Phase 4: Vendor Features (10 min)

#### 13. **Vendor Registration** ✓
```
1. Logout if logged in
2. Click Register
3. Select "Vendor" role
4. Fill vendor details
5. Register
6. Go to /vendor/dashboard
7. See vendor dashboard
```

#### 14. **Add Product (Vendor)** ✓
```
1. In vendor dashboard
2. Click "Products"
3. Click "Add Product"
4. Fill product details:
   - Name
   - Description
   - Price
   - Category
   - Stock
   - Images (URLs)
5. Click "Create Product"
6. See product in list
```

#### 15. **Manage Orders (Vendor)** ✓
```
1. Go to "Orders" in vendor dashboard
2. See customer orders
3. Click on an order
4. Update order status
5. See status updated
```

---

### Phase 5: Admin Features (10 min)

#### 16. **Admin Registration** ✓
```
1. Logout
2. Register with "Admin" role
3. Go to /admin/dashboard
4. See admin dashboard
```

#### 17. **Manage Users (Admin)** ✓
```
1. Click "Users" in admin sidebar
2. See all users
3. Search users
4. View user details
5. Update user status
```

#### 18. **Create Coupon (Admin)** ✓
```
1. Go to Admin Dashboard
2. Open browser console
3. Run this API call:

fetch('http://localhost:8000/api/coupons', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ADMIN_TOKEN'
  },
  body: JSON.stringify({
    code: 'SAVE20',
    type: 'percentage',
    value: 20,
    description: '20% off all products',
    minPurchase: 0,
    validUntil: '2025-12-31'
  })
})

4. Coupon created!
5. Test at checkout
```

#### 19. **Manage Categories (Admin)** ✓
```
1. Click "Categories" in admin sidebar
2. Click "Add Category"
3. Enter category name
4. Add description
5. Save category
6. See in products filter
```

---

## 🔧 Testing APIs with Postman/cURL

### 1. **Register User**
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "Test123!",
    "role": "customer"
  }'
```

### 2. **Login**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Test123!"
  }'
```

### 3. **Get Products**
```bash
curl http://localhost:8000/api/products
```

### 4. **Search Suggestions**
```bash
curl "http://localhost:8000/api/products/search/suggestions?q=laptop"
```

### 5. **Get Notifications**
```bash
curl http://localhost:8000/api/notifications \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 6. **Validate Coupon**
```bash
curl -X POST http://localhost:8000/api/coupons/validate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"code":"SAVE20"}'
```

---

## 🐛 Common Issues & Fixes

### Issue 1: MongoDB Connection Failed
```bash
# Solution 1: Start MongoDB
mongod

# Solution 2: Check connection string
# Make sure MONGODB_URI in .env is correct

# Solution 3: Use MongoDB Atlas
# Sign up at mongodb.com and get connection string
```

### Issue 2: Port Already in Use
```bash
# Backend (port 8000)
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Frontend (port 3000)
# Just choose different port when prompted
```

### Issue 3: CORS Errors
```javascript
// backend/src/server.js
// Make sure CORS origin matches frontend URL
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Issue 4: Notifications Not Showing
```bash
# 1. Check if logged in
# 2. Check browser console for errors
# 3. Verify API endpoint: http://localhost:8000/api/notifications
# 4. Check authentication token
```

### Issue 5: Crypto Payment Not Working
```bash
# 1. Check if PAYMENT_GATEWAY is set in .env
# 2. For testing, don't add API keys (mock mode works)
# 3. Check browser console for errors
```

---

## 📊 Sample Data for Testing

### Create Sample Products (Admin/Vendor):
```javascript
// Products to add manually
1. Laptop - $999 - Electronics
2. T-Shirt - $29 - Fashion
3. Coffee Maker - $79 - Home
4. Running Shoes - $89 - Sports
5. Novel Book - $15 - Books
```

### Create Sample Coupons (Admin):
```javascript
1. WELCOME10 - 10% off - No minimum
2. SAVE20 - 20% off - Min $50
3. FREESHIP - Free shipping - Min $100
4. SUMMER25 - 25% off - Min $75
```

---

## ✅ Success Indicators

### Backend is Working:
- ✅ Server starts without errors
- ✅ MongoDB connects successfully
- ✅ API endpoints respond
- ✅ No console errors

### Frontend is Working:
- ✅ Page loads without errors
- ✅ Navigation works
- ✅ Components render
- ✅ API calls succeed
- ✅ No console errors

### Features are Working:
- ✅ User can register/login
- ✅ Products display correctly
- ✅ Cart operations work
- ✅ Checkout process completes
- ✅ Notifications appear
- ✅ Search suggestions show
- ✅ Coupons apply correctly

---

## 🎯 Performance Checks

### Backend Performance:
```bash
# Check response times
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:8000/api/products

# Should be < 200ms
```

### Frontend Performance:
```bash
# Run Lighthouse audit
# Chrome DevTools > Lighthouse > Run audit

# Target scores:
# Performance: 90+
# Accessibility: 90+
# Best Practices: 90+
# SEO: 90+
```

---

## 🚀 Ready for Production?

### Pre-Production Checklist:
- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables set
- [ ] MongoDB Atlas configured
- [ ] Payment gateways configured
- [ ] Security headers enabled
- [ ] Rate limiting active
- [ ] Error handling tested
- [ ] Performance optimized
- [ ] Documentation reviewed

---

## 🎉 You're Ready to Launch!

### Next Steps:
1. ✅ Complete all tests above
2. ✅ Fix any issues found
3. ✅ Add sample data
4. ✅ Configure production environment
5. ✅ Deploy to production
6. ✅ Monitor and optimize

---

## 📞 Need Help?

### Resources:
- **Complete Guide:** MULTIMART_COMPLETE_GUIDE.md
- **API Docs:** BACKEND_APIs_COMPLETE.md
- **Features:** FEATURES_INTEGRATION_COMPLETE.md
- **Crypto Setup:** CRYPTO_PAYMENT_COMPLETE.md

---

**Happy Testing!** 🧪

**Your platform is ready to go live!** 🚀
