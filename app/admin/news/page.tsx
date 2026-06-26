'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { NewsPost } from '@/types';
import ImageUpload from '@/components/admin/image-upload';

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<NewsPost>>({});

  const getAuthHeaders = () => {
    const password = localStorage.getItem('adminPassword');
    return { Authorization: `Bearer ${password}` };
  };

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const response = await fetch('/api/admin/news', {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      }
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setCreating(true);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      slug: '',
      image: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleEdit = (post: NewsPost) => {
    setEditing(post.id);
    setFormData(post);
  };

  const handleSave = async () => {
    try {
      if (creating) {
        const response = await fetch('/api/admin/news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          await loadNews();
          setCreating(false);
          setFormData({});
        }
      } else if (editing) {
        const response = await fetch('/api/admin/news', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
          body: JSON.stringify({ id: editing, ...formData }),
        });

        if (response.ok) {
          await loadNews();
          setEditing(null);
          setFormData({});
        }
      }
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الخبر؟')) return;

    try {
      const response = await fetch(`/api/admin/news?id=${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        await loadNews();
      }
    } catch (error) {
      console.error('Error deleting news:', error);
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
        <h1 className="text-3xl font-bold">إدارة الأخبار</h1>
        {!creating && !editing && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-[#c41e3a] text-white px-4 py-2 rounded-lg hover:bg-[#a01830] transition-colors"
          >
            <Plus size={20} />
            <span>إضافة خبر</span>
          </button>
        )}
      </div>

      {(creating || editing) && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            {creating ? 'إضافة خبر جديد' : 'تحرير الخبر'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">العنوان</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                المقتطف (excerpt)
              </label>
              <textarea
                value={formData.excerpt || ''}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                rows={2}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">المحتوى</label>
              <textarea
                value={formData.content || ''}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">الفئة</label>
                <input
                  type="text"
                  value={formData.category || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Slug (رابط الصفحة)
                </label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">التاريخ</label>
              <input
                type="date"
                value={formData.date || ''}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
              />
            </div>

            <div>
              <ImageUpload
                currentImage={formData.image}
                onImageChange={(url) =>
                  setFormData({ ...formData, image: url })
                }
                folder="news"
                label="صورة الخبر"
              />
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-sm font-medium">العنوان</th>
              <th className="px-6 py-3 text-right text-sm font-medium">الفئة</th>
              <th className="px-6 py-3 text-right text-sm font-medium">التاريخ</th>
              <th className="px-6 py-3 text-right text-sm font-medium">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {news.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{post.title}</td>
                <td className="px-6 py-4">{post.category}</td>
                <td className="px-6 py-4">{post.date}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
