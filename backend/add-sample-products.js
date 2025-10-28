const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./src/models/Product');
const Category = require('./src/models/Category');
const User = require('./src/models/User');
const Store = require('./src/models/Store');

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.',
    price: 79.99,
    category: 'Electronics',
    stock: 50,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    featured: true,
    tags: ['audio', 'wireless', 'bluetooth', 'headphones']
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking, heart rate monitor, GPS, water-resistant. Stay connected and healthy with this premium smartwatch.',
    price: 199.99,
    category: 'Electronics',
    stock: 30,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
    featured: true,
    tags: ['smartwatch', 'fitness', 'wearable', 'tech']
  },
  {
    name: 'Leather Messenger Bag',
    description: 'Genuine leather messenger bag with multiple compartments. Perfect for work, travel, or everyday use. Durable and stylish.',
    price: 89.99,
    category: 'Fashion',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'],
    featured: false,
    tags: ['bag', 'leather', 'fashion', 'accessories']
  },
  {
    name: 'Running Shoes - Pro Series',
    description: 'Professional running shoes with advanced cushioning and breathable mesh. Designed for comfort and performance.',
    price: 129.99,
    category: 'Sports',
    stock: 40,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    featured: true,
    tags: ['shoes', 'running', 'sports', 'fitness']
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Soft, comfortable, and eco-friendly. Made from 100% organic cotton. Available in multiple colors.',
    price: 24.99,
    category: 'Fashion',
    stock: 100,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
    featured: false,
    tags: ['clothing', 'tshirt', 'organic', 'fashion']
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.',
    price: 29.99,
    category: 'Home',
    stock: 75,
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500'],
    featured: false,
    tags: ['bottle', 'hydration', 'eco-friendly', 'home']
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Extra thick yoga mat with non-slip surface. Perfect for yoga, pilates, and home workouts. Includes carrying strap.',
    price: 39.99,
    category: 'Sports',
    stock: 60,
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'],
    featured: false,
    tags: ['yoga', 'fitness', 'exercise', 'sports']
  },
  {
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with thermal carafe. Brew perfect coffee every morning with 12-cup capacity.',
    price: 79.99,
    category: 'Home',
    stock: 35,
    images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500'],
    featured: false,
    tags: ['coffee', 'kitchen', 'appliance', 'home']
  },
  {
    name: 'Desk Lamp LED',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature. USB charging port included.',
    price: 44.99,
    category: 'Home',
    stock: 45,
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'],
    featured: false,
    tags: ['lamp', 'led', 'desk', 'home']
  },
  {
    name: 'Backpack Travel Pro',
    description: 'Durable travel backpack with laptop compartment, USB charging port, and water-resistant material. Perfect for travel and daily use.',
    price: 69.99,
    category: 'Fashion',
    stock: 55,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'],
    featured: true,
    tags: ['backpack', 'travel', 'bag', 'fashion']
  }
];

async function addSampleProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multimart');
    console.log('✅ Connected to MongoDB\n');

    // Find or create a vendor
    let vendor = await User.findOne({ role: 'vendor' });
    
    if (!vendor) {
      console.log('❌ No vendor found. Creating a sample vendor...');
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Vendor123!', salt);
      
      vendor = await User.create({
        firstName: 'Sample',
        lastName: 'Vendor',
        email: 'vendor@multimart.com',
        password: hashedPassword,
        role: 'vendor',
        phone: '+1234567890'
      });
      console.log('✅ Sample vendor created: vendor@multimart.com / Vendor123!\n');
    }

    // Find or create a store for the vendor
    let store = await Store.findOne({ vendorId: vendor._id });
    
    if (!store) {
      console.log('🏪 Creating sample store...');
      store = await Store.create({
        name: 'MultiMart Store',
        vendorId: vendor._id,
        description: 'Your one-stop shop for quality products',
        address: {
          street: '123 Commerce Street',
          city: 'Business City',
          state: 'BC',
          zipCode: '12345',
          country: 'USA'
        },
        phone: '+1234567890',
        email: 'store@multimart.com'
      });
      console.log('✅ Sample store created\n');
    }

    // Get or create categories
    const categories = {};
    for (const product of sampleProducts) {
      if (!categories[product.category]) {
        let category = await Category.findOne({ name: product.category });
        if (!category) {
          category = await Category.create({
            name: product.category,
            slug: product.category.toLowerCase(),
            description: `${product.category} products`
          });
        }
        categories[product.category] = category._id;
      }
    }

    // Add products
    console.log('📦 Adding sample products...\n');
    let addedCount = 0;

    for (const productData of sampleProducts) {
      // Check if product already exists
      const existing = await Product.findOne({ name: productData.name });
      if (existing) {
        console.log(`⏭️  Skipping "${productData.name}" (already exists)`);
        continue;
      }

      const product = await Product.create({
        ...productData,
        vendorId: vendor._id,
        storeId: store._id,
        category: categories[productData.category]
      });

      console.log(`✅ Added: ${product.name} - $${product.price}`);
      addedCount++;
    }

    console.log(`\n🎉 Successfully added ${addedCount} products!`);
    console.log('\n📊 Summary:');
    console.log(`   Total products in database: ${await Product.countDocuments()}`);
    console.log(`   Vendor: ${vendor.email}`);
    console.log('\n🔗 View products at: http://localhost:3000/products');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

addSampleProducts();
