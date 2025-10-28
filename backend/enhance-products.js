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

async function enhanceProducts() {
  try {
    console.log('\n✨ Enhancing products...\n');

    const products = await Product.find();
    
    if (products.length === 0) {
      console.log('❌ No products found.');
      process.exit(0);
    }

    let updated = 0;
    
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const isFeatured = i < 6; // Make first 6 products featured
      const rating = (Math.random() * 1.5 + 3.5).toFixed(1); // Random rating between 3.5-5.0
      const numReviews = Math.floor(Math.random() * 150) + 20; // Random reviews 20-170
      
      await Product.updateOne(
        { _id: product._id },
        {
          $set: {
            featured: isFeatured,
            rating: parseFloat(rating),
            numReviews: numReviews,
            slug: product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + product._id
          }
        }
      );

      updated++;
      console.log(`✅ Enhanced: ${product.name}`);
      console.log(`   Featured: ${isFeatured ? 'Yes' : 'No'}`);
      console.log(`   Rating: ${rating}/5 (${numReviews} reviews)\n`);
    }

    console.log(`🎉 Successfully enhanced ${updated} products!`);
    console.log('\n💡 Products are now ready to display with:');
    console.log('   - Featured status (first 6 products)');
    console.log('   - Ratings and reviews');
    console.log('   - Unique slugs\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

enhanceProducts();
