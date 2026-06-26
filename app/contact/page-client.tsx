"use client";
import { motion } from "framer-motion";
import ContactForm from "@/components/sections/contact-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactClient() {
  return (
    <main>
        <section className="pt-32 pb-20 bg-ink text-paper">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">اتصل بنا</h1>
            <p className="text-xl text-paper/80 max-w-2xl mx-auto">نحن هنا للإجابة على استفساراتكم</p>
          </div>
        </section>
        <section className="py-16 bg-paper">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactForm />
              <div className="space-y-6">
                {[{icon: MapPin, title: 'العنوان', value: 'تونس، الجمهورية التونسية'}, {icon: Phone, title: 'الهاتف', value: '+216 71 000 000'}, {icon: Mail, title: 'البريد الإلكتروني', value: 'contact@uget.tn'}, {icon: Clock, title: 'ساعات العمل', value: 'الاثنين - الجمعة: 9:00 - 17:00'}].map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 p-4 bg-white dark:bg-ink/30 rounded-xl">
                    <item.icon className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold font-heading">{item.title}</h3>
                      <p className="text-ink/70">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
