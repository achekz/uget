"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Marquee } from "@/components/sections/marquee";
import CountdownBanner from "@/components/sections/countdown-banner";
import OrientationBanner from "@/components/sections/orientation-banner";
import BentoGrid from "@/components/sections/bento-grid";
import NewsCard from "@/components/sections/news-card";
import { NewsPost } from "@/types";

interface PageClientProps {
  latestNews: NewsPost[];
}

export default function PageClient({ latestNews }: PageClientProps) {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CE1126" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle cx="500" cy="500" r="200" fill="none" stroke="#CE1126" strokeWidth="0.5" opacity="0.5">
              <animate attributeName="r" values="200;220;200" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.2;0.5" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="500" cy="500" r="280" fill="none" stroke="#D4A537" strokeWidth="0.3" opacity="0.3">
              <animate attributeName="r" values="280;300;280" dur="6s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="mb-8">
            <div className="relative mx-auto" style={{ width: 160, height: 160 }}>
              {/* Pulsing glow ring */}
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.15, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-primary/40 blur-xl"
              />
              {/* Logo image */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl shadow-primary/50 ring-4 ring-primary/60">
                <Image
                  src="/logo.png"
                  alt="UGET Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-6">
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xl md:text-3xl font-bold font-heading">
              {["نضال", "استقلالية", "صمود", "ديمقراطية"].map((word, i) => (
                <motion.span key={word} initial={{ opacity: 0, y: 30, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="text-lg md:text-xl text-paper/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            الاتحاد العام لطلبة تونس (UGET)، منظمة طلابية نقابية، ديمقراطية، تقدمية ووطنية، تأسست سنة 1952. الناطق الرسمي باسم الطلبة التونسيين أمام السلط العمومية والجامعية.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join" className="px-8 py-4 bg-primary hover:bg-primary/90 text-paper font-semibold rounded-lg shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105">انضم إلينا</Link>
            <Link href="/news" className="px-8 py-4 bg-transparent border-2 border-paper/30 hover:border-paper text-paper font-semibold rounded-lg transition-all duration-300 hover:scale-105">آخر البيانات</Link>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-6 h-10 border-2 border-paper/50 rounded-full flex justify-center">
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-3 bg-paper/70 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      <Marquee />
      <CountdownBanner />

      <section className="py-16 md:py-24 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-ink">آخر المستجدات</h2>
            <Link href="/news" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">عرض الكل <ArrowRight className="w-4 h-4 rotate-180" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((item, index) => (
              <NewsCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-ink/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-ink mb-6">من نحن</h2>
            <p className="text-lg text-ink/70 leading-relaxed mb-8">الاتحاد العام لطلبة تونس (UGET)، منظمة طلابية نقابية، ديمقراطية، تقدمية ووطنية، تأسست سنة 1952، الناطق الرسمي باسم الطلبة التونسيين أمام السلط العمومية والجامعية والرأي العام الداخلي والخارجي.</p>
            <Link href="/about" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">اعرف أكثر <ArrowRight className="w-4 h-4 rotate-180" /></Link>
          </div>
        </div>
      </section>

      <OrientationBanner />
      <section className="py-16 md:py-24 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-ink mb-12 text-center">أرقام تتحدث</h2>
          <BentoGrid />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-ink text-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">هياكلنا الجامعية</h2>
          <p className="text-lg text-paper/70 max-w-2xl mx-auto mb-8">منتشرون في الجامعات والمعاهد عبر كامل تراب الجمهورية</p>
          <Link href="/structures" className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-paper font-semibold rounded-lg transition-all">اكتشف هياكلنا <ArrowRight className="w-4 h-4 rotate-180" /></Link>
        </div>
      </section>
    </div>
  );
}
