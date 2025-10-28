import React, { useState, useEffect } from 'react';
import Button from '../common/Button';

const ProductComparison = () => {
  const [compareProducts, setCompareProducts] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    loadCompareProducts();
  }, []);

  const loadCompareProducts = () => {
    try {
      const products = JSON.parse(localStorage.getItem('compareProducts') || '[]');
      setCompareProducts(products);
    } catch (error) {
      console.error('Error loading compare products:', error);
    }
  };

  const removeProduct = (productId) => {
    const updated = compareProducts.filter(p => p._id !== productId);
    setCompareProducts(updated);
    localStorage.setItem('compareProducts', JSON.stringify(updated));
  };

  const clearAll = () => {
    setCompareProducts([]);
    localStorage.removeItem('compareProducts');
    setShowComparison(false);
  };

  if (compareProducts.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Compare Button */}
      {!showComparison && (
        <button
          onClick={() => setShowComparison(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2 z-40 animate-bounce"
        >
          <span>⚖️</span>
          <span className="font-semibold">Compare ({compareProducts.length})</span>
        </button>
      )}

      {/* Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900">Product Comparison</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={clearAll}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowComparison(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="flex-1 overflow-auto p-6">
              <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${compareProducts.length}, minmax(250px, 1fr))` }}>
                {compareProducts.map((product) => (
                  <div key={product._id} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={product.images?.[0] || '/placeholder.png'}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => removeProduct(product._id)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50 text-red-600"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                        <p className="text-2xl font-bold text-blue-600 mt-2">${product.price}</p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}>
                              ⭐
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({product.numReviews || 0})</span>
                      </div>

                      {/* Stock Status */}
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                        </span>
                      </div>

                      {/* Description */}
                      <div>
                        <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                      </div>

                      {/* Category */}
                      <div>
                        <p className="text-xs text-gray-500">
                          Category: <span className="font-medium">{product.category?.name || 'N/A'}</span>
                        </p>
                      </div>

                      {/* Brand */}
                      {product.brand && (
                        <div>
                          <p className="text-xs text-gray-500">
                            Brand: <span className="font-medium">{product.brand}</span>
                          </p>
                        </div>
                      )}

                      {/* Action Button */}
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        onClick={() => window.location.href = `/products/${product._id}`}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add More Products */}
              {compareProducts.length < 4 && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    You can compare up to 4 products. Add more products to compare!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Helper function to add product to comparison
export const addToComparison = (product) => {
  try {
    const products = JSON.parse(localStorage.getItem('compareProducts') || '[]');
    
    // Check if already exists
    if (products.find(p => p._id === product._id)) {
      alert('Product already in comparison');
      return false;
    }
    
    // Max 4 products
    if (products.length >= 4) {
      alert('You can compare up to 4 products only');
      return false;
    }
    
    products.push(product);
    localStorage.setItem('compareProducts', JSON.stringify(products));
    return true;
  } catch (error) {
    console.error('Error adding to comparison:', error);
    return false;
  }
};

export default ProductComparison;
