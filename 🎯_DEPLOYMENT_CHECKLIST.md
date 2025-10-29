# 🎯 Render Deployment Checklist

## ✅ Pre-Deployment (Done!)
- ✅ Code pushed to GitHub
- ✅ Build scripts configured
- ✅ Environment variables documented
- ✅ Ready to deploy!

---

## 📝 Deployment Steps

### 1. Render Account
- [ ] Go to https://render.com
- [ ] Sign up with GitHub
- [ ] Authorize Render

### 2. Backend Service
- [ ] Click "New +" → "Web Service"
- [ ] Connect `multimart-ecommerce` repo
- [ ] Set name: `multimart-backend`
- [ ] Set root directory: `backend`
- [ ] Set build command: `npm install`
- [ ] Set start command: `node src/server.js`
- [ ] Add environment variables:
  - [ ] NODE_ENV = production
  - [ ] PORT = 10000
  - [ ] JWT_SECRET = a8f5f167f44f4964e6c998dee827110c8b9c7d6e5f4a3b2c1d0e9f8a7b6c5d4e
  - [ ] MONGODB_URI = [your connection string]
  - [ ] FRONTEND_URL = https://temporary.com
- [ ] Click "Create Web Service"
- [ ] Wait for deployment
- [ ] Copy backend URL: ___________________________

### 3. Frontend Service
- [ ] Click "New +" → "Static Site"
- [ ] Connect `multimart-ecommerce` repo
- [ ] Set name: `multimart-frontend`
- [ ] Set root directory: `frontend`
- [ ] Set build command: `npm install && npm run build`
- [ ] Set publish directory: `build`
- [ ] Add environment variable:
  - [ ] REACT_APP_API_URL = [your backend URL]/api
- [ ] Click "Create Static Site"
- [ ] Wait for deployment
- [ ] Copy frontend URL: ___________________________

### 4. Update Backend
- [ ] Go to backend service
- [ ] Click "Environment"
- [ ] Edit FRONTEND_URL
- [ ] Set to your frontend URL
- [ ] Save changes
- [ ] Wait for redeploy

### 5. MongoDB Atlas
- [ ] Sign up at https://www.mongodb.com/cloud/atlas/register
- [ ] Create free cluster
- [ ] Create database user
- [ ] Set network access to 0.0.0.0/0
- [ ] Get connection string
- [ ] Add to backend MONGODB_URI
- [ ] Save and redeploy

### 6. Testing
- [ ] Visit frontend URL
- [ ] Register new user
- [ ] Browse products
- [ ] Add to cart
- [ ] Login as admin (admin@multimart.com / Admin@123)
- [ ] Check admin dashboard
- [ ] Test vendor features

---

## 🎉 Deployment Complete!

**Your URLs**:
- Frontend: ___________________________
- Backend: ___________________________

**Admin Login**:
- Email: admin@multimart.com
- Password: Admin@123

---

## 📊 Post-Deployment

- [ ] Test all major features
- [ ] Check logs for errors
- [ ] Verify database connection
- [ ] Test image uploads
- [ ] Test payment flow
- [ ] Share with users!

---

## 🆘 If Something Goes Wrong

1. **Check Render logs** (click "Logs" tab)
2. **Verify environment variables** (click "Environment" tab)
3. **Check MongoDB connection** (test in Atlas)
4. **Review error messages** (browser console)
5. **Redeploy if needed** (click "Manual Deploy")

---

## 💡 Remember

- Free tier services sleep after 15 min
- First request takes 30-60 seconds
- Auto-deploys on GitHub push
- Check logs for debugging

---

**Start deploying**: https://render.com 🚀
