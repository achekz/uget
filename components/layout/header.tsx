"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/about", label: "من نحن" },
  { href: "/executive-bureau", label: "المكتب التنفيذي" },
  { href: "/news", label: "البيانات والأخبار" },
  { href: "/orientation", label: "التوجيه الجامعي" },
  { href: "/faq", label: "الأسئلة الشائعة" },
  { href: "/structures", label: "الهياكل" },
  { href: "/resources", label: "الموارد" },
  { href: "/contact", label: "اتصل بنا" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When not scrolled: header is transparent over dark hero → use light colors
  // When scrolled: glass effect is active → use light theme colors
  const onDarkBg = !scrolled;

  const logoTextColor = onDarkBg ? "text-paper" : "text-ink";
  const linkColor = onDarkBg ? "text-paper/80 hover:text-white" : "text-ink/70 hover:text-primary";
  const iconColor = onDarkBg ? "hover:bg-paper/10 text-paper" : "hover:bg-ink/5 text-ink";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 group-hover:scale-105 transition-transform rounded-full overflow-hidden ring-2 ring-primary/40 shadow-md shadow-primary/20">
              <Image
                src="/logo.png"
                alt="UGET Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className={`font-heading font-bold text-xl hidden sm:block transition-colors ${logoTextColor}`}>
              UGET
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors relative group ${linkColor}`}
              >
                {link.label}
                <span className={`absolute bottom-0 right-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300`} style={{ width: 0 }} />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/join"
              className="hidden sm:inline-flex px-4 py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-lg shadow-primary/20 transition-all hover:scale-105 text-sm"
            >
              انضم إلينا
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${iconColor}`}
              aria-label="القائمة"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-lg transition-colors text-ink/80 hover:bg-ink/5 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/join"
                onClick={() => setIsOpen(false)}
                className="mx-4 mt-2 px-4 py-3 bg-primary text-white text-center rounded-lg font-semibold"
              >
                انضم إلينا
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
