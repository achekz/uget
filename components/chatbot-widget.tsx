'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 bg-paper border border-ink/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-primary text-white px-4 py-3 flex items-center justify-between">
            <span className="font-bold">مساعد UGET الذكي</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            <p className="text-sm text-ink/70 text-center mt-16">
              مرحباً! كيف يمكنني مساعدتك اليوم؟
            </p>
          </div>
          <div className="p-3 border-t border-ink/5">
            <input
              type="text"
              placeholder="اكتب رسالتك هنا..."
              className="w-full px-3 py-2 rounded-full border border-ink/10 text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="فتح المحادثة"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  )
}
