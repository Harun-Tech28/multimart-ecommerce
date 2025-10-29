import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import { ProductSkeletonGrid } from '../components/products/ProductSkeleton';
import ProductFilter from '../components/products/ProductFilter';
import Pagination from '../components/common/Pagination';

function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
    
    // Get search query from URL
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy, currentPage, searchQuery]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/api/products?page=${currentPage}&limit=12`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      if (selectedCategory) url += `&category=${selectedCategory}`;
      if (sortBy) url += `&sort=${sortBy}`;
      if (priceRange.min) url += `&minPrice=${priceRange.min}`;
      if (priceRange.max) url += `&maxPrice=${priceRange.max}`;
      
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data.products || []);
        setTotalPages(data.data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePriceFilter = () => {
    setCurrentPage(1);
    fetchProducts();
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSortBy('');
    setPriceRange({ min: '', max: '' });
    setSearchQuery('');
    setCurrentPage(1);
    navigate('/products');
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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
          </h1>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                navigate('/products');
              }}
              className="mt-2 text-sm text-blue-600 hover:text-blue-700"
            >
              ← Clear search
            </button>
          )}
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <ProductFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={(categoryId) => {
                setSelectedCategory(categoryId);
                setCurrentPage(1);
              }}
              priceRange={priceRange}
              onPriceChange={(range) => {
                setPriceRange(range);
                setCurrentPage(1);
              }}
              sortBy={sortBy}
              onSortChange={(sort) => {
                setSortBy(sort);
                setCurrentPage(1);
              }}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {loading ? 'Loading...' : `Showing ${products.length} products`}
              </p>
              
              {/* Mobile Sort */}
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="lg:hidden px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sort By</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Products */}
            {loading ? (
              <ProductSkeletonGrid count={12} />
            ) : (
              <>
                <ProductGrid 
                  products={products} 
                  loading={false}
                  onAddToCart={handleAddToCart}
                />
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
