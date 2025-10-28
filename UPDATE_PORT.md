# 🔄 Port Updated to 5000

## ✅ What Changed

Your backend now runs on **port 5000** instead of 8000 (to avoid conflicts).

## 🚀 How to Start

### Step 1: Start Backend
```bash
cd backend
npm start
```

**Expected output:**
```
✅ MongoDB Connected: cluster0...
🚀 Server running on port 5000
```

### Step 2: Start Frontend
```bash
cd frontend
npm start
```

**Expected output:**
```
Compiled successfully!
Local: http://localhost:3000
```

## ⚠️ Important: Frontend Still Uses Port 8000

The frontend code still references `localhost:8000`. You have 2 options:

### Option A: Update Frontend to Use Port 5000 (Recommended)

I've created `frontend/src/config/api.js` for centralized API configuration.

**Quick Fix:** Find and replace in these files:
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/Register.jsx`
- `frontend/src/pages/Products.jsx`
- `frontend/src/pages/ProductDetails.jsx`
- `frontend/src/components/products/SearchBar.jsx`

Replace: `http://localhost:8000` 
With: `http://localhost:5000`

### Option B: Change Backend Back to Port 8000

If you prefer, kill the process using port 8000:

```bash
# Find process on port 8000
netstat -ano | findstr :8000

# Kill it (replace 1234 with actual PID)
taskkill /PID 1234 /F
```

Then change `backend/.env`:
```env
PORT=8000
```

## 🧪 Test Your Setup

1. Backend should show: `Server running on port 5000`
2. Frontend should open at: `http://localhost:3000`
3. Try registration - it should work if MongoDB Atlas is connected

## 🔧 Still Having Issues?

Run the connection test:
```bash
cd backend
node test-connection.js
```

This will tell you if MongoDB Atlas is connected properly.
