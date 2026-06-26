import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword } from '@/lib/admin-auth';
import { getAllJoinRequests, updateJoinRequestStatus, deleteJoinRequest } from '@/lib/data-service';

export async function GET(req: NextRequest) {
  const password = req.headers.get('x-admin-password');
  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const requests = await getAllJoinRequests();
    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching join requests:', error);
    return NextResponse.json({ error: 'Failed to fetch join requests' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const password = req.headers.get('x-admin-password');
  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    
    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    const updated = await updateJoinRequestStatus(id, status);
    
    if (!updated) {
      return NextResponse.json({ error: 'Join request not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating join request:', error);
    return NextResponse.json({ error: 'Failed to update join request' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const password = req.headers.get('x-admin-password');
  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const deleted = await deleteJoinRequest(id);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Join request not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting join request:', error);
    return NextResponse.json({ error: 'Failed to delete join request' }, { status: 500 });
  }
}
