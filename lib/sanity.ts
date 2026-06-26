import { faqs, news, members, structures } from "@/lib/data";
import type { FAQ, NewsPost, ExecutiveMember, UniversityStructure } from "@/types";

export async function getFAQ(): Promise<FAQ[]> {
  return faqs;
}

export async function getNews(): Promise<NewsPost[]> {
  return news;
}

export async function getMembers(): Promise<ExecutiveMember[]> {
  return members;
}

export async function getStructures(): Promise<UniversityStructure[]> {
  return structures;
}
