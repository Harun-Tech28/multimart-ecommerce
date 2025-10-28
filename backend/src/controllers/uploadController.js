const path = require('path');
const fs = require('fs');

// @desc    Upload product images/videos
// @route   POST /api/upload/product
// @access  Private (vendor only)
exports.uploadProductMedia = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'NO_FILES',
          message: 'Please upload at least one file'
        }
      });
    }

    // Generate URLs for uploaded files
    const fileUrls = req.files.map(file => {
      return `/uploads/products/${file.filename}`;
    });

    res.status(200).json({
      success: true,
      message: 'Files uploaded successfully',
      data: {
        files: fileUrls
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete uploaded file
// @route   DELETE /api/upload/product
// @access  Private (vendor only)
exports.deleteProductMedia = async (req, res, next) => {
  try {
    const { filePath } = req.body;

    if (!filePath) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'FILE_PATH_REQUIRED',
          message: 'File path is required'
        }
      });
    }

    // Extract filename from path
    const filename = path.basename(filePath);
    const fullPath = path.join(__dirname, '../../uploads/products', filename);

    // Check if file exists
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      return res.status(200).json({
        success: true,
        message: 'File deleted successfully'
      });
    } else {
      return res.status(404).json({
        success: false,
        error: {
          code: 'FILE_NOT_FOUND',
          message: 'File not found'
        }
      });
    }
  } catch (error) {
    next(error);
  }
};
