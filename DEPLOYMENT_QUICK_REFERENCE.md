# 🎯 Deployment Quick Reference Card

Keep this handy during deployment!

---

## 📝 URLs to Save

```
┌─────────────────────────────────────────────────────┐
│  SAVE THESE AS YOU GO:                              │
├─────────────────────────────────────────────────────┤
│                                                      │
│  GitHub Repository:                                 │
│  https://github.com/Harun-Tech28/multimart-ecommerce│
│                                                      │
│  MongoDB Connection String:                         │
│  mongodb+srv://user:pass@cluster.mongodb.net/...    │
│                                                      │
│  Backend URL:                                       │
│  https://multimart-backend-xxxxx.vercel.app         │
│                                                      │
│  Frontend URL:                                      │
│  https://multimart-frontend-xxxxx.vercel.app        │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## ⚡ Essential Commands

### GitHub
```bash
cd C:\Users\user\Desktop\MultiMart
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Harun-Tech28/multimart-ecommerce.git
git branch -M main
git push -u origin main
```

### Backend Deployment
```bash
npm install -g vercel
cd backend
vercel login
vercel --prod
```

### Frontend Deployment
```bash
cd frontend
vercel --prod
```

### Redeploy
```bash
vercel --prod
```

---

## 🔑 Environment Variables

### Backend (Vercel Dashboard)
```
NODE_ENV=production
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=multimart_harun_tech_2024_super_secret_key_xyz123
JWT_EXPIRE=7d
CLIENT_URL=your_frontend_url
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (Vercel Dashboard)
```
REACT_APP_API_URL=your_backend_url
```

---

## 🔗 Important Links

| Service | URL |
|---------|-----|
| GitHub New Repo | https://github.com/new |
| Vercel Dashboard | https://vercel.com/dashboard |
| MongoDB Atlas | https://cloud.mongodb.com |
| Vercel Docs | https://vercel.com/docs |

---

## ✅ Deployment Checklist

- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Create MongoDB Atlas cluster
- [ ] Get MongoDB connection string
- [ ] Deploy backend to Vercel
- [ ] Add backend environment variables
- [ ] Redeploy backend
- [ ] Update frontend .env.production
- [ ] Deploy frontend to Vercel
- [ ] Add frontend environment variables
- [ ] Redeploy frontend
- [ ] Update backend CLIENT_URL
- [ ] Redeploy backend
- [ ] Test live site

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't connect to MongoDB | Add `0.0.0.0/0` to IP whitelist |
| CORS error | Update `CLIENT_URL` in backend |
| Env vars not working | Redeploy with `vercel --prod` |
| Git push failed | Check remote URL with `git remote -v` |
| Build failed | Check Vercel logs for errors |

---

## 🧪 Test Credentials

After deployment, test with:

**Admin Login:**
- Email: `admin@multimart.com`
- Password: `Admin123`

---

## ⏱️ Time Estimate

| Step | Time |
|------|------|
| GitHub | 3 min |
| MongoDB | 5 min |
| Backend | 4 min |
| Frontend | 3 min |
| Connect | 1 min |
| **Total** | **15 min** |

---

## 💰 Cost

**Everything is FREE!**
- GitHub: Free
- Vercel: Free tier
- MongoDB: Free tier (M0)

**Total: $0**

---

## 📱 After Deployment

Test these:
- [ ] Home page loads
- [ ] Products page works
- [ ] Login works
- [ ] Admin dashboard accessible
- [ ] Register new user
- [ ] All features working

---

## 🔄 Update Deployed App

```bash
# Make changes
git add .
git commit -m "Update message"
git push origin main

# Redeploy
cd backend  # or frontend
vercel --prod
```

---

## 📞 Need Help?

See detailed guides:
- `DEPLOY_INSTRUCTIONS.md` - Main guide
- `START_DEPLOYMENT_NOW.md` - Quick guide
- `DEPLOYMENT_FLOWCHART.md` - Visual guide

---

**Print or save this for quick reference during deployment!**
