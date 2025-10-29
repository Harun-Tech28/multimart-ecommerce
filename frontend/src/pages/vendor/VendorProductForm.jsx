import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { getImageUrl, handleImageError } from '../../utils/imageHelper';

const VendorProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPercentage: 0,
    stock: '',
    category: '',
    images: [],
    status: 'active',
    variants: []
  });
  const [imageUrls, setImageUrls] = useState(['']);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'vendor') {
      navigate('/');
      return;
    }
    fetchCategories();
    if (isEditMode) {
      fetchProduct();
    }
  }, [navigate, id, isEditMode]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data.categories || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProduct = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    
    try {
      const response = await fetch(`http://localhost:5000/api/vendors/products/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        const product = data.data.product;
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          discountPercentage: product.discountPercentage || 0,
          stock: product.stock,
          category: product.category?._id || '',
          images: product.images || [],
          status: product.status,
          variants: product.variants || []
        });
        
        // Separate uploaded files from URL-based images
        const uploadedImages = (product.images || []).filter(img => img.includes('/uploads/'));
        const urlImages = (product.images || []).filter(img => !img.includes('/uploads/'));
        
        setUploadedFiles(uploadedImages);
        setImageUrls(urlImages.length > 0 ? urlImages : ['']);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Variant management functions
  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { name: '', options: [{ value: '', priceAdjustment: 0, stock: 0 }] }]
    }));
  };

  const removeVariant = (variantIndex) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== variantIndex)
    }));
  };

  const updateVariantName = (variantIndex, name) => {
    setFormData(prev => {
      const newVariants = [...prev.variants];
      newVariants[variantIndex].name = name;
      return { ...prev, variants: newVariants };
    });
  };

  const addVariantOption = (variantIndex) => {
    setFormData(prev => {
      const newVariants = [...prev.variants];
      newVariants[variantIndex].options.push({ value: '', priceAdjustment: 0, stock: 0 });
      return { ...prev, variants: newVariants };
    });
  };

  const removeVariantOption = (variantIndex, optionIndex) => {
    setFormData(prev => {
      const newVariants = [...prev.variants];
      newVariants[variantIndex].options = newVariants[variantIndex].options.filter((_, i) => i !== optionIndex);
      return { ...prev, variants: newVariants };
    });
  };

  const updateVariantOption = (variantIndex, optionIndex, field, value) => {
    setFormData(prev => {
      const newVariants = [...prev.variants];
      newVariants[variantIndex].options[optionIndex][field] = value;
      return { ...prev, variants: newVariants };
    });
  };

  const handleImageUrlChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
    setFormData(prev => ({ ...prev, images: newUrls.filter(url => url.trim() !== '') }));
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrlField = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls.length > 0 ? newUrls : ['']);
    setFormData(prev => ({ ...prev, images: newUrls.filter(url => url.trim() !== '') }));
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      alert('Please upload only image files (JPEG, JPG, PNG, GIF, WEBP) or video files (MP4, AVI, MOV, WMV, WEBM)');
      return;
    }

    // Validate file sizes (50MB max)
    const oversizedFiles = files.filter(file => file.size > 50 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert('File size must be less than 50MB');
      return;
    }

    setUploading(true);
    const token = localStorage.getItem('token');

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('http://localhost:5000/api/upload/product', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        const newFileUrls = data.data.files.map(url => `http://localhost:5000${url}`);
        setUploadedFiles(prev => [...prev, ...newFileUrls]);
        
        // Add to form data images
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...newFileUrls]
        }));
        
        alert('Files uploaded successfully!');
      } else {
        alert(data.error?.message || 'Failed to upload files');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset file input
    }
  };

  const removeUploadedFile = async (fileUrl) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:5000/api/upload/product', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ filePath: fileUrl })
      });

      const data = await response.json();
      
      if (data.success) {
        setUploadedFiles(prev => prev.filter(url => url !== fileUrl));
        setFormData(prev => ({
          ...prev,
          images: prev.images.filter(url => url !== fileUrl)
        }));
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.stock || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem('token');
    
    try {
      const url = isEditMode
        ? `http://localhost:5000/api/vendors/products/${id}`
        : 'http://localhost:5000/api/vendors/products';
      
      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        alert(isEditMode ? 'Product updated successfully!' : 'Product created successfully!');
        navigate('/vendor/products');
      } else {
        alert(data.error?.message || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading product..." />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
          <p className="text-gray-600 mt-2">Fill in the product details below</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
          {/* Product Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
            />
          </div>

          {/* Price and Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount (%)
              </label>
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleInputChange}
                min="0"
                max="100"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          {/* Stock and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Product Variants/Options */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Options (Size, Color, etc.)
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Add options like size, color, material that customers can select
                </p>
              </div>
              <button
                type="button"
                onClick={addVariant}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                + Add Option
              </button>
            </div>

            {formData.variants.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <p className="text-gray-500 text-sm">
                  No product options added yet. Click "Add Option" to create variants like size or color.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.variants.map((variant, variantIndex) => (
                  <div key={variantIndex} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 mr-4">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Option Name (e.g., Size, Color, Material)
                        </label>
                        <input
                          type="text"
                          value={variant.name}
                          onChange={(e) => updateVariantName(variantIndex, e.target.value)}
                          placeholder="e.g., Size, Color, Material"
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVariant(variantIndex)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-600 mb-2">
                        Option Values
                      </label>
                      {variant.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex gap-2 items-start bg-white p-3 rounded border">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={option.value}
                              onChange={(e) => updateVariantOption(variantIndex, optionIndex, 'value', e.target.value)}
                              placeholder="e.g., Small, Red, Cotton"
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                          </div>
                          <div className="w-32">
                            <input
                              type="number"
                              value={option.priceAdjustment}
                              onChange={(e) => updateVariantOption(variantIndex, optionIndex, 'priceAdjustment', parseFloat(e.target.value) || 0)}
                              placeholder="Price +"
                              step="0.01"
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              title="Additional price for this option"
                            />
                            <span className="text-xs text-gray-500">Price +/-</span>
                          </div>
                          <div className="w-24">
                            <input
                              type="number"
                              value={option.stock}
                              onChange={(e) => updateVariantOption(variantIndex, optionIndex, 'stock', parseInt(e.target.value) || 0)}
                              placeholder="Stock"
                              min="0"
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              title="Stock for this option"
                            />
                            <span className="text-xs text-gray-500">Stock</span>
                          </div>
                          {variant.options.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeVariantOption(variantIndex, optionIndex)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                              title="Remove this option"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addVariantOption(variantIndex)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        + Add Value
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* File Upload Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Product Images/Videos
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                id="fileUpload"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer flex flex-col items-center"
              >
                <svg
                  className="w-12 h-12 text-gray-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="text-blue-600 font-medium">
                  {uploading ? 'Uploading...' : 'Click to upload files'}
                </span>
                <span className="text-gray-500 text-sm mt-1">
                  Images (JPEG, PNG, GIF, WEBP) or Videos (MP4, AVI, MOV, WEBM)
                </span>
                <span className="text-gray-400 text-xs mt-1">
                  Max file size: 50MB
                </span>
              </label>
            </div>

            {/* Display uploaded files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {uploadedFiles.map((fileUrl, index) => (
                    <div key={index} className="relative group border rounded-lg overflow-hidden bg-gray-50">
                      {fileUrl.match(/\.(mp4|avi|mov|wmv|webm)$/i) ? (
                        <video
                          src={getImageUrl(fileUrl)}
                          className="w-full h-64 object-contain"
                          controls
                        />
                      ) : (
                        <img
                          src={getImageUrl(fileUrl)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-64 object-contain cursor-pointer hover:opacity-90 transition-opacity"
                          onError={handleImageError}
                          loading="lazy"
                          onClick={() => window.open(getImageUrl(fileUrl), '_blank')}
                          title="Click to view full size"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => removeUploadedFile(fileUrl)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to view full size
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Image URLs */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or Add Image URLs
            </label>
            <p className="text-xs text-gray-500 mb-2">You can also add images by URL if you prefer</p>
            {imageUrls.map((url, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
                {imageUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageUrlField(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImageUrlField}
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              + Add Another Image URL
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={submitting}
            >
              {submitting ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              fullWidth
              onClick={() => navigate('/vendor/products')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorProductForm;
