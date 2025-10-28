require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

const resetAllAdminPasswords = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multimart');
    console.log('✅ Connected to MongoDB\n');

    const newPassword = 'Admin123';

    // Find all admin users
    const adminUsers = await User.find({ role: 'admin' });

    if (adminUsers.length === 0) {
      console.log('❌ No admin users found!');
      process.exit(1);
    }

    console.log(`Found ${adminUsers.length} admin user(s)\n`);

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update all admin passwords
    for (const user of adminUsers) {
      user.password = hashedPassword;
      await user.save();
      console.log(`✅ Reset password for: ${user.email}`);
    }

    console.log('\n✅ All admin passwords reset successfully!');
    console.log('\n🔑 New Password for ALL admins:', newPassword);
    console.log('\n📧 Admin Accounts:');
    adminUsers.forEach(user => {
      console.log(`   - ${user.email}`);
    });
    console.log('\n✨ You can now log in with any admin account using password:', newPassword);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

resetAllAdminPasswords();
