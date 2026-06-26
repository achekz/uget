# 🚀 Quick Start - UGET Free CMS

## Step 1: Create Environment File (1 minute)

Create `.env.local` in the project root:

```env
ADMIN_PASSWORD=YourSecurePassword123
RESEND_API_KEY=re_your_key_here
CONTACT_EMAIL=contact@uget.tn
```

## Step 2: Install & Run (2 minutes)

```bash
npm install
npm run dev
```

## Step 3: Access Admin (30 seconds)

1. Open: `http://localhost:3000/admin`
2. Login with your `ADMIN_PASSWORD`
3. Start managing content!

---

## 🎯 Test Everything

### Test Admin Dashboard
1. Create a test news post
2. Edit an existing member
3. Add a FAQ item
4. Delete the test news post

### Test Public Site
1. Visit `http://localhost:3000`
2. Check news page shows your content
3. Verify all pages load

### Test Forms
1. Submit contact form (check console for email data)
2. Submit join form (check console for email data)

---

## 🌐 Deploy to Vercel (10 minutes)

### Quick Deploy

```bash
# Push to GitHub
git add .
git commit -m "Add free CMS system"
git push origin main

# Then:
# 1. Go to vercel.com
# 2. Import your repository
# 3. Add environment variables:
#    - ADMIN_PASSWORD
#    - RESEND_API_KEY
#    - CONTACT_EMAIL
# 4. Deploy!
```

---

## 📧 Setup Emails (5 minutes)

### Get Resend API Key

1. Sign up at [resend.com](https://resend.com) (free)
2. Get API key from dashboard
3. Add to `.env.local` and Vercel
4. Test by submitting a form

**Free tier: 3,000 emails/month**

---

## 📚 Need More Help?

- **Admin Usage:** Read [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)
- **Deployment:** Read [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Technical Details:** Read [CMS_README.md](./CMS_README.md)
- **Implementation:** Read [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

---

## ✅ Success Checklist

- [ ] `.env.local` created with password
- [ ] `npm install` completed
- [ ] `npm run dev` running
- [ ] Admin dashboard accessible
- [ ] Can login to admin
- [ ] Can create/edit content
- [ ] Public pages show content
- [ ] Forms submit successfully
- [ ] Ready to deploy!

---

## 🎉 You're Ready!

Your free CMS is now running locally. When ready to go live:

1. Get Resend API key (free)
2. Push to GitHub
3. Deploy on Vercel (free)
4. Add environment variables
5. **Launch!** 🚀

**Total cost: $0/month**

---

*Questions? Check the detailed guides in the repo!*
