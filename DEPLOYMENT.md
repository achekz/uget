# 🚀 Deployment Guide - UGET Website

## Quick Start

This guide will help you deploy your UGET website to Vercel **completely free**.

## Prerequisites

- GitHub account
- Vercel account (free - sign up at [vercel.com](https://vercel.com))
- Resend account for emails (free - sign up at [resend.com](https://resend.com))

---

## Step 1: Prepare Your Repository

### 1.1 Create .env.local file locally

Create a `.env.local` file in your project root (this file is ignored by git):

```env
ADMIN_PASSWORD=your-secure-password
RESEND_API_KEY=re_your_key_here
CONTACT_EMAIL=contact@uget.tn
ANTHROPIC_API_KEY=sk-ant-your-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 1.2 Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000/admin` and verify you can login.

### 1.3 Push to GitHub

```bash
git add .
git commit -m "Add free CMS system"
git push origin main
```

---

## Step 2: Setup Resend (Email Service)

### 2.1 Create Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up with your email
3. Verify your email address

### 2.2 Add Your Domain (Recommended)

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `uget.tn`)
4. Add the DNS records shown to your domain provider
5. Wait for verification (usually a few minutes)

**OR use onboarding@resend.dev for testing** (100 emails/day limit)

### 2.3 Get API Key

1. Go to **API Keys** in Resend dashboard
2. Click **Create API Key**
3. Name it "UGET Production"
4. Copy the key (starts with `re_`)
5. Save it securely - you'll need it for Vercel

---

## Step 3: Deploy to Vercel

### 3.1 Import Project

1. Go to [https://vercel.com](https://vercel.com)
2. Click **Add New...** → **Project**
3. Import your GitHub repository
4. Click **Import**

### 3.2 Configure Environment Variables

Before clicking Deploy, add these environment variables:

| Variable | Value | Example |
|----------|-------|---------|
| `ADMIN_PASSWORD` | Your chosen password | `MySecurePass123!` |
| `RESEND_API_KEY` | From Resend dashboard | `re_123abc...` |
| `CONTACT_EMAIL` | Where to receive emails | `contact@uget.tn` |
| `ANTHROPIC_API_KEY` | (Optional) For chatbot | `sk-ant-...` |
| `NEXT_PUBLIC_SITE_URL` | Your domain | `https://uget.tn` |

### 3.3 Deploy

1. Click **Deploy**
2. Wait 2-3 minutes for build
3. Get your deployment URL (e.g., `uget.vercel.app`)

---

## Step 4: Custom Domain (Optional)

### 4.1 Add Domain in Vercel

1. In your Vercel project, go to **Settings** → **Domains**
2. Add your domain (e.g., `uget.tn`)
3. Follow the DNS configuration instructions

### 4.2 Update DNS Records

Add these records to your domain provider:

**For root domain (uget.tn):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 4.3 Wait for DNS Propagation

- Usually takes 5-30 minutes
- Check status in Vercel dashboard
- SSL certificate is automatically provisioned

---

## Step 5: Verify Everything Works

### 5.1 Test the Website

1. Visit your domain: `https://yourdomain.com`
2. Check all pages load correctly
3. Verify content is displayed

### 5.2 Test Admin Panel

1. Go to `https://yourdomain.com/admin`
2. Login with your `ADMIN_PASSWORD`
3. Try creating a test news post
4. Verify it appears on the news page

### 5.3 Test Email Forms

1. Submit contact form
2. Check that email arrives at `CONTACT_EMAIL`
3. Submit join form
4. Verify both admin and user confirmation emails

---

## Step 6: Update Environment Variables

If you need to change any environment variables:

1. Go to Vercel project **Settings** → **Environment Variables**
2. Edit or add variables
3. Click **Save**
4. **Redeploy** the project for changes to take effect

---

## Post-Deployment Checklist

- [ ] Website loads at custom domain
- [ ] All pages are accessible
- [ ] Admin panel login works
- [ ] Can create/edit/delete content in admin
- [ ] Contact form sends emails
- [ ] Join form sends emails
- [ ] SSL certificate is active (https)
- [ ] Chatbot works (if configured)

---

## Managing Content

### Option 1: Admin Dashboard (Recommended)

1. Go to `https://yourdomain.com/admin`
2. Login
3. Manage content through UI
4. Changes save to JSON files

### Option 2: Direct File Edit

1. Edit files in `/data` folder locally
2. Commit changes: `git add . && git commit -m "Update content"`
3. Push to GitHub: `git push`
4. Vercel auto-deploys in ~2 minutes

---

## Troubleshooting

### Build Failed

**Check build logs in Vercel:**
1. Go to **Deployments**
2. Click failed deployment
3. Check **Build Logs**

**Common issues:**
- Missing environment variables
- TypeScript errors
- Invalid JSON in data files

**Fix:**
```bash
# Test build locally
npm run build

# Fix any errors shown
# Then push again
git add .
git commit -m "Fix build errors"
git push
```

### Admin Panel Not Working

**Symptom:** Can't login or getting "Unauthorized"

**Solutions:**
1. Verify `ADMIN_PASSWORD` is set in Vercel
2. Clear browser localStorage
3. Try incognito/private mode
4. Redeploy after adding variables

### Emails Not Sending

**Symptom:** Forms submit but no emails arrive

**Solutions:**
1. Check `RESEND_API_KEY` is set correctly
2. Verify domain in Resend dashboard
3. Check Resend logs for errors
4. Look at Vercel function logs
5. Verify `CONTACT_EMAIL` is correct

### Content Not Updating

**Symptom:** Changes in admin don't appear on site

**Solutions:**
1. Hard refresh browser (Ctrl+Shift+R)
2. Check JSON files were updated in GitHub
3. Trigger new deployment in Vercel
4. Clear Vercel cache and redeploy

---

## Cost Breakdown

| Service | Free Tier | Cost |
|---------|-----------|------|
| **Vercel Hosting** | 100GB bandwidth/month | **$0** |
| **Resend Emails** | 3,000 emails/month | **$0** |
| **GitHub** | Unlimited public repos | **$0** |
| **Domain** | N/A | ~$10/year |
| **SSL Certificate** | Included with Vercel | **$0** |
| **Total Monthly** | - | **$0** |

Only cost is your domain name (~$10/year)!

---

## Scaling

As your website grows:

### Vercel (Hosting)
- **Free tier:** 100GB bandwidth/month
- **Pro tier:** $20/month - 1TB bandwidth
- Upgrade when you exceed free limits

### Resend (Emails)
- **Free tier:** 3,000 emails/month
- **Pro tier:** $20/month - 50,000 emails
- Upgrade when you exceed free limits

### Database (Future)
If you need a real database later:
- **Vercel Postgres:** Free tier available
- **Supabase:** Free tier available
- **MongoDB Atlas:** Free tier available

---

## Monitoring

### Vercel Analytics

Enable free analytics:
1. Go to **Analytics** in Vercel dashboard
2. Click **Enable**
3. Track page views, performance, etc.

### Resend Analytics

Monitor emails:
1. Go to Resend dashboard
2. View **Logs** to see all sent emails
3. Check delivery status

---

## Backup Strategy

### Automatic (Included)
- All content is in Git
- Every commit is a backup
- Can restore any previous version

### Manual Backups

```bash
# Create backup of data folder
cp -r data data-backup-$(date +%Y%m%d)

# Or commit to backup branch
git checkout -b backup-$(date +%Y%m%d)
git add .
git commit -m "Backup"
git push origin backup-$(date +%Y%m%d)
```

---

## Support Resources

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Resend Docs:** [resend.com/docs](https://resend.com/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Admin Guide:** See `ADMIN_GUIDE.md` in this repo

---

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Setup custom domain
3. ✅ Configure email service
4. ✅ Test admin panel
5. ✅ Create your first content
6. 📢 Announce your new website!

**Congratulations! Your UGET website is now live! 🎉**
