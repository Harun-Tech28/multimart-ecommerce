# 🚀 Deploy Steps - Follow Along

## ✅ Step 1: You're Logged into Vercel - DONE!

---

## 📋 Before We Deploy Backend

### Do you have MongoDB Atlas ready?

**If YES** - You have a connection string like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/multimart?retryWrites=true&w=majority
```

**If NO** - Quick setup (5 minutes):
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (use Google/GitHub for fastest)
3. Create FREE cluster
4. Create database user (save password!)
5. Network Access → Allow 0.0.0.0/0
6. Get connection string

---

## 🚀 Step 2: Deploy Backend

Run these commands in your terminal:

```bash
cd backend
vercel
```

**Answer the prompts:**
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? **multimart-backend** (or your choice)
- In which directory? **./`** (just press Enter)
- Override settings? **N**

**Wait for deployment...**

**IMPORTANT**: Copy the production URL that appears!
Example: `https://multimart-backend-xyz.vercel.app`

---

## 🔑 Step 3: Add Environment Variables

Now run these commands ONE BY ONE:

### 1. NODE_ENV
```bash
vercel env add NODE_ENV
```
When prompted, enter: `production`
Select: **Production** (press Space, then Enter)

### 2. MONGODB_URI
```bash
vercel env add MONGODB_URI
```
Enter your MongoDB Atlas connection string
Select: **Production**

### 3. JWT_SECRET
```bash
vercel env add JWT_SECRET
```
Enter a random 32+ character string
Example: `a8f5f167f44f4964e6c998dee827110c8b9c7d6e5f4a3b2c1d0e9f8a7b6c5d4e`
Select: **Production**

### 4. PORT
```bash
vercel env add PORT
```
Enter: `5000`
Select: **Production**

### 5. FRONTEND_URL
```bash
vercel env add FRONTEND_URL
```
Enter: `https://temporary.vercel.app` (we'll update this later)
Select: **Production**

---

## 🔄 Step 4: Redeploy Backend with Environment Variables

```bash
vercel --prod
```

**SAVE YOUR BACKEND URL!** You'll need it for the frontend.

---

## 🎨 Step 5: Deploy Frontend

```bash
cd ../frontend
vercel
```

**Answer the prompts:**
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? **multimart-frontend** (or your choice)
- In which directory? **./`** (just press Enter)
- Override settings? **N**

---

## 🔑 Step 6: Add Frontend Environment Variable

```bash
vercel env add REACT_APP_API_URL
```
Enter: `https://your-backend-url.vercel.app/api`
(Use the backend URL from Step 2)
Select: **Production**

---

## 🚀 Step 7: Deploy Frontend to Production

```bash
vercel --prod
```

**SAVE YOUR FRONTEND URL!**

---

## 🔄 Step 8: Update Backend with Frontend URL

```bash
cd ../backend
vercel env rm FRONTEND_URL production
vercel env add FRONTEND_URL
```
Enter your actual frontend URL
Select: **Production**

**Final redeploy:**
```bash
vercel --prod
```

---

## 🎉 DONE!

Your site is now live!

**Test it:**
- Visit your frontend URL
- Try registering a user
- Browse products
- Test all features

---

## 📝 Quick Reference

| What | Command |
|------|---------|
| Deploy | `vercel` |
| Deploy to production | `vercel --prod` |
| Add env variable | `vercel env add VARIABLE_NAME` |
| Remove env variable | `vercel env rm VARIABLE_NAME production` |
| List deployments | `vercel ls` |
| View logs | `vercel logs` |

---

**Ready? Let me know if you need help with MongoDB Atlas setup first!**
