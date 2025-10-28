import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Stores from './pages/Stores';
import StoreDetails from './pages/StoreDetails';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Returns from './pages/Returns';
import Shipping from './pages/Shipping';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import VendorRegister from './pages/vendor/VendorRegister';
import VendorLogin from './pages/vendor/VendorLogin';
import VendorGuide from './pages/vendor/VendorGuide';
import VendorSupport from './pages/vendor/VendorSupport';
import VendorDashboard from './pages/vendor/VendorDashboard';
import VendorProducts from './pages/vendor/VendorProducts';
import VendorProductForm from './pages/vendor/VendorProductForm';
import VendorOrders from './pages/vendor/VendorOrders';
import VendorStore from './pages/vendor/VendorStore';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminVendors from './pages/admin/AdminVendors';
import AdminCategories from './pages/admin/AdminCategories';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout showNavbar={false}><Login /></Layout>} />
        <Route path="/register" element={<Layout showNavbar={false}><Register /></Layout>} />
        <Route path="/forgot-password" element={<Layout showNavbar={false}><ForgotPassword /></Layout>} />
        <Route path="/reset-password" element={<Layout showNavbar={false}><ResetPassword /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/products" element={<Layout><Products /></Layout>} />
        <Route path="/products/:id" element={<Layout><ProductDetails /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
        <Route path="/orders" element={<Layout><Orders /></Layout>} />
        <Route path="/orders/:id" element={<Layout><OrderDetails /></Layout>} />
        <Route path="/wishlist" element={<Layout><Wishlist /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/stores" element={<Layout><Stores /></Layout>} />
        <Route path="/stores/:id" element={<Layout><StoreDetails /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/help" element={<Layout><Help /></Layout>} />
        <Route path="/returns" element={<Layout><Returns /></Layout>} />
        <Route path="/shipping" element={<Layout><Shipping /></Layout>} />
        <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
        <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
        
        {/* Vendor Routes */}
        <Route path="/vendor/register" element={<Layout><VendorRegister /></Layout>} />
        <Route path="/vendor/login" element={<Layout><VendorLogin /></Layout>} />
        <Route path="/vendor/guide" element={<Layout><VendorGuide /></Layout>} />
        <Route path="/vendor/support" element={<Layout><VendorSupport /></Layout>} />
        <Route path="/vendor/dashboard" element={<Layout><VendorDashboard /></Layout>} />
        <Route path="/vendor/products" element={<Layout><VendorProducts /></Layout>} />
        <Route path="/vendor/products/add" element={<Layout><VendorProductForm /></Layout>} />
        <Route path="/vendor/products/edit/:id" element={<Layout><VendorProductForm /></Layout>} />
        <Route path="/vendor/orders" element={<Layout><VendorOrders /></Layout>} />
        <Route path="/vendor/store" element={<Layout><VendorStore /></Layout>} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Layout><AdminDashboard /></Layout>} />
        <Route path="/admin/users" element={<Layout><AdminUsers /></Layout>} />
        <Route path="/admin/vendors" element={<Layout><AdminVendors /></Layout>} />
        <Route path="/admin/categories" element={<Layout><AdminCategories /></Layout>} />
        <Route path="/admin/products" element={<Layout><AdminProducts /></Layout>} />
        <Route path="/admin/orders" element={<Layout><AdminOrders /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
