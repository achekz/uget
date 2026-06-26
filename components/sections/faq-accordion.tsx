"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [open, setOpen] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = items.filter((item) =>
    item.question.includes(search) || item.answer.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث في الأسئلة الشائعة..."
          className="w-full pr-12 pl-4 py-4 rounded-xl border border-ink/10 bg-white dark:bg-ink/30 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
        />
      </div>
      <div className="space-y-3">
        {filtered.map((item, i) => {
          const isOpen = open === `faq-${i}`;
          return (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="border border-ink/5 rounded-xl overflow-hidden bg-white dark:bg-ink/20">
              <button
                onClick={() => setOpen(isOpen ? null : `faq-${i}`)}
                className="w-full flex items-center justify-between p-5 text-right hover:bg-ink/5 transition-colors"
              >
                <span className="font-medium font-heading">{item.question}</span>
                <ChevronDown className={cn('w-5 h-5 text-primary transition-transform duration-300', isOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div className="px-5 pb-5 text-ink/70 leading-relaxed">{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        {filtered.length === 0 && <p className="text-center text-ink/50 py-8">لا توجد نتائج</p>}
      </div>
    </div>
  );
}
