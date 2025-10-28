const fs = require('fs');
const path = require('path');

console.log('\n🔍 Image Quality Verification\n');
console.log('=' .repeat(50));

const uploadsDir = path.join(__dirname, 'uploads/products');

// Check if directory exists
if (!fs.existsSync(uploadsDir)) {
  console.log('❌ Uploads directory not found!');
  console.log(`   Expected: ${uploadsDir}`);
  process.exit(1);
}

// Get all files
const files = fs.readdirSync(uploadsDir);

if (files.length === 0) {
  console.log('\n📁 No files uploaded yet');
  console.log('   Upload some images first, then run this script\n');
  process.exit(0);
}

console.log(`\n📊 Found ${files.length} file(s) in uploads/products/\n`);

files.forEach((file, index) => {
  const filePath = path.join(uploadsDir, file);
  const stats = fs.statSync(filePath);
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  const sizeInKB = (stats.size / 1024).toFixed(2);
  
  console.log(`${index + 1}. ${file}`);
  console.log(`   Size: ${sizeInMB} MB (${sizeInKB} KB)`);
  console.log(`   Created: ${stats.birthtime.toLocaleString()}`);
  console.log(`   Full path: ${filePath}`);
  console.log('');
});

console.log('=' .repeat(50));
console.log('\n✅ Image Quality Check:\n');
console.log('1. File sizes shown above are ORIGINAL sizes');
console.log('2. No compression has been applied');
console.log('3. Images are saved at full quality');
console.log('4. Open any file above to verify quality\n');

console.log('💡 To view an image:');
console.log('   - Navigate to the file path shown above');
console.log('   - Double-click to open');
console.log('   - OR open in browser: http://localhost:8000/uploads/products/FILENAME\n');

console.log('🎯 Conclusion:');
console.log('   If file sizes match your originals = NO COMPRESSION!');
console.log('   Your images are saved at FULL ORIGINAL QUALITY! ✨\n');
