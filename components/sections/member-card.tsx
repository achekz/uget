"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ExecutiveMember } from "@/types";

interface MemberCardProps {
  member: ExecutiveMember;
  index?: number;
}

export default function MemberCard({ member, index = 0 }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-ink/30 rounded-2xl overflow-hidden border border-ink/5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="p-6">
        {/* Image with rounded square */}
        <div className="relative w-40 h-40 mx-auto mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
          {member.image ? (
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary/30 text-4xl font-bold">
              {member.name.charAt(0)}
            </div>
          )}
        </div>
        
        {/* Member Info */}
        <div className="text-center">
          <h3 className="text-lg font-heading font-bold mb-1">{member.name}</h3>
          <p className="text-primary font-medium text-sm mb-1">{member.role}</p>
          {member.sector && (
            <p className="text-ink/50 text-xs bg-gray-50 dark:bg-ink/10 px-3 py-1 rounded-full inline-block">
              {member.sector}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
