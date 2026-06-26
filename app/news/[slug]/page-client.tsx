"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import type { NewsPost } from "@/types";

export default function NewsDetailClient({ item }: { item: NewsPost }) {
  return (
    <div className="min-h-screen">
      <main>
        <article className="pt-32 pb-20 bg-paper">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link href="/news" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all mb-8">
                <span>العودة للبيانات</span>
                <span className="rotate-180">→</span>
              </Link>
              
              <h1 className="text-3xl md:text-5xl font-bold font-heading text-ink mb-4">{item.title}</h1>
              <time className="text-ink/50 mb-8 block">{item.date} • {item.category}</time>
              
              {item.image && (
                <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              )}
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-ink/80 mb-6">{item.excerpt}</p>
                <p className="leading-relaxed text-ink/70 whitespace-pre-wrap">{item.content}</p>
              </div>
            </motion.div>
          </div>
        </article>
      </main>
    </div>
  );
}
