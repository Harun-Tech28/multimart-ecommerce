const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./src/models/User');

async function resetVendorPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multimart');
    console.log('✅ Connected to MongoDB\n');
    
    const email = 'john@example.com';
    const newPassword = 'Vendor123!';
    
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`❌ User not found: ${email}`);
      await mongoose.connection.close();
      process.exit(1);
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update directly (bypass pre-save hook)
    await User.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );
    
    console.log('✅ Vendor password reset successfully!\n');
    console.log('═══════════════════════════════════════');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', newPassword);
    console.log('👤 Role:', user.role);
    console.log('═══════════════════════════════════════');
    console.log('\n🔗 Login at: http://localhost:3000/vendor/login');
    console.log('🔗 Or regular login: http://localhost:3000/login\n');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

resetVendorPassword();
