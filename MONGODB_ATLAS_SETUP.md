# 🌐 MongoDB Atlas Setup - Final Steps

## ✅ Your Cluster Information

- **Cluster URL:** cluster0.gxblr43.mongodb.net
- **Username:** harunadramani5_db_user
- **Database:** multimart
- **App Name:** Cluster0

## 🔑 Step 1: Update Your Password

You need to replace `<db_password>` in your `backend/.env` file with your actual MongoDB Atlas password.

### Open `backend/.env` and update this line:

**Current:**
```env
MONGODB_URI=mongodb+srv://harunadramani5_db_user:<db_password>@cluster0.gxblr43.mongodb.net/multimart?retryWrites=true&w=majority&appName=Cluster0
```

**Replace `<db_password>` with your actual password:**
```env
MONGODB_URI=mongodb+srv://harunadramani5_db_user:YourActualPassword@cluster0.gxblr43.mongodb.net/multimart?retryWrites=true&w=majority&appName=Cluster0
```

### ⚠️ Important: URL Encode Special Characters

If your password contains special characters, encode them:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- `%` becomes `%25`
- `&` becomes `%26`

**Example:**
- Password: `MyPass@123` 
- Encoded: `MyPass%40123`

## 🌐 Step 2: Whitelist Your IP Address

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Click on **"Network Access"** in the left sidebar
3. Click **"Add IP Address"**
4. Select **"Allow Access from Anywhere"** (for development)
5. Click **"Confirm"**

## 🧪 Step 3: Test Your Connection

After updating the password:

```bash
cd backend
npm start
```

**You should see:**
```
✅ MongoDB Connected: cluster0-shard-00-00.gxblr43.mongodb.net
🚀 Server running on port 8000
```

## 🚀 Step 4: Start Your Application

### Terminal 1 - Backend:
```bash
cd backend
npm start
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

### Open Browser:
http://localhost:3000

## 🔧 Troubleshooting

### Error: "Authentication failed"
- Check your password is correct
- Make sure special characters are URL encoded
- Verify the username is: `harunadramani5_db_user`

### Error: "Connection timeout"
- Check your internet connection
- Whitelist your IP in Network Access
- Try "Allow Access from Anywhere"

### Error: "MongoServerError: bad auth"
- Your password is incorrect
- Go to MongoDB Atlas → Database Access
- Reset the password for `harunadramani5_db_user`
- Update the `.env` file with the new password

## 📊 View Your Data

Once connected, you can view your data in:

1. **MongoDB Atlas Dashboard**
   - Go to https://cloud.mongodb.com
   - Click "Browse Collections"
   - Select database: `multimart`

2. **MongoDB Compass**
   - Download: https://www.mongodb.com/try/download/compass
   - Connect with your connection string
   - View and edit data visually

## ✅ What's Next?

After successful connection:
1. Register a new user at http://localhost:3000/register
2. Login and explore the application
3. Your data will be stored in MongoDB Atlas (cloud)
4. No need to run local MongoDB anymore!

---

**Need your MongoDB Atlas password?**
- Go to MongoDB Atlas → Database Access
- Click "Edit" on your user
- Click "Edit Password"
- Set a new password and update your `.env` file
