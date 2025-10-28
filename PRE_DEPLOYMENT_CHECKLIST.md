# ✅ Pre-Deployment Checklist

Complete this checklist before deploying to ensure smooth deployment.

---

## 📋 Before You Start

### Accounts Ready
- [ ] GitHub account created
- [ ] Vercel account created (https://vercel.com)
- [ ] MongoDB Atlas account created (https://cloud.mongodb.com)

### Tools Installed
- [ ] Git installed (`git --version`)
- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)

---

## 🔍 Project Verification

### Backend Checks
- [ ] `backend/package.json` exists
- [ ] `backend/vercel.json` exists
- [ ] `backend/.env.example` exists
- [ ] Backend runs locally (`npm start` in backend folder)
- [ ] All dependencies installed (`npm install` in backend folder)

### Frontend Checks
- [ ] `frontend/package.json` exists
- [ ] `frontend/vercel.json` exists
- [ ] `frontend/.env.production` exists
- [ ] Frontend builds successfully (`npm run build` in frontend folder)
- [ ] All dependencies installed (`npm install` in frontend folder)

### Configuration Files
- [ ] `.gitignore` exists and includes `node_modules/`, `.env`
- [ ] No sensitive data in code (passwords, API keys)
- [ ] MongoDB connection uses environment variable

---

## 🗂️ Files Created for Deployment

These files have been created to help with deployment:

✅ `DEPLOY_TO_GITHUB_VERCEL.md` - Complete step-by-step guide
✅ `QUICK_DEPLOY.md` - Fast deployment instructions
✅ `PRE_DEPLOYMENT_CHECKLIST.md` - This checklist
✅ `backend/.env.example` - Environment variables template
✅ `backend/vercel.json` - Backend Vercel configuration
✅ `frontend/vercel.json` - Frontend Vercel configuration
✅ `frontend/.env.production` - Production environment config

---

## 🚀 Ready to Deploy?

If all items above are checked, you're ready to deploy!

### Choose Your Path:

**Option 1: Quick Deploy (15 minutes)**
→ Follow `QUICK_DEPLOY.md`

**Option 2: Detailed Deploy (45 minutes)**
→ Follow `DEPLOY_TO_GITHUB_VERCEL.md`

---

## 📝 Important Information to Collect

During deployment, you'll need to save these URLs:

1. **GitHub Repository URL**: 
   ```
   https://github.com/Harun-Tech28/multimart-ecommerce
   ```

2. **MongoDB Connection String**: 
   ```
   mongodb+srv://username:password@cluster.xxxxx.mongodb.net/multimart
   ```

3. **Backend Vercel URL**: 
   ```
   https://multimart-backend-xxxxx.vercel.app
   ```

4. **Frontend Vercel URL**: 
   ```
   https://multimart-frontend-xxxxx.vercel.app
   ```

**💡 Tip**: Keep these in a safe place (like a notes app)

---

## 🔐 Environment Variables Needed

### Backend Environment Variables:
```
NODE_ENV=production
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=multimart_harun_tech_2024_super_secret_key_xyz123
JWT_EXPIRE=7d
CLIENT_URL=your_frontend_vercel_url
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Environment Variables:
```
REACT_APP_API_URL=your_backend_vercel_url
```

---

## ⚠️ Common Issues to Avoid

- ❌ Don't commit `.env` files to GitHub
- ❌ Don't forget to add `0.0.0.0/0` to MongoDB Atlas IP whitelist
- ❌ Don't skip redeploying after adding environment variables
- ❌ Don't use `http://` in production URLs (use `https://`)
- ❌ Don't forget to update `CLIENT_URL` in backend after frontend deployment

---

## ✅ Post-Deployment Testing

After deployment, test these:

- [ ] Frontend loads without errors
- [ ] Backend API responds (`/api/health` endpoint)
- [ ] User registration works
- [ ] User login works
- [ ] Admin login works (`admin@multimart.com` / `Admin123`)
- [ ] Products page displays
- [ ] Admin dashboard accessible
- [ ] Vendor dashboard accessible
- [ ] Images upload correctly

---

## 🎉 You're Ready!

Everything is prepared for deployment. Good luck! 🚀

**Start here**: `QUICK_DEPLOY.md` or `DEPLOY_TO_GITHUB_VERCEL.md`
