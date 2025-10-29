# 🆘 Render Backend Not Working - Troubleshooting Guide

## 🔍 Let's Fix Your Backend!

Follow these steps to diagnose and fix the issue.

---

## Step 1: Check Render Logs (MOST IMPORTANT)

### How to Check Logs:

1. Go to your Render dashboard: https://dashboard.render.com
2. Click on your **backend service** (multimart-backend)
3. Click **"Logs"** tab on the left
4. Look at the most recent logs

### What to Look For:

**✅ GOOD - Backend is Running:**
```
Server running on port 10000
MongoDB Connected
```

**❌ BAD - Common Errors:**

#### Error 1: MongoDB Connection Failed
```
MongooseError: Could not connect to MongoDB
```
**Solution**: Check your MONGODB_URI environment variable

#### Error 2: Missing Environment Variables
```
Error: JWT_SECRET is not defined
```
**Solution**: Add missing environment variables

#### Error 3: Build Failed
```
npm ERR! code ELIFECYCLE
```
**Solution**: Check package.json and dependencies

#### Error 4: Port Issues
```
Error: listen EADDRINUSE
```
**Solution**: Verify PORT environment variable is 10000

---

## Step 2: Verify Environment Variables

### Go to Render Dashboard:

1. Click on your backend service
2. Click **"Environment"** in left sidebar
3. Verify these 5 variables exist:

**Required Variables:**

| Key | Value | Status |
|-----|-------|--------|
| NODE_ENV | `production` | ✅ |
| PORT | `10000` | ✅ |
| JWT_SECRET | `a8f5f167f44f4964e6c998dee827110c8b9c7d6e5f4a3b2c1d0e9f8a7b6c5d4e` | ✅ |
| MONGODB_URI | `mongodb+srv://...` | ✅ |
| FRONTEND_URL | `https://your-frontend.onrender.com` | ✅ |

### If Any Are Missing:

1. Click **"Add Environment Variable"**
2. Add the missing variable
3. Click **"Save Changes"**
4. Backend will auto-redeploy

---

## Step 3: Check MongoDB Connection

### Test Your MongoDB URI:

Your MONGODB_URI should look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/multimart?retryWrites=true&w=majority
```

### Common MongoDB Issues:

**❌ Issue 1: Wrong Password**
- Make sure password doesn't have special characters
- Or URL-encode special characters

**❌ Issue 2: Network Access Not Set**
1. Go to MongoDB Atlas
2. Click "Network Access"
3. Make sure `0.0.0.0/0` is allowed
4. If not, click "Add IP Address" → "Allow Access from Anywhere"

**❌ Issue 3: Database User Not Created**
1. Go to MongoDB Atlas
2. Click "Database Access"
3. Make sure your user exists
4. Check username and password match your URI

**❌ Issue 4: Wrong Database Name**
- Make sure `/multimart` is in the URI before the `?`
- Example: `...mongodb.net/multimart?retryWrites=true`

---

## Step 4: Check Build Configuration

### Verify These Settings:

Go to your backend service → **"Settings"**

| Setting | Correct Value |
|---------|---------------|
| **Root Directory** | `backend` |
| **Build Command** | `npm install` |
| **Start Command** | `node src/server.js` |
| **Branch** | `main` |

### If Wrong:

1. Click **"Settings"**
2. Scroll to the wrong setting
3. Click **"Edit"**
4. Fix the value
5. Click **"Save Changes"**

---

## Step 5: Manual Redeploy

Sometimes Render needs a fresh start:

1. Go to your backend service
2. Click **"Manual Deploy"** (top right)
3. Select **"Clear build cache & deploy"**
4. Wait 5-10 minutes
5. Check logs again

---

## Step 6: Check Service Status

### In Render Dashboard:

Look at your backend service card:

**✅ Green Dot** = Running (Good!)
**🟡 Yellow Dot** = Deploying (Wait...)
**🔴 Red Dot** = Failed (Check logs!)

---

## 🔧 Quick Fixes for Common Issues

### Issue: "Application failed to respond"

**Cause**: Backend isn't starting properly

**Fix**:
1. Check logs for errors
2. Verify all environment variables
3. Make sure MongoDB is connected
4. Check PORT is 10000

### Issue: "Build failed"

**Cause**: npm install failed

**Fix**:
1. Check package.json exists in backend folder
2. Verify Root Directory is `backend`
3. Try manual deploy with cache clear

### Issue: "MongoDB connection timeout"

**Cause**: Can't reach MongoDB Atlas

**Fix**:
1. Check MongoDB Atlas is running
2. Verify network access allows 0.0.0.0/0
3. Test connection string locally first
4. Make sure password is correct

### Issue: "CORS errors"

**Cause**: FRONTEND_URL not set correctly

**Fix**:
1. Go to Environment variables
2. Set FRONTEND_URL to your exact frontend URL
3. No trailing slash
4. Save and redeploy

---

## 📋 Checklist - Go Through This:

- [ ] Checked Render logs for errors
- [ ] Verified all 5 environment variables exist
- [ ] Confirmed MONGODB_URI is correct
- [ ] Checked MongoDB Atlas network access (0.0.0.0/0)
- [ ] Verified Root Directory is `backend`
- [ ] Confirmed Build Command is `npm install`
- [ ] Confirmed Start Command is `node src/server.js`
- [ ] Tried manual redeploy with cache clear
- [ ] Waited 5-10 minutes for deployment
- [ ] Checked service status (green dot)

---

## 🆘 Still Not Working?

### Share These Details:

1. **What do the logs say?** (copy last 20 lines)
2. **Service status?** (green/yellow/red dot)
3. **Environment variables?** (all 5 present?)
4. **MongoDB Atlas?** (cluster running? network access set?)
5. **Error message?** (exact error from logs)

### Test Locally First:

Before deploying, test with MongoDB Atlas locally:

1. Update your local `backend/.env`:
```
MONGODB_URI=mongodb+srv://your-atlas-connection-string
```

2. Run locally:
```
cd backend
npm start
```

3. If it works locally, it should work on Render

---

## 💡 Pro Tips

1. **Always check logs first** - They tell you exactly what's wrong
2. **Environment variables** - Most common issue
3. **MongoDB Atlas** - Second most common issue
4. **Wait patiently** - Deployments take 5-10 minutes
5. **Clear cache** - When in doubt, redeploy with cache clear

---

## 📞 Need More Help?

**Render Support**:
- Docs: https://render.com/docs
- Community: https://community.render.com

**MongoDB Atlas Support**:
- Docs: https://docs.atlas.mongodb.com

---

## ✅ When It's Working:

You'll see in logs:
```
> multimart-backend@1.0.0 start
> node src/server.js

Server running on port 10000
MongoDB Connected
```

And your backend URL will respond:
```
https://your-backend.onrender.com
```

---

**Let's get your backend working!** 🚀

Start with Step 1 - check those logs!
