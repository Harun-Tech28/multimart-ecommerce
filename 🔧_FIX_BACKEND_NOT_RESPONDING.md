# 🔧 Fix Backend Not Responding Issue

## 🔍 Problem Identified

Your backend is sometimes not responding due to several issues:

1. **MongoDB Connection**: Using local MongoDB which may not be running
2. **404 Errors**: Many requests to `/api/wishlist` returning 404
3. **Performance**: Too many failed requests slowing down the server
4. **Port Issues**: Backend running on port 8000 but frontend expects port 5000

---

## ⚡ Quick Fixes

### Fix 1: Restart Backend with Correct Port

Your backend is on port 8000, but it should be on port 5000 for the frontend.

**Update backend/.env:**
```
PORT=5000
```

Then restart the backend.

### Fix 2: Check MongoDB is Running

**For Windows:**
```powershell
# Check if MongoDB is running
Get-Service -Name MongoDB

# If not running, start it
Start-Service -Name MongoDB

# Or start MongoDB manually
mongod
```

**If MongoDB is not installed:**
- You need to install MongoDB locally
- OR use MongoDB Atlas (cloud database)

### Fix 3: Add Missing Wishlist Routes

The 404 errors for `/api/wishlist` mean the route is missing.

---

## 🚀 Complete Solution

### Step 1: Stop Current Servers

Let me stop and restart them with fixes.

### Step 2: Fix Port Configuration

**Update `backend/.env`:**
```properties
PORT=5000
```

### Step 3: Fix Frontend API URL

**Check `frontend/src/config/api.js`:**
Should be:
```javascript
const API_URL = 'http://localhost:5000/api';
```

### Step 4: Add Wishlist Routes

Create `backend/src/routes/wishlistRoutes.js`:
```javascript
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Get user's wishlist
router.get('/', auth, async (req, res) => {
  try {
    res.json({
      success: true,
      data: { items: [] }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
});

module.exports = router;
```

Add to `backend/src/server.js`:
```javascript
const wishlistRoutes = require('./routes/wishlistRoutes');
app.use('/api/wishlist', wishlistRoutes);
```

---

## 🔍 Diagnostic Commands

### Check if Backend is Running:
```powershell
# Check process
Get-Process -Name node

# Check port 5000
netstat -ano | findstr :5000
```

### Check MongoDB:
```powershell
# Try connecting
mongo

# Or check service
Get-Service -Name MongoDB
```

### Test Backend:
```powershell
# Test health endpoint
curl http://localhost:5000/health

# Test API
curl http://localhost:5000/api
```

---

## 🆘 Common Issues & Solutions

### Issue 1: "EADDRINUSE" - Port Already in Use

**Solution:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

### Issue 2: MongoDB Not Connected

**Symptoms:**
- Backend starts but database operations fail
- "MongoDB connection failed" in logs

**Solution A - Use Local MongoDB:**
1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Restart backend

**Solution B - Use MongoDB Atlas (Recommended):**
1. Sign up: https://www.mongodb.com/cloud/atlas/register
2. Create free cluster
3. Get connection string
4. Update `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/multimart
```

### Issue 3: Backend Crashes Randomly

**Causes:**
- Unhandled promise rejections
- Memory leaks
- Database connection timeouts

**Solution:**
Add error handlers in `backend/src/server.js`:
```javascript
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
```

### Issue 4: Slow Response Times

**Causes:**
- Too many database queries
- No connection pooling
- Large response payloads

**Solution:**
- Add database indexes
- Implement caching
- Paginate large results
- Use connection pooling

---

## 📊 Performance Optimization

### 1. Add Request Timeout

In `backend/src/server.js`:
```javascript
// Set timeout for all requests
app.use((req, res, next) => {
  req.setTimeout(30000); // 30 seconds
  next();
});
```

### 2. Add Response Compression

```javascript
const compression = require('compression');
app.use(compression());
```

### 3. Limit Request Size

```javascript
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
```

### 4. Add Health Check Endpoint

Already exists at `/health` - use it to monitor:
```javascript
// Check backend health
setInterval(async () => {
  try {
    const response = await fetch('http://localhost:5000/health');
    const data = await response.json();
    console.log('Backend health:', data);
  } catch (error) {
    console.error('Backend down!', error);
  }
}, 60000); // Check every minute
```

---

## 🔄 Restart Procedure

### Clean Restart:

1. **Stop all Node processes:**
```powershell
# Stop all node processes
Get-Process -Name node | Stop-Process -Force
```

2. **Clear npm cache (if needed):**
```powershell
cd backend
npm cache clean --force
```

3. **Reinstall dependencies (if needed):**
```powershell
cd backend
rm -rf node_modules
npm install
```

4. **Start backend:**
```powershell
cd backend
npm start
```

5. **Start frontend:**
```powershell
cd frontend
npm start
```

---

## 📝 Monitoring & Logging

### Add Better Logging:

In `backend/src/server.js`:
```javascript
// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Log errors
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: { message: 'Internal server error' }
  });
});
```

### Monitor Memory Usage:

```javascript
// Log memory usage every 5 minutes
setInterval(() => {
  const used = process.memoryUsage();
  console.log('Memory usage:', {
    rss: `${Math.round(used.rss / 1024 / 1024)}MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)}MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)}MB`
  });
}, 300000);
```

---

## ✅ Checklist

- [ ] Backend running on correct port (5000)
- [ ] MongoDB connected (local or Atlas)
- [ ] No 404 errors in logs
- [ ] Frontend can reach backend
- [ ] Health endpoint responds
- [ ] No memory leaks
- [ ] Error handlers in place
- [ ] Logging configured
- [ ] Timeouts set
- [ ] CORS configured correctly

---

## 🎯 Recommended Setup

### For Development:
- Use **MongoDB Atlas** (free, always available)
- Backend on port **5000**
- Frontend on port **3000**
- Enable detailed logging
- Use nodemon for auto-restart

### For Production:
- Use **MongoDB Atlas**
- Set proper environment variables
- Enable compression
- Add rate limiting
- Use PM2 for process management
- Set up monitoring (e.g., New Relic, DataDog)

---

## 🚨 Emergency Fixes

### If Backend Won't Start:

1. **Check logs for errors**
2. **Verify MongoDB is accessible**
3. **Check port is not in use**
4. **Verify all dependencies installed**
5. **Check .env file exists and is correct**

### If Backend Keeps Crashing:

1. **Check MongoDB connection**
2. **Look for unhandled errors in logs**
3. **Verify enough memory available**
4. **Check for infinite loops**
5. **Review recent code changes**

### If Backend is Slow:

1. **Check database queries**
2. **Look for N+1 query problems**
3. **Add database indexes**
4. **Implement caching**
5. **Reduce payload sizes**

---

## 💡 Pro Tips

1. **Always use MongoDB Atlas** for reliability
2. **Keep backend on port 5000** (standard)
3. **Monitor logs regularly**
4. **Add health checks**
5. **Use PM2 in production**
6. **Implement graceful shutdown**
7. **Add request timeouts**
8. **Use connection pooling**
9. **Implement caching**
10. **Monitor memory usage**

---

## 📞 Need Help?

If backend still not responding:
1. Check the logs (I can help analyze them)
2. Verify MongoDB connection
3. Test with curl/Postman
4. Check firewall settings
5. Verify network connectivity

---

**Let me know what specific error you're seeing and I'll help fix it!**
