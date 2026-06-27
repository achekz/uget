-- ============================================================
-- UGET Supabase Schema + Seed
-- Run this entire script in: Supabase Dashboard > SQL Editor
-- ============================================================

-- ─── TABLES ──────────────────────────────────────────────────

create table if not exists news (
  id text primary key,
  title text not null,
  excerpt text,
  content text,
  date text,
  category text,
  slug text unique,
  image text
);

create table if not exists members (
  id text primary key,
  name text not null,
  role text,
  sector text,
  image text
);

create table if not exists structures (
  id text primary key,
  name text not null,
  university text,
  city text,
  email text,
  phone text
);

create table if not exists faqs (
  id text primary key,
  question text not null,
  answer text,
  category text,
  language text default 'ar',
  "order" integer default 0
);

create table if not exists join_requests (
  id text primary key,
  name text not null,
  university text,
  college text,
  email text,
  phone text,
  message text,
  submitted_at text,
  status text default 'pending'
);

-- ─── DISABLE RLS (admin app uses service role key) ───────────
alter table news disable row level security;
alter table members disable row level security;
alter table structures disable row level security;
alter table faqs disable row level security;
alter table join_requests disable row level security;

-- ─── SEED: NEWS ──────────────────────────────────────────────
insert into news (id, title, excerpt, content, date, category, slug, image) values
(
  'internal-regulations-2024',
  'النظام الداخلي للاتحاد العام لطلبة تونس',
  'الاتحاد العام لطلبة تونس منظمة نقابية مستقلة في قراراتها ديمقراطية في هياكلها تستمد قراراتها من القواعد الطلابية المنخرطة في صلبها',
  'الباب الأول: تعريف الاتحاد',
  '2024-06-25',
  'النظام الداخلي',
  'nidham-dakhili-2024',
  'https://res.cloudinary.com/ds28y3pjc/image/upload/v1782481160/news/u4rt9zgrivt3jqba9fu9.jpg'
),
(
  'congress-2024',
  'المكتب التنفيذي الجديد للاتحاد العام لطلبة تونس 2024',
  'انعقد المؤتمر الوطني للاتحاد العام لطلبة تونس تحت شعار حركة طلابية مناضلة منتصرة للمقاومة الفلسطينية بكلية العلوم بتونس يومي 25 و 26 ماي 2024',
  'انعقد المؤتمر الوطني للاتحاد العام لطلبة تونس.',
  '2024-05-26',
  'المؤتمر الوطني',
  'muatamar-watani-2024',
  'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=600&fit=crop'
),
(
  '1',
  'بيان حول التوجيه الجامعي 2026/2027',
  'يدعو الاتحاد العام لطلبة تونس جميع الطلبة الجدد إلى الاطلاع على روزنامة التوجيه الجامعي والاستفادة من المساعدات المتوفرة.',
  'فدعوة الاتحاد العام لطلبة تونس جميع الطلبة الجدد إلى الاطلاع على روزنامة التوجيه الجامعي.',
  '2026-06-20',
  'توجيه جامعي',
  'biyan-tawjih-2026',
  'https://res.cloudinary.com/ds28y3pjc/image/upload/v1782575886/news/scdiurr5m3mk5439vea2.jpg'
),
(
  '2',
  'مؤتمر وطني طارئ حول السكن الجامعي',
  'ينعقد مؤتمر وطني طارئ لمناقشة أزمة السكن الجامعي وسبل التدخل لحلها.',
  'في إطار متابعة أزمة السكن الجامعي، ينعقد مؤتمر وطني طارئ لمناقشة الأزمة.',
  '2026-06-15',
  'سكن جامعي',
  'muatamar-sakan-2026',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=600&fit=crop'
),
(
  '3',
  'بيان تضامني مع الطلبة المنحدرين من المناطق المهمشة',
  'يعبر الاتحاد عن تضامنه الكامل مع الطلبة المنحدرين من المناطق المهمشة ويطالب بتحسين الخدمات الجامعية.',
  'في إطار التزامه بالقضايا الطلابية، يعبر الاتحاد عن تضامنه الكامل.',
  '2026-06-10',
  'بيان عام',
  'biyan-tadamun-2026',
  'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=1200&h=600&fit=crop'
)
on conflict (id) do nothing;

-- ─── SEED: MEMBERS ───────────────────────────────────────────
insert into members (id, name, role, sector, image) values
('1', 'محمد اولاد محمد', 'الأمين العام', 'الأمانة العامة', 'https://res.cloudinary.com/ds28y3pjc/image/upload/v1782480043/members/uf7lbnqe2teqdqjzw88w.jpg'),
('2', 'لواء الدين النابلي', 'نائب الأمين العام', 'الأمانة العامة', 'https://picsum.photos/seed/member2/400/400'),
('3', 'منتصر سالم', 'الرئيس', 'الرئاسة', 'https://picsum.photos/seed/member3/400/400'),
('4', 'شاهين طرابلسي', 'الناطق الرسمي', 'الإعلام والتواصل', 'https://picsum.photos/seed/member4/400/400'),
('5', 'يوسف حسني', 'أمين المال', 'الشؤون المالية', 'https://picsum.photos/seed/member5/400/400'),
('6', 'أميمة بن غريب', 'مكلف بالنظام الداخلي', 'النظام الداخلي', 'https://picsum.photos/seed/member6/400/400'),
('7', 'ليث الجباري', 'مكلف بالتثقيف النقابي', 'التثقيف النقابي', 'https://picsum.photos/seed/member7/400/400'),
('8', 'أمان الله معلاوي', 'مكلف بالعمل الثقافي', 'العمل الثقافي', 'https://picsum.photos/seed/member8/400/400'),
('9', 'ياسين ميمون', 'مكلف بالخدمات الجامعية', 'الخدمات الجامعية', 'https://picsum.photos/seed/member9/400/400'),
('10', 'هديل الطرابلسي', 'مكلف بالخدمات الجامعية', 'الخدمات الجامعية', 'https://picsum.photos/seed/member10/400/400'),
('11', 'زياد العاشق', 'مكلف بالخدمات الجامعية', 'الخدمات الجامعية', 'https://picsum.photos/seed/member11/400/400'),
('12', 'آزر مخلوفي', 'مكلف بالخدمات الجامعية', 'الخدمات الجامعية', 'https://picsum.photos/seed/member12/400/400'),
('13', 'ميساء الحمادي', 'مكلف بفروع الهجرة والعلاقات الدولية', 'العلاقات الدولية', 'https://picsum.photos/seed/member13/400/400'),
('14', 'محمد علي بن خالد', 'مكلف بالقطاعات', 'القطاعات', 'https://picsum.photos/seed/member14/400/400'),
('15', 'محمد إيهاب السعيدي', 'مكلف بالعمل الجماهيري', 'العمل الجماهيري', 'https://picsum.photos/seed/member15/400/400')
on conflict (id) do nothing;

-- ─── SEED: STRUCTURES ────────────────────────────────────────
insert into structures (id, name, university, city, email, phone) values
('1', 'الهيكل الجهوي بتونس', 'جامعة تونس', 'تونس', 'tunis@uget.tn', '+216 71 000 000'),
('2', 'الهيكل الجهوي بمنوبة', 'جامعة منوبة', 'منوبة', 'manouba@uget.tn', '+216 71 000 001'),
('3', 'الهيكل الجهوي بصفاقس', 'جامعة صفاقس', 'صفاقس', 'sfax@uget.tn', '+216 74 000 000'),
('4', 'الهيكل الجهوي بسوسة', 'جامعة سوسة', 'سوسة', 'sousse@uget.tn', '+216 73 000 000'),
('5', 'الهيكل الجهوي بالقيروان', 'جامعة القيروان', 'القيروان', 'kairouan@uget.tn', '+216 78 000 000'),
('6', 'الهيكل الجهوي بجندوبة', 'جامعة جندوبة', 'جندوبة', 'jendouba@uget.tn', '+216 78 000 001')
on conflict (id) do nothing;

-- ─── SEED: FAQS ──────────────────────────────────────────────
insert into faqs (id, question, answer, category, language, "order") values
('1', 'كيف انخرط في الاتحاد؟', 'يمكنك الانخراط عبر ملء استمارة الانخراط في صفحة انضم إلينا أو التواصل مع الهيكل الجامعي الأقرب لك.', 'membership', 'ar', 1),
('2', 'متى نتائج التوجيه 2026؟', 'النتائج النهائية للتوجيه الجامعي تعلن في 12 أوت 2026 عبر منصة orientation.tn.', 'orientation', 'ar', 2),
('3', 'كيف أطلب سكناً جامعياً؟', 'يمكنك التقدم بطلب سكن جامعي عبر المنصة الرسمية للوزارة أو الاتصال بهيكل الجامعة.', 'housing', 'ar', 3),
('4', 'ما هي المنحة الجامعية؟', 'المنحة الجامعية هي مساعدة مالية للطلبة المحتاجين، يمكن الاطلاع على الشروط عبر موقع الوزارة.', 'housing', 'ar', 4)
on conflict (id) do nothing;
