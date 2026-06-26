"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

const QUICK_REPLIES = ["كيف انخرط في الاتحاد؟", "متى نتائج التوجيه؟", "كيف أطلب سكناً جامعياً؟"];

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => {
    const stored = sessionStorage.getItem('uget-chat');
    if (stored) setMessages(JSON.parse(stored));
    else setMessages([{ role: 'assistant', content: 'مرحباً! أنا مساعد الاتحاد العام لطلبة تونس. كيف يمكنني مساعدتك؟' }]);
  }, []);

  useEffect(() => {
    if (messages.length > 0) sessionStorage.setItem('uget-chat', JSON.stringify(messages));
  }, [messages]);

  const send = async (text?: string) => {
    const content = text || input;
    if (!content.trim() || loading) return;
    const next = [...messages, { role: 'user' as const, content }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((m) => [...m, { role: 'assistant', content: data.error || 'عذراً، حدث خطأ. حاول لاحقاً.' }]);
      }
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'عذراً، حدث خطأ. حاول لاحقاً أو تواصل معنا عبر نموذج الاتصال.' }]);
    }
    setLoading(false);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-6 z-50 w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center text-white hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-[#13161f] rounded-2xl shadow-2xl border border-ink/10 dark:border-paper/10 flex flex-col max-h-[70vh]"
          >
            {/* Header */}
            <div className="p-4 border-b border-ink/10 dark:border-paper/10 flex items-center gap-3 bg-white dark:bg-[#13161f] rounded-t-2xl">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-md shadow-primary/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-ink dark:text-paper">مساعد UGET</h3>
                <p className="text-xs text-ink/50 dark:text-paper/50">متصل الآن</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-ink/[0.02] dark:bg-paper/[0.02]">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-sm ${
                    m.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-ink/10 dark:bg-paper/15 text-ink dark:text-paper'
                  }`}>
                    {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-primary text-white rounded-tr-sm'
                      : 'bg-ink/5 dark:bg-paper/10 text-ink dark:text-paper rounded-tl-sm'
                  }`}>
                    {m.content || <span className="animate-pulse">...</span>}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {messages.length < 2 && (
              <div className="px-4 pb-2 pt-1 flex gap-2 flex-wrap bg-white dark:bg-[#13161f]">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="px-3 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary text-xs rounded-full hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-ink/10 dark:border-paper/10 flex gap-2 bg-white dark:bg-[#13161f] rounded-b-2xl">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="اكتب سؤالك..."
                className="flex-1 px-4 py-2 rounded-xl bg-ink/5 dark:bg-paper/10 text-ink dark:text-paper placeholder:text-ink/40 dark:placeholder:text-paper/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                dir="rtl"
              />
              <button
                onClick={() => send()}
                disabled={loading}
                className="p-2 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 shadow-md shadow-primary/20 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
