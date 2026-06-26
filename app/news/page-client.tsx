"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { NewsPost } from "@/types";

interface NewsClientProps {
  initialNews: NewsPost[];
}

export default function NewsClient({ initialNews }: NewsClientProps) {
  return (
    <main>
      <section className="pt-32 pb-20 bg-ink text-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">البيانات والأخبار</h1>
          <p className="text-xl text-paper/80 max-w-2xl mx-auto">آخر المستجدات والبلاغات الرسمية للاتحاد</p>
        </div>
      </section>
      <section className="py-16 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialNews.map((item, i) => (
              <motion.article 
                key={item.id} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }} 
                className="group bg-white dark:bg-ink/30 rounded-2xl overflow-hidden border border-ink/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <Link href={`/news/${item.slug}`}>
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <Calendar className="w-12 h-12 text-primary/40" />
                    )}
                  </div>
                  <div className="p-6">
                    <time className="text-sm text-ink/50 mb-2 block">{item.date}</time>
                    <h3 className="text-lg font-bold font-heading mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-ink/70 text-sm mb-4">{item.excerpt}</p>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">{item.category}</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
