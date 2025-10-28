const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multimart')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Models (same as seed-products.js)
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  images: [String],
  stock: Number,
  isActive: Boolean,
  featured: Boolean,
  rating: Number,
  numReviews: Number,
  createdAt: Date
});

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  slug: String,
  isActive: Boolean
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  role: String
});

const storeSchema = new mongoose.Schema({
  name: String,
  description: String,
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: Boolean
});

const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);
const User = mongoose.model('User', userSchema);
const Store = mongoose.model('Store', storeSchema);

// Additional products
const moreProducts = [
  {
    name: 'Laptop - 15.6" Full HD',
    description: 'Powerful laptop with Intel i7 processor, 16GB RAM, 512GB SSD. Perfect for work and entertainment.',
    price: 899.99,
    categoryName: 'Electronics',
    stock: 15,
    featured: true,
    rating: 4.8,
    numReviews: 234
  },
  {
    name: 'Tablet - 10.1" Display',
    description: 'Lightweight tablet with stunning display. Great for reading, browsing, and streaming.',
    price: 299.99,
    categoryName: 'Electronics',
    stock: 30,
    featured: false,
    rating: 4.4,
    numReviews: 156
  },
  {
    name: 'Digital Camera - 24MP',
    description: 'Professional digital camera with 24MP sensor and 4K video recording.',
    price: 549.99,
    categoryName: 'Electronics',
    stock: 12,
    featured: true,
    rating: 4.7,
    numReviews: 89
  },
  {
    name: 'Denim Jeans - Slim Fit',
    description: 'Classic slim fit jeans made from premium denim. Comfortable and stylish.',
    price: 49.99,
    categoryName: 'Clothing',
    stock: 75,
    featured: false,
    rating: 4.3,
    numReviews: 112
  },
  {
    name: 'Hoodie - Unisex',
    description: 'Cozy hoodie made from soft cotton blend. Perfect for casual wear.',
    price: 39.99,
    categoryName: 'Clothing',
    stock: 90,
    featured: false,
    rating: 4.5,
    numReviews: 78
  },
  {
    name: 'Sneakers - Casual',
    description: 'Comfortable casual sneakers with cushioned sole. Available in multiple colors.',
    price: 64.99,
    categoryName: 'Fashion',
    stock: 45,
    featured: true,
    rating: 4.6,
    numReviews: 145
  },
  {
    name: 'Wall Clock - Modern Design',
    description: 'Elegant wall clock with silent movement. Perfect for any room.',
    price: 34.99,
    categoryName: 'Home & Kitchen',
    stock: 40,
    featured: false,
    rating: 4.2,
    numReviews: 56
  },
  {
    name: 'Throw Pillow Set',
    description: 'Set of 2 decorative throw pillows. Soft and comfortable.',
    price: 29.99,
    categoryName: 'Home & Kitchen',
    stock: 60,
    featured: false,
    rating: 4.4,
    numReviews: 67
  },
  {
    name: 'Dumbbell Set - 20lb',
    description: 'Adjustable dumbbell set perfect for home workouts. Includes storage case.',
    price: 79.99,
    categoryName: 'Sports',
    stock: 25,
    featured: true,
    rating: 4.7,
    numReviews: 98
  },
  {
    name: 'Tennis Racket - Professional',
    description: 'High-quality tennis racket with carbon fiber frame. Includes carrying case.',
    price: 129.99,
    categoryName: 'Sports',
    stock: 18,
    featured: false,
    rating: 4.8,
    numReviews: 45
  },
  {
    name: 'Notebook Set - Hardcover',
    description: 'Set of 3 premium hardcover notebooks. Perfect for journaling or note-taking.',
    price: 24.99,
    categoryName: 'Office',
    stock: 70,
    featured: false,
    rating: 4.3,
    numReviews: 89
  },
  {
    name: 'Desk Lamp - LED',
    description: 'Adjustable LED desk lamp with touch control and USB charging port.',
    price: 44.99,
    categoryName: 'Office',
    stock: 35,
    featured: true,
    rating: 4.6,
    numReviews: 123
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with customizable keys. Perfect for gaming and typing.',
    price: 89.99,
    categoryName: 'Electronics',
    stock: 28,
    featured: true,
    rating: 4.7,
    numReviews: 167
  },
  {
    name: 'Wallet - Leather',
    description: 'Genuine leather wallet with RFID protection. Multiple card slots.',
    price: 34.99,
    categoryName: 'Fashion',
    stock: 55,
    featured: false,
    rating: 4.5,
    numReviews: 92
  },
  {
    name: 'Blender - High Speed',
    description: 'Powerful blender with multiple speed settings. Perfect for smoothies and soups.',
    price: 69.99,
    categoryName: 'Home & Kitchen',
    stock: 32,
    featured: false,
    rating: 4.6,
    numReviews: 134
  }
];

async function addMoreProducts() {
  try {
    console.log('\n🌱 Adding more products...\n');

    // Find vendor and store
    let vendor = await User.findOne({ role: 'vendor' });
    if (!vendor) {
      vendor = await User.findOne({ role: 'admin' });
    }
    
    if (!vendor) {
      console.log('❌ No vendor or admin found.');
      process.exit(1);
    }

    let store = await Store.findOne({ vendor: vendor._id });
    if (!store) {
      store = await Store.create({
        name: `${vendor.firstName}'s Store`,
        description: 'Official MultiMart Store',
        vendor: vendor._id,
        isActive: true
      });
    }

    // Get categories
    const categories = {};
    const categoryNames = ['Electronics', 'Clothing', 'Fashion', 'Home & Kitchen', 'Sports', 'Office'];
    
    for (const catName of categoryNames) {
      const category = await Category.findOne({ name: catName });
      if (category) {
        categories[catName] = category._id;
      }
    }

    // Add products
    let created = 0;
    for (const productData of moreProducts) {
      const existing = await Product.findOne({ name: productData.name });
      if (existing) {
        console.log(`   ⏭️  Skipped: ${productData.name}`);
        continue;
      }

      const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      await Product.create({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category: categories[productData.categoryName],
        vendor: vendor._id,
        store: store._id,
        slug: slug + '-' + Date.now(), // Make slug unique
        images: [],
        stock: productData.stock,
        isActive: true,
        featured: productData.featured,
        rating: productData.rating,
        numReviews: productData.numReviews,
        createdAt: new Date()
      });

      created++;
      console.log(`   ✅ Added: ${productData.name} - $${productData.price}`);
    }

    const total = await Product.countDocuments();
    console.log(`\n🎉 Successfully added ${created} new products!`);
    console.log(`📊 Total products in database: ${total}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addMoreProducts();
