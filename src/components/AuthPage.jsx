import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, 
  Phone, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Sun, 
  Moon, 
  Globe, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Send 
} from 'lucide-react';

export const AuthPage = () => {
  const { login, theme, toggleTheme, language, changeLanguage, t } = useApp();

  const [mode, setMode] = useState('register'); // Default to Ro'yxatdan o'tish (Registration) first
  const [phoneNumber, setPhoneNumber] = useState('+998 ');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('Toshkent');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Phone number input formatter
  const handlePhoneChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('+998')) {
      val = '+998 ';
    }
    setPhoneNumber(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      let first = '';
      let last = '';

      if (mode === 'register' && fullName.trim()) {
        const nameParts = fullName.trim().split(/\s+/);
        first = nameParts[0] || 'Foydalanuvchi';
        last = nameParts.slice(1).join(' ') || '';
      } else {
        // Look up registered user account by phone number
        const cleanPhone = String(phoneNumber).replace(/[^0-9+]/g, '');
        const savedAccount = localStorage.getItem('user_' + cleanPhone);
        if (savedAccount) {
          try {
            const parsed = JSON.parse(savedAccount);
            first = parsed.name || '';
            last = parsed.surname || '';
          } catch (err) {}
        }
      }

      login({
        phone: phoneNumber.trim() || '+998 (90) 123-45-67',
        name: first,
        surname: last,
        city: city
      });
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Decorative Ambient Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      {/* Top Bar Controls: Language & Dark Mode */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
            <Flame className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-stone-900 dark:text-white">
                Chill Zone
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-300 rounded-md border border-orange-200 dark:border-orange-800">
                PRO
              </span>
            </div>
            <p className="text-[11px] font-medium text-stone-500 dark:text-slate-400">
              {t('brandSubtitle')}
            </p>
          </div>
        </div>

        {/* Global Controls: Language Switcher & Dark Mode Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-2xl p-1 shadow-xs">
            <button
              onClick={() => changeLanguage('uz')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all ${
                language === 'uz'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              UZB
            </button>
            <button
              onClick={() => changeLanguage('ru')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all ${
                language === 'ru'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              RUS
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-700 dark:text-amber-400 hover:bg-stone-100 dark:hover:bg-slate-800 transition-all shadow-xs"
            title="Mavzuni o'zgartirish"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-stone-700 animate-in spin-in-180 duration-300" />
            )}
          </button>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-stone-200/80 dark:border-slate-800 p-6 sm:p-8 backdrop-blur-xl transition-all">
          
          {/* Top Pill / Badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/80 text-orange-600 dark:text-orange-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>{t('heroBadge')}</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
              {mode === 'login' ? t('authTitleLogin') : t('authTitleRegister')}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-1.5">
              {mode === 'login' ? t('authSubtitleLogin') : t('authSubtitleRegister')}
            </p>
          </div>

          {/* Toggle between "Ro'yxatdan o'tish" and "Kirish" */}
          <div className="grid grid-cols-2 p-1.5 bg-stone-100 dark:bg-slate-800/80 rounded-2xl mb-6 border border-stone-200/60 dark:border-slate-700/60">
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                mode === 'register'
                  ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-md'
                  : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {t('tabRegister')}
            </button>
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-md'
                  : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {t('tabLogin')}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Register: Full Name */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1.5">
                  {t('nameLabel')}:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t('namePlaceholder')}
                    className="w-full pl-10 pr-4 py-3 text-sm bg-stone-50 dark:bg-slate-800/90 border border-stone-200 dark:border-slate-700 rounded-2xl text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* Phone Number Input */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1.5">
                {t('phoneLabel')}:
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder={t('phonePlaceholder')}
                  className="w-full pl-10 pr-4 py-3 text-sm font-medium bg-stone-50 dark:bg-slate-800/90 border border-stone-200 dark:border-slate-700 rounded-2xl text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1.5">
                {t('passwordLabel')}:
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('passwordPlaceholder')}
                  className="w-full pl-10 pr-11 py-3 text-sm bg-stone-50 dark:bg-slate-800/90 border border-stone-200 dark:border-slate-700 rounded-2xl text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Register: City Selection */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1.5">
                  {t('cityLabel')}:
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 text-sm font-medium bg-stone-50 dark:bg-slate-800/90 border border-stone-200 dark:border-slate-700 rounded-2xl text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                >
                  <option value="Toshkent">Toshkent shahri</option>
                  <option value="Samarqand">Samarqand</option>
                  <option value="Buxoro">Buxoro</option>
                  <option value="Farg‘ona">Farg‘ona</option>
                  <option value="Andijon">Andijon</option>
                </select>
              </div>
            )}

            {/* Remember & Forgot Password Links */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-stone-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-orange-500 accent-orange-500"
                />
                <span>{t('rememberMe')}</span>
              </label>

              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => alert(language === 'uz' ? 'Parolni tiklash kodi SMS orqali yuboriladi (+998).' : 'Код восстановления будет отправлен по SMS (+998).')}
                  className="text-orange-600 dark:text-orange-400 font-bold hover:underline"
                >
                  {t('forgotPassword')}
                </button>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-orange-500/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'login' ? t('btnSubmitLogin') : t('btnSubmitRegister')}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>

            {/* Demo Hint */}
            <p className="text-[11px] text-center text-stone-400 dark:text-slate-500 pt-1 leading-relaxed">
              {t('demoHint')}
            </p>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-stone-200 dark:border-slate-800 w-full" />
              <span className="bg-white dark:bg-slate-900 px-3 text-[11px] uppercase font-bold text-stone-400 dark:text-slate-500">
                {t('orContinueWith')}
              </span>
            </div>

            {/* Quick Telegram Sign-in Simulation */}
            <button
              type="button"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  login({
                    phone: '+998 (90) 888-77-66',
                    name: 'Jasur',
                    surname: 'Aliyev',
                    city: 'Toshkent'
                  });
                  setIsLoading(false);
                }, 400);
              }}
              className="w-full py-3 px-4 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-bold text-xs rounded-2xl border border-sky-200/80 dark:border-sky-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-sky-500" />
              <span>{t('telegramLogin')}</span>
            </button>

          </form>

          {/* Footer note */}
          <p className="text-[10px] text-center text-stone-400 dark:text-slate-600 mt-6 leading-tight">
            {t('termsText')}
          </p>

        </div>
      </main>

      {/* Footer Bottom Bar */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 dark:text-slate-500 gap-2">
        <div className="flex items-center gap-2">
          <span>© 2026 Chill Zone. {t('allRightsReserved')}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            256-bit SSL Shifrlash
          </span>
          <span>Toshkent, O‘zbekiston</span>
        </div>
      </footer>

    </div>
  );
};
