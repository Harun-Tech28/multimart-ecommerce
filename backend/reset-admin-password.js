const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./src/models/User');

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multimart');
    console.log('✅ Connected to MongoDB\n');
    
    // Email to reset
    const email = 'admin@multimart.com';
    const newPassword = 'Admin123!';
    
    // Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`❌ User with email ${email} not found!`);
      await mongoose.connection.close();
      process.exit(1);
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update password directly in database (bypass pre-save hook)
    await User.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );
    
    console.log('✅ Password reset successfully!\n');
    console.log('📧 Email:', email);
    console.log('🔑 New Password:', newPassword);
    console.log('👤 Role:', user.role);
    console.log('\n🔗 Login at: http://localhost:3000/admin/login\n');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

resetPassword();
