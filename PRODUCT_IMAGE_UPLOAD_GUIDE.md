# Product Image & Video Upload Guide

## Overview

The MultiMart platform now supports uploading product images and videos directly from your device. Vendors can upload media files when creating or editing products.

## Features

✅ **Multiple File Upload** - Upload up to 10 files at once
✅ **Image Support** - JPEG, JPG, PNG, GIF, WEBP formats
✅ **Video Support** - MP4, AVI, MOV, WMV, WEBM formats
✅ **Large File Support** - Up to 50MB per file
✅ **Preview & Delete** - View uploaded files and remove them if needed
✅ **Mixed Sources** - Combine uploaded files with URL-based images

## How to Upload Product Media

### Step 1: Navigate to Add/Edit Product

1. Login as a vendor
2. Go to **Vendor Dashboard** → **Products**
3. Click **Add New Product** or edit an existing product

### Step 2: Upload Files

1. Scroll to the **"Upload Product Images/Videos"** section
2. Click on the upload area or drag and drop files
3. Select one or multiple files from your device
4. Wait for the upload to complete (you'll see a success message)

### Step 3: Manage Uploaded Files

- **Preview**: Uploaded images and videos appear in a grid below the upload area
- **Delete**: Hover over any file and click the ❌ button to remove it
- **Add More**: You can upload additional files at any time

### Step 4: Optional - Add Image URLs

If you prefer to use images hosted elsewhere:
1. Scroll to **"Or Add Image URLs"** section
2. Enter the full URL of the image
3. Click **"+ Add Another Image URL"** for multiple URLs

### Step 5: Save Product

Click **"Create Product"** or **"Update Product"** to save your changes.

## Technical Details

### Backend Implementation

#### Upload Endpoint
```
POST /api/upload/product
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
- `files`: Array of files (max 10 files)

**Response:**
```json
{
  "success": true,
  "message": "Files uploaded successfully",
  "data": {
    "files": [
      "/uploads/products/product-image-1234567890.jpg",
      "/uploads/products/product-video-1234567891.mp4"
    ]
  }
}
```

#### Delete Endpoint
```
DELETE /api/upload/product
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "filePath": "/uploads/products/product-image-1234567890.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

### File Storage

- **Location**: `backend/uploads/products/`
- **Naming**: `{original-name}-{timestamp}-{random}.{ext}`
- **Access**: Files are served statically at `http://localhost:8000/uploads/products/{filename}`

### Security Features

1. **Authentication Required**: Only authenticated vendors can upload files
2. **File Type Validation**: Only allowed image and video formats
3. **File Size Limit**: Maximum 50MB per file
4. **Unique Filenames**: Prevents filename conflicts
5. **Secure Storage**: Files stored outside web root with controlled access

## File Specifications

### Supported Image Formats
- JPEG / JPG
- PNG
- GIF
- WEBP

### Supported Video Formats
- MP4
- AVI
- MOV
- WMV
- WEBM

### File Size Limits
- **Maximum per file**: 50MB
- **Recommended image size**: 1200x1200px or smaller
- **Recommended video length**: Under 30 seconds for best performance

## Best Practices

### For Images
1. **Optimize before upload**: Compress images to reduce file size
2. **Use consistent dimensions**: Square images (1:1 ratio) work best
3. **High quality**: Use at least 800x800px for product images
4. **Multiple angles**: Upload 3-5 images showing different views
5. **White background**: Use clean backgrounds for professional look

### For Videos
1. **Keep it short**: 10-30 seconds is ideal
2. **Show the product**: Focus on product features and usage
3. **Good lighting**: Ensure video is well-lit and clear
4. **Compress videos**: Use H.264 codec for MP4 files
5. **Add captions**: Consider adding text overlays for key features

## Troubleshooting

### Upload Fails

**Problem**: "Failed to upload files" error

**Solutions**:
- Check file size (must be under 50MB)
- Verify file format is supported
- Ensure you're logged in as a vendor
- Check your internet connection
- Try uploading fewer files at once

### File Not Displaying

**Problem**: Uploaded file doesn't show in preview

**Solutions**:
- Refresh the page
- Check browser console for errors
- Verify the file uploaded successfully (check success message)
- Ensure backend server is running

### Delete Not Working

**Problem**: Can't delete uploaded file

**Solutions**:
- Ensure you're the owner of the product
- Check if you have vendor permissions
- Verify backend server is running
- Try refreshing the page

## API Integration Example

### Upload Files with JavaScript

```javascript
const uploadFiles = async (files) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  
  files.forEach(file => {
    formData.append('files', file);
  });

  const response = await fetch('http://localhost:8000/api/upload/product', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  const data = await response.json();
  return data;
};
```

### Delete File with JavaScript

```javascript
const deleteFile = async (filePath) => {
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:8000/api/upload/product', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ filePath })
  });

  const data = await response.json();
  return data;
};
```

## Configuration

### Modify Upload Limits

Edit `backend/src/config/upload.js`:

```javascript
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // Change this value (in bytes)
  }
});
```

### Change Upload Directory

Edit `backend/src/config/upload.js`:

```javascript
const uploadDir = path.join(__dirname, '../../uploads');
const productImagesDir = path.join(uploadDir, 'products');
```

### Add More File Types

Edit `backend/src/config/upload.js`:

```javascript
const fileFilter = (req, file, cb) => {
  const imageTypes = /jpeg|jpg|png|gif|webp|svg/; // Add more types
  const videoTypes = /mp4|avi|mov|wmv|webm|mkv/; // Add more types
  // ... rest of the code
};
```

## Production Considerations

### For Production Deployment

1. **Use Cloud Storage**: Consider AWS S3, Google Cloud Storage, or Cloudinary
2. **CDN Integration**: Serve files through a CDN for better performance
3. **Image Optimization**: Implement automatic image compression and resizing
4. **Backup Strategy**: Regular backups of uploaded files
5. **Monitoring**: Track upload success rates and file storage usage

### Recommended Services

- **AWS S3**: Scalable object storage
- **Cloudinary**: Image and video management with transformations
- **Google Cloud Storage**: Reliable cloud storage
- **Azure Blob Storage**: Microsoft's cloud storage solution

## Support

For issues or questions:
- Check the troubleshooting section above
- Review backend logs: `backend/logs/`
- Contact support: support@multimart.com

---

**Last Updated**: October 2024
**Version**: 1.0.0
