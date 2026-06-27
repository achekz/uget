import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAuthenticated, createAuthResponse } from '@/lib/admin-auth';
import {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
} from '@/lib/data-service';
import { NewsPost } from '@/types';

// GET all news
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return createAuthResponse();
  }

  try {
    const news = await getAllNews();
    return Response.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return Response.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

// POST create news
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return createAuthResponse();
  }

  try {
    const body = await request.json();
    const newPost: NewsPost = {
      id: Date.now().toString(),
      ...body,
      date: body.date || new Date().toISOString().split('T')[0],
    };

    const created = await createNews(newPost);
    revalidatePath('/');
    revalidatePath('/news');
    revalidatePath(`/news/${created.slug}`);
    return Response.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return Response.json({ error: 'Failed to create news' }, { status: 500 });
  }
}

// PATCH update news
export async function PATCH(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return createAuthResponse();
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return Response.json({ error: 'ID is required' }, { status: 400 });
    }

    const updated = await updateNews(id, updates);
    
    if (!updated) {
      return Response.json({ error: 'News not found' }, { status: 404 });
    }

    revalidatePath('/');
    revalidatePath('/news');
    revalidatePath(`/news/${updated.slug}`);
    if (updates.slug && updates.slug !== updated.slug) {
      revalidatePath(`/news/${updates.slug}`);
    }
    return Response.json(updated);
  } catch (error) {
    console.error('Error updating news:', error);
    return Response.json({ error: 'Failed to update news' }, { status: 500 });
  }
}

// DELETE news
export async function DELETE(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return createAuthResponse();
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'ID is required' }, { status: 400 });
    }

    // Get the post first to know its slug for revalidation
    const allNews = await getAllNews();
    const postToDelete = allNews.find(p => p.id === id);

    const deleted = await deleteNews(id);
    
    if (!deleted) {
      return Response.json({ error: 'News not found' }, { status: 404 });
    }

    revalidatePath('/');
    revalidatePath('/news');
    if (postToDelete) {
      revalidatePath(`/news/${postToDelete.slug}`);
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting news:', error);
    return Response.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
