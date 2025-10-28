const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ customerId: req.user._id })
      .populate({
        path: 'items.productId',
        select: 'name slug price discountPercentage images stock status',
        populate: {
          path: 'storeId',
          select: 'name slug'
        }
      });

    if (!cart) {
      // Create empty cart if doesn't exist
      cart = await Cart.create({
        customerId: req.user._id,
        items: []
      });
    }

    const totals = cart.calculateTotals();

    res.status(200).json({
      success: true,
      data: {
        cart,
        totals
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_FIELDS',
          message: 'Product ID and quantity are required'
        }
      });
    }

    // Verify product exists and is available
    const product = await Product.findById(productId);
    
    if (!product || !product.isActive || product.status !== 'active') {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PRODUCT_NOT_AVAILABLE',
          message: 'Product is not available'
        }
      });
    }

    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INSUFFICIENT_STOCK',
          message: `Only ${product.stock} items available in stock`
        }
      });
    }

    // Get or create cart
    let cart = await Cart.findOne({ customerId: req.user._id });
    
    if (!cart) {
      cart = await Cart.create({
        customerId: req.user._id,
        items: []
      });
    }

    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    const finalPrice = product.discountPercentage > 0
      ? product.price * (1 - product.discountPercentage / 100)
      : product.price;

    if (existingItemIndex > -1) {
      // Update quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      
      if (newQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INSUFFICIENT_STOCK',
            message: `Only ${product.stock} items available in stock`
          }
        });
      }
      
      cart.items[existingItemIndex].quantity = newQuantity;
      cart.items[existingItemIndex].price = finalPrice;
    } else {
      // Add new item
      cart.items.push({
        productId,
        quantity,
        price: finalPrice
      });
    }

    await cart.save();
    
    // Populate product details
    await cart.populate({
      path: 'items.productId',
      select: 'name slug price discountPercentage images stock status',
      populate: {
        path: 'storeId',
        select: 'name slug'
      }
    });

    const totals = cart.calculateTotals();

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      data: {
        cart,
        totals
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update/:itemId
// @access  Private
exports.updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_QUANTITY',
          message: 'Quantity must be at least 1'
        }
      });
    }

    const cart = await Cart.findOne({ customerId: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'CART_NOT_FOUND',
          message: 'Cart not found'
        }
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item._id.toString() === req.params.itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ITEM_NOT_FOUND',
          message: 'Item not found in cart'
        }
      });
    }

    // Check stock availability
    const product = await Product.findById(cart.items[itemIndex].productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PRODUCT_NOT_FOUND',
          message: 'Product not found'
        }
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INSUFFICIENT_STOCK',
          message: `Only ${product.stock} items available in stock`
        }
      });
    }

    // Update quantity and price
    cart.items[itemIndex].quantity = quantity;
    const finalPrice = product.discountPercentage > 0
      ? product.price * (1 - product.discountPercentage / 100)
      : product.price;
    cart.items[itemIndex].price = finalPrice;

    await cart.save();
    
    await cart.populate({
      path: 'items.productId',
      select: 'name slug price discountPercentage images stock status',
      populate: {
        path: 'storeId',
        select: 'name slug'
      }
    });

    const totals = cart.calculateTotals();

    res.status(200).json({
      success: true,
      message: 'Cart updated',
      data: {
        cart,
        totals
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:itemId
// @access  Private
exports.removeFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ customerId: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'CART_NOT_FOUND',
          message: 'Cart not found'
        }
      });
    }

    cart.items = cart.items.filter(
      item => item._id.toString() !== req.params.itemId
    );

    await cart.save();
    
    await cart.populate({
      path: 'items.productId',
      select: 'name slug price discountPercentage images stock status',
      populate: {
        path: 'storeId',
        select: 'name slug'
      }
    });

    const totals = cart.calculateTotals();

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      data: {
        cart,
        totals
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
exports.clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ customerId: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'CART_NOT_FOUND',
          message: 'Cart not found'
        }
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      data: {
        cart,
        totals: {
          subtotal: '0.00',
          itemCount: 0
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
