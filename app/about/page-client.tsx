"use client";
import { motion } from "framer-motion";
import { Timeline } from "@/components/sections/timeline";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutClient() {
  const milestones = [
    { year: "1952", title: "تأسيس الاتحاد", description: "تأسس الاتحاد في 10 فيفري 1952 كمنظمة طلابية نقابية مستقلة." },
    { year: "1953", title: "المؤتمر التأسيسي بباريس", description: "انعقد المؤتمر التأسيسي الأول للاتحاد في باريس." },
    { year: "1960", title: "التطور التنظيمي", description: "توسع الاتحاد ليشمل كافة الجامعات التونسية." },
    { year: "1980", title: "النضال من أجل السكن الجامعي", description: "قاد الاتحاد حملات كبرى من أجل تحسين السكن الجامعي." },
    { year: "2000", title: "التحول الرقمي", description: "بدأ الاتحاد بتبني أدوات رقمية للتواصل مع الطلبة." },
    { year: "2024", title: "المرحلة الحالية", description: "استمرار النضال من أجل مصالح الطلبة في ظل التحولات الجديدة." },
  ];

  return (
    <main>
        <section className="pt-32 pb-20 bg-ink text-paper">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold font-heading mb-6"
            >
              من نحن
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-paper/80 max-w-3xl mx-auto leading-relaxed"
            >
              الاتحاد العام لطلبة تونس (UGET)، منظمة طلابية نقابية، ديمقراطية،
              تقدمية ووطنية، تأسست سنة 1952، الناطق الرسمي باسم الطلبة
              التونسيين أمام السلط العمومية والجامعية والرأي العام.
            </motion.p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-paper">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-ink text-center mb-16">
              مسيرتنا النضالية
            </h2>
            <Timeline milestones={milestones} />
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white dark:bg-ink/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-ink text-center mb-12">
              مبادئنا وقيمنا
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["نقابية", "ديمقراطية", "تقدمية", "وطنية"].map((val, i) => (
                <motion.div
                  key={val}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl border border-ink/10 dark:border-paper/10 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-heading font-bold text-primary">•</span>
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-2">{val}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-paper">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-ink text-center mb-12">
              أهدافنا
            </h2>
            <div className="space-y-4">
              {["الدفاع عن المصالح المادية والمعنوية للطلبة", "تحسين السكن الجامعي", "الدفاع عن المنح الجامعية", "تمثيل الطلبة أمام السلط العمومية والجامعية", "نشر الوعي النقابي والوطني"].map((goal, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-ink/30 border border-ink/5 dark:border-paper/5"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                  <span className="text-ink/80">{goal}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
  );
}
