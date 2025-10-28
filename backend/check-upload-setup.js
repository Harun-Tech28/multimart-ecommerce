const fs = require('fs');
const path = require('path');

console.log('\n🔍 Checking upload setup...\n');

const uploadDir = path.join(__dirname, 'uploads');
const productsDir = path.join(uploadDir, 'products');

// Check uploads directory
if (fs.existsSync(uploadDir)) {
  console.log('✅ uploads/ directory exists');
  
  // Check permissions
  try {
    fs.accessSync(uploadDir, fs.constants.W_OK);
    console.log('✅ uploads/ is writable');
  } catch (err) {
    console.log('❌ uploads/ is NOT writable');
    console.log('   Run: icacls uploads /grant Everyone:F /T');
  }
} else {
  console.log('❌ uploads/ directory missing');
  console.log('   Run: node create-upload-dirs.js');
}

// Check products directory
if (fs.existsSync(productsDir)) {
  console.log('✅ uploads/products/ directory exists');
  
  // Check permissions
  try {
    fs.accessSync(productsDir, fs.constants.W_OK);
    console.log('✅ uploads/products/ is writable');
  } catch (err) {
    console.log('❌ uploads/products/ is NOT writable');
  }
  
  // Count files
  const files = fs.readdirSync(productsDir).filter(f => f !== '.gitkeep');
  console.log(`📊 Uploaded files: ${files.length}`);
  
  if (files.length > 0) {
    console.log('\n📁 Recent uploads:');
    files.slice(0, 5).forEach(file => {
      const stats = fs.statSync(path.join(productsDir, file));
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`   - ${file} (${sizeMB} MB)`);
    });
  }
} else {
  console.log('❌ uploads/products/ directory missing');
  console.log('   Run: node create-upload-dirs.js');
}

// Check multer package
try {
  require('multer');
  console.log('✅ multer package installed');
} catch (err) {
  console.log('❌ multer package missing');
  console.log('   Run: npm install multer');
}

// Check upload config
const configPath = path.join(__dirname, 'src/config/upload.js');
if (fs.existsSync(configPath)) {
  console.log('✅ upload.js config exists');
} else {
  console.log('❌ upload.js config missing');
}

// Check upload controller
const controllerPath = path.join(__dirname, 'src/controllers/uploadController.js');
if (fs.existsSync(controllerPath)) {
  console.log('✅ uploadController.js exists');
} else {
  console.log('❌ uploadController.js missing');
}

// Check upload routes
const routesPath = path.join(__dirname, 'src/routes/uploadRoutes.js');
if (fs.existsSync(routesPath)) {
  console.log('✅ uploadRoutes.js exists');
} else {
  console.log('❌ uploadRoutes.js missing');
}

console.log('\n📍 Upload directory path:');
console.log(`   ${productsDir}`);

console.log('\n🌐 Access uploaded files at:');
console.log('   http://localhost:8000/uploads/products/filename.jpg\n');
