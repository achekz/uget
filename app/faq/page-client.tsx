"use client";
import FAQAccordion from "@/components/sections/faq-accordion";
import { FAQ } from "@/types";

interface FAQClientProps {
  initialFaqs: FAQ[];
}

export default function FAQClient({ initialFaqs }: FAQClientProps) {
  return (
    <main>
        <section className="pt-32 pb-20 bg-ink text-paper">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">الأسئلة الشائعة</h1>
            <p className="text-xl text-paper/80 max-w-2xl mx-auto">إجابات على أكثر الأسئلة تكراراً حول الاتحاد والتوجيه والانخراط</p>
          </div>
        </section>
        <section className="py-16 bg-paper">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <FAQAccordion items={initialFaqs} />
          </div>
        </section>
      </main>
  );
}
