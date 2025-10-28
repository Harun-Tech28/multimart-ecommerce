# 🚀 Deploy MultiMart to GitHub & Vercel

Complete step-by-step guide to deploy your MultiMart e-commerce platform.

---

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ Git installed on your computer
- ✅ GitHub account created
- ✅ Vercel account (sign up at https://vercel.com)
- ✅ MongoDB Atlas account (free tier)

---

## Part 1: Push to GitHub (10 minutes)

### Step 1: Create GitHub Repository

1. Go to https://github.com/Harun-Tech28
2. Click the **"+"** icon → **"New repository"**
3. Repository settings:
   - **Name**: `multimart-ecommerce`
   - **Description**: `Full-stack MERN multi-vendor e-commerce platform`
   - **Visibility**: Public (or Private if you prefer)
   - **DO NOT** check "Initialize with README"
4. Click **"Create repository"**

### Step 2: Initialize Git and Push

Open your terminal in the project root directory and run:

```bash
# Navigate to your project
cd C:\Users\user\Desktop\MultiMart

# Initialize Git (if not already done)
git init

# Add all files
git add .

# Commit with message
git commit -m "Initial commit: Complete MultiMart e-commerce platform"

# Add your GitHub repository
git remote add origin https://github.com/Harun-Tech28/multimart-ecommerce.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**✅ Checkpoint**: Visit your GitHub repository to confirm all files are uploaded.

---

## Part 2: Set Up MongoDB Atlas (15 minutes)

### Step 1: Create Database

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign in or create account
3. Click **"Build a Database"**
4. Choose **FREE** tier (M0 Sandbox)
5. Select:
   - **Provider**: AWS (recommended)
   - **Region**: Closest to your users
6. Click **"Create"**

### Step 2: Create Database User

1. **Security Quickstart** will appear
2. Choose **"Username and Password"**
3. Create credentials:
   - **Username**: `multimart_admin`
   - **Password**: Click "Autogenerate Secure Password" (SAVE THIS!)
4. Click **"Create User"**

### Step 3: Configure Network Access

1. In the same quickstart, under **"Where would you like to connect from?"**
2. Choose **"My Local Environment"**
3. Click **"Add My Current IP Address"**
4. **IMPORTANT**: Also add `0.0.0.0/0` for Vercel access:
   - Click **"Add IP Address"**
   - Enter: `0.0.0.0/0`
   - Description: `Vercel deployment`
5. Click **"Finish and Close"**

### Step 4: Get Connection String

1. Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Driver: **Node.js**, Version: **5.5 or later**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://multimart_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name before the `?`:
   ```
   mongodb+srv://multimart_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/multimart?retryWrites=true&w=majority
   ```

**✅ Save this connection string!** You'll need it for Vercel.

---

## Part 3: Deploy Backend to Vercel (15 minutes)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

This will open your browser. Choose your login method (GitHub recommended).

### Step 3: Deploy Backend

```bash
# Navigate to backend folder
cd backend

# Deploy to Vercel
vercel

# Answer the prompts:
# ? Set up and deploy? [Y/n] → Y
# ? Which scope? → Select your account
# ? Link to existing project? [y/N] → N
# ? What's your project's name? → multimart-backend
# ? In which directory is your code located? → ./
# ? Want to override the settings? [y/N] → N
```

Wait for deployment to complete. You'll get a URL like:
```
https://multimart-backend-xxxxx.vercel.app
```

**✅ SAVE THIS URL!** This is your backend API URL.

### Step 4: Deploy to Production

```bash
vercel --prod
```

This creates your production deployment.

### Step 5: Configure Environment Variables

1. Go to https://vercel.com/dashboard
2. Click on **"multimart-backend"** project
3. Go to **Settings** → **Environment Variables**
4. Add these variables (click "Add" for each):

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NODE_ENV` | `production` | Production |
| `PORT` | `8000` | Production |
| `MONGODB_URI` | Your MongoDB connection string | Production |
| `JWT_SECRET` | `multimart_harun_tech_2024_super_secret_key_xyz123` | Production |
| `JWT_EXPIRE` | `7d` | Production |
| `CLIENT_URL` | `http://localhost:3000` (update later) | Production |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Production |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Production |

5. Click **"Save"** after adding all variables

### Step 6: Redeploy Backend

```bash
# Still in backend folder
vercel --prod
```

**✅ Test your backend**: Visit `https://your-backend-url.vercel.app/api/health` (should return success)

---

## Part 4: Deploy Frontend to Vercel (15 minutes)

### Step 1: Update Frontend Configuration

1. Open `frontend/.env.production`
2. Update with your actual backend URL:

```env
REACT_APP_API_URL=https://multimart-backend-xxxxx.vercel.app
```

Replace `xxxxx` with your actual backend URL from Part 3.

### Step 2: Commit Changes

```bash
# Go back to project root
cd ..

# Add changes
git add .

# Commit
git commit -m "Configure production environment variables"

# Push to GitHub
git push origin main
```

### Step 3: Deploy Frontend

```bash
# Navigate to frontend folder
cd frontend

# Deploy to Vercel
vercel

# Answer the prompts:
# ? Set up and deploy? [Y/n] → Y
# ? Which scope? → Select your account
# ? Link to existing project? [y/N] → N
# ? What's your project's name? → multimart-frontend
# ? In which directory is your code located? → ./
# ? Want to override the settings? [y/N] → N
```

You'll get a URL like:
```
https://multimart-frontend-xxxxx.vercel.app
```

**✅ SAVE THIS URL!** This is your live website.

### Step 4: Deploy to Production

```bash
vercel --prod
```

### Step 5: Configure Environment Variables

1. Go to https://vercel.com/dashboard
2. Click on **"multimart-frontend"** project
3. Go to **Settings** → **Environment Variables**
4. Add:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `REACT_APP_API_URL` | Your backend URL | Production |

5. Click **"Save"**

### Step 6: Redeploy Frontend

```bash
vercel --prod
```

---

## Part 5: Final Configuration (10 minutes)

### Step 1: Update Backend CORS

1. Go to Vercel dashboard → **multimart-backend**
2. Settings → Environment Variables
3. Update `CLIENT_URL`:
   - Old value: `http://localhost:3000`
   - New value: `https://multimart-frontend-xxxxx.vercel.app`
4. Save

### Step 2: Redeploy Backend

```bash
cd backend
vercel --prod
```

### Step 3: Test Your Live Application

Visit your frontend URL: `https://multimart-frontend-xxxxx.vercel.app`

**Test these features:**
- ✅ Home page loads
- ✅ Products page displays
- ✅ Login works (admin@multimart.com / Admin123)
- ✅ Registration works
- ✅ Admin dashboard accessible
- ✅ Vendor dashboard accessible

---

## 🎉 Deployment Complete!

### Your Live URLs:

**Frontend (Website)**: 
```
https://multimart-frontend-xxxxx.vercel.app
```

**Backend (API)**: 
```
https://multimart-backend-xxxxx.vercel.app
```

**GitHub Repository**: 
```
https://github.com/Harun-Tech28/multimart-ecommerce
```

---

## 📱 Share Your Project

Your MultiMart platform is now live! Share these links:

- **Website**: Your frontend URL
- **GitHub**: Your repository URL
- **API Docs**: `your-backend-url/api/health`

---

## 🔧 Troubleshooting

### Issue: "Cannot connect to database"
**Solution**: Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`

### Issue: "CORS error"
**Solution**: Verify `CLIENT_URL` in backend matches your frontend URL exactly

### Issue: "Environment variables not working"
**Solution**: After adding env vars, always redeploy with `vercel --prod`

### Issue: "Build failed"
**Solution**: Check build logs in Vercel dashboard for specific errors

---

## 🔄 Future Updates

To update your deployed application:

```bash
# Make your changes
# Commit to Git
git add .
git commit -m "Your update message"
git push origin main

# Redeploy (Vercel auto-deploys from GitHub)
# Or manually:
cd backend  # or frontend
vercel --prod
```

---

## 💡 Pro Tips

1. **Custom Domain**: Add your own domain in Vercel project settings
2. **Auto Deploy**: Connect GitHub to Vercel for automatic deployments
3. **Monitoring**: Check Vercel dashboard for analytics and logs
4. **Scaling**: Upgrade Vercel plan if you need more resources

---

## 📊 What You've Deployed

✅ Full-stack MERN application
✅ Multi-vendor marketplace
✅ Admin dashboard
✅ Vendor dashboard  
✅ User authentication & authorization
✅ Product management
✅ Order processing
✅ Payment integration ready
✅ File upload system
✅ Review & rating system
✅ Wishlist functionality
✅ Advanced search & filters
✅ Responsive design

**Total Cost**: $0 (using free tiers)

---

## 🎓 Next Steps

1. **Add Products**: Login as admin and add your products
2. **Invite Vendors**: Share vendor registration link
3. **Configure Payments**: Set up Stripe/PayPal in environment variables
4. **Custom Branding**: Update logo and colors
5. **SEO Optimization**: Add meta tags and descriptions
6. **Marketing**: Share your platform!

---

**Congratulations! Your MultiMart e-commerce platform is live! 🚀**
