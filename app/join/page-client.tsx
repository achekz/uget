"use client";
import { motion } from "framer-motion";
import JoinForm from "@/components/sections/join-form";

export default function JoinClient() {
  return (
    <main>
      <section className="pt-32 pb-20 bg-ink text-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">انضم إلينا</h1>
          <p className="text-xl text-paper/80 max-w-2xl mx-auto">كن جزءاً من النضال من أجل مصالح الطلبة</p>
        </div>
      </section>
      <section className="py-16 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {["املأ استمارة الانخراط", "تواصل مع الهيكل الجامعي", "حضر الاجتماع التعريفي"].map((step, i) => (
              <motion.div key={step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-heading font-bold">{i + 1}</div>
                <h3 className="font-heading font-bold text-lg">{step}</h3>
              </motion.div>
            ))}
          </div>
          <JoinForm />
        </div>
      </section>
    </main>
  );
}
