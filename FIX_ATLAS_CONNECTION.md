# 🔧 Fix MongoDB Atlas Connection - Step by Step

## The Problem
Your backend can't connect to MongoDB Atlas. Error: "Operation `users.findOne()` buffering timed out"

## ✅ Solution: Whitelist Your IP Address

### Step 1: Go to MongoDB Atlas
1. Open: https://cloud.mongodb.com
2. Login with your credentials

### Step 2: Whitelist Your IP
1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"** button
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

**⚠️ This is the most common issue!**

### Step 3: Verify Database User
1. Click **"Database Access"** in the left sidebar
2. Find user: `harunadramani5_db_user`
3. Make sure:
   - ✅ Password is: `Ayishatu`
   - ✅ User has "Read and write to any database" role
   - ✅ User is not disabled

### Step 4: Restart Your Backend
```bash
# Stop the backend (Ctrl+C)
cd backend
npm start
```

## 🧪 Test Connection

After whitelisting IP, you should see:
```
✅ MongoDB Connected: cluster0-shard-00-00.gxblr43.mongodb.net
🚀 Server running on port 8000
```

## 🔄 Alternative: Reset Everything

If still not working:

### Option 1: Create New Database User
1. Go to **Database Access**
2. Click **"Add New Database User"**
3. Username: `multimart_user`
4. Password: `Ayishatu123` (simple, no special chars)
5. Role: "Atlas admin"
6. Click **"Add User"**

Then update your `.env`:
```env
MONGODB_URI=mongodb+srv://multimart_user:Ayishatu123@cluster0.gxblr43.mongodb.net/multimart?retryWrites=true&w=majority&appName=Cluster0
```

### Option 2: Use Local MongoDB (Fallback)
If Atlas keeps failing, switch back to local:

```env
MONGODB_URI=mongodb://localhost:27017/multimart
```

Then start local MongoDB:
```bash
net start MongoDB
```

## 📊 Check Backend Logs

When you start the backend, look for:

**✅ Success:**
```
✅ MongoDB Connected: cluster0-shard-00-00.gxblr43.mongodb.net
```

**❌ Error:**
```
❌ MongoDB Connection Error: ...
```

If you see an error, share it with me!

## 🆘 Still Not Working?

Try these commands to test connection:

```bash
# Test with mongosh
mongosh "mongodb+srv://harunadramani5_db_user:Ayishatu@cluster0.gxblr43.mongodb.net/multimart"
```

Or create a test file `test-connection.js`:
```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://harunadramani5_db_user:Ayishatu@cluster0.gxblr43.mongodb.net/multimart?retryWrites=true&w=majority')
  .then(() => {
    console.log('✅ Connected!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
```

Run it:
```bash
cd backend
node test-connection.js
```

---

**Most likely fix: Whitelist your IP in Network Access!**
