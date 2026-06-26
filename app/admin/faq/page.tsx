'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { FAQ } from '@/types';

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<FAQ>>({});

  const getAuthHeaders = () => {
    const password = localStorage.getItem('adminPassword');
    return { Authorization: `Bearer ${password}` };
  };

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const response = await fetch('/api/admin/faq', {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setFaqs(data.sort((a: FAQ, b: FAQ) => a.order - b.order));
      }
    } catch (error) {
      console.error('Error loading FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setCreating(true);
    setFormData({
      question: '',
      answer: '',
      category: 'membership',
      language: 'ar',
      order: 999,
    });
  };

  const handleEdit = (faq: FAQ) => {
    setEditing(faq.id);
    setFormData(faq);
  };

  const handleSave = async () => {
    try {
      if (creating) {
        const response = await fetch('/api/admin/faq', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          await loadFAQs();
          setCreating(false);
          setFormData({});
        }
      } else if (editing) {
        const response = await fetch('/api/admin/faq', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
          body: JSON.stringify({ id: editing, ...formData }),
        });

        if (response.ok) {
          await loadFAQs();
          setEditing(null);
          setFormData({});
        }
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا السؤال؟')) return;

    try {
      const response = await fetch(`/api/admin/faq?id=${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        await loadFAQs();
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const handleCancel = () => {
    setCreating(false);
    setEditing(null);
    setFormData({});
  };

  if (loading) {
    return <div className="text-center py-8">جارٍ التحميل...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">إدارة الأسئلة الشائعة</h1>
        {!creating && !editing && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-[#c41e3a] text-white px-4 py-2 rounded-lg hover:bg-[#a01830] transition-colors"
          >
            <Plus size={20} />
            <span>إضافة سؤال</span>
          </button>
        )}
      </div>

      {(creating || editing) && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            {creating ? 'إضافة سؤال جديد' : 'تحرير السؤال'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">السؤال</label>
              <input
                type="text"
                value={formData.question || ''}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الجواب</label>
              <textarea
                value={formData.answer || ''}
                onChange={(e) =>
                  setFormData({ ...formData, answer: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">الفئة</label>
                <select
                  value={formData.category || 'membership'}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
                >
                  <option value="membership">انخراط</option>
                  <option value="orientation">توجيه</option>
                  <option value="housing">سكن</option>
                  <option value="general">عام</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">اللغة</label>
                <select
                  value={formData.language || 'ar'}
                  onChange={(e) =>
                    setFormData({ ...formData, language: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
                >
                  <option value="ar">العربية</option>
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  الترتيب
                </label>
                <input
                  type="number"
                  value={formData.order || 999}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save size={18} />
                <span>حفظ</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                <X size={18} />
                <span>إلغاء</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#c41e3a] text-white text-xs px-2 py-1 rounded">
                    {faq.category}
                  </span>
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                    {faq.language}
                  </span>
                  <span className="text-gray-500 text-xs">
                    ترتيب: {faq.order}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
              <div className="flex gap-2 mr-4">
                <button
                  onClick={() => handleEdit(faq)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
