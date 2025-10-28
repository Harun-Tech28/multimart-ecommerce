# 🔐 Password Reset Feature - Complete Guide

## ✅ Feature Implemented!

I've implemented a complete password reset system for your MultiMart application. Users can now reset their passwords if they forget them.

---

## 🎯 How It Works

### For Users:

1. **Forgot Password Page** (`/forgot-password`)
   - User enters their email address
   - System generates a 6-digit reset code
   - Code is valid for 10 minutes

2. **Reset Password Page** (`/reset-password`)
   - User enters their email
   - User enters the 6-digit reset code
   - User creates a new password
   - Password is reset successfully

---

## 📋 Step-by-Step Usage

### Step 1: Request Password Reset

1. Go to: `http://localhost:3000/forgot-password`
2. Enter your email address
3. Click "Send Reset Link"
4. You'll see a success message with the reset code (in development mode)

### Step 2: Reset Your Password

1. Copy the 6-digit reset code shown on screen
2. Click "Enter Reset Code →" or go to `/reset-password`
3. Enter:
   - Your email address
   - The 6-digit reset code
   - Your new password (min 8 chars, uppercase, lowercase, number)
   - Confirm new password
4. Click "Reset Password"
5. Success! You'll be redirected to login

---

## 🔧 Technical Implementation

### Backend (Node.js/Express)

**New API Endpoints:**

1. **POST `/api/auth/forgot-password`**
   - Accepts: `{ email }`
   - Returns: Reset code (in development)
   - Generates 6-digit code
   - Stores hashed token in database
   - Token expires in 10 minutes

2. **POST `/api/auth/reset-password`**
   - Accepts: `{ email, resetToken, newPassword }`
   - Validates token and expiry
   - Updates password
   - Clears reset token

**Files Modified:**
- `backend/src/controllers/authController.js` - Added `forgotPassword` and `resetPassword` functions
- `backend/src/routes/authRoutes.js` - Routes already existed

### Frontend (React)

**New Pages:**

1. **ForgotPassword** (`/forgot-password`)
   - Email input form
   - Shows reset code in development mode
   - Link to reset password page

2. **ResetPassword** (`/reset-password`)
   - Email, reset code, and new password inputs
   - Password strength validation
   - Redirects to login on success

**Files Created/Modified:**
- `frontend/src/pages/ResetPassword.jsx` - New page
- `frontend/src/pages/ForgotPassword.jsx` - Updated to show reset code
- `frontend/src/App.js` - Added `/reset-password` route

---

## 🎨 Features

### Security Features:
- ✅ Reset tokens are hashed before storage
- ✅ Tokens expire after 10 minutes
- ✅ Password strength validation
- ✅ Doesn't reveal if email exists (security best practice)
- ✅ One-time use tokens

### User Experience:
- ✅ Clear step-by-step process
- ✅ Visual feedback with toasts
- ✅ Password visibility toggle
- ✅ Helpful error messages
- ✅ Auto-redirect after success

### Development Mode:
- ✅ Reset code shown on screen (no email needed)
- ✅ Easy testing without email setup

---

## 🧪 Testing the Feature

### Test Scenario 1: Reset Admin Password

1. Go to `http://localhost:3000/forgot-password`
2. Enter: `admin@multimart.com`
3. Click "Send Reset Link"
4. Copy the 6-digit code shown
5. Click "Enter Reset Code →"
6. Enter:
   - Email: `admin@multimart.com`
   - Reset Code: (paste the code)
   - New Password: `NewAdmin123!`
   - Confirm: `NewAdmin123!`
7. Click "Reset Password"
8. Login with new password at `/admin/login`

### Test Scenario 2: Invalid Code

1. Request reset code
2. Enter wrong code
3. Should show "Invalid or expired reset token"

### Test Scenario 3: Expired Code

1. Request reset code
2. Wait 11 minutes
3. Try to reset
4. Should show "Invalid or expired reset token"

---

## 🔗 Access Points

### From Login Page:
- Click "Forgot password?" link
- Goes to `/forgot-password`

### From Admin Login Page:
- Click "Forgot password?" link
- Goes to `/forgot-password`

### Direct URLs:
- Forgot Password: `http://localhost:3000/forgot-password`
- Reset Password: `http://localhost:3000/reset-password`

---

## 📧 Email Integration (Production)

For production, you'll want to send the reset code via email instead of showing it on screen.

### Recommended Email Services:
- **SendGrid** - Easy to use, free tier available
- **AWS SES** - Cost-effective for high volume
- **Mailgun** - Developer-friendly
- **Nodemailer** - Self-hosted SMTP

### Implementation Steps:

1. **Install email package:**
```bash
npm install nodemailer
```

2. **Update `forgotPassword` function:**
```javascript
// Instead of returning resetToken in response
// Send email:
const transporter = nodemailer.createTransport({...});
await transporter.sendMail({
  to: user.email,
  subject: 'Password Reset Code',
  html: `Your reset code is: <strong>${resetToken}</strong>`
});

// Return without token
res.status(200).json({
  success: true,
  message: 'Password reset code sent to your email'
});
```

3. **Remove development code:**
- Remove `resetToken` from response
- Remove reset code display from frontend

---

## 🛡️ Security Best Practices

### Current Implementation:
- ✅ Tokens are hashed (SHA-256)
- ✅ Short expiry time (10 minutes)
- ✅ One-time use tokens
- ✅ Password strength requirements
- ✅ No user enumeration

### Additional Recommendations:
- Rate limiting on forgot password endpoint
- CAPTCHA to prevent abuse
- Log all password reset attempts
- Notify users via email when password is changed
- Require re-authentication for sensitive actions

---

## 🐛 Troubleshooting

### Issue: "Invalid or expired reset token"

**Solutions:**
- Check if code was copied correctly
- Verify code hasn't expired (10 min limit)
- Request a new code
- Check email matches the one used to request code

### Issue: "Password must be at least 8 characters..."

**Solution:**
- Password must have:
  - At least 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
- Example: `MyPass123!`

### Issue: Reset code not showing

**Solution:**
- Check browser console for errors
- Verify backend is running
- Check API response in Network tab

---

## 📊 Database Schema

The User model already has these fields:

```javascript
{
  resetPasswordToken: String,      // Hashed reset token
  resetPasswordExpire: Date         // Expiry timestamp
}
```

These fields are automatically cleared after successful password reset.

---

## 🎯 Quick Reference

### API Endpoints:
```
POST /api/auth/forgot-password
Body: { email: "user@example.com" }

POST /api/auth/reset-password
Body: { 
  email: "user@example.com",
  resetToken: "123456",
  newPassword: "NewPass123!"
}
```

### Frontend Routes:
```
/forgot-password  - Request reset code
/reset-password   - Enter code and new password
```

### Password Requirements:
```
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
```

---

## ✅ Feature Complete!

Your password reset system is now fully functional. Users can:
- Request a password reset
- Receive a secure reset code
- Set a new password
- Login with the new password

**The feature works for all user types:**
- Regular customers
- Vendors
- Admins

---

## 🚀 Next Steps

1. **Test the feature** with different user accounts
2. **Customize the UI** to match your brand
3. **Set up email service** for production
4. **Add rate limiting** to prevent abuse
5. **Monitor reset attempts** in logs

---

**Your password reset feature is ready to use!** 🎉

Try it now at: `http://localhost:3000/forgot-password`
