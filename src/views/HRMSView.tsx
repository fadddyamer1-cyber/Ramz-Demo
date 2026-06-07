import React from 'react';
import { Users, FileSignature, Briefcase, GraduationCap, MapPin, Phone } from 'lucide-react';

const mockEmployees = [
  { id: 'EMP-001', name: 'ياسر القحطاني', position: 'مهندس سلامة أول', department: 'العمليات', status: 'نشط', residencyExpiry: '12 أشهر' },
  { id: 'EMP-024', name: 'محمد فاروق', position: 'فني صيانة إنذار', department: 'الصيانة', status: 'نشط', residencyExpiry: '2 أشهر - تنبيه' },
  { id: 'EMP-055', name: 'سارة خالد', position: 'أخصائية موارد بشرية', department: 'الإدارة', status: 'إجازة', residencyExpiry: 'مواطن' },
  { id: 'EMP-089', name: 'جون سميث', position: 'مدير مشاريع', department: 'العمليات', status: 'نشط', residencyExpiry: '6 أشهر' },
];

export function HRMSView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            الموارد البشرية (HRMS)
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            إدارة الموظفين، الإقامات، والرواتب
          </p>
        </div>
        <button className="bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold py-2.5 px-5 rounded-xl shadow-lg flex items-center gap-2 transition-colors">
          <Users size={20} />
          <span>إضافة موظف جديد</span>
        </button>
      </div>

       {/* Tabs */}
       <div className="flex gap-4 border-b border-slate-200 dark:border-white/10 overflow-x-auto">
        <TabButton active={true}>سجل الموظفين</TabButton>
        <TabButton active={false}>تتبع الإقامات والعقود</TabButton>
        <TabButton active={false}>مسيرات الرواتب</TabButton>
        <TabButton active={false}>طلبات الإجازة</TabButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockEmployees.map(emp => (
          <EmployeeCard key={emp.id} employee={emp} />
        ))}
      </div>
    </div>
  );
}

function TabButton({ active, children }: any) {
  return (
    <button className={`px-4 py-3 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${
        active 
          ? 'text-slate-900 dark:text-white border-slate-900 dark:border-white' 
          : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-800 dark:hover:text-slate-200'
      }`}>
      {children}
    </button>
  );
}

function EmployeeCard({ employee }: any) {
  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className="absolute top-0 right-0 w-full h-1 bg-amber-500"></div>
      
      <div className="flex justify-between items-start mb-4 mt-2">
        <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center font-bold text-xl text-slate-400">
          {employee.name.charAt(0)}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-md ${
          employee.status === 'نشط' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
        }`}>
          {employee.status}
        </span>
      </div>

      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{employee.name}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{employee.position}</p>

      <div className="space-y-2 text-sm bg-slate-50 dark:bg-transparent p-3 rounded-lg border border-slate-100 dark:border-white/5">
        <div className="flex justify-between">
          <span className="text-slate-500">القسم:</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">{employee.department}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">صلاحية الإقامة:</span>
          <span className={`font-bold ${employee.residencyExpiry.includes('تنبيه') ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}>
            {employee.residencyExpiry}
          </span>
        </div>
      </div>
    </div>
  )
}
