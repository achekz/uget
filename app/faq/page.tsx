import type { Metadata } from "next";
import FAQClient from "./page-client";
import { getAllFAQs } from "@/lib/data-service";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة | UGET",
  description: "إجابات على أكثر الأسئلة تكراراً حول الاتحاد والتوجيه والانخراط.",
};

export default async function FAQPage() {
  const faqs = await getAllFAQs();
  return <FAQClient initialFaqs={faqs} />;
}
