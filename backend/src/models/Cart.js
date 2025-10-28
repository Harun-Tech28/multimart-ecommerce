const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    price: {
      type: Number,
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Calculate cart totals
cartSchema.methods.calculateTotals = function() {
  const subtotal = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  return {
    subtotal: subtotal.toFixed(2),
    itemCount: this.items.reduce((count, item) => count + item.quantity, 0)
  };
};

// Create index
cartSchema.index({ customerId: 1 });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
