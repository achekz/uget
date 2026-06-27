import type { Metadata } from "next";
import PageClient from "./page-client";
import { getAllNews } from "@/lib/data-service";

export const metadata: Metadata = {
  title: "الاتحاد العام لطلبة تونس | UGET",
  description: "نضال، استقلالية، صمود، ديمقراطية. الموقع الرسمي للاتحاد العام لطلبة تونس.",
};

// Revalidate the homepage every hour as a fallback
export const revalidate = 3600;

export default async function Home() {
  const allNews = await getAllNews();
  const latestNews = allNews.slice(0, 3);
  
  return <PageClient latestNews={latestNews} />;
}
