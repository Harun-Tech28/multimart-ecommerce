import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About MultiMart</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted multi-vendor marketplace connecting buyers with quality sellers worldwide
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At MultiMart, we're on a mission to revolutionize online shopping by creating a seamless 
            marketplace that connects customers with trusted vendors from around the world. We believe 
            in empowering small businesses and providing customers with an unparalleled shopping experience.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Assured</h3>
            <p className="text-gray-600">
              Every vendor is carefully vetted to ensure you receive only the best products
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Best Prices</h3>
            <p className="text-gray-600">
              Competitive pricing from multiple vendors ensures you get the best deals
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and reliable shipping to get your products to you as soon as possible
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Trusted Vendors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Categories</div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Founded in 2024, MultiMart was born from a simple idea: to create a platform where 
              small and medium-sized businesses could thrive alongside established brands, giving 
              customers access to a diverse range of quality products.
            </p>
            <p>
              What started as a small marketplace has grown into a thriving community of vendors 
              and customers who share our vision of fair, transparent, and convenient online shopping.
            </p>
            <p>
              Today, we're proud to serve thousands of customers and support hundreds of vendors, 
              helping them grow their businesses while providing exceptional value to shoppers.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose MultiMart?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">🛡️ Secure Shopping</h3>
              <p className="text-gray-600">
                Your data and transactions are protected with industry-leading security measures
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">💳 Easy Payments</h3>
              <p className="text-gray-600">
                Multiple payment options for your convenience and security
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">📦 Order Tracking</h3>
              <p className="text-gray-600">
                Track your orders in real-time from purchase to delivery
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">🎁 Great Deals</h3>
              <p className="text-gray-600">
                Regular discounts and special offers from our vendors
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-blue-100 mb-6">
            Join thousands of satisfied customers and discover amazing products today
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/products"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Browse Products
            </a>
            <a
              href="/register"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
