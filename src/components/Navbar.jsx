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
  MapPin, 
  Calendar,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const Navbar = () => {
  const { currentPage, navigate, favorites, userProfile } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Bosh sahifa', icon: Compass },
    { id: 'explore', label: 'Katalog', icon: Search },
    { id: 'partner-dashboard', label: 'Hamkorlik', icon: Briefcase, badge: 'Biznes' },
    { id: 'user-dashboard', label: 'Profilim', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
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
              <span className="text-2xl font-black tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors">
                Chill zone
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-orange-100 text-orange-700 rounded-md border border-orange-200">
                PRO
              </span>
            </div>
            <p className="text-[11px] font-medium text-stone-500 tracking-wide">
              Hordiq-Pro Uzbekistan
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-100/80 p-1.5 rounded-2xl border border-stone-200/60">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-500' : 'text-stone-400'}`} />
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

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Favorites Button */}
          <button
            onClick={() => {
              navigate('user-dashboard');
            }}
            className="relative p-2.5 rounded-xl border border-stone-200 hover:border-orange-200 hover:bg-orange-50 text-stone-600 hover:text-orange-600 transition-all flex items-center justify-center group"
            title="Sevimlilar"
          >
            <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-orange-500 fill-orange-500' : 'text-stone-500 group-hover:text-orange-500'}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Become Partner Shortcut CTA */}
          <button
            onClick={() => navigate('partner-dashboard')}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200/80 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Biznesingiz bormi?</span>
          </button>

          {/* User Profile Pill */}
          <div 
            onClick={() => navigate('user-dashboard')}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full border border-stone-200 hover:border-orange-300 hover:shadow-md cursor-pointer transition-all bg-white"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center font-bold text-xs shadow-inner">
              {userProfile.name[0]}{userProfile.surname[0]}
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-stone-800 block leading-tight">
                {userProfile.name} {userProfile.surname[0]}.
              </span>
              <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Toshkent
              </span>
            </div>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => navigate('user-dashboard')}
            className="relative p-2 text-stone-700 hover:text-orange-500"
          >
            <Heart className={`w-6 h-6 ${favorites.length > 0 ? 'text-orange-500 fill-orange-500' : ''}`} />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-700 hover:bg-stone-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
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
                    ? 'bg-orange-50 text-orange-600 border border-orange-200'
                    : 'text-stone-700 hover:bg-stone-50'
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

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                navigate('partner-dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 bg-orange-500 text-white font-bold text-sm rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 shadow-md shadow-orange-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Biznesni ro‘yxatdan o‘tkazish</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
