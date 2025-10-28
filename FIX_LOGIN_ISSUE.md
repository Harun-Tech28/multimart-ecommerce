# 🔧 Fix Login Issue - Network Error

## Problem

You're seeing "Network error. Please try again." when trying to log in with `harunadramani951@gmail.com`.

## Root Cause

The frontend is trying to connect to the backend, but there might be:
1. CORS issues
2. Backend not responding
3. Wrong password
4. Browser blocking the request

## Quick Fixes

### Fix 1: Check if Backend is Running

```bash
# Check backend status
curl http://localhost:8000/health
```

**Expected**: Should return `{"success":true,"message":"MultiMart API is running"...}`

### Fix 2: Reset Your Password

Since you can't log in, let's reset your password:

```bash
# Run this command
node backend/reset-password-interactive.js
```

When prompted:
- Email: `harunadramani951@gmail.com`
- New Password: `Harun123` (or your preferred password)

### Fix 3: Clear Browser Cache

1. Open browser DevTools (F12)
2. Go to Application tab
3. Clear Storage → Clear site data
4. Refresh page (Ctrl+R)

### Fix 4: Check Browser Console

1. Open DevTools (F12)
2. Go to Console tab
3. Try logging in again
4. Look for error messages

Common errors:
- **CORS error**: Backend CORS not configured
- **Failed to fetch**: Backend not running
- **401 Unauthorized**: Wrong password
- **Network error**: Connection issue

### Fix 5: Test Login with Curl

```bash
# Test login endpoint
curl -X POST http://localhost:8000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"harunadramani951@gmail.com\",\"password\":\"YOUR_PASSWORD\"}"
```

Replace `YOUR_PASSWORD` with your actual password.

## Step-by-Step Solution

### Step 1: Reset Password

```bash
cd C:\Users\user\Desktop\MultiMart
node backend/reset-password-interactive.js
```

Enter:
- Email: `harunadramani951@gmail.com`
- New Password: `Harun@123`

### Step 2: Clear Browser Data

1. Press F12 (DevTools)
2. Application → Storage → Clear site data
3. Close DevTools
4. Refresh page (Ctrl+Shift+R)

### Step 3: Try Login Again

1. Go to http://localhost:3000/login
2. Email: `harunadramani951@gmail.com`
3. Password: `Harun@123` (the one you just set)
4. Click Sign in

### Step 4: Check Network Tab

If still failing:
1. Open DevTools (F12)
2. Go to Network tab
3. Try logging in
4. Look for the `/api/auth/login` request
5. Check the response

## Alternative: Use Admin Account

Try logging in with the default admin account:

- Email: `admin@multimart.com`
- Password: `Admin123`

If this works, then your account password needs to be reset.

## Quick Password Reset Script

I'll create a quick script for you:

```bash
# Reset your password
node backend/reset-password-interactive.js
```

## Check Backend Logs

Look at your backend terminal for any errors when you try to log in.

Common issues:
- MongoDB connection lost
- JWT secret not set
- CORS blocking request

## Test Backend Health

```bash
# Test if backend is responding
curl http://localhost:8000/health

# Test auth endpoint
curl http://localhost:8000/api/auth/login -X POST -H "Content-Type: application/json" -d "{\"email\":\"admin@multimart.com\",\"password\":\"Admin123\"}"
```

## Browser Console Errors

Open Console (F12) and look for:

**CORS Error**:
```
Access to fetch at 'http://localhost:8000/api/auth/login' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution**: Backend CORS is already configured, restart backend.

**Network Error**:
```
Failed to fetch
```

**Solution**: Backend not running or wrong URL.

## Verify Servers Running

### Backend
```bash
# Should see:
🚀 Server running in development mode on port 8000
✅ MongoDB Connected: localhost
```

### Frontend
```bash
# Should see:
webpack compiled successfully
```

## Quick Test

Run this in PowerShell:

```powershell
# Test backend
Invoke-WebRequest -Uri "http://localhost:8000/health" -Method GET

# Test login
$body = @{
    email = "admin@multimart.com"
    password = "Admin123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

## Most Likely Solution

**Reset your password and try again:**

```bash
node backend/reset-password-interactive.js
```

Then:
1. Email: `harunadramani951@gmail.com`
2. New Password: `Harun@2024`
3. Try logging in with new password

## Still Not Working?

Check these:

1. **Backend running?**
   - Look for backend terminal
   - Should show "Server running on port 8000"

2. **Frontend running?**
   - Look for frontend terminal
   - Should show "webpack compiled"

3. **MongoDB running?**
   - Backend should show "MongoDB Connected"

4. **Browser blocking?**
   - Try different browser
   - Try incognito mode
   - Disable browser extensions

## Contact Info

If none of these work, check:
- Backend terminal for errors
- Browser console for errors
- Network tab for failed requests

---

**Quick Fix**: Reset password and clear browser cache!
