const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multimart')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// User model
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  phone: String,
  isActive: Boolean,
  createdAt: Date
});

const User = mongoose.model('User', userSchema);

async function fixAllAdminLogins() {
  try {
    // Find all admin users
    const admins = await User.find({ role: 'admin' });
    
    if (admins.length === 0) {
      console.log('❌ No admin users found');
      process.exit(0);
    }

    console.log(`\n📋 Found ${admins.length} admin account(s):\n`);

    // Reset password for each admin
    for (const admin of admins) {
      const newPassword = 'Admin123'; // Simple password for all admins
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      await User.updateOne(
        { _id: admin._id },
        { 
          $set: { 
            password: hashedPassword,
            isActive: true // Make sure account is active
          } 
        }
      );

      console.log(`✅ ${admin.firstName} ${admin.lastName}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Password: ${newPassword}`);
      console.log(`   Status: Active\n`);
    }

    console.log('🎉 All admin passwords have been reset!\n');
    console.log('📝 Login Instructions:');
    console.log('   1. Go to: http://localhost:3000/login');
    console.log('   2. Use any of the emails above');
    console.log('   3. Password: Admin123');
    console.log('   4. Click "Sign in"\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the fix
fixAllAdminLogins();
