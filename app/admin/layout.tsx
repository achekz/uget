import { ReactNode } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  LayoutDashboard, 
  Newspaper, 
  Users, 
  Building2, 
  HelpCircle,
  LogOut 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'لوحة التحكم | UGET Admin',
  description: 'Admin dashboard for UGET website management',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 fixed inset-0 overflow-auto" dir="rtl" style={{ zIndex: 9999 }}>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#c41e3a] text-white min-h-screen fixed right-0 top-0 bottom-0">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-8">لوحة التحكم</h1>
            <nav className="space-y-2">
              <Link
                href="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <LayoutDashboard size={20} />
                <span>الرئيسية</span>
              </Link>
              <Link
                href="/admin/news"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Newspaper size={20} />
                <span>الأخبار</span>
              </Link>
              <Link
                href="/admin/members"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Users size={20} />
                <span>المكتب التنفيذي</span>
              </Link>
              <Link
                href="/admin/structures"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Building2 size={20} />
                <span>الهياكل</span>
              </Link>
              <Link
                href="/admin/faq"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <HelpCircle size={20} />
                <span>الأسئلة الشائعة</span>
              </Link>
              <div className="border-t border-white/20 my-4"></div>
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <LogOut size={20} />
                <span>العودة للموقع</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 mr-64">
          {children}
        </main>
      </div>
    </div>
  );
}
