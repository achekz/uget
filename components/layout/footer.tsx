"use client";
"use client";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/about", label: "من نحن" },
    { href: "/executive-bureau", label: "المكتب التنفيذي" },
    { href: "/news", label: "البيانات والأخبار" },
    { href: "/orientation", label: "التوجيه الجامعي" },
    { href: "/faq", label: "الأسئلة الشائعة" },
    { href: "/structures", label: "الهياكل" },
    { href: "/join", label: "انضم إلينا" },
    { href: "/contact", label: "اتصل بنا" },
  ];

  return (
    <footer className="bg-ink text-paper relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-heading font-bold text-white text-lg">U</span>
              </div>
              <span className="font-heading font-bold text-xl">UGET</span>
            </div>
            <p className="text-paper/70 text-sm leading-relaxed mb-4">
              الاتحاد العام لطلبة تونس - الناطق الرسمي باسم الطلبة التونسيين
              أمام السلط العمومية والجامعية والرأي العام.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-paper/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-paper/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-paper/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              روابط سريعة
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-paper/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              معلومات الاتصال
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-paper/70 text-sm">
                <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <span>تونس، الجمهورية التونسية</span>
              </li>
              <li className="flex items-start gap-3 text-paper/70 text-sm">
                <Phone className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <span dir="ltr">+216 71 000 000</span>
              </li>
              <li className="flex items-start gap-3 text-paper/70 text-sm">
                <Mail className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <span>contact@uget.tn</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              النشرة البريدية
            </h3>
            <p className="text-paper/70 text-sm mb-4">
              اشترك ليصلك كل جديد من الاتحاد.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-4 py-2 rounded-lg bg-paper/10 border border-paper/20 text-paper placeholder:text-paper/50 text-sm focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                اشتراك
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-paper/10 mt-12 pt-8 text-center text-paper/50 text-sm">
          <p>© {currentYear} الاتحاد العام لطلبة تونس (UGET). جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
