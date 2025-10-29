# 🔐 Environment Variables for Render Deployment

## Backend Environment Variables

Copy these exactly when deploying to Render:

### 1. NODE_ENV
```
NODE_ENV=production
```

### 2. PORT
```
PORT=10000
```
**Note**: Render uses port 10000 by default

### 3. JWT_SECRET
```
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c8b9c7d6e5f4a3b2c1d0e9f8a7b6c5d4e
```

### 4. MONGODB_URI
```
MONGODB_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE
```
**Replace with your actual MongoDB Atlas connection string**

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/multimart?retryWrites=true&w=majority
```

### 5. FRONTEND_URL
```
FRONTEND_URL=YOUR_FRONTEND_URL_FROM_RENDER
```
**You'll add this AFTER deploying the frontend**

Temporary value for now:
```
FRONTEND_URL=https://temporary.com
```

---

## Frontend Environment Variable

### REACT_APP_API_URL
```
REACT_APP_API_URL=YOUR_BACKEND_URL_FROM_RENDER/api
```

Example:
```
REACT_APP_API_URL=https://multimart-backend.onrender.com/api
```

---

## 📋 Quick Copy-Paste Format

### For Backend (Add these in Render):

```
NODE_ENV=production
PORT=10000
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c8b9c7d6e5f4a3b2c1d0e9f8a7b6c5d4e
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/multimart?retryWrites=true&w=majority
FRONTEND_URL=https://temporary.com
```

### For Frontend (Add after backend is deployed):

```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

---

## 🔑 MongoDB Atlas Connection String

If you don't have MongoDB Atlas set up yet, here's the format:

```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

**Example with real values**:
```
mongodb+srv://multimartuser:MySecurePass123@cluster0.abc123.mongodb.net/multimart?retryWrites=true&w=majority
```

**Parts to replace**:
- `USERNAME` - Your MongoDB Atlas database user
- `PASSWORD` - Your database user password
- `CLUSTER` - Your cluster address (e.g., cluster0.abc123)
- `DATABASE` - Database name (use `multimart`)

---

## ⚠️ Important Notes

1. **PORT**: Render requires port 10000 (not 5000 like Vercel)
2. **MONGODB_URI**: Must be from MongoDB Atlas (not localhost)
3. **FRONTEND_URL**: Update this after frontend deployment
4. **JWT_SECRET**: Keep this secret and secure
5. **No quotes needed**: Just paste the values directly in Render

---

## 🎯 Deployment Order

1. **Deploy Backend** → Get backend URL
2. **Deploy Frontend** → Use backend URL in REACT_APP_API_URL
3. **Update Backend** → Add frontend URL to FRONTEND_URL
4. **Done!** 🎉

---

## 📝 Example of Complete Setup

### Backend Variables (in Render):
```
NODE_ENV = production
PORT = 10000
JWT_SECRET = a8f5f167f44f4964e6c998dee827110c8b9c7d6e5f4a3b2c1d0e9f8a7b6c5d4e
MONGODB_URI = mongodb+srv://multimartuser:Pass123@cluster0.abc.mongodb.net/multimart?retryWrites=true&w=majority
FRONTEND_URL = https://multimart-frontend.onrender.com
```

### Frontend Variables (in Render):
```
REACT_APP_API_URL = https://multimart-backend.onrender.com/api
```

---

**Ready to deploy? Open START_RENDER_DEPLOYMENT.md for step-by-step instructions!**
