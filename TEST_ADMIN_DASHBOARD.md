# 🧪 Test Admin Dashboard - Quick Guide

## Prerequisites

1. Backend server running: `cd backend && npm run dev`
2. Frontend server running: `cd frontend && npm start`
3. Admin account created (see HOW_TO_LOGIN_AS_ADMIN.md)

## Test Steps

### 1. Login as Admin

1. Navigate to http://localhost:3000/admin/login
2. Login with admin credentials:
   - Email: `admin@multimart.com`
   - Password: `Admin123`

### 2. Test Dashboard Page

**URL**: http://localhost:3000/admin/dashboard

**What to Check**:
- ✅ Statistics cards display (Users, Vendors, Products, Revenue)
- ✅ Order overview section shows counts
- ✅ Vendor status section shows breakdown
- ✅ Product status section shows counts
- ✅ Recent activity feed displays
- ✅ Quick action buttons work

**Expected Result**: Dashboard loads with all statistics and data

### 3. Test User Management

**URL**: http://localhost:3000/admin/users

**What to Check**:
- ✅ User list displays
- ✅ Search box works
- ✅ Role filter works (Customer, Vendor, Admin)
- ✅ Status filter works (Active, Suspended)
- ✅ Suspend/Activate button works
- ✅ Pagination works (if more than 10 users)

**Test Actions**:
1. Search for a user by name
2. Filter by role
3. Try suspending a user
4. Try activating a suspended user

### 4. Test Vendor Management

**URL**: http://localhost:3000/admin/vendors

**What to Check**:
- ✅ Vendor list displays
- ✅ Status filter works
- ✅ Store name shows
- ✅ Product count shows
- ✅ Approve/Reject buttons work (for pending vendors)
- ✅ Suspend/Activate buttons work
- ✅ Pagination works

**Test Actions**:
1. Filter by status (Pending, Approved, Suspended)
2. If you have pending vendors, try approving one
3. Try suspending an approved vendor
4. Try activating a suspended vendor

### 5. Test Product Management

**URL**: http://localhost:3000/admin/products

**What to Check**:
- ✅ Product list displays
- ✅ Product images show
- ✅ Search works
- ✅ Vendor name shows
- ✅ Category shows
- ✅ Price and stock display
- ✅ Delete button works
- ✅ Pagination works

**Test Actions**:
1. Search for a product
2. Try deleting a product (confirm the action)
3. Verify product is removed from list

### 6. Test Category Management

**URL**: http://localhost:3000/admin/categories

**What to Check**:
- ✅ Category grid displays
- ✅ Product count shows for each category
- ✅ "Add Category" button works
- ✅ Create category form works
- ✅ Edit button works
- ✅ Update category form works
- ✅ Delete button works (with validation)

**Test Actions**:
1. Click "Add Category"
2. Fill in name and description
3. Create the category
4. Edit the category
5. Try deleting a category (should fail if it has products)
6. Create a new empty category and delete it (should succeed)

## Common Issues & Solutions

### Issue: "No data found" on all pages

**Solution**:
- Check if backend server is running
- Check MongoDB connection
- Verify you're logged in as admin
- Check browser console for errors

### Issue: "Unauthorized" error

**Solution**:
- Logout and login again
- Verify you're using admin account
- Check token in localStorage

### Issue: Statistics show 0 for everything

**Solution**:
- This is normal if database is empty
- Add some test data:
  - Register some users
  - Create vendor accounts
  - Add products
  - Place orders

### Issue: Categories page is blank

**Solution**:
- Create some categories first
- Use the "Add Category" button
- Or use the backend API to seed categories

## Quick Test Data Setup

If you need test data, run these scripts:

```bash
# Add sample products (includes vendors and stores)
cd backend
node add-sample-products.js

# This will create:
# - 2 vendors
# - 2 stores
# - 10 products
# - Categories
```

## API Testing (Optional)

You can also test the API directly using curl or Postman:

### Get Dashboard Stats
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  http://localhost:8000/api/admin/stats
```

### Get All Users
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  http://localhost:8000/api/admin/users
```

### Get All Vendors
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  http://localhost:8000/api/admin/vendors
```

### Get All Products
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  http://localhost:8000/api/admin/products
```

## Success Criteria

All tests pass if:
- ✅ All pages load without errors
- ✅ Data displays correctly
- ✅ Search and filters work
- ✅ Actions (suspend, approve, delete) work
- ✅ Pagination works
- ✅ No console errors

## Troubleshooting

### Check Backend Logs
```bash
# Backend terminal should show:
🚀 Server running in development mode on port 8000
✅ MongoDB Connected: localhost
```

### Check Frontend Console
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for failed requests

### Check MongoDB
```bash
# Connect to MongoDB and check data
mongosh
use multimart
db.users.countDocuments()
db.vendors.countDocuments()
db.products.countDocuments()
```

## Next Steps

After testing:
1. ✅ Verify all admin features work
2. ✅ Test with real data
3. ✅ Check performance with large datasets
4. ✅ Test error handling
5. ✅ Verify security (only admins can access)

---

**Status**: Ready for Testing
**Last Updated**: October 28, 2024
