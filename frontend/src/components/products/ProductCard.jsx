import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import WishlistButton from '../common/WishlistButton';
import { getImageUrl, handleImageError } from '../../utils/imageHelper';

const ProductCard = ({ product, onAddToCart }) => {
  const { _id, name, description, price, discountPercentage, images, rating, stock } = product;
  
  const finalPrice = discountPercentage > 0 
    ? price - (price * discountPercentage / 100) 
    : price;

  const isOutOfStock = stock === 0;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Image */}
      <Link to={`/products/${_id}`} className="block relative overflow-hidden">
        <div className="h-64 bg-gray-200 flex items-center justify-center">
          {images && images.length > 0 ? (
            <img 
              src={getImageUrl(images[0])} 
              alt={name} 
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discountPercentage}%
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-2 right-2">
          <WishlistButton 
            productId={_id} 
            className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/products/${_id}`}>
          <h3 className="font-semibold text-lg mb-2 truncate hover:text-blue-600 transition">
            {name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {rating ? rating.toFixed(1) : '0.0'}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              ${finalPrice.toFixed(2)}
            </span>
            {discountPercentage > 0 && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link to={`/products/${_id}`} className="flex-1">
            <Button variant="outline" size="sm" fullWidth>
              View Details
            </Button>
          </Link>
          <Button 
            variant="primary" 
            size="sm" 
            fullWidth
            disabled={isOutOfStock}
            onClick={() => onAddToCart(_id)}
            className="flex-1"
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
