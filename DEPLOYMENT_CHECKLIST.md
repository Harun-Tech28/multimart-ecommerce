# 📋 Deployment Checklist

## Pre-Deployment

### Code Preparation
- [ ] All features tested locally
- [ ] No console.errors in production code
- [ ] All API endpoints working
- [ ] Database connections tested
- [ ] Environment variables documented

### Security
- [ ] `.env` files in `.gitignore`
- [ ] Strong JWT_SECRET generated
- [ ] MongoDB Atlas set up
- [ ] CORS configured properly
- [ ] Rate limiting enabled

### Files Ready
- [ ] `.gitignore` created
- [ ] `vercel.json` in backend
- [ ] `.env.production` in frontend
- [ ] `README.md` updated
- [ ] Documentation complete

---

## GitHub Deployment

### Step 1: Initialize Git
```bash
cd C:\Users\user\Desktop\MultiMart
git init
git status
```
- [ ] Git initialized
- [ ] Files staged

### Step 2: Create GitHub Repository
- [ ] GitHub account ready
- [ ] New repository created
- [ ] Repository name: `multimart-ecommerce`
- [ ] Public or Private selected

### Step 3: Push to GitHub
```bash
git add .
git commit -m "Initial commit: MultiMart e-commerce platform"
git remote add origin https://github.com/YOUR_USERNAME/multimart-ecommerce.git
git branch -M main
git push -u origin main
```
- [ ] Files committed
- [ ] Remote added
- [ ] Pushed to GitHub
- [ ] Verify on GitHub.com

---

## Backend Deployment (Vercel)

### Step 1: MongoDB Atlas Setup
- [ ] MongoDB Atlas account created
- [ ] Cluster created (free tier)
- [ ] Database user created
- [ ] IP whitelist: `0.0.0.0/0`
- [ ] Connection string copied

### Step 2: Install Vercel CLI
```bash
npm install -g vercel
```
- [ ] Vercel CLI installed
- [ ] Vercel account created/logged in

### Step 3: Deploy Backend
```bash
cd backend
vercel login
vercel
```
- [ ] Logged into Vercel
- [ ] Backend deployed
- [ ] Deployment URL saved

### Step 4: Environment Variables
Go to Vercel Dashboard → Project → Settings → Environment Variables

Add these:
- [ ] `NODE_ENV=production`
- [ ] `PORT=8000`
- [ ] `MONGODB_URI=your_connection_string`
- [ ] `JWT_SECRET=your_secret_key`
- [ ] `JWT_EXPIRE=7d`
- [ ] `CLIENT_URL=https://your-frontend.vercel.app`
- [ ] `RATE_LIMIT_WINDOW_MS=900000`
- [ ] `RATE_LIMIT_MAX_REQUESTS=100`

### Step 5: Redeploy Backend
```bash
vercel --prod
```
- [ ] Redeployed with env variables
- [ ] Backend URL working
- [ ] Health check passed: `/health`

**Backend URL**: `https://_____________________.vercel.app`

---

## Frontend Deployment (Vercel)

### Step 1: Update API Configuration
Update `frontend/.env.production`:
```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```
- [ ] `.env.production` updated with backend URL
- [ ] API configuration file updated

### Step 2: Deploy Frontend
```bash
cd frontend
vercel
```
- [ ] Frontend deployed
- [ ] Deployment URL saved

### Step 3: Environment Variables
Go to Vercel Dashboard → Project → Settings → Environment Variables

Add:
- [ ] `REACT_APP_API_URL=https://your-backend-url.vercel.app`

### Step 4: Redeploy Frontend
```bash
vercel --prod
```
- [ ] Redeployed with env variables
- [ ] Frontend URL working

**Frontend URL**: `https://_____________________.vercel.app`

---

## Post-Deployment Testing

### Backend Tests
- [ ] Health check: `https://backend-url/health`
- [ ] API info: `https://backend-url/api`
- [ ] Categories endpoint: `https://backend-url/api/categories`
- [ ] Products endpoint: `https://backend-url/api/products`

### Frontend Tests
- [ ] Home page loads
- [ ] Products page loads
- [ ] Product details page works
- [ ] User registration works
- [ ] User login works
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] Admin login works
- [ ] Admin dashboard loads
- [ ] Vendor login works
- [ ] Vendor dashboard loads

### Integration Tests
- [ ] Frontend can fetch from backend
- [ ] Authentication works
- [ ] API calls successful
- [ ] Images load correctly
- [ ] No CORS errors
- [ ] No console errors

---

## Final Configuration

### Update Backend CORS
In `backend/src/server.js`, update CORS to include frontend URL:
```javascript
app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    'http://localhost:3000',
    'https://your-frontend-url.vercel.app'
  ],
  credentials: true
}));
```
- [ ] CORS updated
- [ ] Backend redeployed

### Commit and Push Changes
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```
- [ ] Changes committed
- [ ] Pushed to GitHub

---

## Optional Enhancements

### Custom Domain
- [ ] Domain purchased
- [ ] DNS configured for frontend
- [ ] DNS configured for backend (api.domain.com)
- [ ] SSL certificate active

### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] Uptime monitoring
- [ ] Performance monitoring

### CI/CD
- [ ] GitHub Actions configured
- [ ] Auto-deploy on push
- [ ] Automated tests

---

## Troubleshooting

### If Backend Fails
- [ ] Check Vercel logs
- [ ] Verify MongoDB connection
- [ ] Check environment variables
- [ ] Test endpoints with Postman

### If Frontend Fails
- [ ] Check browser console
- [ ] Verify API_URL is correct
- [ ] Check Network tab for failed requests
- [ ] Verify backend is running

### If CORS Errors
- [ ] Check backend CORS configuration
- [ ] Verify frontend URL in allowed origins
- [ ] Redeploy backend

---

## Success Criteria

✅ GitHub repository created and code pushed
✅ Backend deployed to Vercel
✅ Frontend deployed to Vercel
✅ MongoDB Atlas connected
✅ All environment variables set
✅ CORS configured correctly
✅ All pages loading
✅ API calls working
✅ Authentication working
✅ No console errors
✅ Mobile responsive

---

## URLs to Save

**GitHub Repository**: `https://github.com/YOUR_USERNAME/multimart-ecommerce`

**Backend (Vercel)**: `https://_____________________.vercel.app`

**Frontend (Vercel)**: `https://_____________________.vercel.app`

**MongoDB Atlas**: `https://cloud.mongodb.com`

---

## Next Steps After Deployment

1. [ ] Share URLs with team/stakeholders
2. [ ] Set up monitoring and alerts
3. [ ] Create backup strategy
4. [ ] Plan for scaling
5. [ ] Set up custom domain
6. [ ] Configure CDN
7. [ ] Optimize performance
8. [ ] Set up staging environment

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete
