import { supabase } from './supabase';
import { NewsPost, ExecutiveMember, UniversityStructure, FAQ, JoinRequest } from '@/types';

// ─── NEWS ────────────────────────────────────────────────────

export async function getAllNews(): Promise<NewsPost[]> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false });
    if (error) {
      console.error('Error fetching all news:', error);
      return [];
    }
    return (data || []) as NewsPost[];
  } catch (error) {
    console.error('Unexpected error fetching all news:', error);
    return [];
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('slug', slug)
      .maybeSingle(); // Use maybeSingle to avoid throwing when not found
    if (error) {
      console.error(`Error fetching news by slug (${slug}):`, error);
      return null;
    }
    return data as NewsPost | null;
  } catch (error) {
    console.error(`Unexpected error fetching news by slug (${slug}):`, error);
    return null;
  }
}

export async function createNews(post: NewsPost): Promise<NewsPost> {
  const { data, error } = await supabase
    .from('news')
    .insert(post)
    .select()
    .single();
  if (error) throw error;
  return data as NewsPost;
}

export async function updateNews(id: string, updatedPost: Partial<NewsPost>): Promise<NewsPost | null> {
  const { data, error } = await supabase
    .from('news')
    .update(updatedPost)
    .eq('id', id)
    .select()
    .single();
  if (error) return null;
  return data as NewsPost;
}

export async function deleteNews(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', id);
  return !error;
}

// ─── MEMBERS ─────────────────────────────────────────────────

export async function getAllMembers(): Promise<ExecutiveMember[]> {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*');
    if (error) {
      console.error('Error fetching all members:', error);
      return [];
    }
    return (data || []) as ExecutiveMember[];
  } catch (error) {
    console.error('Unexpected error fetching all members:', error);
    return [];
  }
}

export async function createMember(member: ExecutiveMember): Promise<ExecutiveMember> {
  const { data, error } = await supabase
    .from('members')
    .insert(member)
    .select()
    .single();
  if (error) throw error;
  return data as ExecutiveMember;
}

export async function updateMember(id: string, updatedMember: Partial<ExecutiveMember>): Promise<ExecutiveMember | null> {
  const { data, error } = await supabase
    .from('members')
    .update(updatedMember)
    .eq('id', id)
    .select()
    .single();
  if (error) return null;
  return data as ExecutiveMember;
}

export async function deleteMember(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('members')
    .delete()
    .eq('id', id);
  return !error;
}

// ─── STRUCTURES ──────────────────────────────────────────────

export async function getAllStructures(): Promise<UniversityStructure[]> {
  try {
    const { data, error } = await supabase
      .from('structures')
      .select('*');
    if (error) {
      console.error('Error fetching all structures:', error);
      return [];
    }
    return (data || []) as UniversityStructure[];
  } catch (error) {
    console.error('Unexpected error fetching all structures:', error);
    return [];
  }
}

export async function createStructure(structure: UniversityStructure): Promise<UniversityStructure> {
  const { data, error } = await supabase
    .from('structures')
    .insert(structure)
    .select()
    .single();
  if (error) throw error;
  return data as UniversityStructure;
}

export async function updateStructure(id: string, updatedStructure: Partial<UniversityStructure>): Promise<UniversityStructure | null> {
  const { data, error } = await supabase
    .from('structures')
    .update(updatedStructure)
    .eq('id', id)
    .select()
    .single();
  if (error) return null;
  return data as UniversityStructure;
}

export async function deleteStructure(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('structures')
    .delete()
    .eq('id', id);
  return !error;
}

// ─── FAQS ────────────────────────────────────────────────────

export async function getAllFAQs(): Promise<FAQ[]> {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('order', { ascending: true });
    if (error) {
      console.error('Error fetching all FAQs:', error);
      return [];
    }
    return (data || []) as FAQ[];
  } catch (error) {
    console.error('Unexpected error fetching all FAQs:', error);
    return [];
  }
}

export async function createFAQ(faq: FAQ): Promise<FAQ> {
  const { data, error } = await supabase
    .from('faqs')
    .insert(faq)
    .select()
    .single();
  if (error) throw error;
  return data as FAQ;
}

export async function updateFAQ(id: string, updatedFAQ: Partial<FAQ>): Promise<FAQ | null> {
  const { data, error } = await supabase
    .from('faqs')
    .update(updatedFAQ)
    .eq('id', id)
    .select()
    .single();
  if (error) return null;
  return data as FAQ;
}

export async function deleteFAQ(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id);
  return !error;
}

// ─── JOIN REQUESTS ────────────────────────────────────────────

export async function getAllJoinRequests(): Promise<JoinRequest[]> {
  try {
    const { data, error } = await supabase
      .from('join_requests')
      .select('*')
      .order('submitted_at', { ascending: false });
    if (error) {
      console.error('Error fetching all join requests:', error);
      return [];
    }
    return (data || []) as JoinRequest[];
  } catch (error) {
    console.error('Unexpected error fetching all join requests:', error);
    return [];
  }
}

export async function createJoinRequest(request: JoinRequest): Promise<JoinRequest> {
  const { data, error } = await supabase
    .from('join_requests')
    .insert(request)
    .select()
    .single();
  if (error) throw error;
  return data as JoinRequest;
}

export async function updateJoinRequestStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<JoinRequest | null> {
  const { data, error } = await supabase
    .from('join_requests')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) return null;
  return data as JoinRequest;
}

export async function deleteJoinRequest(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('join_requests')
    .delete()
    .eq('id', id);
  return !error;
}
