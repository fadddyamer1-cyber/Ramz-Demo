import React, { useState, useEffect } from 'react';
import { 
  Building, MapPin, Search, Filter, Activity, 
  CheckCircle2, Clock, AlertTriangle, XCircle, LayoutDashboard,
  Calendar, Users, FolderKanban, Banknote, Target, Navigation,
  Globe, Truck, Wrench, Phone, ListChecks, BatteryCharging
} from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { ProjectCommandCenter } from './ProjectCommandCenter';

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const majorCities = [
  { name: 'الرياض', coordinates: [46.6753, 24.7136] },
  { name: 'جدة', coordinates: [39.1925, 21.4858] },
  { name: 'الدمام', coordinates: [50.1033, 26.4332] },
  { name: 'مكة المكرمة', coordinates: [39.8166, 21.4225] },
  { name: 'المدينة المنورة', coordinates: [39.6122, 24.4686] },
  { name: 'أبها', coordinates: [42.5053, 18.2164] },
  { name: 'تبوك', coordinates: [36.5715, 28.3835] },
  { name: 'حائل', coordinates: [41.6907, 27.5114] },
  { name: 'نيوم', coordinates: [35.2500, 28.0833] }
];

const mockProjects = [
  {
    id: 'PRJ-24-001',
    name: 'مجمع سابك للكيماويات - الجبيل',
    client: 'سابك',
    location: { lat: 27.00, lng: 49.65 }, // Jubail
    type: 'عقد صيانة شامل',
    status: 'In Progress', 
    progress: 45,
    manager: 'م. أحمد القحطاني',
    startDate: '2024-01-15',
    endDate: '2026-01-14',
    priority: 'عالي',
  },
  {
    id: 'PRJ-24-002',
    name: 'أنظمة الإنذار المبكر - أرامكو',
    client: 'أرامكو السعودية',
    location: { lat: 26.27, lng: 50.12 }, // Dhahran
    type: 'توريد وتركيب',
    status: 'Scheduled', 
    progress: 10,
    manager: 'م. خالد العتيبي',
    startDate: '2024-07-01',
    endDate: '2024-12-31',
    priority: 'متوسط',
  },
  {
    id: 'PRJ-24-003',
    name: 'تحديث كاميرات المراقبة - الميناء',
    client: 'الهيئة العامة للموانئ',
    location: { lat: 26.43, lng: 50.10 }, // Dammam
    type: 'ترقية أنظمة',
    status: 'Delayed', 
    progress: 60,
    manager: 'م. يوسف الدوسري',
    startDate: '2023-11-01',
    endDate: '2024-05-30',
    priority: 'مرتفع جداً',
  },
  {
    id: 'PRJ-24-004',
    name: 'صيانة أنظمة الإطفاء - مستشفى الملك فهد',
    client: 'تجمع الشرقية الصحي',
    location: { lat: 26.28, lng: 50.20 }, // Khobar
    type: 'عقد جولات وقائية',
    status: 'Completed', 
    progress: 100,
    manager: 'م. فهد السديري',
    startDate: '2023-01-10',
    endDate: '2024-01-09',
    priority: 'عالي',
  },
  {
    id: 'PRJ-24-005',
    name: 'محطة أبحاث جامعة الملك فيصل',
    client: 'جامعة الملك فيصل',
    location: { lat: 25.38, lng: 49.58 }, // Ahsa
    type: 'توريد وتركيب',
    status: 'Waiting', 
    progress: 0,
    manager: 'م. سعد العبدالله',
    startDate: '2024-08-15',
    endDate: '2025-02-15',
    priority: 'متوسط',
  },
  {
    id: 'PRJ-24-006',
    name: 'مشروع الربط الشبكي المغلق',
    client: 'وزارة الداخلية',
    location: { lat: 24.71, lng: 46.67 }, // Riyadh
    type: 'بنية تحتية للشبكات',
    status: 'In Progress', 
    progress: 25,
    manager: 'م. ثامر الحسين',
    startDate: '2024-02-01',
    endDate: '2024-10-30',
    priority: 'متوسط',
  }
];

const initialTeams = [
  {
    id: 'TEAM-01',
    name: 'وحدة الصيانة السريعة - أ',
    type: 'technician',
    location: { lat: 26.40, lng: 50.05 },
    targetLocation: { lat: 26.43, lng: 50.10 }, // moving towards PRJ-24-003
    status: 'En Route',
    assignedProject: 'PRJ-24-003',
    eta: '12 دقيقة',
    capacity: '80%',
    contact: '050-123-4567',
    tasks: ['فحص الكاميرات المعطلة في البوابة الشمالية', 'استبدال كابلات الشبكة التالفة']
  },
  {
    id: 'TEAM-02',
    name: 'مركبة التجهيزات الثقيلة',
    type: 'vehicle',
    location: { lat: 27.00, lng: 49.65 },
    targetLocation: { lat: 27.00, lng: 49.65 }, // at PRJ-24-001
    status: 'On Site',
    assignedProject: 'PRJ-24-001',
    eta: 'وصل إلى الموقع',
    capacity: '40%',
    contact: '050-123-4568',
    tasks: ['تنزيل معدات الحماية المتقدمة', 'تركيب البنية التحتية الرئيسية']
  },
  {
    id: 'TEAM-03',
    name: 'فريق التدخل الطارئ',
    type: 'vehicle',
    location: { lat: 26.20, lng: 49.95 },
    targetLocation: { lat: 26.25, lng: 50.12 },
    status: 'Available',
    assignedProject: 'غير معين',
    eta: '-',
    capacity: '100%',
    contact: '050-123-4569',
    tasks: []
  }
];

export function ProjectGeoIntelligenceCenter() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [showTeams, setShowTeams] = useState(true);
  const [teams, setTeams] = useState(initialTeams);
  const [commandCenterProject, setCommandCenterProject] = useState<any>(null);

  // Live Tracking Simulation Effect
  useEffect(() => {
    if (!showTeams) return;
    const interval = setInterval(() => {
      setTeams(currentTeams => 
        currentTeams.map(team => {
          if (team.status === 'On Site' || team.status === 'Available') return team;
          
          // Move slowly towards target
          const latDiff = team.targetLocation.lat - team.location.lat;
          const lngDiff = team.targetLocation.lng - team.location.lng;
          const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
          
          if (distance < 0.005) {
            return { ...team, status: 'On Site', location: team.targetLocation, eta: 'وصل إلى الموقع' };
          }

          const step = 0.002;
          const moveLat = (latDiff / distance) * step;
          const moveLng = (lngDiff / distance) * step;

          return {
            ...team,
            location: {
              lat: team.location.lat + moveLat,
              lng: team.location.lng + moveLng
            }
          };
        })
      );
    }, 2000); // update every 2 seconds

    return () => clearInterval(interval);
  }, [showTeams]);

  const getPinColorHex = (status: string) => {
    switch (status) {
      case 'Completed': return '#10B981'; // emerald-500
      case 'In Progress': return '#3B82F6'; // blue-500
      case 'Waiting': return '#F97316'; // orange-500
      case 'Scheduled': return '#EAB308'; // yellow-500
      case 'Delayed': return '#EF4444'; // red-500
      default: return '#64748B'; // slate-500
    }
  };

  const [position, setPosition] = useState({ coordinates: [46.67, 24.71], zoom: 4 });

  const handleMoveEnd = (position: any) => {
    setPosition(position);
  };

  const handleResetMap = () => {
    setPosition({ coordinates: [0, 20], zoom: 1 }); // Global view
  };

  const handleFocusSaudi = () => {
    setPosition({ coordinates: [46.67, 24.71], zoom: 6 }); // Saudi view
  };

  if (commandCenterProject) {
    return <ProjectCommandCenter project={commandCenterProject} onClose={() => setCommandCenterProject(null)} />
  }

  return (
    <div className="flex h-full flex-col lg:flex-row relative z-0 animate-in fade-in duration-500 bg-[#0B1121]">
      {/* Sidebar Panel */}
      <div className="w-full lg:w-96 bg-white dark:bg-[#0F172A]/90 border-l border-slate-200 dark:border-white/10 lg:h-full overflow-y-auto flex-shrink-0 z-20 shadow-2xl backdrop-blur-md">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Globe size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">الذكاء الجغرافي</h2>
              <p className="text-xs text-slate-500 dark:text-white/50">مركز متابعة المشاريع</p>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 dark:text-white/40">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="البحث عن مشروع أو موقع..." 
              className="block w-full rounded-xl border border-slate-200 dark:border-white/10 py-3 pr-10 pl-4 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-white/20 text-sm"
            />
          </div>

          {/* View Toggles */}
          <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl mb-6">
            <button onClick={handleResetMap} className="flex-1 py-1.5 text-xs font-bold text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors">عالمي</button>
            <button onClick={handleFocusSaudi} className="flex-1 py-1.5 text-xs font-bold bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white rounded-lg transition-colors">إقليمي</button>
            <button className="flex-1 py-1.5 text-xs font-bold text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors">تنفيذي</button>
          </div>

          {/* KPI Mini dashboard */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10">
               <span className="text-xs font-bold text-slate-500 dark:text-white/60 mb-1 block">إجمالي المشاريع</span>
               <span className="text-2xl font-black text-slate-900 dark:text-white">{mockProjects.length}</span>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-500/30">
               <span className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1 block">مشاريع استراتيجية</span>
               <span className="text-2xl font-black text-blue-800 dark:text-blue-300">4</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">عوامل التصفية (Filters)</h3>
            <button 
              onClick={() => setShowTeams(!showTeams)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${showTeams ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/50 border border-slate-200 dark:border-white/10'}`}
            >
               <Truck size={12} />
               فرق الميدان
               <div className={`w-1.5 h-1.5 rounded-full ${showTeams ? 'bg-white animate-pulse' : 'bg-slate-400'}`}></div>
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            <FilterBadge label="الكل" active={true} />
            <FilterBadge label="المنطقة الشرقية" active={false} icon={<MapPin size={10} className="ml-1" />} />
            <FilterBadge label="قيد التنفيذ" active={false} color="blue" />
            <FilterBadge label="مكتمل" active={false} color="emerald" />
            <FilterBadge label="متأخر" active={false} color="red" />
          </div>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">قائمة المشاريع الميدانية</h3>
          <div className="space-y-3">
             {mockProjects.map(p => (
               <ProjectListItem 
                 key={p.id} 
                 project={p} 
                 isSelected={selectedProject?.id === p.id}
                 onClick={() => {
                   setSelectedProject(p);
                   setPosition({ coordinates: [p.location.lng, p.location.lat], zoom: 12 });
                 }} 
               />
             ))}
          </div>
        </div>
      </div>

      {/* Main Map Area - React Simple Maps */}
      <div className="flex-1 relative h-[500px] lg:h-full bg-[#A5DDF6] overflow-hidden rounded-b-2xl lg:rounded-none z-10 flex items-center justify-center">
         
         <ComposableMap
            projection="geoMercator"
            style={{ width: "100%", height: "100%", outline: "none" }}
         >
            <ZoomableGroup
               zoom={position.zoom}
               center={position.coordinates as [number, number]}
               onMoveEnd={handleMoveEnd}
            >
               <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                     geographies.map((geo) => (
                        <Geography
                           key={geo.rsmKey}
                           geography={geo}
                           fill="#F3EFE9"
                           stroke="#737373"
                           strokeWidth={0.5}
                           style={{
                              default: { outline: "none" },
                              hover: { fill: "#EAE5DC", outline: "none", cursor: 'pointer' },
                              pressed: { outline: "none" },
                           }}
                        />
                     ))
                  }
               </Geographies>

               {/* Project Markers */}
               {mockProjects.map(project => {
                 const isSelected = selectedProject?.id === project.id;
                 const colorHex = getPinColorHex(project.status);
                 return (
                   <Marker 
                      key={project.id} 
                      coordinates={[project.location.lng, project.location.lat]}
                      onClick={() => {
                        setSelectedProject(project);
                        setSelectedTeam(null);
                        setPosition({ coordinates: [project.location.lng, project.location.lat], zoom: 8 });
                      }}
                      style={{ cursor: "pointer" }}
                   >
                     <g transform={`scale(${1.5 / position.zoom})`}>
                       {/* Pulse effect */}
                       <circle r={isSelected ? "12" : "6"} fill={colorHex} opacity="0.4">
                         <animate attributeName="r" from={isSelected ? "12" : "6"} to={isSelected ? "25" : "15"} dur="1.5s" repeatCount="indefinite" />
                         <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                       </circle>
                       
                       {/* Core Marker */}
                       <circle 
                          r={isSelected ? "6" : "3"} 
                          fill={colorHex} 
                          stroke="#0F172A" 
                          strokeWidth="1.5" 
                       />
                       
                       {isSelected && (
                          <path 
                             d="M 0 -12 L 5 -20 L -5 -20 Z" 
                             fill={colorHex} 
                          />
                       )}
                     </g>
                   </Marker>
                 );
               })}

               {/* Live Field Teams Markers */}
               {showTeams && teams.map(team => {
                 const isSelected = selectedTeam?.id === team.id;
                 return (
                   <Marker 
                      key={team.id}
                      coordinates={[team.location.lng, team.location.lat]}
                      onClick={() => {
                        setSelectedTeam(team);
                        setSelectedProject(null);
                        setPosition({ coordinates: [team.location.lng, team.location.lat], zoom: 9 });
                      }}
                      style={{ cursor: 'pointer' }}
                   >
                     <g transform={`scale(${1.5 / position.zoom})`}>
                       {team.status === 'En Route' && (
                         <circle r="14" fill="none" stroke="#6366F1" strokeWidth="1" opacity="0.6" strokeDasharray="2 2">
                            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite"/>
                         </circle>
                       )}
                       
                       <g transform="translate(-10, -10)">
                         <circle cx="10" cy="10" r="10" fill={team.status === 'Available' ? '#10B981' : (team.status === 'On Site' ? '#F59E0B' : '#6366F1')} stroke="#FFFFFF" strokeWidth="1.5" className="shadow-lg" />
                         <g transform="translate(4, 4)" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                           {team.type === 'vehicle' 
                             ? <path d="M1 3h5v6H1z M6 6h3l1.5 3H6 M2 10a1 1 0 100-2 1 1 0 000 2z M8.5 10a1 1 0 100-2 1 1 0 000 2z" />
                             : <path d="M6 6a2.5 2.5 0 100-5 2.5 2.5 0 000 5z M2 11c0-2.2 1.8-4 4-4s4 1.8 4 4" />
                           }
                         </g>
                       </g>
                       
                       {isSelected && (
                         <path d="M 0 -14 L 4 -22 L -4 -22 Z" fill="#6366F1" />
                       )}
                     </g>
                   </Marker>
                 );
               })}

               {/* City Labels */}
               {majorCities.map((city, idx) => (
                 <Marker key={idx} coordinates={city.coordinates as [number, number]}>
                   <g transform={`scale(${2 / position.zoom})`}>
                     <circle r={2} fill="#64748B" opacity={0.6} />
                     <text
                       textAnchor="middle"
                       y={10}
                       style={{
                         fontFamily: "'Inter', system-ui, sans-serif",
                         fill: "#94A3B8",
                         fontSize: "6px",
                         fontWeight: 600,
                       }}
                     >
                       {city.name}
                     </text>
                   </g>
                 </Marker>
               ))}
            </ZoomableGroup>
         </ComposableMap>

         {/* Selected Project Info Floating Panel */}
         {selectedProject && (
           <div className="absolute top-6 right-6 z-30 transition-all duration-300 animate-in fade-in slide-in-from-right-8">
              <div className="w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-white/20 overflow-hidden relative text-slate-900 dark:text-white">
                 <button 
                   onClick={() => setSelectedProject(null)}
                   className="absolute top-4 left-4 text-slate-400 dark:text-white/50 hover:text-slate-700 dark:hover:text-white transition-colors"
                 >
                   <XCircle size={18} />
                 </button>
                 
                 <div className="p-5 border-b border-slate-100 dark:border-white/10">
                   <div className="flex items-center gap-2 mb-2">
                     <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ backgroundColor: `${getPinColorHex(selectedProject.status)}30`, color: getPinColorHex(selectedProject.status) }}>
                        {selectedProject.status === 'Completed' && 'مكتمل'}
                        {selectedProject.status === 'In Progress' && 'قيد التنفيذ'}
                        {selectedProject.status === 'Waiting' && 'في الانتظار'}
                        {selectedProject.status === 'Scheduled' && 'مجدول'}
                        {selectedProject.status === 'Delayed' && 'متأخر'}
                        {selectedProject.status === 'Cancelled' && 'ملغى'}
                     </span>
                     <span className="text-[10px] font-mono text-slate-500 dark:text-white/40" dir="ltr">{selectedProject.id}</span>
                   </div>
                   <h3 className="font-bold text-base pr-2 leading-tight">{selectedProject.name}</h3>
                 </div>
                 
                 <div className="p-5">
                   <div className="flex flex-col gap-4 mb-6">
                     <div className="flex justify-between items-center text-sm">
                       <div className="flex items-center gap-2 text-slate-500 dark:text-white/60 w-1/2">
                         <Building size={16} />
                         <span>العميل</span>
                       </div>
                       <span className="font-semibold text-right">{selectedProject.client}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm border-t border-slate-100 dark:border-white/10 pt-3">
                       <div className="flex items-center gap-2 text-slate-500 dark:text-white/60 w-1/2">
                         <Users size={16} />
                         <span>المدير</span>
                       </div>
                       <span className="font-semibold text-right">{selectedProject.manager}</span>
                     </div>
                   </div>

                   <div className="space-y-2 mb-6">
                     <div className="flex justify-between text-xs">
                       <span className="text-slate-500 dark:text-white/60 font-semibold">نسبة الإنجاز</span>
                       <span className="font-black">{selectedProject.progress}%</span>
                     </div>
                     <div className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                       <div 
                         className="h-full rounded-full transition-all duration-1000"
                         style={{ width: `${selectedProject.progress}%`, backgroundColor: getPinColorHex(selectedProject.status) }}
                       ></div>
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3">
                     <button onClick={() => setCommandCenterProject(selectedProject)} className="py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 col-span-2">
                        <FolderKanban size={16} /> فتح مركز القيادة
                     </button>
                     <button className="py-3 bg-teal-500 hover:bg-teal-600 dark:hover:bg-teal-400 text-white dark:text-slate-900 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20">
                        <LayoutDashboard size={16} /> تفاصيل
                     </button>
                     <button className="py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                        <Navigation size={16} /> توجيه
                     </button>
                   </div>
                 </div>
              </div>
           </div>
         )}

         {/* Selected Team Info Floating Panel */}
         {selectedTeam && (
           <div className="absolute top-6 right-6 z-30 transition-all duration-300 animate-in fade-in slide-in-from-right-8">
              <div className="w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-indigo-200 dark:border-indigo-500/30 overflow-hidden relative text-slate-900 dark:text-white">
                 <button 
                   onClick={() => setSelectedTeam(null)}
                   className="absolute top-4 left-4 text-slate-400 dark:text-white/50 hover:text-slate-700 dark:hover:text-white transition-colors"
                 >
                   <XCircle size={18} />
                 </button>
                 
                 <div className="p-5 border-b border-slate-100 dark:border-white/10">
                   <div className="flex items-center gap-2 mb-2">
                     <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                       selectedTeam.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 
                       selectedTeam.status === 'On Site' ? 'bg-amber-100 text-amber-700' : 
                       'bg-indigo-100 text-indigo-700'
                     }`}>
                        {selectedTeam.status === 'En Route' && 'في الطريق'}
                        {selectedTeam.status === 'On Site' && 'في الموقع'}
                        {selectedTeam.status === 'Available' && 'متاح'}
                     </span>
                     <span className="text-[10px] font-mono text-slate-500 dark:text-white/40" dir="ltr">{selectedTeam.id}</span>
                   </div>
                   <h3 className="font-bold text-base pr-2 leading-tight flex items-center gap-2">
                      {selectedTeam.type === 'vehicle' ? <Truck size={16} className="text-indigo-500" /> : <Wrench size={16} className="text-indigo-500" />}
                      {selectedTeam.name}
                   </h3>
                 </div>
                 
                 <div className="p-5 bg-slate-50/50 dark:bg-white/[0.02]">
                   <div className="flex flex-col gap-4 mb-6">
                     <div className="flex justify-between items-center text-sm">
                       <div className="flex items-center gap-2 text-slate-500 dark:text-white/60 w-1/2">
                         <Building size={16} />
                         <span>المشروع</span>
                       </div>
                       <span className="font-semibold text-right text-indigo-600 dark:text-indigo-400 font-mono text-xs">{selectedTeam.assignedProject}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm border-t border-slate-100 dark:border-white/10 pt-3">
                       <div className="flex items-center gap-2 text-slate-500 dark:text-white/60 w-1/2">
                         <Clock size={16} />
                         <span>موعد الوصول</span>
                       </div>
                       <span className={`text-right font-bold text-xs ${selectedTeam.status === 'En Route' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-gray-300'}`}>
                         {selectedTeam.eta}
                       </span>
                     </div>
                     <div className="flex justify-between items-center text-sm border-t border-slate-100 dark:border-white/10 pt-3">
                       <div className="flex items-center gap-2 text-slate-500 dark:text-white/60 w-1/2">
                         <BatteryCharging size={16} />
                         <span>المتاحية</span>
                       </div>
                       <span className="font-bold text-slate-700 dark:text-gray-300 text-xs">
                         {selectedTeam.capacity}
                       </span>
                     </div>
                   </div>

                   {selectedTeam.tasks && selectedTeam.tasks.length > 0 && (
                     <div className="mb-6">
                       <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1">
                         <ListChecks size={14} /> المهام الموكلة
                       </h4>
                       <ul className="space-y-2">
                         {selectedTeam.tasks.map((task: string, idx: number) => (
                           <li key={idx} className="text-xs text-slate-600 dark:text-white/70 bg-white dark:bg-white/5 p-2 rounded-lg border border-slate-100 dark:border-white/5 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1 shrink-0"></div>
                              <span>{task}</span>
                           </li>
                         ))}
                       </ul>
                     </div>
                   )}

                   <div className="grid grid-cols-2 gap-3">
                     <button className="py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/20">
                        <FolderKanban size={14} /> تفاصيل المهام
                     </button>
                     <button className="py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                        <Phone size={14} /> اتصال
                     </button>
                   </div>
                 </div>
              </div>
           </div>
         )}

         {/* Map Overlay Controls */}
         <div className="absolute top-6 left-6 flex flex-col gap-3 z-10">
            <button onClick={handleResetMap} title="خريطة العالم" className="w-10 h-10 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/20 rounded-xl shadow-lg flex items-center justify-center text-slate-700 dark:text-white/70 hover:text-teal-600 dark:hover:text-white transition-all">
               <Globe size={20} />
            </button>
            <button className="w-10 h-10 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/20 rounded-xl shadow-lg flex items-center justify-center text-slate-700 dark:text-white/70 hover:text-teal-600 dark:hover:text-white transition-all">
               <Activity size={20} />
            </button>
         </div>

         {/* Legend */}
         <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/20 rounded-xl shadow-lg p-4 z-10">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-3">دليل الخريطة</h4>
            <div className="space-y-2">
              <LegendItem color="bg-emerald-500" label="مكتمل" />
              <LegendItem color="bg-blue-500" label="قيد التنفيذ" />
              <LegendItem color="bg-yellow-500" label="مجدول" />
              <LegendItem color="bg-orange-500" label="في الانتظار" />
              <LegendItem color="bg-red-500" label="متأخر" />
            </div>
            {showTeams && (
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 space-y-2">
                 <LegendItem color="bg-indigo-500" label="فرق الميدان" styleClass="animate-pulse" />
              </div>
            )}
         </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label, styleClass = '' }: any) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color} ${styleClass}`}></div>
      <span className="text-[10px] text-slate-700 dark:text-white/80 font-semibold">{label}</span>
    </div>
  )
}

function FilterBadge({ label, active, color, icon }: any) {
  let indicator = null;
  if (color === 'emerald') indicator = <div className="w-2 h-2 rounded-full bg-emerald-500 ml-1.5" />;
  if (color === 'blue') indicator = <div className="w-2 h-2 rounded-full bg-blue-500 ml-1.5" />;
  if (color === 'red') indicator = <div className="w-2 h-2 rounded-full bg-red-500 ml-1.5" />;
  if (color === 'yellow') indicator = <div className="w-2 h-2 rounded-full bg-yellow-500 ml-1.5" />;

  return (
    <button className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center ${
      active 
        ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-600/20' 
        : 'bg-white dark:bg-transparent border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/5'
    }`}>
      {indicator}
      {icon}
      {label}
    </button>
  )
}

function ProjectListItem({ project, isSelected, onClick }: any) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Waiting': return 'bg-orange-500';
      case 'Scheduled': return 'bg-yellow-500';
      case 'Delayed': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`p-3 rounded-xl border cursor-pointer transition-all flex gap-3 group ${
        isSelected 
          ? 'bg-slate-100 dark:bg-white/10 border-teal-500/50 shadow-sm' 
          : 'bg-slate-50 dark:bg-white/5 border-transparent hover:border-slate-200 dark:hover:border-white/10'
      }`}
    >
      <div className={`w-1.5 rounded-full ${getStatusColor(project.status)} ${isSelected ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}></div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 leading-tight">{project.name}</h4>
        <div className="flex items-center gap-1.5 mb-2">
           <Building size={12} className="text-slate-400 dark:text-white/40" />
           <span className="text-[10px] text-slate-600 dark:text-white/60 truncate" title={project.client}>{project.client}</span>
           <span className="text-[10px] text-slate-300 dark:text-white/20 px-1">•</span>
           <span className="text-[10px] text-slate-500 dark:text-white/50 truncate" title={project.type}>{project.type}</span>
        </div>
        <div className="flex justify-between items-center text-[10px]">
           <span className="text-slate-500 dark:text-white/50">{project.id}</span>
           <span className="font-mono font-bold text-slate-900 dark:text-white">{project.progress}%</span>
        </div>
      </div>
    </div>
  )
}
