import type { Metadata } from "next";
import AboutClient from "./page-client";

export const metadata: Metadata = {
  title: "من نحن | الاتحاد العام لطلبة تونس",
  description: "تاريخ الاتحاد العام لطلبة تونس منذ تأسيسه سنة 1952، مبادئه وأهدافه.",
};

export default function AboutPage() {
  return <AboutClient />;
}
