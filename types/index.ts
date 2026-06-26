export interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  slug: string;
  image?: string;
}

export interface ExecutiveMember {
  id: string;
  name: string;
  role: string;
  sector: string;
  image?: string;
}

export interface UniversityStructure {
  id: string;
  name: string;
  university: string;
  city: string;
  email?: string;
  phone?: string;
}

export interface OrientationEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  type: "info" | "warning" | "success";
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  language: string;
  order: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface JoinRequest {
  id: string;
  name: string;
  university: string;
  college: string;
  email: string;
  phone: string;
  message?: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}
