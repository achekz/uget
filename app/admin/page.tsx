'use client';

import { useState, useEffect } from 'react';
import { Newspaper, Users, Building2, HelpCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    news: 0,
    members: 0,
    structures: 0,
    faqs: 0,
  });

  useEffect(() => {
    const savedPassword = localStorage.getItem('adminPassword');
    if (savedPassword) {
      setPassword(savedPassword);
      setIsAuthenticated(true);
      loadStats(savedPassword);
    }
  }, []);

  const loadStats = async (pwd: string) => {
    try {
      const [newsRes, membersRes, structuresRes, faqsRes] = await Promise.all([
        fetch('/api/admin/news', {
          headers: { Authorization: `Bearer ${pwd}` },
        }),
        fetch('/api/admin/members', {
          headers: { Authorization: `Bearer ${pwd}` },
        }),
        fetch('/api/admin/structures', {
          headers: { Authorization: `Bearer ${pwd}` },
        }),
        fetch('/api/admin/faq', {
          headers: { Authorization: `Bearer ${pwd}` },
        }),
      ]);

      if (newsRes.ok && membersRes.ok && structuresRes.ok && faqsRes.ok) {
        const [news, members, structures, faqs] = await Promise.all([
          newsRes.json(),
          membersRes.json(),
          structuresRes.json(),
          faqsRes.json(),
        ]);

        setStats({
          news: news.length,
          members: members.length,
          structures: structures.length,
          faqs: faqs.length,
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/admin/news', {
        headers: { Authorization: `Bearer ${password}` },
      });

      if (response.ok) {
        localStorage.setItem('adminPassword', password);
        setIsAuthenticated(true);
        loadStats(password);
      } else {
        setError('كلمة المرور غير صحيحة');
      }
    } catch (error) {
      setError('حدث خطأ أثناء تسجيل الدخول');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminPassword');
    setPassword('');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-[#c41e3a]">
            لوحة التحكم
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                كلمة المرور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c41e3a] focus:border-transparent"
                placeholder="أدخل كلمة المرور"
                required
              />
            </div>
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-[#c41e3a] text-white py-3 rounded-lg font-medium hover:bg-[#a01830] transition-colors"
            >
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        >
          تسجيل الخروج
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <Newspaper className="text-[#c41e3a]" size={32} />
            <span className="text-3xl font-bold">{stats.news}</span>
          </div>
          <h3 className="text-gray-600">الأخبار</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="text-[#c41e3a]" size={32} />
            <span className="text-3xl font-bold">{stats.members}</span>
          </div>
          <h3 className="text-gray-600">المكتب التنفيذي</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <Building2 className="text-[#c41e3a]" size={32} />
            <span className="text-3xl font-bold">{stats.structures}</span>
          </div>
          <h3 className="text-gray-600">الهياكل الجامعية</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <HelpCircle className="text-[#c41e3a]" size={32} />
            <span className="text-3xl font-bold">{stats.faqs}</span>
          </div>
          <h3 className="text-gray-600">الأسئلة الشائعة</h3>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">مرحباً بك في لوحة التحكم</h2>
        <p className="text-gray-600 mb-4">
          من هنا يمكنك إدارة محتوى موقع الاتحاد العام لطلبة تونس بسهولة.
        </p>
        <div className="space-y-2 text-sm text-gray-600">
          <p>📰 <strong>الأخبار:</strong> إضافة وتحرير وحذف الأخبار</p>
          <p>👥 <strong>المكتب التنفيذي:</strong> إدارة أعضاء المكتب التنفيذي</p>
          <p>🏛️ <strong>الهياكل:</strong> إدارة الهياكل الجامعية</p>
          <p>❓ <strong>الأسئلة الشائعة:</strong> إدارة قسم الأسئلة الشائعة</p>
        </div>
      </div>
    </div>
  );
}
