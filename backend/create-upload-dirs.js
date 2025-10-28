const fs = require('fs');
const path = require('path');

console.log('\n📁 Creating upload directories...\n');

const uploadDir = path.join(__dirname, 'uploads');
const productsDir = path.join(uploadDir, 'products');

try {
  // Create uploads directory
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('✅ Created: uploads/');
  } else {
    console.log('✅ Already exists: uploads/');
  }

  // Create products directory
  if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir, { recursive: true });
    console.log('✅ Created: uploads/products/');
  } else {
    console.log('✅ Already exists: uploads/products/');
  }

  // Create .gitkeep files
  const gitkeepPath = path.join(productsDir, '.gitkeep');
  if (!fs.existsSync(gitkeepPath)) {
    fs.writeFileSync(gitkeepPath, '');
    console.log('✅ Created: .gitkeep file');
  }

  console.log('\n🎉 Upload directories are ready!');
  console.log('\n📍 Upload path:', productsDir);
  console.log('\n💡 You can now upload product images!\n');

} catch (error) {
  console.error('❌ Error creating directories:', error.message);
  process.exit(1);
}
