# ⚡ Quick Deploy Reference Card

## 🎯 Deploy URL
👉 **https://render.com**

---

## 📦 Backend Configuration

**Service Type**: Web Service
**Name**: multimart-backend
**Root Directory**: `backend`
**Build Command**: `npm install`
**Start Command**: `node src/server.js`
**Plan**: Free

**Environment Variables**:
```
NODE_ENV=production
PORT=10000
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c8b9c7d6e5f4a3b2c1d0e9f8a7b6c5d4e
MONGODB_URI=[Your MongoDB connection string]
FRONTEND_URL=[Your frontend URL]
```

---

## 🎨 Frontend Configuration

**Service Type**: Static Site
**Name**: multimart-frontend
**Root Directory**: `frontend`
**Build Command**: `npm install && npm run build`
**Publish Directory**: `build`
**Plan**: Free

**Environment Variable**:
```
REACT_APP_API_URL=[Your backend URL]/api
```

---

## 🗄️ MongoDB Atlas

**Sign Up**: https://www.mongodb.com/cloud/atlas/register

**Connection String Format**:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/multimart?retryWrites=true&w=majority
```

**Setup Steps**:
1. Create free cluster
2. Create database user
3. Set network access: 0.0.0.0/0
4. Get connection string
5. Add to Render backend

---

## 🔑 Default Logins

**Admin**:
- Email: `admin@multimart.com`
- Password: `Admin@123`

**Vendor**:
- Email: `vendor@test.com`
- Password: `Vendor@123`

---

## 📋 Deployment Order

1. ✅ Sign up for Render
2. ✅ Deploy Backend
3. ✅ Copy Backend URL
4. ✅ Deploy Frontend (with backend URL)
5. ✅ Copy Frontend URL
6. ✅ Update Backend with Frontend URL
7. ✅ Set up MongoDB Atlas
8. ✅ Add MongoDB URI to Backend
9. ✅ Test Site

---

## 🆘 Quick Troubleshooting

**Backend Error**: Check Render logs
**Frontend Error**: Check browser console
**CORS Error**: Update FRONTEND_URL in backend
**DB Error**: Check MongoDB connection string

---

## 📞 Resources

- **Render Docs**: https://render.com/docs
- **MongoDB Docs**: https://docs.atlas.mongodb.com
- **GitHub**: https://github.com/Harun-Tech28/multimart-ecommerce

---

**Time to Deploy**: ~25 minutes
**Cost**: $0 (Free tier)
