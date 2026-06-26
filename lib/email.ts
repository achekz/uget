import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface JoinEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string;
  studentId: string;
}

export async function sendContactEmail(data: ContactEmailData): Promise<boolean> {
  if (!resend) {
    console.log('Resend not configured. Email data:', data);
    return false;
  }

  try {
    const { error } = await resend.emails.send({
      from: 'UGET Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'contact@uget.tn',
      subject: `رسالة جديدة من ${data.name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #c41e3a; border-bottom: 2px solid #c41e3a; padding-bottom: 10px;">رسالة جديدة من نموذج الاتصال</h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>الاسم:</strong> ${data.name}</p>
              <p style="margin: 10px 0;"><strong>البريد الإلكتروني:</strong> ${data.email}</p>
              ${data.phone ? `<p style="margin: 10px 0;"><strong>الهاتف:</strong> ${data.phone}</p>` : ''}
            </div>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #c41e3a;">
              <p style="margin: 0;"><strong>الرسالة:</strong></p>
              <p style="margin: 10px 0; white-space: pre-wrap;">${data.message}</p>
            </div>
            
            <p style="margin-top: 30px; color: #666; font-size: 12px;">
              تم إرسال هذه الرسالة من موقع الاتحاد العام لطلبة تونس
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending contact email:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
}

export async function sendJoinEmail(data: JoinEmailData): Promise<boolean> {
  if (!resend) {
    console.log('Resend not configured. Join data:', data);
    return false;
  }

  try {
    const { error } = await resend.emails.send({
      from: 'UGET Join <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'contact@uget.tn',
      subject: `طلب انخراط جديد - ${data.firstName} ${data.lastName}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #c41e3a; border-bottom: 2px solid #c41e3a; padding-bottom: 10px;">طلب انخراط جديد</h2>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #333;">معلومات الطالب:</h3>
              <p style="margin: 10px 0;"><strong>الاسم الكامل:</strong> ${data.firstName} ${data.lastName}</p>
              <p style="margin: 10px 0;"><strong>البريد الإلكتروني:</strong> ${data.email}</p>
              <p style="margin: 10px 0;"><strong>الهاتف:</strong> ${data.phone}</p>
              <p style="margin: 10px 0;"><strong>الجامعة:</strong> ${data.university}</p>
              <p style="margin: 10px 0;"><strong>رقم البطاقة الطلابية:</strong> ${data.studentId}</p>
            </div>
            
            <div style="margin: 30px 0; padding: 15px; background-color: #e8f5e9; border-radius: 5px;">
              <p style="margin: 0; color: #2e7d32;">
                <strong>⚠️ تذكير:</strong> يرجى متابعة هذا الطلب والتواصل مع الطالب في أقرب وقت ممكن.
              </p>
            </div>
            
            <p style="margin-top: 30px; color: #666; font-size: 12px;">
              تم إرسال هذا الطلب من موقع الاتحاد العام لطلبة تونس
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending join email:', error);
      return false;
    }

    // Send confirmation email to the student
    await resend.emails.send({
      from: 'UGET <onboarding@resend.dev>',
      to: data.email,
      subject: 'تأكيد طلب الانخراط - الاتحاد العام لطلبة تونس',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #c41e3a; border-bottom: 2px solid #c41e3a; padding-bottom: 10px;">مرحباً ${data.firstName}!</h2>
            
            <p style="margin: 20px 0; font-size: 16px; line-height: 1.6;">
              شكراً لك على اهتمامك بالانخراط في الاتحاد العام لطلبة تونس.
            </p>
            
            <p style="margin: 20px 0; font-size: 16px; line-height: 1.6;">
              تم استلام طلبك بنجاح وسيتم مراجعته من قبل فريقنا. سنتواصل معك قريباً عبر البريد الإلكتروني أو الهاتف.
            </p>
            
            <div style="margin: 30px 0; padding: 20px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 5px;">
              <p style="margin: 0; color: #856404;">
                <strong>ملاحظة:</strong> في حال لم تتلق رداً خلال 3 أيام، يرجى التواصل معنا مباشرة.
              </p>
            </div>
            
            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              مع أطيب التحيات،<br>
              <strong>الاتحاد العام لطلبة تونس</strong>
            </p>
          </div>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error('Error sending join email:', error);
    return false;
  }
}
