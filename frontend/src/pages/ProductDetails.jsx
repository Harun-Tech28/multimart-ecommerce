import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import WishlistButton from '../components/common/WishlistButton';
import ReviewForm from '../components/reviews/ReviewForm';
import ReviewList from '../components/reviews/ReviewList';
import ReviewSummary from '../components/reviews/ReviewSummary';
import { addToRecentlyViewed } from '../components/products/RecentlyViewed';
import { addToComparison } from '../components/products/ProductComparison';
import { getImageUrl, handleImageError } from '../utils/imageHelper';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
    loadCurrentUser();
  }, [id]);

  const loadCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
      } catch (err) {
        console.error('Error parsing user:', err);
      }
    }
  };

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}/reviews`);
      const data = await response.json();
      if (data.success) {
        setReviews(data.data.reviews || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}`);
      const data = await response.json();
      if (data.success) {
        setProduct(data.data.product);
        // Add to recently viewed
        addToRecentlyViewed(data.data.product);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: id, quantity })
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



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading product details..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const finalPrice = product.discountPercentage > 0
    ? product.price - (product.price * product.discountPercentage / 100)
    : product.price;

  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/products" className="hover:text-blue-600">Products</Link></li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={getImageUrl(product.images[selectedImage])}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-32 h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={getImageUrl(image)} 
                        alt={`${product.name} ${index + 1}`} 
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-lg p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating ? product.rating.toFixed(1) : '0.0'} ({product.reviewCount || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-blue-600">
                    ${finalPrice.toFixed(2)}
                  </span>
                  {product.discountPercentage > 0 && (
                    <>
                      <span className="text-2xl text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                        -{product.discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {isOutOfStock ? (
                  <span className="text-red-600 font-semibold">Out of Stock</span>
                ) : product.stock < 10 ? (
                  <span className="text-orange-600 font-semibold">Only {product.stock} left in stock!</span>
                ) : (
                  <span className="text-green-600 font-semibold">In Stock</span>
                )}
              </div>

              {/* Quantity Selector */}
              {!isOutOfStock && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                      className="w-20 h-10 text-center border border-gray-300 rounded-lg"
                      min="1"
                      max={product.stock}
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                >
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <WishlistButton 
                  productId={id} 
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-red-500"
                />
                <button
                  onClick={() => {
                    if (addToComparison(product)) {
                      alert('Product added to comparison!');
                    }
                  }}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center"
                  title="Add to comparison"
                >
                  ⚖️
                </button>
              </div>

              {/* Store Info */}
              {product.store && product.store._id && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-2">Sold by</h3>
                  <Link
                    to={`/stores/${product.store._id}`}
                    className="flex items-center space-x-3 hover:bg-gray-50 p-3 rounded-lg transition"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      {product.store.logo ? (
                        <img src={product.store.logo} alt={product.store.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-xl font-bold text-gray-600">{product.store.name[0]}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{product.store.name}</p>
                      <p className="text-sm text-gray-600">View store →</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-b pb-2">
                    <dt className="font-medium text-gray-600">Category</dt>
                    <dd className="text-gray-900">{product.category?.name || 'N/A'}</dd>
                  </div>
                  <div className="border-b pb-2">
                    <dt className="font-medium text-gray-600">Brand</dt>
                    <dd className="text-gray-900">{product.brand || 'N/A'}</dd>
                  </div>
                  <div className="border-b pb-2">
                    <dt className="font-medium text-gray-600">SKU</dt>
                    <dd className="text-gray-900">{product.sku || 'N/A'}</dd>
                  </div>
                  <div className="border-b pb-2">
                    <dt className="font-medium text-gray-600">Stock</dt>
                    <dd className="text-gray-900">{product.stock} units</dd>
                  </div>
                </dl>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Review Summary */}
                <ReviewSummary
                  reviews={reviews}
                  averageRating={product.rating || 0}
                />

                {/* Write Review Form */}
                {currentUser && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                    <ReviewForm
                      productId={id}
                      onReviewSubmitted={fetchReviews}
                    />
                  </div>
                )}

                {!currentUser && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <p className="text-gray-700 mb-4">Please log in to write a review</p>
                    <Button
                      variant="primary"
                      onClick={() => navigate('/login')}
                    >
                      Log In
                    </Button>
                  </div>
                )}

                {/* Reviews List */}
                <div>
                  {reviewsLoading ? (
                    <div className="text-center py-8">
                      <Loader />
                    </div>
                  ) : (
                    <ReviewList
                      reviews={reviews}
                      productId={id}
                      onReviewUpdated={fetchReviews}
                      currentUserId={currentUser?._id}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
