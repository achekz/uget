"use client";
import { motion } from "framer-motion";

export default function BentoGrid() {
  const stats = [
    { value: '1952', label: 'سنة التأسيس', size: 'col-span-2 row-span-2' },
    { value: '14+', label: 'جامعة/معهد', size: 'col-span-1 row-span-1' },
    { value: '5000+', label: 'منخرط', size: 'col-span-1 row-span-1' },
    { value: '70+', label: 'سنة نضال', size: 'col-span-2 row-span-1' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`${stat.size} bg-gradient-to-br from-ink to-ink/80 text-paper rounded-2xl p-6 md:p-8 flex flex-col justify-end shadow-lg`}>
          <div className="text-4xl md:text-6xl font-bold font-heading text-primary mb-2">{stat.value}</div>
          <div className="text-paper/80 text-sm md:text-base">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
