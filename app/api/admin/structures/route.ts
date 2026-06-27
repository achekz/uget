import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAuthenticated, createAuthResponse } from '@/lib/admin-auth';
import {
  getAllStructures,
  createStructure,
  updateStructure,
  deleteStructure,
} from '@/lib/data-service';
import { UniversityStructure } from '@/types';

// GET all structures
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return createAuthResponse();
  }

  try {
    const structures = await getAllStructures();
    return Response.json(structures);
  } catch (error) {
    console.error('Error fetching structures:', error);
    return Response.json({ error: 'Failed to fetch structures' }, { status: 500 });
  }
}

// POST create structure
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return createAuthResponse();
  }

  try {
    const body = await request.json();
    const newStructure: UniversityStructure = {
      id: Date.now().toString(),
      ...body,
    };

    const created = await createStructure(newStructure);
    revalidatePath('/structures');
    return Response.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating structure:', error);
    return Response.json({ error: 'Failed to create structure' }, { status: 500 });
  }
}

// PATCH update structure
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

    const updated = await updateStructure(id, updates);
    
    if (!updated) {
      return Response.json({ error: 'Structure not found' }, { status: 404 });
    }

    revalidatePath('/structures');
    return Response.json(updated);
  } catch (error) {
    console.error('Error updating structure:', error);
    return Response.json({ error: 'Failed to update structure' }, { status: 500 });
  }
}

// DELETE structure
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

    const deleted = await deleteStructure(id);
    
    if (!deleted) {
      return Response.json({ error: 'Structure not found' }, { status: 404 });
    }

    revalidatePath('/structures');
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting structure:', error);
    return Response.json({ error: 'Failed to delete structure' }, { status: 500 });
  }
}
