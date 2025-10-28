# ⚡ Deployment Commands - Copy & Paste

Just the commands you need. Copy and paste in order.

---

## 1️⃣ GITHUB (Create repo first at https://github.com/new)

```bash
cd C:\Users\user\Desktop\MultiMart
git init
git add .
git commit -m "Complete MultiMart e-commerce platform"
git remote add origin https://github.com/Harun-Tech28/multimart-ecommerce.git
git branch -M main
git push -u origin main
```

---

## 2️⃣ MONGODB ATLAS

1. Create free cluster at: https://cloud.mongodb.com
2. Create user: `multimart_admin`
3. Whitelist IP: `0.0.0.0/0`
4. Get connection string and save it

---

## 3️⃣ BACKEND DEPLOYMENT

```bash
npm install -g vercel
cd backend
vercel login
vercel --prod
```

**Add these environment variables in Vercel dashboard:**

```
NODE_ENV=production
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=multimart_harun_tech_2024_super_secret_key_xyz123
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

Then redeploy:
```bash
vercel --prod
```

**Save your backend URL!**

---

## 4️⃣ FRONTEND DEPLOYMENT

Update `frontend/.env.production` with your backend URL, then:

```bash
cd ..
git add .
git commit -m "Configure production environment"
git push origin main

cd frontend
vercel --prod
```

**Add environment variable in Vercel dashboard:**

```
REACT_APP_API_URL=your_backend_url
```

Then redeploy:
```bash
vercel --prod
```

**Save your frontend URL!**

---

## 5️⃣ FINAL STEP

Update `CLIENT_URL` in backend Vercel dashboard to your frontend URL, then:

```bash
cd ../backend
vercel --prod
```

---

## ✅ DONE!

Visit your frontend URL and test your live site! 🎉

**Login credentials:**
- Email: `admin@multimart.com`
- Password: `Admin123`

---

**Total time: ~15 minutes**
