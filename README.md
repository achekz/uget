# الاتحاد العام لطلبة تونس (UGET)

موقع ويب رسمي حديث وتفاعلي للاتحاد العام لطلبة تونس، منظمة طلابية نقابية تأسست سنة 1952.

## 🚀 التقنيات

- **Framework**: Next.js 14+ (App Router) + TypeScript
- **التنسيق**: Tailwind CSS + shadcn/ui
- **الأنيميشن**: Framer Motion + GSAP + ScrollTrigger
- **الاستضافة**: Vercel

## 📋 المتطلبات

- Node.js 18+
- npm أو yarn
- حساب Vercel للنشر

## 🛠️ التثبيت المحلي

```bash
# تثبيت الاعتمادات
npm install

# نسخ ملفات البيئة
cp .env.example .env.local

# تشغيل خادم التطوير
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

## 🎨 الهوية البصرية

- **اللغة الأساسية**: العربية (RTL)
- **الألوان**: أحمر نضالي `#CE1126`، كحلي `#0B0E14`، أبيض دافئ `#FAFAF7`، ذهبي `#D4A537`
- **الخطوط**: Tajawal + IBM Plex Sans Arabic

## 📦 البناء للنشر

```bash
npm run build
```

## 🚢 النشر على Vercel

```bash
vercel --prod
```

أو ربط المستودع مباشرة بحساب Vercel. لا حاجة لإعدادات خاصة.

## 📝 ملاحظات

- جميع المفاتيح تُخزَّن في متغيرات البيئة فقط (`.env.local` / Vercel Environment Variables)
- المشروع يدعم Dark Mode كامل
- الشات بوت يعتمد على قاعدة محتوى محلية
