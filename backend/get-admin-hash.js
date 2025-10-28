const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User');

async function getHash() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multimart');
    
    const user = await User.findOne({ email: 'admin@multimart.com' }).select('+password');
    
    if (user) {
      console.log('Email:', user.email);
      console.log('Password Hash:', user.password);
      console.log('Role:', user.role);
    } else {
      console.log('User not found');
    }
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

getHash();
