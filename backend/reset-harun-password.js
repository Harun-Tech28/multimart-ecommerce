require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

const resetPassword = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multimart');
    console.log('✅ Connected to MongoDB\n');

    const email = 'harunadramani951@gmail.com';
    const newPassword = 'Harun@2024';

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      console.log('❌ User not found!');
      process.exit(1);
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save user
    await user.save();

    console.log('✅ Password reset successfully!');
    console.log('\n📧 Email:', email);
    console.log('🔑 New Password:', newPassword);
    console.log('\n✨ You can now log in with these credentials!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

resetPassword();
