import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, 
  Search, 
  Heart, 
  User, 
  Briefcase, 
  Compass, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Globe, 
  Sparkles, 
  LogOut,
  ChevronDown
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentPage, 
    navigate, 
    favorites, 
    userProfile, 
    theme, 
    toggleTheme, 
    language, 
    changeLanguage, 
    t, 
    logout 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t('navHome'), icon: Compass },
    { id: 'explore', label: t('navCatalog'), icon: Search },
    { id: 'partner-dashboard', label: t('navPartner'), icon: Briefcase, badge: t('navPartnerBadge') },
    { id: 'user-dashboard', label: t('navProfile'), icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-stone-200/80 dark:border-slate-800 shadow-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform duration-200">
            <Flame className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-stone-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                Chill Zone
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 rounded-md border border-orange-200 dark:border-orange-800">
                PRO
              </span>
            </div>
            <p className="text-[11px] font-medium text-stone-500 dark:text-slate-400 tracking-wide">
              {t('brandTagline')}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-100/80 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-stone-200/60 dark:border-slate-700/60 transition-colors">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-sm'
                    : 'text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-500' : 'text-stone-400 dark:text-slate-400'}`} />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-orange-500 text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Language Switcher, Dark Mode, Favorites, Partner CTA, Profile */}
        <div className="hidden lg:flex items-center gap-2.5">
          
          {/* 1. LANGUAGE SWITCHER DROPDOWN / TOGGLE */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-700 dark:text-slate-200 hover:border-orange-300 dark:hover:border-orange-500 text-xs font-bold transition-all shadow-xs"
              title="Tilni tanlash / Выбор языка"
            >
              <Globe className="w-4 h-4 text-orange-500" />
              <span className="tracking-wide uppercase">{language === 'uz' ? 'UZB' : 'RUS'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 dark:text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-stone-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => {
                    changeLanguage('uz');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-bold flex items-center justify-between hover:bg-stone-50 dark:hover:bg-slate-700 transition-colors ${
                    language === 'uz' ? 'text-orange-600 dark:text-orange-400' : 'text-stone-700 dark:text-slate-200'
                  }`}
                >
                  <span>🇺🇿 O‘zbekcha</span>
                  {language === 'uz' && <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>}
                </button>
                <button
                  onClick={() => {
                    changeLanguage('ru');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-bold flex items-center justify-between hover:bg-stone-50 dark:hover:bg-slate-700 transition-colors ${
                    language === 'ru' ? 'text-orange-600 dark:text-orange-400' : 'text-stone-700 dark:text-slate-200'
                  }`}
                >
                  <span>🇷🇺 Русский</span>
                  {language === 'ru' && <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>}
                </button>
              </div>
            )}
          </div>

          {/* 2. DARK MODE TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-700 dark:text-amber-400 hover:border-orange-300 dark:hover:border-orange-500 hover:bg-stone-50 dark:hover:bg-slate-750 transition-all shadow-xs flex items-center justify-center cursor-pointer"
            title={theme === 'dark' ? 'Yorug‘ rejimga o‘tish' : 'Tungi rejimga o‘tish'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-90 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-stone-600 transition-transform hover:-rotate-12 duration-300" />
            )}
          </button>

          {/* Favorites Button */}
          <button
            onClick={() => navigate('user-dashboard')}
            className="relative p-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-orange-200 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-slate-700 text-stone-600 dark:text-slate-300 transition-all flex items-center justify-center group"
            title={t('favorites')}
          >
            <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'text-orange-500 fill-orange-500' : 'text-stone-500 dark:text-slate-400 group-hover:text-orange-500'}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-xs">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Partner CTA Shortcut */}
          <button
            onClick={() => navigate('partner-dashboard')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/80 border border-orange-200/80 dark:border-orange-800 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>{t('btnPartnerCta')}</span>
          </button>

          {/* User Profile Pill */}
          <div 
            onClick={() => navigate('user-dashboard')}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-stone-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-500 cursor-pointer transition-all bg-white dark:bg-slate-800 shadow-xs"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center font-bold text-xs shadow-inner">
              {userProfile?.name?.[0] || 'A'}
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-stone-800 dark:text-white block leading-tight whitespace-nowrap">
                {userProfile?.name || 'Abdulloh'}
              </span>
            </div>
          </div>

          {/* Quick Sign Out (Gatekeeping testing) */}
          <button
            onClick={logout}
            className="p-2 rounded-xl text-stone-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            title={t('navLogout')}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Dark Mode Mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-stone-700 dark:text-amber-400 hover:bg-stone-100 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-700" />}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
          
          {/* Mobile Language and Theme selector */}
          <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => changeLanguage('uz')}
                className={`px-3 py-1 text-xs font-bold rounded-lg ${
                  language === 'uz' ? 'bg-orange-500 text-white' : 'text-stone-600 dark:text-slate-400'
                }`}
              >
                UZB
              </button>
              <button
                onClick={() => changeLanguage('ru')}
                className={`px-3 py-1 text-xs font-bold rounded-lg ${
                  language === 'ru' ? 'bg-orange-500 text-white' : 'text-stone-600 dark:text-slate-400'
                }`}
              >
                RUS
              </button>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-1 text-xs font-bold text-red-500 py-1 px-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('navLogout')}</span>
            </button>
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  navigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800'
                    : 'text-stone-700 dark:text-slate-200 hover:bg-stone-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-orange-500' : 'text-stone-400'}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-orange-500 text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-stone-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                navigate('partner-dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 bg-orange-500 text-white font-bold text-sm rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 shadow-md shadow-orange-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('partnerBtnJoin')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
