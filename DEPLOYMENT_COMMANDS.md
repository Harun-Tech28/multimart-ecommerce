# 🚀 Quick Deployment Commands

## GitHub Push

```bash
# Navigate to project root
cd C:\Users\user\Desktop\MultiMart

# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: MultiMart e-commerce platform"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/multimart-ecommerce.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Vercel Deployment

### Install Vercel CLI (One Time)

```bash
npm install -g vercel
```

### Deploy Backend

```bash
# Navigate to backend
cd backend

# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Deploy to production
vercel --prod
```

### Deploy Frontend

```bash
# Navigate to frontend
cd frontend

# Deploy (first time)
vercel

# Deploy to production
vercel --prod
```

---

## Update and Redeploy

```bash
# Make changes to code

# Commit changes
git add .
git commit -m "Your update message"
git push origin main

# Redeploy backend
cd backend
vercel --prod

# Redeploy frontend
cd frontend
vercel --prod
```

---

## Useful Vercel Commands

```bash
# View deployments
vercel ls

# View logs
vercel logs [deployment-url]

# Remove deployment
vercel rm [deployment-name]

# View project info
vercel inspect [deployment-url]

# Link to existing project
vercel link

# View environment variables
vercel env ls

# Add environment variable
vercel env add

# Pull environment variables
vercel env pull
```

---

## MongoDB Atlas Setup

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create account/login
3. Create cluster (free tier)
4. Database Access → Add user
5. Network Access → Add IP: `0.0.0.0/0`
6. Connect → Get connection string
7. Replace `<password>` with your password

---

## Environment Variables

### Backend (.env)

```
NODE_ENV=production
PORT=8000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/multimart
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRE=7d
CLIENT_URL=https://your-frontend-url.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env.production)

```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

---

## Testing Deployment

### Test Backend

```bash
# Health check
curl https://your-backend-url.vercel.app/health

# API info
curl https://your-backend-url.vercel.app/api

# Categories
curl https://your-backend-url.vercel.app/api/categories

# Products
curl https://your-backend-url.vercel.app/api/products
```

### Test Frontend

Open in browser:
- `https://your-frontend-url.vercel.app`
- `https://your-frontend-url.vercel.app/products`
- `https://your-frontend-url.vercel.app/login`
- `https://your-frontend-url.vercel.app/admin/login`

---

## Troubleshooting Commands

### Check Git Status

```bash
git status
git log --oneline
git remote -v
```

### Check Vercel Status

```bash
vercel ls
vercel inspect
```

### View Logs

```bash
# Backend logs
vercel logs https://your-backend-url.vercel.app --follow

# Frontend logs
vercel logs https://your-frontend-url.vercel.app --follow
```

### Rollback Deployment

```bash
# List deployments
vercel ls

# Promote specific deployment to production
vercel promote [deployment-url]
```

---

## Quick Fixes

### Fix CORS Error

Update `backend/src/server.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app'],
  credentials: true
}));
```

Then redeploy:
```bash
cd backend
vercel --prod
```

### Fix Environment Variables

```bash
# Add variable
vercel env add VARIABLE_NAME

# Pull variables locally
vercel env pull

# Redeploy
vercel --prod
```

### Fix Build Error

```bash
# Check logs
vercel logs [deployment-url]

# Fix code
# Commit and push
git add .
git commit -m "Fix build error"
git push origin main

# Redeploy
vercel --prod
```

---

## Complete Deployment Flow

```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Deploy Backend
cd backend
vercel --prod
# Save backend URL

# 3. Update Frontend Config
# Edit frontend/.env.production with backend URL

# 4. Deploy Frontend
cd frontend
vercel --prod
# Save frontend URL

# 5. Update Backend CORS
# Edit backend/src/server.js with frontend URL

# 6. Redeploy Backend
cd backend
vercel --prod

# 7. Test Everything
# Open frontend URL in browser
# Test all features
```

---

## Monitoring

### Check Deployment Status

```bash
vercel ls
```

### View Real-time Logs

```bash
vercel logs --follow
```

### Check Build Logs

Go to Vercel Dashboard → Project → Deployments → Click deployment → View logs

---

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- GitHub Docs: https://docs.github.com

---

**Quick Reference**: Keep this file handy for deployment commands!
