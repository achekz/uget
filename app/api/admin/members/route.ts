import { NextRequest } from 'next/server';
import { isAuthenticated, createAuthResponse } from '@/lib/admin-auth';
import {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
} from '@/lib/data-service';
import { ExecutiveMember } from '@/types';

// GET all members
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return createAuthResponse();
  }

  try {
    const members = await getAllMembers();
    return Response.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return Response.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

// POST create member
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return createAuthResponse();
  }

  try {
    const body = await request.json();
    const newMember: ExecutiveMember = {
      id: Date.now().toString(),
      ...body,
    };

    const created = await createMember(newMember);
    return Response.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating member:', error);
    return Response.json({ error: 'Failed to create member' }, { status: 500 });
  }
}

// PATCH update member
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

    const updated = await updateMember(id, updates);
    
    if (!updated) {
      return Response.json({ error: 'Member not found' }, { status: 404 });
    }

    return Response.json(updated);
  } catch (error) {
    console.error('Error updating member:', error);
    return Response.json({ error: 'Failed to update member' }, { status: 500 });
  }
}

// DELETE member
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

    const deleted = await deleteMember(id);
    
    if (!deleted) {
      return Response.json({ error: 'Member not found' }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting member:', error);
    return Response.json({ error: 'Failed to delete member' }, { status: 500 });
  }
}
