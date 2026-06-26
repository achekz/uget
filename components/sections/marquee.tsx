"use client";
import { motion } from "framer-motion";

export function Marquee() {
  const text = "نضال — استقلالية — صمود — ديمقراطية —";
  return (
    <div className="bg-ink text-paper py-3 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8 text-sm font-medium tracking-widest">
            {text} <span className="text-primary">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
