import React from 'react';
import { FileText, Search, Plus, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react';

const mockQuotations = [
  { id: 'QT-2024-089', customer: 'شركة المقاولات المتحدة', project: 'توريد وتركيب نظام إنذار مبكر', amount: '240,000 ﷼', date: '2024-05-15', status: 'Approved' },
  { id: 'QT-2024-090', customer: 'أبراج المستقبل', project: 'صيانة سنوية للكاميرات', amount: '85,000 ﷼', date: '2024-05-16', status: 'Pending Approval' },
  { id: 'QT-2024-091', customer: 'مستشفى السلام الطبي', project: 'تركيب شبكة مراقبة IP', amount: '1,200,000 ﷼', date: '2024-05-18', status: 'Draft' },
  { id: 'QT-2024-092', customer: 'مدارس الرواد', project: 'مضخات إطفاء', amount: '120,000 ﷼', date: '2024-05-19', status: 'Sent' },
  { id: 'QT-2024-093', customer: 'فندق النخيل الرياض', project: 'تمديد كابلات شبكية', amount: '45,000 ﷼', date: '2024-05-20', status: 'Rejected' },
];

export function QuotationsView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            إدارة عروض الأسعار
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            إنشاء، اعتماد، وإرسال عروض الأسعار للعملاء
          </p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-colors">
          <Plus size={20} />
          <span>إنشاء عرض سعر</span>
        </button>
      </div>

      <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col flex-1 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-transparent">
           <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="text-slate-400" size={18} />
            </div>
            <input 
              type="text" 
              placeholder="رقم العرض أو اسم العميل..." 
              className="block w-full rounded-xl border-0 py-2 pr-10 pl-4 text-slate-900 dark:text-white bg-white dark:bg-white/5 shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
              <Filter size={18} />
            </button>
             <button className="p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
              <Download size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 text-sm border-b border-slate-200 dark:border-white/10">
                <th className="p-4 font-bold">رقم العرض</th>
                <th className="p-4 font-bold">العميل</th>
                <th className="p-4 font-bold">المشروع</th>
                <th className="p-4 font-bold">القيمة (ريال)</th>
                <th className="p-4 font-bold">التاريخ</th>
                <th className="p-4 font-bold">الحالة</th>
                <th className="p-4 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10 text-sm">
              {mockQuotations.map((qt) => (
                <tr key={qt.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-4 font-medium text-slate-900 dark:text-white" dir="ltr">{qt.id}</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300 font-bold">{qt.customer}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{qt.project}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white" dir="ltr">{qt.amount}</td>
                  <td className="p-4 text-slate-500">{qt.date}</td>
                  <td className="p-4">
                    <StatusBadge status={qt.status} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors" title="استعراض">
                        <Eye size={18} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-amber-500 transition-colors" title="تحرير">
                        <Edit size={18} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-teal-500 transition-colors" title="تحميل PDF">
                        <FileText size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: Record<string, { label: string, color: string }> = {
    'Draft': { label: 'مسودة', color: 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white/60' },
    'Pending Approval': { label: 'بانتظار الاعتماد', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800' },
    'Sent': { label: 'تم الإرسال', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800' },
    'Approved': { label: 'معتمد', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' },
    'Rejected': { label: 'مرفوض', color: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400 border border-red-200 dark:border-red-800' }
  };

  const conf = configs[status];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold leading-5 ${conf.color}`}>
      {conf.label}
    </span>
  );
}
