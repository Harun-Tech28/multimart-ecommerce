const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 Testing MongoDB Atlas Connection...\n');
console.log('Connection String:', process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@'));
console.log('');

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('✅ SUCCESS! Connected to MongoDB Atlas');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ CONNECTION FAILED!');
    console.error('Error:', err.message);
    console.error('\n📝 Common Solutions:');
    console.error('1. Whitelist your IP in MongoDB Atlas → Network Access');
    console.error('2. Check username and password are correct');
    console.error('3. Verify the cluster URL is correct');
    console.error('4. Make sure your internet connection is working');
    process.exit(1);
  });
