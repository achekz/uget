"use client";
import { motion } from "framer-motion";
import CountdownBanner from "@/components/sections/countdown-banner";
import { orientationEvents } from "@/lib/data";
import Link from "next/link";

export default function OrientationClient() {
  return (
    <main>
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary to-ink text-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">التوجيه الجامعي 2026/2027</h1>
          <p className="text-xl text-paper/80">كل ما تحتاج معرفته للتوجيه الجامعي، مع دعم الاتحاد</p>
        </div>
      </section>
      <CountdownBanner />

      <section className="py-16 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-heading text-ink text-center mb-12">روزنامة التوجيه</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {orientationEvents.map((event, i) => (
              <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 p-6 bg-white dark:bg-ink/30 rounded-2xl border border-ink/5">
                <div className="flex-shrink-0 w-3 h-3 mt-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-heading mb-1">{event.title}</h3>
                  <time className="text-sm text-ink/50 mb-2 block">{event.date}</time>
                  <p className="text-ink/70 text-sm">{event.description}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${event.type === 'warning' ? 'bg-accent/20 text-accent' : event.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                  {event.type === 'warning' ? 'هام' : event.type === 'success' ? 'نهائي' : 'معلومات'}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="https://orientation.tn" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">المنصة الرسمية: orientation.tn</a>
            <p className="text-sm text-ink/50 mt-2">المصدر الرسمي هو وزارة التعليم العالي والبحث العلمي</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-ink/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold font-heading text-ink mb-4">تحتاج مساعدة؟</h2>
          <p className="text-ink/60 mb-6">فريق الاتحاد متفرغ لمساعدتك. تواصل معنا عبر نموذج الاتصال أو استخدم الشات بوت.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">تواصل معنا</Link>
            <Link href="/faq" className="px-6 py-3 border border-ink/20 rounded-lg font-semibold hover:bg-ink/5 transition-colors">الأسئلة الشائعة</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
