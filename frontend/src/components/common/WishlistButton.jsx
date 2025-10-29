import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WishlistButton = ({ productId, className = '' }) => {
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkWishlistStatus();
  }, [productId]);

  const checkWishlistStatus = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/wishlist', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        const wishlistProducts = data.data.wishlist?.products || [];
        setIsInWishlist(wishlistProducts.some(product => product._id === productId));
      }
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
  };

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const url = isInWishlist 
        ? `http://localhost:5000/api/wishlist/remove/${productId}`
        : 'http://localhost:5000/api/wishlist/add';
      
      const options = {
        method: isInWishlist ? 'DELETE' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          ...(isInWishlist ? {} : { 'Content-Type': 'application/json' })
        },
        ...(isInWishlist ? {} : { body: JSON.stringify({ productId }) })
      };

      const response = await fetch(url, options);
      const data = await response.json();
      
      if (data.success) {
        setIsInWishlist(!isInWishlist);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={loading}
      className={`flex items-center justify-center transition-colors duration-200 disabled:opacity-50 ${className}`}
      title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg 
        className={`w-6 h-6 ${
          isInWishlist 
            ? 'text-red-500 fill-current' 
            : 'text-gray-400 hover:text-red-500'
        }`} 
        fill={isInWishlist ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
  );
};

export default WishlistButton;
