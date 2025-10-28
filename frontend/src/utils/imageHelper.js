/**
 * Helper function to get the correct image URL
 * Handles both external URLs and uploaded files
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL (http:// or https://), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it starts with /uploads/, prepend the backend URL
  if (imagePath.startsWith('/uploads/')) {
    return `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}${imagePath}`;
  }
  
  // If it's just a filename or relative path, assume it's in uploads
  if (!imagePath.startsWith('/')) {
    return `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/uploads/${imagePath}`;
  }
  
  return imagePath;
};

/**
 * Get placeholder image for products without images
 */
export const getPlaceholderImage = () => {
  return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23f3f4f6" width="400" height="400"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="48" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
};

/**
 * Handle image load error by setting a placeholder
 */
export const handleImageError = (e) => {
  e.target.src = getPlaceholderImage();
  e.target.onerror = null; // Prevent infinite loop
};
