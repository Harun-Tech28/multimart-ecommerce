import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader';
import Pagination from '../components/common/Pagination';

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStores();
  }, [currentPage, searchQuery]);

  const fetchStores = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:8000/api/stores?page=${currentPage}&limit=12`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setStores(data.data.stores || []);
        setTotalPages(data.data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading stores..." />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Stores</h1>
          <p className="text-gray-600">Discover amazing vendors and their products</p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <input
            type="text"
            placeholder="Search stores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Stores Grid */}
        {stores.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No stores found</h2>
            <p className="text-gray-600 mb-6">Check back later for new vendors</p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {stores.filter(store => store && store._id).map((store) => (
                <Link
                  key={store._id}
                  to={`/stores/${store._id}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden"
                >
                  {/* Store Banner */}
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                    {store.banner && (
                      <img src={store.banner} alt={store.name} className="w-full h-full object-cover" />
                    )}
                  </div>

                  {/* Store Logo */}
                  <div className="relative px-6 pb-6">
                    <div className="absolute -top-12 left-6">
                      <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                        {store.logo ? (
                          <img src={store.logo} alt={store.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-3xl font-bold text-gray-600">{store.name?.[0]}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-14">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{store.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {store.description || 'Quality products from a trusted vendor'}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{store.productCount || 0} Products</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {store.rating?.toFixed(1) || '0.0'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
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

export default Stores;
