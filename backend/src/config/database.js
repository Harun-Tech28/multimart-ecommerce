const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('⚠️  Server will run without database connection');
    console.error('📝 To fix this error:');
    console.error('   1. Check your MongoDB Atlas cluster URL');
    console.error('   2. Verify your username and password');
    console.error('   3. Ensure your IP address is whitelisted in MongoDB Atlas');
    console.error('   4. Check your internet connection');
    return false;
  }
};

module.exports = connectDB;
