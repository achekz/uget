import type { Metadata } from "next";
import OrientationClient from "./page-client";

export const metadata: Metadata = {
  title: "التوجيه الجامعي 2026/2027 | UGET",
  description: "روزنامة التوجيه الجامعي والدعم للطلبة الجدد مع الاتحاد العام لطلبة تونس.",
};

export default function OrientationPage() {
  return <OrientationClient />;
}
