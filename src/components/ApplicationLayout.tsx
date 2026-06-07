import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  FolderKanban, 
  Wrench, 
  UserCircle, 
  Bot,
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ExecutiveDashboard } from '../views/ExecutiveDashboard';
import { CRMView } from '../views/CRMView';
import { QuotationsView } from '../views/QuotationsView';
import { ProjectsView } from '../views/ProjectsView';
import { MaintenanceView } from '../views/MaintenanceView';
import { HRMSView } from '../views/HRMSView';
import { RamzAIAssistant } from '../views/RamzAIAssistant';

export function ApplicationLayout() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const menuItems: { id: ViewType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'لوحة القيادة التنفيذية', icon: <LayoutDashboard size={20} /> },
    { id: 'crm', label: 'إدارة علاقات العملاء', icon: <Users size={20} /> },
    { id: 'quotations', label: 'إدارة عروض الأسعار', icon: <FileText size={20} /> },
    { id: 'projects', label: 'إدارة المشاريع', icon: <FolderKanban size={20} /> },
    { id: 'maintenance', label: 'إدارة الصيانة', icon: <Wrench size={20} /> },
    { id: 'hrms', label: 'الموارد البشرية', icon: <UserCircle size={20} /> },
    { id: 'ai', label: 'المساعد الذكي (RAMZ AI)', icon: <Bot size={20} /> },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <ExecutiveDashboard />;
      case 'crm': return <CRMView />;
      case 'quotations': return <QuotationsView />;
      case 'projects': return <ProjectsView />;
      case 'maintenance': return <MaintenanceView />;
      case 'hrms': return <HRMSView />;
      case 'ai': return <RamzAIAssistant />;
      default: return <ExecutiveDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0F172A] text-slate-900 dark:text-white overflow-hidden font-sans">
      {/* Mobile sidebar overlay */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed right-0 top-0 z-50 h-screen w-64 bg-slate-900 dark:bg-[#0F172A]/50 dark:border-l dark:border-white/10 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 shadow-xl",
          !isSidebarOpen ? "translate-x-full lg:w-20" : "translate-x-0"
        )}
      >
        <div className="flex bg-slate-950 dark:bg-transparent items-center justify-between h-16 px-4 border-b border-slate-800 dark:border-white/10">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-amber-500 to-yellow-500 flex flex-shrink-0 items-center justify-center font-bold text-white shadow-lg">
                R
              </div>
              <span className="font-bold text-lg tracking-tight truncate w-full whitespace-nowrap">RAMZ ONE</span>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center font-bold text-white">
                R
              </div>
            </div>
          )}
          <button 
            className="lg:hidden text-slate-400 hover:text-white"
            onClick={toggleSidebar}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentView(item.id)}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all group",
                    currentView === item.id 
                      ? "bg-amber-500/10 text-amber-500 border border-amber-500/20 dark:bg-white/5 dark:border-white/10 dark:text-white" 
                      : "text-slate-300 hover:bg-slate-800 dark:hover:bg-white/5 dark:opacity-70 hover:text-white border border-transparent",
                    !isSidebarOpen && "justify-center"
                  )}
                  title={!isSidebarOpen ? item.label : ""}
                >
                  <span className={cn(
                    "flex-shrink-0",
                    currentView === item.id ? "text-amber-500" : "text-slate-400 group-hover:text-amber-400"
                  )}>
                    {item.icon}
                  </span>
                  {isSidebarOpen && (
                    <span className="font-medium whitespace-nowrap">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* User Info Bottom */}
        {isSidebarOpen && (
          <div className="p-4 border-t border-slate-800 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden flex-shrink-0 shadow-inner">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">المدير التنفيذي</span>
                <span className="text-xs text-slate-400">الإدارة العليا</span>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen min-w-0 bg-[#f8fafc] dark:bg-[#0F172A] transition-colors relative z-0">
        {/* Topbar */}
        <header className="h-16 bg-white dark:bg-[#0F172A]/80 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-4 lg:px-8 shrink-0 z-20 shadow-sm relative backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 -mr-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:flex relative max-w-md w-full">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="text-slate-400" size={18} />
              </div>
              <input 
                type="text" 
                placeholder="البحث الشامل..." 
                className="block w-full rounded-full border-0 py-2 pr-10 pl-4 text-slate-900 dark:text-white bg-slate-100 dark:bg-white/5 ring-1 ring-inset ring-slate-200 dark:ring-white/10 placeholder:text-slate-400 dark:placeholder:text-white/40 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={toggleDarkMode}
              className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="h-8 border-l border-slate-200 dark:border-white/10 mr-2 ml-2"></div>
            <div className="flex items-center gap-2 mr-2">
               <span className="text-sm font-bold text-teal-800 dark:text-teal-400 hidden sm:block">RAMZ</span>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-8 w-full max-w-screen-2xl mx-auto custom-scrollbar">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
