import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/common/Loader';
import ProductCard from '../components/products/ProductCard';
import Pagination from '../components/common/Pagination';

const StoreDetails = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchStoreDetails();
    fetchStoreProducts();
  }, [id, currentPage]);

  const fetchStoreDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/stores/${id}`);
      const data = await response.json();
      if (data.success) {
        setStore(data.data.store);
      }
    } catch (error) {
      console.error('Error fetching store:', error);
    }
  };

  const fetchStoreProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/stores/${id}/products?page=${currentPage}&limit=12`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data.products || []);
        setTotalPages(data.data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/cart/add', {
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

  if (loading && !store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading store..." />
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Store not found</h2>
          <Link to="/stores" className="text-blue-600 hover:text-blue-700">
            Back to Stores
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Store Header */}
      <div className="bg-white shadow-sm">
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          {store.banner && (
            <img src={store.banner} alt={store.name} className="w-full h-full object-cover" />
          )}
        </div>

        {/* Store Info */}
        <div className="container mx-auto px-4">
          <div className="relative pb-6">
            {/* Logo */}
            <div className="absolute -top-16 left-0">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                {store.logo ? (
                  <img src={store.logo} alt={store.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-600">{store.name?.[0]}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Store Details */}
            <div className="pt-20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{store.name}</h1>
                  <p className="text-gray-600 mb-4">{store.description || 'Quality products from a trusted vendor'}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold">{store.rating?.toFixed(1) || '0.0'}</span>
                      <span className="ml-1">({store.reviewCount || 0} reviews)</span>
                    </div>
                    <div>
                      <span className="font-semibold">{store.productCount || 0}</span> Products
                    </div>
                    {store.location && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {store.location}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 md:mt-0">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                    Contact Store
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Products from this store</h2>
          <Link to="/stores" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            ← Back to Stores
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader size="lg" text="Loading products..." />
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products yet</h3>
            <p className="text-gray-600">This store hasn't added any products yet. Check back later!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.filter(product => product && product._id).map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StoreDetails;
