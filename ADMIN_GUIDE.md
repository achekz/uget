# Admin Dashboard Guide - UGET Website

## 🎯 Overview

This website includes a **completely free, self-hosted CMS (Content Management System)** that allows you to manage all content without any subscription fees. Everything is stored as JSON files in your repository and can be edited through a beautiful admin dashboard.

## 🔑 Features

- ✅ **100% Free** - No CMS subscription costs
- ✅ **Git-Based** - All content is version controlled
- ✅ **No Database Required** - Uses JSON files
- ✅ **Vercel-Native** - Optimized for Vercel hosting
- ✅ **SEO Optimized** - Server-side rendering for all pages
- ✅ **Email Notifications** - Free tier with Resend (3000 emails/month)
- ✅ **Easy Backups** - Content lives in Git
- ✅ **Fast Performance** - No external API calls
- ✅ **Type-Safe** - Full TypeScript support

## 🚀 Getting Started

### 1. Environment Setup

Create a `.env.local` file in the project root with the following variables:

```env
# Required: Admin Dashboard Password
ADMIN_PASSWORD=your-secure-password-here

# Optional but Recommended: Email Notifications
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=contact@uget.tn

# Optional: Chatbot
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Site URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 2. Get Resend API Key (Free)

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Free tier includes **3,000 emails per month**
5. Add the key to your `.env.local` file

### 3. Access Admin Dashboard

1. Start your development server: `npm run dev`
2. Navigate to: `http://localhost:3000/admin`
3. Enter the password you set in `ADMIN_PASSWORD`

## 📁 What You Can Manage

### 1. News & Announcements (`/admin/news`)
- Create, edit, and delete news posts
- Set categories and publication dates
- Add images and rich content
- Manage slugs for SEO-friendly URLs

### 2. Executive Bureau Members (`/admin/members`)
- Add team members with photos
- Set roles and sectors
- Update member information
- Organize by position

### 3. University Structures (`/admin/structures`)
- Manage regional offices
- Add contact information
- Update university affiliations
- Track locations

### 4. FAQ (`/admin/faq`)
- Create frequently asked questions
- Organize by category
- Set display order
- Multi-language support

## 🗂️ How It Works

### Data Storage

All content is stored in JSON files in the `/data` folder:

```
/data
  ├── news.json          # All news posts
  ├── members.json       # Executive members
  ├── structures.json    # University structures
  └── faq.json          # FAQ items
```

### Server-Side Rendering

All pages are server-rendered for optimal SEO:

- News page fetches from `news.json`
- Executive Bureau fetches from `members.json`
- Structures page fetches from `structures.json`
- FAQ page fetches from `faq.json`

### Email System

When users submit forms:

1. **Contact Form** → Sends email to `CONTACT_EMAIL`
2. **Join Form** → Sends notification to admin + confirmation to user

## 🔐 Security

- Admin routes are protected by Bearer token authentication
- Password is stored in environment variables (never in code)
- Password is saved in localStorage for convenience
- All API requests require authentication header

## 🌐 Deployment on Vercel

### Initial Deploy

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `ADMIN_PASSWORD`
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Deploy!

### Updating Content

Two ways to update content:

**Option 1: Admin Dashboard (Recommended)**
1. Go to `https://yourdomain.com/admin`
2. Login with your password
3. Make changes through the UI
4. Changes are saved to JSON files

**Option 2: Direct File Edit**
1. Edit JSON files in `/data` folder
2. Commit and push to GitHub
3. Vercel auto-deploys

## 📧 Email Templates

The system includes beautifully styled email templates in Arabic:

### Contact Form Email
- Sender information
- Message content
- Professional formatting
- RTL support

### Join Form Email
- Student information
- University details
- Admin notification
- Student confirmation email

## 🎨 Customization

### Admin Dashboard Colors

Edit `/app/admin/layout.tsx` to change the sidebar color:

```tsx
<aside className="w-64 bg-[#c41e3a] text-white min-h-screen">
```

### Email Templates

Edit `/lib/email.ts` to customize email content and styling.

### Data Schema

All types are defined in `/types/index.ts`. Modify as needed.

## 🔧 Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Test Production Build Locally

```bash
npm run start
```

## 📊 API Routes

Admin API routes are protected and require authentication:

- `GET /api/admin/news` - Get all news
- `POST /api/admin/news` - Create news
- `PATCH /api/admin/news` - Update news
- `DELETE /api/admin/news?id={id}` - Delete news

Same pattern for:
- `/api/admin/members`
- `/api/admin/structures`
- `/api/admin/faq`

## 🐛 Troubleshooting

### "Unauthorized" error in admin panel

- Check that `ADMIN_PASSWORD` is set in `.env.local`
- Clear localStorage and try logging in again
- Verify password is correct

### Emails not sending

- Verify `RESEND_API_KEY` is set
- Check that domain is verified in Resend
- Look at console logs for error messages

### Changes not reflecting

- Clear browser cache
- Rebuild: `npm run build`
- Check that JSON files were updated correctly

## 💡 Tips

1. **Regular Backups**: Your content is in Git, so commit regularly
2. **Strong Password**: Use a secure password for admin access
3. **Email Testing**: Test emails in development before going live
4. **Mobile Admin**: Admin dashboard works great on mobile devices
5. **Content Versioning**: Use Git to track content changes over time

## 🆘 Support

For issues or questions:
1. Check this guide first
2. Review error messages in console
3. Check environment variables are set correctly
4. Verify JSON files are valid (use JSONLint.com)

## 🎉 Benefits Over Paid CMS

Compared to Sanity or other paid CMS:

| Feature | This Solution | Sanity CMS |
|---------|---------------|------------|
| Cost | **Free** | $99+/month |
| Hosting | Vercel (Free) | Included |
| Data Control | **Full** | Limited |
| Backups | **Git** | Export/Import |
| Customization | **Full** | Limited |
| Lock-in | **None** | High |

---

**Built with ❤️ for UGET - Free, Fast, and Forever Yours!**
