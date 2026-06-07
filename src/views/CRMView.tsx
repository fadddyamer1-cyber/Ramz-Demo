import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Phone, Mail, Building, MapPin, Users } from 'lucide-react';

const mockLeads = [
  { id: '1', name: 'شركة المقاولات المتحدة', contact: 'أحمد محمود', phone: '0501234567', status: 'جديد', value: '450,000 ﷼', priority: 'عالي', category: 'مكافحة حريق' },
  { id: '2', name: 'أبراج المستقبل', contact: 'سالم الدوسري', phone: '0559876543', status: 'في المفاوضات', value: '1,200,000 ﷼', priority: 'عالي', category: 'كاميرات وإنذار' },
  { id: '3', name: 'فندق النخيل الرياض', contact: 'خالد عبدلله', phone: '0534445555', status: 'تم التواصل', value: '150,000 ﷼', priority: 'متوسط', category: 'عقد صيانة' },
  { id: '4', name: 'مستشفى السلام الطبي', contact: 'د. فيصل', phone: '0598887777', status: 'عرض価格 مقدم', value: '850,000 ﷼', priority: 'عالي', category: 'مشروع متكامل' },
  { id: '5', name: 'مدارس الرواد', contact: 'عمر الفاروق', phone: '0561112222', status: 'جديد', value: '90,000 ﷼', priority: 'منخفض', category: 'تحديث شبكات' },
];

export function CRMView() {
  const [activeTab, setActiveTab] = useState('leads');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            إدارة علاقات العملاء (CRM)
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            إدارة العملاء، الفرص البيعية، والمتابعات
          </p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-colors">
          <Plus size={20} />
          <span>إضافة فرصة جديدة</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800">
        <TabButton active={activeTab === 'leads'} onClick={() => setActiveTab('leads')}>
          الفرص البيعية والمتابعات
        </TabButton>
        <TabButton active={activeTab === 'customers'} onClick={() => setActiveTab('customers')}>
          قاعدة العملاء
        </TabButton>
        <TabButton active={activeTab === 'pipeline'} onClick={() => setActiveTab('pipeline')}>
          مسار المبيعات (Pipeline)
        </TabButton>
      </div>

      {/* Tools Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="text-slate-400" size={18} />
          </div>
          <input 
            type="text" 
            placeholder="البحث في الفرص، العملاء..." 
            className="block w-full rounded-xl border-0 py-2.5 pr-10 pl-4 text-slate-900 dark:text-white bg-white dark:bg-white/5 shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 font-medium">
          <Filter size={18} />
          <span>تصفية متقدمة</span>
        </button>
      </div>

      {/* Contacts List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1 overflow-auto pb-4">
        {mockLeads.map(lead => (
          <ContactCard key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  );
}

function TabButton({ active, children, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-3 font-semibold text-sm transition-colors border-b-2 ${
        active 
          ? 'text-amber-500 border-amber-500' 
          : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-800 dark:hover:text-slate-200'
      }`}
    >
      {children}
    </button>
  );
}

function ContactCard({ lead }: any) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'جديد': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'تم التواصل': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'في المفاوضات': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'عرض سعر مقدم': return 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-slate-400';
    }
  };

  return (
    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group relative flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{lead.name}</h3>
            {lead.priority === 'عالي' && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            )}
          </div>
          <span className={`inline-flex px-2 py-1 rounded-md text-xs font-bold ${getStatusColor(lead.status)}`}>
            {lead.status}
          </span>
        </div>
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="space-y-2.5 mb-6 flex-1">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Users size={16} className="text-slate-400 shrink-0" />
          <span>{lead.contact}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Phone size={16} className="text-slate-400 shrink-0" />
          <span dir="ltr">{lead.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Building size={16} className="text-slate-400 shrink-0" />
          <span>{lead.category}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10">
        <div className="font-black text-amber-600 dark:text-amber-500 text-lg">
          {lead.value}
        </div>
        <button className="text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-white/5 dark:hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
          سجل المتابعة
        </button>
      </div>
    </div>
  );
}
