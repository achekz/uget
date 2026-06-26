import { notFound } from "next/navigation";
import { getNewsBySlug, getAllNews } from "@/lib/data-service";
import NewsDetailClient from "./page-client";

export async function generateStaticParams() {
  const allNews = await getAllNews();
  return allNews.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = await getNewsBySlug(params.slug);
  if (!item) return {};
  return { title: `${item.title} | UGET`, description: item.excerpt };
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const item = await getNewsBySlug(params.slug);
  if (!item) return notFound();

  return <NewsDetailClient item={item} />;
}
