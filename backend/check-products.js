const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multimart')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  slug: String,
  isActive: Boolean
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  stock: Number,
  featured: Boolean,
  rating: Number,
  isActive: Boolean
});

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

async function checkProducts() {
  try {
    const products = await Product.find().populate('category');
    const total = products.length;

    console.log(`\n📦 Total Products: ${total}\n`);

    if (total === 0) {
      console.log('❌ No products found in database.');
      console.log('\n💡 Run this command to add products:');
      console.log('   node seed-products.js\n');
      process.exit(0);
    }

    console.log('📋 Product List:\n');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Price: $${product.price}`);
      console.log(`   Category: ${product.category?.name || 'N/A'}`);
      console.log(`   Stock: ${product.stock}`);
      console.log(`   Rating: ${product.rating || 0}/5`);
      console.log(`   Featured: ${product.featured ? 'Yes' : 'No'}`);
      console.log(`   Status: ${product.isActive ? 'Active' : 'Inactive'}\n`);
    });

    const featured = products.filter(p => p.featured).length;
    const active = products.filter(p => p.isActive).length;

    console.log('📊 Statistics:');
    console.log(`   Total Products: ${total}`);
    console.log(`   Featured Products: ${featured}`);
    console.log(`   Active Products: ${active}`);
    console.log(`   Inactive Products: ${total - active}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkProducts();
