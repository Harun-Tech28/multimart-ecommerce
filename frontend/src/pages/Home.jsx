import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import { ProductSkeletonGrid } from '../components/products/ProductSkeleton';
import SearchBar from '../components/products/SearchBar';
import CryptoSupport from '../components/payment/CryptoSupport';
import RecentlyViewed from '../components/products/RecentlyViewed';
import ProductComparison from '../components/products/ProductComparison';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ products: 0, vendors: 0, customers: 0 });

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      // Fetch featured products
      const productsRes = await fetch('http://localhost:5000/api/products?limit=8&sort=rating');
      const productsData = await productsRes.json();
      if (productsData.success) {
        setFeaturedProducts(productsData.data.products || []);
      }

      // Fetch trending products
      const trendingRes = await fetch('http://localhost:5000/api/products?limit=8&sort=popular');
      const trendingData = await trendingRes.json();
      if (trendingData.success) {
        setTrendingProducts(trendingData.data.products || []);
      }

      // Fetch categories
      const categoriesRes = await fetch('http://localhost:5000/api/categories');
      const categoriesData = await categoriesRes.json();
      if (categoriesData.success) {
        setCategories(categoriesData.data.categories || []);
      }

      // Fetch platform stats (if available)
      try {
        const statsRes = await fetch('http://localhost:5000/api/stats');
        const statsData = await statsRes.json();
        if (statsData.success) {
          setStats(statsData.data);
        }
      } catch (err) {
        // Stats endpoint might not exist, that's okay
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity: 1 })
      });

      const data = await response.json();
      if (data.success) {
        alert('Product added to cart!');
      } else {
        alert(data.error?.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart');
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Welcome to Multi<span className="text-yellow-300">Mart</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">Your One-Stop Multi-Vendor Marketplace</p>
            <p className="text-base md:text-lg mb-8 text-blue-50">
              Discover amazing products from trusted sellers worldwide
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar onSearch={handleSearch} placeholder="Search for products, brands, and more..." />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 hover:text-blue-700 transition transform hover:scale-105 shadow-lg"
              >
                🛍️ Shop Now
              </Link>
              <Link
                to="/stores"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition transform hover:scale-105"
              >
                Explore Stores
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300 opacity-10 rounded-full animate-bounce"></div>
      </section>

      {/* Stats Section */}
      {(stats.products > 0 || stats.vendors > 0) && (
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">{stats.products || '1000+'}+</div>
                <div className="text-gray-600">Products</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">{stats.vendors || '100+'}+</div>
                <div className="text-gray-600">Vendors</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-pink-600 mb-2">{stats.customers || '5000+'}+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose MultiMart?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-5xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold mb-2">Multiple Stores</h3>
              <p className="text-gray-600">Shop from various vendors in one place</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-5xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Safe and encrypted transactions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-blue-600 hover:text-blue-700 font-semibold">
              View All →
            </Link>
          </div>
          
          {loading ? (
            <ProductSkeletonGrid count={4} />
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No featured products available</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.length > 0 ? (
              categories.slice(0, 12).map((category) => (
                <Link
                  key={category._id}
                  to={`/products?category=${category._id}`}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100"
                >
                  <div className="text-3xl mb-2">📦</div>
                  <h3 className="font-semibold text-gray-800 text-sm">{category.name}</h3>
                </Link>
              ))
            ) : (
              ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Books'].map((category) => (
                <Link
                  key={category}
                  to={`/products?search=${category.toLowerCase()}`}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100"
                >
                  <div className="text-3xl mb-2">📦</div>
                  <h3 className="font-semibold text-gray-800 text-sm">{category}</h3>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      {trendingProducts.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">🔥 Trending Now</h2>
                <p className="text-gray-600">Most popular products this week</p>
              </div>
              <Link to="/products?sort=popular" className="text-blue-600 hover:text-blue-700 font-semibold">
                View All →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cryptocurrency Payment Support */}
      <CryptoSupport />

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter for exclusive deals and new arrivals
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Vendor Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Sell on MultiMart?</h2>
                <p className="text-lg mb-6 text-blue-100">
                  Join thousands of vendors and grow your business with our powerful platform
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <svg className="w-6 h-6 mr-3 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Easy store setup
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 mr-3 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Reach millions of customers
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 mr-3 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Secure payment processing
                  </li>
                </ul>
                <Link
                  to="/vendor/register"
                  className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 hover:text-blue-700 transition transform hover:scale-105 shadow-lg"
                >
                  Start Selling Today
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-2xl">
                        ✓
                      </div>
                      <div>
                        <div className="font-semibold">Quick Approval</div>
                        <div className="text-sm text-blue-100">Get started in 24 hours</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-2xl">
                        📊
                      </div>
                      <div>
                        <div className="font-semibold">Analytics Dashboard</div>
                        <div className="text-sm text-blue-100">Track your sales & growth</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-2xl">
                        💰
                      </div>
                      <div>
                        <div className="font-semibold">Low Fees</div>
                        <div className="text-sm text-blue-100">Competitive commission rates</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Viewed Products */}
      <RecentlyViewed />

      {/* Product Comparison (Floating) */}
      <ProductComparison />
    </div>
  );
}

export default Home;
