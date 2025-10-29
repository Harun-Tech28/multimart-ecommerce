# 🎯 Deploy to Render - Step by Step

## ⚡ Quick Deploy Guide

Your code is ready on GitHub. Follow these exact steps:

---

## Step 1: Sign Up for Render (2 minutes)

1. Open: **https://render.com**
2. Click **"Get Started"**
3. Click **"Sign in with GitHub"**
4. Authorize Render to access your repositories
5. You're in!

---

## Step 2: Deploy Backend (5 minutes)

### 2.1 Create Backend Service

1. In Render dashboard, click **"New +"** (top right)
2. Select **"Web Service"**
3. Click **"Connect account"** if needed
4. Find **"multimart-ecommerce"** in the list
5. Click **"Connect"**

### 2.2 Configure Backend

Fill in these settings:

**Name**: `multimart-backend`

**Region**: `Oregon` (or closest to you)

**Branch**: `main`

**Root Directory**: `backend`

**Runtime**: `Node`

**Build Command**: 
```
npm install
```

**Start Command**:
```
node src/server.js
```

**Instance Type**: `Free`

### 2.3 Add Environment Variables

Click **"Advanced"** button, then click **"Add Environment Variable"** for each:

**Variable 1:**
- Key: `NODE_ENV`
- Value: `production`

**Variable 2:**
- Key: `PORT`
- Value: `10000`

**Variable 3:**
- Key: `JWT_SECRET`
- Value: `a8f5f167f44f4964e6c998dee827110c8b9c7d6e5f4a3b2c1d0e9f8a7b6c5d4e`

**Variable 4:**
- Key: `MONGODB_URI`
- Value: `mongodb+srv://haruntech:haruntech123@cluster0.yfqxb.mongodb.net/multimart?retryWrites=true&w=majority`

**Variable 5:**
- Key: `FRONTEND_URL`
- Value: `https://temporary.com` (we'll update this later)

### 2.4 Deploy

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. **IMPORTANT**: Copy your backend URL when it appears
   - It will look like: `https://multimart-backend-xxxx.onrender.com`
   - **SAVE THIS URL!**

---

## Step 3: Deploy Frontend (5 minutes)

### 3.1 Create Frontend Service

1. Click **"New +"** again
2. Select **"Static Site"**
3. Find **"multimart-ecommerce"** again
4. Click **"Connect"**

### 3.2 Configure Frontend

Fill in these settings:

**Name**: `multimart-frontend`

**Region**: `Oregon` (or closest to you)

**Branch**: `main`

**Root Directory**: `frontend`

**Build Command**:
```
npm install && npm run build
```

**Publish Directory**:
```
build
```

**Instance Type**: `Free`

### 3.3 Add Environment Variable

Click **"Advanced"**, then **"Add Environment Variable"**:

**Key**: `REACT_APP_API_URL`

**Value**: `[YOUR BACKEND URL FROM STEP 2]/api`

**Example**:
```
https://multimart-backend-xxxx.onrender.com/api
```

⚠️ **IMPORTANT**: Replace with YOUR actual backend URL and add `/api` at the end!

### 3.4 Deploy

1. Click **"Create Static Site"**
2. Wait 5-10 minutes for build
3. **IMPORTANT**: Copy your frontend URL when it appears
   - It will look like: `https://multimart-frontend-xxxx.onrender.com`
   - **SAVE THIS URL!**

---

## Step 4: Update Backend with Frontend URL (2 minutes)

1. Go back to your **backend service** in Render
2. Click **"Environment"** in the left sidebar
3. Find the **FRONTEND_URL** variable
4. Click the **pencil icon** to edit
5. Replace `https://temporary.com` with your actual frontend URL
6. Click **"Save Changes"**
7. Backend will automatically redeploy (2-3 minutes)

---

## 🎉 Done! Your Site is Live!

### Your Live URLs:

**Frontend (Main Site)**: `https://multimart-frontend-xxxx.onrender.com`

**Backend (API)**: `https://multimart-backend-xxxx.onrender.com`

---

## 🧪 Test Your Live Site

1. Open your frontend URL in a browser
2. You should see your MultiMart homepage
3. Try these:
   - Browse products
   - Register a new user
   - Login as admin: `admin@multimart.com` / `Admin@123`
   - Check admin dashboard

---

## ⚠️ Important Notes

### Free Tier Behavior:
- Services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- This is normal for free tier

### Auto-Deploy:
- When you push to GitHub, Render auto-deploys
- No manual redeployment needed

### Checking Logs:
- Click on your service
- Click "Logs" tab
- See real-time logs

---

## 🆘 Troubleshooting

### Backend shows error?
1. Click on backend service
2. Click "Logs" tab
3. Check for errors
4. Verify all environment variables are correct

### Frontend shows blank page?
1. Check browser console (F12)
2. Verify REACT_APP_API_URL is correct
3. Make sure it ends with `/api`
4. Check backend is running

### CORS errors?
1. Verify FRONTEND_URL in backend matches exactly
2. No trailing slash
3. Redeploy backend

### Database connection error?
- Your MongoDB connection string is already configured
- If issues, check MongoDB Atlas network access

---

## 📊 What You Get (Free Tier)

✅ 750 hours/month per service (enough for 24/7)
✅ Auto-deploy on git push
✅ Free SSL certificates (HTTPS)
✅ Custom domains supported
✅ Environment variables
✅ Logs and monitoring

---

## 🎯 Quick Checklist

- [ ] Signed up for Render
- [ ] Backend deployed
- [ ] Backend URL copied
- [ ] Frontend deployed with backend URL
- [ ] Frontend URL copied
- [ ] Backend updated with frontend URL
- [ ] Tested live site

---

## 🚀 Ready to Deploy?

**Start here**: https://render.com

**Time needed**: ~20 minutes

**Cost**: $0 (Free tier)

---

**Your GitHub repo**: https://github.com/Harun-Tech28/multimart-ecommerce.git

**Good luck! Your site will be live soon!** 🎉
