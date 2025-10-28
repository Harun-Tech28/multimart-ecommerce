const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User');

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multimart');
    console.log('✅ Connected to MongoDB\n');
    
    const users = await User.find({}, 'email role firstName lastName').lean();
    
    if (users.length === 0) {
      console.log('❌ No users found in database!');
      console.log('\n📝 You need to register an admin account first:');
      console.log('   1. Go to http://localhost:3000/register');
      console.log('   2. Fill in the form');
      console.log('   3. Select "Admin" as Account Type');
      console.log('   4. Submit registration\n');
    } else {
      console.log(`✅ Found ${users.length} user(s):\n`);
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.firstName} ${user.lastName}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log('');
      });
    }
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkUsers();
