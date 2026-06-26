import { NextRequest, NextResponse } from 'next/server';
import { sendJoinEmail } from '@/lib/email';
import { createJoinRequest } from '@/lib/data-service';

export async function POST(req: NextRequest) {
  try {
    const { name, university, college, email, phone, message, studentId } = await req.json();
    if (!name || !email) {
      return NextResponse.json({ error: 'الاسم والبريد مطلوبان' }, { status: 400 });
    }

    // Save to JSON file
    const joinRequest = await createJoinRequest({
      id: `join-${Date.now()}`,
      name,
      university: university || '',
      college: college || '',
      email,
      phone: phone || '',
      message: message || '',
      submittedAt: new Date().toISOString(),
      status: 'pending'
    });

    // Parse name into first and last name
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || name;
    const lastName = nameParts.slice(1).join(' ') || '';

    // Send email
    const emailSent = await sendJoinEmail({
      firstName,
      lastName,
      email,
      phone: phone || '',
      university: university || college || 'غير محدد',
      studentId: studentId || 'غير محدد',
    });

    if (!emailSent) {
      console.warn('Email not sent, but form data saved:', joinRequest);
    }

    return NextResponse.json({ success: true, message: 'تم إرسال طلب الانخراط بنجاح!' });
  } catch (error) {
    console.error('Error processing join form:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
