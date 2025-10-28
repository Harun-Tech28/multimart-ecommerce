# 📸 Product Upload Feature - Visual Guide

## User Interface Overview

This guide shows what vendors will see when uploading product images and videos.

## 1. Upload Section Location

The upload section appears in the **Add/Edit Product** form, after the product details fields and before the action buttons.

```
┌─────────────────────────────────────────────────────┐
│  Add New Product                                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Product Name *                                     │
│  [________________________]                         │
│                                                     │
│  Description                                        │
│  [________________________]                         │
│  [________________________]                         │
│                                                     │
│  Price ($) *        Discount (%)                    │
│  [_______]          [_______]                       │
│                                                     │
│  Stock *            Category *                      │
│  [_______]          [▼ Select category]            │
│                                                     │
│  Status                                             │
│  [▼ Active]                                         │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ 📤 Upload Product Images/Videos               │ │
│  │                                                │ │
│  │  ┌─────────────────────────────────────────┐  │ │
│  │  │         ☁️                              │  │ │
│  │  │    Click to upload files                │  │ │
│  │  │  Images (JPEG, PNG, GIF, WEBP) or       │  │ │
│  │  │  Videos (MP4, AVI, MOV, WEBM)           │  │ │
│  │  │      Max file size: 50MB                │  │ │
│  │  └─────────────────────────────────────────┘  │ │
│  │                                                │ │
│  │  Uploaded Files:                               │ │
│  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐                 │ │
│  │  │img │ │img │ │vid │ │img │                 │ │
│  │  │ ❌ │ │ ❌ │ │ ❌ │ │ ❌ │                 │ │
│  │  └────┘ └────┘ └────┘ └────┘                 │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  Or Add Image URLs                                  │
│  [________________________] [Remove]                │
│  + Add Another Image URL                            │
│                                                     │
│  [Create Product] [Cancel]                          │
└─────────────────────────────────────────────────────┘
```

## 2. Upload Area States

### Initial State (Empty)
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                      ☁️                             │
│                                                     │
│              Click to upload files                  │
│                                                     │
│   Images (JPEG, PNG, GIF, WEBP) or Videos          │
│        (MP4, AVI, MOV, WEBM)                        │
│                                                     │
│            Max file size: 50MB                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Uploading State
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                      ⏳                             │
│                                                     │
│                  Uploading...                       │
│                                                     │
│              Please wait...                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Success State
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                      ✅                             │
│                                                     │
│              Click to upload files                  │
│                                                     │
│   Images (JPEG, PNG, GIF, WEBP) or Videos          │
│        (MP4, AVI, MOV, WEBM)                        │
│                                                     │
│            Max file size: 50MB                      │
│                                                     │
└─────────────────────────────────────────────────────┘

✅ Files uploaded successfully!
```

## 3. File Preview Grid

### Image Preview
```
Uploaded Files:

┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│          │  │          │  │          │  │          │
│  [IMG]   │  │  [IMG]   │  │  [IMG]   │  │  [IMG]   │
│          │  │          │  │          │  │          │
│    ❌    │  │    ❌    │  │    ❌    │  │    ❌    │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
 product-1     product-2     product-3     product-4
```

### Video Preview
```
Uploaded Files:

┌──────────┐  ┌──────────┐
│  ▶️      │  │  ▶️      │
│  VIDEO   │  │  VIDEO   │
│  [====]  │  │  [====]  │
│    ❌    │  │    ❌    │
└──────────┘  └──────────┘
 demo.mp4      tutorial.mp4
```

### Mixed Media Preview
```
Uploaded Files:

┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│          │  │  ▶️      │  │          │  │          │
│  [IMG]   │  │  VIDEO   │  │  [IMG]   │  │  [IMG]   │
│          │  │  [====]  │  │          │  │          │
│    ❌    │  │    ❌    │  │    ❌    │  │    ❌    │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

## 4. Hover Effects

### Before Hover
```
┌──────────┐
│          │
│  [IMG]   │
│          │
│          │
└──────────┘
```

### On Hover (Delete Button Appears)
```
┌──────────┐
│    ❌    │  ← Delete button appears
│  [IMG]   │
│          │
│          │
└──────────┘
```

## 5. URL Input Section

```
Or Add Image URLs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You can also add images by URL if you prefer

┌────────────────────────────────────────┐  ┌────────┐
│ https://example.com/image.jpg          │  │ Remove │
└────────────────────────────────────────┘  └────────┘

┌────────────────────────────────────────┐  ┌────────┐
│ https://example.com/image2.jpg         │  │ Remove │
└────────────────────────────────────────┘  └────────┘

+ Add Another Image URL
```

## 6. Complete Form Example

```
╔═══════════════════════════════════════════════════════╗
║  Add New Product                                      ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║  Product Name *                                       ║
║  ┌─────────────────────────────────────────────────┐ ║
║  │ Wireless Bluetooth Headphones                   │ ║
║  └─────────────────────────────────────────────────┘ ║
║                                                       ║
║  Description                                          ║
║  ┌─────────────────────────────────────────────────┐ ║
║  │ Premium wireless headphones with noise          │ ║
║  │ cancellation and 30-hour battery life           │ ║
║  └─────────────────────────────────────────────────┘ ║
║                                                       ║
║  Price ($) *        Discount (%)                      ║
║  ┌──────────┐      ┌──────────┐                      ║
║  │ 149.99   │      │ 10       │                      ║
║  └──────────┘      └──────────┘                      ║
║                                                       ║
║  Stock *            Category *                        ║
║  ┌──────────┐      ┌──────────────────┐              ║
║  │ 50       │      │ Electronics ▼    │              ║
║  └──────────┘      └──────────────────┘              ║
║                                                       ║
║  Status                                               ║
║  ┌──────────────────┐                                ║
║  │ Active ▼         │                                ║
║  └──────────────────┘                                ║
║                                                       ║
║  ╔═══════════════════════════════════════════════╗   ║
║  ║ 📤 Upload Product Images/Videos               ║   ║
║  ╠═══════════════════════════════════════════════╣   ║
║  ║                                                ║   ║
║  ║  ┌───────────────────────────────────────────┐║   ║
║  ║  │              ☁️                           │║   ║
║  ║  │       Click to upload files               │║   ║
║  ║  │  Images (JPEG, PNG, GIF, WEBP) or        │║   ║
║  ║  │  Videos (MP4, AVI, MOV, WEBM)            │║   ║
║  ║  │       Max file size: 50MB                 │║   ║
║  ║  └───────────────────────────────────────────┘║   ║
║  ║                                                ║   ║
║  ║  Uploaded Files:                               ║   ║
║  ║  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐          ║   ║
║  ║  │img │ │img │ │img │ │vid │ │img │          ║   ║
║  ║  │ ❌ │ │ ❌ │ │ ❌ │ │ ❌ │ │ ❌ │          ║   ║
║  ║  └────┘ └────┘ └────┘ └────┘ └────┘          ║   ║
║  ╚═══════════════════════════════════════════════╝   ║
║                                                       ║
║  Or Add Image URLs                                    ║
║  ┌─────────────────────────────────────┐ ┌────────┐  ║
║  │ https://example.com/extra.jpg       │ │ Remove │  ║
║  └─────────────────────────────────────┘ └────────┘  ║
║  + Add Another Image URL                              ║
║                                                       ║
║  ┌──────────────────┐  ┌──────────────────┐          ║
║  │ Create Product   │  │     Cancel       │          ║
║  └──────────────────┘  └──────────────────┘          ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

## 7. Mobile View

```
┌─────────────────────────┐
│  Add New Product        │
├─────────────────────────┤
│                         │
│  Product Name *         │
│  [___________________]  │
│                         │
│  Description            │
│  [___________________]  │
│  [___________________]  │
│                         │
│  Price ($) *            │
│  [___________________]  │
│                         │
│  Discount (%)           │
│  [___________________]  │
│                         │
│  Stock *                │
│  [___________________]  │
│                         │
│  Category *             │
│  [▼ Select category]    │
│                         │
│  Status                 │
│  [▼ Active]             │
│                         │
│  ┌─────────────────────┐│
│  │ 📤 Upload Files     ││
│  │                     ││
│  │  ┌─────────────────┐││
│  │  │      ☁️         │││
│  │  │  Click to       │││
│  │  │  upload files   │││
│  │  │  Max: 50MB      │││
│  │  └─────────────────┘││
│  │                     ││
│  │  Uploaded:          ││
│  │  ┌───┐ ┌───┐       ││
│  │  │img│ │img│       ││
│  │  │ ❌│ │ ❌│       ││
│  │  └───┘ └───┘       ││
│  │  ┌───┐ ┌───┐       ││
│  │  │vid│ │img│       ││
│  │  │ ❌│ │ ❌│       ││
│  │  └───┘ └───┘       ││
│  └─────────────────────┘│
│                         │
│  Or Add URLs            │
│  [___________________]  │
│  + Add Another URL      │
│                         │
│  [Create Product]       │
│  [Cancel]               │
│                         │
└─────────────────────────┘
```

## 8. Color Scheme

### Upload Area
- **Border**: Dashed gray (#D1D5DB)
- **Border on Hover**: Blue (#3B82F6)
- **Background**: White (#FFFFFF)
- **Icon Color**: Gray (#9CA3AF)
- **Text Color**: Blue (#2563EB)
- **Helper Text**: Gray (#6B7280)

### File Preview
- **Background**: White (#FFFFFF)
- **Border**: Light gray (#E5E7EB)
- **Border Radius**: 8px
- **Delete Button**: Red (#EF4444)
- **Delete Button Hover**: Dark Red (#DC2626)

### Success Message
- **Background**: Light Green (#D1FAE5)
- **Text**: Dark Green (#065F46)
- **Icon**: Green (#10B981)

### Error Message
- **Background**: Light Red (#FEE2E2)
- **Text**: Dark Red (#991B1B)
- **Icon**: Red (#EF4444)

## 9. Responsive Breakpoints

### Desktop (≥1024px)
- Upload area: Full width
- Preview grid: 4 columns
- File size: 200x200px

### Tablet (768px - 1023px)
- Upload area: Full width
- Preview grid: 3 columns
- File size: 150x150px

### Mobile (≤767px)
- Upload area: Full width
- Preview grid: 2 columns
- File size: 120x120px

## 10. Animations

### Upload Button
- Hover: Scale 1.02, shadow increase
- Click: Scale 0.98

### Delete Button
- Opacity: 0 → 1 on hover (0.3s ease)
- Hover: Background red, scale 1.1

### File Preview
- Appear: Fade in + slide up (0.3s ease)
- Remove: Fade out + scale down (0.2s ease)

### Success Message
- Appear: Slide down from top (0.3s ease)
- Auto-hide: After 3 seconds

## 11. Accessibility Features

- ✅ Keyboard navigation support
- ✅ Screen reader labels
- ✅ Focus indicators
- ✅ Alt text for images
- ✅ ARIA labels for buttons
- ✅ Color contrast compliance (WCAG AA)

## 12. Error States

### File Too Large
```
┌─────────────────────────────────────────┐
│  ❌ Error                               │
│  File size must be less than 50MB      │
└─────────────────────────────────────────┘
```

### Invalid File Type
```
┌─────────────────────────────────────────┐
│  ❌ Error                               │
│  Please upload only image or video     │
│  files (JPEG, PNG, GIF, WEBP, MP4...)  │
└─────────────────────────────────────────┘
```

### Upload Failed
```
┌─────────────────────────────────────────┐
│  ❌ Error                               │
│  Failed to upload files. Please try    │
│  again or check your connection.       │
└─────────────────────────────────────────┘
```

---

## Tips for Best Visual Experience

1. **Use high-quality images** (at least 800x800px)
2. **Keep consistent aspect ratios** (square images work best)
3. **Use good lighting** for product photos
4. **Show multiple angles** (3-5 images recommended)
5. **Keep videos short** (10-30 seconds)
6. **Use clean backgrounds** (white or neutral)

---

**Last Updated**: October 2024
