# Fix Blank Pages Issue

## Problem
Pages are showing blank because the backend server cannot start - port 8000 is already in use.

## Quick Fix Steps

### Option 1: Kill the Process Using Port 8000 (Recommended)

**On Windows (PowerShell):**
```powershell
# Find the process using port 8000
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess

# Kill it (replace XXXX with the process ID from above)
Stop-Process -Id XXXX -Force

# Or kill all node processes
Get-Process node | Stop-Process -Force
```

**On Windows (CMD):**
```cmd
# Find the process
netstat -ano | findstr :8000

# Kill it (replace XXXX with the PID from the last column)
taskkill /PID XXXX /F

# Or kill all node processes
taskkill /IM node.exe /F
```

### Option 2: Change the Backend Port

1. Open `backend/.env`
2. Change the port:
```env
PORT=8001
```

3. Update frontend API calls to use port 8001:
   - Open `frontend/src/config/api.js` (if exists)
   - Or search and replace `http://localhost:8000` with `http://localhost:8001` in all frontend files

### Option 3: Restart Your Computer
Sometimes the simplest solution - restart your computer to clear all ports.

## After Fixing the Port Issue

### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✓ MongoDB connected successfully
✓ Server running on port 8000
```

### 2. Start the Frontend Server

Open a new terminal:
```bash
cd frontend
npm start
```

You should see:
```
Compiled successfully!
Local: http://localhost:3000
```

### 3. Verify Everything Works

Open your browser and go to:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/health (should return JSON)

## Common Issues After Starting

### Issue 1: "Cannot GET /api/..."
**Solution:** Backend routes might not be set up. Check `backend/src/server.js` for route imports.

### Issue 2: CORS Errors
**Solution:** Make sure backend `.env` has:
```env
CLIENT_URL=http://localhost:3000
```

### Issue 3: MongoDB Connection Failed
**Solution:** 
- Check if MongoDB is running locally, OR
- Set up MongoDB Atlas and update connection string in `.env`

See `MONGODB_ATLAS_SETUP.md` or `START_LOCAL_MONGODB.md` for details.

### Issue 4: Pages Still Blank
**Possible causes:**
1. **No data in database** - Pages show empty states when there's no data
2. **API endpoints not implemented** - Check browser console for 404 errors
3. **Authentication required** - Some pages need login first

## Testing Each Page

### Home Page (/)
- Should show hero section and featured products
- If blank: Check if products exist in database

### Products Page (/products)
- Should show product grid
- If blank: No products in database or API not working

### Cart Page (/cart)
- Shows empty state if cart is empty (this is normal)
- Add products to cart first

### Orders Page (/orders)
- Shows empty state if no orders (this is normal)
- Place an order first

### Wishlist Page (/wishlist)
- Shows empty state if wishlist is empty (this is normal)
- Add products to wishlist first

### Vendor Dashboard (/vendor/dashboard)
- Requires login as vendor
- Shows stats and recent activity

### Admin Dashboard (/admin/dashboard)
- Requires login as admin
- Shows platform statistics

## Quick Database Setup

If you have no data in your database, you can:

### Option 1: Create Sample Data via API

Use Postman or curl to create:

**1. Register a user:**
```bash
POST http://localhost:8000/api/auth/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"
}
```

**2. Create categories (as admin):**
```bash
POST http://localhost:8000/api/admin/categories
{
  "name": "Electronics",
  "description": "Electronic devices"
}
```

**3. Create products (as vendor):**
```bash
POST http://localhost:8000/api/vendor/products
{
  "name": "Sample Product",
  "description": "This is a sample product",
  "price": 99.99,
  "stock": 10,
  "category": "CATEGORY_ID_HERE"
}
```

### Option 2: Import Sample Data

If you have a seed script:
```bash
cd backend
npm run seed
```

## Debugging Tips

### Check Backend Logs
Look at the terminal where backend is running for errors.

### Check Browser Console
Press F12 in browser and check Console tab for errors.

### Check Network Tab
Press F12 → Network tab to see if API calls are failing.

### Common Error Messages

**"Failed to fetch"**
- Backend is not running
- Wrong API URL
- CORS issue

**"401 Unauthorized"**
- Need to login first
- Token expired

**"404 Not Found"**
- API endpoint doesn't exist
- Wrong URL

**"500 Internal Server Error"**
- Backend error
- Check backend logs

## Still Having Issues?

1. **Clear browser cache** - Ctrl+Shift+Delete
2. **Clear localStorage** - F12 → Application → Local Storage → Clear
3. **Restart both servers**
4. **Check if MongoDB is running**
5. **Verify .env file has correct values**

## Environment Variables Checklist

### Backend `.env` should have:
```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

### Frontend (if using .env):
```env
REACT_APP_API_URL=http://localhost:8000
```

## Success Indicators

When everything is working:
- ✅ Backend shows "Server running on port 8000"
- ✅ Backend shows "MongoDB connected successfully"
- ✅ Frontend shows "Compiled successfully!"
- ✅ Browser shows no console errors
- ✅ Pages load with content or proper empty states

## Next Steps

Once servers are running:
1. Register a new user
2. Login with that user
3. Browse products (if any exist)
4. Test cart functionality
5. Test wishlist functionality
6. Test checkout process

If you're a vendor:
1. Login as vendor
2. Go to /vendor/dashboard
3. Add products
4. Manage orders

If you're an admin:
1. Login as admin
2. Go to /admin/dashboard
3. Manage users, vendors, categories

---

**Remember:** Blank pages are usually due to:
1. Backend not running (most common)
2. No data in database (shows empty states)
3. Authentication required (need to login)
4. API endpoints not implemented yet

Start by making sure the backend is running on port 8000!
