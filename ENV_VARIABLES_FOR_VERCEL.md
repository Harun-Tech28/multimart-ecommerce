# 🔐 Environment Variables for Vercel Deployment

Copy and paste these into Vercel when deploying.

---

## Backend Environment Variables

Add these in Vercel when deploying the **backend** project:

```
NODE_ENV=production
```

```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/multimart?retryWrites=true&w=majority
```
⚠️ Replace with your actual MongoDB Atlas connection string

```
JWT_SECRET=your_super_secure_random_string_here_min_32_chars
```
⚠️ Generate a strong random string (at least 32 characters)

```
PORT=5000
```

```
FRONTEND_URL=https://your-frontend-name.vercel.app
```
⚠️ You'll get this URL after deploying the frontend (Step 2)
⚠️ Come back and update this after frontend deployment

---

## Frontend Environment Variables

Add these in Vercel when deploying the **frontend** project:

```
REACT_APP_API_URL=https://your-backend-name.vercel.app/api
```
⚠️ Replace with your actual backend URL from Step 1

---

## 🔑 How to Generate JWT_SECRET

Run this in your terminal to generate a secure random string:

**Windows PowerShell:**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**Or use this online tool:**
https://randomkeygen.com/ (use "CodeIgniter Encryption Keys")

---

## 📝 Example Values (DO NOT USE THESE IN PRODUCTION)

### Backend Example:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/multimart?retryWrites=true&w=majority
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c
PORT=5000
FRONTEND_URL=https://multimart-frontend.vercel.app
```

### Frontend Example:
```
REACT_APP_API_URL=https://multimart-backend.vercel.app/api
```

---

## ✅ Verification Checklist

Before deploying, make sure you have:

- [ ] MongoDB Atlas connection string ready
- [ ] Generated a strong JWT_SECRET
- [ ] Noted that FRONTEND_URL will be updated after frontend deployment
- [ ] Understood that REACT_APP_API_URL needs the backend URL

---

## 🔄 Two-Step Process

1. **Deploy Backend First** → Get backend URL
2. **Deploy Frontend** with backend URL → Get frontend URL
3. **Update Backend** with frontend URL → Redeploy

---

## 💡 Pro Tips

- **Keep these secure**: Never share your JWT_SECRET or MongoDB credentials
- **Use different secrets**: Don't reuse JWT_SECRET across projects
- **MongoDB Atlas**: Make sure to whitelist all IPs (0.0.0.0/0) for Vercel
- **Test locally first**: Verify everything works before deploying

---

**Ready? Copy these values and head to Vercel!** 🚀
