# Implementation Plan

## Backend Implementation

- [x] 1. Initialize backend project and configure core dependencies



  - Create Node.js project with Express.js framework
  - Install and configure MongoDB connection with Mongoose
  - Set up environment variables for database, JWT secret, and API keys
  - Configure CORS, helmet, and security middleware
  - Create basic server.js with health check endpoint
  - _Requirements: All requirements depend on this foundation_

- [x] 2. Implement authentication system




- [ ] 2.1 Create User modz''el with password hashing
  - Define User schema with email, password, role, addresses, and verification fields
  - Implement pre-save hook for bcrypt password hashing
  - Add methods for password comparison and JWT token generation
  - _Requirements: 1.1, 1.2, 1.3, 1.4_


- [ ] 2.2 Build authentication controllers and routes
  - Implement register endpoint with email validation and duplicate checking
  - Create login endpoint with credential verification and JWT token issuance
  - Build password reset flow with token generation and email sending
  - Add logout endpoint for token invalidation

  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 2.3 Create JWT authentication middleware
  - Write middleware to verify JWT tokens from request headers
  - Implement role-based authorization middleware for customer, vendor, and admin

  - Add error handling for expired or invalid tokens
  - _Requirements: 1.2, 8.1, 13.1_





- [ ] 2.4 Write authentication tests
  - Create unit tests for password hashing and token generation
  - Write integration tests for register, login, and password reset flows
  - _Requirements: 1.1, 1.2, 1.3_


- [ ] 3. Implement vendor and store management
- [ ] 3.1 Create Vendor and Store models
  - Define Vendor schema with business details, documents, and verification status
  - Create Store schema with vendor reference, name, logo, and analytics fields

  - Add unique indexes on email and store name
  - _Requirements: 8.1, 8.5, 9.1, 9.5_

- [ ] 3.2 Build vendor registration and verification endpoints
  - Create vendor registration endpoint with business validation
  - Implement admin approval/rejection endpoints with email notifications

  - Add vendor profile update endpoint with authentication check
  - _Requirements: 8.1, 8.2, 8.3, 8.4_





- [ ] 3.3 Implement store creation and management
  - Create store creation endpoint with vendor authentication
  - Build store update endpoint with logo upload to cloud storage
  - Add store profile retrieval endpoint with product count and ratings

  - Implement slug generation for unique store URLs
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 3.4 Write vendor and store management tests
  - Test vendor registration and approval workflows
  - Verify store creation and update operations

  - _Requirements: 8.1, 9.1_

- [ ] 4. Implement product catalog system
- [ ] 4.1 Create Category and Product models
  - Define Category schema with name, slug, and parent category support
  - Create Product schema with store reference, pricing, images, stock, and status
  - Add indexes on category, status, and vendor for efficient queries

  - Implement virtual field for calculated final price with discount
  - _Requirements: 2.1, 10.1, 10.4, 12.1, 12.2_

- [ ] 4.2 Build product CRUD endpoints for vendors
  - Create product creation endpoint with image upload to cloud storage
  - Implement product update endpoint with stock and pricing modifications

  - Add product deletion endpoint with soft delete (retain in orders)
  - Build product listing endpoint filtered by vendor's store
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_





- [ ] 4.3 Implement product browsing and search for customers
  - Create public product listing endpoint with pagination
  - Add category-based filtering with query parameters
  - Implement search endpoint with text indexing on name and description
  - Build advanced filtering for price range, rating, and store
  - Add product details endpoint with reviews and store information

  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 4.4 Implement stock management logic
  - Add stock decrement on order confirmation
  - Create stock increment on order cancellation
  - Implement automatic out-of-stock status when quantity reaches zero

  - Build low stock alert email notification for vendors
  - _Requirements: 12.3, 12.4, 12.5_





- [ ] 4.5 Write product management tests
  - Test product CRUD operations with vendor authentication
  - Verify search and filtering functionality
  - Test stock management logic
  - _Requirements: 2.2, 10.1, 12.3_


- [ ] 5. Implement shopping cart functionality
- [ ] 5.1 Create Cart model and cart management service
  - Define Cart schema with customer reference, items array, and expiration
  - Implement add-to-cart logic with stock availability validation
  - Create update quantity logic with price recalculation
  - Build remove item and clear cart operations

  - _Requirements: 3.1, 3.2_

- [ ] 5.2 Build cart API endpoints
  - Create endpoint to retrieve user's cart with populated product details
  - Implement add item endpoint with duplicate item handling
  - Add update quantity endpoint with validation

  - Build remove item and clear cart endpoints
  - _Requirements: 3.1, 3.2_

- [ ] 5.3 Write cart functionality tests
  - Test cart operations with stock validation
  - Verify price calculations

  - _Requirements: 3.1, 3.2_

- [x] 6. Implement order management system




- [ ] 6.1 Create Order model with status tracking
  - Define Order schema with items, customer, shipping address, and payment details
  - Add status history array for tracking order lifecycle
  - Implement order number generation with unique identifier
  - Create indexes on customer, status, and payment status

  - _Requirements: 5.1, 5.2, 5.5, 11.1_

- [ ] 6.2 Build order creation and checkout flow
  - Create order creation endpoint with cart validation
  - Implement stock availability check before order confirmation

  - Add shipping address validation and storage
  - Calculate order totals including tax and shipping fees
  - Clear cart after successful order creation
  - _Requirements: 3.3, 3.4, 5.1_

- [ ] 6.3 Implement order status management
  - Create endpoint for vendors to update order status

  - Build order cancellation endpoint for customers
  - Add status history tracking with timestamps and user references
  - Implement email notifications on status changes
  - _Requirements: 5.2, 5.3, 5.5, 11.3, 11.4_

- [ ] 6.4 Build order retrieval and tracking endpoints
  - Create customer order history endpoint with pagination
  - Implement order details endpoint with full item information
  - Add vendor order listing filtered by their products
  - Build admin endpoint for all orders with filtering
  - _Requirements: 5.1, 5.4, 11.2_

- [ ] 6.5 Write order management tests
  - Test order creation with stock validation
  - Verify status update workflows
  - Test order cancellation logic
  - _Requirements: 5.1, 5.2, 5.5_

- [ ] 7. Integrate payment gateway
- [ ] 7.1 Configure payment service (Paystack/Flutterwave/Stripe)
  - Install payment gateway SDK
  - Configure API keys and webhook secrets in environment variables
  - Create payment service wrapper for initialization and verification
  - _Requirements: 4.1, 4.2_

- [ ] 7.2 Build payment initialization endpoint
  - Create endpoint to initialize payment with order details
  - Generate payment reference and store in order
  - Return payment gateway redirect URL to frontend
  - _Requirements: 4.2_

- [ ] 7.3 Implement payment verification and webhook handler
  - Create webhook endpoint to receive payment notifications
  - Verify webhook signature for security
  - Update order payment status on successful payment
  - Send confirmation emails to customer and vendor
  - Handle payment failures with appropriate error messages
  - _Requirements: 4.3, 4.4, 4.5_

- [ ] 7.4 Write payment integration tests
  - Test payment initialization with mock gateway
  - Verify webhook handling and signature validation
  - _Requirements: 4.2, 4.3_

- [ ] 8. Implement reviews and ratings system
- [ ] 8.1 Create Review model
  - Define Review schema with product, customer, order, rating, and comment
  - Add verified purchase flag based on order confirmation
  - Create indexes on product and customer
  - _Requirements: 6.1, 6.4_

- [ ] 8.2 Build review submission and management endpoints
  - Create review submission endpoint with order verification
  - Implement duplicate review prevention per product per customer
  - Add review update and delete endpoints for review owners
  - Build product reviews retrieval endpoint with sorting
  - _Requirements: 6.1, 6.4, 6.5_

- [ ] 8.3 Implement rating aggregation logic
  - Calculate and update product average rating on new reviews
  - Update product total review count
  - Recalculate ratings on review updates or deletions
  - _Requirements: 6.2_

- [ ] 8.4 Write review system tests
  - Test review submission with purchase verification
  - Verify rating calculations
  - Test duplicate prevention
  - _Requirements: 6.1, 6.2, 6.4_

- [ ] 9. Implement wishlist functionality
- [ ] 9.1 Create Wishlist model and endpoints
  - Define Wishlist schema with customer reference and product array
  - Create add to wishlist endpoint with duplicate checking
  - Implement remove from wishlist endpoint
  - Build get wishlist endpoint with populated product details
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 9.2 Add wishlist price alert notifications
  - Create scheduled job to check wishlist item prices
  - Implement email notification for price reductions
  - Add discount notification for wishlist items
  - _Requirements: 7.4_

- [ ] 9.3 Write wishlist tests
  - Test add and remove operations
  - Verify duplicate prevention
  - _Requirements: 7.1, 7.3_

- [ ] 10. Implement admin dashboard and management
- [ ] 10.1 Build admin analytics endpoints
  - Create dashboard endpoint with total users, vendors, products, and orders
  - Implement sales analytics with revenue calculations and trends
  - Add user activity metrics with registration and traffic data
  - Build filtering by date range, category, and vendor
  - _Requirements: 13.1, 13.2, 13.3, 13.4_

- [ ] 10.2 Create admin user and vendor management endpoints
  - Build user listing endpoint with pagination and search
  - Implement user status update endpoint (suspend/activate)
  - Create vendor listing with verification status and sales data
  - Add vendor approval and rejection endpoints with email notifications
  - Build vendor suspension endpoint with product hiding
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

- [ ] 10.3 Implement admin category and product management
  - Create category CRUD endpoints with validation
  - Add category deletion with product reassignment requirement
  - Build admin product listing across all stores
  - Implement product removal endpoint with vendor notification
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

- [ ] 10.4 Write admin functionality tests
  - Test analytics calculations
  - Verify user and vendor management operations
  - Test category management with product reassignment
  - _Requirements: 13.1, 14.1, 15.1_

- [ ] 11. Implement image upload and storage
- [ ] 11.1 Configure cloud storage service (Cloudinary/Firebase)
  - Install cloud storage SDK
  - Configure API credentials in environment variables
  - Create image service wrapper for upload, delete, and transformation
  - _Requirements: 17.1_

- [ ] 11.2 Build image upload middleware and endpoints
  - Create multer middleware for file upload handling
  - Implement image validation for type, size, and dimensions
  - Add image optimization and resizing logic
  - Generate multiple image sizes (thumbnail, medium, large)
  - Build image deletion cleanup on resource removal

  - _Requirements: 17.2, 17.3, 17.4, 17.5_

- [ ] 11.3 Write image upload tests
  - Test file validation logic
  - Verify image optimization
  - _Requirements: 17.2, 17.3_

- [ ] 12. Implement email notification service
- [ ] 12.1 Configure email service (SendGrid/NodeMailer)
  - Install email service library
  - Configure SMTP credentials or API keys
  - Create email service wrapper with template support
  - _Requirements: 1.1, 4.3, 5.3_

- [ ] 12.2 Create email templates and notification triggers
  - Build email templates for registration verification
  - Create order confirmation and status update templates
  - Add vendor notification templates for new orders
  - Implement password reset email template
  - Add low stock alert template for vendors
  - _Requirements: 1.1, 4.3, 5.3, 11.4, 12.5_

- [ ] 12.3 Write email service tests
  - Test email sending with mock service
  - Verify template rendering
  - _Requirements: 1.1, 4.3_

- [ ] 13. Implement vendor sales analytics
- [ ] 13.1 Build vendor analytics endpoints
  - Create sales dashboard endpoint with total revenue and order count
  - Implement top-selling products calculation for vendor's store
  - Add revenue trends over time with date grouping
  - Build order statistics by status
  - _Requirements: 11.5_

- [ ] 13.2 Write vendor analytics tests
  - Test revenue calculations
  - Verify top products logic
  - _Requirements: 11.5_

## Frontend Implementation

- [x] 14. Initialize frontend project and setup

- [ ] 14.1 Create React application with routing
  - Initialize React project with Vite or Create React App
  - Install and configure React Router for navigation
  - Set up Tailwind CSS with custom configuration
  - Create basic folder structure for components, pages, and services
  - _Requirements: 16.1, 18.2_

- [ ] 14.2 Configure API client and authentication context
  - Create axios instance with base URL and interceptors
  - Implement AuthContext for global authentication state
  - Add token storage and retrieval from localStorage
  - Create protected route wrapper component
  - _Requirements: 1.2_

- [ ] 14.3 Implement theme context for dark mode
  - Create ThemeContext with light/dark mode toggle
  - Add theme persistence to localStorage
  - Implement Tailwind dark mode classes
  - _Requirements: 18.5_

- [ ] 14.4 Write frontend setup tests
  - Test protected route logic
  - Verify theme toggle functionality
  - _Requirements: 1.2, 18.5_

- [ ] 15. Build authentication UI components
- [ ] 15.1 Create login and registration pages
  - Build login form with email and password inputs
  - Create registration form with validation
  - Add form error handling and display
  - Implement loading states during API calls
  - Add redirect to home after successful authentication
  - _Requirements: 1.1, 1.2_

- [ ] 15.2 Implement password reset flow
  - Create forgot password page with email input
  - Build reset password page with token validation
  - Add success and error notifications
  - _Requirements: 1.3_

- [ ] 15.3 Build user profile page
  - Create profile view with user information display
  - Implement profile edit form with validation
  - Add address management (add, edit, delete, set default)
  - _Requirements: 1.1_

- [ ] 15.4 Write authentication UI tests
  - Test form validation logic
  - Verify redirect behavior
  - _Requirements: 1.1, 1.2_

- [ ] 16. Build common UI components
- [x] 16.1 Create reusable layout components



  - Build Header component with logo, navigation, and user menu
  - Create Footer component with links and information
  - Implement Navbar with category links and search bar
  - Add responsive mobile menu with hamburger toggle



  - _Requirements: 16.2, 18.1, 18.4_

- [ ] 16.2 Build utility components
  - Create Button component with variants and loading states
  - Implement Modal component with overlay and close functionality
  - Build Loader/Spinner component for loading states
  - Create Toast notification component for messages
  - Add Pagination component for list views
  - _Requirements: 18.2, 18.3_

- [x] 16.3 Write common component tests



  - Test button variants and states
  - Verify modal open/close behavior
  - _Requirements: 18.2_




- [-] 17. Implement product browsing and search UI



- [ ] 17.1 Create product listing page
  - Build ProductGrid component to display product cards
  - Create ProductCard component with image, title, price, and rating



  - Implement pagination controls
  - Add loading skeleton for better UX


  - _Requirements: 2.1, 2.4_

- [ ] 17.2 Build product filtering and search
  - Create SearchBar component with autocomplete
  - Implement ProductFilter component with category, price, and rating filters


  - Add filter state management and URL query parameters
  - Build category navigation menu
  - _Requirements: 2.2, 2.3_

- [ ] 17.3 Create product details page
  - Build product image gallery with zoom functionality
  - Display product information, specifications, and pricing
  - Add quantity selector and add-to-cart button
  - Implement add-to-wishlist button
  - Show product reviews section
  - Display store information with link to store page
  - _Requirements: 2.5_

- [ ] 17.4 Write product browsing tests
  - Test product card rendering
  - Verify filter application
  - Test search functionality
  - _Requirements: 2.1, 2.2, 2.3_

- [ ] 18. Build shopping cart and checkout UI
- [x] 18.1 Create cart page and components



  - Build CartItem component with image, details, quantity controls, and remove button
  - Create CartSummary component with subtotal, tax, shipping, and total
  - Implement quantity update with debouncing
  - Add empty cart state with call-to-action



  - _Requirements: 3.1, 3.2_

- [ ] 18.2 Implement checkout flow
  - Create CheckoutForm with shipping address inputs
  - Add address selection from saved addresses
  - Build order summary review section
  - Implement payment method selection
  - Add form validation for required fields
  - _Requirements: 3.3_

- [ ] 18.3 Integrate payment gateway UI
  - Implement payment initialization on checkout submission
  - Handle redirect to payment gateway
  - Create payment callback page for success/failure
  - Display payment status and order confirmation
  - _Requirements: 4.2, 4.3, 4.4_

- [ ] 18.4 Write cart and checkout tests
  - Test cart item operations

  - Verify checkout form validation
  - Test payment flow with mock gateway
  - _Requirements: 3.1, 3.3, 4.2_

- [ ] 19. Implement order tracking and history UI
- [x] 19.1 Create orders page


  - Build order list with status badges and dates
  - Implement order filtering by status
  - Add pagination for order history
  - Create empty state for no orders
  - _Requirements: 5.1_




- [ ] 19.2 Build order details page
  - Display order items with images and details
  - Show order status timeline with history
  - Display shipping address and payment information


  - Add cancel order button for eligible orders
  - Show tracking number when available
  - _Requirements: 5.4, 5.5_

- [ ] 19.3 Write order UI tests
  - Test order list rendering
  - Verify order details display
  - Test cancel order functionality
  - _Requirements: 5.1, 5.4, 5.5_





- [ ] 20. Build reviews and wishlist UI
- [ ] 20.1 Create product review components
  - Build review submission form with rating stars and text input
  - Create review list component with user info and dates
  - Implement review edit and delete functionality
  - Add review sorting options
  - _Requirements: 6.1, 6.3, 6.5_

- [ ] 20.2 Implement wishlist page
  - Create wishlist grid with product cards
  - Add remove from wishlist button
  - Implement add to cart from wishlist
  - Show price change indicators
  - Add empty wishlist state
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 20.3 Write review and wishlist tests
  - Test review submission
  - Verify wishlist operations
  - _Requirements: 6.1, 7.1_

- [ ] 21. Build vendor portal UI
- [ ] 21.1 Create vendor registration and onboarding
  - Build vendor registration form with business details
  - Add document upload functionality
  - Create pending approval status page
  - Implement approval/rejection notification display
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 21.2 Build vendor dashboard
  - Create dashboard with sales metrics and charts
  - Display recent orders list
  - Show top-selling products
  - Add quick action buttons for common tasks
  - _Requirements: 11.5_

- [ ] 21.3 Implement store management UI
  - Create store profile form with logo upload
  - Build store preview page
  - Add store settings page
  - _Requirements: 9.1, 9.2, 9.3_

- [ ] 21.4 Build product management interface
  - Create product list table with search and filters
  - Implement product creation form with image upload
  - Build product edit form with all fields
  - Add stock management controls
  - Create discount and pricing controls
  - _Requirements: 10.1, 10.2, 10.3, 12.1, 12.2_

- [ ] 21.5 Create vendor order management UI
  - Build order list filtered by vendor's products
  - Implement order status update controls
  - Add order details view for vendors
  - Create order notifications
  - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [ ] 21.6 Write vendor portal tests
  - Test vendor registration flow
  - Verify product management operations
  - Test order status updates
  - _Requirements: 8.1, 10.1, 11.3_

- [ ] 22. Build admin portal UI
- [ ] 22.1 Create admin dashboard
  - Build analytics dashboard with key metrics
  - Implement charts for sales trends and revenue
  - Display user activity statistics
  - Add filtering controls for date range and categories
  - _Requirements: 13.1, 13.2, 13.3, 13.4_

- [ ] 22.2 Implement user management interface
  - Create user list table with search and pagination
  - Add user status toggle controls
  - Build user details modal
  - Implement user filtering by status and date
  - _Requirements: 14.1, 14.2, 14.5_

- [ ] 22.3 Build vendor management interface
  - Create vendor list with verification status
  - Implement vendor approval/rejection controls with reason input
  - Add vendor suspension functionality
  - Build vendor details view with sales data
  - _Requirements: 14.3, 14.4, 14.5_

- [ ] 22.4 Create category management UI
  - Build category list with hierarchy display
  - Implement category creation and edit forms
  - Add category deletion with product reassignment modal
  - _Requirements: 15.1, 15.2_

- [ ] 22.5 Implement admin product oversight
  - Create product list across all stores
  - Add product filtering by store, category, and status
  - Implement product removal with vendor notification
  - _Requirements: 15.3, 15.4, 15.5_

- [ ] 22.6 Write admin portal tests
  - Test analytics rendering
  - Verify user management operations
  - Test vendor approval workflow
  - _Requirements: 13.1, 14.1, 14.3_

- [ ] 23. Implement responsive design and animations
- [-] 23.1 Optimize for mobile devices



  - Ensure all pages render correctly on mobile screens (320px+)
  - Implement touch-optimized controls and buttons
  - Add mobile-specific navigation patterns
  - Test on various screen sizes and devices
  - _Requirements: 16.1, 16.2, 16.3_




- [ ] 23.2 Add animations and transitions
  - Implement smooth page transitions
  - Add product card hover effects
  - Create modal fade-in/fade-out animations
  - Add loading animations for async operations
  - Ensure animations complete within 300ms






  - _Requirements: 18.3_

- [ ] 23.3 Write responsive design tests
  - Test mobile rendering
  - Verify touch interactions
  - _Requirements: 16.1, 16.2_

- [ ] 24. Implement home page and branding
- [ ] 24.1 Create home page components
  - Build hero section with featured products or promotions
  - Create category showcase section
  - Add featured stores section
  - Implement trending products section
  - Build newsletter signup component
  - _Requirements: 2.1, 18.1_

- [ ] 24.2 Add MultiMart branding elements
  - Design and add MultiMart logo to header
  - Implement consistent color scheme with Tailwind config
  - Add brand typography and spacing
  - Create favicon and meta tags
  - _Requirements: 18.1, 18.2_

- [ ] 24.3 Write home page tests
  - Test hero section rendering
  - Verify category showcase
  - _Requirements: 18.1_

## Integration and Deployment

- [ ] 25. Connect frontend to backend APIs
- [ ] 25.1 Implement all API service functions
  - Create authService with login, register, and password reset functions
  - Build productService with browse, search, and details functions
  - Implement cartService with add, update, and remove functions
  - Create orderService with create, list, and details functions
  - Add vendorService for vendor-specific operations
  - Build adminService for admin operations
  - _Requirements: All API requirements_

- [ ] 25.2 Add error handling and loading states
  - Implement global error boundary
  - Add API error handling with user-friendly messages
  - Create loading states for all async operations
  - Add retry logic for failed requests
  - _Requirements: All requirements_

- [ ] 25.3 Write API integration tests
  - Test API service functions with mock responses
  - Verify error handling
  - _Requirements: All API requirements_

- [ ] 26. Setup deployment infrastructure
- [ ] 26.1 Configure backend deployment
  - Create Dockerfile for backend containerization
  - Set up environment variables on hosting platform
  - Configure MongoDB Atlas connection
  - Set up health check endpoints
  - Deploy backend to Render/Railway/AWS
  - _Requirements: All backend requirements_

- [ ] 26.2 Configure frontend deployment
  - Build production-optimized frontend bundle
  - Set up environment variables for API URL
  - Configure Vercel/Netlify deployment
  - Set up custom domain (if applicable)
  - Enable CDN and caching
  - _Requirements: All frontend requirements_

- [ ] 26.3 Configure cloud services
  - Set up Cloudinary/Firebase Storage account
  - Configure payment gateway (Paystack/Flutterwave/Stripe) in production mode
  - Set up email service (SendGrid/SMTP)
  - Configure monitoring and logging services
  - _Requirements: 4.1, 17.1_

- [ ] 26.4 Write deployment verification tests
  - Test production API endpoints
  - Verify frontend deployment
  - Test payment gateway integration
  - _Requirements: All requirements_

- [ ] 27. Final integration testing and polish
- [ ] 27.1 Perform end-to-end testing
  - Test complete user registration and shopping flow
  - Verify vendor registration and product management flow
  - Test admin approval and management workflows
  - Validate payment processing with test transactions
  - Test email notifications across all flows
  - _Requirements: All requirements_

- [ ] 27.2 Optimize performance
  - Implement database query optimization with indexes
  - Add caching for frequently accessed data
  - Optimize image loading with lazy loading
  - Minimize bundle size with code splitting
  - Test page load times and optimize
  - _Requirements: 16.4_

- [ ] 27.3 Security audit and fixes
  - Review authentication and authorization logic
  - Test for common vulnerabilities (XSS, CSRF, SQL injection)
  - Verify payment security measures
  - Test rate limiting on sensitive endpoints
  - Review environment variable security
  - _Requirements: All requirements_

- [ ] 27.4 Write comprehensive integration tests
  - Create E2E tests for critical user journeys
  - Test cross-browser compatibility
  - Verify mobile responsiveness
  - _Requirements: All requirements_
 