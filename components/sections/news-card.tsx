"use client";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import type { NewsPost } from "@/types";

interface NewsCardProps {
  item: NewsPost;
  index?: number;
}

export default function NewsCard({ item, index = 0 }: NewsCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white dark:bg-ink/30 rounded-2xl overflow-hidden border border-ink/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <Link href={`/news/${item.slug}`}>
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
          {item.image ? (
            <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <Calendar className="w-12 h-12 text-primary/40" />
          )}
        </div>
        <div className="p-6">
          <time className="text-sm text-ink/50 mb-2 block">{item.date}</time>
          <h3 className="text-lg font-bold font-heading mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
          <p className="text-ink/70 text-sm leading-relaxed">{item.excerpt}</p>
          <span className="inline-block mt-3 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">{item.category}</span>
        </div>
      </Link>
    </motion.article>
  );
}
