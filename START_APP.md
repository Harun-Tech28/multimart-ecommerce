# 🚀 Start Your MultiMart Application

## Quick Start Guide

### Step 1: Start MongoDB

Choose one of these methods:

**Method A: Windows Service**
```bash
net start MongoDB
```

**Method B: Direct Start**
```bash
mongod
```

**Method C: Check if already running**
```bash
mongo
# or
mongosh
```

### Step 2: Start Backend Server

Open a terminal and run:
```bash
cd backend
npm start
```

**Expected output:**
```
✅ MongoDB Connected: localhost
🚀 Server running on port 8000
```

### Step 3: Start Frontend

Open another terminal and run:
```bash
cd frontend
npm start
```

**Expected output:**
```
Compiled successfully!
Local: http://localhost:3000
```

### Step 4: Open Your Browser

Go to: **http://localhost:3000**

## ✅ Your Application is Ready!

You can now:
- ✅ Register a new account
- ✅ Login
- ✅ Browse products
- ✅ Search and filter
- ✅ Add to cart
- ✅ View product details
- ✅ And much more!

## 🔧 If Registration Still Fails

1. **Check backend terminal** - Look for MongoDB connection message
2. **Check MongoDB is running** - Run `mongo` or `mongosh` command
3. **Restart backend** - Stop (Ctrl+C) and start again with `npm start`

## 📝 Test User Credentials

After registration, you can login with:
- Email: harunadramani5@gmail.com
- Password: (your password)

Enjoy your MultiMart e-commerce platform! 🎉
