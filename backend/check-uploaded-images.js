const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multimart')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema);

async function checkUploadedImages() {
  try {
    const products = await Product.find();
    
    console.log(`\n📦 Checking ${products.length} products for uploaded images\n`);
    
    let foundUploaded = false;
    
    products.forEach((product) => {
      if (product.images && product.images.length > 0) {
        product.images.forEach((img) => {
          if (img.includes('/uploads/') || img.includes('localhost:8000')) {
            foundUploaded = true;
            console.log(`Product: ${product.name}`);
            console.log(`Image: ${img}`);
            console.log('');
          }
        });
      }
    });
    
    if (!foundUploaded) {
      console.log('❌ No products found with uploaded images (localhost:8000 or /uploads/)');
      console.log('\n💡 This means:');
      console.log('   - All existing products use external URLs (Unsplash, etc.)');
      console.log('   - No products have been created with file uploads yet');
      console.log('   - The issue might be with newly created products\n');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkUploadedImages();
