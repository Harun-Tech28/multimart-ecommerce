const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multimart')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Models
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

// Sample product data
const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Crystal clear sound quality with deep bass and comfortable ear cushions.',
    price: 79.99,
    categoryName: 'Electronics',
    stock: 50,
    featured: true,
    rating: 4.5,
    numReviews: 128
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, sleep tracking, and 50+ sport modes.',
    price: 149.99,
    categoryName: 'Electronics',
    stock: 35,
    featured: true,
    rating: 4.7,
    numReviews: 95
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and eco-friendly t-shirt made from 100% organic cotton. Available in multiple colors and sizes.',
    price: 24.99,
    categoryName: 'Clothing',
    stock: 100,
    featured: false,
    rating: 4.3,
    numReviews: 67
  },
  {
    name: 'Leather Crossbody Bag',
    description: 'Stylish genuine leather crossbody bag perfect for everyday use. Multiple compartments for organization.',
    price: 89.99,
    categoryName: 'Fashion',
    stock: 25,
    featured: true,
    rating: 4.6,
    numReviews: 54
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.',
    price: 29.99,
    categoryName: 'Home & Kitchen',
    stock: 75,
    featured: false,
    rating: 4.8,
    numReviews: 203
  },
  {
    name: 'Yoga Mat with Carrying Strap',
    description: 'Non-slip yoga mat with extra cushioning for comfort. Includes free carrying strap and storage bag.',
    price: 34.99,
    categoryName: 'Sports',
    stock: 60,
    featured: false,
    rating: 4.4,
    numReviews: 89
  },
  {
    name: 'Portable Phone Charger 20000mAh',
    description: 'High-capacity power bank with fast charging technology. Charge multiple devices simultaneously.',
    price: 39.99,
    categoryName: 'Electronics',
    stock: 45,
    featured: true,
    rating: 4.5,
    numReviews: 156
  },
  {
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 elegant ceramic coffee mugs. Microwave and dishwasher safe. Perfect for home or office.',
    price: 32.99,
    categoryName: 'Home & Kitchen',
    stock: 80,
    featured: false,
    rating: 4.2,
    numReviews: 42
  },
  {
    name: 'Running Shoes - Men',
    description: 'Lightweight running shoes with superior cushioning and breathable mesh upper. Perfect for daily runs.',
    price: 69.99,
    categoryName: 'Sports',
    stock: 40,
    featured: true,
    rating: 4.6,
    numReviews: 112
  },
  {
    name: 'Desk Organizer Set',
    description: 'Complete desk organization solution with pen holder, document tray, and storage compartments.',
    price: 27.99,
    categoryName: 'Office',
    stock: 55,
    featured: false,
    rating: 4.3,
    numReviews: 38
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'High-precision gaming mouse with customizable RGB lighting and programmable buttons.',
    price: 54.99,
    categoryName: 'Electronics',
    stock: 30,
    featured: true,
    rating: 4.7,
    numReviews: 87
  },
  {
    name: 'Sunglasses - Polarized',
    description: 'UV400 protection polarized sunglasses with stylish design. Includes protective case.',
    price: 44.99,
    categoryName: 'Fashion',
    stock: 65,
    featured: false,
    rating: 4.4,
    numReviews: 73
  },
  {
    name: 'Bluetooth Speaker - Waterproof',
    description: 'Portable waterproof Bluetooth speaker with 360° sound. Perfect for outdoor adventures.',
    price: 59.99,
    categoryName: 'Electronics',
    stock: 42,
    featured: true,
    rating: 4.6,
    numReviews: 145
  },
  {
    name: 'Kitchen Knife Set',
    description: 'Professional 8-piece knife set with wooden block. High-carbon stainless steel blades.',
    price: 89.99,
    categoryName: 'Home & Kitchen',
    stock: 28,
    featured: false,
    rating: 4.8,
    numReviews: 96
  },
  {
    name: 'Backpack - Laptop Compatible',
    description: 'Durable backpack with padded laptop compartment (fits up to 15.6"). Multiple pockets for organization.',
    price: 49.99,
    categoryName: 'Fashion',
    stock: 50,
    featured: true,
    rating: 4.5,
    numReviews: 118
  }
];

async function seedProducts() {
  try {
    console.log('\n🌱 Starting product seeding...\n');

    // Find or create vendor
    let vendor = await User.findOne({ role: 'vendor' });
    if (!vendor) {
      vendor = await User.findOne({ role: 'admin' });
    }
    
    if (!vendor) {
      console.log('❌ No vendor or admin found. Please create a user first.');
      process.exit(1);
    }

    console.log(`✅ Using vendor: ${vendor.firstName} ${vendor.lastName}`);

    // Find or create store
    let store = await Store.findOne({ vendor: vendor._id });
    if (!store) {
      store = await Store.create({
        name: `${vendor.firstName}'s Store`,
        description: 'Official MultiMart Store',
        vendor: vendor._id,
        isActive: true
      });
      console.log(`✅ Created store: ${store.name}`);
    } else {
      console.log(`✅ Using existing store: ${store.name}`);
    }

    // Create categories
    const categories = {};
    const categoryNames = ['Electronics', 'Clothing', 'Fashion', 'Home & Kitchen', 'Sports', 'Office'];
    
    console.log('\n📁 Creating categories...');
    for (const catName of categoryNames) {
      let category = await Category.findOne({ name: catName });
      if (!category) {
        category = await Category.create({
          name: catName,
          description: `${catName} products`,
          slug: catName.toLowerCase().replace(/\s+/g, '-'),
          isActive: true
        });
        console.log(`   ✅ Created category: ${catName}`);
      } else {
        console.log(`   ✅ Category exists: ${catName}`);
      }
      categories[catName] = category._id;
    }

    // Check existing products
    const existingCount = await Product.countDocuments();
    console.log(`\n📦 Current products in database: ${existingCount}`);

    if (existingCount >= 10) {
      console.log('✅ Database already has enough products. Skipping seed.');
      console.log('\n💡 To re-seed, delete existing products first.');
      process.exit(0);
    }

    // Create products
    console.log('\n📦 Creating products...\n');
    let created = 0;

    for (const productData of sampleProducts) {
      const existing = await Product.findOne({ name: productData.name });
      if (existing) {
        console.log(`   ⏭️  Skipped: ${productData.name} (already exists)`);
        continue;
      }

      await Product.create({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category: categories[productData.categoryName],
        vendor: vendor._id,
        store: store._id,
        images: [],
        stock: productData.stock,
        isActive: true,
        featured: productData.featured,
        rating: productData.rating,
        numReviews: productData.numReviews,
        createdAt: new Date()
      });

      created++;
      console.log(`   ✅ Created: ${productData.name} - $${productData.price}`);
    }

    console.log(`\n🎉 Successfully created ${created} products!`);
    console.log(`📊 Total products in database: ${existingCount + created}`);
    console.log('\n✅ Product seeding complete!');
    console.log('\n💡 Products will now display on:');
    console.log('   - Home page: http://localhost:3000');
    console.log('   - Products page: http://localhost:3000/products');
    console.log('   - Admin dashboard: http://localhost:3000/admin/products\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    process.exit(1);
  }
}

// Run the seeder
seedProducts();
