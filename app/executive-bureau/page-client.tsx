"use client";
import { motion } from "framer-motion";
import MemberCard from "@/components/sections/member-card";
import { ExecutiveMember } from "@/types";

interface ExecutiveBureauClientProps {
  initialMembers: ExecutiveMember[];
}

export default function ExecutiveBureauClient({ initialMembers }: ExecutiveBureauClientProps) {
  return (
    <main>
        <section className="pt-32 pb-20 bg-ink text-paper">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold font-heading mb-6"
            >
              المكتب التنفيذي الوطني
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-paper/80 max-w-2xl mx-auto"
            >
              الهيكل القيادي للاتحاد العام لطلبة تونس
            </motion.p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-paper">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {initialMembers.map((member, index) => (
                <MemberCard key={member.id} member={member} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
  );
}
