import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentlyViewed();
  }, []);

  const fetchRecentlyViewed = () => {
    try {
      // Get from localStorage
      const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      setRecentProducts(viewed.slice(0, 6)); // Show last 6 products
    } catch (error) {
      console.error('Error loading recently viewed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    // Add to cart logic
    console.log('Add to cart:', product);
  };

  if (loading || recentProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
            <p className="text-gray-600 text-sm mt-1">Products you've checked out</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('recentlyViewed');
              setRecentProducts([]);
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear history
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recentProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper function to add product to recently viewed
export const addToRecentlyViewed = (product) => {
  try {
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    
    // Remove if already exists
    const filtered = viewed.filter(p => p._id !== product._id);
    
    // Add to beginning
    filtered.unshift(product);
    
    // Keep only last 20
    const updated = filtered.slice(0, 20);
    
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving to recently viewed:', error);
  }
};

export default RecentlyViewed;
