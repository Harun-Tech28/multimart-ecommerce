# 🔧 Fix Image Upload Issue

Your image upload functionality is already implemented! Let's troubleshoot why it's not working.

---

## ✅ What's Already Set Up

Your system has:
- ✅ Upload controller configured
- ✅ Multer middleware for file handling
- ✅ Upload routes registered
- ✅ Static file serving enabled
- ✅ Frontend upload form ready

---

## 🔍 Common Issues & Solutions

### Issue 1: Backend Not Running

**Symptom:** Upload button doesn't work, no response

**Solution:**
```bash
cd backend
npm start
```

Make sure you see:
```
🚀 Server running in development mode on port 8000
✅ MongoDB Connected
```

---

### Issue 2: Upload Directory Missing

**Symptom:** Error: "ENOENT: no such file or directory"

**Solution:** Run this script to create upload directories:

```bash
cd backend
node create-upload-dirs.js
```

---

### Issue 3: File Size Too Large

**Symptom:** Upload fails with "File too large" error

**Solution:** Your limit is 50MB. If you need larger files:

1. Edit `backend/src/config/upload.js`
2. Change line:
   ```javascript
   fileSize: 50 * 1024 * 1024 // 50MB
   ```
   To:
   ```javascript
   fileSize: 100 * 1024 * 1024 // 100MB
   ```

---

### Issue 4: Wrong File Type

**Symptom:** "Only image files are allowed" error

**Allowed file types:**
- Images: JPEG, JPG, PNG, GIF, WEBP
- Videos: MP4, AVI, MOV, WMV, WEBM

**Solution:** Make sure your files are in these formats.

---

### Issue 5: Not Logged In as Vendor/Admin

**Symptom:** "Unauthorized" or "Access denied" error

**Solution:**
1. Login as vendor or admin
2. Email: `admin@multimart.com`
3. Password: `Admin123`

---

### Issue 6: CORS Error

**Symptom:** "CORS policy" error in browser console

**Solution:** Backend CORS is already configured for `http://localhost:3000`

If using different port, update `backend/.env`:
```
CLIENT_URL=http://localhost:YOUR_PORT
```

---

## 🧪 Test Upload Functionality

### Step 1: Check Upload Directory

```bash
cd backend
node check-upload-setup.js
```

This will:
- Check if upload directories exist
- Create them if missing
- Show current permissions

### Step 2: Test Upload API

```bash
cd backend
node test-upload.js
```

This will test the upload endpoint directly.

---

## 📝 How to Upload Images

### Method 1: Upload from Desktop (Recommended)

1. **Login as Vendor/Admin**
   - Go to: http://localhost:3000/login
   - Email: `admin@multimart.com`
   - Password: `Admin123`

2. **Go to Add Product**
   - Click "Vendor" in header
   - Click "Products" in sidebar
   - Click "Add Product" button

3. **Upload Images**
   - Scroll to "Upload Product Images/Videos" section
   - Click the upload area
   - Select images from your desktop
   - Wait for "Files uploaded successfully!" message

4. **Save Product**
   - Fill in other product details
   - Click "Create Product"

### Method 2: Use Image URLs

If upload doesn't work, you can use image URLs:

1. In the product form, scroll to "Or Add Image URLs"
2. Paste image URLs (e.g., from Unsplash, Pexels, or your own hosting)
3. Click "+ Add Another Image URL" for more images

---

## 🔧 Manual Fix

If upload still doesn't work, run these commands:

```bash
# 1. Create upload directories
cd backend
mkdir -p uploads/products

# 2. Check permissions (Windows)
icacls uploads /grant Everyone:F /T

# 3. Restart backend
npm start
```

---

## 🎯 Quick Test

### Test with Sample Image:

1. **Start servers:**
   ```bash
   # Terminal 1
   cd backend && npm start
   
   # Terminal 2
   cd frontend && npm start
   ```

2. **Open browser:**
   - Go to: http://localhost:3000/vendor/products/new

3. **Try uploading:**
   - Click upload area
   - Select any image from your desktop
   - Should see "Files uploaded successfully!"

---

## 📊 Check Upload Status

Run this to see uploaded files:

```bash
cd backend
node list-uploads.js
```

This shows:
- Number of uploaded files
- File names and sizes
- Upload directory path

---

## 🆘 Still Not Working?

### Check Browser Console:

1. Press **F12** to open DevTools
2. Go to **Console** tab
3. Try uploading an image
4. Look for error messages

### Common Console Errors:

**"Failed to fetch"**
- Backend not running
- Wrong API URL
- CORS issue

**"401 Unauthorized"**
- Not logged in
- Token expired
- Wrong user role

**"413 Payload Too Large"**
- File too big (max 50MB)
- Reduce file size

**"400 Bad Request"**
- Wrong file type
- No file selected

---

## 💡 Pro Tips

### Optimize Images Before Upload:

1. **Resize large images:**
   - Use: https://tinypng.com
   - Or: https://squoosh.app
   - Recommended: 1200x1200px max

2. **Convert to WebP:**
   - Smaller file size
   - Better quality
   - Faster loading

### Best Practices:

- Upload 3-5 images per product
- Use high-quality images
- Show product from different angles
- Include lifestyle shots
- Keep file sizes under 5MB each

---

## 🔄 Alternative: Use External Image Hosting

If local upload doesn't work, use these free services:

1. **Cloudinary** (https://cloudinary.com)
   - Free tier: 25GB storage
   - Easy image management
   - CDN delivery

2. **ImgBB** (https://imgbb.com)
   - Free unlimited uploads
   - Direct image URLs
   - No account needed

3. **Imgur** (https://imgur.com)
   - Free image hosting
   - Direct links
   - Easy to use

**How to use:**
1. Upload images to any service above
2. Copy the direct image URL
3. Paste in "Add Image URLs" section in product form

---

## 📁 Upload Directory Structure

Your uploads are stored here:
```
backend/
  uploads/
    products/
      image-1234567890.jpg
      image-1234567891.png
      video-1234567892.mp4
```

Access uploaded files at:
```
http://localhost:8000/uploads/products/filename.jpg
```

---

## ✅ Verification Checklist

- [ ] Backend server running on port 8000
- [ ] Frontend running on port 3000
- [ ] Logged in as vendor or admin
- [ ] Upload directory exists (`backend/uploads/products`)
- [ ] File is correct type (JPEG, PNG, GIF, WEBP)
- [ ] File is under 50MB
- [ ] No console errors in browser
- [ ] No errors in backend terminal

---

## 🎉 Success!

Once upload works, you'll see:
- ✅ "Files uploaded successfully!" message
- ✅ Image preview in the form
- ✅ Image saved with product
- ✅ Image displays on product page

---

**Need more help? Check the detailed guide:** `PRODUCT_IMAGE_UPLOAD_GUIDE.md`
