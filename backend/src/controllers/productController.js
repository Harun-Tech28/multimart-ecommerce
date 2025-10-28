const Product = require('../models/Product');
const Store = require('../models/Store');
const Vendor = require('../models/Vendor');
const Category = require('../models/Category');

// @desc    Create product
// @route   POST /api/products
// @access  Private (vendor only)
exports.createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      category,
      price,
      discountPercentage,
      images,
      specifications,
      stock,
      sku,
      tags
    } = req.body;

    // Get vendor
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'VENDOR_NOT_FOUND',
          message: 'Vendor profile not found'
        }
      });
    }

    // Get vendor's store
    const store = await Store.findOne({ vendorId: vendor._id });
    if (!store) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'STORE_NOT_FOUND',
          message: 'Please create a store first'
        }
      });
    }

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'CATEGORY_NOT_FOUND',
          message: 'Category not found'
        }
      });
    }

    // Create product
    const product = await Product.create({
      storeId: store._id,
      vendorId: vendor._id,
      name,
      description,
      category,
      price,
      discountPercentage: discountPercentage || 0,
      images: images || [],
      specifications: specifications || [],
      stock,
      sku,
      tags: tags || []
    });

    // Update store product count
    await Store.findByIdAndUpdate(store._id, {
      $inc: { totalProducts: 1 }
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Get vendor's products
// @route   GET /api/products/vendor
// @access  Private (vendor only)
exports.getVendorProducts = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'VENDOR_NOT_FOUND',
          message: 'Vendor profile not found'
        }
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const query = { vendorId: vendor._id };
    if (req.query.status) {
      query.status = req.query.status;
    }

    const products = await Product.find(query)
      .populate('category', 'name')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (vendor only)
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PRODUCT_NOT_FOUND',
          message: 'Product not found'
        }
      });
    }

    // Verify ownership
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor || product.vendorId.toString() !== vendor._id.toString()) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'You can only update your own products'
        }
      });
    }

    const {
      name,
      description,
      category,
      price,
      discountPercentage,
      images,
      specifications,
      stock,
      sku,
      status,
      tags
    } = req.body;

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'CATEGORY_NOT_FOUND',
            message: 'Category not found'
          }
        });
      }
      product.category = category;
    }
    if (price !== undefined) product.price = price;
    if (discountPercentage !== undefined) product.discountPercentage = discountPercentage;
    if (images) product.images = images;
    if (specifications) product.specifications = specifications;
    if (stock !== undefined) product.stock = stock;
    if (sku) product.sku = sku;
    if (status) product.status = status;
    if (tags) product.tags = tags;

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (vendor only)
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PRODUCT_NOT_FOUND',
          message: 'Product not found'
        }
      });
    }

    // Verify ownership
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor || product.vendorId.toString() !== vendor._id.toString()) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'You can only delete your own products'
        }
      });
    }

    // Soft delete - set isActive to false
    product.isActive = false;
    product.status = 'inactive';
    await product.save();

    // Update store product count
    await Store.findByIdAndUpdate(product.storeId, {
      $inc: { totalProducts: -1 }
    });

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products (public with filters)
// @route   GET /api/products
// @access  Public
exports.getAllProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const query = { isActive: true, status: 'active' };

    // Category filter
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Store filter
    if (req.query.store) {
      query.storeId = req.query.store;
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
    }

    // Rating filter
    if (req.query.minRating) {
      query.rating = { $gte: parseFloat(req.query.minRating) };
    }

    // Sort options
    let sort = { createdAt: -1 }; // Default: newest first
    if (req.query.sort === 'price_asc') sort = { price: 1 };
    if (req.query.sort === 'price_desc') sort = { price: -1 };
    if (req.query.sort === 'rating') sort = { rating: -1 };
    if (req.query.sort === 'popular') sort = { totalSales: -1 };

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .populate('storeId', 'name slug logo')
      .select('-specifications')
      .skip(skip)
      .limit(limit)
      .sort(sort);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
exports.searchProducts = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'QUERY_REQUIRED',
          message: 'Search query is required'
        }
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const products = await Product.find({
      $text: { $search: q },
      isActive: true,
      status: 'active'
    })
      .populate('category', 'name slug')
      .populate('storeId', 'name slug logo')
      .select('-specifications')
      .skip(skip)
      .limit(limit)
      .sort({ score: { $meta: 'textScore' } });

    const total = await Product.countDocuments({
      $text: { $search: q },
      isActive: true,
      status: 'active'
    });

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get product by ID or slug
// @route   GET /api/products/:identifier
// @access  Public
exports.getProduct = async (req, res, next) => {
  try {
    let product;

    // Check if identifier is ObjectId or slug
    if (req.params.identifier.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(req.params.identifier);
    } else {
      product = await Product.findOne({ slug: req.params.identifier });
    }

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PRODUCT_NOT_FOUND',
          message: 'Product not found'
        }
      });
    }

    // Populate related data
    await product.populate([
      { path: 'category', select: 'name slug' },
      { path: 'storeId', select: 'name slug logo rating totalReviews' },
      { path: 'vendorId', select: 'businessName' }
    ]);

    res.status(200).json({
      success: true,
      data: { product }
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Get search suggestions
// @route   GET /api/products/search/suggestions
// @access  Public
exports.getSearchSuggestions = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.status(200).json({
        success: true,
        data: { suggestions: [] }
      });
    }
    
    // Search in product names and descriptions
    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ],
      isActive: true
    })
    .select('name price images rating numReviews')
    .limit(10)
    .lean();
    
    res.status(200).json({
      success: true,
      data: { suggestions: products }
    });
  } catch (error) {
    next(error);
  }
};
