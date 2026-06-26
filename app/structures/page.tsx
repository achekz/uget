import type { Metadata } from "next";
import StructuresClient from "./page-client";
import { getAllStructures } from "@/lib/data-service";

export const metadata: Metadata = {
  title: "الهياكل الجامعية | UGET",
  description: "تعرف على هياكل الاتحاد العام لطلبة تونس في الجامعات والمعاهد.",
};

export default async function StructuresPage() {
  const structures = await getAllStructures();
  return <StructuresClient initialStructures={structures} />;
}
