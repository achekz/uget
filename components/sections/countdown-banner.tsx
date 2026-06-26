"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2026-08-07T00:00:00');
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, target.getTime() - now.getTime());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = ['يوم', 'ساعة', 'دقيقة', 'ثانية'];
  const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];

  return (
    <section className="bg-gradient-to-b from-primary to-primary/90 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <p className="text-white/80 text-sm mb-1">العد التنازلي لإعلان نتائج التوجيه الجامعي</p>
          <p className="text-white text-lg font-bold">12 أوت 2026</p>
        </div>
        <div className="flex justify-center gap-3 md:gap-6">
          {values.map((v, i) => (
            <motion.div key={i} initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="bg-white text-ink rounded-xl px-4 py-3 md:px-6 md:py-4 min-w-[70px] text-center shadow-lg">
              <div className="text-2xl md:text-4xl font-bold font-heading text-primary">{v}</div>
              <div className="text-xs md:text-sm text-ink/60 mt-1">{units[i]}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
