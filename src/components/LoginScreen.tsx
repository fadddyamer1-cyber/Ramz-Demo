import React, { useState } from 'react';
import { Lock, User, AlertCircle } from 'lucide-react';

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('1001');
  const [password, setPassword] = useState('1001');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === '1001' && password === '1001') {
      onLogin();
    } else {
      setError('بيانات الدخول غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans" dir="rtl">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-amber-500/10 blur-[120px]"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#EAB308] rounded-xl flex items-center justify-center font-bold text-3xl text-white shadow-lg shadow-amber-500/20">
            R
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">RAMZ ONE</h1>
            <p className="text-teal-400 text-xs font-bold tracking-widest uppercase">منصة الإدارة المتكاملة</p>
          </div>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/5 backdrop-blur-xl py-10 px-6 sm:px-10 shadow-2xl rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-teal-500"></div>
          
          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">تسجيل الدخول للنظام</h2>
            <p className="text-sm text-white/50">أدخل بيانات الاعتماد الخاصة بك للوصول</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400 text-sm font-medium">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
                اسم المستخدم / الرقم الوظيفي
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-white/40">
                  <User size={18} />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-xl bg-white/5 border border-white/10 py-3 pr-11 pl-4 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder:text-white/20"
                  placeholder="أدخل اسم المستخدم"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                 <label htmlFor="password" className="block text-sm font-medium text-white/80">
                  كلمة المرور
                </label>
                 <button type="button" className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors">
                  نسيت كلمة المرور؟
                </button>
              </div>
             
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-white/40">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl bg-white/5 border border-white/10 py-3 pr-11 pl-4 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder:text-white/20"
                  placeholder="أدخل كلمة المرور"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/20 bg-white/5 text-teal-500 focus:ring-teal-500 focus:ring-offset-[#0F172A]"
                />
                <label htmlFor="remember-me" className="mr-2 block text-sm font-medium text-white/60">
                  تذكرني على هذا الجهاز
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-teal-500/20 text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F172A] focus:ring-teal-500 transition-all"
              >
                دخول
              </button>
            </div>
          </form>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <p className="text-xs text-amber-400/80 font-medium mb-1">حساب مدير النظام التجريبي (Demo)</p>
              <div className="flex justify-between items-center text-xs text-amber-400 font-bold mb-1">
                <span>اسم المستخدم: 1001</span>
                <span>كلمة المرور: 1001</span>
              </div>
              <p className="text-[10px] text-amber-400/60 mt-2">يتمتع هذا الحساب بصلاحيات وصول كاملة لجميع وظائف النظام.</p>
            </div>
          </div>
        </div>
        <p className="text-center text-[10px] text-white/30 mt-8">
          RAMZ ONE PLATFORM v4.2.0 &copy; 2024
        </p>
      </div>
    </div>
  );
}
