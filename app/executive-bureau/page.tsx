import type { Metadata } from "next";
import ExecutiveBureauClient from "./page-client";
import { getAllMembers } from "@/lib/data-service";

export const metadata: Metadata = {
  title: "المكتب التنفيذي | الاتحاد العام لطلبة تونس",
  description: "تعرف على أعضاء المكتب التنفيذي الوطني للاتحاد العام لطلبة تونس.",
};

export default async function ExecutiveBureauPage() {
  const members = await getAllMembers();
  return <ExecutiveBureauClient initialMembers={members} />;
}
