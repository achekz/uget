export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getFAQ } from '@/lib/sanity';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || 'sk-ant-placeholder' });

const rateLimitMap = new Map<string, { count: number; reset: number }>();
function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + 60000 });
    return true;
  }
  entry.count++;
  return entry.count <= 10;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: 'تم تجاوز الحد المسموح. حاول لاحقاً.' }, { status: 429 });
    }

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'بيانات غير صالحة' }, { status: 400 });
    }

    let faqText = '';
    try {
      const faqs = await getFAQ();
      const faqSection = Array.isArray(faqs) && faqs.length > 0
        ? faqs.map((f: any) => `س: ${f.question}\nج: ${f.answer}`).join('\n\n')
        : '';
      faqText = faqSection ? `\n\n=== الأسئلة الشائعة الحالية ===\n${faqSection}\n=== انتهت الأسئلة الشائعة ===\n` : '';
    } catch (e) {
      // If Sanity is not configured, continue without FAQ context
    }

    const systemPrompt = `أنت مساعد رقمي تابع للاتحاد العام لطلبة تونس (UGET).

${faqText}

=== معلومات عامة عن الاتحاد ===
- تأسس سنة 1952، منظمة طلابية نقابية، ديمقراطية، تقدمية ووطنية
- الناطق الرسمي باسم الطلبة التونسيين
- الشعار: نضال، استقلالية، صمود، ديمقراطية
- التوجيه الجامعي 2026: النتائج النهائية تعلن في 12 أوت 2026

=== تعليمات ===
1. أجب بالعربية الفصحى أو التونسية المفهومة
2. اعتمد أساساً على الأسئلة الشائعة المذكورة أعلاه
3. لا تُنشئ معلومات رسمية (تواريخ، أرقام) من تلقاء نفسك
4. إذا لم تكن متأكداً، وجه المستخدم لنموذج التواصل المباشر
5. كن مهذباً ومهنياً`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        { role: 'user', content: messages[messages.length - 1].content }
      ],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : 'عذراً، لم أتمكن من الرد.';
    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'حدث خطأ. حاول لاحقاً.' }, { status: 500 });
  }
}
