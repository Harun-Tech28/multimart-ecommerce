# 🚀 Deploy MultiMart to Render - Complete Guide

## ✅ What You Need
- GitHub account (you have this)
- Render account (free - we'll create)
- MongoDB Atlas (we'll set up if needed)
- 20 minutes

---

## 📋 Step-by-Step Deployment

### STEP 1: Sign Up for Render (2 minutes)

1. Go to: **https://render.com**
2. Click **"Get Started"**
3. Click **"Sign in with GitHub"**
4. Authorize Render to access your GitHub
5. You're in! 🎉

---

### STEP 2: Deploy Backend (5 minutes)

1. **Click "New +"** (top right)
2. **Select "Web Service"**
3. **Connect Repository**:
   - Find `multimart-ecommerce`
   - Click **"Connect"**

4. **Configure Backend**:
   - **Name**: `multimart-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
   - **Instance Type**: `Free`

5. **Add Environment Variables** (click "Advanced"):

Click "Add Environment Variable" for each:

```
NODE_ENV
production

PORT
10000

JWT_SECRET
a8f5f167f44f4964e6c998dee827110c8b9c7d6e5f4a3b2c1d0e9f8a7b6c5d4e

MONGODB_URI
[Your MongoDB Atlas connection string - add after setup]

FRONTEND_URL
[Add after frontend deployment]
```

6. **Click "Create Web Service"**

7. **Wait 3-5 minutes** for deployment

8. **Copy your backend URL** (e.g., `https://multimart-backend.onrender.com`)

---

### STEP 3: Deploy Frontend (5 minutes)

1. **Click "New +"** again
2. **Select "Static Site"**
3. **Connect Repository**:
   - Find `multimart-ecommerce` again
   - Click **"Connect"**

4. **Configure Frontend**:
   - **Name**: `multimart-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

5. **Add Environment Variable**:

Click "Advanced" → "Add Environment Variable":

```
REACT_APP_API_URL
https://your-backend-url.onrender.com/api
```
(Use the backend URL from Step 2)

6. **Click "Create Static Site"**

7. **Wait 3-5 minutes** for build

8. **Copy your frontend URL** (e.g., `https://multimart-frontend.onrender.com`)

---

### STEP 4: Update Backend with Frontend URL (2 minutes)

1. Go back to your **backend service** in Render
2. Click **"Environment"** in left sidebar
3. Find **FRONTEND_URL**
4. Click **"Edit"**
5. Enter your frontend URL (from Step 3)
6. Click **"Save Changes"**
7. Service will auto-redeploy

---

### STEP 5: Set Up MongoDB Atlas (5 minutes)

**If you don't have MongoDB Atlas yet:**

1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up with Google/GitHub
3. **Create FREE Cluster**:
   - Choose AWS
   - Select region close to you
   - Name: `MultiMart`
   - Click "Create"

4. **Create Database User**:
   - Go to: Database Access
   - Click "Add New Database User"
   - Username: `multimartuser`
   - Password: Generate & SAVE IT!
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

5. **Network Access**:
   - Go to: Network Access
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

6. **Get Connection String**:
   - Go to: Database → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Add `/multimart` before the `?`

**Example**:
```
mongodb+srv://multimartuser:YourPassword123@cluster0.xxxxx.mongodb.net/multimart?retryWrites=true&w=majority
```

7. **Add to Render Backend**:
   - Go to backend service in Render
   - Click "Environment"
   - Find MONGODB_URI
   - Click "Edit"
   - Paste your connection string
   - Click "Save Changes"

---

## 🎉 You're Done!

### Your Live URLs:
- **Frontend**: `https://multimart-frontend.onrender.com`
- **Backend**: `https://multimart-backend.onrender.com`

### Test Your Site:
1. Visit your frontend URL
2. Register a new user
3. Browse products
4. Login as admin:
   - Email: `admin@multimart.com`
   - Password: `Admin@123`

---

## 📊 What You Get with Render Free Tier

✅ 750 hours/month (enough for 24/7)
✅ Auto-deploy on git push
✅ Free SSL certificate
✅ Custom domains
✅ Environment variables
✅ Logs and monitoring

**Note**: Free tier services sleep after 15 minutes of inactivity. First request after sleep takes 30-60 seconds to wake up.

---

## 🔧 Managing Your Deployment

### View Logs:
- Go to your service
- Click "Logs" tab
- See real-time logs

### Redeploy:
- Click "Manual Deploy"
- Select "Clear build cache & deploy"

### Update Environment Variables:
- Click "Environment"
- Edit any variable
- Service auto-redeploys

### Connect Custom Domain:
- Click "Settings"
- Scroll to "Custom Domain"
- Add your domain

---

## 🆘 Troubleshooting

### Backend shows error?
- Check logs in Render dashboard
- Verify MongoDB connection string
- Make sure all environment variables are set

### Frontend can't connect to backend?
- Check REACT_APP_API_URL is correct
- Make sure it ends with `/api`
- Verify backend is running

### Service sleeping?
- This is normal on free tier
- First request wakes it up (30-60 seconds)
- Consider upgrading to paid tier ($7/month) for always-on

---

## 💡 Pro Tips

1. **Auto-Deploy**: Render auto-deploys when you push to GitHub
2. **Logs**: Always check logs if something doesn't work
3. **Environment**: Double-check all environment variables
4. **MongoDB**: Make sure network access allows 0.0.0.0/0

---

## 🎯 Quick Checklist

- [ ] Render account created
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] MongoDB Atlas set up
- [ ] MONGODB_URI added to backend
- [ ] FRONTEND_URL added to backend
- [ ] REACT_APP_API_URL added to frontend
- [ ] Test the live site

---

## 📞 Need Help?

- **Render Docs**: https://render.com/docs
- **Render Community**: https://community.render.com
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

---

**Ready to start? Go to https://render.com and let's deploy!** 🚀
