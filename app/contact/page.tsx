import type { Metadata } from "next";
import ContactClient from "./page-client";

export const metadata: Metadata = {
  title: "اتصل بنا | UGET",
  description: "تواصل مع الاتحاد العام لطلبة تونس عبر نموذج الاتصال أو معلومات الاتصال.",
};

export default function ContactPage() {
  return <ContactClient />;
}
