# Start MultiMart Servers

## Quick Start Guide

### Step 1: Kill Any Existing Node Processes

**Windows PowerShell:**
```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

**Windows CMD:**
```cmd
taskkill /IM node.exe /F
```

### Step 2: Start Backend Server

Open a terminal in the project root:

```bash
cd backend
npm run dev
```

**Expected output:**
```
[nodemon] starting `node src/server.js`
✓ MongoDB connected successfully
✓ Server running on port 8000
```

**If you see "EADDRINUSE" error:**
- Port 8000 is still in use
- Go back to Step 1 and kill node processes
- Or change PORT in backend/.env to 8001

### Step 3: Start Frontend Server

Open a NEW terminal (keep backend running):

```bash
cd frontend
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view multimart-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### Step 4: Open Browser

Navigate to: **http://localhost:3000**

## Troubleshooting

### Backend Won't Start

**Error: "EADDRINUSE: address already in use :::8000"**

Solution:
```powershell
# PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process -Force

# Or kill all node
Get-Process node | Stop-Process -Force
```

**Error: "MongoDB connection failed"**

Solution:
1. Check if MongoDB is running locally
2. Or use MongoDB Atlas (see MONGODB_ATLAS_SETUP.md)
3. Update MONGODB_URI in backend/.env

### Frontend Won't Start

**Error: "Port 3000 is already in use"**

Solution:
- Kill the process using port 3000
- Or press 'Y' when asked to use a different port

### Pages Are Blank

**Possible causes:**
1. Backend not running → Start backend first
2. No data in database → Add sample data
3. Wrong API URL → Check frontend is calling http://localhost:8000
4. CORS errors → Check backend .env has CLIENT_URL=http://localhost:3000

## Verify Everything is Working

### 1. Check Backend Health
Open: http://localhost:8000/api/health

Should return:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### 2. Check Frontend
Open: http://localhost:3000

Should show:
- Header with MultiMart logo
- Navigation menu
- Home page content

### 3. Check Browser Console
Press F12 → Console tab

Should NOT show:
- ❌ "Failed to fetch"
- ❌ "Network error"
- ❌ CORS errors

## Common Issues

### Issue: "Cannot read properties of undefined"
**Status:** ✅ FIXED
**Solution:** Already fixed with null checks in all pages

### Issue: Pages show empty states
**Status:** ⚠️ NORMAL
**Reason:** No data in database yet
**Solution:** Add products, create users, etc.

### Issue: Login/Register not working
**Check:**
1. Backend is running
2. MongoDB is connected
3. JWT_SECRET is set in backend/.env
4. Check browser console for errors

## Development Workflow

### Daily Startup:
1. Open project in VS Code
2. Open 2 terminals
3. Terminal 1: `cd backend && npm run dev`
4. Terminal 2: `cd frontend && npm start`
5. Open http://localhost:3000

### When Making Changes:
- **Backend changes:** Server auto-restarts (nodemon)
- **Frontend changes:** Page auto-reloads (React hot reload)

### Before Committing:
```bash
# Run tests
cd backend && npm test
cd frontend && npm test

# Check for errors
npm run lint
```

## Environment Setup Checklist

### Backend Requirements:
- ✅ Node.js installed (v14+)
- ✅ MongoDB running (local or Atlas)
- ✅ backend/.env file configured
- ✅ Dependencies installed (`npm install`)

### Frontend Requirements:
- ✅ Node.js installed (v14+)
- ✅ Dependencies installed (`npm install`)
- ✅ Backend running on port 8000

## Quick Commands Reference

### Backend:
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start development server
npm test             # Run tests
npm run seed         # Seed database (if available)
```

### Frontend:
```bash
cd frontend
npm install          # Install dependencies
npm start            # Start development server
npm test             # Run tests
npm run build        # Build for production
```

### Database:
```bash
# If using local MongoDB
mongod               # Start MongoDB

# If using MongoDB Atlas
# Just update MONGODB_URI in .env
```

## Success Checklist

When everything is working correctly:

- ✅ Backend terminal shows "Server running on port 8000"
- ✅ Backend terminal shows "MongoDB connected successfully"
- ✅ Frontend terminal shows "Compiled successfully!"
- ✅ Browser opens to http://localhost:3000
- ✅ Home page loads with header and footer
- ✅ No errors in browser console
- ✅ Can navigate between pages
- ✅ API calls work (check Network tab in DevTools)

## Need Help?

Check these files:
- `FIX_BLANK_PAGES.md` - Detailed troubleshooting
- `MONGODB_ATLAS_SETUP.md` - MongoDB setup
- `START_LOCAL_MONGODB.md` - Local MongoDB setup
- `RUNTIME_ERROR_FIX.md` - Fixed runtime errors
- `PROJECT_SUMMARY.md` - Project overview

---

**Remember:** Always start the backend BEFORE the frontend!
