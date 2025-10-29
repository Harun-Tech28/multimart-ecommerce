# 🎯 Deploy to Render - Action Steps

## ⚡ Quick Start (Do This Now)

### 1️⃣ Sign Up for Render (2 min)
👉 **Go to: https://render.com**
- Click "Get Started"
- Sign in with GitHub
- Authorize Render

---

### 2️⃣ Deploy Backend First (5 min)

**In Render Dashboard:**
1. Click **"New +"** → **"Web Service"**
2. Connect repository: `multimart-ecommerce`
3. Configure:
   - **Name**: `multimart-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
   - **Plan**: Free

4. **Add Environment Variables** (click Advanced):

```
NODE_ENV = production
PORT = 10000
JWT_SECRET = a8f5f167f44f4964e6c998dee827110c8b9c7d6e5f4a3b2c1d0e9f8a7b6c5d4e
MONGODB_URI = [Your MongoDB Atlas connection string]
FRONTEND_URL = https://temporary.com
```

5. Click **"Create Web Service"**
6. ⏳ Wait 5 minutes
7. **📋 COPY YOUR BACKEND URL** (save it!)

---

### 3️⃣ Deploy Frontend (5 min)

**In Render Dashboard:**
1. Click **"New +"** → **"Static Site"**
2. Connect repository: `multimart-ecommerce`
3. Configure:
   - **Name**: `multimart-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Plan**: Free

4. **Add Environment Variable** (click Advanced):

```
REACT_APP_API_URL = https://YOUR-BACKEND-URL.onrender.com/api
```
(Use the backend URL from step 2)

5. Click **"Create Static Site"**
6. ⏳ Wait 5 minutes
7. **📋 COPY YOUR FRONTEND URL** (save it!)

---

### 4️⃣ Update Backend with Frontend URL (1 min)

1. Go to backend service in Render
2. Click **"Environment"**
3. Edit **FRONTEND_URL**
4. Replace with your actual frontend URL
5. Save (auto-redeploys)

---

## 🎉 Done! Your Site is Live!

**Test it:**
- Visit your frontend URL
- Register a user
- Browse products
- Login as admin: `admin@multimart.com` / `Admin@123`

---

## 📊 MongoDB Atlas (If You Need It)

**Quick Setup:**
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (free)
3. Create cluster (AWS, any region)
4. Create database user
5. Allow network access (0.0.0.0/0)
6. Get connection string
7. Add to Render backend environment

**Connection String Format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/multimart?retryWrites=true&w=majority
```

---

## ⚠️ Important Notes

- Free tier sleeps after 15 min inactivity
- First request after sleep takes 30-60 seconds
- Auto-deploys on GitHub push
- Check logs if issues occur

---

## 🆘 Troubleshooting

**Backend won't start?**
- Check Render logs
- Verify MongoDB connection string
- Check all environment variables

**Frontend errors?**
- Verify REACT_APP_API_URL is correct
- Must end with `/api`
- Check backend is running

**CORS errors?**
- Update FRONTEND_URL in backend
- No trailing slash
- Redeploy backend

---

## ✅ Deployment Checklist

- [ ] Render account created
- [ ] Backend deployed
- [ ] Backend URL copied
- [ ] Frontend deployed with backend URL
- [ ] Frontend URL copied
- [ ] Backend updated with frontend URL
- [ ] MongoDB Atlas connected
- [ ] Site tested and working

---

**Start here: https://render.com** 🚀

**Estimated time: 15-20 minutes**
