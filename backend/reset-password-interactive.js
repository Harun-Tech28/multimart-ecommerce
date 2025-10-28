const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');
require('dotenv').config();

const User = require('./src/models/User');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multimart');
    console.log('✅ Connected to MongoDB\n');
    
    // Show available admin users
    const admins = await User.find({ role: 'admin' }, 'email firstName lastName');
    
    if (admins.length === 0) {
      console.log('❌ No admin users found!');
      await mongoose.connection.close();
      rl.close();
      process.exit(1);
    }
    
    console.log('📋 Available Admin Accounts:\n');
    admins.forEach((admin, index) => {
      console.log(`${index + 1}. ${admin.firstName} ${admin.lastName} (${admin.email})`);
    });
    console.log('');
    
    // Ask which user to reset
    const choice = await question('Enter the number of the account to reset (or press Enter for #1): ');
    const selectedIndex = choice ? parseInt(choice) - 1 : 0;
    
    if (selectedIndex < 0 || selectedIndex >= admins.length) {
      console.log('❌ Invalid selection!');
      await mongoose.connection.close();
      rl.close();
      process.exit(1);
    }
    
    const selectedAdmin = admins[selectedIndex];
    console.log(`\n✅ Selected: ${selectedAdmin.email}\n`);
    
    // Ask for new password
    const newPassword = await question('Enter new password (or press Enter for "Admin123!"): ');
    const password = newPassword || 'Admin123!';
    
    // Validate password
    if (password.length < 8) {
      console.log('❌ Password must be at least 8 characters!');
      await mongoose.connection.close();
      rl.close();
      process.exit(1);
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Update password directly (bypass pre-save hook)
    await User.updateOne(
      { email: selectedAdmin.email },
      { $set: { password: hashedPassword } }
    );
    
    console.log('\n✅ Password reset successfully!\n');
    console.log('═══════════════════════════════════════');
    console.log('📧 Email:', selectedAdmin.email);
    console.log('🔑 Password:', password);
    console.log('═══════════════════════════════════════');
    console.log('\n🔗 Login at: http://localhost:3000/admin/login\n');
    
    await mongoose.connection.close();
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    rl.close();
    process.exit(1);
  }
}

resetPassword();
