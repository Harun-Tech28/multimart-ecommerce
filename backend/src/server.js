require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB (non-blocking)
connectDB().catch(err => {
  console.warn('MongoDB connection failed. Server will run without database.');
  console.warn('Please set up MongoDB Atlas or install MongoDB locally.');
});

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images/videos)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Root route - Welcome page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>MultiMart API - Multi-Vendor E-Commerce Platform</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 40px 20px;
        }
        .container {
          background: white;
          border-radius: 20px;
          padding: 40px;
          max-width: 900px;
          margin: 0 auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 { 
          color: #667eea; 
          margin-bottom: 10px;
          font-size: 2.5em;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .subtitle {
          color: #666;
          margin-bottom: 20px;
          font-size: 1.1em;
        }
        .status-bar {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        .status {
          background: #10b981;
          color: white;
          padding: 10px 20px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9em;
        }
        .status.warning {
          background: #f59e0b;
        }
        .info-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .info-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
        }
        .info-card h3 {
          font-size: 2em;
          margin-bottom: 5px;
        }
        .info-card p {
          opacity: 0.9;
        }
        .section {
          margin-bottom: 30px;
        }
        .section h2 {
          color: #333;
          margin-bottom: 15px;
          font-size: 1.5em;
          border-bottom: 2px solid #667eea;
          padding-bottom: 10px;
        }
        .endpoints {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
        }
        .endpoint {
          margin: 10px 0;
          padding: 15px;
          background: white;
          border-radius: 8px;
          border-left: 4px solid #667eea;
          cursor: pointer;
          transition: all 0.3s;
        }
        .endpoint:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .endpoint-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 5px;
        }
        .method {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 5px;
          font-size: 0.75em;
          font-weight: bold;
          letter-spacing: 0.5px;
        }
        .post { background: #10b981; color: white; }
        .get { background: #3b82f6; color: white; }
        code {
          background: #e5e7eb;
          padding: 3px 8px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }
        .endpoint-desc {
          color: #666;
          font-size: 0.9em;
          margin-left: 70px;
        }
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        .feature {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
        }
        .feature-icon {
          font-size: 2em;
          margin-bottom: 10px;
        }
        .feature h4 {
          color: #333;
          margin-bottom: 5px;
        }
        .feature p {
          color: #666;
          font-size: 0.85em;
        }
        .quick-start {
          background: #fff3cd;
          border: 2px solid #ffc107;
          padding: 20px;
          border-radius: 10px;
          margin-top: 20px;
        }
        .quick-start h3 {
          color: #856404;
          margin-bottom: 15px;
        }
        .code-block {
          background: #2d3748;
          color: #e2e8f0;
          padding: 15px;
          border-radius: 8px;
          font-family: 'Courier New', monospace;
          font-size: 0.85em;
          overflow-x: auto;
          margin: 10px 0;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          text-align: center;
          color: #666;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 15px;
          flex-wrap: wrap;
        }
        .footer-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
        }
        .footer-link:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>
          <span>🛍️</span>
          <span>MultiMart API</span>
        </h1>
        <p class="subtitle">A Modern Multi-Vendor E-Commerce Platform API</p>
        
        <div class="status-bar">
          <div class="status">✓ Server Running</div>
          <div class="status ${mongoose.connection.readyState === 1 ? '' : 'warning'}">
            ${mongoose.connection.readyState === 1 ? '✓ MongoDB Connected' : '⚠ MongoDB Disconnected'}
          </div>
          <div class="status">Port ${process.env.PORT || 8000}</div>
        </div>

        <div class="info-cards">
          <div class="info-card">
            <h3>6</h3>
            <p>API Endpoints</p>
          </div>
          <div class="info-card">
            <h3>v1.0.0</h3>
            <p>Current Version</p>
          </div>
          <div class="info-card">
            <h3>REST</h3>
            <p>API Architecture</p>
          </div>
        </div>

        <div class="section">
          <h2>🎯 Platform Features</h2>
          <div class="features">
            <div class="feature">
              <div class="feature-icon">👥</div>
              <h4>Multi-User</h4>
              <p>Customers, Vendors & Admins</p>
            </div>
            <div class="feature">
              <div class="feature-icon">🏪</div>
              <h4>Multi-Store</h4>
              <p>Multiple vendor stores</p>
            </div>
            <div class="feature">
              <div class="feature-icon">🔐</div>
              <h4>Secure Auth</h4>
              <p>JWT-based authentication</p>
            </div>
            <div class="feature">
              <div class="feature-icon">💳</div>
              <h4>Payments</h4>
              <p>Integrated payment gateways</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>📡 Available Endpoints</h2>
          <div class="endpoints">
            <div class="endpoint" onclick="window.location.href='/health'">
              <div class="endpoint-header">
                <span class="method get">GET</span>
                <code>/health</code>
              </div>
              <div class="endpoint-desc">Check API health status and database connection</div>
            </div>
            
            <div class="endpoint" onclick="window.location.href='/api'">
              <div class="endpoint-header">
                <span class="method get">GET</span>
                <code>/api</code>
              </div>
              <div class="endpoint-desc">Get API information and available endpoints</div>
            </div>
            
            <div class="endpoint">
              <div class="endpoint-header">
                <span class="method post">POST</span>
                <code>/api/auth/register</code>
              </div>
              <div class="endpoint-desc">Register a new user account (customer, vendor, or admin)</div>
            </div>
            
            <div class="endpoint">
              <div class="endpoint-header">
                <span class="method post">POST</span>
                <code>/api/auth/login</code>
              </div>
              <div class="endpoint-desc">Login with email and password to receive JWT token</div>
            </div>
            
            <div class="endpoint">
              <div class="endpoint-header">
                <span class="method post">POST</span>
                <code>/api/auth/forgot-password</code>
              </div>
              <div class="endpoint-desc">Request a password reset token via email</div>
            </div>
            
            <div class="endpoint">
              <div class="endpoint-header">
                <span class="method post">POST</span>
                <code>/api/auth/reset-password</code>
              </div>
              <div class="endpoint-desc">Reset password using the token from email</div>
            </div>
          </div>
        </div>

        <div class="quick-start">
          <h3>🚀 Quick Start - Test the API</h3>
          <p style="margin-bottom: 15px; color: #856404;">Try registering a new user with this curl command:</p>
          <div class="code-block">
curl -X POST http://localhost:${process.env.PORT || 8000}/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "Test1234",
    "phone": "1234567890"
  }'
          </div>
          <p style="margin-top: 15px; color: #856404; font-size: 0.9em;">
            💡 <strong>Tip:</strong> Password must be at least 8 characters with uppercase, lowercase, and a number
          </p>
        </div>

        <div class="footer">
          <p><strong>MultiMart API</strong> - Version 1.0.0</p>
          <p style="margin-top: 10px; font-size: 0.9em;">
            Built with Node.js, Express, MongoDB & JWT Authentication
          </p>
          <div class="footer-links">
            <a href="/health" class="footer-link">Health Check</a>
            <a href="/api" class="footer-link">API Info</a>
            <a href="https://github.com" class="footer-link" target="_blank">Documentation</a>
          </div>
          <p style="margin-top: 15px; font-size: 0.85em; color: #999;">
            © 2024 MultiMart. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MultiMart API is running',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Import routes
const authRoutes = require('./routes/authRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const storeRoutes = require('./routes/storeRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const couponRoutes = require('./routes/couponRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const mongoose = require('mongoose');

// API routes
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to MultiMart API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      vendors: '/api/vendors',
      stores: '/api/stores',
      products: '/api/products',
      categories: '/api/categories',
      cart: '/api/cart',
      orders: '/api/orders',
      payments: '/api/payments',
      admin: '/api/admin',
      health: '/health'
    }
  });
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/upload', uploadRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`📍 Visit http://localhost:${PORT} to see the API`);
});

module.exports = app;
