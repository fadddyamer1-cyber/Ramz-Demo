import React, { useState } from 'react';
import { Bot, Send, Sparkles, Database, FileBarChart, Search } from 'lucide-react';

export function RamzAIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'أهلاً بك في المساعد الذكي لنظام رمز (RAMZ AI). أنا مطلع على جميع بيانات النظام، المشاريع، المبيعات والموارد البشرية. كيف يمكنني مساعدتك اليوم يا مدير؟' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsgs = [...messages, { role: 'user', content: input }];
    setMessages(newMsgs);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMsgs, { 
        role: 'ai', 
        content: 'بناءً على طلبك، قمت بتحليل بيانات الربع الحالي. إيرادات قسم (مكافحة الحريق) ارتفعت بنسبة 15% مقارنة بالربع السابق. وهناك 3 عقود صيانة مهمة تقترب من موعد الانتهاء (مستشفى السلام، أبراج المستقبل). هل ترغب في إنشاء تقرير مفصل بصيغة PDF؟' 
      }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden animate-in zoom-in-95 duration-500">
      
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-transparent border-t-4 border-t-teal-500">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-teal-500/20 flex items-center justify-center text-amber-600 dark:text-teal-400 border dark:border-teal-500/30">
          <Bot size={28} />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">RAMZ AI</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">مساعد الإدارة التنفيذية المدعوم بالذكاء الاصطناعي</p>
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="p-4 bg-slate-50/50 dark:bg-transparent flex gap-2 overflow-x-auto border-b border-slate-100 dark:border-white/10">
        <SuggestButton icon={<FileBarChart size={14}/>}>لخص أداء المبيعات هذا الشهر</SuggestButton>
        <SuggestButton icon={<Search size={14}/>}>ابحث عن عرض سعر مستشفى السلام</SuggestButton>
        <SuggestButton icon={<Database size={14}/>}>من هم الموظفين القريبة انتهاء إقاماتهم؟</SuggestButton>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:bg-none bg-slate-50/50 dark:bg-transparent">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center ${
              msg.role === 'ai' 
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' 
                : 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
            }`}>
              {msg.role === 'ai' ? <Sparkles size={20} /> : <span className="font-bold">أنـت</span>}
            </div>
            
            <div className={`max-w-[80%] rounded-2xl p-4 leading-relaxed ${
              msg.role === 'ai'
                ? 'bg-white dark:bg-white/5 border border-slate-200 dark:border-teal-500/30 text-slate-700 dark:text-white/80 shadow-sm'
                : 'bg-slate-800 dark:bg-teal-600 text-white font-medium'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-transparent border-t border-slate-200 dark:border-white/10">
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="اسأل RAMZ AI أي سؤال عن العمليات، المبيعات، أو الموظفين..."
            className="w-full bg-slate-100 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-2xl py-4 pr-6 pl-14 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 focus:ring-2 focus:ring-teal-500 outline-none text-base transition-all"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="absolute left-2 top-2 bottom-2 aspect-square bg-amber-500 hover:bg-amber-600 dark:bg-teal-600 dark:hover:bg-teal-500 disabled:bg-slate-300 dark:disabled:bg-white/10 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors shadow-md"
          >
            <Send size={20} className="-ml-1" />
          </button>
        </form>
      </div>

    </div>
  );
}

function SuggestButton({ children, icon }: any) {
  return (
    <button className="flex items-center gap-2 whitespace-nowrap px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-xs font-bold text-slate-600 dark:text-white/60 hover:border-amber-500 dark:hover:border-teal-500 dark:hover:text-teal-400 transition-colors">
      {icon}
      {children}
    </button>
  );
}
