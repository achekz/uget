import { promises as fs } from 'fs';
import path from 'path';
import { NewsPost, ExecutiveMember, UniversityStructure, FAQ, JoinRequest } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');

// Generic read function
async function readJSONFile<T>(filename: string): Promise<T[]> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

// Generic write function
async function writeJSONFile<T>(filename: string, data: T[]): Promise<void> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
}

// News operations
export async function getAllNews(): Promise<NewsPost[]> {
  return readJSONFile<NewsPost>('news.json');
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  const news = await getAllNews();
  return news.find((post) => post.slug === slug) || null;
}

export async function createNews(post: NewsPost): Promise<NewsPost> {
  const news = await getAllNews();
  news.unshift(post);
  await writeJSONFile('news.json', news);
  return post;
}

export async function updateNews(id: string, updatedPost: Partial<NewsPost>): Promise<NewsPost | null> {
  const news = await getAllNews();
  const index = news.findIndex((post) => post.id === id);
  
  if (index === -1) return null;
  
  news[index] = { ...news[index], ...updatedPost };
  await writeJSONFile('news.json', news);
  return news[index];
}

export async function deleteNews(id: string): Promise<boolean> {
  const news = await getAllNews();
  const filtered = news.filter((post) => post.id !== id);
  
  if (filtered.length === news.length) return false;
  
  await writeJSONFile('news.json', filtered);
  return true;
}

// Members operations
export async function getAllMembers(): Promise<ExecutiveMember[]> {
  return readJSONFile<ExecutiveMember>('members.json');
}

export async function createMember(member: ExecutiveMember): Promise<ExecutiveMember> {
  const members = await getAllMembers();
  members.push(member);
  await writeJSONFile('members.json', members);
  return member;
}

export async function updateMember(id: string, updatedMember: Partial<ExecutiveMember>): Promise<ExecutiveMember | null> {
  const members = await getAllMembers();
  const index = members.findIndex((member) => member.id === id);
  
  if (index === -1) return null;
  
  members[index] = { ...members[index], ...updatedMember };
  await writeJSONFile('members.json', members);
  return members[index];
}

export async function deleteMember(id: string): Promise<boolean> {
  const members = await getAllMembers();
  const filtered = members.filter((member) => member.id !== id);
  
  if (filtered.length === members.length) return false;
  
  await writeJSONFile('members.json', filtered);
  return true;
}

// Structures operations
export async function getAllStructures(): Promise<UniversityStructure[]> {
  return readJSONFile<UniversityStructure>('structures.json');
}

export async function createStructure(structure: UniversityStructure): Promise<UniversityStructure> {
  const structures = await getAllStructures();
  structures.push(structure);
  await writeJSONFile('structures.json', structures);
  return structure;
}

export async function updateStructure(id: string, updatedStructure: Partial<UniversityStructure>): Promise<UniversityStructure | null> {
  const structures = await getAllStructures();
  const index = structures.findIndex((structure) => structure.id === id);
  
  if (index === -1) return null;
  
  structures[index] = { ...structures[index], ...updatedStructure };
  await writeJSONFile('structures.json', structures);
  return structures[index];
}

export async function deleteStructure(id: string): Promise<boolean> {
  const structures = await getAllStructures();
  const filtered = structures.filter((structure) => structure.id !== id);
  
  if (filtered.length === structures.length) return false;
  
  await writeJSONFile('structures.json', filtered);
  return true;
}

// FAQ operations
export async function getAllFAQs(): Promise<FAQ[]> {
  try {
    const filePath = path.join(DATA_DIR, 'faq.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If file doesn't exist, return data from lib/data.ts
    const { faqs } = await import('./data');
    // Create the file with initial data
    await writeJSONFile('faq.json', faqs);
    return faqs;
  }
}

export async function createFAQ(faq: FAQ): Promise<FAQ> {
  const faqs = await getAllFAQs();
  faqs.push(faq);
  await writeJSONFile('faq.json', faqs);
  return faq;
}

export async function updateFAQ(id: string, updatedFAQ: Partial<FAQ>): Promise<FAQ | null> {
  const faqs = await getAllFAQs();
  const index = faqs.findIndex((faq) => faq.id === id);
  
  if (index === -1) return null;
  
  faqs[index] = { ...faqs[index], ...updatedFAQ };
  await writeJSONFile('faq.json', faqs);
  return faqs[index];
}

export async function deleteFAQ(id: string): Promise<boolean> {
  const faqs = await getAllFAQs();
  const filtered = faqs.filter((faq) => faq.id !== id);
  
  if (filtered.length === faqs.length) return false;
  
  await writeJSONFile('faq.json', filtered);
  return true;
}

// Join Request operations
export async function getAllJoinRequests(): Promise<JoinRequest[]> {
  return readJSONFile<JoinRequest>('join-requests.json');
}

export async function createJoinRequest(request: JoinRequest): Promise<JoinRequest> {
  const requests = await getAllJoinRequests();
  requests.unshift(request);
  await writeJSONFile('join-requests.json', requests);
  return request;
}

export async function updateJoinRequestStatus(id: string, status: "pending" | "approved" | "rejected"): Promise<JoinRequest | null> {
  const requests = await getAllJoinRequests();
  const index = requests.findIndex((req) => req.id === id);
  
  if (index === -1) return null;
  
  requests[index] = { ...requests[index], status };
  await writeJSONFile('join-requests.json', requests);
  return requests[index];
}

export async function deleteJoinRequest(id: string): Promise<boolean> {
  const requests = await getAllJoinRequests();
  const filtered = requests.filter((req) => req.id !== id);
  
  if (filtered.length === requests.length) return false;
  
  await writeJSONFile('join-requests.json', filtered);
  return true;
}
