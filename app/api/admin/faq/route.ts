import { NextRequest } from 'next/server';
import { isAuthenticated, createAuthResponse } from '@/lib/admin-auth';
import {
  getAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from '@/lib/data-service';
import { FAQ } from '@/types';

// GET all FAQs
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return createAuthResponse();
  }

  try {
    const faqs = await getAllFAQs();
    return Response.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return Response.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

// POST create FAQ
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return createAuthResponse();
  }

  try {
    const body = await request.json();
    const newFAQ: FAQ = {
      id: Date.now().toString(),
      ...body,
      order: body.order || 999,
    };

    const created = await createFAQ(newFAQ);
    return Response.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return Response.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}

// PATCH update FAQ
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

    const updated = await updateFAQ(id, updates);
    
    if (!updated) {
      return Response.json({ error: 'FAQ not found' }, { status: 404 });
    }

    return Response.json(updated);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return Response.json({ error: 'Failed to update FAQ' }, { status: 500 });
  }
}

// DELETE FAQ
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

    const deleted = await deleteFAQ(id);
    
    if (!deleted) {
      return Response.json({ error: 'FAQ not found' }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return Response.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}
