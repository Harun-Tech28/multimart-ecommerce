import React, { useState } from 'react';
import Button from '../common/Button';

const ProductFilter = ({ 
  categories = [], 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  onClearFilters,
  onApplyFilters
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceChange = (field, value) => {
    const newRange = { ...localPriceRange, [field]: value };
    setLocalPriceRange(newRange);
  };

  const handleApply = () => {
    onPriceChange(localPriceRange);
    if (onApplyFilters) onApplyFilters();
    setIsOpen(false);
  };

  const handleClear = () => {
    setLocalPriceRange({ min: '', max: '' });
    onClearFilters();
  };

  return (
    <div>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          fullWidth
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white p-6 rounded-lg shadow-sm`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button
            onClick={handleClear}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear All
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-gray-900">Categories</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={!selectedCategory}
                onChange={() => onCategoryChange('')}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className={`ml-3 text-sm ${!selectedCategory ? 'font-medium text-blue-600' : 'text-gray-700 group-hover:text-gray-900'}`}>
                All Categories
              </span>
            </label>
            {categories.map((category) => (
              <label key={category._id} className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category._id}
                  onChange={() => onCategoryChange(category._id)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className={`ml-3 text-sm ${selectedCategory === category._id ? 'font-medium text-blue-600' : 'text-gray-700 group-hover:text-gray-900'}`}>
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-gray-900">Price Range</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Min Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  placeholder="0"
                  value={localPriceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Max Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  placeholder="Any"
                  value={localPriceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={handleApply}
            >
              Apply Price Filter
            </Button>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-gray-900">Rating</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                />
                <div className="ml-3 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">& Up</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <h4 className="font-medium mb-3 text-gray-900">Sort By</h4>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
