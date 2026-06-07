import React, { useState } from 'react';
import { 
  ArrowRight, ShieldAlert, CheckCircle2, AlertTriangle, Activity,
  Calendar, Users, FileText, Banknote, Shield, CheckSquare, 
  MapPin, Clock, Camera, MessageSquare, Bot, FolderKanban,
  Target, TrendingUp, TrendingDown, DollarSign, Download, Maximize2,
  AlertCircle, Briefcase, Zap, Building, Crosshair, BarChart3, ListTodo, Paperclip
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';

interface ProjectCommandCenterProps {
  project: any;
  onClose: () => void;
}

const mockTasks = [
  { id: 'T-01', name: 'توريد وتركيب خوادم البيانات', assignee: 'أحمد محمود', status: 'In Progress', priority: 'High', dueDate: '2024-07-15', progress: 65 },
  { id: 'T-02', name: 'تمديد كابلات الألياف الضوئية', assignee: 'فريق الميدان أ', status: 'Completed', priority: 'High', dueDate: '2024-06-25', progress: 100 },
  { id: 'T-03', name: 'مزامنة قواعد البيانات', assignee: 'سعد العبدالله', status: 'Delayed', priority: 'Medium', dueDate: '2024-07-01', progress: 20 },
  { id: 'T-04', name: 'اختبار الاختراق', assignee: 'قسم الأمن السيبراني', status: 'Not Started', priority: 'Critical', dueDate: '2024-08-01', progress: 0 }
];

const mockFinancialsData = [
  { name: 'يناير', planned: 50000, actual: 48000 },
  { name: 'فبراير', planned: 80000, actual: 85000 },
  { name: 'مارس', planned: 120000, actual: 110000 },
  { name: 'أبريل', planned: 180000, actual: 195000 },
  { name: 'مايو', planned: 250000, actual: 240000 },
];

export function ProjectCommandCenter({ project, onClose }: ProjectCommandCenterProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Extend project with command center details
  const extendedProject = {
    ...project,
    number: `PRJ-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    category: 'بنية تحتية وأنظمة أمنية',
    startDate: '2024-01-15',
    expectedCompletion: '2024-11-30',
    contractValue: '2,500,000 ر.س',
    priority: 'عالية (حرجة)',
    healthScore: 'Good', // Excellent, Good, Warning, Critical
  };

  const tabs = [
    { id: 'dashboard', label: 'لوحة القيادة التنفيذية', icon: <Activity size={16} /> },
    { id: 'timeline', label: 'الجدول الزمني والمهام', icon: <Calendar size={16} /> },
    { id: 'financials', label: 'المالية والمخاطر', icon: <Banknote size={16} /> },
    { id: 'team', label: 'الفريق والزيارات', icon: <Users size={16} /> },
    { id: 'documents', label: 'مركز الوثائق والمعرض', icon: <FolderKanban size={16} /> },
    { id: 'ai', label: 'المساعد الذكي (AI)', icon: <Bot size={16} /> },
  ];

  return (
    <div className="absolute inset-0 z-50 bg-[#F8FAFC] dark:bg-[#0B1121] flex flex-col h-full animate-in fade-in zoom-in-95 duration-300">
      {/* Header Bar */}
      <div className="flex-shrink-0 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F172A] px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors text-slate-700 dark:text-white"
          >
            <ArrowRight size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 font-mono">
                {extendedProject.number}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                extendedProject.healthScore === 'Excellent' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                extendedProject.healthScore === 'Good' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                extendedProject.healthScore === 'Warning' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
              }`}>
                الحالة الصحية: {extendedProject.healthScore}
              </span>
            </div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Crosshair className="text-indigo-500" size={24} />
              مركز قيادة المشروع: {extendedProject.name}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="text-left hidden md:block" dir="ltr">
             <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-0.5">قيمة العقد</div>
             <div className="text-lg font-black text-slate-900 dark:text-white">{extendedProject.contractValue}</div>
           </div>
           <div className="h-10 w-px bg-slate-200 dark:bg-white/10 hidden md:block mx-2"></div>
           <div className="text-left hidden md:block line-clamp-1" dir="ltr">
             <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-0.5">مدير المشروع</div>
             <div className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 justify-end">
                {extendedProject.manager} <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(extendedProject.manager)}&background=6366f1&color=fff`} className="w-5 h-5 rounded-full" alt="PM" />
             </div>
           </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-white/10 px-6 hide-scrollbar overflow-x-auto">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id 
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-400' 
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
           
          {activeTab === 'dashboard' && (
            <DashboardTab project={extendedProject} />
          )}

          {activeTab === 'timeline' && (
            <TimelineTab project={extendedProject} />
          )}

          {activeTab === 'financials' && (
            <FinancialsTab project={extendedProject} />
          )}

          {activeTab === 'ai' && (
            <AIAssistantTab project={extendedProject} />
          )}
          
          {/* Implement other tabs as needed or just show a placeholder */}
          {activeTab === 'team' && (
             <TeamTab />
          )}
          
          {activeTab === 'documents' && (
             <DocumentsTab />
          )}

        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Tab Components
// ---------------------------------------------------------

function TeamTab() {
  const teamMembers = [
    { name: 'م. خالد أحمد', role: 'مدير المشروع', status: 'متاح', target: '95%', tasks: 12 },
    { name: 'م. سارة اليوسف', role: 'مهندس اتصالات رئيسي', status: 'متاح', target: '90%', tasks: 8 },
    { name: 'فريق الميدان أ', role: 'تنفيذ وتركيب', status: 'في الموقع', target: '85%', tasks: 5 },
    { name: 'فريق الميدان ب', role: 'تنفيذ وتركيب', status: 'متاح', target: '88%', tasks: 3 },
    { name: 'ياسر القحطاني', role: 'مشرف سلامة', status: 'متاح', target: '100%', tasks: 2 }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
       <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
               <Users className="text-indigo-500" /> فريق المشروع
             </h2>
             <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors">
                تعيين عضو +
             </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {teamMembers.map((member, i) => (
                <div key={i} className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 p-5 rounded-2xl flex items-start gap-4 hover:border-indigo-500/50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex-shrink-0 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`} alt={member.name} />
                  </div>
                  <div className="flex-1">
                     <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">{member.name}</h3>
                     <p className="text-xs text-slate-500 mb-2">{member.role}</p>
                     
                     <div className="flex items-center justify-between text-[10px] mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
                        <div>
                          <span className="text-slate-400 block mb-0.5">الحالة</span>
                          <span className={`font-bold ${member.status === 'متاح' ? 'text-emerald-500' : 'text-amber-500'}`}>{member.status}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block mb-0.5">المهام النشطة</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">{member.tasks} مهام</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block mb-0.5">مؤشر الأداء</span>
                          <span className="font-bold text-indigo-500" dir="ltr">{member.target}</span>
                        </div>
                     </div>
                  </div>
                </div>
             ))}
          </div>
       </div>

       <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm p-6 overflow-hidden">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mb-6">
            <MapPin className="text-emerald-500" /> سجل الزيارات الميدانية
          </h2>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
             {[
               { date: 'اليوم', eng: 'م. خالد أحمد', purpose: 'استلام الموقع والفحص المبدئي', notes: 'تم التأكد من استلام كامل المساحات المتفق عليها جاهزة لبدء التنفيذ.' },
               { date: 'أمس', eng: 'م. سارة اليوسف', purpose: 'ترسيم مسارات الكابلات', notes: 'يوجد عائق في المسار الشمالي يحتاج إلى إذن حفر جديد.' }
             ].map((visit, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#1E293B] bg-emerald-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                     <CheckCircle2 size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 shadow-sm">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{visit.date}</span>
                        <span className="text-[10px] bg-white dark:bg-[#0F172A] px-2 py-1 rounded-md text-slate-500">{visit.eng}</span>
                     </div>
                     <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{visit.purpose}</h4>
                     <p className="text-xs text-slate-600 dark:text-slate-400">{visit.notes}</p>
                     
                     <div className="mt-3 flex gap-2">
                        <div className="w-12 h-8 bg-slate-200 dark:bg-slate-700 rounded overflow-hidden">
                           <img src="https://images.unsplash.com/photo-1541888086225-ee82fb0127f8?auto=format&fit=crop&q=80&w=150" alt="site" className="w-full h-full object-cover opacity-50" />
                        </div>
                     </div>
                  </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  )
}

function DocumentsTab() {
  const categories = [
    { name: 'العقود والملاحق', count: 3, icon: <FileText size={20} /> },
    { name: 'المخططات الهندسية', count: 12, icon: <MapPin size={20} /> },
    { name: 'الفواتير والماليات', count: 7, icon: <Banknote size={20} /> },
    { name: 'تقارير الإنجاز', count: 5, icon: <Activity size={20} /> }
  ];

  const files = [
    { name: 'عقد_التوريد_والتركيب_ريال.pdf', size: '2.4 MB', date: '2024-01-10', cat: 'العقود والملاحق' },
    { name: 'مخطط_شبكة_الألياف_V2.dwg', size: '15.6 MB', date: '2024-02-15', cat: 'المخططات الهندسية' },
    { name: 'فاتورة_الدفعة_الأولى_معتمدة.pdf', size: '1.1 MB', date: '2024-03-01', cat: 'الفواتير والماليات' },
    { name: 'تقرير_إنجاز_الشهر_الأول.docx', size: '3.2 MB', date: '2024-03-05', cat: 'تقارير الإنجاز' }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex gap-6 flex-col md:flex-row">
       <div className="w-full md:w-64 shrink-0 space-y-2">
         <h3 className="text-xs font-bold text-slate-500 mb-4 px-2">تصنيفات المجلدات</h3>
         {categories.map((c, i) => (
           <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-300 group">
              <div className="flex items-center gap-3">
                 <div className="text-slate-400 group-hover:text-indigo-500 transition-colors">{c.icon}</div>
                 <span className="text-sm font-semibold">{c.name}</span>
              </div>
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded text-slate-500">{c.count}</span>
           </button>
         ))}
       </div>

       <div className="flex-1 bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
               <FolderKanban className="text-indigo-500" /> كافة الملفات
             </h2>
             <div className="flex gap-2">
                <button className="bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors">
                  فرز
                </button>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
                  <Paperclip size={14} /> رفع ملف
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {files.map((file, i) => (
               <div key={i} className="flex items-start gap-4 p-4 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
                 <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <FileText size={24} />
                 </div>
                 <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate mb-1" dir="ltr" style={{ textAlign: 'right' }}>{file.name}</h4>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                       <span>{file.size}</span>
                       <span>•</span>
                       <span>{file.date}</span>
                       <span>•</span>
                       <span className="font-sans text-indigo-500">{file.cat}</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors">
                      <Download size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors">
                      <Maximize2 size={16} />
                    </button>
                 </div>
               </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/10">
             <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
               <Camera className="text-slate-500" size={18} /> معرض الصور الميدانية
             </h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "https://images.unsplash.com/photo-1541888086225-ee82fb0127f8?auto=format&fit=crop&q=80&w=300",
                  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=300",
                  "https://images.unsplash.com/photo-1580983546086-7a7102e3b2b4?auto=format&fit=crop&q=80&w=300",
                  "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=300"
                ].map((src, i) => (
                  <div key={i} className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden group relative cursor-pointer">
                    <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Maximize2 size={24} className="text-white" />
                    </div>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  )
}

function DashboardTab({ project }: { project: any }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-indigo-500/20"></div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Activity size={20} />
            </div>
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300">نسبة الإنجاز</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{project.progress}%</span>
            <span className="text-sm font-semibold text-emerald-500 mb-1 flex items-center"><TrendingUp size={14} className="mr-0.5"/> 5% أعلى من المخطط</span>
          </div>
          <div className="mt-4 w-full h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${project.progress}%` }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg">
              <AlertTriangle size={20} />
            </div>
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300">تنبيهات وتأخيرات</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-amber-600 dark:text-amber-400">3</span>
            <span className="text-sm font-semibold text-slate-500 mb-1">مهام متأخرة</span>
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300">مؤشر رضا العميل</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">9.4</span>
            <span className="text-sm font-semibold text-slate-500 mb-1">/ 10</span>
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-lg">
              <ShieldAlert size={20} />
            </div>
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300">مخاطر المشروع</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-rose-600 dark:text-rose-400">1</span>
            <span className="text-sm font-semibold text-slate-500 mb-1">خطر عالي</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Project Lifecycle Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm p-6 overflow-hidden relative">
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Briefcase className="text-slate-400" /> الملخص التنفيذي
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
               <div>
                 <p className="text-xs text-slate-500 font-bold mb-1">العميل</p>
                 <p className="font-semibold text-slate-900 dark:text-white">{project.client}</p>
               </div>
               <div>
                 <p className="text-xs text-slate-500 font-bold mb-1">التصنيف</p>
                 <p className="font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded inline-block text-xs">{project.category}</p>
               </div>
               <div>
                 <p className="text-xs text-slate-500 font-bold mb-1">الموقع</p>
                 <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1"><MapPin size={14}/> المنطقة الشرقية</p>
               </div>
               <div>
                 <p className="text-xs text-slate-500 font-bold mb-1">تاريخ البدء</p>
                 <p className="font-semibold text-slate-900 dark:text-white font-mono">{project.startDate}</p>
               </div>
               <div>
                 <p className="text-xs text-slate-500 font-bold mb-1">تاريخ الانتهاء المتوقع</p>
                 <p className="font-semibold text-slate-900 dark:text-white font-mono">{project.expectedCompletion}</p>
               </div>
               <div>
                 <p className="text-xs text-slate-500 font-bold mb-1">الأولوية</p>
                 <p className="font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded inline-block text-xs">{project.priority}</p>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10">
               <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">دورة حياة المشروع (Project Lifecycle)</h3>
               <div className="flex justify-between items-center relative z-0 hide-scrollbar overflow-x-auto pb-4">
                  <div className="absolute top-4 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 -z-10 mx-6"></div>
                  
                  {['العطاء', 'توقيع العقد', 'التخطيط', 'التوريد', 'التنفيذ الميداني', 'الفحص والاستلام', 'التسليم', 'الصيانة'].map((stage, idx) => {
                    const isCompleted = idx < 4;
                    const isCurrent = idx === 4;
                    return (
                      <div key={idx} className="flex flex-col items-center min-w-[80px] gap-2">
                        <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all ${
                          isCompleted ? 'bg-emerald-500 border-emerald-100 dark:border-emerald-900 text-white' :
                          isCurrent ? 'bg-indigo-600 border-indigo-100 dark:border-indigo-900 text-white ring-4 ring-indigo-500/30' :
                          'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                        }`}>
                          {isCompleted ? <CheckCircle2 size={16} /> : (idx + 1)}
                        </div>
                        <span className={`text-[10px] font-bold text-center ${isCurrent ? 'text-indigo-600 dark:text-indigo-400' : isCompleted ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400'}`}>{stage}</span>
                      </div>
                    )
                  })}
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 rounded-2xl p-6 relative overflow-hidden flex items-center justify-between shadow-lg isolate">
              <div className="absolute top-0 right-0 right-0 transform translate-x-1/3 -translate-y-1/3 text-white/5">
                <Target size={120} />
              </div>
              <div>
                <h3 className="text-white/70 text-sm font-bold mb-1">أبرز الإنجازات (هذا الأسبوع)</h3>
                <p className="text-white font-semibold text-lg max-w-[200px] leading-snug">إتمام توريد جميع الخوادم والكابلات إلى موقع الأحساء</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-emerald-400 border border-white/10 shrink-0">
                <CheckSquare size={24} />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 relative overflow-hidden flex items-center justify-between shadow-lg isolate">
               <div className="absolute top-0 right-0 right-0 transform translate-x-1/3 -translate-y-1/3 text-white/5">
                <AlertCircle size={120} />
              </div>
              <div>
                <h3 className="text-white/70 text-sm font-bold mb-1">التحدي الحالي</h3>
                <p className="text-white font-semibold text-lg max-w-[200px] leading-snug">تأخر في استخراج تصاريح الحفر للمنطقة ج</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-amber-300 border border-white/10 shrink-0">
                <ShieldAlert size={24} />
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar panels */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm p-6 line-clamp-1">
              <h3 className="text-sm font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="text-amber-500" size={16} /> الإجراءات السريعة
              </h3>
              <div className="space-y-2">
                 <button className="w-full text-right p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-indigo-500/50 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center justify-between group">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">إضافة ملاحظة ميدانية</span>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-indigo-500 transition-transform -translate-x-2 group-hover:translate-x-0" />
                 </button>
                 <button className="w-full text-right p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-indigo-500/50 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center justify-between group">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">تسجيل زيارة موقع</span>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-indigo-500 transition-transform -translate-x-2 group-hover:translate-x-0" />
                 </button>
                 <button className="w-full text-right p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-indigo-500/50 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center justify-between group">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">طلب اعتماد مالي</span>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-indigo-500 transition-transform -translate-x-2 group-hover:translate-x-0" />
                 </button>
                 <button className="w-full text-right p-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 mt-2 shadow-lg shadow-indigo-500/20">
                    <Download size={16} /> تصدير تقرير الإنجاز
                 </button>
              </div>
           </div>

           <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm p-6">
              <h3 className="text-sm font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="text-blue-500" size={16} /> آخر الوثائق (Recent Documents)
              </h3>
              <div className="space-y-3">
                 {[
                   { name: 'مخططات الشبكة المعتمدة.pdf', date: 'اليوم، 10:00 ص', type: 'drawings' },
                   { name: 'تقرير الزيارة الميدانية.docx', date: 'أمس', type: 'reports' },
                   { name: 'فاتورة الدفعة الأولى.pdf', date: '2024-05-20', type: 'invoices' }
                 ].map((doc, i) => (
                   <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-100 dark:hover:border-white/5">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        {doc.type === 'drawings' && <MapPin size={18} />}
                        {doc.type === 'reports' && <FileText size={18} />}
                        {doc.type === 'invoices' && <Banknote size={18} />}
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{doc.name}</p>
                         <p className="text-[10px] text-slate-500 mt-0.5">{doc.date}</p>
                      </div>
                      <button className="text-slate-400 hover:text-indigo-500 transition-colors p-1">
                        <Download size={14} />
                      </button>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function TimelineTab({ project }: { project: any }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
             <ListTodo className="text-indigo-500" /> إدارة المهام
           </h2>
           <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors">
              إضافة مهمة جديدة +
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-xs font-bold text-slate-500 dark:text-slate-400">
                <th className="p-4 bg-slate-50 dark:bg-white/5 rounded-tr-xl">المهمة</th>
                <th className="p-4 bg-slate-50 dark:bg-white/5">المسؤول</th>
                <th className="p-4 bg-slate-50 dark:bg-white/5">الحالة</th>
                <th className="p-4 bg-slate-50 dark:bg-white/5">تاريخ الاستحقاق</th>
                <th className="p-4 bg-slate-50 dark:bg-white/5">الإنجاز</th>
                <th className="p-4 bg-slate-50 dark:bg-white/5 rounded-tl-xl text-left">الأولوية</th>
              </tr>
            </thead>
            <tbody>
              {mockTasks.map((task) => (
                <tr key={task.id} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400">{task.id}</span>
                      <span className="font-semibold text-sm text-slate-900 dark:text-white">{task.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
                     <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                           <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(task.assignee)}&background=random`} alt="User" />
                        </div>
                        {task.assignee}
                     </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      task.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                      task.status === 'Delayed' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' :
                      'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300'
                    }`}>
                      {task.status === 'In Progress' ? 'قيد التنفيذ' : task.status === 'Completed' ? 'مكتمل' : task.status === 'Delayed' ? 'متأخر' : 'لم يبدأ'}
                    </span>
                  </td>
                  <td className="p-4 text-xs font-mono text-slate-600 dark:text-slate-400" dir="ltr">{task.dueDate}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                       <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-8">{task.progress}%</span>
                       <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${task.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: `${task.progress}%` }}></div>
                       </div>
                    </div>
                  </td>
                  <td className="p-4 text-left">
                    <span className={`px-2 py-0.5 border rounded text-[10px] font-bold ${
                      task.priority === 'Critical' ? 'border-red-500 text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400' :
                      task.priority === 'High' ? 'border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400' :
                      'border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400'
                    }`}>
                      {task.priority === 'Critical' ? 'حرج' : task.priority === 'High' ? 'عالي' : 'متوسط'}
                    </span>
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

function FinancialsTab({ project }: { project: any }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <div className="bg-white dark:bg-[#1E293B] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm border-l-4 border-l-indigo-500">
             <div className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-1">إجمالي قيمة العقد</div>
             <div className="text-2xl font-black text-slate-900 dark:text-white" dir="ltr">2,500,000 <span className="text-sm font-semibold">SAR</span></div>
           </div>
           <div className="bg-white dark:bg-[#1E293B] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm border-l-4 border-l-emerald-500">
             <div className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-1">المبالغ المحصلة (Paid)</div>
             <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400" dir="ltr">1,250,000 <span className="text-sm font-semibold">SAR</span></div>
             <div className="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 inline-block rounded mt-1">50% من الإجمالي</div>
           </div>
           <div className="bg-white dark:bg-[#1E293B] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm border-l-4 border-l-amber-500">
             <div className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-1">المبالغ المتبقية (Pending)</div>
             <div className="text-2xl font-black text-amber-600 dark:text-amber-400" dir="ltr">1,250,000 <span className="text-sm font-semibold">SAR</span></div>
           </div>
           <div className="bg-white dark:bg-[#1E293B] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm border-l-4 border-l-rose-500">
             <div className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-1">التكاليف (Costs)</div>
             <div className="text-2xl font-black text-rose-600 dark:text-rose-400" dir="ltr">780,000 <span className="text-sm font-semibold">SAR</span></div>
             <div className="text-[10px] text-rose-600 bg-rose-50 dark:bg-rose-500/10 px-2 inline-block rounded mt-1">أقل 10% من المخطط</div>
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm p-6 line-clamp-1">
             <h3 className="text-sm font-black text-slate-900 dark:text-white mb-6">مخطط التدفق المالي (Cash Flow)</h3>
             <div className="h-[300px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockFinancialsData}>
                    <defs>
                      <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `${val/1000}k`} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(value) => [`${value} SAR`, '']}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
                    <Area type="monotone" dataKey="planned" name="المخطط" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorPlanned)" />
                    <Area type="monotone" dataKey="actual" name="الفعلي" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm p-6 overflow-hidden">
             <h3 className="text-sm font-black text-slate-900 dark:text-white mb-6">سجل المخاطر (Risk Register)</h3>
             <div className="space-y-4">
                {[
                  { id: 'RSK-01', name: 'تأخير استلام تصاريح الحفر من البلدية', type: 'Operational', severity: 'High', status: 'Active' },
                  { id: 'RSK-02', name: 'زيادة أسعار المواد الخام بسبب التضخم', type: 'Financial', severity: 'Medium', status: 'Mitigated' },
                  { id: 'RSK-03', name: 'نقص العمالة المتخصصة لتركيب الألياف', type: 'Resource', severity: 'Medium', status: 'Active' },
                ].map((risk, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex items-start justify-between">
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                         <span className="text-[10px] font-mono text-slate-400">{risk.id}</span>
                         <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                           risk.severity === 'High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400' :
                           'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                         }`}>{risk.severity}</span>
                       </div>
                       <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{risk.name}</h4>
                       <p className="text-xs text-slate-500 mt-1">التصنيف: {risk.type}</p>
                     </div>
                     <div>
                        <span className={`text-xs font-bold flex items-center gap-1 ${risk.status === 'Active' ? 'text-rose-500' : 'text-emerald-500'}`}>
                          {risk.status === 'Active' ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                          {risk.status === 'Active' ? 'نشط' : 'تمت المعالجة'}
                        </span>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  )
}

function AIAssistantTab({ project }: { project: any }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center justify-center h-[600px]">
       <div className="w-full max-w-2xl bg-white dark:bg-[#1E293B] rounded-3xl border border-slate-200 dark:border-indigo-500/30 shadow-2xl p-8 text-center relative overflow-hidden isolate">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 mx-auto flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/30">
            <Bot size={40} className="animate-pulse" />
          </div>
          
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">مساعد الذكاء الاصطناعي للمشروع</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
            مساعدك التنفيذي مجهز لتحليل المخاطر، صياغة تقارير التقدم، ومراجعة وثائق المشروع بالكامل.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8 text-right">
             <button className="p-4 rounded-xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors group">
               <Activity className="text-indigo-500 mb-2" size={20} />
               <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">صياغة تقرير الحالة</h4>
               <p className="text-xs text-slate-500">إنشاء تقرير احترافي للعميل يلخص الإنجازات</p>
             </button>
             <button className="p-4 rounded-xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors group">
               <ShieldAlert className="text-amber-500 mb-2" size={20} />
               <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">تحليل تأخير المهام</h4>
               <p className="text-xs text-slate-500">تحليل الأسباب الجذرية وراء المهام المتأخرة</p>
             </button>
             <button className="p-4 rounded-xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors group">
               <Banknote className="text-emerald-500 mb-2" size={20} />
               <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">توقع التدفق المالي</h4>
               <p className="text-xs text-slate-500">قراءة متقدمة لمعدل الصرف الشهري المتبقي</p>
             </button>
             <button className="p-4 rounded-xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors group">
               <FileText className="text-blue-500 mb-2" size={20} />
               <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">تلخيص العقود</h4>
               <p className="text-xs text-slate-500">استخراج البنود الحرجة من مرفقات العقود</p>
             </button>
          </div>

          <div className="relative">
             <input type="text" placeholder="اطرح سؤالاً حول بيانات هذا المشروع..." className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-4 pr-4 pl-14 text-sm focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white" />
             <button className="absolute left-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 flex items-center justify-center transition-colors">
               <ArrowRight size={18} className="transform rotate-180" />
             </button>
          </div>
       </div>
    </div>
  )
}
