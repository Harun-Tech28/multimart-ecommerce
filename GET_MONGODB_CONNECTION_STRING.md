# 🗄️ Get MongoDB Atlas Connection String

Quick guide to get your connection string for Vercel deployment.

---

## 📍 Steps to Get Connection String

### 1. Go to MongoDB Atlas
Visit: https://cloud.mongodb.com

### 2. Create a Cluster (if you don't have one)
- Click "Build a Database"
- Choose **FREE** tier (M0 Sandbox)
- Click "Create"

### 3. Create Database User
- Go to "Database Access" (left sidebar)
- Click "Add New Database User"
- Username: `multimart_admin`
- Password: Click "Autogenerate Secure Password" → **COPY AND SAVE IT!**
- Database User Privileges: "Atlas admin"
- Click "Add User"

### 4. Configure Network Access
- Go to "Network Access" (left sidebar)
- Click "Add IP Address"
- Click "Allow Access from Anywhere"
- IP Address: `0.0.0.0/0`
- Description: `Vercel deployment`
- Click "Confirm"

### 5. Get Connection String
- Go to "Database" (left sidebar)
- Click "Connect" button on your cluster
- Choose "Connect your application"
- Driver: Node.js
- Copy the connection string

It looks like:
```
mongodb+srv://multimart_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 6. Format Connection String
Replace `<password>` with your actual password and add `/multimart` before the `?`:

**Final format:**
```
mongodb+srv://multimart_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/multimart?retryWrites=true&w=majority
```

---

## ✅ Save This Connection String!

You'll need it for Vercel deployment in the next step.

---

## 🚀 After You Have It

Once you have your connection string, we'll:
1. Deploy backend to Vercel
2. Add the connection string as environment variable
3. Deploy frontend to Vercel
4. Your site will be live!

---

**Get your connection string now, then let me know when you're ready!**
