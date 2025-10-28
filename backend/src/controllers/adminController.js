const Vendor = require('../models/Vendor');
const User = require('../models/User');
const Store = require('../models/Store');

// @desc    Get all vendors
// @route   GET /api/admin/vendors
// @access  Private (admin only)
exports.getAllVendors = async (req, res, next) => {
  try {
    const Product = require('../models/Product');
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    const query = {};
    if (status) {
      query.verificationStatus = status;
    }

    const vendors = await Vendor.find(query)
      .populate('userId', 'firstName lastName email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get store and product count for each vendor
    const vendorsWithDetails = await Promise.all(
      vendors.map(async (vendor) => {
        const store = await Store.findOne({ vendorId: vendor._id });
        const productCount = await Product.countDocuments({ vendorId: vendor._id });
        
        return {
          _id: vendor._id,
          user: vendor.userId,
          businessName: vendor.businessName,
          status: vendor.verificationStatus,
          isActive: vendor.isActive,
          store: store ? { name: store.name } : null,
          productCount,
          createdAt: vendor.createdAt
        };
      })
    );

    const total = await Vendor.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        vendors: vendorsWithDetails,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve vendor
// @route   PUT /api/admin/vendors/:id/approve
// @access  Private (admin only)
exports.approveVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'VENDOR_NOT_FOUND',
          message: 'Vendor not found'
        }
      });
    }

    vendor.verificationStatus = 'approved';
    vendor.rejectionReason = undefined;
    await vendor.save();

    // TODO: Send approval email notification

    res.status(200).json({
      success: true,
      message: 'Vendor approved successfully',
      data: { vendor }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject vendor
// @route   PUT /api/admin/vendors/:id/reject
// @access  Private (admin only)
exports.rejectVendor = async (req, res, next) => {
  try {
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'REASON_REQUIRED',
          message: 'Rejection reason is required'
        }
      });
    }

    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'VENDOR_NOT_FOUND',
          message: 'Vendor not found'
        }
      });
    }

    vendor.verificationStatus = 'rejected';
    vendor.rejectionReason = reason;
    await vendor.save();

    // TODO: Send rejection email notification

    res.status(200).json({
      success: true,
      message: 'Vendor rejected',
      data: { vendor }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Suspend/Activate vendor
// @route   PUT /api/admin/vendors/:id/status
// @access  Private (admin only)
exports.updateVendorStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'VENDOR_NOT_FOUND',
          message: 'Vendor not found'
        }
      });
    }

    // Update verification status
    vendor.verificationStatus = status;
    
    // If suspending, set isActive to false
    if (status === 'suspended') {
      vendor.isActive = false;
      // Also deactivate their store
      await Store.updateMany(
        { vendorId: vendor._id },
        { isActive: false }
      );
    } else if (status === 'approved') {
      vendor.isActive = true;
    }
    
    await vendor.save();

    res.status(200).json({
      success: true,
      message: `Vendor status updated to ${status} successfully`,
      data: { vendor }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private (admin only)
exports.getDashboardStats = async (req, res, next) => {
  try {
    const Product = require('../models/Product');
    const Order = require('../models/Order');
    const Category = require('../models/Category');

    // Get counts
    const totalUsers = await User.countDocuments();
    const totalVendors = await Vendor.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCategories = await Category.countDocuments();

    // Get vendor stats
    const activeVendors = await Vendor.countDocuments({ verificationStatus: 'approved', isActive: true });
    const pendingVendors = await Vendor.countDocuments({ verificationStatus: 'pending' });
    const suspendedVendors = await Vendor.countDocuments({ isActive: false });

    // Get product stats
    const activeProducts = await Product.countDocuments({ status: 'active', isActive: true });
    const outOfStockProducts = await Product.countDocuments({ stock: 0 });

    // Get order stats
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const processingOrders = await Order.countDocuments({ status: 'processing' });
    const completedOrders = await Order.countDocuments({ status: 'delivered' });

    // Calculate total revenue
    const revenueResult = await Order.aggregate([
      { $match: { status: { $in: ['delivered', 'completed'] } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // Get recent activity (last 10 orders)
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('customerId', 'firstName lastName');

    const recentActivity = recentOrders.map(order => ({
      type: 'order',
      title: `New Order #${order.orderNumber}`,
      description: `Order placed by ${order.customerId?.firstName} ${order.customerId?.lastName}`,
      time: new Date(order.createdAt).toLocaleString()
    }));

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalVendors,
        totalProducts,
        totalOrders,
        totalCategories,
        totalRevenue,
        activeVendors,
        pendingVendors,
        suspendedVendors,
        activeProducts,
        outOfStockProducts,
        pendingOrders,
        processingOrders,
        completedOrders,
        recentActivity
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (admin only)
exports.getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search;
    const role = req.query.role;
    const status = req.query.status;

    const query = {};
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role) {
      query.role = role;
    }
    
    if (status) {
      query.status = status;
    }

    const users = await User.find(query)
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user status
// @route   PUT /api/admin/users/:id/status
// @access  Private (admin only)
exports.updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['active', 'suspended'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_STATUS',
          message: 'Status must be either active or suspended'
        }
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      });
    }

    user.status = status;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${status === 'active' ? 'activated' : 'suspended'} successfully`,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products (admin)
// @route   GET /api/admin/products
// @access  Private (admin only)
exports.getAllProducts = async (req, res, next) => {
  try {
    const Product = require('../models/Product');
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search;

    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query)
      .populate('category', 'name')
      .populate('vendorId', 'businessName')
      .populate('storeId', 'name')
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
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product (admin)
// @route   DELETE /api/admin/products/:id
// @access  Private (admin only)
exports.deleteProduct = async (req, res, next) => {
  try {
    const Product = require('../models/Product');
    
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

    // Soft delete
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

// @desc    Create category
// @route   POST /api/admin/categories
// @access  Private (admin only)
exports.createCategory = async (req, res, next) => {
  try {
    const Category = require('../models/Category');
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'NAME_REQUIRED',
          message: 'Category name is required'
        }
      });
    }

    const category = await Category.create({
      name,
      description
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { category }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/admin/categories/:id
// @access  Private (admin only)
exports.updateCategory = async (req, res, next) => {
  try {
    const Category = require('../models/Category');
    const { name, description } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'CATEGORY_NOT_FOUND',
          message: 'Category not found'
        }
      });
    }

    if (name) category.name = name;
    if (description !== undefined) category.description = description;

    await category.save();

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: { category }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/admin/categories/:id
// @access  Private (admin only)
exports.deleteCategory = async (req, res, next) => {
  try {
    const Category = require('../models/Category');
    const Product = require('../models/Product');
    
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'CATEGORY_NOT_FOUND',
          message: 'Category not found'
        }
      });
    }

    // Check if category has products
    const productCount = await Product.countDocuments({ category: category._id });
    
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'CATEGORY_HAS_PRODUCTS',
          message: `Cannot delete category with ${productCount} products. Please reassign or delete products first.`
        }
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Get all orders (admin)
// @route   GET /api/admin/orders
// @access  Private (admin only)
exports.getAllOrders = async (req, res, next) => {
  try {
    const Order = require('../models/Order');
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    const search = req.query.search;

    const query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      query.orderNumber = { $regex: search, $options: 'i' };
    }

    const orders = await Order.find(query)
      .populate('customerId', 'firstName lastName email')
      .populate('items.productId', 'name images')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (admin)
// @route   PUT /api/admin/orders/:id/status
// @access  Private (admin only)
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const Order = require('../models/Order');
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_STATUS',
          message: 'Invalid order status'
        }
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ORDER_NOT_FOUND',
          message: 'Order not found'
        }
      });
    }

    order.status = status;
    
    // Update status history
    if (!order.statusHistory) {
      order.statusHistory = [];
    }
    order.statusHistory.push({
      status,
      timestamp: new Date(),
      updatedBy: req.user._id
    });

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: { order }
    });
  } catch (error) {
    next(error);
  }
};
