require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');

async function makeAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = process.argv[2] || 'admin@multimart.com';
    
    const user = await User.findOneAndUpdate(
      { email },
      { role: 'admin' },
      { new: true }
    );

    if (user) {
      console.log(`✓ User ${email} is now an admin`);
      console.log(`User ID: ${user._id}`);
      console.log(`Role: ${user.role}`);
    } else {
      console.log(`✗ User ${email} not found`);
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

makeAdmin();
