const bcrypt = require('bcryptjs');

async function testPassword() {
  const password = 'Admin123!';
  const hash = '$2a$10$cPr04P1HdbiR/twyX.DJYu/fMgc7HkIPIS3.4yqT7X93wgyt/7q6C';
  
  console.log('Testing password:', password);
  console.log('Against hash:', hash);
  console.log('');
  
  const isMatch = await bcrypt.compare(password, hash);
  
  if (isMatch) {
    console.log('✅ Password matches! You should be able to login.');
  } else {
    console.log('❌ Password does NOT match!');
  }
  
  // Test other common passwords
  const testPasswords = ['admin123!', 'ADMIN123!', 'Admin123', 'admin@123'];
  
  console.log('\nTesting other variations:');
  for (const testPwd of testPasswords) {
    const match = await bcrypt.compare(testPwd, hash);
    console.log(`  ${testPwd}: ${match ? '✅ Match' : '❌ No match'}`);
  }
}

testPassword();
