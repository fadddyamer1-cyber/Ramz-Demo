import React from 'react';
import { Wrench, CalendarClock, Settings, ClipboardList, PenTool } from 'lucide-react';

const mockRequests = [
  { id: 'MNT-1001', type: 'وقائية', client: 'برج المملكة', system: 'مضخات حريق', priority: 'High', date: '2024-06-10', status: 'Scheduled', technician: 'فريق صيانة أ' },
  { id: 'MNT-1002', type: 'علاجية (طارئة)', client: 'مستشفى الدكتور سليمان', system: 'إنذار مبكر', priority: 'Critical', date: 'اليوم', status: 'In Progress', technician: 'أحمد علي' },
  { id: 'MNT-1003', type: 'دورية', client: 'سيتي سنتر', system: 'كاميرات مراقبة', priority: 'Normal', date: '2024-06-15', status: 'Pending', technician: 'غير محدد' },
];

export function MaintenanceView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            نظام إدارة الصيانة الدورية والطارئة
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            جدولة وتتبع طلبات الصيانة وإدارة الفرق الميدانية
          </p>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-red-500/20 flex items-center gap-2 transition-colors">
          <Wrench size={20} />
          <span>فتح تذكرة صيانة</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-4 rounded-r-lg">
          <p className="text-red-700 dark:text-red-400 text-sm font-bold mb-1">بلاغات طارئة (SLA &lt; 2h)</p>
          <span className="text-2xl font-black text-red-700 dark:text-red-300">4</span>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-4 rounded-r-lg">
          <p className="text-amber-700 dark:text-amber-400 text-sm font-bold mb-1">صيانة وقائية مجدولة</p>
          <span className="text-2xl font-black text-amber-700 dark:text-amber-300">18</span>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <p className="text-blue-700 dark:text-blue-400 text-sm font-bold mb-1">عقود صيانة نشطة</p>
          <span className="text-2xl font-black text-blue-700 dark:text-blue-300">92</span>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/10 border-l-4 border-emerald-500 p-4 rounded-r-lg">
          <p className="text-emerald-700 dark:text-emerald-400 text-sm font-bold mb-1">تمت المعالجة (الشهر)</p>
          <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300">145</span>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col flex-1 overflow-hidden">
         <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-transparent">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white">أوامر العمل الحالية</h3>
         </div>
         <div className="overflow-x-auto flex-1">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 text-sm border-b border-slate-200 dark:border-white/10">
                <th className="p-4 font-bold">رقم التذكرة</th>
                <th className="p-4 font-bold">العميل / الموقع</th>
                <th className="p-4 font-bold">النظام</th>
                <th className="p-4 font-bold">النوع</th>
                <th className="p-4 font-bold">الجدولة</th>
                <th className="p-4 font-bold">الأولوية</th>
                <th className="p-4 font-bold">الـفني</th>
                <th className="p-4 font-bold">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10 text-sm">
              {mockRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-white" dir="ltr">{req.id}</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300 font-bold">{req.client}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{req.system}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400 font-semibold">{req.type}</td>
                  <td className="p-4 font-bold text-slate-500">{req.date}</td>
                  <td className="p-4">
                     <PriorityBadge priority={req.priority} />
                  </td>
                  <td className="p-4">
                     <span className="bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white/80 px-2 py-1 rounded text-xs font-bold">{req.technician}</span>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={req.status} />
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

function PriorityBadge({ priority }: { priority: string }) {
  if (priority === 'Critical') return <span className="text-red-600 dark:text-red-400 font-black flex items-center gap-1"><AlertIcon/> حرج</span>;
  if (priority === 'High') return <span className="text-amber-600 dark:text-amber-400 font-bold">عالي</span>;
  return <span className="text-slate-500 font-bold">عادي</span>;
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'In Progress') return <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-md text-xs font-bold">جاري العمل</span>;
  if (status === 'Scheduled') return <span className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 px-2 py-1 rounded-md text-xs font-bold">مجدول</span>;
  if (status === 'Pending') return <span className="bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white/80 px-2 py-1 rounded-md text-xs font-bold">قيد الانتظار</span>;
  return null;
}

function AlertIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;
}
