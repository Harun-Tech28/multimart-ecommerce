const fs = require('fs');
const path = require('path');

console.log('\n🔍 Testing Image Access\n');

const testImages = [
  'CSSS-1761687463855-726309411.jpg',
  'selfie-1761689805810-815164160.jpg',
  'selfie-1761690989182-202108686.jpg'
];

const uploadsDir = path.join(__dirname, 'uploads/products');

console.log(`📁 Uploads directory: ${uploadsDir}\n`);

testImages.forEach(filename => {
  const filePath = path.join(uploadsDir, filename);
  const exists = fs.existsSync(filePath);
  
  if (exists) {
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`✅ ${filename}`);
    console.log(`   Size: ${sizeKB} KB`);
    console.log(`   URL: http://localhost:8000/uploads/products/${filename}`);
  } else {
    console.log(`❌ ${filename} - FILE NOT FOUND!`);
  }
  console.log('');
});

console.log('💡 Test these URLs in your browser:');
testImages.forEach(filename => {
  console.log(`   http://localhost:8000/uploads/products/${filename}`);
});
console.log('');
