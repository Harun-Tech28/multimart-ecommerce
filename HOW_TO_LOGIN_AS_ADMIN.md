# 🔐 How to Login as Admin - Quick Guide

## Method 1: Register a New Admin Account (Recommended)

### Step-by-Step:

1. **Navigate to Registration Page**
   - Go to: `http://localhost:3000/register`
   - Or click "Sign Up" in the header

2. **Fill in the Registration Form**
   ```
   First Name: Admin
   Last Name: User
   Email: admin@multimart.com
   Phone: +1234567890 (optional)
   Password: Admin123!
   Confirm Password: Admin123!
   Account Type: Select "Admin" from dropdown ⭐
   ```

3. **Submit Registration**
   - Click "Create Account"
   - Wait for success message

4. **Login with Admin Credentials**
   - Go to: `http://localhost:3000/admin/login`
   - Or click the lock icon 🔒 in the header
   - Enter:
     - Email: `admin@multimart.com`
     - Password: `Admin123!`
   - Click "Sign In"

5. **Access Admin Dashboard**
   - You'll be automatically redirected to `/admin/dashboard`
   - Start managing your platform! 🎉

---

## Method 2: Update Existing User to Admin (Database)

If you already have a user account and want to make it admin:

### Using MongoDB Compass:

1. **Open MongoDB Compass**
2. **Connect to your database**
3. **Navigate to**: `multimart` → `users` collection
4. **Find your user** by email
5. **Edit the document**:
   - Change `role` field from `"customer"` to `"admin"`
6. **Save changes**
7. **Logout and login again** at `/admin/login`

### Using MongoDB Shell:

```javascript
// Connect to MongoDB
mongosh

// Switch to your database
use multimart

// Update user role to admin
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)

// Verify the change
db.users.findOne({ email: "your-email@example.com" })
```

---

## Method 3: Create Admin via Backend API (Advanced)

### Using Postman or cURL:

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@multimart.com",
    "password": "Admin123!",
    "phone": "+1234567890",
    "role": "admin"
  }'
```

Then login at `/admin/login` with the credentials.

---

## Quick Access Links

Once you have an admin account:

### Admin Portal Access:
- **Login Page**: `http://localhost:3000/admin/login`
- **Dashboard**: `http://localhost:3000/admin/dashboard`
- **Users**: `http://localhost:3000/admin/users`
- **Vendors**: `http://localhost:3000/admin/vendors`
- **Categories**: `http://localhost:3000/admin/categories`
- **Products**: `http://localhost:3000/admin/products`

### Navigation:
- **Header**: Click the lock icon 🔒 (top right)
- **Footer**: Click "Admin Portal" link (bottom, in orange)

---

## Test Admin Credentials

For quick testing, use these credentials:

```
Email: admin@multimart.com
Password: Admin123!
```

**Note**: You need to register this account first using Method 1 above.

---

## Troubleshooting

### ❌ "Access denied. Admin credentials required."
**Solution**: Your account role is not set to "admin"
- Check registration: Did you select "Admin" in Account Type?
- Check database: Verify `role` field is `"admin"` in users collection
- Try Method 2 to update existing user

### ❌ "Invalid credentials"
**Solution**: Email or password is incorrect
- Double-check email and password
- Passwords are case-sensitive
- Make sure you registered the account first

### ❌ Can't access admin pages after login
**Solution**: Role verification issue
- Open browser console (F12)
- Check localStorage: `localStorage.getItem('user')`
- Should show `"role": "admin"`
- If not, logout and login again

### ❌ Backend connection error
**Solution**: Backend server not running
- Start backend: `cd backend && npm start`
- Check MongoDB is running
- Verify backend is on port 8000

---

## What You Can Do as Admin

Once logged in as admin, you have access to:

### 📊 Dashboard
- View platform statistics
- Monitor user activity
- Track revenue and orders
- See recent platform activity

### 👥 User Management
- View all registered users
- Search and filter users
- Suspend/activate accounts
- View user details and activity

### 🏪 Vendor Management
- Approve/reject vendor applications
- Suspend/activate vendor accounts
- View vendor stores and products
- Monitor vendor performance

### 🏷️ Category Management
- Create new product categories
- Edit existing categories
- Delete unused categories
- Organize marketplace structure

### 📦 Product Oversight
- View all products from all vendors
- Search and filter products
- Remove inappropriate products
- Monitor product quality

---

## Security Best Practices

### For Production:

1. **Strong Passwords**
   - Use complex passwords (min 12 characters)
   - Include uppercase, lowercase, numbers, symbols
   - Don't use common passwords

2. **Secure Email**
   - Use a dedicated admin email
   - Enable 2FA on email account
   - Don't share credentials

3. **Access Control**
   - Limit number of admin accounts
   - Use unique credentials for each admin
   - Regularly audit admin access

4. **Monitoring**
   - Review admin activity logs
   - Monitor for suspicious behavior
   - Set up alerts for critical actions

---

## Quick Start Checklist

- [ ] Backend server is running (`npm start` in backend folder)
- [ ] MongoDB is connected
- [ ] Frontend is running (`npm start` in frontend folder)
- [ ] Navigate to `http://localhost:3000/register`
- [ ] Fill in registration form
- [ ] Select "Admin" as Account Type ⭐
- [ ] Submit registration
- [ ] Go to `http://localhost:3000/admin/login`
- [ ] Login with admin credentials
- [ ] Access admin dashboard
- [ ] Start managing your platform! 🎉

---

## Need Help?

If you're still having issues:

1. **Check Console**: Open browser console (F12) for errors
2. **Check Network**: Look at Network tab for API responses
3. **Check Backend**: Look at backend terminal for errors
4. **Check Database**: Verify user exists in MongoDB with role "admin"
5. **Check Guides**: Review ADMIN_REGISTRATION_GUIDE.md for more details

---

**You're ready to become an admin!** 🚀

Follow Method 1 above to create your admin account and start managing MultiMart.
