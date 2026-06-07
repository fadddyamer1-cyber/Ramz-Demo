import React from 'react';
import { 
  Building2, 
  TrendingUp, 
  AlertCircle, 
  Users, 
  Flame, 
  ShieldCheck, 
  HardHat,
  ArrowUpRight,
  ArrowDownRight,
  FileText
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const revenueData = [
  { name: 'يناير', value: 400000 },
  { name: 'فبراير', value: 300000 },
  { name: 'مارس', value: 550000 },
  { name: 'أبريل', value: 450000 },
  { name: 'مايو', value: 700000 },
  { name: 'يونيو', value: 650000 },
  { name: 'يوليو', value: 850000 },
];

const projectsData = [
  { name: 'مكافحة حريق', value: 45 },
  { name: 'إنذار حريق', value: 30 },
  { name: 'كاميرات مراقبة', value: 15 },
  { name: 'شبكات', value: 10 },
];

const COLORS = ['#ef4444', '#f59e0b', '#0e7490', '#2aa087'];

export function ExecutiveDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            مركز القيادة التنفيذية
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            نظرة شاملة على أداء مجموعة شركات رمز 
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-white/5 p-2 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">البيانات محدثة (مباشر)</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="إجمالي الإيرادات" 
          value="﷼ 8,450,000" 
          trend="+12.5%" 
          trendUp={true} 
          icon={<TrendingUp className="text-amber-500" />} 
          color="amber"
        />
        <KPICard 
          title="المشاريع النشطة" 
          value="124" 
          trend="+5" 
          trendUp={true} 
          icon={<Building2 className="text-teal-500" />} 
          color="teal"
        />
        <KPICard 
          title="طلبات الصيانة المفتوحة" 
          value="38" 
          trend="-12%" 
          trendUp={true} 
          icon={<AlertCircle className="text-red-500" />} 
          color="red"
        />
        <KPICard 
          title="فنيين في الموقع" 
          value="86" 
          trend="+94% معدل الالتزام" 
          trendUp={true} 
          icon={<HardHat className="text-emerald-500" />} 
          color="emerald"
        />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">الأداء المالي (2024-2025)</h3>
            <select className="bg-slate-100 dark:bg-white/5 border-none text-sm rounded-lg py-1 px-3 outline-none text-slate-700 dark:text-white/80">
              <option>هذا العام</option>
              <option>العام الماضي</option>
            </select>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Chart */}
        <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">توزيع المشاريع بالأقسام</h3>
          <div className="flex-1 flex flex-col justify-center min-h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {projectsData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></span>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">نشاطات المبيعات وعروض الأسعار</h3>
          <div className="space-y-4">
            <ActivityItem 
              icon={<FileText size={16} className="text-teal-600" />} 
              iconBg="bg-teal-100 dark:bg-teal-900/40"
              title="عرض سعر معتمد #QT-2024-089" 
              desc="تم اعتماد عرض سعر لشركة أرامكو (مشروع إنذار مبكر)" 
              time="منذ ساعتين" 
            />
            <ActivityItem 
              icon={<ShieldCheck size={16} className="text-emerald-600" />} 
              iconBg="bg-emerald-100 dark:bg-emerald-900/40"
              title="تجديد عقد صيانة #CNT-555" 
              desc="تم تجديد عقد الصيانة السنوي لفندق الريتز كارلتون" 
              time="منذ 4 ساعات" 
            />
            <ActivityItem 
              icon={<Flame size={16} className="text-red-600" />} 
              iconBg="bg-red-100 dark:bg-red-900/40"
              title="فرصة بيعية عالية الأهمية" 
              desc="مشروع توريد وتركيب نظام إطفاء لمحطة كهرباء الرياض" 
              time="بالأمس" 
            />
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">تنبيهات العمليات الميدانية</h3>
            <button className="text-sm text-amber-500 font-bold hover:text-amber-600">عرض الكل</button>
          </div>
          <div className="space-y-3">
             <AlertItem type="critical" message="تعطل نظام المضخات في موقع المستشفى العسكري" />
             <AlertItem type="warning" message="نقص في مخزون حساسات الدخان (كود: SD-100)" />
             <AlertItem type="info" message="تم إغلاق 12 طلب صيانة دورية بنجاح اليوم" />
             <AlertItem type="warning" message="تأخير في توريد مواد التمديدات لمشروع نيوم" />
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, trend, trendUp, icon, color }: any) {
  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow relative overflow-hidden">
      <div className={`absolute -left-6 -top-6 w-24 h-24 rounded-full bg-${color}-500/5 group-hover:bg-${color}-500/10 transition-colors pointer-events-none`}></div>
      <div className="flex justify-between items-start z-10 relative">
        <p className="text-sm font-semibold text-slate-500 dark:text-white/60">{title}</p>
        <div className={`p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 z-10 relative">
        <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</h4>
        <div className="flex items-center gap-1 mt-2">
          {trendUp ? (
            <ArrowUpRight size={16} className="text-emerald-500" />
          ) : (
            <ArrowDownRight size={16} className="text-red-500" />
          )}
          <span className={`text-sm font-bold ${trendUp ? 'text-emerald-500' : 'text-red-500'}`}>{trend}</span>
        </div>
      </div>
    </div>
  )
}

function ActivityItem({ icon, iconBg, title, desc, time }: any) {
  return (
    <div className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-white/10">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div>
        <h5 className="font-bold text-slate-900 dark:text-slate-100">{title}</h5>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{desc}</p>
        <p className="text-xs text-slate-400 mt-1">{time}</p>
      </div>
    </div>
  )
}

function AlertItem({ type, message }: { type: 'critical'|'warning'|'info', message: string }) {
  const colors = {
    critical: 'border-red-500 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400',
    warning: 'border-amber-500 bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400',
    info: 'border-teal-500 bg-teal-50 dark:bg-teal-900/10 text-teal-700 dark:text-teal-400'
  };
  
  return (
    <div className={`p-3 rounded-lg border-r-4 text-sm font-medium ${colors[type]}`}>
      {message}
    </div>
  )
}
