'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { ExecutiveMember } from '@/types';
import ImageUpload from '@/components/admin/image-upload';

export default function AdminMembersPage() {
  const [members, setMembers] = useState<ExecutiveMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<ExecutiveMember>>({});

  const getAuthHeaders = () => {
    const password = localStorage.getItem('adminPassword');
    return { Authorization: `Bearer ${password}` };
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await fetch('/api/admin/members', {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (error) {
      console.error('Error loading members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setCreating(true);
    setFormData({ name: '', role: '', sector: '', image: '' });
  };

  const handleEdit = (member: ExecutiveMember) => {
    setEditing(member.id);
    setFormData(member);
  };

  const handleSave = async () => {
    try {
      if (creating) {
        const response = await fetch('/api/admin/members', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          await loadMembers();
          setCreating(false);
          setFormData({});
        }
      } else if (editing) {
        const response = await fetch('/api/admin/members', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
          body: JSON.stringify({ id: editing, ...formData }),
        });

        if (response.ok) {
          await loadMembers();
          setEditing(null);
          setFormData({});
        }
      }
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العضو؟')) return;

    try {
      const response = await fetch(`/api/admin/members?id=${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        await loadMembers();
      }
    } catch (error) {
      console.error('Error deleting member:', error);
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
        <h1 className="text-3xl font-bold">إدارة المكتب التنفيذي</h1>
        {!creating && !editing && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-[#c41e3a] text-white px-4 py-2 rounded-lg hover:bg-[#a01830] transition-colors"
          >
            <Plus size={20} />
            <span>إضافة عضو</span>
          </button>
        )}
      </div>

      {(creating || editing) && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            {creating ? 'إضافة عضو جديد' : 'تحرير العضو'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">الاسم</label>
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
              <label className="block text-sm font-medium mb-2">المنصب</label>
              <input
                type="text"
                value={formData.role || ''}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">القطاع</label>
              <input
                type="text"
                value={formData.sector || ''}
                onChange={(e) =>
                  setFormData({ ...formData, sector: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c41e3a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                رابط الصورة
              </label>
              <ImageUpload
                currentImage={formData.image}
                onImageChange={(url) =>
                  setFormData({ ...formData, image: url })
                }
                folder="members"
                label="صورة العضو"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow p-6">
            {member.image && (
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
            )}
            <h3 className="text-xl font-bold text-center mb-2">
              {member.name}
            </h3>
            <p className="text-center text-gray-600 mb-1">{member.role}</p>
            <p className="text-center text-gray-500 text-sm mb-4">
              {member.sector}
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => handleEdit(member)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDelete(member.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
