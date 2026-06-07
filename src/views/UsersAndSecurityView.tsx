import React, { useState } from 'react';
import { 
  Users, User, Shield, ShieldAlert, FileText, Lock, UserPlus, Search, 
  Filter, MoreVertical, Edit, Trash2, Eye, Key, CheckCircle, XCircle 
} from 'lucide-react';

export function UsersAndSecurityView() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            المستخدمين والصلاحيات
          </h1>
          <p className="text-slate-500 dark:text-white/60 mt-1">
            إدارة حسابات المستخدمين، الأدوار، ومراقبة أمن النظام
          </p>
        </div>
        {activeTab === 'users' && (
          <button 
            onClick={() => setActiveTab('add_user')}
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg flex items-center gap-2 transition-all"
          >
            <UserPlus size={20} />
            <span>إضافة مستخدم جديد</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-white/10 overflow-x-auto hide-scrollbar">
        <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>
          <ShieldAlert size={16} className="inline-block mr-2 ml-2" />
          نظرة عامة
        </TabButton>
        <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
          <Users size={16} className="inline-block mr-2 ml-2" />
          المستخدمين
        </TabButton>
        <TabButton active={activeTab === 'add_user'} onClick={() => setActiveTab('add_user')} className={activeTab === 'add_user' ? 'block' : 'hidden'}>
          <UserPlus size={16} className="inline-block mr-2 ml-2" />
          إضافة مستخدم
        </TabButton>
        <TabButton active={activeTab === 'roles'} onClick={() => setActiveTab('roles')}>
          <Shield size={16} className="inline-block mr-2 ml-2" />
          الأدوار والصلاحيات
        </TabButton>
        <TabButton active={activeTab === 'audit'} onClick={() => setActiveTab('audit')}>
          <FileText size={16} className="inline-block mr-2 ml-2" />
          سجل التدقيق
        </TabButton>
        <TabButton active={activeTab === 'security'} onClick={() => setActiveTab('security')}>
          <Lock size={16} className="inline-block mr-2 ml-2" />
          مركز الأمان
        </TabButton>
      </div>

      <div className="flex-1 overflow-auto bg-white/50 dark:bg-transparent rounded-2xl">
        {activeTab === 'dashboard' && <UserManagementDashboard />}
        {activeTab === 'users' && <UsersTable />}
        {activeTab === 'add_user' && <AddUserForm onCancel={() => setActiveTab('users')} />}
        {activeTab === 'roles' && <RolesPermissions />}
        {activeTab === 'audit' && <AuditLogs />}
        {activeTab === 'security' && <SecurityCenter />}
      </div>
    </div>
  );
}

function TabButton({ active, children, onClick, className = '' }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-3 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap flex items-center ${
        active 
          ? 'text-teal-600 dark:text-teal-400 border-teal-600 dark:border-teal-400' 
          : 'text-slate-500 dark:text-white/60 border-transparent hover:text-slate-800 dark:hover:text-white'
      } ${className}`}
    >
      {children}
    </button>
  );
}

// 1. Dashboard
function UserManagementDashboard() {
  return (
    <div className="space-y-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="إجمالي المستخدمين" value="245" color="teal" />
        <StatCard title="نشط حالياً" value="182" color="emerald" />
        <StatCard title="مستخدمين معطلين" value="8" color="slate" />
        <StatCard title="مدراء النظام" value="5" color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">آخر عمليات الدخول</h3>
          <div className="space-y-4">
            <LoginItem user="أحمد القحطاني" role="مدير تنفيذي" time="منذ 5 دقائق" status="success" />
            <LoginItem user="سارة الحمد" role="مديرة الموارد البشرية" time="منذ 18 دقيقة" status="success" />
            <LoginItem user="خالد العتيبي" role="مدير مشاريع" time="منذ 45 دقيقة" status="success" />
            <LoginItem user="مستخدم غير معروف" role="-" time="منذ ساعتين" status="failed" />
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">أحدث التغييرات</h3>
          <div className="space-y-4">
             <ActivityItem action="إضافة مستخدم جديد" target="يوسف الدوسري" by="أحمد القحطاني" time="اليوم 09:12 ص" />
             <ActivityItem action="تغيير صلاحيات" target="دور مدير المبيعات" by="النظام" time="الأمس 14:30 م" />
             <ActivityItem action="إعادة تعيين كلمة المرور" target="علي الزهراني" by="فريق الدعم" time="الأمس 11:05 ص" />
             <ActivityItem action="تفعيل حساب" target="مها العبدالله" by="سارة الحمد" time="قبل يومين" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string, value: string, color: string }) {
  const colors: Record<string, string> = {
    teal: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 border-teal-200 dark:border-teal-500/20',
    emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
    slate: 'text-slate-600 dark:text-white/60 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10',
    amber: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
  };

  return (
    <div className={`p-5 rounded-2xl border flex flex-col justify-between ${colors[color]}`}>
      <span className="text-sm font-bold opacity-80">{title}</span>
      <span className="text-3xl font-black mt-2">{value}</span>
    </div>
  )
}

function LoginItem({ user, role, time, status }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-transparent dark:border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-white/60">
           <User size={14} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1">{user}</p>
          <p className="text-[10px] text-slate-500 dark:text-white/50">{role}</p>
        </div>
      </div>
      <div className="text-left">
        <p className="text-xs text-slate-500 dark:text-white/50 mb-1">{time}</p>
        {status === 'success' ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400"><CheckCircle size={10}/> ناجح</span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 dark:text-red-400"><XCircle size={10}/> فشل</span>
        )}
      </div>
    </div>
  )
}

function ActivityItem({ action, target, by, time }: any) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">
        <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]"></div>
        <div className="w-0.5 h-full bg-slate-200 dark:bg-white/10 mx-auto -mb-1 mt-1"></div>
      </div>
      <div className="pb-4">
        <p className="text-sm font-bold text-slate-900 dark:text-white">{action}</p>
        <p className="text-xs text-slate-600 dark:text-white/60 mt-1">الهدف: {target}</p>
        <p className="text-[10px] text-slate-400 dark:text-white/40 mt-1">{time} • بواسطة: {by}</p>
      </div>
    </div>
  )
}

// 2. Users Table
const mockUsers = [
  { id: '1001', name: 'أحمد القحطاني', department: 'الإدارة العليا', position: 'المدير التنفيذي', role: 'System Administrator', status: 'Active', lastLogin: 'اليوم 08:30 ص', created: '2020-01-15' },
  { id: '1024', name: 'سعد العبدالله', department: 'المبيعات', position: 'مدير المبيعات', role: 'Sales Manager', status: 'Active', lastLogin: 'اليوم 09:15 ص', created: '2021-03-10' },
  { id: '1055', name: 'نورة الخالد', department: 'الموارد البشرية', position: 'أخصائي موارد', role: 'HR Manager', status: 'Active', lastLogin: 'الأمس 14:20 م', created: '2022-06-22' },
  { id: '1089', name: 'طارق الزهراني', department: 'دعم تقنية المعلومات', position: 'مهندس شبكات', role: 'Employee', status: 'Inactive', lastLogin: '2024-05-10', created: '2023-11-01' },
];

function UsersTable() {
  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col flex-1 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50 dark:bg-transparent">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="text-slate-400" size={18} />
          </div>
          <input 
            type="text" 
            placeholder="بحث بالاسم، الرقم الوظيفي..." 
            className="block w-full rounded-xl border-0 py-2 pr-10 pl-4 text-slate-900 dark:text-white bg-white dark:bg-white/5 shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 sm:text-sm sm:leading-6 outline-none"
          />
        </div>
        <button className="p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
          <Filter size={18} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 text-sm border-b border-slate-200 dark:border-white/10">
              <th className="p-4 font-bold">الرقم الوظيفي</th>
              <th className="p-4 font-bold">الاسم</th>
              <th className="p-4 font-bold">القسم / المنصب</th>
              <th className="p-4 font-bold">الدور (Role)</th>
              <th className="p-4 font-bold">الحالة</th>
              <th className="p-4 font-bold">آخر دخول</th>
              <th className="p-4 font-bold">تاريخ الإنشاء</th>
              <th className="p-4 font-bold text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-white/10 text-sm">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                <td className="p-4 font-medium text-slate-900 dark:text-white font-mono">{user.id}</td>
                <td className="p-4 text-slate-900 dark:text-white font-bold">{user.name}</td>
                <td className="p-4">
                  <div className="text-slate-900 dark:text-white font-semibold">{user.department}</div>
                  <div className="text-slate-500 dark:text-white/50 text-[10px]">{user.position}</div>
                </td>
                <td className="p-4 text-slate-600 dark:text-white/80">{user.role}</td>
                <td className="p-4">
                   <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${
                     user.status === 'Active' 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-white/60 border border-slate-200 dark:border-white/10'
                   }`}>
                     {user.status === 'Active' ? 'نشط' : 'معطل'}
                   </span>
                </td>
                <td className="p-4 text-slate-500 dark:text-white/60 text-[11px]">{user.lastLogin}</td>
                <td className="p-4 text-slate-500 dark:text-white/60 text-[11px]">{user.created}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-teal-500 transition-colors" title="استعراض">
                      <Eye size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-amber-500 transition-colors" title="صلاحيات">
                      <Shield size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors" title="إعادة تعيين كلمة المرور">
                      <Key size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-500 transition-colors" title="تعطيل/حذف">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// 3. Add User Form
function AddUserForm({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm p-6 lg:p-8 max-w-4xl mx-auto">
      <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-white/10 pb-4">معلومات المستخدم الجديد</h3>
      
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormGroup label="الرقم الوظيفي" type="text" placeholder="مثال: 1055" />
          <FormGroup label="الاسم الكامل" type="text" placeholder="الاسم الرباعي" />
          <FormGroup label="البريد الإلكتروني" type="email" placeholder="email@ramz.com" />
          <FormGroup label="رقم الجوال" type="tel" placeholder="05XXXXXXXX" dir="ltr" />
          
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-white/80 mb-2">القسم</label>
            <select className="w-full rounded-xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 py-2.5 px-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500">
              <option>الإدارة العليا</option>
              <option>المبيعات</option>
              <option>العمليات والمشاريع</option>
              <option>الدعم الفني</option>
              <option>الموارد البشرية</option>
            </select>
          </div>

          <FormGroup label="المنصب الوظيفي" type="text" placeholder="مثال: مدير إقليمي" />

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-white/80 mb-2">دور المستخدم (Role)</label>
            <select className="w-full rounded-xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 py-2.5 px-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500">
              <option>Employee</option>
              <option>System Administrator</option>
              <option>General Manager</option>
              <option>Sales Manager</option>
              <option>HR Manager</option>
              <option>Maintenance Manager</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-white/80 mb-2">حساب الدخول (Username)</label>
            <input type="text" className="w-full rounded-xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 py-2.5 px-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500" dir="ltr" />
          </div>

          <FormGroup label="كلمة المرور المؤقتة" type="password" />
          <FormGroup label="تأكيد كلمة المرور" type="password" />
        </div>

        <div className="flex items-center gap-3 py-4 border-t border-slate-100 dark:border-white/10 mt-6 pt-6">
          <label className="font-bold text-slate-700 dark:text-white/80">حالة الحساب فور الإنشاء:</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="status" defaultChecked className="text-teal-500 focus:ring-teal-500" />
              <span className="text-sm dark:text-white">نشط (Active)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="status" className="text-teal-500 focus:ring-teal-500" />
              <span className="text-sm dark:text-white">معطل (Inactive)</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            إلغاء
          </button>
          <button type="button" className="px-6 py-2.5 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-500 transition-colors shadow-lg shadow-teal-500/20">
            حفظ وإنشاء الحساب
          </button>
        </div>
      </form>
    </div>
  )
}

function FormGroup({ label, type, placeholder, dir }: any) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 dark:text-white/80 mb-2">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder} 
        dir={dir}
        className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 py-2.5 px-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-slate-400 dark:placeholder:text-white/30"
      />
    </div>
  )
}

// 4 & 5. Roles & Permissions Management
const categories = ['Dashboard', 'CRM', 'Quotations', 'Projects', 'Maintenance', 'HR', 'Procurement', 'Inventory', 'Reports', 'User Management', 'System Settings'];
const roles = ['System Administrator', 'General Manager', 'Operations Manager', 'Sales Manager', 'HR Manager', 'Procurement Manager', 'Project Manager', 'Maintenance Manager', 'Employee'];

function RolesPermissions() {
  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col flex-1 overflow-auto">
      <div className="p-4 md:p-6 border-b border-slate-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h3 className="font-bold text-lg text-slate-900 dark:text-white">مصفوفة الصلاحيات (Permission Matrix)</h3>
           <p className="text-sm text-slate-500 dark:text-white/50">تحديد صلاحيات الوصول والعمليات لكل دور وظيفي</p>
        </div>
        <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white/90 font-bold py-2 px-4 rounded-xl shadow-sm text-sm">
          إدارة الأدوار (Create/Edit Role)
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/80 font-bold border-b border-slate-200 dark:border-white/10">
              <th className="p-4 text-right border-l dark:border-white/10 min-w-[150px]">الوحدة / الصلاحية</th>
              {roles.map(r => <th key={r} className="p-4 border-l dark:border-white/10">{r}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-white/10">
             {categories.map((cat, idx) => (
                <React.Fragment key={cat}>
                  <tr className="bg-slate-50/50 dark:bg-white/[0.02]">
                    <td colSpan={roles.length + 1} className="p-3 text-right font-black text-teal-600 dark:text-teal-400 bg-teal-50/50 dark:bg-teal-900/20">{cat} Module</td>
                  </tr>
                  <PermissionRow label="View" isFullAdmin={true} />
                  <PermissionRow label="Create" isFullAdmin={true} />
                  <PermissionRow label="Edit" isFullAdmin={true} />
                  <PermissionRow label="Delete" isFullAdmin={true} isDelete={true} />
                </React.Fragment>
             ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-slate-200 dark:border-white/10 flex justify-end">
        <button className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-lg shadow-teal-500/20">
          حفظ التعديلات
        </button>
      </div>
    </div>
  )
}

function PermissionRow({ label, isFullAdmin, isDelete }: any) {
  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
      <td className="p-3 text-right font-medium text-slate-700 dark:text-white/70 border-l dark:border-white/10 pl-6">{label}</td>
      {roles.map((r, i) => (
        <td key={r} className="p-3 border-l dark:border-white/10">
           <input 
             type="checkbox" 
             className="w-4 h-4 text-teal-600 bg-slate-100 border-slate-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:bg-slate-700 dark:border-slate-600 cursor-pointer"
             defaultChecked={i === 0 || (i < 3 && !isDelete)}
             disabled={i === 0 && isFullAdmin} // Sys admin always has all
           />
        </td>
      ))}
    </tr>
  )
}

// 6. Audit Logs
function AuditLogs() {
  const logs = [
    { id: 1, date: '2024-06-07 10:15', user: 'أحمد القحطاني', action: 'Login', module: 'Auth', ip: '192.168.1.55' },
    { id: 2, date: '2024-06-07 10:20', user: 'أحمد القحطاني', action: 'Create Record', module: 'Quotations', ip: '192.168.1.55' },
    { id: 3, date: '2024-06-07 10:45', user: 'سارة الحمد', action: 'Permission Changes', module: 'User Management', ip: '10.0.0.12' },
    { id: 4, date: '2024-06-07 11:00', user: 'سعد العبدالله', action: 'Delete Record', module: 'Projects', ip: '192.168.1.80' },
  ];

  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col flex-1 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50 dark:bg-transparent">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">سجل التدقيق (Audit Logs)</h3>
        <button className="flex items-center gap-2 text-sm font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-4 py-2 rounded-lg">
          <FileText size={16} /> تصدير السجل
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 border-b border-slate-200 dark:border-white/10">
              <th className="p-4 font-bold">التاريخ والوقت</th>
              <th className="p-4 font-bold">المستخدم</th>
              <th className="p-4 font-bold">الإجراء (Action)</th>
              <th className="p-4 font-bold">الوحدة (Module)</th>
              <th className="p-4 font-bold" dir="ltr">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-white/10">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-white/5 font-mono text-[13px]">
                <td className="p-4 text-slate-500 dark:text-white/50">{log.date}</td>
                <td className="p-4 text-slate-900 dark:text-white font-bold font-sans">{log.user}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold font-sans ${
                    log.action.includes('Delete') ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    log.action.includes('Create') ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white/70'
                  }`}>{log.action}</span>
                </td>
                <td className="p-4 text-slate-700 dark:text-white/70 font-sans font-semibold">{log.module}</td>
                <td className="p-4 text-slate-500 dark:text-white/50" dir="ltr">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// 7. Security Center
function SecurityCenter() {
  return (
     <div className="space-y-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-5 rounded-2xl flex items-center justify-between">
           <div>
             <span className="text-sm font-bold text-red-700 dark:text-red-400 mb-1 block">محاولات دخول فاشلة</span>
             <span className="text-3xl font-black text-red-800 dark:text-red-300">12</span>
           </div>
           <ShieldAlert size={32} className="text-red-500/50" />
        </div>
        <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 p-5 rounded-2xl flex items-center justify-between">
           <div>
             <span className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-1 block">حسابات مقفلة</span>
             <span className="text-3xl font-black text-amber-800 dark:text-amber-300">3</span>
           </div>
           <Lock size={32} className="text-amber-500/50" />
        </div>
        <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 p-5 rounded-2xl flex items-center justify-between">
           <div>
             <span className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-1 block">كلمات مرور منتهية</span>
             <span className="text-3xl font-black text-blue-800 dark:text-blue-300">7</span>
           </div>
           <Key size={32} className="text-blue-500/50" />
        </div>
      </div>

       <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">تنبيهات الأمان الحديثة (Security Alerts)</h3>
        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-red-200 dark:border-red-500/30 bg-red-50/50 dark:bg-red-500/5 flex items-start gap-3">
             <ShieldAlert className="text-red-500 shrink-0 mt-0.5" size={18} />
             <div>
               <p className="font-bold text-red-800 dark:text-red-400 text-sm">محاولات دخول متعددة فاشلة</p>
               <p className="text-xs text-red-600/80 dark:text-red-400/80 mt-1">تم رصد 5 محاولات دخول فاشلة للحساب 1089 من عنوان IP 45.33.22.11</p>
               <p className="text-[10px] text-red-500 mt-2 font-mono" dir="ltr">2024-06-07 03:15:22 UTC</p>
             </div>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 flex items-start gap-3">
             <Lock className="text-amber-500 shrink-0 mt-0.5" size={18} />
             <div>
               <p className="font-bold text-amber-800 dark:text-amber-400 text-sm">تسجيل دخول من جهاز غير مألوف</p>
               <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1">تم تسجيل الدخول للحساب 1024 من جهاز (MacBook) لأول مرة</p>
               <p className="text-[10px] text-amber-500 mt-2 font-mono" dir="ltr">2024-06-06 18:40:00 UTC</p>
             </div>
          </div>
        </div>
      </div>
     </div>
  )
}
