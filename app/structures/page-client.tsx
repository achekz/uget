"use client";
import { motion } from "framer-motion";
import { UniversityStructure } from "@/types";
import { MapPin, Mail, Phone } from "lucide-react";

interface StructuresClientProps {
  initialStructures: UniversityStructure[];
}

export default function StructuresClient({ initialStructures }: StructuresClientProps) {
  return (
    <main>
      <section className="pt-32 pb-20 bg-ink text-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">الهياكل الجامعية</h1>
          <p className="text-xl text-paper/80 max-w-2xl mx-auto">منتشرون في الجامعات والمعاهد عبر كامل تراب الجمهورية</p>
        </div>
      </section>
      <section className="py-16 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialStructures.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-ink/30 p-6 rounded-2xl border border-ink/5 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold font-heading mb-1">{s.name}</h3>
                <p className="text-ink/60 text-sm mb-4">{s.university} • {s.city}</p>
                <div className="space-y-2 text-sm text-ink/70">
                  {s.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /><span dir="ltr">{s.email}</span></div>}
                  {s.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /><span dir="ltr">{s.phone}</span></div>}
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /><span>{s.city}</span></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
