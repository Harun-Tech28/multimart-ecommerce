# Vendor Dashboard Guide

## Overview
The Vendor Dashboard is a complete management system for sellers on the MultiMart platform. Vendors can manage their products, orders, and store settings through an intuitive interface.

## Features

### 1. Vendor Dashboard (`/vendor/dashboard`)
- **Statistics Overview**: View total products, orders, revenue, and pending orders
- **Recent Orders**: Quick view of the latest 5 orders
- **Recent Products**: Quick view of the latest 5 products
- **Quick Actions**: Fast access to add products, manage orders, and update store settings

### 2. Product Management (`/vendor/products`)
- **Product List**: View all products in a table format
- **Search & Filter**: Search products by name and filter by status (active/inactive)
- **Toggle Status**: Quickly activate or deactivate products
- **Edit/Delete**: Manage individual products
- **Pagination**: Navigate through large product lists

### 3. Add/Edit Product (`/vendor/products/add` & `/vendor/products/edit/:id`)
- **Product Information**: Name, description, price, discount
- **Inventory**: Stock management
- **Category**: Assign products to categories
- **Images**: Add multiple product images via URLs
- **Status**: Set product as active or inactive

### 4. Order Management (`/vendor/orders`)
- **Order List**: View all orders for your products
- **Filter by Status**: Filter orders by pending, processing, shipped, delivered, cancelled
- **Customer Information**: View customer details and shipping address
- **Order Items**: See all items in each order
- **Update Status**: Change order status directly from the list

### 5. Store Settings (`/vendor/store`)
- **Store Information**: Name, description, logo, banner
- **Contact Details**: Phone and email
- **Address**: Complete store address information

## Navigation

### Sidebar Menu
The vendor dashboard includes a persistent sidebar with:
- Dashboard
- Products
- Orders
- Store Settings
- Back to Store (returns to main site)

### Header Integration
Vendors can access the dashboard from the user menu in the main header when logged in.

## Access Control
- Only users with `role: 'vendor'` can access vendor pages
- Automatic redirect to home page for non-vendor users
- All API calls require authentication token

## API Endpoints Used

### Dashboard
- `GET /api/vendor/stats` - Get vendor statistics
- `GET /api/vendor/orders?limit=5` - Get recent orders
- `GET /api/vendor/products?limit=5` - Get recent products

### Products
- `GET /api/vendor/products` - List all products (with pagination, search, filter)
- `POST /api/vendor/products` - Create new product
- `GET /api/vendor/products/:id` - Get single product
- `PUT /api/vendor/products/:id` - Update product
- `DELETE /api/vendor/products/:id` - Delete product
- `PUT /api/vendor/products/:id/status` - Toggle product status

### Orders
- `GET /api/vendor/orders` - List all orders (with pagination, filter)
- `PUT /api/vendor/orders/:id/status` - Update order status

### Store
- `GET /api/vendor/store` - Get store information
- `PUT /api/vendor/store` - Update store information

## Components Created

### Pages
1. `VendorDashboard.jsx` - Main dashboard with stats and overview
2. `VendorProducts.jsx` - Product list and management
3. `VendorProductForm.jsx` - Add/Edit product form
4. `VendorOrders.jsx` - Order list and management
5. `VendorStore.jsx` - Store settings form

### Components
1. `VendorSidebar.jsx` - Navigation sidebar for vendor pages

## Usage

### Becoming a Vendor
Users need to register with `role: 'vendor'` or have their role updated by an admin.

### Accessing the Dashboard
1. Log in as a vendor
2. Click on your profile menu in the header
3. Select "Vendor Dashboard"
4. Or navigate directly to `/vendor/dashboard`

### Managing Products
1. Go to Products from the sidebar
2. Click "Add Product" to create new products
3. Use the table to view, edit, or delete existing products
4. Toggle product status with a single click

### Managing Orders
1. Go to Orders from the sidebar
2. View all orders containing your products
3. Filter by status to find specific orders
4. Update order status using the dropdown

### Updating Store
1. Go to Store Settings from the sidebar
2. Fill in your store information
3. Add logo and banner URLs
4. Save changes

## Design Features
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Sidebar Navigation**: Persistent navigation for easy access
- **Color-Coded Status**: Visual indicators for order and product status
- **Empty States**: Helpful messages when no data is available
- **Loading States**: Smooth loading indicators
- **Confirmation Dialogs**: Prevent accidental deletions

## Next Steps
To fully implement the vendor dashboard, ensure:
1. Backend API endpoints are implemented
2. Authentication middleware is in place
3. Vendor role is properly assigned to users
4. Database models support vendor relationships
5. Image upload functionality is configured (currently using URLs)
