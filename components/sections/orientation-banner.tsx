"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MessageCircle } from "lucide-react";
import { orientationEvents } from "@/lib/data";

export default function OrientationBanner() {
  const nextEvent = orientationEvents[0];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-paper to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-ink to-ink/80 text-paper rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-accent" />
            <span className="text-accent font-medium">السنة الجامعية 2026/2027</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">التوجيه الجامعي</h2>
          <p className="text-paper/80 mb-6 max-w-2xl">نتائج الدورة النهائية للتوجيه تعلن في <strong className="text-accent">12 أوت 2026</strong>. الاتحاد جاهز لمساعدتك في كل خطوة.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/orientation" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors">
              روزنامة التوجيه الكاملة
            </Link>
            <Link href="/faq" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-paper/30 text-paper rounded-xl font-semibold hover:bg-paper/10 transition-colors">
              <MessageCircle className="w-4 h-4" />
              الأسئلة الشائعة
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
