# 🚀 MultiMart Deployment Guide - GitHub & Vercel

## Overview

This guide will help you deploy your MultiMart e-commerce platform to GitHub and Vercel.

---

## Part 1: Push to GitHub

### Step 1: Initialize Git Repository

```bash
# Navigate to your project root
cd C:\Users\user\Desktop\MultiMart

# Initialize git (if not already done)
git init

# Check git status
git status
```

### Step 2: Create .gitignore Files

Make sure you have proper .gitignore files to exclude sensitive data and dependencies.

**Root .gitignore** (if not exists):
```
node_modules/
.env
.DS_Store
*.log
dist/
build/
.vscode/
.idea/
```

**Backend .gitignore** (already exists):
```
node_modules/
.env
.DS_Store
coverage/
*.log
dist/
build/
uploads/*
!uploads/.gitkeep
!uploads/products/
uploads/products/*
!uploads/products/.gitkeep
```

**Frontend .gitignore**:
```
node_modules/
build/
.env
.env.local
.env.production
.DS_Store
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### Step 3: Create GitHub Repository

1. Go to https://github.com
2. Click "New repository" (+ icon in top right)
3. Repository name: `multimart-ecommerce` (or your preferred name)
4. Description: "Full-stack multi-vendor e-commerce platform with MERN stack"
5. Choose: **Public** or **Private**
6. **DO NOT** initialize with README (we already have one)
7. Click "Create repository"

### Step 4: Add and Commit Files

```bash
# Add all files
git add .

# Commit with message
git commit -m "Initial commit: MultiMart e-commerce platform with all features"
```

### Step 5: Push to GitHub

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/multimart-ecommerce.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**If you get authentication errors:**
- Use GitHub Personal Access Token instead of password
- Or use GitHub Desktop app
- Or use SSH keys

---

## Part 2: Deploy Backend to Vercel

### Step 1: Prepare Backend for Deployment

#### Create vercel.json in backend folder

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### Update backend/package.json

Add this to scripts:
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "vercel-build": "echo 'Building for Vercel'"
  }
}
```

### Step 2: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create account or login
3. Create a new cluster (free tier)
4. Create database user
5. Whitelist all IPs: `0.0.0.0/0` (for Vercel)
6. Get connection string

### Step 3: Deploy Backend to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to backend folder
cd backend

# Login to Vercel
vercel login

# Deploy
vercel
```

**Follow the prompts:**
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? `multimart-backend`
- Directory? `./`
- Override settings? **N**

### Step 4: Set Environment Variables on Vercel

Go to your Vercel dashboard:
1. Select your backend project
2. Go to Settings → Environment Variables
3. Add these variables:

```
NODE_ENV=production
PORT=8000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=https://your-frontend-url.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Step 5: Redeploy Backend

```bash
# Redeploy with environment variables
vercel --prod
```

**Save your backend URL**: `https://multimart-backend.vercel.app`

---

## Part 3: Deploy Frontend to Vercel

### Step 1: Update Frontend API Configuration

Update `frontend/src/config/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.vercel.app' 
    : 'http://localhost:8000');

export default API_BASE_URL;
```

### Step 2: Update All API Calls

Replace all hardcoded `http://localhost:8000` with the API_BASE_URL:

```javascript
// Instead of:
fetch('http://localhost:8000/api/products')

// Use:
import API_BASE_URL from '../config/api';
fetch(`${API_BASE_URL}/api/products`)
```

### Step 3: Create Environment File

Create `frontend/.env.production`:

```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

### Step 4: Deploy Frontend to Vercel

```bash
# Navigate to frontend folder
cd frontend

# Deploy
vercel
```

**Follow the prompts:**
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? `multimart-frontend`
- Directory? `./`
- Override settings? **N**

### Step 5: Set Environment Variables

Go to Vercel dashboard:
1. Select your frontend project
2. Go to Settings → Environment Variables
3. Add:

```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

### Step 6: Redeploy Frontend

```bash
vercel --prod
```

**Save your frontend URL**: `https://multimart-frontend.vercel.app`

---

## Part 4: Update Backend CORS

Update backend to allow your frontend domain:

In `backend/src/server.js`:

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

Redeploy backend:
```bash
cd backend
vercel --prod
```

---

## Part 5: Testing Deployment

### Test Backend

```bash
# Health check
curl https://your-backend-url.vercel.app/health

# API check
curl https://your-backend-url.vercel.app/api
```

### Test Frontend

1. Visit: `https://your-frontend-url.vercel.app`
2. Test features:
   - Browse products
   - Register/Login
   - Add to cart
   - Checkout
   - Admin dashboard
   - Vendor dashboard

---

## Part 6: Custom Domain (Optional)

### For Frontend

1. Go to Vercel dashboard → Your frontend project
2. Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

### For Backend

1. Go to Vercel dashboard → Your backend project
2. Settings → Domains
3. Add your custom domain (e.g., api.yourdomain.com)
4. Update frontend API_URL to use custom domain

---

## Troubleshooting

### Issue: CORS Errors

**Solution**: 
- Check backend CORS configuration
- Ensure frontend URL is in allowed origins
- Redeploy backend after changes

### Issue: Environment Variables Not Working

**Solution**:
- Check variable names match exactly
- Redeploy after adding variables
- Check Vercel logs for errors

### Issue: MongoDB Connection Failed

**Solution**:
- Check MongoDB Atlas IP whitelist (use 0.0.0.0/0)
- Verify connection string is correct
- Check database user permissions

### Issue: API Calls Failing

**Solution**:
- Check API_BASE_URL is correct
- Verify backend is deployed and running
- Check Network tab in browser DevTools

### Issue: Build Fails

**Solution**:
- Check build logs in Vercel
- Ensure all dependencies are in package.json
- Fix any TypeScript/ESLint errors

---

## Maintenance

### Update Deployment

```bash
# Make changes to code
git add .
git commit -m "Your commit message"
git push origin main

# Redeploy backend
cd backend
vercel --prod

# Redeploy frontend
cd frontend
vercel --prod
```

### Monitor Logs

```bash
# View backend logs
vercel logs https://your-backend-url.vercel.app

# View frontend logs
vercel logs https://your-frontend-url.vercel.app
```

### Rollback Deployment

```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

---

## Security Checklist

Before going live:

- [ ] Change all default passwords
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS only
- [ ] Set up rate limiting
- [ ] Configure CORS properly
- [ ] Whitelist specific IPs for MongoDB
- [ ] Remove console.logs from production
- [ ] Set up error monitoring (Sentry)
- [ ] Enable security headers
- [ ] Set up backup strategy

---

## Performance Optimization

- [ ] Enable caching
- [ ] Optimize images
- [ ] Minify CSS/JS
- [ ] Use CDN for static assets
- [ ] Enable compression
- [ ] Implement lazy loading
- [ ] Set up monitoring

---

## Cost Considerations

### Vercel Free Tier Limits

- **Bandwidth**: 100GB/month
- **Build Minutes**: 6000 minutes/month
- **Serverless Function Execution**: 100GB-hours/month
- **Deployments**: Unlimited

### MongoDB Atlas Free Tier

- **Storage**: 512MB
- **RAM**: Shared
- **Connections**: 500 concurrent

**Upgrade when needed** for production use.

---

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy backend to Vercel
3. ✅ Deploy frontend to Vercel
4. ✅ Test all features
5. ✅ Set up custom domain
6. ✅ Configure monitoring
7. ✅ Set up CI/CD
8. ✅ Launch! 🎉

---

## Support

If you encounter issues:
- Check Vercel documentation
- Review deployment logs
- Check GitHub Actions (if using CI/CD)
- Contact Vercel support

---

**Deployment Status**: Ready to Deploy
**Last Updated**: October 28, 2024
