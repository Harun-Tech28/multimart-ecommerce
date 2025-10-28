# Admin Registration Guide

## How to Register as Admin

I've updated the registration page to allow you to register as an admin. Follow these steps:

### Step 1: Go to Registration Page

Navigate to: **http://localhost:3000/register**

### Step 2: Fill in Your Details

Fill in the registration form with your information:
- **First Name**: Your first name
- **Last Name**: Your last name
- **Email**: Your email address (this will be your login)
- **Phone**: Your phone number (optional)
- **Password**: Create a strong password (min. 8 characters)
- **Confirm Password**: Re-enter your password
- **Account Type**: **Select "Admin"** from the dropdown

### Step 3: Submit Registration

Click the "Create Account" button to register.

### Step 4: Login

After successful registration:
1. Go to **http://localhost:3000/login**
2. Enter your email and password
3. Click "Sign In"

### Step 5: Access Admin Dashboard

Once logged in:
1. Click on your profile icon in the top right
2. Select "Admin Dashboard" from the dropdown menu
3. Or navigate directly to: **http://localhost:3000/admin/dashboard**

## Admin Dashboard Features

As an admin, you'll have access to:

### 📊 Dashboard
- Platform statistics
- User metrics
- Vendor metrics
- Revenue overview
- Recent activity

### 👥 User Management (`/admin/users`)
- View all users
- Search and filter users
- Suspend/Activate accounts
- View user details

### 🏪 Vendor Management (`/admin/vendors`)
- Approve/Reject vendor applications
- Suspend/Activate vendors
- View vendor stores and products
- Monitor vendor performance

### 🏷️ Category Management (`/admin/categories`)
- Create new categories
- Edit existing categories
- Delete categories
- View product counts per category

### 📦 Product Oversight (`/admin/products`)
- View all products across all vendors
- Search products
- Delete products
- Monitor product status

### 📋 Order Management (Future)
- View all platform orders
- Monitor order status
- Handle disputes

## Quick Test Account

For testing purposes, you can create an admin account with these details:

```
First Name: Admin
Last Name: User
Email: admin@multimart.com
Password: Admin123!
Phone: (optional)
Account Type: Admin
```

## Important Notes

### Security
- Use a strong password for admin accounts
- Don't share admin credentials
- Admin accounts have full platform access

### Permissions
Admin users can:
- ✅ View all users and vendors
- ✅ Approve/reject vendors
- ✅ Suspend user accounts
- ✅ Manage categories
- ✅ Delete products
- ✅ View platform analytics
- ✅ Access all admin features

### Backend Requirements

Make sure your backend supports admin registration:

1. **User Model** should have a `role` field that accepts:
   - `customer`
   - `vendor`
   - `admin`

2. **Registration Endpoint** (`POST /api/auth/register`) should accept:
```json
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@multimart.com",
  "password": "Admin123!",
  "phone": "+1234567890",
  "role": "admin"
}
```

3. **Authentication Middleware** should check user roles for admin routes

## Troubleshooting

### Can't See Admin Dashboard Link
- Make sure you registered with role "admin"
- Check localStorage: `localStorage.getItem('user')` should show `"role": "admin"`
- Try logging out and logging back in

### Access Denied to Admin Pages
- Verify your account role is set to "admin" in the database
- Check if the backend is validating admin permissions correctly
- Look for errors in the browser console (F12)

### Backend Not Running
If you get connection errors:
1. Make sure backend is running on port 8000
2. Check MongoDB is connected
3. Verify API endpoints are working

## Alternative: Direct Database Method

If you prefer, you can also create an admin user directly in MongoDB:

```javascript
// Using MongoDB Compass or mongo shell
db.users.insertOne({
  firstName: "Admin",
  lastName: "User",
  email: "admin@multimart.com",
  password: "$2a$10$hashedPasswordHere", // Use bcrypt to hash
  role: "admin",
  phone: "+1234567890",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or update an existing user:

```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## Next Steps

After registering as admin:

1. **Explore the Dashboard**
   - Check platform statistics
   - View recent activity

2. **Manage Users**
   - Browse registered users
   - Test suspend/activate features

3. **Manage Vendors**
   - Approve pending vendor applications
   - Monitor vendor stores

4. **Manage Categories**
   - Create product categories
   - Organize the marketplace

5. **Oversee Products**
   - Monitor product listings
   - Remove inappropriate content

## Support

If you encounter any issues:
- Check browser console for errors (F12)
- Verify backend is running
- Check MongoDB connection
- Review API responses in Network tab

---

**You're all set!** Register with the "Admin" role and start managing your MultiMart platform! 🎉
