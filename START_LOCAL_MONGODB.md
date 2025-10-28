# 🚀 Start Your MultiMart Application with Local MongoDB

## ✅ Simple 3-Step Process

### Step 1: Start MongoDB Service

Open **Command Prompt as Administrator** and run:

```bash
net start MongoDB
```

**Alternative methods if the above doesn't work:**

**Method 2: Start MongoDB directly**
```bash
mongod
```

**Method 3: Check if already running**
```bash
mongo
# or
mongosh
```

If you see a MongoDB shell, it's already running! Type `exit` to close.

---

### Step 2: Start Backend Server

Open a terminal in your project folder:

```bash
cd backend
npm start
```

**✅ Success looks like:**
```
✅ MongoDB Connected: localhost
🚀 Server running on port 8000
```

**❌ If you see an error:**
- Make sure MongoDB is running (Step 1)
- Check that port 8000 is not in use
- Try restarting MongoDB

---

### Step 3: Start Frontend

Open **another terminal**:

```bash
cd frontend
npm start
```

**✅ Success looks like:**
```
Compiled successfully!
Local: http://localhost:3000
```

---

## 🎉 Test Your Application

1. Open browser: **http://localhost:3000**
2. Click **"Sign Up"** or go to **http://localhost:3000/register**
3. Fill in the registration form:
   - First Name: Haruna
   - Last Name: Dramani
   - Email: harunadramani5@gmail.com
   - Phone: 0248924349
   - Password: (your secure password)
4. Click **"Create account"**

**It should work immediately!** ✅

---

## 🔧 Troubleshooting

### MongoDB Won't Start?

**Check MongoDB status:**
```bash
sc query MongoDB
```

**Start MongoDB service:**
```bash
# As Administrator
net start MongoDB
```

**Or start MongoDB directly:**
```bash
mongod --dbpath "C:\data\db"
```

### Port 8000 Already in Use?

**Find and kill the process:**
```bash
netstat -ano | findstr :8000
taskkill /PID <NUMBER> /F
```

### Backend Shows Connection Error?

1. Make sure MongoDB is running
2. Restart the backend:
   ```bash
   # Stop with Ctrl+C
   npm start
   ```

---

## 📊 View Your Database

### Option 1: MongoDB Compass (Visual Tool)
1. Download: https://www.mongodb.com/try/download/compass
2. Connect to: `mongodb://localhost:27017`
3. Database: `multimart`
4. View your data visually!

### Option 2: Command Line
```bash
mongosh
use multimart
show collections
db.users.find()
```

---

## ✅ Advantages of Local MongoDB

- ✅ No internet required
- ✅ Faster performance
- ✅ No connection issues
- ✅ No IP whitelisting needed
- ✅ Works offline
- ✅ Free and unlimited

---

## 🎯 Quick Reference

**Start Everything:**
```bash
# Terminal 1: Start MongoDB
net start MongoDB

# Terminal 2: Start Backend
cd backend
npm start

# Terminal 3: Start Frontend
cd frontend
npm start
```

**Open Application:**
http://localhost:3000

**That's it!** Your MultiMart e-commerce platform is ready! 🚀
