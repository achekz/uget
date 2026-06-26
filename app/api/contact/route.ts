import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, phone } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'جميع الحقول المطلوبة' }, { status: 400 });
    }

    // Send email
    const emailSent = await sendContactEmail({ name, email, phone, message: `${subject ? subject + '\n\n' : ''}${message}` });

    if (!emailSent) {
      console.warn('Email not sent, but form data logged:', { name, email, subject, message });
    }

    return NextResponse.json({ success: true, message: 'تم إرسال رسالتك بنجاح!' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
