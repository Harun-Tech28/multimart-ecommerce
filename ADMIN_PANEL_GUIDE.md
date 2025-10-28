# Admin Panel Guide

## Overview
The Admin Panel is a comprehensive management system for platform administrators. Admins can oversee users, vendors, products, categories, and view platform-wide analytics.

## Features

### 1. Admin Dashboard (`/admin/dashboard`)
**Main Overview Page**

**Statistics Cards:**
- Total Users
- Total Vendors
- Total Products
- Total Revenue

**Additional Metrics:**
- Orders Overview (Total, Pending, Processing, Completed)
- Vendor Status (Active, Pending Approval, Suspended)
- Product Status (Active, Out of Stock, Total Categories)

**Recent Activity:**
- Timeline of recent platform activities
- User registrations, vendor approvals, orders, etc.

**Quick Actions:**
- Navigate to User Management
- Navigate to Vendor Management
- Navigate to Category Management
- Navigate to Product Oversight

### 2. User Management (`/admin/users`)
**Manage All Platform Users**

**Features:**
- View all users in a table format
- Search users by name or email
- Filter by role (Customer, Vendor, Admin)
- Filter by status (Active, Suspended)
- Suspend/Activate user accounts
- View user details (name, email, role, join date)
- Pagination for large user lists

**User Actions:**
- Suspend users (prevents login)
- Activate suspended users
- View user statistics

### 3. Vendor Management (`/admin/vendors`)
**Approve and Manage Vendors**

**Features:**
- View all vendors with their stores
- Filter by status (Pending, Approved, Rejected, Suspended)
- Approve pending vendor applications
- Reject vendor applications
- Suspend active vendors
- Reactivate suspended vendors
- View vendor details (store name, product count, join date)
- Pagination support

**Vendor Actions:**
- **Approve**: Activate pending vendor accounts
- **Reject**: Deny vendor applications
- **Suspend**: Temporarily disable vendor accounts
- **Activate**: Reactivate suspended vendors

### 4. Category Management (`/admin/categories`)
**Manage Product Categories**

**Features:**
- View all categories in a grid layout
- Add new categories
- Edit existing categories
- Delete categories
- View product count per category
- Modal-based add/edit forms

**Category Operations:**
- **Create**: Add new product categories
- **Edit**: Update category name and description
- **Delete**: Remove categories (with confirmation)
- View category statistics

### 5. Product Oversight (`/admin/products`)
**Monitor All Platform Products**

**Features:**
- View all products across all vendors
- Search products by name
- View product details (image, name, vendor, price, stock)
- Delete products (with vendor notification)
- View product status (Active/Inactive)
- Pagination for large product lists

**Product Actions:**
- **Delete**: Remove products from the platform
- View product vendor information
- Monitor stock levels

## Navigation

### Sidebar Menu
The admin panel includes a persistent sidebar with:
- Dashboard
- Users
- Vendors
- Categories
- Products
- Orders (placeholder for future)
- Back to Store (returns to main site)

### Header Integration
Admins can access the admin panel from the user menu in the main header when logged in with admin role.

## Access Control
- Only users with `role: 'admin'` can access admin pages
- Automatic redirect to home page for non-admin users
- All API calls require authentication token with admin privileges

## API Endpoints Used

### Dashboard
- `GET /api/admin/stats` - Get platform statistics and analytics

### Users
- `GET /api/admin/users` - List all users (with pagination, search, filters)
- `PUT /api/admin/users/:id/status` - Update user status (suspend/activate)

### Vendors
- `GET /api/admin/vendors` - List all vendors (with pagination, filters)
- `PUT /api/admin/vendors/:id/status` - Update vendor status (approve/reject/suspend/activate)

### Categories
- `GET /api/categories` - List all categories
- `POST /api/admin/categories` - Create new category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category

### Products
- `GET /api/admin/products` - List all products (with pagination, search)
- `DELETE /api/admin/products/:id` - Delete product

## Components Created

### Shared Components
1. `AdminSidebar.jsx` - Navigation sidebar for admin pages

### Pages
1. `AdminDashboard.jsx` - Main dashboard with analytics
2. `AdminUsers.jsx` - User management interface
3. `AdminVendors.jsx` - Vendor approval and management
4. `AdminCategories.jsx` - Category CRUD operations
5. `AdminProducts.jsx` - Product oversight and management

## Usage

### Accessing the Admin Panel
1. Log in as an admin user
2. Click on your profile menu in the header
3. Select "Admin Dashboard"
4. Or navigate directly to `/admin/dashboard`

### Managing Users
1. Go to Users from the sidebar
2. Use search and filters to find specific users
3. Click "Suspend" to disable a user account
4. Click "Activate" to enable a suspended account

### Managing Vendors
1. Go to Vendors from the sidebar
2. Filter by status to see pending applications
3. Click "Approve" to activate a vendor
4. Click "Reject" to deny an application
5. Click "Suspend" to temporarily disable a vendor
6. Click "Activate" to reactivate a suspended vendor

### Managing Categories
1. Go to Categories from the sidebar
2. Click "Add Category" to create a new category
3. Fill in the category name and description
4. Click "Edit" on any category to update it
5. Click "Delete" to remove a category (with confirmation)

### Managing Products
1. Go to Products from the sidebar
2. Use search to find specific products
3. View product details including vendor information
4. Click "Delete" to remove a product from the platform

## Design Features

### Responsive Layout
- Sidebar navigation on desktop
- Collapsible menu for mobile (future enhancement)
- Responsive tables and grids
- Touch-optimized buttons

### Color-Coded Status
- **Green**: Active, Approved, Success
- **Yellow**: Pending, Warning
- **Red**: Suspended, Rejected, Danger
- **Blue**: Customer, Information
- **Purple**: Admin, Special

### Empty States
- Helpful messages when no data is available
- Call-to-action buttons where appropriate

### Loading States
- Smooth loading indicators
- Skeleton screens for better UX

### Confirmation Dialogs
- Prevent accidental deletions
- Confirm status changes
- User-friendly warnings

## Statistics & Analytics

### Dashboard Metrics
- **User Metrics**: Total users, new registrations
- **Vendor Metrics**: Total vendors, pending approvals, active vendors
- **Product Metrics**: Total products, active products, out of stock
- **Revenue Metrics**: Total platform revenue
- **Order Metrics**: Total orders, pending, processing, completed

### Recent Activity Feed
- User registrations
- Vendor approvals/rejections
- Order placements
- Product additions
- System events

## Security Features

### Role-Based Access
- Only admin users can access admin panel
- Automatic redirect for unauthorized users
- Token-based authentication

### Action Confirmations
- Confirm before suspending users
- Confirm before deleting categories
- Confirm before deleting products
- Confirm vendor status changes

### Audit Trail (Future)
- Log all admin actions
- Track who made changes
- Timestamp all modifications

## Best Practices

### User Management
- Review user activity before suspension
- Provide clear reasons for account actions
- Monitor for suspicious activity

### Vendor Management
- Review vendor applications thoroughly
- Verify business information
- Communicate approval/rejection reasons
- Monitor vendor performance

### Category Management
- Keep category names clear and concise
- Add descriptions for better organization
- Check product count before deletion
- Reassign products when deleting categories

### Product Oversight
- Monitor for policy violations
- Check product quality and descriptions
- Verify pricing accuracy
- Remove inappropriate content

## Future Enhancements

### Planned Features
1. **Order Management**: View and manage all platform orders
2. **Analytics Dashboard**: Advanced charts and graphs
3. **Bulk Actions**: Perform actions on multiple items
4. **Export Data**: Download reports in CSV/PDF
5. **Email Notifications**: Automated admin alerts
6. **Activity Logs**: Detailed audit trail
7. **Advanced Filters**: More filtering options
8. **Search Improvements**: Full-text search across all entities
9. **Mobile App**: Dedicated admin mobile application
10. **Real-time Updates**: WebSocket-based live updates

### Potential Improvements
- Advanced analytics with charts (Chart.js/Recharts)
- Bulk user/vendor operations
- Email templates for notifications
- Custom admin roles and permissions
- Activity logging and audit trails
- Export functionality for reports
- Advanced search with multiple criteria
- Real-time notifications
- Dashboard customization
- Dark mode support

## Troubleshooting

### Cannot Access Admin Panel
- Verify user role is set to 'admin'
- Check authentication token is valid
- Ensure backend API is running
- Check browser console for errors

### Actions Not Working
- Verify API endpoints are implemented
- Check network requests in browser DevTools
- Ensure proper authentication headers
- Verify admin permissions on backend

### Data Not Loading
- Check backend API is running
- Verify database connection
- Check API endpoint URLs
- Review browser console for errors

## Summary

The Admin Panel provides comprehensive platform management with:
- ✅ Dashboard with analytics and statistics
- ✅ User management (suspend/activate)
- ✅ Vendor management (approve/reject/suspend)
- ✅ Category management (CRUD operations)
- ✅ Product oversight (view/delete)
- ✅ Responsive design with sidebar navigation
- ✅ Role-based access control
- ✅ Search and filter capabilities
- ✅ Pagination for large datasets
- ✅ Confirmation dialogs for critical actions
- ✅ No code errors or diagnostics issues

The admin panel is ready for backend API integration and testing!
