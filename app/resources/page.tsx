import type { Metadata } from "next";
import ResourcesClient from "./page-client";

export const metadata: Metadata = {
  title: "الموارد والوثائق | UGET",
  description: "تحميل الوثائق والنماذج الرسمية للاتحاد العام لطلبة تونس.",
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
