'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { UniversityStructure } from '@/types';

export default function AdminStructuresPage() {
  const [structures, setStructures] = useState<UniversityStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<UniversityStructure>>({});

  const getAuthHeaders = () => {
    const password = localStorage.getItem('adminPassword');
    return { Authorization: `Bearer ${password}` };
  };

  useEffect(() => {
    loadStructures();
  }, []);

  const loadStructures = async () => {
    try {
      const response = await fetch('/api/admin/structures', {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setStructures(data);
      }
    } catch (error) {
      console.error('Error loading structures:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setCreating(true);
    setFormData({ name: '', university: '', city: '', email: '', phone: '' });
  };

  const handleEdit = (structure: UniversityStructure) => {
    setEditing(structure.id);
    setFormData(structure);
  };

  const handleSave = async () => {
    try {
      if (creating) {
        const response = await fetch('/api/admin/structures', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          await loadStructures();
          setCreating(false);
          setFormData({});
        }
      } else if (editing) {
        const response = await fetch('/api/admin/structures', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
          body: JSON.stringify({ id: editing, ...formData }),
        });

        if (response.ok) {
          await loadStructures();
          setEditing(null);
          setFormData({});
        }
      }
    } catch (error) {
      console.error('Error saving structure:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الهيكل؟')) return;

    try {
      const response = await fetch(`/api/admin/structures?id=${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        await loadStructures();
      }
    } catch (error) {
      console.error('Error deleting structure:', error);
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
        <h1 className="text-3xl font-bold">إدارة الهياكل الجامعية</h1>
        {!creating && !editing && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-[#c41e3a] text-white px-4 py-2 rounded-lg hover:bg-[#a01830] transition-colors"
          >
            <Plus size={20} />
            <span>إضافة هيكل</span>
          </button>
        )}
      </div>

      {(creating || editing) && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            {creating ? 'إضافة هيكل جديد' : 'تحرير الهيكل'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                اسم الهيكل
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الجامعة</label>
              <input
                type="text"
                value={formData.university || ''}
                onChange={(e) =>
                  setFormData({ ...formData, university: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">المدينة</label>
              <input
                type="text"
                value={formData.city || ''}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الهاتف</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-sm font-medium">
                اسم الهيكل
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium">
                الجامعة
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium">
                المدينة
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium">
                البريد الإلكتروني
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium">
                الهاتف
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {structures.map((structure) => (
              <tr key={structure.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{structure.name}</td>
                <td className="px-6 py-4">{structure.university}</td>
                <td className="px-6 py-4">{structure.city}</td>
                <td className="px-6 py-4">{structure.email}</td>
                <td className="px-6 py-4">{structure.phone}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(structure)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(structure.id)}
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
