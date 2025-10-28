# 📋 File Upload - Quick Reference Card

## 🎯 Quick Facts

| Feature | Details |
|---------|---------|
| **Max File Size** | 50MB per file |
| **Max Files** | 10 files per upload |
| **Image Formats** | JPEG, JPG, PNG, GIF, WEBP |
| **Video Formats** | MP4, AVI, MOV, WMV, WEBM |
| **Storage Location** | `backend/uploads/products/` |
| **Access URL** | `http://localhost:8000/uploads/products/{filename}` |

## 🔗 API Endpoints

### Upload
```
POST /api/upload/product
Headers: Authorization: Bearer <token>
Body: FormData with 'files' field
```

### Delete
```
DELETE /api/upload/product
Headers: Authorization: Bearer <token>
Body: { "filePath": "/uploads/products/file.jpg" }
```

### Access
```
GET /uploads/products/{filename}
```

## 📂 File Structure

```
backend/
├── src/
│   ├── config/
│   │   └── upload.js          ← Multer config
│   ├── controllers/
│   │   └── uploadController.js ← Upload handlers
│   └── routes/
│       └── uploadRoutes.js     ← API routes
└── uploads/
    └── products/               ← Uploaded files
        └── .gitkeep
```

## 🎨 Frontend Location

```
frontend/src/pages/vendor/VendorProductForm.jsx
```

**Section**: Between "Status" field and action buttons

## 💻 Code Snippets

### Upload Files (Frontend)
```javascript
const handleFileUpload = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  
  const response = await fetch('http://localhost:8000/api/upload/product', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  
  return await response.json();
};
```

### Delete File (Frontend)
```javascript
const deleteFile = async (filePath) => {
  const response = await fetch('http://localhost:8000/api/upload/product', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ filePath })
  });
  
  return await response.json();
};
```

## 🔧 Configuration Files

### Change Upload Limit
**File**: `backend/src/config/upload.js`
```javascript
limits: {
  fileSize: 50 * 1024 * 1024 // 50MB
}
```

### Change Max Files
**File**: `backend/src/routes/uploadRoutes.js`
```javascript
upload.array('files', 10) // Max 10 files
```

## 🚀 Testing Steps

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm start`
3. Login as vendor
4. Go to: Vendor Dashboard → Products → Add New Product
5. Scroll to upload section
6. Click upload area
7. Select files
8. Verify upload success
9. Check preview grid
10. Test delete button

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Upload fails | Check file size < 50MB, verify format |
| File not showing | Refresh page, check success message |
| Delete not working | Verify you're logged in as vendor |
| Server error | Check backend logs, verify server running |

## 📚 Documentation Files

1. `PRODUCT_IMAGE_UPLOAD_GUIDE.md` - Full technical guide
2. `VENDOR_UPLOAD_QUICK_START.md` - Vendor instructions
3. `UPLOAD_FEATURE_VISUAL_GUIDE.md` - UI documentation
4. `FILE_UPLOAD_COMPLETE.md` - Implementation details
5. `UPLOAD_IMPLEMENTATION_SUMMARY.md` - Summary
6. `UPLOAD_QUICK_REFERENCE.md` - This file

## ✅ Validation Rules

### File Type
- Must be image (JPEG, JPG, PNG, GIF, WEBP)
- OR video (MP4, AVI, MOV, WMV, WEBM)

### File Size
- Maximum: 50MB per file
- Recommended: < 10MB for images, < 30MB for videos

### File Count
- Maximum: 10 files per upload
- Recommended: 3-5 images per product

## 🔐 Security

- ✅ JWT authentication required
- ✅ Vendor/admin role required
- ✅ File type validation
- ✅ File size limits
- ✅ Unique filenames

## 🎯 Best Practices

### Images
- Use 800x800px minimum
- Square aspect ratio (1:1)
- White/neutral background
- Multiple angles (3-5 images)
- Compress before upload

### Videos
- Keep under 30 seconds
- Good lighting
- Focus on product
- H.264 codec for MP4
- Compress before upload

## 📞 Quick Help

**Can't upload?**
- Check file size and format
- Verify you're logged in
- Check internet connection

**File not displaying?**
- Refresh the page
- Check browser console
- Verify upload success

**Need more help?**
- Check `PRODUCT_IMAGE_UPLOAD_GUIDE.md`
- Review backend logs
- Test with different files

---

**Print this page for quick reference! 📄**
