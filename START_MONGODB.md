# How to Start MongoDB

Your MultiMart application needs MongoDB to be running. Here are the easiest ways to start it:

## ✅ Method 1: Using Services (Easiest)

1. Press **Windows + R**
2. Type: `services.msc`
3. Press **Enter**
4. Scroll down and find **"MongoDB Server"**
5. **Right-click** on it
6. Click **"Start"**

✅ Done! MongoDB is now running.

---

## ✅ Method 2: Using Command Prompt (Admin)

1. **Right-click** on **Command Prompt** or **PowerShell**
2. Select **"Run as Administrator"**
3. Type one of these commands:

**For Command Prompt:**
```cmd
net start MongoDB
```

**For PowerShell:**
```powershell
Start-Service MongoDB
```

✅ Done! MongoDB is now running.

---

## ✅ Method 3: Using Task Manager

1. Press **Ctrl + Shift + Esc** to open Task Manager
2. Go to the **"Services"** tab
3. Find **"MongoDB"** in the list
4. **Right-click** → **"Start"**

✅ Done! MongoDB is now running.

---

## 🔍 How to Check if MongoDB is Running

After starting MongoDB, check your backend console. You should see:

```
MongoDB Connected: localhost
```

If you see this, MongoDB is working! ✅

---

## ⚠️ Troubleshooting

### If MongoDB service doesn't exist:

You may need to install MongoDB. Download from:
https://www.mongodb.com/try/download/community

### Alternative: Use MongoDB Atlas (Cloud - Free)

If you don't want to install MongoDB locally:

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free cluster
4. Get your connection string
5. Update `backend/.env` file:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   ```

---

## 🚀 After MongoDB Starts

1. Your backend will automatically connect
2. Registration and login will work
3. Products will load
4. All features will be functional!

**Your MultiMart is ready to use!** 🎉
