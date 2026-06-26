# 📸 Image Guide for UGET Website

## How to Add Images to News Posts

### Option 1: Use External Image URLs (Recommended)

You can use images from any public URL. Here are some free options:

#### 1. **Upload to GitHub** (Recommended - Free & Fast)
1. Create a folder in your repo: `/public/news-images/`
2. Add your images there
3. Use URL: `https://yourdomain.com/news-images/image-name.jpg`

#### 2. **Free Image Hosting Services**
- **Imgur**: [imgur.com](https://imgur.com) - Upload and get direct link
- **Cloudinary**: [cloudinary.com](https://cloudinary.com) - Free tier available
- **ImageKit**: [imagekit.io](https://imagekit.io) - Free tier with CDN

#### 3. **Use Placeholder Images** (For Testing)
- **Unsplash**: `https://source.unsplash.com/800x400/?tunisia,student`
- **Picsum**: `https://picsum.photos/800/400`
- **Lorem Picsum**: `https://loremflickr.com/800/400/tunisia`

---

## Adding Images in Admin Dashboard

### Step 1: Go to News Management
1. Login to admin: `http://localhost:3000/admin`
2. Click "الأخبار" (News) in sidebar

### Step 2: Create or Edit News
1. Click "إضافة خبر" (Add News) or edit existing
2. Fill in all fields

### Step 3: Add Image URL
In the "رابط الصورة" (Image Link) field, paste your image URL:

**Examples:**
```
https://picsum.photos/seed/uget1/800/400
https://yourdomain.com/news-images/protest.jpg
https://i.imgur.com/abc123.jpg
```

### Step 4: Save
Click "حفظ" (Save) and the image will appear!

---

## Image Requirements

### Recommended Sizes
- **News Card:** 800x400px (2:1 ratio)
- **Detail Page:** 1200x600px (2:1 ratio)
- **File Size:** Under 500KB for fast loading

### Supported Formats
- ✅ JPEG (.jpg, .jpeg)
- ✅ PNG (.png)
- ✅ WebP (.webp)
- ✅ SVG (.svg)

---

## Uploading Images to Your Project

### Method 1: Add to /public Folder

1. **Add images locally:**
   ```bash
   # Create folder
   mkdir public/news-images
   
   # Add your images to this folder
   # Example: public/news-images/my-news.jpg
   ```

2. **Use in admin:**
   ```
   /news-images/my-news.jpg
   ```

3. **After deployment:**
   ```
   https://yourdomain.com/news-images/my-news.jpg
   ```

### Method 2: Use Vercel Blob Storage (Paid)

If you need more storage, Vercel offers blob storage:
- Free tier: 500MB
- Pay-as-you-go after that

---

## Best Practices

### 1. Optimize Images Before Upload
Use free tools:
- **TinyPNG**: [tinypng.com](https://tinypng.com) - Compress images
- **Squoosh**: [squoosh.app](https://squoosh.app) - Online image optimizer
- **ImageOptim** (Mac): Free desktop app

### 2. Use Descriptive Names
❌ Bad: `IMG_1234.jpg`
✅ Good: `student-protest-2026.jpg`

### 3. Use CDN URLs When Possible
- Faster loading
- Better performance
- Automatic optimization

### 4. Keep Consistent Dimensions
All news images should be similar size for consistency:
- Width: 800px
- Height: 400px
- Ratio: 2:1

---

## Example: Complete News Post with Image

In the admin dashboard:

**العنوان (Title):**
```
بيان حول التوجيه الجامعي 2026/2027
```

**المقتطف (Excerpt):**
```
يدعو الاتحاد العام لطلبة تونس جميع الطلبة الجدد إلى الاطلاع على روزنامة التوجيه الجامعي
```

**المحتوى (Content):**
```
في إطار الاستعدادات للسنة الجامعية الجديدة، يدعو الاتحاد العام لطلبة تونس...
(Full content here)
```

**الفئة (Category):**
```
توجيه جامعي
```

**Slug:**
```
biyan-tawjih-2026
```

**رابط الصورة (Image URL):**
```
https://picsum.photos/seed/orientation2026/800/400
```

**التاريخ (Date):**
```
2026-06-25
```

---

## Testing Your Images

After adding an image URL:

1. **Save the news post**
2. **View news page:** `http://localhost:3000/news`
3. **Check if image appears** in the card
4. **Click on the news** to see full image

If image doesn't appear:
- ✅ Check URL is correct
- ✅ Check URL is publicly accessible
- ✅ Check image format is supported
- ✅ Open URL in browser to test

---

## Free Image Resources

### For Student/University Images
- **Unsplash**: [unsplash.com](https://unsplash.com/s/photos/university)
- **Pexels**: [pexels.com](https://pexels.com/search/students/)
- **Pixabay**: [pixabay.com](https://pixabay.com)

### For Tunisia-Specific Images
- Search: "Tunisia university", "Tunisian students", "Tunis campus"
- Use your own photos (recommended for authenticity)
- Commission original photography

---

## Advanced: Image Upload Feature (Future)

Currently, the system uses URLs. If you want direct upload:

### Option A: Vercel Blob (Simple)
```bash
npm install @vercel/blob
```
Configure in admin to upload directly to Vercel.

### Option B: Cloudinary (Free Tier)
```bash
npm install cloudinary
```
Set up Cloudinary and integrate upload widget.

### Option C: Local Upload
Images saved to `/public/uploads/` (automatic with form)

**Would you like me to implement any of these?**

---

## Quick Reference

| Task | URL Format |
|------|------------|
| **Local file** | `/news-images/image.jpg` |
| **After deploy** | `https://yourdomain.com/news-images/image.jpg` |
| **External URL** | `https://example.com/image.jpg` |
| **Placeholder** | `https://picsum.photos/800/400` |

---

## Summary

✅ **Yes, you can add images to news!**

**To add image:**
1. Go to `/admin/news`
2. Create or edit news post
3. Paste image URL in "رابط الصورة"
4. Save
5. Image appears automatically!

**Image will show:**
- ✅ In news card grid
- ✅ In individual news page
- ✅ On mobile devices
- ✅ With proper formatting

---

*Need help? Check the admin dashboard or ask!*
