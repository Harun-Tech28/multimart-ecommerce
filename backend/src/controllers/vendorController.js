const Vendor = require('../models/Vendor');
const Store = require('../models/Store');
const User = require('../models/User');

// @desc    Register as vendor
// @route   POST /api/vendors/register
// @access  Private (authenticated users)
exports.registerVendor = async (req, res, next) => {
  try {
    const {
      businessName,
      businessEmail,
      businessPhone,
      taxId,
      businessAddress
    } = req.body;

    // Check if user is already a vendor
    const existingVendor = await Vendor.findOne({ userId: req.user._id });
    if (existingVendor) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'VENDOR_EXISTS',
          message: 'You are already registered as a vendor'
        }
      });
    }

    // Create vendor
    const vendor = await Vendor.create({
      userId: req.user._id,
      businessName,
      businessEmail,
      businessPhone,
      taxId,
      businessAddress
    });

    // Update user role to vendor
    await User.findByIdAndUpdate(req.user._id, { role: 'vendor' });

    res.status(201).json({
      success: true,
      message: 'Vendor registration submitted. Awaiting admin approval.',
      data: {
        vendor: {
          id: vendor._id,
          businessName: vendor.businessName,
          verificationStatus: vendor.verificationStatus
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get vendor profile
// @route   GET /api/vendors/profile
// @access  Private (vendor only)
exports.getVendorProfile = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user._id })
      .populate('userId', 'firstName lastName email');

    if (!vendor) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'VENDOR_NOT_FOUND',
          message: 'Vendor profile not found'
        }
      });
    }

    res.status(200).json({
      success: true,
      data: { vendor }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update vendor profile
// @route   PUT /api/vendors/profile
// @access  Private (vendor only)
exports.updateVendorProfile = async (req, res, next) => {
  try {
    const {
      businessName,
      businessEmail,
      businessPhone,
      businessAddress
    } = req.body;

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

    // Update fields
    if (businessName) vendor.businessName = businessName;
    if (businessEmail) vendor.businessEmail = businessEmail;
    if (businessPhone) vendor.businessPhone = businessPhone;
    if (businessAddress) vendor.businessAddress = businessAddress;

    await vendor.save();

    res.status(200).json({
      success: true,
      message: 'Vendor profile updated successfully',
      data: { vendor }
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Create store
// @route   POST /api/vendors/store
// @access  Private (approved vendor only)
exports.createStore = async (req, res, next) => {
  try {
    const { name, description, contactEmail, contactPhone, socialLinks } = req.body;

    // Check if vendor exists and is approved
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

    if (vendor.verificationStatus !== 'approved') {
      return res.status(403).json({
        success: false,
        error: {
          code: 'VENDOR_NOT_APPROVED',
          message: 'Your vendor account must be approved before creating a store'
        }
      });
    }

    // Check if vendor already has a store
    const existingStore = await Store.findOne({ vendorId: vendor._id });
    if (existingStore) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'STORE_EXISTS',
          message: 'You already have a store'
        }
      });
    }

    // Check if store name is already taken
    const nameExists = await Store.findOne({ name });
    if (nameExists) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'STORE_NAME_EXISTS',
          message: 'Store name is already taken'
        }
      });
    }

    // Create store
    const store = await Store.create({
      vendorId: vendor._id,
      name,
      description,
      contactEmail: contactEmail || vendor.businessEmail,
      contactPhone: contactPhone || vendor.businessPhone,
      socialLinks
    });

    res.status(201).json({
      success: true,
      message: 'Store created successfully',
      data: { store }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get vendor's store
// @route   GET /api/vendors/store
// @access  Private (vendor only)
exports.getVendorStore = async (req, res, next) => {
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

    const store = await Store.findOne({ vendorId: vendor._id });

    if (!store) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'STORE_NOT_FOUND',
          message: 'Store not found'
        }
      });
    }

    res.status(200).json({
      success: true,
      data: { store }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update store
// @route   PUT /api/vendors/store
// @access  Private (vendor only)
exports.updateStore = async (req, res, next) => {
  try {
    const {
      name,
      description,
      logo,
      banner,
      contactEmail,
      contactPhone,
      socialLinks
    } = req.body;

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

    const store = await Store.findOne({ vendorId: vendor._id });

    if (!store) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'STORE_NOT_FOUND',
          message: 'Store not found'
        }
      });
    }

    // Check if new name is already taken by another store
    if (name && name !== store.name) {
      const nameExists = await Store.findOne({ name, _id: { $ne: store._id } });
      if (nameExists) {
        return res.status(409).json({
          success: false,
          error: {
            code: 'STORE_NAME_EXISTS',
            message: 'Store name is already taken'
          }
        });
      }
      store.name = name;
    }

    // Update fields
    if (description !== undefined) store.description = description;
    if (logo) store.logo = logo;
    if (banner) store.banner = banner;
    if (contactEmail) store.contactEmail = contactEmail;
    if (contactPhone) store.contactPhone = contactPhone;
    if (socialLinks) store.socialLinks = { ...store.socialLinks, ...socialLinks };

    await store.save();

    res.status(200).json({
      success: true,
      message: 'Store updated successfully',
      data: { store }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get public store by slug
// @route   GET /api/stores/:slug
// @access  Public
exports.getStoreBySlug = async (req, res, next) => {
  try {
    const store = await Store.findOne({ slug: req.params.slug, isActive: true })
      .populate({
        path: 'vendorId',
        select: 'businessName'
      });

    if (!store) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'STORE_NOT_FOUND',
          message: 'Store not found'
        }
      });
    }

    res.status(200).json({
      success: true,
      data: { store }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all stores (public)
// @route   GET /api/stores
// @access  Public
exports.getAllStores = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const stores = await Store.find({ isActive: true })
      .select('name slug description logo rating totalReviews totalProducts')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Store.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      data: {
        stores,
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
