# ⚡ Quick Deploy Guide

The fastest way to deploy your MultiMart project.

---

## 🎯 Quick Start (Copy & Paste)

### 1️⃣ Push to GitHub (2 minutes)

First, create a new repository at: https://github.com/new
- Name: `multimart-ecommerce`
- Don't initialize with README

Then run these commands:

```bash
cd C:\Users\user\Desktop\MultiMart

git init
git add .
git commit -m "Initial commit: MultiMart e-commerce platform"
git remote add origin https://github.com/Harun-Tech28/multimart-ecommerce.git
git branch -M main
git push -u origin main
```

---

### 2️⃣ Set Up MongoDB Atlas (5 minutes)

1. Go to: https://cloud.mongodb.com
2. Create free cluster (M0)
3. Create database user
4. Whitelist IP: `0.0.0.0/0`
5. Get connection string
6. **Save it!** You'll need it for Vercel

---

### 3️⃣ Deploy Backend (3 minutes)

```bash
# Install Vercel CLI (one time only)
npm install -g vercel

# Deploy backend
cd backend
vercel login
vercel --prod
```

**Save the URL you get!** (e.g., `https://multimart-backend-abc123.vercel.app`)

Then add environment variables in Vercel dashboard:
- Go to: https://vercel.com/dashboard
- Click your backend project
- Settings → Environment Variables
- Add all variables from `backend/.env.example`

Redeploy:
```bash
vercel --prod
```

---

### 4️⃣ Deploy Frontend (3 minutes)

Update `frontend/.env.production` with your backend URL:
```env
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

Then deploy:
```bash
cd ../frontend
vercel --prod
```

Add environment variable in Vercel dashboard:
- `REACT_APP_API_URL` = your backend URL

Redeploy:
```bash
vercel --prod
```

---

### 5️⃣ Final Step (1 minute)

Update backend `CLIENT_URL` in Vercel:
- Go to backend project settings
- Update `CLIENT_URL` to your frontend URL
- Redeploy backend: `vercel --prod`

---

## ✅ Done!

Your MultiMart is now live! 🎉

**Test it:**
- Visit your frontend URL
- Login: `admin@multimart.com` / `Admin123`
- Check admin dashboard

---

## 🆘 Need Help?

See detailed guide: `DEPLOY_TO_GITHUB_VERCEL.md`

---

**Total Time: ~15 minutes**
