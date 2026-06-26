"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ResourcesClient() {
  const resources = [
    { title: "القانون الأساسي للاتحاد", desc: "القانون الأساسي المعدل للاتحاد العام لطلبة تونس", icon: "📄" },
    { title: "دليل الطالب الجديد", desc: "كل ما يحتاجه الطالب الجديد في الحياة الجامعية", icon: "📘" },
    { title: "نموذج رسالة تظلم", desc: "نموذج جاهز لكتابة تظلم إداري", icon: "📝" },
    { title: "نموذج طلب سكن جامعي", desc: "نموذج طلب السكن الجامعي", icon: "🏠" },
  ];

  return (
    <main>
      <section className="pt-32 pb-20 bg-ink text-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">الموارد والوثائق</h1>
          <p className="text-xl text-paper/80 max-w-2xl mx-auto">تحميل الوثائق والنماذج الرسمية</p>
        </div>
      </section>
      <section className="py-16 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-ink/30 p-6 rounded-2xl border border-ink/5 shadow-sm hover:shadow-lg transition-shadow flex items-start gap-4">
                <div className="text-4xl">{r.icon}</div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg mb-1">{r.title}</h3>
                  <p className="text-ink/60 text-sm mb-4">{r.desc}</p>
                  <Button size="sm" variant="outline"><Download className="w-4 h-4 ml-2" /> تحميل</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
