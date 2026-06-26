import type { Metadata } from "next";
import NewsClient from "./page-client";
import { getAllNews } from "@/lib/data-service";

export const metadata: Metadata = { title: "البيانات والأخبار | UGET", description: "آخر البيانات والبلاغات الرسمية للاتحاد العام لطلبة تونس" };

export default async function NewsPage() {
  const news = await getAllNews();
  return <NewsClient initialNews={news} />;
}
