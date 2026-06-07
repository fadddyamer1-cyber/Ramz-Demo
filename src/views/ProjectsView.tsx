import React from 'react';
import { FolderKanban, CheckCircle2, Clock, Users, Building, Flag, MapPin } from 'lucide-react';

const mockProjects = [
  { id: 'PRJ-001', name: 'توريد وتركيب نظام إطفاء وإنذار', client: 'جامعة الملك سعود', location: 'الرياض', team: 12, progress: 75, status: 'Active', deadline: '2024-09-30' },
  { id: 'PRJ-002', name: 'تحديث شبكة المراقبة المركزية', client: 'مجمع الراشد مول', location: 'الخبر', team: 5, progress: 40, status: 'Active', deadline: '2024-07-15' },
  { id: 'PRJ-003', name: 'تركيب مضخات حريق للمستودعات', client: 'الشركة اللوجستية الوطنية', location: 'جدة', team: 8, progress: 95, status: 'Closing', deadline: '2024-06-10' },
  { id: 'PRJ-004', name: 'عقد صيانة شبكات', client: 'وزارة الصحة', location: 'متعدد', team: 4, progress: 10, status: 'OnHold', deadline: '2025-01-01' },
];

export function ProjectsView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            المشاريع والعمليات
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            إدارة تنفيذ المشاريع، التوريد، والتركيب الميداني
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
            استخراج تقرير
          </button>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-teal-600/20 flex items-center gap-2 transition-colors">
            <PlusIcon />
            <span>مشروع جديد</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 flex-1 overflow-auto pb-4">
        {mockProjects.map(prj => (
          <ProjectCard key={prj.id} project={prj} />
        ))}
      </div>
    </div>
  );
}

function PlusIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
}

function ProjectCard({ project }: any) {
  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col group hover:border-teal-500/30 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-black text-slate-400 bg-slate-100 dark:bg-white/5 dark:text-white/40 px-2 py-1 rounded-md mb-2 block w-max" dir="ltr">
          {project.id}
        </span>
        <ProjectStatus status={project.status} />
      </div>
      
      <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight mb-4 min-h-[44px]">
        {project.name}
      </h3>

      <div className="space-y-3 mb-6 bg-slate-50 dark:bg-transparent p-4 rounded-xl border border-slate-100 dark:border-white/5">
        <div className="flex items-center text-sm">
          <Building className="text-slate-400 shrink-0 ml-2" size={16} />
          <span className="text-slate-700 dark:text-slate-300 font-semibold">{project.client}</span>
        </div>
        <div className="flex items-center text-sm">
          <MapPin className="text-slate-400 shrink-0 ml-2" size={16} />
          <span className="text-slate-600 dark:text-slate-400">{project.location}</span>
        </div>
        <div className="flex items-center text-sm">
           <Flag className="text-slate-400 shrink-0 ml-2" size={16} />
           <span className="text-slate-600 dark:text-slate-400">التسليم: <strong dir="ltr">{project.deadline}</strong></span>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex justify-between items-center mb-1.5 text-sm">
          <span className="font-bold text-slate-700 dark:text-slate-300">نسبة الإنجاز</span>
          <span className="font-black text-teal-600 dark:text-teal-400">{project.progress}%</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-teal-500 h-2.5 rounded-full" 
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Users size={16} />
            <span className="text-sm font-semibold">{project.team} أعضاء</span>
          </div>
          <button className="text-sm font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700">
            التفاصيل
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectStatus({ status }: { status: string }) {
  if (status === 'Active') return <span className="flex items-center gap-1 text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded dark:bg-teal-900/30 dark:text-teal-400"><Clock size={12}/> جاري التنفيذ</span>;
  if (status === 'Closing') return <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded dark:bg-emerald-900/30 dark:text-emerald-400"><CheckCircle2 size={12}/> مرحلة التسليم</span>;
  if (status === 'OnHold') return <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded dark:bg-amber-900/30 dark:text-amber-400"><Clock size={12}/> معلق</span>;
  return null;
}
