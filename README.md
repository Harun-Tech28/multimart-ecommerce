# 🛍️ MultiMart - Multi-Vendor E-Commerce Platform

[![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)]()
[![Version](https://img.shields.io/badge/version-1.0.0-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

> A complete, feature-rich e-commerce platform with multi-vendor support, cryptocurrency payments, and advanced features built with the MERN stack.

---

## ✨ Features

### 🛒 Core E-Commerce
- User authentication & authorization
- Product catalog with categories
- Shopping cart & wishlist
- Order management & tracking
- Payment processing (Card + Crypto)
- Reviews & ratings system

### 🚀 Advanced Features
- **File Upload** - Upload product images & videos (up to 50MB)
- **Cryptocurrency Payments** - Accept 200+ cryptocurrencies
- **Advanced Search** - Real-time autocomplete with suggestions
- **Notifications System** - Real-time user notifications
- **Coupon System** - Flexible discount codes
- **Product Comparison** - Compare up to 4 products
- **Recently Viewed** - Track user browsing history
- **Order Tracking** - Visual progress tracking

### 👥 Multi-User Support
- **Customers** - Browse, shop, track orders
- **Vendors** - Manage store, products, orders, upload media
- **Admins** - Platform management, analytics

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd multimart

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Configuration

Create `backend/.env`:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/multimart
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

# Optional - Payment Gateways
STRIPE_SECRET_KEY=your_stripe_key
COINGATE_API_KEY=your_coingate_key

# URLs
API_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```

### Run Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

Visit: http://localhost:3000

---

## 📁 Project Structure

```
multimart/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   ├── services/     # Business logic
│   │   └── server.js     # Entry point
│   └── package.json
│
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── App.js        # Main app
│   └── package.json
│
└── docs/                 # Documentation
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `GET /api/products/search/suggestions` - Search suggestions
- `POST /api/products` - Create product (vendor)

### Orders
- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read

### Coupons
- `POST /api/coupons/validate` - Validate coupon
- `GET /api/coupons` - List coupons (admin)
- `POST /api/coupons` - Create coupon (admin)

[See full API documentation](./BACKEND_APIs_COMPLETE.md)

---

## 💻 Tech Stack

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt

### Payment Gateways
- Stripe
- Paystack
- Flutterwave
- CoinGate (Crypto)
- Coinbase Commerce (Crypto)
- NOWPayments (Crypto)

---

## 📚 Documentation

- **[Complete Guide](./MULTIMART_COMPLETE_GUIDE.md)** - Full platform guide
- **[Quick Start Testing](./QUICK_START_TESTING.md)** - Testing guide
- **[API Documentation](./BACKEND_APIs_COMPLETE.md)** - API reference
- **[Features Guide](./FEATURES_INTEGRATION_COMPLETE.md)** - Feature details
- **[Crypto Payments](./CRYPTO_PAYMENT_COMPLETE.md)** - Crypto setup guide

---

## 🧪 Testing

### Run Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Manual Testing
See [QUICK_START_TESTING.md](./QUICK_START_TESTING.md) for comprehensive testing guide.

---

## 🚀 Deployment

### Backend (Heroku)
```bash
heroku create multimart-api
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

### Frontend (Vercel)
```bash
cd frontend
vercel
```

### Database (MongoDB Atlas)
1. Create cluster at mongodb.com
2. Get connection string
3. Update MONGODB_URI in .env

---

## 🔐 Security

- JWT authentication
- Password hashing (bcrypt)
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation
- XSS protection

---

## 📊 Features Overview

| Feature | Status | Description |
|---------|--------|-------------|
| User Auth | ✅ | Register, login, profile |
| Products | ✅ | CRUD, categories, search |
| Cart | ✅ | Add, update, remove items |
| Orders | ✅ | Create, track, manage |
| Payments | ✅ | Card + Crypto support |
| Notifications | ✅ | Real-time updates |
| Coupons | ✅ | Discount codes |
| Reviews | ✅ | Rate & review products |
| Multi-Vendor | ✅ | Vendor dashboard |
| Admin Panel | ✅ | Platform management |
| Search | ✅ | Advanced autocomplete |
| Comparison | ✅ | Compare products |
| Tracking | ✅ | Order tracking |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- React team for amazing framework
- MongoDB for flexible database
- Stripe for payment processing
- CoinGate for crypto payments
- Tailwind CSS for styling

---

## 📞 Support

For support, email support@multimart.com or join our Slack channel.

---

## 🗺️ Roadmap

### Version 1.1 (Planned)
- [ ] Real-time chat support
- [ ] Social media integration
- [ ] AI product recommendations
- [ ] Multi-language support
- [ ] Mobile app (React Native)

### Version 1.2 (Planned)
- [ ] Advanced analytics
- [ ] Email marketing
- [ ] Inventory management
- [ ] Shipping integration
- [ ] Tax calculation

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

## 📸 Screenshots

### Homepage
![Homepage](./screenshots/home.png)

### Product Details
![Product Details](./screenshots/product.png)

### Checkout
![Checkout](./screenshots/checkout.png)

### Admin Dashboard
![Admin Dashboard](./screenshots/admin.png)

---

**Built with ❤️ using MERN Stack**

**Status:** ✅ Production Ready | **Version:** 1.0.0 | **Last Updated:** October 2025
