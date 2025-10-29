const fs = require('fs');
const path = require('path');

// Function to recursively get all files
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.git')) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      }
    } else if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Get all JS/JSX files in frontend/src
const files = getAllFiles('./frontend/src');

let totalReplacements = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;
  
  // Replace localhost:8000 with localhost:5000
  content = content.replace(/localhost:8000/g, 'localhost:5000');
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    const count = (originalContent.match(/localhost:8000/g) || []).length;
    totalReplacements += count;
    console.log(`✅ Fixed ${count} occurrence(s) in: ${file}`);
  }
});

console.log(`\n🎉 Total replacements: ${totalReplacements}`);
console.log('✅ All API URLs updated from port 8000 to 5000!');
