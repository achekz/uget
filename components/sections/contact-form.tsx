"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    await fetch('/api/contact', { method: 'POST', body: JSON.stringify(Object.fromEntries(data)) });
    setSent(true);
  };

  if (sent) {
    return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl">
      <p className="text-green-700 dark:text-green-400 font-medium">تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.</p>
    </motion.div>;
  }

  return (
    <motion.form initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-ink/30 p-6 md:p-8 rounded-2xl border border-ink/5 shadow-sm">
      <h3 className="text-xl font-heading font-bold mb-4">أرسل لنا رسالة</h3>
      {['الاسم الكامل', 'البريد الإلكتروني', 'الموضوع'].map((label, i) => (
        <div key={label}>
          <label className="block text-sm font-medium text-ink/70 mb-1">{label}</label>
          <input name={['name','email','subject'][i]} required className="w-full px-4 py-3 rounded-xl border border-ink/10 bg-paper dark:bg-ink/20 focus:ring-2 focus:ring-primary outline-none" />
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-ink/70 mb-1">الرسالة</label>
        <textarea name="message" required rows={4} className="w-full px-4 py-3 rounded-xl border border-ink/10 bg-paper dark:bg-ink/20 focus:ring-2 focus:ring-primary outline-none resize-none" />
      </div>
      <Button type="submit" className="w-full"><Send className="w-4 h-4 ml-2" /> إرسال</Button>
    </motion.form>
  );
}
