"use client";
import { motion } from "framer-motion";

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  milestones: Milestone[];
}

export function Timeline({ milestones }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute right-4 md:right-1/2 top-0 bottom-0 w-0.5 bg-ink/10 dark:bg-paper/10" />
      <div className="space-y-12">
        {milestones.map((m, i) => (
          <motion.div key={m.year} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative flex items-start gap-6 md:gap-0">
            <div className="md:w-1/2 md:pe-12 md:text-left">
              <span className="text-4xl font-heading font-bold text-primary/20">{m.year}</span>
              <h3 className="text-xl font-heading font-bold mb-1">{m.title}</h3>
              <p className="text-ink/70 text-sm leading-relaxed">{m.description}</p>
            </div>
            <div className="absolute right-2 md:right-1/2 md:translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-paper dark:border-ink shadow-md" />
            <div className="md:w-1/2 md:ps-12 hidden md:block" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
